import axios from "axios";
import { Station } from "../enums/stations.js";

const VVS_BASE_URL = "http://www3.vvs.de/vvs/widget/XML_DM_REQUEST?";

export default class VVSClientDepartures {
    async getDepartures(stationId: Station, limit: number = 100): Promise<any> {

        const params = {
            locationServerActive: 1,
            lsShowTrainsExplicit: 1,
            stateless: 1,
            language: "de",
            SpEncId: 0,
            anySigWhenPerfectNoOtherMatches: 1,
            limit: limit,
            depArr: "departure",
            type_dm: "any",
            name_dm: stationId,
            mode: "direct",
            dmLineSelectionAll: 1,
            useRealtime: 1,
            outputFormat: "json",
            coordOutputFormat: "WGS84[DD.ddddd]",
            itdDateYear: new Date().getFullYear(),
            itdDateMonth: new Date().getMonth() + 1,
            itdDateDay: new Date().getDate(),
            itdTimeHour: new Date().getHours(),
            itdTimeMinute: new Date().getMinutes(),
        };

        try {
            const response = await axios.get(VVS_BASE_URL, {
                params: params,
            });
            return response.data;
        } catch (error) {
            console.error("Error fetching departures:", error);
            throw error;
        }
    }
}