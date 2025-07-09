export interface Address{
    street: any;
    country: any;
    isDefault: unknown;
    id?:number;
    name:string;
    pincode:number;
    address:string;
    locality:string;
    mobile:string;
    city:string;
    state:string;




}

export enum UserRole{
    ROLE_CUSTOMER ='ROLE_CUSTOMER',
    ROLE_ADMIN='ROLE_ADMIN',
    ROLE_SELLER='ROLE_SELLER'
}

export interface User{
    id:number;
    password?:string;
    email:string;
fullname:string;
mobile?:string;
role:UserRole;
addresses:Address[];
otp:string;

}

export interface UserSate{
    user:User
    loading:boolean;
    error:string|null;
    profileUpdated:boolean
}