import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FileUpload from './Pages/FileUpload';
import GetFile from './Pages/FileList';
import BulkFileUpload from './Pages/BulkUpload';
import BulkFileDownload from './Pages/BulkFileDownload';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FileUpload/>}/>
        <Route path='/get-file' element={<GetFile/>}/>
        <Route path='/bulk-upload' element={<BulkFileUpload/>}/>
        <Route path="/bulk-download" element={<BulkFileDownload/>}/>
      </Routes>
    </Router>
  );
}

export default App;
