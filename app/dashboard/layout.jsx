"use client";
import React, { useState } from 'react'
import Header from './_components/Header'
import SideNav from './_components/SideNav'
import { VideoDataContext } from '../_context/VideoDataContext'

export default function DashboardLayout({ children }) {
    const [videoData, setVideoData] = useState([]);
    return (
        <VideoDataContext.Provider value={{videoData, setVideoData}}>

        <div>
            <div className='hidden md:block h-screen w-64 bg-white fixed mt-[65px]'>
                <SideNav />
            </div>
            <div>
                <Header />
                <div className='md:ml-64 p-10'>
                    {children}
                </div>
            </div>
        </div>
        </VideoDataContext.Provider>
    )
}