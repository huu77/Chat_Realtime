import { createBrowserRouter } from 'react-router-dom'
import {routerHome,routerLogin,routerRegister,routerWellcome} from '../pages/router'
 
 
export const routers = createBrowserRouter([
  routerWellcome,
  routerHome,
  routerLogin,
  routerRegister
  
])
