export interface IPerson{
    firstName: string;
    lastName: string;
    address: string;
    zipcode: string;
    phoneNumber: string;
    isActive?: boolean;
}

export interface IUser{
    person: IPerson;
    username: string;
    password: string;
}