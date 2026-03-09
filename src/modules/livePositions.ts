import axios from "axios";
import { ModCode } from "../enums/index.js";
import type { LivePositionsResponse, PinsResponse } from "../types.js";

export default class VVSClientLivePositions {
    private axiosInstance = axios.create({
        baseURL: "https://livekarte.vvs.de/proxy/",
        timeout: 5000,
    });

    /**
     * Get live positions of public transport vehicles within a specified bounding box.
     * @param latMin Minimum latitude of the bounding box.
     * @param lonMin Minimum longitude of the bounding box.
     * @param latMax Maximum latitude of the bounding box.
     * @param lonMax Maximum longitude of the bounding box.
     * @param modCodes Array of ModCodes to filter the types of vehicles (default: all types).
     * @returns A promise that resolves to a LivePositionsResponse containing the live positions.
     */
    async getLivePositions(latMin: number, lonMin: number, latMax: number, lonMax: number, modCodes: ModCode[] = [ModCode.Normal_Train, ModCode.S_Bahn, ModCode.Stadtbahn, ModCode.Bus]): Promise<LivePositionsResponse> {
        try {
            const res = await this.axiosInstance.get("livepositions", {
                params: {
                    latMin,
                    lonMin,
                    latMax,
                    lonMax,
                    modCodes: modCodes
                }
            });
            return res.data;
        } catch (error) {
            console.error("Error fetching live positions:", error);
            throw error;
        }
    }

    /**
     * Get nearby pins (stops) based on the provided latitude, longitude, radius, and other parameters.
     * @param lat Latitude of the center point.
     * @param lon Longitude of the center point.
     * @param radius Search radius in meters.
     * @param limit Maximum number of results to return (default: -1 for no limit).
     * @param distance Doesn't seem to have an effect, but is required by the API (default: 1).
     * @returns A promise that resolves to a PinsResponse containing the nearby pins.
     */
    async getPinsNearby(lat: number, lng: number, radius: number, limit: number = -1, distance: number = 1): Promise<PinsResponse> {
        try {
            const res = await this.axiosInstance.get("coords", {
                params: {
                    lat,
                    lng,
                    radius,
                    limit,
                    distance
                }
            });
            return res.data;
        } catch (error) {
            console.error("Error fetching nearby pins:", error);
            throw error;
        }
    }
}
