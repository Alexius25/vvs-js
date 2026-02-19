export type PinResponse = {
    success: boolean;
    pins: Pin[];
}

export type Pin = {
    desc: string;
    addDesc: string;
    type: string;
    id: string;
    omc: string;
    placeID: string;
    locality: string;
    layer: string;
    gisID: string;
    distance: number;
    stateless: string;
    coords: [number, number];
    attrs: PinAttrs;
    infos: any;
}

export type PinAttrs = {
    STOP_GLOBAL_ID: string;
    STOP_NAME_WITH_PLACE: string;
    STOP_MAJOR_MEANS: string;
    STOP_MEANS_LIST: string[];
    STOP_MOT_LIST: string[];
    "STOP_TARIFF_ZONES:vvs": string;
    STOP_SURROUNDING_MAP: string;
}

export type LivePositionResponse = LivePosition[];

export type LivePosition = {
    id: string;
    journeyIdentifier: string;
    currentStop: string;
    delay: number;
    delayInSeconds: number;
    direction: string;
    line: string;
    latitude: number;
    longitude: number;
    type: string; // "Stadtbahn", "Bus" or "S-Bahn"
    ModCode: number;
    MOTCode: number;
    realtime: number;
    timestamp: string;
    previous?: Coordinates;
}

export type Coordinates = {
    latitude: number;
    longitude: number;
}

export type RapidPlaceAutoCompleteResponse = {
    serverInfo: {
        controllerVersion: string;
        serverID: string;
        virtDir: string;
        serverTime: string;
        calcTime: number;
        logRequestsId: string;
    }
    version: string;
    systemMessages: any[];
    locations: RapidPlaceAutoCompleteResponseLocation[];
}

export type RapidPlaceAutoCompleteResponseLocation = {
    id: string;
    isGlobalId: boolean;
    name: string;
    coord: [number, number];
    type: string;
    matchQuality: number;
    isBest: boolean;
    parent: {
        id: string;
        name: string;
        type: string;
    };
    assignedStops: AssignedStops[];
}

export type AssignedStops = {
    id: string;
    isGlobalId: boolean;
    name: string;
    disassembledName: string;
    type: string;
    coord: [number, number];
    parent: {
        name: string;
        type: string;
    };
    productClasses: number[];
    connectionMode: number;
    properties: Record<string, string | number | boolean | null | undefined> & {
        stopId?: string | null;
    };
}