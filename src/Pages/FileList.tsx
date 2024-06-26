import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FileList: React.FC = () => {
  const [files, setFiles] = useState<string[]>([]);

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

  const handleDownload = async (filename: string) => {
    try {
      const response = await axios.get(`${filename}`, {
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      // Extract filename after the last '/'
      const simpleFileName = filename.substring(filename.lastIndexOf('/') + 1);
      
      link.href = url;
      link.setAttribute('download', simpleFileName); // Use the extracted filename here
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };

  return (
    <div>
      <h2>Files</h2>
      <ul>
        {files.map((filename, index) => (
          <li key={index}>
            {filename}
            <button onClick={() => handleDownload(filename)}>Download</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FileList;
