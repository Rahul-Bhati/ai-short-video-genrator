"use client";
import { Button } from '@/components/ui/button';
import { db } from '@/config/db';
import { VideoData } from '@/config/schema';
import { useUser } from '@clerk/nextjs';
import { eq } from 'drizzle-orm';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import EmptyState from './_components/EmptyState';
import { VideoList } from './_components/VideoList';

function Dashboard() {
  const [videoList, setVideoList] = useState([]);
  const { user } = useUser();
  const GetVideoData = async () => {
    const result = await db.select().from(VideoData).where(eq(VideoData?.createdBy, user?.primaryEmailAddress?.emailAddress));
    // console.log(result)
    setVideoList(result);
  }

  useEffect(() => {
    user && GetVideoData();
  }, [user])

  return (
    <div>
      <div className='flex justify-between items-center'>
        <h2 className='font-bold text-2xl text-primary'>Dashboard</h2>
        <Link href={"/dashboard/create-new"} >
          <Button>+ Create New</Button>
        </Link>
      </div>

      {/* Empty State */}
      {videoList?.length === 0 && <div><EmptyState /></div>}

      {/* List of videos */}
      <VideoList videoList={videoList} />
    </div>
  )
}

export default Dashboard
