"use client"
import React, { useState, useEffect } from 'react'
import SelectTopic from './_components/SelectTopic'
import SelectStyle from './_components/SelectStyle';
import SelectDuraction from './_components/SelectDuraction';
import { Button } from '@/components/ui/button'
import axios from 'axios';
import CustomLoading from './_components/CustomLoading';
import { v4 as uuidv4 } from 'uuid';

const CreateNew = () => {
  const [loading, setLoading] = useState(false);
  const [videoScript, setVideoScript] = useState();
  const [formData, setFormData] = useState([]);
  const [audioFile, setAudioFile] = useState();
  const [captions, setCaptions] = useState();

  const onHandleInputChange = (fieldName, fieldValue) => {
    console.log(fieldName, fieldValue);
    setFormData((prev) => ({ ...prev, [fieldName]: fieldValue }))
  }

  const handleCreateShortVideo = () => {
    // getVideoScript();
    //GenrateAudioFile();
    GenerateCaption("https://firebasestorage.googleapis.com/v0/b/netflix-a06cd.appspot.com/o/ai-short-video-files%2Fff329568-c42a-403c-b6a3-ec68357b21d7.mp3?alt=media&token=f9e75069-36dc-4aa7-b3d2-1af769140203");
  }

  // Get Video Script
  const getVideoScript = async () => {
    setLoading(true);
    const prompt = `write a script to genrate ${formData.duration} video on topic : ${formData.topic} along with Ai Image prompt in ${formData.imageStyle} format for each scene and give me result in json format with ImagePrompt and ContentText as field`;

    console.log(prompt);
    const response = await axios.post('/api/get-video-script', {
      prompt: prompt
    }).then((res) => {
      setVideoScript(res?.data?.result);
      // console.log(res.data.result);
      GenrateAudioFile(res.data.result);
    });
    setLoading(false);
  }

  // get audio
  const GenrateAudioFile = async (videoScriptData) => {
    let script = "Deep in the heart of the woods, where gnarled trees cast long, twisted shadows, there lived a creature of legend. They called him the Crooked Man, and he was feared by all who dared to venture into his domain. One day, a little girl named Lily, lost her way while searching for berries. As darkness fell, she heard a chilling giggle and saw a shadowy figure emerge from the trees. Lily ran, her heart pounding, as the Crooked Man gave chase, his laughter echoing through the woods. But Lily was no match for the Crooked Man's speed and strength. He caught her, and she knew her fate was sealed. The Crooked Man held a rusty sickle, ready to strike, his twisted grin a promise of terror. And so, Lily disappeared, her fate a chilling reminder of the dangers that lurked in the shadows.";
    const id = uuidv4();
    // videoScriptData.forEach((element) => {
    //   script = script + element.ContentText + " ";
    // });

    console.log(script, id);

    // await axios.post('/api/generate-audio', {
    //   text: script,
    //   id:id
    // }).then((res) => {
    //   console.log(res.data);
    // });

    try {
      const response = await axios.post('/api/generate-audio', {
        text: script,
        id: id
      });
      //console.log(response.data);
      setAudioFile(response?.data?.result);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  const GenerateCaption = async (audioFileData) => {
    setLoading(true);
    await axios.post("/api/generate-caption", {
      audioFileUrl: audioFileData
    }).then(res => {
      console.log(res.data.result);
      setCaptions(res?.data?.result);
    })

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
    </div >
  )
}

export default CreateNew
