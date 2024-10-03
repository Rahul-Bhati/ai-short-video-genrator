"use client";
import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
import EmptyState from './_components/EmptyState';
import Link from 'next/link';
import axios from 'axios';

function Dashboard() {
  const [videoList, setVideoList] = useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      
      /*      const response = await axios.post('large-text-to-speech.p.rapidapi.com', { "text": 'world' }, {
              headers: {
                'x-rapidapi-key': '06629e8cb3mshf12a4725a0e86a1p1c988cjsnc87605fdc959',
                'x-rapidapi-host': 'large-text-to-speech.p.rapidapi.com',
                'Content-Type': 'application/json',
                'X-RapidAPI-Mock-Response': '200'
              }
            });
      */

      // const apiKey = '830ffac592e645ee9e5841b78e09ab65'; // Replace with your actual API key
      // const language = 'en-us'; // Set the desired language code
      // const textToSpeech = 'Hello, world!'; // The text you want to convert to speech
      // const format = 'MP3'; // Audio format
      // const voice = 'Amy'; // Voice selection (optional)

      // const data = new URLSearchParams({
      //   key: apiKey,
      //   hl: language,
      //   src: textToSpeech,
      //   c: format,
      //   v: voice,
      // }).toString();

      // axios.post('https://api.voicerss.org/', data, {
      //   headers: {
      //     'Content-Type': 'application/x-www-form-urlencoded',
      //   },
      // })
      //   .then(response => {
      //     // Create a Blob from the response data
      //     const audioBlob = new Blob([response.data], { type: 'audio/mpeg' });

      //     // Create a URL for the audio Blob
      //     const audioUrl = URL.createObjectURL(audioBlob);

      //     // Create an audio element to hold the audio
      //     const audioElement = new Audio(audioUrl);

      //     // Create a button to play the audio
      //     const playButton = document.createElement('button');
      //     playButton.textContent = 'Play Audio';

      //     // Add a click event to the button
      //     playButton.addEventListener('click', () => {
      //       audioElement.play()
      //         .then(() => {
      //           console.log('Audio is playing');
      //         })
      //         .catch(error => {
      //           console.error('Error playing audio:', error);
      //         });
      //     });

      //     // Append the button to the document body (or any other container)
      //     document.body.appendChild(playButton);


      //     // Create a download link for the audio file
      //     const downloadLink = document.createElement('a');
      //     downloadLink.href = audioUrl;
      //     downloadLink.download = 'output.mp3'; // Specify the filename for the download
      //     downloadLink.textContent = 'Download Audio';

      //     // Append the download link to the document body
      //     document.body.appendChild(downloadLink);
      //   })
      //   .catch(error => {
      //     console.error('Error:', error.response ? error.response.data : error.message);
      //   });

      //      console.log(response)

    }

    fetchData();
  }, [])

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
    </div>
  )
}

export default Dashboard
