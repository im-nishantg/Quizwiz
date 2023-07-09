import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const MyVerticallyCenteredModal = (props) => {
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby={props.name}
      centered
    >
      {props.showHeader && (<Modal.Header closeButton>
        <Modal.Title id={props.name}>
          {props.heading}
        </Modal.Title>
      </Modal.Header>)}
      <Modal.Body>
        {props.body}
      </Modal.Body>
      {props.showFooter && (<Modal.Footer>
        <Button variant="primary" onClick={props.handleSubmit}>Submit</Button>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>)}
    </Modal>
  );
}

export default MyVerticallyCenteredModal;