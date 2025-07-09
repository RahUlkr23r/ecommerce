import { HomeCategory } from "./HomeCategoryType";
 export interface Deals{
     id?:number;
     discount:number;
     image:[];
     name:string;
     section:string;
     category:HomeCategory;

 }



 export interface ApiResponse{
    message:string;
    status:boolean;
 }

 export interface DealsState{
    deals:Deals[];
    loading:boolean;
    error:string|null;
    dealCreated:boolean;
    dealUpdated:boolean
 }