import VVSClient from "../src/index";

const client = new VVSClient();

await client.init();

const result = await client.Helpers.getPlaceCompletion("Arnulf");
console.log(JSON.stringify(result, null, 2));