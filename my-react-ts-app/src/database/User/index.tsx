import axios from 'axios';
 
const apiUrl:string = import.meta.env.VITE_SOME_KEY

 export const getOneUser =async(id:string|number)=>{
  try {
    const response= await axios.get(`${apiUrl}/user/${id}`)
    return response.data
  } catch (error) {
    
  }
}