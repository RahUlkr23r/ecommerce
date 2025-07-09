import { Deals } from "./dealType";

// Define HomeCategory type (replace with actual structure as needed)
export interface HomeCategory {
    // example fields
    id?: number;
    categoryId:string;
    section?:string;
    name?:string;
    image:string
    parentCategoryId?:string
}


export interface HomeData{
    id:number;
    grid:HomeCategory[];
    shopByCategories:HomeCategory[];
    deals: Deals[];
    dealcategories:HomeCategory[];
    electricCategories:HomeCategory[]
}


export interface Deal {
    // example fields
    id: number;
    title: string;
    discount: number;
}