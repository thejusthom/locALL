export interface IPerson{
    firstName: string;
    lastName: string;
    address: string;
    zipcode: string;
    phoneNumber: string;
    isActive?: boolean;
}

export interface IUser{
    _id?: string;
    person?: IPerson;
    username: string;
    password: string;
}