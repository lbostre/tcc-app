export type Resource = {
    id: string;
    name: string;
    type: string;
    address: string;
    email: string;
    phone: string;
    website: string;
    overview: string;
    services: string;
    openTimes: string[];
};

export type MarkerType = {
    latlng: { latitude: number; longitude: number };
    title: string;
    type: string;
}

export type ResourceMarker = {
    resource: Resource;
    marker: MarkerType
}