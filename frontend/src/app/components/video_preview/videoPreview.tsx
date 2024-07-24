"use client";
import { useRef } from "react";
import React from "react";
import VideoPlayer from "./VideoPlayer";

interface VideoPreviewProps {
  finished: boolean;
}

const VideoPreview: React.FC<VideoPreviewProps> = (props) => {
  const {finished} = props;

  const videoJsOptions = {
    autoplay: false,
    controls: true,
    responsive: true,
    fluid: true,
    sources: [
      {
        src: `http://${window.location.hostname}:8000/video/output.m3u8`,
        type: "application/x-mpegURL",
      },
    ],
  };

  return (
    <>
      <div className="flex mx-auto w-full bg-[#f0f0f0] p-[10px] h-full flex-col justify-center">
        {
            finished ? 
            <VideoPlayer options={videoJsOptions} /> 
            // <video controls width="100%" src={videoSrc}></video>
            :
            <h1 className="mx-auto text-xl">You can view output after generated</h1>
        }
      </div>
    </>
  );
}

export default VideoPreview;
