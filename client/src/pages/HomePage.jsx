import React from 'react'
import { useState } from 'react'
import SideBar from '../components/SideBar'
import RightSidebar from '../components/RightSidebar'
import ChatContainer from '../components/ChatContainer'

const HomePage = () => {

    const [selectedUser , setSelectedUser] = useState(false)
    
  return (
    <div className='border w-full h-screen sm:px-[15%] sm:py-[5%]'>
      <div className={`backdrop-blur-xl border-2 border-gray-600 rounded-2xl overflow-hidden h-[100%] grid grid-cols-1 relative ${selectedUser ? 'md:grid-cols-fr-[1fr_1.5fr_1fr] xl:grid-cols-[1fr_2fr_1fr]' : 'md:grid-cols-2'}`}>
        <SideBar selectedUser={selectedUser} setselectedUser={setSelectedUser}/>
        <ChatContainer selectedUser={selectedUser} setselectedUser={setSelectedUser} />
        <RightSidebar selectedUser={selectedUser} setselectedUser={setSelectedUser} />
      </div>
    </div>
  )
}

export default HomePage
