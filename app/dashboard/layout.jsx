"use client";
import { db } from '@/config/db';
import { Users } from '@/config/schema';
import { useUser } from '@clerk/nextjs';
import { eq } from 'drizzle-orm';
import { useEffect, useState } from 'react';
import { UserDetailContext } from '../_context/UserDetailContext';
import { VideoDataContext, VideoDataProvider } from '../_context/VideoDataContext';
import Header from './_components/Header';
import SideNav from './_components/SideNav';

export default function DashboardLayout({ children }) {
    const [videoData, setVideoData] = useState([]);
    const [userDetail, setUserDetail] = useState([]);

    const { user } = useUser();

    useEffect(() => {
        user && getUserDetail();
    }, [user]);

    const getUserDetail = async () => {
        const result = await db.select().from(Users).where(eq(Users.email, user?.primaryEmailAddress?.emailAddress));
        setUserDetail(result[0]);
    }
    return (
        // <UserDetailContext.Provider >
        <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
            <VideoDataContext.Provider value={{ videoData, setVideoData }}>
                <VideoDataProvider>
                    <div>
                        <div className='hidden md:block h-screen w-64 bg-white fixed mt-[65px]'>
                            <SideNav />
                        </div>
                        <div>
                            <Header />
                            <div className='md:ml-64 p-10 pt-20'>
                                {children}
                            </div>
                        </div>
                    </div>
                </VideoDataProvider>
            </VideoDataContext.Provider>
        </UserDetailContext.Provider>

        // </UserDetailContext.Provider>
    )
}