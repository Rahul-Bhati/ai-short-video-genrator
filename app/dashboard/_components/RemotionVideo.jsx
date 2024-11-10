import { AbsoluteFill, Audio, Img, interpolate, Sequence, useCurrentFrame, useVideoConfig } from 'remotion';

const RemotionVideo = ({ script, audioFileUrl, imageList, captions, setDurationInFrame }) => {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();
  const getDuractionFrames = () => {
    setDurationInFrame(captions[captions?.length - 1]?.end / 1000 * fps);
    return captions[captions?.length - 1]?.end / 1000 * fps;
  }

  const getCurrentWordFromCaptions = () => {
    const currTime = frame / 30 * 1000;
    const currCaption = captions.find((word) => currTime >= word.start && currTime <= word.end);
    return currCaption ? currCaption?.text : "";
  }

  return script && (
    <AbsoluteFill className='bg-black'>
      {imageList?.map((item, index) => {
        const startTime = ((index * getDuractionFrames()) / imageList?.length);
        const duration = getDuractionFrames();

        const scale = (idx) => interpolate(
          frame, [startTime, startTime + duration / 2, startTime + duration],
          idx % 2 == 0 ? [1, 1.8, 1] : [1.8, 1, 1.8], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );
        return (
          <Sequence key={index} from={startTime} durationInFrames={getDuractionFrames()} className="flex justify-center items-center">
            <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
              <Img src={item} style={{ width: "100%", height: "100%", objectFit: "cover", transform: `scale(${scale(index)})` }} />
              <AbsoluteFill style={{ color: "white", justifyContent: "center", top: undefined, bottom: 50, height: 150, alignItems: "center", textAlign: "center", width: "100%" }}>
                <h2 className="text-2xl">{getCurrentWordFromCaptions()}</h2>
              </AbsoluteFill>
            </AbsoluteFill>
          </Sequence>
        )
      }
      )}
      <Audio src={audioFileUrl} />
    </AbsoluteFill>
  )
}

export default RemotionVideo