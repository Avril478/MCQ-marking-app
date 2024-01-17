import React, { useState } from 'react';
import { UploadCsv } from './webpages/uploadCsv';
import { UploadTxt } from './webpages/uploadTxt'; // Adjust the import path as needed
import './App.css';

function App() {
  const [showUploadTxt, setShowUploadTxt] = useState(false);

  const handleUploadSuccess = () => {
    setShowUploadTxt(true);
  };

  return (
    <div className="App">
      <header className='App-header'></header>

      {showUploadTxt ? (
        <UploadTxt />
      ) : (
        <UploadCsv onUploadSuccess={handleUploadSuccess} />
      )}
    </div>
  );
}

export default App;
