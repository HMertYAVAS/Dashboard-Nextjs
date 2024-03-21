import React, { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { IoChevronDownCircleOutline } from 'react-icons/io5'
import { AiOutlineMenu } from "react-icons/ai";
import { Dropdown } from 'flowbite-react';



const projects = ['Project 1', 'Project 2', 'Project 3', 'Project 4']

export default function Sidebar() {
    return (
        <aside className=' '>
            <div className='h-screen w-16 bg-gray-900 visible sm:flex sm:hidden'>

                <button
                    data-drawer-target="default-sidebar"
                    data-drawer-toggle="default-sidebar"
                    aria-controls="default-sidebar"
                    type="button"
                    className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                >
                    <span className="sr-only">Open sidebar</span>
                    <svg
                        className="w-6 h-6"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            clip-rule="evenodd"
                            fill-rule="evenodd"
                            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                        ></path>
                    </svg>
                </button>
            </div>
            <div id='default-sidebar' className='h-screen w-64 bg-gray-900 flex-col hidden sm:flex sm:visible' >
                <div className='p-10 '>

                    {
                        projects.map((project, index) => (
                            <Menu as="div" key={index} className="relative inline-block text-left">
                                <div>
                                    <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md  px-3 py-2 text-sm font-semibold shadow-sm  hover:bg-slate-400">
                                        {project}
                                        <IoChevronDownCircleOutline className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
                                    </Menu.Button>
                                </div>

                                <Transition
                                    as={Fragment}
                                    enter="transition ease-out duration-100"
                                    enterFrom="transform opacity-0 scale-95"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-75"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-95"
                                >
                                    <Menu.Items className="absolute left-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                        <div className="py-1">

                                            <Menu.Item>

                                                <a
                                                    href="#"
                                                    className={
                                                        'text-gray-700 block w-full px-4 py-2 text-left text-sm hover:bg-slate-100'
                                                    }
                                                >
                                                    Overview
                                                </a>

                                            </Menu.Item>
                                            <Menu.Item>

                                                <a
                                                    href="#"
                                                    className={
                                                        'text-gray-700 block px-4 py-2 text-sm hover:bg-slate-100'}
                                                >
                                                    Notification
                                                </a>
                                            </Menu.Item>
                                            <Menu.Item>
                                                <button
                                                    type="submit"
                                                    className={
                                                        'text-gray-700 block w-full px-4 py-2 text-left text-sm hover:bg-slate-100'
                                                    }
                                                >
                                                    Analytics
                                                </button>
                                            </Menu.Item>
                                            <Menu.Item>

                                                <a
                                                    href="#"
                                                    className={
                                                        'text-gray-700 block px-4 py-2 text-sm hover:bg-slate-100'}
                                                >
                                                    Reports
                                                </a>
                                            </Menu.Item>
                                        </div>
                                    </Menu.Items>
                                </Transition>
                            </Menu>
                        ))
                    }
                </div>
            </div>
        </aside>
    )
}
