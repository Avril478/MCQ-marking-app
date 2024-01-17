import React, { useState } from 'react';
import { UploadCsv } from './webpages/uploadCsv';
import { UploadTxt } from './webpages/uploadTxt'; 
import { PopoutEntry } from './webpages/popoutEntry';
import './App.css';

function App() {
  const [showUploadTxt, setShowUploadTxt] = useState(false);
  const [showPopoutEntry, setShowPopoutEntry] = useState(false);

  const handleContinueAfterUploadCsv = () => {
    setShowUploadTxt(true);
  };
  const handleContinueAfterUploadTxt = () => {
      setShowPopoutEntry(true);
  }

  return (
    <div className="App">
      <header className='App-header'></header>
      {showPopoutEntry ? (
        <PopoutEntry />
      ) : showUploadTxt ? (
        <UploadTxt onContinueAfterUpload={handleContinueAfterUploadTxt} />
      ) : (
        <UploadCsv onContinueAfterUpload={handleContinueAfterUploadCsv} />
      )}
    </div>
  );
}

export default App;
