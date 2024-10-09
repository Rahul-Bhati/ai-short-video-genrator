"use client"
import { VideoDataContext } from '@/app/_context/VideoDataContext';
import { Button } from '@/components/ui/button';
import { db } from '@/config/db';
import { VideoData } from '@/config/schema';
import { useUser } from '@clerk/nextjs';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import PlayerDialog from '../_components/PlayerDialog';
import CustomLoading from './_components/CustomLoading';
import SelectDuraction from './_components/SelectDuraction';
import SelectStyle from './_components/SelectStyle';
import SelectTopic from './_components/SelectTopic';

const CreateNew = () => {
  //   const video = [
  //     {"ImagePrompt": "A close-up of Sarah's face, now pale and drawn, with her eyes filled with fear and a sense of dread. She stares into the darkness, knowing that she will never forget what she saw in the cabin.",
  //     "ContentText": "Sarah never went back to the woods, haunted by the chilling encounter. The memory of the glowing red eyes and the creature lurking in the shadows lingered, a constant reminder of the terror that lurked in the darkness."
  // },
  //     {
  //       "ImagePrompt": "A young woman, looking scared and alone, standing at the edge of the forest, the cabin in the background. Her eyes are wide with fear, and she is clutching a lantern tightly.",
  //       "ContentText": "One stormy night, a young woman named Sarah found herself lost in the woods. Seeking shelter, she stumbled upon the cabin, its windows dark and unwelcoming."
  //   }
  //   ]
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

  const onHandleInputChange = (fieldName, fieldValue) => {
    // console.log(fieldName, fieldValue);
    setFormData((prev) => ({ ...prev, [fieldName]: fieldValue }))
  }

  const handleCreateShortVideo = () => {
    getVideoScript();
    //GenrateAudioFile();
    // GenerateCaption("https://firebasestorage.googleapis.com/v0/b/netflix-a06cd.appspot.com/o/ai-short-video-files%2Fff329568-c42a-403c-b6a3-ec68357b21d7.mp3?alt=media&token=f9e75069-36dc-4aa7-b3d2-1af769140203");

    // GenerateImage();
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
    // let script = "Deep in the heart of the woods, where gnarled trees cast long, twisted shadows, there lived a creature of legend. They called him the Crooked Man, and he was feared by all who dared to venture into his domain. One day, a little girl named Lily, lost her way while searching for berries. As darkness fell, she heard a chilling giggle and saw a shadowy figure emerge from the trees. Lily ran, her heart pounding, as the Crooked Man gave chase, his laughter echoing through the woods. But Lily was no match for the Crooked Man's speed and strength. He caught her, and she knew her fate was sealed. The Crooked Man held a rusty sickle, ready to strike, his twisted grin a promise of terror. And so, Lily disappeared, her fate a chilling reminder of the dangers that lurked in the shadows.";

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
    // video.forEach(async (element) => {
    //   videoScriptData.forEach(async (element) => {
    //   await axios.post("/api/generate-image", {
    //     prompt: element?.ImagePrompt
    //   }).then(res => {
    //     console.log(res.data.result);
    //     images.push(res.data.result);
    //   })
    // })

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

    console.log("GenerateImage", images, videoScript, captions, audioFile);
    setImageList(images);
    setLoading(false);
  }

  useEffect(() => {
    console.log("useeffect videoData ", videoData);

    if (Object.keys(videoData).length === 4) SaveData(videoData);
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

    console.log(result);
    setVideoId(result[0].id);
    setPlayVideo(true);
    setLoading(false);
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
