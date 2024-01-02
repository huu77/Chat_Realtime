import { Input, Button, Modal } from 'antd'
import UserOnline from './UserOnline'
const { Search } = Input
import { Avatar } from 'antd'
import { useSelector } from 'react-redux'
import { RootState } from 'redux/store'
import { useEffect, useState } from 'react'
import axios from 'axios'
const apiUrl: string = import.meta.env.VITE_SOME_KEY
const url = 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg'
interface Chat {
  id: number
  id_user1: number
  id_user2: number
}
const secionLeft = ({ setUser, onlineUsers }: { setUser: any; onlineUsers: any }) => {
  const auth = useSelector((state: RootState) => state.auth)

  const [listChats, getListChats] = useState<Chat[]>([])
  const _id = parseInt(auth.user?.user.id)
  useEffect(() => {
    const check = async () => {
      try {
        const response = await axios.get(`${apiUrl}/chat/${_id}`)

        getListChats(response.data.data)
      } catch (error) {
        throw error
      }
    }
    check()
  }, [_id])
const [filteredUserIds,setFilteredUserIds] =useState([])
useEffect(()=>{
  let x:any = listChats.map((chat) => {
    if (chat.id_user1 === _id) {
      return chat.id_user2
    } else if (chat.id_user2 === _id) {
      return chat.id_user1
    }
  })
  setFilteredUserIds(x)
},[listChats])
  
  // modal
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchText, setSearchText] = useState('')
  const [listSearchUser ,setListSearchUser] =useState<number[]>([])
  const showModal = (value: string) => {
    setSearchText(value)
    setIsModalOpen(true)
  }

  const handleOk = () => {
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
    setSearchText('')
  }
  // handle get user for search Text
  useEffect(() => {
    const check = async () => {
      if(searchText!==''){
        const response = await axios.get(`${apiUrl}/user/search/find=${searchText}`)
        
        setListSearchUser(response.data.data)
      }
    }
    check()
  }, [searchText])
  
  
  const handleClickPickUser=async(idPick: number)=>{
    const isCheck = filteredUserIds.some((item)=>item=== idPick)
    console.log(idPick);
    
    setIsModalOpen(false)
    
    try {
      if(!isCheck ){
        
     
      await axios.post(`${apiUrl}/chat`,{
        senderId:_id,receiverId:idPick
      })
      console.log("success"); 
    
      setFilteredUserIds((prevIds) => [...prevIds, idPick]);
    }
      
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className=' hidden sm:w-6/12 md:w-5/12 lg:w-3/12 h-full  sm:block p-5'>
      <div className='w-full '>
        <Search
          placeholder='input search text'
          allowClear
          enterButton='Search'
          size='large'
          onSearch={(value) => showModal(value)}
        />
        <Modal title='Basic Modal' open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
          <div className='flex '>
            {listSearchUser.map((item,index)=>(
              <div className='  flex flex-col flex-wrap rounded-full  mx-5' key={index} onClick={()=>handleClickPickUser(item?.id)}>
              <Avatar src={<img src={url} alt='avatar' />} />
              <h2 className='text-yellow-600 font-Pacifico'>{item?.lastName}</h2>
            </div>
            ))}
            
          </div>
        </Modal>
      </div>

      <div className='w-full flex flex-col  rounded-md bg-white mt-5 p-10  h-full  overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100'>
        {filteredUserIds.map((item, index) => (
          <UserOnline key={index} item={item} setUser={setUser} onlineUsers={onlineUsers} />
        ))}
      </div>
    </div>
  )
}

export default secionLeft
