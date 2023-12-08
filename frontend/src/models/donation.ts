import { IUser } from "./user";

export interface IDonation{
    _id?: string;
    donationName: string;
      postedOn: string;
      descriptionInfo: string;
      amountRequired: number;
      amountAchieved?: number;
      createdUser?: IUser | string;
      locationId: string;
      category: string;
      receiver: {
        name: string;
        age: number;
        contact: string
        }
}