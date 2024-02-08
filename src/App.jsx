import React, { useState, useEffect } from 'react';
import { UploadFile } from './webpages/uploadFile';
import { MarkingResults } from './webpages/markingResults';
import { processFiles, isValidTxtFile } from "./dataProcessing/file-processor.js";
import { HistogramModal } from './webpages/histogramModal';
import { ConfirmationModal } from './webpages/confirmationModal';
import { Modal, Steps, Toast } from '@douyinfe/semi-ui';
import './App.css';



function App() {


  const [current, setCurrent] = useState(0);
  const { Step } = Steps;
  const [isCsvUploaded, setIsCsvUploaded] = useState(false);
  const [csvFileContents, setCsvFileContents] = useState("");
  const [isTxtUploaded, setIsTxtUploaded] = useState(false);
  const [txtFileContents, setTxtFileContents] = useState("");
  const [processedData, setProcessedData] = useState({ result: [], container: [] });

  const [showHistogramModal, setShowHistogramModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);




  const handleStepChange = (index) => {
    if (index === 1 && !isCsvUploaded && current < 1) {
      Modal.warning({ 'title': 'Warning: Please upload CSV file first！' });


      return;
    }
    if (index === 2 && !isTxtUploaded && current < 2) {
      Modal.warning({ 'title': 'Warning: Please upload TXT file first' });
      return;
    }
    setCurrent(index);
  };

  const goToNextStep = () => {
    setCurrent((prevCurrent) => prevCurrent + 1);
    Toast.destroyAll();

  };

  useEffect(() => {
    if (csvFileContents.length > 0 && txtFileContents.length > 0) {
      // const dataArray = [
      //   ['ID', 'Surname', 'Name', 'Version', 'Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Total'],
      //   ['723647626', 'SURNAMEX', 'NAMEX', '4', 0, 0, 0, 1.0, 1.5, 2.5]]
      const result = processFiles(csvFileContents, txtFileContents);

      setProcessedData(result);
    }
  }, [csvFileContents, txtFileContents]);


  const renderCurrentStep = () => {
    switch (current) {
      case 0:
        Toast.destroyAll()
        return <UploadFile fileType="text/csv" fileExt="csv" goToNextStep={(fileContents) => {
          setCsvFileContents(fileContents);

          //csvFile content details

          goToNextStep();
        }}>Please click or drag & drop your Rubric.csv file here!</UploadFile>;
      case 1:
        Toast.destroyAll()
        return <UploadFile fileType="text/plain" fileExt="txt" goToNextStep={(fileContents) => {

          try {
            isValidTxtFile(fileContents);
            setTxtFileContents(fileContents);
            goToNextStep();

            Toast.info({
              content: 'We only display data which ID has at least one digit!',
              duration: 0,
              theme: 'light',
            })


          }
          catch (errors) {
            Toast.destroyAll()
            Toast.error({
              content: errors.map((e, i) => (<p key={i}>{e}</p>)),
              duration: 0,
              theme: 'light',
            })
          }


        }} >Please click or drag & drop your MCQ.txt file here!</UploadFile>;
      case 2:

        return <MarkingResults
          markingResult={processedData.result}
          onOpenHistogramModal={handleOpenHistogramModal}
          onOpenConfirmationModal={handleOpenConfirmationModal}
          resetToFirstStep={resetToFirstStep}
        />
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
        <HistogramModal onHide={() => setShowHistogramModal(false)} data={processedData} />
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