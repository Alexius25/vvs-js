import { AutocompleteResponse } from "../types.js";
import axios from "axios";

export default class VVSClientHelpers {

    async getPlaceCompletion(query: string): Promise<AutocompleteResponse> {
        try {
            const response = await axios.get<AutocompleteResponse>("https://www3.vvs.de/mngvvs/XML_STOPFINDER_REQUEST", {
                params: {
                    SpEncId: 0,
                    coordOutputFormat: "EPSG:4326",
                    name_sf: query,
                    outputFormat: "rapidJSON",
                    serverInfo: 1,
                    suggestApp: "vvs",
                    type_sf: "any",
                    version: "10.2.10.139",
                },
            });
            return response.data;
        } catch (error) {
            console.error("Error fetching station completion:", error);
            throw error;
        }
    }
}