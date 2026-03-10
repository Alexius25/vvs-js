import VVSClient from "../src/index";

const client = new VVSClient();

await client.init();

const result = await client.Helpers.getPlaceCompletion("Hauptbahnhof");
console.log(JSON.stringify(result, null, 2));