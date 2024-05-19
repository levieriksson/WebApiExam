
'use client';

import React, { useState, useEffect } from 'react';
import fetcher, { fetchBinary } from '@/utils/fetcher';
import styles from './Files.module.css';

const FilesPage = () => {
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await fetcher('/files');
        setFiles(response);
        console.log('Fetched files:', response);
      } catch (error) {
        console.error('Error fetching files:', error.message);
        setError(error.message);
      }
    };
    fetchFiles();
  }, []);

  const handleFileUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      await fetcher('/files/upload', {
        method: 'POST',
        body: formData,
      });
      setSelectedFile(null);
      const response = await fetcher('/files');
      setFiles(response);
    } catch (error) {
      console.error('Error uploading file:', error.message);
      setError(error.message);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    setSelectedFile(file);
  };

  const handleFileDownload = async (fileId, filename) => {
    try {
      const response = await fetchBinary(`/files/download/${fileId}`);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download error:', error.message);
      setError(error.message);
    }
  };

  const formatFileSize = (size) => {
    if (size < 1024) return `${size} bytes`;
    else if (size < 1048576) return `${(size / 1024).toFixed(2)} KB`;
    else return `${(size / 1048576).toFixed(2)} MB`;
  };

  return (
    <div className={styles.container}>
      <h1>Files</h1>
      {error && <p>Error: {error}</p>}
      <div className={styles.uploadControls}>
        <label htmlFor="fileInput" className={styles.uploadButton}>
          Choose File
        </label>
        <button onClick={handleFileUpload} className={styles.uploadButton}>
          Upload
        </button>
      </div>
      <div
        className={`${styles.dropzone} ${dragging ? styles.dragging : ''} ${selectedFile ? styles.fileSelected : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <p>Drag & Drop files here</p>
        {selectedFile && <p>Selected file: {selectedFile.name}</p>}
        <input
          type="file"
          onChange={(e) => setSelectedFile(e.target.files[0])}
          style={{ display: 'none' }}
          id="fileInput"
        />
      </div>
      {files.length > 0 ? (
        <ul className={styles.fileList}>
          {files.map((file) => (
            <li key={file.fileId} className={styles.fileItem}>
              <span className={styles.fileName}>{file.filename}</span>
              <span className={styles.fileSize}>{formatFileSize(file.fileSize)}</span>
              <span className={styles.fileType}>{file.fileType}</span>
              <button
                onClick={() => handleFileDownload(file.fileId, file.filename)}
                className={styles.downloadButton}
              >
                Download
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No files available</p>
      )}
    </div>
  );
};

export default FilesPage;
