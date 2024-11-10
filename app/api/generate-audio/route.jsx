import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { promises as fs } from 'fs';
import path from 'path';
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from '@/config/FirebaseConfig';


export async function POST(req) {
  try {
    // Parse the request body for the text content to convert to speech
    const { text, id, voice } = await req.json();

    const storageRef = ref(storage, "ai-short-video-files/" + id + ".mp3");
    // console.log(text, id);

    if (!text) {
      return NextResponse.json({ error: 'Text is required' }, { status: 400 });
    }
    // 

    // Check text length limit for non-Linda voices
    if (voice !== 'Linda') {
      // Approximate words per minute for average speech
      const wordsPerMinute = 150;
      const wordCount = text.split(/\s+/).length;
      const estimatedMinutes = wordCount / wordsPerMinute;

      if (estimatedMinutes > 1) {
        return NextResponse.json({
          error: 'Text is too long. Please limit to approximately 150 words for 1 minute audio.'
        }, { status: 400 });
      }
    }

    const apiUrl = 'https://api.voicerss.org/';

    const params = new URLSearchParams({
      key: process.env.NEXT_PUBLIC_RSS_VOICE_API_KEY,
      src: text,
      hl: 'en-us',
      v: voice,
      c: 'MP3',
      f: '16khz_16bit_stereo',
      r: '-2'
    });

    const response = await axios({
      url: apiUrl,
      method: 'POST',
      data: params.toString(),
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      responseType: 'arraybuffer',
    });

    const audioBuffer = Buffer.from(response.data, 'binary');
    await uploadBytes(storageRef, audioBuffer, { contentType: "audio/mp3" });

    const downloadUrl = await getDownloadURL(storageRef);

    //const filePath = path.join(process.cwd(), 'public', 'output.mp3');
    //await fs.writeFile(filePath, response.data);

    // console.log(downloadUrl);
    return NextResponse.json({ result: downloadUrl, message: 'File saved successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error generating TTS:', error);
    return NextResponse.json({ error: 'Failed to generate TTS' }, { status: 500 });
  }
}
