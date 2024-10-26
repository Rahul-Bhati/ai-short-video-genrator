"use client"
import { UserDetailContext } from '@/app/_context/UserDetailContext';
import { VideoDataContext } from '@/app/_context/VideoDataContext';
import { Button } from '@/components/ui/button';
import { db } from '@/config/db';
import { Users, VideoData } from '@/config/schema';
import { useUser } from '@clerk/nextjs';
import axios from 'axios';
import { eq } from 'drizzle-orm';
import { useContext, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';
import PlayerDialog from '../_components/PlayerDialog';
import CustomLoading from './_components/CustomLoading';
import SelectDuraction from './_components/SelectDuraction';
import SelectStyle from './_components/SelectStyle';
import SelectTopic from './_components/SelectTopic';

const CreateNew = () => {
  const [loading, setLoading] = useState(false);
  const [videoScript, setVideoScript] = useState();
  const [formData, setFormData] = useState([]);
  const [audioFile, setAudioFile] = useState();
  const [captions, setCaptions] = useState();
  const [imageList, setImageList] = useState();

  // video data context
  const { videoData, setVideoData } = useContext(VideoDataContext);

  const { user } = useUser();

  const [playVideo, setPlayVideo] = useState(false);
  const [videoId, setVideoId] = useState();

  const { userDetail, setUserDetail } = useContext(UserDetailContext);

  const onHandleInputChange = (fieldName, fieldValue) => {
    // console.log(fieldName, fieldValue);
    setFormData((prev) => ({ ...prev, [fieldName]: fieldValue }))
  }

  const handleCreateShortVideo = () => {
    if (userDetail?.credits <= 0) {
      toast("You don't have enough credits.")
      return;
    }
    getVideoScript();
  }

  // Get Video Script
  const getVideoScript = async () => {
    setLoading(true);
    const prompt = `write a script to genrate ${formData.duration} video on topic : ${formData.topic} along with Ai Image prompt in ${formData.imageStyle} format for each scene and give me result in json format with ImagePrompt and ContentText as field`;

    // console.log(prompt);
    await axios.post('/api/get-video-script', {
      prompt: prompt
    }).then((res) => {
      setVideoData((prev) => ({
        ...prev,
        "videoScript": res.data.result
      }))
      setVideoScript(res?.data?.result);
      // console.log(res.data.result);
      GenrateAudioFile(res.data.result);
    });
    // setLoading(false);
  }

  // get audio
  const GenrateAudioFile = async (videoScriptData) => {
    setLoading(true);

    let script = '';
    const id = uuidv4();
    videoScriptData.forEach((element) => {
      script = script + element.ContentText + " ";
    });

    try {
      const response = await axios.post('/api/generate-audio', {
        text: script,
        id: id
      });
      // console.log("GenrateAudioFile " ,response.data);
      setVideoData((prev) => ({
        ...prev,
        "audioFileUrl": response.data.result
      }))
      setAudioFile(response?.data?.result);
      response.data.result && GenerateCaption(response.data.result, videoScriptData);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  // get captions
  const GenerateCaption = async (audioFileData, videoScriptData) => {
    setLoading(true);
    const res = await axios.post("/api/generate-caption", {
      audioFileUrl: audioFileData
    });
    setVideoData((prev) => ({
      ...prev,
      "captions": res.data.result
    }))
    // console.log("GenerateCaption ", res.data.result);
    setCaptions(res?.data?.result);
    res.data.result && GenerateImage(videoScriptData);
  }

  //get Image
  const GenerateImage = async (videoScriptData) => {
    let images = [];
    for (const element of videoScriptData) {
      try {
        const res = await axios.post("/api/generate-image", {
          prompt: element?.ImagePrompt
        });

        // console.log(res.data.result);
        images.push(res.data.result);
      } catch (error) {
        console.log("error", error);
      }
    }

    setVideoData((prev) => ({
      ...prev,
      "imageList": images
    }));

    // console.log("GenerateImage", images, videoScript, captions, audioFile);
    setImageList(images);
    setLoading(false);
  }

  useEffect(() => {
    // console.log("useeffect videoData ", videoData);

    videoData && (Object.keys(videoData).length === 4) ? SaveData(videoData) : "";
  }, [videoData]);

  // save in database
  const SaveData = async (videoData) => {
    setLoading(true);

    const result = await db.insert(VideoData).values({
      script: videoData?.videoScript,
      audioFileUrl: videoData?.audioFileUrl,
      captions: videoData?.captions,
      imageList: videoData?.imageList,
      createdBy: user?.primaryEmailAddress?.emailAddress
    }).returning({ id: VideoData?.id });

    // console.log(result);
    await UpdateUserCreadit();
    setVideoId(result[0].id);
    setPlayVideo(true);
    setLoading(false);
  }

  // udate creadits when user gen videos
  const UpdateUserCreadit = async () => {
    const result = await db.update(Users).set({ credits: userDetail?.credits - 10 }).where(eq(Users?.email, user?.primaryEmailAddress?.emailAddress));

    setUserDetail(prev => ({
      ...prev, "credits": userDetail?.credits - 10
    }));

    setVideoData(null)
  }

  return (
    <div className="md:px-10" >
      <h2 className="font-bold text-4xl text-primary text-center">Create New</h2>
      <div className="mt-10 p-10 shadow-md">
        {/* select topic */}
        <SelectTopic onUserSelect={onHandleInputChange} />
        {/* select style */}
        <SelectStyle onUserSelect={onHandleInputChange} />
        {/* Duration */}
        <SelectDuraction onUserSelect={onHandleInputChange} />
        {/* Create Button */}
        <Button className="mt-10 w-full" onClick={handleCreateShortVideo}>Create Short Video</Button>
      </div>
      <CustomLoading loading={loading} />

      {playVideo && (<PlayerDialog playVideo={playVideo} videoId={videoId} />)}
    </div >
  )
}

export default CreateNew
