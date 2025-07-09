import {Product} from "./ProductType"
import {User} from "./usertype"
 export interface CartItem{
    colors: null;
    id:number;
    cart?:Cart; 
    product:Product;
    sizes:string;
    quantity:number;
    mrpPrice:number;
    sellingPrice:number;
    totalPrice:number
    userId:number;
    selectedColor: string; // ✅ this should be added
    selectedSize: string; 

 }
 export interface Cart{
    id:number;
    user:User;
    cartItems:CartItem[];
    totalSellingPrice:number;
    totalItem:number;
    totalMrpPrice:number;
    discount:number;
    couponCode:string;


    
 }