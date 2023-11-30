import { IUser } from "./user";

export interface IEvent {
    _id: number;
    eventName: string;
    startDate: string;
    endDate: string;
    descriptionInfo: string;
    address: string;
    catergory: string;
    createdUser: IUser;
    locationId: string;
  }