export type PinsResponse = {
    success: boolean;
    pins: PinInfo[];
}

export type PinInfo = {
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
    attrs: PinAttributes;
    infos: any;
}

export type PinAttributes = {
    STOP_GLOBAL_ID: string;
    STOP_NAME_WITH_PLACE: string;
    STOP_MAJOR_MEANS: string;
    STOP_MEANS_LIST: string[];
    STOP_MOT_LIST: string[];
    "STOP_TARIFF_ZONES:vvs": string;
    STOP_SURROUNDING_MAP: string;
}

export type LivePositionsResponse = VehicleLivePosition[];

export type VehicleLivePosition = {
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
    previous?: GeoCoordinates;
}

export type GeoCoordinates = {
    latitude: number;
    longitude: number;
}

export type AutocompleteResponse = {
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
    locations: PlaceLocation[];
}

export type PlaceLocation = {
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
    assignedStops: AssignedStop[];
}

export type AssignedStop = {
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