'use client';
import React, { useState, useEffect } from 'react';
import { IoNotifications } from "react-icons/io5";



export default function DashboardPage() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const accessToken = localStorage.getItem('token')

  useEffect(() => {
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
  }, [accessToken]);


  return (
    <div className="">
      <nav class=" bg-white border-gray-200 dark:bg-gray-900">
        <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xs p-4">
          <a href="#" class="flex items-center space-x-3 rtl:space-x-reverse">
            <span class="self-center text-3xl font-semibold whitespace-nowrap dark:text-white">LOGO</span>
          </a>
          <div class="flex items-center space-x-6 rtl:space-x-reverse">
            <a href="#" class="text-sm  text-blue-600 dark:text-blue-500 hover:underline">{<IoNotifications size={'2em'} />}</a>
          </div>
        </div>
      </nav>

      <aside className='h-screen w-64 bg-gray-900'>
        <div className='flex-col'>
          <div className='p-10'>
            <div>name</div>
            <div>name</div>
          </div>
          

        </div>

      </aside>

     
    </div>
  );
}

