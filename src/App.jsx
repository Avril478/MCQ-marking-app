import React, { useState, useEffect } from 'react';
import { UploadFile } from './webpages/uploadFile';
import { MarkingResults } from './webpages/markingResults';
import { processFiles } from "./dataProcessing/file-processor.js";
import { HistogramModal } from './webpages/histogramModal';
import { ConfirmationModal } from './webpages/confirmationModal';
import { Steps } from '@douyinfe/semi-ui';
import './App.css';



function App() {

  const [current, setCurrent] = useState(0);
  const { Step } = Steps;
  const [isCsvUploaded, setIsCsvUploaded] = useState(false);
  const [csvFileContents, setCsvFileContents] = useState("");
  const [isTxtUploaded, setIsTxtUploaded] = useState(false);
  const [txtFileContents, setTxtFileContents] = useState("");
  const [processedData, setProcessedData] = useState([]);

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

  useEffect(() => {
    if (csvFileContents.length > 0 && txtFileContents.length > 0) {
      // returns data that looks like:
      // const dataArray = [
      //   ['ID', 'Surname', 'Name', 'Version', 'Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Total'],
      //   ['723647626', 'SURNAMEX', 'NAMEX', '4', 0, 0, 0, 1.0, 1.5, 2.5],
      //   ['823748762', 'SURNAMEY', 'NAMEY', '3', 0, 1.0, 0, 0, 1.5, 2.5],
      //   ['893749857', 'SURNAMEZ', 'NAMEZ', '2', 0.5, 0, 0, 0, 0, 0.5],
      //   ['376473643', 'SURNAMEW', 'NAMEW', '1', 0.5, 1.0, 1.0, 1.0, 1.5, 5.0]
      // ];
      const result = processFiles(csvFileContents, txtFileContents);
      console.log('result:', result);
      setProcessedData(result);
    }
  }, [csvFileContents, txtFileContents]);


  const renderCurrentStep = () => {
    switch (current) {
      case 0:
        return <UploadFile fileType="text/csv" fileExt="csv" goToNextStep={(fileContents) => {
          setCsvFileContents(fileContents);
          //csvFile content details

          goToNextStep();
        }}>Please click or drag & drop your Rubric.csv file here!</UploadFile>;
      case 1:
        return <UploadFile fileType="text/plain" fileExt="txt" goToNextStep={(fileContents) => {

          try {
            //isValidCSVFile(fileContents);
            setTxtFileContents(fileContents);
            goToNextStep();
            //it should be render after the Result page display?
            console.log('alertalert')
            alert('We only display data which ID has at least one digit!')
          }
          catch (error) {
            alert(error);
          }


        }} >Please click or drag & drop your MCQ.txt file here!</UploadFile>;
      case 2:
        return <MarkingResults
          markingResult={processedData}
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