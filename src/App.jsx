import React, { useContext } from 'react'
import Login from './Components/UserLogin/Login'
import context from './Context/Context'
import UpdateData from './Components/UpdateData/UpdateData'
import './App.css'
const App = () => {
  const {isLogin} = useContext(context)
  return (
    <>
     {isLogin ? <UpdateData />:<Login />}
    </>
  )
}

export default App