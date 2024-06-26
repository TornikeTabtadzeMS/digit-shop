import { IItem } from "./sharedInterface";

export enum Roles{
    ADMIN = "admin",
    USER = "customer"
}

export interface userRegisterDTO{
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    phone_number: string;
}

export interface IUser extends IItem {
    first_name: string;
    last_name: string;
    phone_number: string;
    email: string;
    verified: boolean;
    role: Roles;
    password: string;
    refresh_token: string;
}