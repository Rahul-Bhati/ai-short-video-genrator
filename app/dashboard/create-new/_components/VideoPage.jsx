"use client";

import { useContext, useState, useCallback } from 'react';
import { VideoDataContext } from '@/app/_context/VideoDataContext';
import { UserDetailContext } from '@/app/_context/UserDetailContext';
import { useUser } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import dynamic from 'next/dynamic';
import {
    useGetVideoScript,
    useGenerateAudio,
    useGenerateCaption,
    useGenerateImage,
    saveVideoData,
    updateUserCredits
} from '@/lib/videoAPI';
import { debounce } from 'lodash';
import { toast } from 'sonner';

// Dynamically import components for code splitting
const SelectTopic = dynamic(() => import('./SelectTopic'));
const SelectStyle = dynamic(() => import('./SelectStyle'));
const SelectDuration = dynamic(() => import('./SelectDuraction'));
const PlayerDialog = dynamic(() => import('../../_components/PlayerDialog'));
const CustomLoading = dynamic(() => import('./CustomLoading'));

const VideoPage = () => {
    const { user } = useUser();
    const { userDetail, setUserDetail } = useContext(UserDetailContext);
    const { videoData, updateVideoData } = useContext(VideoDataContext);

    const [playVideo, setPlayVideo] = useState(false);
    const [videoId, setVideoId] = useState(null);
    const [formData, setFormData] = useState({});

    // Initialize custom hooks
    const { getVideoScript, error: scriptError } = useGetVideoScript();
    const { generateAudio, error: audioError } = useGenerateAudio();
    const { generateCaption, error: captionError } = useGenerateCaption();
    const { generateImage, error: imageError } = useGenerateImage();

    // Debounced input change handler to improve performance
    const onHandleInputChange = useCallback(
        debounce((fieldName, fieldValue) => {
            setFormData((prev) => ({ ...prev, [fieldName]: fieldValue }));
        }, 300),
        []
    );

    const handleCreateShortVideo = async () => {
        if (userDetail?.credits <= 0) {
            toast.error("You don't have enough credits.");
            return;
        }

        // Update loading state in context
        updateVideoData('loading', true);

        try {
            // Construct the prompt based on form data
            const prompt = `Write a script to generate a ${formData.duration} minute video on the topic: ${formData.topic} using ${formData.imageStyle} image style. Provide the result in JSON format with 'ImagePrompt' and 'ContentText' fields for each scene.`;

            // Step 1: Get Video Script
            const script = await getVideoScript(prompt);
            if (!script) throw new Error("Failed to generate video script.");
            updateVideoData('videoScript', script);

            // Step 2: Generate Audio from Script
            const audioFileUrl = await generateAudio(script);
            if (!audioFileUrl) throw new Error("Failed to generate audio.");
            updateVideoData('audioFile', audioFileUrl);

            // Step 3: Generate Captions from Audio
            const captions = await generateCaption(audioFileUrl);
            if (!captions) throw new Error("Failed to generate captions.");
            updateVideoData('captions', captions);

            // Step 4: Generate Images for Each Scene
            const imageList = await generateImage(script);
            if (!imageList) throw new Error("Failed to generate images.");
            updateVideoData('imageList', imageList);

            // Consolidate video data
            const videoDataToSave = {
                videoScript: script,
                audioFileUrl,
                captions,
                imageList
            };

            // Step 5: Save Video Data to Database
            const savedId = await saveVideoData(videoDataToSave, user?.primaryEmailAddress?.emailAddress);
            if (!savedId) throw new Error("Failed to save video data.");

            setVideoId(savedId);
            setPlayVideo(true);

            // Step 6: Update User Credits
            await updateUserCredits(userDetail, setUserDetail);

            toast.success("Short video created successfully!");
        } catch (error) {
            console.error("Error creating short video:", error);
            toast.error(error.message || "An error occurred while creating the video.");
        } finally {
            // Reset loading state
            updateVideoData('loading', false);
        }
    };

    return (
        <div className="md:px-10">
            <h2 className="font-bold text-4xl text-primary text-center">Create New</h2>
            <div className="mt-10 p-10 shadow-md">
                {/* Select Topic */}
                <SelectTopic onUserSelect={onHandleInputChange} />
                {/* Select Style */}
                <SelectStyle onUserSelect={onHandleInputChange} />
                {/* Select Duration */}
                <SelectDuration onUserSelect={onHandleInputChange} />
                {/* Create Button */}
                <Button
                    className="mt-10 w-full"
                    onClick={handleCreateShortVideo}
                    disabled={videoData.loading} // Disable button while loading
                >
                    {videoData.loading ? "Creating..." : "Create Short Video"}
                </Button>
            </div>
            {/* Loading Indicator */}
            <CustomLoading loading={videoData.loading} />

            {/* Player Dialog */}
            {playVideo && <PlayerDialog playVideo={playVideo} videoId={videoId} />}
        </div>
    );
};

export default VideoPage;
