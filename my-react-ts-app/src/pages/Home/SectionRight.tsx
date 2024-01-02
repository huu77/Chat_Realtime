 
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import Chat from './Chat'
import { RootState } from 'redux/store'
import axios from 'axios'
const apiUrl: string = import.meta.env.VITE_SOME_KEY
import io from 'socket.io-client'
const socket = io(apiUrl)
const sectionRight = ({ user ,dataReceiver}: { user: any;dataReceiver:any}) => {
  const [data, setData] = useState<string[]>([])
  const [message, setMessage] = useState<string>('')
  const checkUser = localStorage.getItem('oneUserPick')
  const authState = useSelector((state: RootState) => state.auth)
  //  i need idSender and id Receriver for get id chat => get list message to render
  let idSend = authState.user?.user.id
  let idReceiver = JSON.parse(checkUser as string)?.id
  const [idChat, setIdChat] = useState<string>('')

  const handleChange = (value: string) => {
    setMessage(value)
  }
  // get idChat for get to idChat
  useEffect(() => {
    const check = async () => {
      try {
        const response = await axios.get(`${apiUrl}/chat/find/${idSend}/${idReceiver}`)
        const getListMes = await axios.get(`${apiUrl}/message/${response?.data?.id}`)

        setData(getListMes?.data?.data)
        setIdChat(response?.data?.id)
      } catch (error) {
        console.log(error)
      }
    }
    check()
  }, [idSend, idReceiver])
useEffect(()=>{
if(dataReceiver?.idChat===idChat){
  setData((prevData: any) => [...prevData, dataReceiver])
}
},[dataReceiver])
  const selectedProperties = data.map((item: any) => ({
    id: item.id,
    send_id: item.send_id,
    receiver_id: item.receiver_id,
    timestap: item.timestap,
    content: item.content,
    idChat: item.idChat
  }))


  const handleSend = async (e:any) => {
    e.preventDefault()
    if (message !== '' && message.length < 100) {
      // Kiểm tra xem tin nhắn có giá trị và ít hơn 100 ký tự không
      setData((prevData: any) => [...prevData, {
        send_id: idSend,
            receiver_id:idReceiver,
            timestap: new Date(),
            content: message,
            idChat: idChat
      }])
      // Clear input sau khi gửi nếu cần
      setMessage('')
    }
    try {
      // Gửi tin nhắn qua API
      await axios.post(`${apiUrl}/message`, {
        send_id: idSend,
        receiver_id: idReceiver,
        content: message,
        idChat: idChat
      })

      console.log('Tin nhắn đã được gửi thành công!')
    } catch (error) {
      console.error('Lỗi khi gửi tin nhắn:', error)
    }
    socket.emit('send-message',{
      send_id: idSend,
      receiver_id: idReceiver,
      content: message,
      idChat: idChat
    })
  }

  return (
    <div className='w-full  sm:w-6/12  lg:w-3/4  rounded-md bg-white h-full p-5 flex flex-col flex-wrap mt-5'>
      {!checkUser && user.length === 0 && (
        <div className='w-full h-full flex justify-center items-center'>
          <h1 className='text-yellow-600 font-Pacifico'>Tap on Chat to Start convertion...!</h1>
        </div>
      )}
      {checkUser && (
        <Chat
          user={[JSON.parse(checkUser)]}
          data={selectedProperties}
          message={message}
          handleChange={handleChange}
          handleSend={handleSend}
        />
      )}
    </div>
  )
}

export default sectionRight
