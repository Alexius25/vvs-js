import fs from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import csvParser from "csv-parser";

const STATION_ID_REGEX = /de:(\d+):(\d+):(\d+):([\dA-Z]+)/i;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function sanitizeName(name: string): string {
  return name
    .toUpperCase()
    .replace(/\W|^(?=\d)/g, "_")
    .replace(/^_+|_+$/g, "");
}

interface StationRow {
  Name: string;
  "Name mit Ort": string;
  "Globale ID": string;
  Steigname: string;
  Gemeinde?: string;
  Teilort?: string;
}

function readCsv(filePath: string, encoding: BufferEncoding = "utf8") {
  return new Promise<Map<string, Array<[string, string]>>>((resolve, reject) => {
    const stations = new Map<string, Array<[string, string]>>();

    fs.createReadStream(filePath, { encoding })
      .pipe(csvParser({ separator: ";" }))
      .on("data", (row: StationRow) => {
        const nameOptions = new Set([row.Name, row["Name mit Ort"]]);
        const globalId = row["Globale ID"];
        const longName = row.Steigname || row.Name;
        const city = [row.Gemeinde, row.Teilort].filter(Boolean).join(" ");
        const description = city ? `${longName} (${city})` : longName;

        if (!globalId) return;

        nameOptions.forEach((name) => {
          if (!name) return;
          const sanitizedName = sanitizeName(name);
          if (!stations.has(sanitizedName)) stations.set(sanitizedName, []);
          stations.get(sanitizedName)!.push([globalId, description]);
        });
      })
      .on("end", () => resolve(stations))
      .on("error", (err) => reject(err));
  });
}

function generateUniqueEnumNames(
  stations: Map<string, Array<[string, string]>>
): Map<string, [string, string]> {
  const uniqueStations = new Map<string, [string, string]>();

  stations.forEach((info, name) => {
    if (info.length === 1) {
      uniqueStations.set(name, info[0]);
    } else {
      const parsedIds = info.map(([globalId]) => STATION_ID_REGEX.exec(globalId)?.slice(1));
      if (!parsedIds.every(Boolean)) return; // Skip invalid IDs

      const allGroup1 = parsedIds.map((p) => p![0]);
      const allGroup2 = parsedIds.map((p) => p![1]);

      if (allGroup1.every((v) => v === allGroup1[0]) && allGroup2.every((v) => v === allGroup2[0])) {
        const shortId = `de:${allGroup1[0]}:${allGroup2[0]}`;
        uniqueStations.set(name, [shortId, ""]);
      }

      info.forEach((station, idx) => {
        uniqueStations.set(`${name}_${idx + 1}`, station);
      });
    }
  });

  return uniqueStations;
}

async function main() {
  const filePath = join(__dirname, "vvs_steige.csv");
  const encoding: BufferEncoding = "latin1";

  const stations = await readCsv(filePath, encoding);
  const uniqueStations = generateUniqueEnumNames(stations);

  let enumContent = `// This is an auto-generated file. Do not modify manually\n\n`;
  enumContent += `export enum Station {\n`;

  uniqueStations.forEach(([globalId, description], name) => {
    if (description) {
      enumContent += `  /** ${description} */\n`;
      enumContent += `  ${name} = "${globalId}",\n`;
    } else {
      enumContent += `  ${name} = "${globalId}",\n`;
    }
  });

  enumContent += `}\n`;

  fs.writeFileSync(join(__dirname, "stations.ts"), enumContent, { encoding: "utf8" });
  console.log(`Enum created successfully in stations.ts with ${uniqueStations.size} stations.`);
}

main().catch(console.error);