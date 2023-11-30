interface FeedShare {
    _id: number;
    productName: string;
    price: number;
    listingDate: Date;
    description: string;
    organizer: string;
    createdUser: string;
    locationId: string;
}

export const feedShare : FeedShare[] = [
    {
        _id: 1,
        productName: "Laptop Stand",
        price: 90.0,
        listingDate: new Date ("2023-11-16"),
        description: "Grab this steal of a deal! $50 for a patio table with 6 chairs. Ideal for outdoor dining or lounging. Sturdy construction, weather-resistant, and versatile style. Transform your patio into a cozy retreat for gatherings. Don't miss out on this affordable and stylish addition to your outdoor space!",
        organizer: "Seb Vet",
        createdUser: "655bf12d0764c1503fe03d36",
        locationId: "02119"
    },
    {
        _id: 2,
        productName: "Study Table",
        price: 180.0,
        listingDate: new Date ("2023-10-07"),
        description: "Grab this steal of a deal! $50 for a patio table with 6 chairs. Ideal for outdoor dining or lounging. Sturdy construction, weather-resistant, and versatile style. Transform your patio into a cozy retreat for gatherings. Don't miss out on this affordable and stylish addition to your outdoor space!",
        organizer: "Max Ver",
        createdUser: "655bf12d0764c1503fe03d36",
        locationId: "02119"
    }
]

export default FeedShare;
