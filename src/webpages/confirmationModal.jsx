import { Modal, Button } from 'react-bootstrap';

export function ConfirmationModal(props) {
  console.log('confirmationModal executed')
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="confirmation-modal-title"
      centered
      show={true}
      className="custom-modal"
    >

      <Modal.Body style={{
        backgroundColor: '#E6E6FA',
        textAlign: 'center',
        padding: '2rem',
        borderRadius: '30px'
      }}>
        <h4 id="confirmation-modal-title" style={{ marginBottom: '2rem' }}>
          Would you like to mark another test?
        </h4>
        <Button
          variant="danger"
          style={{ margin: '0.5rem', padding: '0.5rem 3rem', borderRadius: '10px' }} // Increase padding to make button wider
          onClick={() => window.close()}
        >
          NO
        </Button>
        <Button
          variant="success"
          style={{ margin: '0.5rem', padding: '0.5rem 3rem', borderRadius: '10px' }} // Increase padding to make button wider
          onClick={props.onYes}
        >
          YES
        </Button>
      </Modal.Body>
    </Modal>
  );
}
