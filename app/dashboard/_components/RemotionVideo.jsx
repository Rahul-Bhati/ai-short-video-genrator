import React from 'react'
import { AbsoluteFill, Audio, Img, Sequence, useVideoConfig } from 'remotion'

const RemotionVideo = ({script, audioFileUrl, imageList, captions,setDurationInFrame}) => {
    const { fps } = useVideoConfig();
  const getDuractionFrames = () => {
    setDurationInFrame(captions[captions?.length-1]?.end / 1000 * fps);
    return captions[captions?.length-1]?.end / 1000 * fps;
  }


    return (
    <AbsoluteFill className='bg-black'>
        {imageList?.map((item, index) => (
            <>
                <Sequence key={index} from={((index*getDuractionFrames())/imageList?.length)} durationInFrames={getDuractionFrames()} className="flex justify-center items-center">
                    <AbsoluteFill style={{justifyContent:"center", alignItems:"center"}}>
                        <Img src={item} style={{width:"100%", height:"100%", objectFit:"cover"}}/>
                        <AbsoluteFill style={{color:"white",justifyContent:"center", top:undefined,bottom:50,height:150, alignItems:"center",textAlign:"center", width:"100%"}}>
                            <h2 className="text-2xl">ccccc</h2>
                        </AbsoluteFill>
                    </AbsoluteFill>
                </Sequence>
            </>
        ))}
        <Audio src={audioFileUrl}/>
        </AbsoluteFill>
  )
}

export default RemotionVideo