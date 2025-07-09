import { Order } from "./OrderTypes";
import { Seller } from "./Sellertype";
import { User } from "./usertype";


export interface Transaction{
    id:number;
    customer:User;
    order:Order;
    seller:Seller;
    date: string
}