import { SubmitHandler, useForm } from 'react-hook-form'
import { Button } from 'antd'
import CustomInput from './customInput'
import { Header } from '../../layout'
import { UserOutlined, EyeOutlined, DeploymentUnitOutlined } from '@ant-design/icons'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios';
import { NavigateFunction, useNavigate } from 'react-router-dom'
const apiUrl:string = import.meta.env.VITE_SOME_KEY
interface FormData {
  email: string
  password: string
}
const showToast: () => void = () => {
  toast.success('Hello, this is a toast message!', {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined
  })
}
function MyForm() {
  const {
    handleSubmit,
    formState: { errors },
    control
  } = useForm() // Destructured control here
  const navigation : NavigateFunction=useNavigate()
  const onSubmit: SubmitHandler<FormData> = async(data) => {
    try {
      // Assuming register function handles the registration logic
      const response = await axios.post( `${apiUrl}/register`, data);
      
      // Assuming showToast handles displaying a success toast
      showToast();
  
      // Log the response if needed
      console.log('Registration successful:', response);
  setTimeout(()=>{
    navigation('/login')
  },2000)
      // Add any additional logic after successful registration
  
    } catch (error) {
      // Assuming showToastErr handles displaying an error toast
      showToastErr();
  
      // Log the error if needed
      console.error('Registration error:', error);
    }
  }

  return (
    <>
      <Header />
      <div className='flex flex-wrap w-full justify-center items-center py-5 flex-col mt-10'>
        <h1 className='text-yellow-500 font-Pacifico font-bold text-xl mb-5'>Register</h1>
        <form onSubmit={handleSubmit(onSubmit)} className='w-4/12 h-auto flex flex-wrap flex-col'>
          <CustomInput
            label='FirstName'
            name='firstName'
            control={control}
            rules={{
              required: 'firstName is required'
            }}
            placeholder='Enter your firstName...'
            type='text'
            icon={<DeploymentUnitOutlined />}
          />
          {errors.firstName && <p className='text-red-600'>{errors.firstName.message}</p>}
          <CustomInput
            label='LastName'
            name='lastName'
            control={control}
            rules={{
              required: 'lastName is required'
            }}
            placeholder='Enter your lastName...'
            type='text'
            icon={<DeploymentUnitOutlined />}
          />
          {errors.lastName && <p className='text-red-600'>{errors.lastName.message}</p>}
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
    </>
  )
}

export default MyForm
