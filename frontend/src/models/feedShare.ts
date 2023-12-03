import { Date } from "mongoose";
import { IPerson } from "./user";
import { Comment } from "./Comment";

interface FeedShare {
    _id: number;
    foodType: string;
    servings: number;
    postedDate: string;
    address: string;
    image: string;
    organizer: string;
    createdUser: IPerson;
    locationId: string;
    comments: Comment[];
  }

// export const feedShare : FeedShare[] = [
//     {
//       _id: 1,
//       foodType: "Homemade Pasta",
//       servings: 4,
//       postedDate: "2023-11-30T12:00:00Z",
//       address: "321 Maple Lane, Suburbia",
//       image: "https://storage.googleapis.com/chydlx/codepen/blog-cards/image-2.jpg",
//       organizer: "ChefCook123",
//       createdUser: new IPerson,
//       locationId: "locationA",
//       comments: []
//     },
//     {
//       _id: 2,
//       foodType: "Vegetarian Curry",
//       servings: 3,
//       postedDate: "2023-11-30T15:30:00Z",
//       address: "567 Pine Road, Urbanville",
//       image: "https://storage.googleapis.com/chydlx/codepen/blog-cards/image-2.jpg",
//       organizer: "SpiceDelight",
//       createdUser: "foodie456",
//       locationId: "locationB",
//       comments: []
//     },
//     {
//       _id: 3,
//       foodType: "Fruit Salad",
//       servings: 2,
//       postedDate: "2023-11-30T18:00:00Z",
//       address: "890 Cedar Street, Downtown",
//       image: "https://storage.googleapis.com/chydlx/codepen/blog-cards/image-2.jpg",
//       organizer: "HealthyBites",
//       createdUser: "nutritionfanatic",
//       locationId: "locationC",
//       comments: []
//     }
//   ]
  

export default FeedShare;
