import { createContext, useState } from "react";

export const VideoDataContext = createContext();

export const VideoDataProvider = ({ children }) => {
    const [videoData, setVideoData] = useState({
        loading: false,
        videoScript: null,
        audioFile: null,
        captions: null,
        imageList: null
    });

    const updateVideoData = (key, value) => {
        setVideoData((prev) => ({
            ...prev,
            [key]: value
        }));
    };

    return (
        <VideoDataContext.Provider value={{ videoData, updateVideoData }}>
            {children}
        </VideoDataContext.Provider>
    );
};