import { Thumbnail } from "@remotion/player";
import RemotionVideo from "./RemotionVideo";
import { useState } from "react";
import PlayerDialog from "./PlayerDialog";

export function VideoList({ videoList }) {

  const [playVideo, setPlayVideo] = useState(false);
  const [videoId, setVideoId] = useState();

  return (
    <div className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10">
      {videoList?.map((video, index) => (
        <div key={index} className="cursor-pointer hover:scale-105 transition-all" onClick={() => { setPlayVideo(true); setVideoId(video?.id); }}>
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

      <PlayerDialog playVideo={playVideo} videoId={videoId} />
    </div>
  )
} 
