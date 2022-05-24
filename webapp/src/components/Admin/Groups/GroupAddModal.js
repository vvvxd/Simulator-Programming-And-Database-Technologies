import React, {useState} from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import {Col, Form, FormControl, InputGroup} from 'react-bootstrap';
import {useDispatch} from 'react-redux';
import {addGroup} from '../../../services/group/groupActions';

const GroupAddModal = (props) => {
  
  const dispatch = useDispatch();
  
  const initialState = {
    name: "",
    shortName: ""
  };
  
  const [group, setGroup] = useState(initialState);
  
  const groupChange = (event) => {
    const {name, value} = event.target;
    setGroup({...group, [name]: value});
    console.log(group)
  };
  
  const addUserGroup = () => {
    dispatch(addGroup(group.name, group.shortName))
    hide();
  }
  
  const hide = () => {
    setGroup(initialState);
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
          Добавить группу
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Row>
          <Form.Group as={Col}>
            <InputGroup>
              <FormControl
                autoComplete="off"
                type="text"
                name="shortName"
                value={group.shortName}
                onChange={groupChange}
                className={"bg-light text-dark"}
                placeholder="Введите короткое название"
              />
            </InputGroup>
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col}>
            <InputGroup>
              <FormControl
                autoComplete="off"
                type="text"
                name="name"
                value={group.name}
                onChange={groupChange}
                className={"bg-light text-dark"}
                placeholder="Введите название"
              />
            </InputGroup>
          </Form.Group>
        </Form.Row>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={hide}>Закрыть</Button>
        <Button onClick={addUserGroup}
                disabled={group.name.length === 0
                || group.shortName.length === 0}
        >Добавить</Button>
      </Modal.Footer>
    </Modal>
  );
}
export default GroupAddModal;