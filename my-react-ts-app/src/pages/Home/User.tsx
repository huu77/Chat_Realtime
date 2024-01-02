import {Avatar} from 'antd';
import { useEffect, useState } from 'react';
const url = 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg';
 
 
const UserOnline = ({user}:{user:any}) => {
  
 
  return (
    <div className='flex  w-full my-5 border-b-2 border-gray-200 pb-2 cursor-pointer'  >
    <Avatar src={<img src={url} alt="avatar" />} />
    <div className='ml-5'>

    <h2 className='text-yellow-600 font-Pacifico'>{user[0]?.lastName}</h2>
    
    </div>
    </div>
  )
}

export default UserOnline
