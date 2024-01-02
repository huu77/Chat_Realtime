import Home from './index'
 const homeRouters={
    path: "/home",
    element: <Home />,
    children: [
         {path:':id',
         element: <Home />,}
    ]
}
export default homeRouters