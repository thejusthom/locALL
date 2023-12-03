import { ICoordinates } from "./location";
import { IUser } from "./user";

export interface IEvent {
    _id?: number;
    eventName: string;
    startDate: string;
    endDate: string;
    descriptionInfo: string;
    address: ICoordinates;
    category: string;
    createdUser?: IUser | string;
    locationId: string;
    organiser: {
      name: string,
      contact: string
    }
  }