// @ts-ignore
"use client"
import { useState } from 'react';
import ImageUpload from './components/imageUpload';
import VideoPreview from './components/video_preview/videoPreview'
export default function Home() {
  const [finished, setFinished] = useState(false)
  return (
    <div className='absolute top-0 left-0 w-full h-full'>
      <div className='grid grid-cols-2 h-full w-full'>
        <div>
          <ImageUpload setFinished={setFinished}/>
        </div>
        <div>
          <VideoPreview finished={finished}/>
        </div>
      </div>
    </div>
  );
}