import { Thumbnail } from "@remotion/player";
import { useState } from "react";
import PlayerDialog from "./PlayerDialog";
import RemotionVideo from "./RemotionVideo";

export function VideoList({ videoList }) {

  const [playVideo, setPlayVideo] = useState(false);
  const [videoId, setVideoId] = useState();

  return (
    <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
      {videoList?.map((video, index) => (
        <div key={index} className="cursor-pointer hover:scale-105 transition-all" onClick={() => { setPlayVideo(Date.now()); setVideoId(video?.id); }}>
          <Thumbnail
            component={RemotionVideo}
            compositionWidth={250}
            compositionHeight={390}
            frameToDisplay={30}
            durationInFrames={120}
            fps={30}
            style={{ borderRadius: 15 }}
            inputProps={{
              ...video, setDurationInFrame: (v) => { }
            }}
          />
        </div>
      ))}

      {videoId && (<PlayerDialog playVideo={playVideo} videoId={videoId} />)}
    </div>
  )
} 
