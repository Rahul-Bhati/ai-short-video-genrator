import React, { useEffect, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Player } from "@remotion/player";
import RemotionVideo from './RemotionVideo';
import { Button } from '@/components/ui/button';
import { db } from '@/config/db';
import { VideoData } from '@/config/schema';
import { eq } from 'drizzle-orm';
import { useRouter } from 'next/navigation';


const PlayerDialog = ({ playVideo, videoId }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [videoData, setVideoData] = useState();
  const [durationInFrame, setDurationInFrame] = useState(120);

  const router = useRouter();
  useEffect(() => {
    setOpenDialog(playVideo);
    videoId && GetVideoData();
  }, [playVideo, videoId]);

  const GetVideoData = async () => {
    const result = await db.select().from(VideoData).where(eq(VideoData.id, videoId));
    console.log(result[0])
    setVideoData(result[0]);

  }

  // console.log("setDurationInFrame"+Number(durationInFrame.toFixed(0)))

  return (
    <Dialog open={openDialog}>
      <DialogContent className="flex flex-col items-center">
        <DialogHeader>
          <DialogTitle className="font-bold text-3xl my-5">Your Video Is Ready!</DialogTitle>
          <DialogDescription>
            {videoData && (

              <Player
                component={RemotionVideo}
                durationInFrames={Number(durationInFrame.toFixed(0))}
                compositionWidth={300}
                compositionHeight={450}
                fps={30}
                controls={true}
                inputProps={{
                  ...videoData, setDurationInFrame: (frameValue) => setDurationInFrame(frameValue)
                }}
              />
            )}
            <div className='flex gap-10 mt-10 items-center justify-center'>
              <Button variant="ghost" onClick={() => { router.replace("/dashboard"); setOpenDialog(false) }}>cancle</Button>
              <Button >Export</Button>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>

  )
}

export default PlayerDialog
