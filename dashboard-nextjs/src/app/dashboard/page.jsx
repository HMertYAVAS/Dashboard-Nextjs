'use client';
import React, { useState, useEffect, Fragment } from 'react';
import { IoNotifications } from "react-icons/io5";
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import Tabs from '@/components/Tabs';
import Card from '@/components/Card';
import TaskPopup from '@/components/TaskPopup';




export default function DashboardPage() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    const accessToken = localStorage.getItem('token')
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Make API request to the Swagger-documented endpoint
        const response = await fetch('/api/boards', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `${accessToken}`
          }
        })

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const responseData = await response.json();
        setData(responseData.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  return (
    <div className="overflow-hidden w-full">
      <Navbar />
      <div className='flex flex-row'>
        <Sidebar />
        <div className='flex flex-col bg-gray-200 w-full h-screen relative'>
          <h1 className='text-3xl font-semibold my-8 mx-8 text-gray-800'>Tasks</h1>
          <Tabs />
          <div className='flex flex-col  mx-8 my-8 '>
            <div className='flex w-10/12 h-96 flex-row scrollbar scrollbar-thumb-slate-800 scrollbar-track-slate-600 overflow-x-scroll'>
              {data && data.map((card, index) => (
                <Card Board={card} key={index}/>
              ))}
            </div>
          </div>

        </div>
      </div>
      <TaskPopup/>

    </div>
  );
}

