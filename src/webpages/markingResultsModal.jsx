import Histogram from '../assets/histogram.png';
import DownloadIcon from '../assets/download.png'; 
import {Button, Modal} from 'react-bootstrap';

export function MarkingResultsModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        style={{ backdropFilter: "blur(10px)" }}
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Preview of the Marks (.csv)
          </Modal.Title>
          <img src={Histogram} alt="Histogram" style={{ width: '70px', height: '70px', marginRight: '10px', verticalAlign: 'middle' }} onClick={props.onHistogramClick} />

        </Modal.Header>
        <Modal.Body>
          {/* Content of the CSV file should be rendered here */}
          <div style={{border: '2px solid #007bff', minHeight: '300px', minWidth: '200px'}}>
            {/* CSV content */}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={props.onDownloadClick}>
            <img 
              src={DownloadIcon} 
              alt="Download" 
              style={{ filter: 'invert(1)', marginRight: '10px', width: '1em', // <-- Size adjusted to match text
              height: '1em' }} // Inverts the color to white
            />
            Download
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }