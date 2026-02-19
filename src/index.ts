export * from "./enums";
export * from "./types";
export * from "./modules/icons";
export * from "./modules/livePositions";

import VVSClientIcons from "./modules/icons";
import VVSClientLivePositions from "./modules/livePositions";
import VVSClientHelpers from "./modules/helpers";

export class VVSClient {
    LivePositions: VVSClientLivePositions;
    Icons: VVSClientIcons;
    Helpers: VVSClientHelpers;

    constructor() {
        this.LivePositions = new VVSClientLivePositions();
        this.Icons = new VVSClientIcons();
        this.Helpers = new VVSClientHelpers();
        console.log('VVSClient initialized');
    }

    async init(): Promise<void> {
        await this.Icons.load();
    }
}

export default VVSClient;