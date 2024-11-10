"use client"
import { act, useContext, useEffect, useRef, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Youtube, BookOpen, Instagram } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { v4 as uuidv4 } from 'uuid';

import VideoPage from './_components/VideoPage'
import ImagePage from './_components/ImagePage'
import CustomLoading from './_components/CustomLoading'

import { template } from '@/lib/template'
import axios from 'axios'
import { db } from '@/config/db'
import { Users, VideoData } from '@/config/schema';
import { useUser } from '@clerk/nextjs'
import { UserDetailContext } from '@/app/_context/UserDetailContext'
import { eq } from 'drizzle-orm'

const formatResponse = (text) => {
  // Split into lines
  const lines = text.split('\n');
  let formattedHtml = '';

  lines.forEach(line => {
    if (line.trim()) {  // Only process non-empty lines
      // Handle headings
      const headingMatch = line.match(/^(#{1,6})\s+(.+)$/);
      if (headingMatch) {
        const level = headingMatch[1].length; // Number of # symbols
        const headingText = headingMatch[2];
        formattedHtml += `<h${level} class="font-bold ${level === 1 ? 'text-3xl mb-4 mt-6' :
          level === 2 ? 'text-2xl mb-3 mt-5' :
            level === 3 ? 'text-xl mb-2 mt-4' :
              level === 4 ? 'text-lg mb-2 mt-3' :
                'text-base mb-2 mt-2'
          }">${headingText}</h${level}>`;
      }
      // Process bold text for non-heading lines
      else {
        const processedLine = line.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
        formattedHtml += `<p class="mb-2">${processedLine}</p>`;
      }
    }
  });

  return formattedHtml;
};

export default function Page() {
  const [activeTab, setActiveTab] = useState("text")

  const textRef = useRef();
  const voicetextRef = useRef();

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [voice, setVoice] = useState("Amy");
  const [audioFile, setAudioFile] = useState(null);
  const [textScript, setTextScript] = useState("assistant");

  const { user } = useUser();
  const { userDetail, setUserDetail } = useContext(UserDetailContext);

  const genText = async () => {
    // setPrompt(textRef.current.value);

    setLoading(true);
    try {

      let requestBody = {
        "messages": [
          { "role": "system", "content": "You are a helpful assistant." },
          { "role": "user", "content": textScript + textRef.current.value }
        ],
        "model": "openai",
        "seed": 42,
        "jsonMode": true
      };

      const response = await fetch('https://text.pollinations.ai/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const res = await response.text();
      setData(formatResponse(res));
      // console.log(res)
    } catch (error) {
      console.log("Error", error)
    }
    setLoading(false);
  };

  const genVoice = async () => {
    setLoading(true);
    const id = uuidv4();

    try {
      const response = await axios.post('/api/generate-audio', {
        text: voicetextRef.current.value,
        id: id,
        voice: voice
      });
      // console.log("GenrateAudioFile " ,response.data);
      await db.update(Users).set({ credits: userDetail?.credits - 5 }).where(eq(Users?.email, user?.primaryEmailAddress?.emailAddress));

      setUserDetail(prev => ({
        ...prev, "credits": userDetail?.credits - 5
      }));

      setAudioFile(response?.data?.result);
    } catch (err) {
      alert(err?.response?.data?.error);
      console.error('Error:', err);
    }
    setLoading(false);
  }


  return (
    <>
      <div className='min-h-screen-600 px-6 py-10 bg-gradient-to-r from-purple-500 to-pink-500'>
        <div className="max-w-4xl mx-auto space-y-6 ">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-fit mx-auto rounded-3xl px-4 py-2">
            <TabsList className="bg-white/20 transition-all animate-in text-white">
              <TabsTrigger value="text" className=" data-[state=active]:bg-purple-700 data-[state=active]:text-white" onClick={() => setActiveTab("text")}>Text</TabsTrigger>
              <TabsTrigger value="voice" className="  data-[state=active]:bg-purple-700 data-[state=active]:text-white" onClick={() => setActiveTab("voice")}>Voice</TabsTrigger>
              <TabsTrigger value="image" className="  data-[state=active]:bg-purple-700 data-[state=active]:text-white" onClick={() => setActiveTab("image")}>Image</TabsTrigger>
              <TabsTrigger value="video" className="  data-[state=active]:bg-purple-700 data-[state=active]:text-white" onClick={() => setActiveTab("video")}>Video</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>
      <CustomLoading loading={loading} />
      <div className="min-h-screen-600 py-2 md:p-6" >
        <div className="max-w-4xl mx-auto space-y-6 ">


          {/* Text Templates Section */}
          {activeTab === "text" && (
            <>
              <div className="relative">
                <Input
                  ref={textRef}
                  placeholder="ask your query here..."
                  className="w-full py-6 pr-24 text-lg bg-white rounded-full shadow-lg"
                />
                <Button className="absolute right-5 top-1/2 transform -translate-y-1/2 bg-purple-700 hover:bg-purple-800 text-white" onClick={genText}>
                  Go
                </Button>

              </div>
              <div className="relative flex gap-4 flex-wrap items-center">
                <label>Template</label>
                <Select onValueChange={(value) => setTextScript(value)}>
                  <SelectTrigger className="w-[260px]">
                    <SelectValue placeholder="Select Template" />
                  </SelectTrigger>
                  <SelectContent>
                    {template.map((model, index) => (
                      <SelectItem value={model.script} key={index}>{model.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="bg-white rounded-lg md:p-6">

                {textRef.current?.value && (
                  <div className="flex flex-col gap-4">
                    {/* <div className="max-w-[80%] self-end p-4 bg-purple-100 rounded-2xl rounded-tr-none">
                      <p className="text-gray-800">{textRef.current.value}</p>
                      <span className="text-xs text-gray-500 mt-1 block">You</span>
                    </div> */}
                    <div className="max-w-[80%] self-start p-4 bg-white shadow-sm rounded-2xl rounded-tl-none">
                      <div
                        className="text-gray-800 prose prose-sm max-w-none"
                        dangerouslySetInnerHTML={{ __html: data }}
                      />
                      <span className="text-xs text-gray-500 mt-1 block">AI Assistant</span>
                    </div>
                  </div>
                )}
                {/* <h2 className="text-2xl font-bold mb-4">Templates</h2>
              <p className="text-gray-600 mb-6">Pick from our curated templates</p>

              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                <Card className="bg-red-500 text-white">
                  <CardContent className="p-6 flex flex-col items-center justify-center h-40">
                    <Youtube size={40} />
                    <h3 className="md:text-base text-xl font-semibold mt-4">Script for YouTube Video</h3>
                  </CardContent>
                </Card>
                <Card className="bg-purple-500 text-white">
                  <CardContent className="p-6 flex flex-col items-center justify-center h-40">
                    <BookOpen size={40} />
                    <h3 className="text-xl font-semibold mt-4">Full Blog Generator</h3>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-pink-500 to-orange-400 text-white">
                  <CardContent className="p-6 flex flex-col items-center justify-center h-40">
                    <Instagram size={40} />
                    <h3 className="text-xl font-semibold mt-4">Instagram Caption</h3>
                  </CardContent>
                </Card>
              </div> */}
              </div>
            </>

          )}

          {activeTab === "voice" && (
            <>
              <div className="relative">
                <Input
                  ref={voicetextRef}
                  placeholder="write text that you want to cahnge in voice..."
                  className="w-full py-6 pr-24 text-lg bg-white rounded-full shadow-lg"
                />
                <Button className="absolute right-5 top-1/2 transform -translate-y-1/2 bg-purple-700 hover:bg-purple-800 text-white" onClick={genVoice}>
                  Go
                </Button>

              </div>
              <div className="relative flex gap-4 flex-wrap items-center">
                <label>Select Voices</label>
                <Select onValueChange={(value) => setVoice(value)}>
                  <SelectTrigger className="w-[260px]">
                    <SelectValue placeholder="Default Amy" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Amy">Amy</SelectItem>
                    <SelectItem value="Mary">Mary</SelectItem>
                    <SelectItem value="John">John</SelectItem>
                    <SelectItem value="Mike">Mike</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="bg-white rounded-lg md:p-6">

                {audioFile && (
                  <>
                    {/* <h2 className="text-xs text-gray-500 mt-1 block">Generated Audio</h2> */}
                    <div className="flex flex-col gap-4 items-center">

                      <audio controls className="min-w-[100px] justify-center items-center self-center">
                        <source src={audioFile} type="audio/mp3" />
                        Your browser does not support the audio element.
                      </audio>

                    </div>

                  </>
                )}

              </div>
            </>

          )}

          {/* Image Templates Section */}
          {activeTab === "image" && (
            <ImagePage />
          )}

          {/* Video Section */}
          {activeTab === "video" && (
            <VideoPage />
          )}
        </div>
      </div>

    </>
  )
}
