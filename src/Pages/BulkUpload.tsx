import React, { useState } from 'react';
import axios from 'axios';

const BulkFileUpload: React.FC = () => {
  const [files, setFiles] = useState<FileList | null>(null);
  const [message, setMessage] = useState<string>('');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFiles(event.target.files);
    }
  };

  const handleUpload = async () => {
    if (files) {
      try {
        const formData = new FormData();
        for (let i = 0; i < files.length; i++) {
          formData.append('files', files[i]);
        }

        await axios.post('http://localhost:8085/api/v1/files/bulk', formData);

        setMessage('Files uploaded successfully!');
      } catch (error) {
        setMessage('Failed to upload files.');
      }
    } else {
      setMessage('Please select files to upload.');
    }
  };

  return (
    <div>
      <h2>Bulk Upload Files</h2>
      <input type="file" multiple onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default BulkFileUpload;
