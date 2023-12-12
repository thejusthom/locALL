// Importing the IUser interface from the "./user" file
import { IUser } from "./user";

// Defining the Happenings interface
interface Happenings {
  _id?: any; // Optional property for the ID
  title: string; // Title of the happening
  content: string; // Content of the happening
  postedDate?: string; // Optional property for the posted date
  createdUser?: IUser; // Optional property for the user who created the happening
  image: string; // Image associated with the happening
  locationId?: string; // Optional property for the location ID
}

// Exporting the Happenings interface as the default export
export default Happenings;