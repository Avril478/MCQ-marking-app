import Analysis from '../assets/analysis.png'; 
import Cancel from '../assets/cancel.png'; 
import {Modal} from 'react-bootstrap';

//how to find which objects in the props?
//go to App.jsx find <HistogramModal tag content. found 'onHide', so props including 1 object
//which is onHide. if have many obj, you can write as function HistogramModal({ onHide, onYes}) {...
export function HistogramModal({onHide}) {
  //({onHide}) or (props)
  console.log('HistogramModal executed')
    return (
      <Modal
        {...onHide} 
        // {...props}
        size="lg"
        aria-labelledby="contained-histogram-title"
        centered
        show={true}
        
        style={{ display: 'block' }} 
      >
        <Modal.Header>
          <Modal.Title id="contained-histogram-title" style={{ width: '100%', textAlign: 'center' }}>
            % of wrong answer
          </Modal.Title>
          {/*{props.onHide}*/}
          <img src={Cancel} alt="Close" style={{ cursor: 'pointer', marginRight: '10px', width: '2em' }} onClick={onHide} />
        </Modal.Header>
        <Modal.Body style={{ textAlign: 'center' }}>
          <img src={Analysis} alt="Histogram Analysis" style={{ maxWidth: '70%', height: 'auto'}} />
        </Modal.Body>
        {/* No Modal.Footer as per requirements */}
      </Modal>
    );
  }
  