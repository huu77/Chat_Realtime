import { Key } from 'react'
import Message from './Message'
import User from './User'
import Emoji from 'react-input-emoji'
interface Chat {
  user: any
  data: any
  message: string
  handleChange: (e: string) => void
  handleSend: (e) => void
}

const Chat = ({ user, data, message, handleChange, handleSend }: Chat) => {
  //  console.log(data.user?.user);
   
  
  return (
    <>
      <div className='w-full h-1/6'>
        <User user={user} />
      </div>

      <div className='w-full h-4/6  overflow-y-auto  flex flex-col-reverse scroll-smooth '>
        <div className='flex flex-wrap w-full'>
          {data?.map((item: string, index: Key | null | undefined) => <Message key={index} item={item} message={message}/>)}
        </div>
      </div>

      <div className='w-full h-1/6  p-5 border-t-2 border-gray-200 '>
        <div className='flex justify-center items-center'>
          <Emoji value={message} onChange={handleChange} cleanOnEnter placeholder='Type your message...' />
          <button
            className='bg-green-500 hover:bg-green-700 text-white font-bold rounded-r-md p-2'
            onClick={(e) => handleSend(e)}
          >
            Send
          </button>
        </div>
      </div>
    </>
  )
}

export default Chat
