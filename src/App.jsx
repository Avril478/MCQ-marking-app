import React, { useState } from 'react';
import { UploadCsv } from './webpages/uploadCsv';
import { UploadTxt } from './webpages/uploadTxt';
import { MarkingResults } from './webpages/markingResults';
import { HistogramModal } from './webpages/histogramModal';
import { ConfirmationModal } from './webpages/confirmationModal';
import { Steps } from '@douyinfe/semi-ui';
import './App.css';


function App() {

  const [current, setCurrent] = useState(0);
  const { Step } = Steps;
  const [isCsvUploaded, setIsCsvUploaded] = useState(false);
  const [isTxtUploaded, setIsTxtUploaded] = useState(false);
  const [showHistogramModal, setShowHistogramModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const handleStepChange = (index) => {
    if (index === 1 && !isCsvUploaded && current < 1) {
      alert('Please upload CSV file first');
      return;
    }
    if (index === 2 && !isTxtUploaded && current < 2) {
      alert('Please upload TXT file first');
      return;
    }
    setCurrent(index);
  };

  const goToNextStep = () => {
    setCurrent((prevCurrent) => prevCurrent + 1);
  };

  const renderCurrentStep = () => {
    switch (current) {
      case 0:
        return <UploadCsv goToNextStep={goToNextStep} />;
      case 1:
        return <UploadTxt goToNextStep={goToNextStep} />;
      case 2:
        return <MarkingResults
          onOpenHistogramModal={handleOpenHistogramModal}
          onOpenConfirmationModal={handleOpenConfirmationModal}
          resetToFirstStep={resetToFirstStep}
        />;
      default:
        return <UploadCsv goToNextStep={goToNextStep} />;
    }
  };

  const handleOpenHistogramModal = () => {
    // Open the HistogramModal when called
    setShowHistogramModal(true);
  };

  const handleOpenConfirmationModal = () => {
    // Open the ConfirmationModal when called
    setShowConfirmationModal(true);
  };

  const resetToFirstStep = () => {
    setCurrent(0);
  };


  return (
    <div className="App">
      <header className="App-header"></header>
      <Steps type="basic" current={current} onChange={handleStepChange}>
        <Step title="Rubric" />
        <Step title="MCQ" />
        <Step title="Results" />
      </Steps>

      {/* show the current step card content*/}
      {renderCurrentStep()}

      {showHistogramModal && (
        <HistogramModal onHide={() => setShowHistogramModal(false)} />
      )}

      {showConfirmationModal && (
        <ConfirmationModal
          onHide={() => setShowConfirmationModal(false)}
          onYes={() => {
            setShowConfirmationModal(false);
            resetToFirstStep();
          }}
        />
      )}
    </div>
  );
}

export default App;