export * from "./enums/index.js";
export * from "./types.js";
export * from "./modules/icons.js";
export * from "./modules/livePositions.js";
export * from "./modules/helpers.js";
export * from "./modules/departures.js";

import VVSClientIcons from "./modules/icons.js";
import VVSClientLivePositions from "./modules/livePositions.js";
import VVSClientHelpers from "./modules/helpers.js";
import VVSClientDepartures from "./modules/departures.js";

export class VVSClient {
    LivePositions: VVSClientLivePositions;
    Icons: VVSClientIcons;
    Helpers: VVSClientHelpers;
    Departures: VVSClientDepartures;

    constructor() {
        this.LivePositions = new VVSClientLivePositions();
        this.Icons = new VVSClientIcons();
        this.Helpers = new VVSClientHelpers();
        this.Departures = new VVSClientDepartures();
        console.log('VVSClient initialized');
    }

    async init(): Promise<void> {
        await this.Icons.load();
    }
}

export default VVSClient;