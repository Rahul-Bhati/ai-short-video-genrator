import { useState } from 'react';
import axios from 'axios';
import { db } from '@/config/db';
import { Users, VideoData } from '@/config/schema';
import { eq } from 'drizzle-orm';
import { v4 as uuidv4 } from 'uuid';

/**
 * Hook to fetch the video script based on a prompt.
 */
export const useGetVideoScript = () => {
    const [error, setError] = useState(null);

    const getVideoScript = async (prompt) => {
        setError(null);
        try {
            const response = await axios.post('/api/get-video-script', { prompt });
            return response.data.result;
        } catch (err) {
            setError(err);
            console.error("Error fetching video script:", err);
            throw err; // Rethrow to allow caller to handle if needed
        }
    };

    return { getVideoScript, error };
};

/**
 * Hook to generate an audio file from the given script.
 */
export const useGenerateAudio = () => {
    const [error, setError] = useState(null);

    const generateAudio = async (videoScriptData) => {
        let script = '';
        videoScriptData.forEach((element) => {
            script = script + element.ContentText + " ";
        });
        setError(null);
        const id = uuidv4(); // Generate a unique ID for the audio file
        try {
            const response = await axios.post('/api/generate-audio', { text: script, id, voice: "Linda" });
            return response.data.result;
        } catch (err) {
            setError(err);
            console.error("Error generating audio:", err);
            throw err;
        }
    };

    return { generateAudio, error };
};

/**
 * Hook to generate captions from an audio file URL.
 */
export const useGenerateCaption = () => {
    const [error, setError] = useState(null);

    const generateCaption = async (audioFileUrl) => {
        setError(null);
        try {
            const response = await axios.post('/api/generate-caption', { audioFileUrl });
            return response.data.result;
        } catch (err) {
            setError(err);
            console.error("Error generating captions:", err);
            throw err;
        }
    };

    return { generateCaption, error };
};

/**
 * Hook to generate images based on prompts from the video script.
 */
export const useGenerateImage = () => {
    const [error, setError] = useState(null);

    const generateImage = async (videoScriptData) => {
        setError(null);
        const images = [];
        try {
            for (const element of videoScriptData) {
                const response = await axios.post('/api/generate-image', { prompt: element.ImagePrompt });
                images.push(response.data.result);
            }
            return images;
        } catch (err) {
            setError(err);
            console.error("Error generating images:", err);
            throw err;
        }
    };

    return { generateImage, error };
};

/**
 * Utility function to save video data to the database.
 */
export const saveVideoData = async (videoData, userEmail) => {
    try {
        const result = await db.insert(VideoData).values({
            script: videoData.videoScript,
            audioFileUrl: videoData.audioFileUrl,
            captions: videoData.captions,
            imageList: videoData.imageList,
            createdBy: userEmail
        }).returning({ id: VideoData.id });
        return result[0].id;
    } catch (error) {
        console.error("Error saving video data:", error);
        return null;
    }
};

/**
 * Utility function to update user credits after video creation.
 */
export const updateUserCredits = async (userDetail, setUserDetail) => {
    try {
        await db.update(Users)
            .set({ credits: userDetail.credits - 10 })
            .where(eq(Users.email, userDetail.email));
        setUserDetail(prev => ({ ...prev, credits: prev.credits - 10 }));
    } catch (error) {
        console.error("Error updating user credits:", error);
    }
};
