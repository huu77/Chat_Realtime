import { Avatar } from 'antd';
import React from 'react';
import { Link ,NavigateFunction,useLocation,useNavigate } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons'
import {useSelector} from 'react-redux'
import { RootState } from 'redux/store';
import io from 'socket.io-client'
const apiUrl: string = import.meta.env.VITE_SOME_KEY
const socket = io(apiUrl)
const Index = () => {
  const location = useLocation();
  const isLogin:Boolean =location.pathname==='/login'
  const isRegister:Boolean =location.pathname==='/register'
  const data =  useSelector((state: RootState) => state.auth)?.user
  const navigation : NavigateFunction=useNavigate()
 const handleLogout=()=>{
  localStorage.clear()
 
  navigation('/login')
  socket.disconnect()
  window.location.reload()
 }
  
  return (
    <div className="flex flex-wrap w-full justify-center items-center bg-black h-16">
      <div className="w-5/12">
        <h1 className="text-white font-Pacifico font-bold text-3xl">Chat With Me!</h1>
      </div>
      <div className="w-5/12 flex justify-end items-center">
        {!isLogin && !isRegister &&<>
          <span className='text-yellow-500 font-Pacifico'>Hi {data?.user?.name}!</span>
          <Avatar size="large" icon={<UserOutlined />} className='hover:text-yellow-500' />
          <button className='hover:text-yellow-500 font-Pacifico  text-white' onClick={handleLogout}>Logout</button>
          </>
        }
        {isLogin &&  <Link to="/register">
          <span className="text-white font-Pacifico font-bold text-xl hover:text-yellow-500">
            Register
          </span>
        </Link>}
        {isRegister && <Link to="/login">
          <span className="text-white font-Pacifico font-bold text-xl hover:text-yellow-500">
            Login
          </span>
        </Link>}
        
       
      </div>
    </div>
  );
};

export default Index;
