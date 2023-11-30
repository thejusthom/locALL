import { IUser } from "./user";

export interface Marketplace {
  _id: number;
  productName: string;
  price: string;
  image: string;
  listingDate: string;
  description: string;
  orgnizer: string;
  createdUser: IUser;
  locationId: string;
}
