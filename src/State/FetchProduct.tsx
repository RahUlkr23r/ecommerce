import axios from 'axios';

const api= "https://ecommerce-1-fwgt.onrender.com"
export const fetchProduct=async()=>{
    try{
        const response= await axios.get(api)
        console.log("res",response)


    }catch(error){
        console.log(error)
    }
}
