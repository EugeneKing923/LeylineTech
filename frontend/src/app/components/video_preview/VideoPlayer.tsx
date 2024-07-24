"use client";
import React, { useRef, useEffect } from "react";
import videojs from "video.js";
import Player from "video.js/dist/types/player";
import "video.js/dist/video-js.css";

interface VideoPlayerProps {
  options: any;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = (props : VideoPlayerProps) => {
  const videoRef = useRef(null);
  const playerRef = useRef<Player | null>(null);
  const { options } = props;

  useEffect(() => {
    // Make sure Video.js player is only initialized once
    if (!playerRef.current) {
      // The Video.js player needs to be _inside_ the component el for React 18 Strict Mode.
      const videoElement = document.createElement("video-js");

      videoElement.classList.add("vjs-big-play-centered");
      if(videoRef.current) {
  
        const player = videojs(videoElement, options, () => {});
        playerRef.current = player;
      }

      // You could update an existing player in the `else` block here
      // on prop change, for example:
    } else {
      const player = playerRef.current;

      player.autoplay(options?.autoplay ?? false);
      player.src(options?.sources ?? "");
    }
  }, [options, videoRef]);

  // Dispose the Video.js player when the functional component unmounts
  useEffect(() => {
    const player = playerRef.current;

    return () => {
      if (player && !player.isDisposed()) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [playerRef]);

  return (
    <div data-vjs-player className="w-full">
      <div ref={videoRef} />
    </div>
  );
};

export default VideoPlayer;
