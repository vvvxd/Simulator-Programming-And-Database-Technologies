import React, {useState} from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const SqlModal = (props) => {
  
  
  const hide = () => {
    props.onHide();
  }
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      onHide={hide}
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          Sql запрос
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          {props.sql}
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={hide}>Закрыть</Button>
      </Modal.Footer>
    </Modal>
  );
}
export default SqlModal;