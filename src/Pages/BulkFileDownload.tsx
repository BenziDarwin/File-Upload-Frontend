import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BulkFileDownload: React.FC = () => {
  const [files, setFiles] = useState<string[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await axios.get<string[]>('http://localhost:8081/api/v1/files/');
        setFiles(response.data);
      } catch (error) {
        console.error('Error fetching files:', error);
      }
    };

    fetchFiles();
  }, []);

  const toggleSelectFile = (filename: string) => {
    if (selectedFiles.includes(filename)) {
      setSelectedFiles(selectedFiles.filter((file) => file !== filename));
    } else {
      setSelectedFiles([...selectedFiles, filename]);
    }
  };

  const handleDownloadSelected = async () => {
    try {
      for (const filename of selectedFiles) {
        const response = await axios.get(`${filename}`, {
          responseType: 'blob',
        });
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        // Extract filename after the last '/'
        const simpleFileName = filename.substring(filename.lastIndexOf('/') + 1);

        link.href = url;
        link.setAttribute('download', simpleFileName);
        document.body.appendChild(link);
        link.click();
      }
    } catch (error) {
      console.error('Error downloading files:', error);
    }
  };

  return (
    <div>
      <h2>Files</h2>
      <ul>
        {files.map((filename, index) => (
          <li key={index}>
            <input
              type="checkbox"
              checked={selectedFiles.includes(filename)}
              onChange={() => toggleSelectFile(filename)}
            />
            {filename}
          </li>
        ))}
      </ul>
      <button onClick={handleDownloadSelected}>Download Selected</button>
    </div>
  );
};

export default BulkFileDownload;
