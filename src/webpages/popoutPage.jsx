import { Button } from 'react-bootstrap';
import  { useState } from 'react';
import { MarkingResultsModal } from './markingResultsModal';
import { ConfirmationModal } from './confirmationModal'; // Import the new modal component
import { HistogramModal } from './histogramModal'; // Import the new modal component




  
  
  export function PopoutPage() {

    const [markingResultsModalShow, setMarkingResultsModalShow] = useState(false);
    const [histogramModalShow, setHistogramModalShow] = useState(false);
    const [confirmationModalShow, setConfirmationModalShow] = useState(false);


    // This function only sets the histogram modal to show
    const handleHistogramClick = () => {
        setHistogramModalShow(true);
    };

    // This function only hides the histogram modal
    const handleHistogramClose = () => {
        setHistogramModalShow(false);
    };

    const handleDownloadClick = () => {
        // Logic to handle the download action
        setConfirmationModalShow(true);
        setMarkingResultsModalShow(false);// Show the confirmation modal after download
      };
    

    
    return (
      <>
        <Button variant="primary" onClick={() => setMarkingResultsModalShow(true)}>
          Launch Marking Results Modal
        </Button>

        <MarkingResultsModal
          show={markingResultsModalShow}
          onHide={() => setMarkingResultsModalShow(false)}
          onHistogramClick={handleHistogramClick}
          onDownloadClick={handleDownloadClick}
        />

        <HistogramModal
          show={histogramModalShow}
          onHide={handleHistogramClose}
        />

        <ConfirmationModal
        show={confirmationModalShow}
        onHide={() => setConfirmationModalShow(false)}
        
      />
      </>
    );
}