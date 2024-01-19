import React, { useState } from 'react';
import { UploadCsv } from './webpages/uploadCsv';
import { UploadTxt } from './webpages/uploadTxt'; 
import { HistogramModal } from './webpages/histogramModal'; 
import { ConfirmationModal } from './webpages/confirmationModal';
import { MarkingResults } from './webpages/markingResults'; 
import './App.css';

function App() {
  const [showUploadCsv, setShowUploadCsv] = useState(true); 
  const [showUploadTxt, setShowUploadTxt] = useState(false);
  const [showMarkingResults, setShowMarkingResults] = useState(false);
  const [showHistogramModal, setShowHistogramModal] = useState(false); 
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const handleContinueAfterUploadCsv = () => {
    setShowUploadCsv(false);
    setShowUploadTxt(true);
  };

  const handleContinueAfterUploadTxt = () => {
    setShowUploadTxt(false);
    setShowMarkingResults(true);
  };

  const handleOpenHistogramModal = () => {
    // Open the HistogramModal when called
    setShowHistogramModal(true);
  };

  const handleOpenConfirmationModal = () => {
    // Open the ConfirmationModal when called
    setShowConfirmationModal(true);
  };
// when the status changed,the codes will execute from the start again, the value will remain until trigger the set..(false/true)
  return (
    <div className="App">
      <header className="App-header"></header>

      {/* csv:T->F txt:F->T result:F histogram:F confirmation:F   
    state changed then start codes again, go into showUploadCsv?
    csv:T->F txt:F->T->F result:F->T histogram:F confirmation:F   
    state changed then start codes again, go into showUploadCsv?
    csv:T->F txt:F->T->F result:F->T histogram:F->T confirmation:F->T   
    state changed then start codes again, go into showUploadCsv? again */}
      {showUploadCsv ? (
        <UploadCsv onContinueAfterUpload={handleContinueAfterUploadCsv} />
      ) : showUploadTxt ? (
        <UploadTxt onContinueAfterUpload={handleContinueAfterUploadTxt} />
      ) : (
        <MarkingResults
          onOpenHistogramModal={handleOpenHistogramModal}
          onOpenConfirmationModal={handleOpenConfirmationModal}
        />
      )}
      

      {/* If showHistogramModal is true, it will go into the (), means displayHistogramModal,
    when execute onHide in the HistogramModal,jsx, it will set the showHistogramModal to false */}
      {showHistogramModal && (
         <HistogramModal onHide={() => setShowHistogramModal(false)} />
       )}

      {showConfirmationModal && (
        <ConfirmationModal
          onHide={() => setShowConfirmationModal(false)}
          onYes={() => {
            setShowConfirmationModal(false);
            setShowUploadCsv(true); 
          }}
        />
      )}
      
      
    </div>
  );
}

export default App;
