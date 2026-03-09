import VVSClient from "../src/index";
import { Station } from "../src/index";
import * as fs from 'fs';

const client = new VVSClient();

await client.init();

const departures = await client.Departures.getDepartures(Station.HAUPTBF__ARNULF_KLETT_PLATZ, 5);
fs.writeFileSync(`./tests/results/departures.json`, JSON.stringify(departures, null, 2), "utf-8");
console.log("Departures saved to ./tests/results/departures.json");