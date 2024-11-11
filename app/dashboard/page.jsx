"use client";
import { Button } from '@/components/ui/button';
import { db } from '@/config/db';
import { VideoData } from '@/config/schema';
import { useUser } from '@clerk/nextjs';
import { eq } from 'drizzle-orm';
import Link from 'next/link';
import { useEffect, useState, useCallback } from 'react';
import EmptyState from './_components/EmptyState';
import { VideoList } from './_components/VideoList';

function Dashboard() {
  const [videoList, setVideoList] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state for data fetching
  const { user } = useUser();

  // Fetch video data only when the user is defined and data hasn't been fetched yet
  const fetchVideoData = useCallback(async () => {
    if (!user?.primaryEmailAddress?.emailAddress) return;
    try {
      const result = await db
        .select()
        .from(VideoData)
        .where(eq(VideoData.createdBy, user.primaryEmailAddress.emailAddress));
      setVideoList(result);
    } catch (error) {
      console.error("Error fetching video data:", error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchVideoData();
  }, [fetchVideoData]);

  return (
    <>
      <div className="flex justify-between w-full items-center">
        <h2 className="font-bold text-2xl text-primary">Dashboard</h2>
        <Link href="/dashboard/create-new">
          <Button>+ Create New</Button>
        </Link>
      </div>
      <div className="flex justify-center items-center my-auto py-auto">
        {loading ? (
          <img src='/loading.gif' alt='fetching data' className='flex justify-center items-center w-[100px]' />
        ) : videoList.length === 0 ? (
          <EmptyState />
        ) : (
          <VideoList videoList={videoList} />
        )}

      </div>
    </>
  );
}

export default Dashboard;
