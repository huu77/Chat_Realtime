import axios from 'axios';
const apiUrl:string = import.meta.env.VITE_SOME_KEY
export const getListMes= async(id:any)=>{
try {
  const response = await axios.post(`${apiUrl}/chat/${id}`);
  return response.data;
} catch (error) {
  console.error("getListChat error:", error);
    throw error;
}
}
