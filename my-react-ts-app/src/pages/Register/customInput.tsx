import React, { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Input, Button } from 'antd';
import { UserOutlined, EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons'
export interface CustomInputProps {
  label: string;
  control: any;
  name: string;
  rules: Record<string, any>;
  placeholder: string;
  type: string;
  icon: React.ReactNode; 
}

const CustomInput = ({
  label,
  type = 'text',
  placeholder = 'Enter Response',
  control, // Added control here
  icon,
  ...rest
}: CustomInputProps) => {
  const [passState, setPassState] = useState<boolean>(false)
  const [typePass, setTypePass] = useState<'password' | 'text'>('password')

  const changState = () => {
    setPassState(!passState)
    setTypePass(passState ? 'password' : 'text')
  }
  return (
    <div className="input-container mt-10">
      <label className='font-Pacifico font-bold text-xl'>{label}</label>
      <Controller
        name={rest.name}
        control={control} // Passed control here
        rules={rest.rules}
        render={({ field, fieldState }) => (<div className='flex'>
        
         
          <Input
            bordered={false}
            {...field}
            type={type === 'password'? typePass:type}
            placeholder={placeholder}
            className='font-Pacifico font-bold '
         />
              {type === 'password' ? (
              <span onClick={changState}>
                {passState? icon:<EyeInvisibleOutlined/>}
              </span>
            ):icon}
          </div>
        )}
      />
    </div>
  );
};
export default CustomInput