import VVSClient from "../src/index";
import * as fs from 'fs';
import { Icon } from "../src/index";

const client = new VVSClient();

await client.init();

const icons = Object.values(Icon);

let counter = 0;
let wrongCounter = 0;

icons.forEach(icon => {
    const svgData = client.Icons.getIcon(icon);
    if (svgData) {
        fs.writeFileSync(`./tests/results/${icon}.svg`, svgData, "utf-8");
        console.log(`Icon ${icon} saved to ./tests/results/${icon}.svg`);
        counter++;
    } else {
        console.warn(`Icon ${icon} not found.`);
        wrongCounter++;
    }
});

console.log(`Successfully saved ${counter} out of ${icons.length} icons. ${wrongCounter} icons were not found.`);
console.log("Icon saved to ./tests/results/vvs_logo.svg");