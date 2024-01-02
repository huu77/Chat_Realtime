import { useState, useEffect, useRef } from 'react'
import { Header } from '../../layout'
import SecionLeft from './SecionLeft'
import SectionRight from './SectionRight'
import Sekeleton from './Sekeleton'
import io from 'socket.io-client'
import { useSelector } from 'react-redux'
import { RootState } from 'redux/store'
const apiUrl: string = import.meta.env.VITE_SOME_KEY
const socket = io(apiUrl)
const index: React.FC = () => {
  const authState = useSelector((state: RootState) => state.auth)
  const [user, setUser] = useState([])
  const [onlineUsers, setOnlineUsers] = useState([])
  const [dataReceiver,setDataReceiver] =useState(null)
  useEffect(() => {
    const check=()=>{
      socket.emit('new_user', authState?.user?.user?.id)
      socket.on('allUser', (users: any) => {
        setOnlineUsers(users)
      })
    }
    check()
    // return()=>{
    //   socket.disconnect()
    // }
  }, [])

  useEffect(()=>{
 
socket.on('recieve-message',(x:any)=>{
 
setDataReceiver(x)
})
 
  },[])
  return (
    <div className='h-screen w-full bg-gray-200  flex flex-col  '>
      <Header />
      <div className='flex flex-wrap justify-between items-center h-5/6'>
        <SecionLeft setUser={setUser} onlineUsers={onlineUsers} />
        {user ? <SectionRight user={user} dataReceiver={dataReceiver}/> : <Sekeleton />}
      </div>
    </div>
  )
}

export default index
