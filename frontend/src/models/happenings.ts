
interface Happenings {
  _id: number,
  title: string,
  content: string,
  userId: string,
  postedDate: string,
  image: string,
  locationId: string
}

export const happenings : Happenings[] = [
  {
    _id: 1,
    title: "Deer charges through crowded Roxbury restaurant",
    content: "People go to Sambhar & Chutney to save a buck, not to have one interrupt their meal. But that’s what happened in Walnut Park, Roxbury, on Sunday when a deer came crashing through a restaurant window.",
    userId: "655cf25ea5b8c0ae74ec699d",
    postedDate: "2017-07-21T17:32:28Z",
    image: "src",
    locationId: "02119"
  },
  {
    _id: 2,
    title: "Fire in dorechester",
    content: "People go to Sambhar & Chutney to save a buck, not to have one interrupt their meal. But that’s what happened in Walnut Park, Roxbury, on Sunday when a deer came crashing through a restaurant window.",
    userId: "655cf25ea5b8c0ae74ec699d",
    postedDate: "2017-09-21T17:32:28Z",
    image: "src",
    locationId: "02119"
  }
];

export default Happenings;