import { IUser } from "./user";
import {Comment} from "./Comment";

export interface Marketplace {
  _id: number;
  productName: string;
  price: string;
  image: string;
  comments: Comment[];
  listingDate: string;
  description: string;
  orgnizer: string;
  createdUser: IUser;
  locationId: string;
}
