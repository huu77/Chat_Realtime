import { Avatar } from 'antd'
import { useEffect, useState } from 'react'
const url = 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg'
import axios from 'axios'

const apiUrl: string = import.meta.env.VITE_SOME_KEY

interface UserOnline {
  item: number | undefined
  setUser: any
  onlineUsers: any
}
const UserOnline = ({ item, setUser, onlineUsers }: UserOnline) => {
  const [data, setData] = useState([])

  useEffect(() => {
    const check = async () => {
      const response = await axios.get(`${apiUrl}/user/${item}`)

      setData(response.data)
    }
    check()
  }, [item])
 
  const handelClick = () => {
    localStorage.setItem('oneUserPick', JSON.stringify(data[0]))

    setUser(data)
  }
  const isOnline = onlineUsers.some((onlineUser: any) => onlineUser.userId === item)
const idPick = JSON.parse(localStorage.getItem('oneUserPick') as string)?.id
 

  return (
    <div className={`flex  w-full my-5 border-b-2 border-gray-200 pb-2 cursor-pointer ${idPick===data[0]?.id ? 'bg-gray-100' :'bg-white'}`} onClick={handelClick}>
      <Avatar src={<img src={url} alt='avatar' />} />
      <div className='ml-5'>
        <h2 className='text-yellow-600 font-Pacifico'> {data[0]?.lastName}</h2>
        {isOnline ? (
          <span className='text-green-600 font-Pacifico'>Online</span>
        ) : (
          <span className='text-gray-600 font-Pacifico'>Off</span>
        )}
      </div>
    </div>
  )
}

export default UserOnline
