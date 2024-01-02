import axios from 'axios';
import {Login,Register} from './interface'
const apiUrl:string = import.meta.env.VITE_SOME_KEY


export const login = async(data:Login)=>{
  const {email,password} =data
try {
  const response = await axios.post(`${apiUrl}/login`, {
    emal: email,
    password: password,
  });
  return response.data; 
} catch (error) {
  console.log("login is error",error);
  
}
}
export const register =async(data:Register)=>{
  const {firstName, lastName, email, password} =data
try {
  const response = await axios.post(`${apiUrl}/register`, {
    firstName:firstName,
    lastName:lastName,
    email:email,
    password:password
  })
  return response.data
} catch (error) {
  console.log("register is error",error);
  
}
}