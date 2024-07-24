"use client";
import { useRef } from "react";
import VideoPlayer from "./VideoPlayer";

function VideoPreview({finished}) {
  var videoSrc = `${process.env.NEXT_PUBLIC_BACKEND_URL}/video/output.m3u8`;

  const playerRef = useRef(null);

  const videoJsOptions = {
    autoplay: false,
    controls: true,
    responsive: true,
    fluid: true,
    sources: [
      {
        src: videoSrc,
        type: "application/x-mpegURL",
      },
    ],
  };

  const handlePlayerReady = (player) => {
    playerRef.current = player;
  };

  return (
    <>
      <div className="flex mx-auto w-full bg-[#f0f0f0] p-[10px] h-full flex-col justify-center">
        {
            finished ? 
            <VideoPlayer options={videoJsOptions} onReady={handlePlayerReady} /> 
            // <video controls width="100%" src={videoSrc}></video>
            :
            <h1 className="mx-auto text-xl">You can view output after generated</h1>
        }
      </div>
    </>
  );
}

export default VideoPreview;
