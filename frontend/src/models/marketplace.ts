import { IUser } from "./user";
import {Comment} from "./Comment";

export interface Marketplace {
  _id: any;
  productName: string;
  price: string;
  image: string;
  comments: Comment[];
  listingDate: string;
  description: string;
  createdUser: IUser | string;
  locationId: string;
}
