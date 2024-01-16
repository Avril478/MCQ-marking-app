import Analysis from '../assets/analysis.png'; 
import Cancel from '../assets/cancel.png'; 
import {Modal} from 'react-bootstrap';


export function HistogramModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-histogram-title"
        centered
        style={{ display: 'block' }} 
      >
        <Modal.Header>
          <Modal.Title id="contained-histogram-title" style={{ width: '100%', textAlign: 'center' }}>
            % of wrong answer
          </Modal.Title>
          <img src={Cancel} alt="Close" style={{ cursor: 'pointer', marginRight: '10px', width: '2em' }} onClick={props.onHide} />
        </Modal.Header>
        <Modal.Body style={{ textAlign: 'center' }}>
          <img src={Analysis} alt="Histogram Analysis" style={{ maxWidth: '70%', height: 'auto'}} />
        </Modal.Body>
        {/* No Modal.Footer as per requirements */}
      </Modal>
    );
  }
  