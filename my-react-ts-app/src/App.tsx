// import { RouterProvider } from 'react-router-dom';
// import { routers } from './routers';
import './App.css'
import './utils/i18next'
import { routers } from './routers';

import { RouterProvider } from 'react-router-dom';
function App() {
 
  
  return (
    <>
    <RouterProvider router={routers} />
  </>
  )
}

export default App
