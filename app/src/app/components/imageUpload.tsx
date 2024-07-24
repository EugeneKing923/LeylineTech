'use client';

import { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import { v4 as uuidv4 } from 'uuid'; // Import uuid
import styles from './ImageUpload.module.css';

// @ts-ignore
const socket = io(process.env.NEXT_PUBLIC_BACKEND_URL); // Use the URL from the .env file

export default function ImageUpload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [status, setStatus] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [clientId, setClientId] = useState(''); // State for client ID
  const [loading, setLoading] = useState(false); // State for loading
  const [processing, setProcessing] = useState(false); // State for loading

  useEffect(() => {
    // Generate a unique ID for the client on component mount
    setClientId(uuidv4());
  }, []);

  const handleFileChange = useCallback((event: any) => {
    setSelectedFile(event.target.files[0]);
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
    event.preventDefault();
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('client_id', clientId); // Append the client ID

    setVideoUrl("");
    setLoading(true); // Set loading to true

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setStatus('File uploaded successfully');
    } catch (error) {
      setStatus('File upload failed');
    } finally {
      setLoading(false); // Set loading to false after the request completes
      setProcessing(true);
    }
  };

  useEffect(() => {
    socket.on('task_status', (data) => {
      console.log('Task Completed:', data);
      setStatus(`Completed`);
      setProcessing(false);
      setVideoUrl(`${process.env.NEXT_PUBLIC_BACKEND_URL}/${data.task_id}/video`); // Update with actual video URL
    });
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Upload Image</h1>
      <div
        className={styles.dropzone}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={() => document.getElementById('fileInput')?.click()}
      >
        {selectedFile ? (
          <p>{selectedFile.name}</p>
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
      {processing ? <div><span className={styles.spinner}></span> <span> AI machines are converting image to video...</span></div>: ''}
      {videoUrl && (
        <div className={styles.videoContainer}>
          <video controls width="100%" src={videoUrl}></video>
        </div>
      )}
    </div>
  );
}
