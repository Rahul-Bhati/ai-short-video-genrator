import React from 'react'
import Header from './_components/Header'
import SideNav from './_components/SideNav'

export default function DashboardLayout({ children }) {
    return (
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
    )
}