'use client';
import React, { useState, useEffect, Fragment } from 'react';
import { IoNotifications } from "react-icons/io5";
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import { Tab } from '@headlessui/react';
import Tabs from '@/components/Tabs';
import Card from '@/components/Card';



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
    <div className="overflow-hidden w-full">

      <Navbar />
      <div className='flex flex-row'>
        <Sidebar />
        <div className='flex flex-col bg-gray-200 w-full h-screen relative'>
          <h1 className='text-3xl font-semibold my-8 mx-8 text-gray-800'>Tasks</h1>
          <Tabs />
          <div className='flex flex-col  mx-8 my-8'>
            <div className='flex flex-row '>
              <Card />
              <Card />
              <Card />
            </div>
          </div>

        </div>
      </div>


    </div>
  );
}

