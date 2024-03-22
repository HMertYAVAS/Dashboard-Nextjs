import React from 'react'
import { IoNotifications } from 'react-icons/io5'

export default function Navbar() {
  return (
    <nav className=" bg-white border-gray-200 dark:bg-gray-900">
    <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xs p-4">
      <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
        <span className="self-center text-3xl font-semibold whitespace-nowrap dark:text-white">LOGO</span>
      </a>
      <div className="flex items-center space-x-6 rtl:space-x-reverse">
        <a href="#" className="text-sm  text-blue-600 dark:text-blue-500 hover:underline">{<IoNotifications size={'2em'} />}</a>
      </div>
    </div>
  </nav>
  )
}
