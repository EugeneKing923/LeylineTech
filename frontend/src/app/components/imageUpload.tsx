'use client';

import { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import { v4 as uuidv4 } from 'uuid'; // Import uuid
import styles from './imageUpload.module.css';
import Image from "next/image";
import {cn} from '../utils/utils';

// @ts-ignore

export default function ImageUpload({setFinished}) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [status, setStatus] = useState('');
  const [preview, setPreview] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [progress, setProgress] = useState(0);
  const [taskId, setTaskId] = useState(''); // State for task ID
  const [clientId, setClientId] = useState(''); // State for client ID
  const [loading, setLoading] = useState(false); // State for loading
  const [step, setStep] = useState(0); // State for loading
  const [socket, setSocket] = useState();
  useEffect(() => {
    // Generate a unique ID for the client on component mount
    setClientId(uuidv4());
  }, []);

  useEffect(() => {
    const _socket = io(`http://${window.location.hostname}:8000`);
    _socket.on('task_status', (data) => {
      const taskId = window.localStorage.getItem("task_id")
      if(data["task_id"] == taskId) {
        setStep(2)
        setProgress(data["progress"])
        if(data["progress"] == 100) {
          setFinished(true);
          setStep(3);
        }
      }
    });
    return () => {
      _socket.disconnect()
    };
  }, [clientId])

  const handleFileChange = useCallback((event: any) => {
    const file = event.target.files[0];  
    if (file) {  
      setSelectedFile(file);  
      const reader = new FileReader();  
      reader.onloadend = () => {
        if(reader.result) setPreview(reader.result.toString());  
      };  
      reader.readAsDataURL(file);  
    }  
  }, []);

  const handleDrop = useCallback((event: any) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      setSelectedFile(file);
    }
  }, []);

  const handleDragOver = (event: any) => {
    event.preventDefault();
  };

  const handleSubmit = async (event: any) => {
    setFinished(false);
    event.preventDefault();
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('client_id', clientId); // Append the client ID

    setVideoUrl("");
    setLoading(true); // Set loading to true

    try {
      await axios.post(`http://${window.location.hostname}:8000/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }).then((res) => {
        window.localStorage.setItem("task_id", res.data["task_id"])
      });
      setStatus('File uploaded successfully');
    } catch (error) {
      setStatus('File upload failed');
    } finally {
      setLoading(false); // Set loading to false after the request completes
      setStep(1);
    }
  };

 
  return (
    <div className={cn(styles.container, "p-[10px] my-auto h-full border-dashed border-r-2 border-black")}>
      <h1 className={styles.title}>Upload Image</h1>
      <div
        className={styles.dropzone}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={() => document.getElementById('fileInput')?.click()}
      >
        {selectedFile ? (
          <div>
            <p>{selectedFile && selectedFile.name}</p>
            <Image src={preview} width={350} height={350} className="mx-auto" alt="file" />
          </div>
        ) : (
          <p>Drag & drop your file here, or click to select</p>
        )}
        <input
          type="file"
          id="fileInput"
          className={styles.fileInput}
          onChange={handleFileChange}
        />
      </div>
      <button className={styles.button} onClick={handleSubmit} disabled={loading}>
        {loading ? <span className={styles.spinner}></span> : 'Upload'}
      </button>
      <p className={styles.status}>
        {status}
      </p>
      {
        step == 1 ?
          <div className='flex items-center justify-center gap-2'>
            <span className={styles.spinner}></span> <span> Pending...</span></div> :
            step == 2 ?
              <div className='flex items-center justify-center gap-2'>
                <span className={styles.spinner}></span>
                <span> {`Running ${progress}%`}</span>
              </div> :
              step == 3 ?
              <div><span> Completed</span></div> :
              <></>
      }
      {videoUrl && (
        <div className={styles.videoContainer}>
          <video controls width="100%" src={videoUrl}></video>
        </div>
      )}
    </div>
  );
}
