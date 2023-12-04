export interface ICoordinates{
    latitude: number;
    longitude: number;
}

export interface ILocation{
coordinates: ICoordinates;
pincode: number;
city: string;
}