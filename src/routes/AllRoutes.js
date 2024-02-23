import React from 'react'
import { Route, Routes } from 'react-router'
import { HomePage, ChatPage } from '../pages'

import Signup from '../components/Signup'

function AllRoutes() {
  return (
    <>
    <Routes>
        <Route path='/' element = { <HomePage/> }  />
        <Route path='/signup' element = { <Signup/> }  />
        <Route path='/chat' element = { <ChatPage/> }  />
    </Routes>
    </>
  )
}

export default AllRoutes