import axios from 'axios';

const api= "http://localhost:8989/products"
export const fetchProduct=async()=>{
    try{
        const response= await axios.get(api)
        console.log("res",response)


    }catch(error){
        console.log(error)
    }
}