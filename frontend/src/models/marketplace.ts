import { IUser } from "./user";

export interface Marketplace {
  _id: number;
  productName: string;
  price: string;
  image: string;
  listingDate: Date;
  description: string;
  orgnizer: string;
  createdUser: IUser;
  locationId: string;
}
