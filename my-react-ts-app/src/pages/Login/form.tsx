 
import { SubmitHandler, useForm } from 'react-hook-form'
import { Button } from 'antd'
import CustomInput from './customInput'
 
import { UserOutlined, EyeOutlined } from '@ant-design/icons'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate, NavigateFunction } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../../database/Auth/AuthSlice'
import { login } from '../../database/Auth'
import { RootState } from 'redux/store'

interface FormData {
  email: string
  password: string
}
const showToast: () => void = () => {
  toast.success('U login success', {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined
  })
}
const showToastErr: () => void = () => {
  toast.error('U need login againt', {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined
  })
}
const Form = () => {
  const navigate: NavigateFunction = useNavigate()
  const dispatch = useDispatch()
  const authState = useSelector((state: RootState) => state.auth)

  const {
    register,
    handleSubmit,
    formState: { errors },
    control
  } = useForm<FormData>()

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      dispatch(loginUser(login, data) as any)
      const response = await login(data)
      console.log('respone', response)
      if (response) {
        showToast()
        setTimeout(() => {
          navigate('/home')
        }, 2000)
      } else {
        showToastErr()
      }
    } catch (error) {}
  }
  

  return (
    <div className='flex flex-wrap w-full justify-center items-center py-5 flex-col mt-10'>
      <h1 className='text-yellow-500 font-Pacifico font-bold text-xl mb-5'>Login</h1>

      <form onSubmit={handleSubmit(onSubmit)} className='w-4/12 h-auto flex flex-wrap flex-col'>
        <CustomInput
          label='Email'
          name='email'
          control={control}
          rules={{
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: 'Invalid email address'
            }
          }}
          placeholder='Enter your email...'
          type='Email'
          icon={<UserOutlined />}
        />
        {errors.email && <p className='text-red-600'>{errors.email.message}</p>}

        <CustomInput
          label='Password'
          name='password'
          control={control}
          icon={<EyeOutlined />}
          rules={{
            required: 'password is required',
            minLength: {
              value: 6,
              message: 'Password must be at least 6 characters'
            }
          }}
          placeholder='Enter your password...'
          type='password'
        />
        {errors.password && <p className='text-red-600'>{errors.password.message}</p>}
        <ToastContainer />
        <Button className='bg-black text-white mt-10 h-10' htmlType='submit'>
          Submit
        </Button>
      </form>
    </div>
  )
}

export default Form
