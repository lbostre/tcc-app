export type Day =
    | "Monday"
    | "Tuesday"
    | "Wednesday"
    | "Thursday"
    | "Friday"
    | "Saturday"
    | "Sunday";

export type OpenTimes = {
    [key in Day]: string[];
};

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
    openTimes: OpenTimes;
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