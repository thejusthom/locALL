import { IUser } from "./user";

//donation model
export interface IDonation{
    _id?: string;
    donationName: string;
      postedOn?: Date;
      descriptionInfo: string;
      amountRequired: number;
      amountAchieved?: number;
      image?: string;
      createdUser?: IUser | string;
      locationId?: string;
      category: string;
      receiver: {
        name: string;
        age: number;
        contact: string
        }
}