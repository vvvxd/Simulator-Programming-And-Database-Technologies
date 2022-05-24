import React, {useState} from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import {Col, Form, FormControl, InputGroup} from 'react-bootstrap';
import {useDispatch} from 'react-redux';
import {updateGroup} from '../../../services/group/groupActions';

const GroupUpdateModal = (props) => {
  
  const dispatch = useDispatch();
  
  const initialState = {
    id: props.item.id,
    name: props.item.name,
    shortName: props.item.shortName,
  };
  
  const [group, setGroup] = useState(props.item);
  console.log(group)
  const groupChange = (event) => {
    const {name, value} = event.target;
    setGroup({...group, [name]: value});
    console.log(group)
  };
  
  const updateUserGroup = () => {
    dispatch(updateGroup(group.id, group.name, group.shortName))
    hide();
  }
  
  React.useEffect(() => {
    setGroup(props.item)
  }, [props.item]);
  
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
          Изменить группу
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
        <Button onClick={updateUserGroup}
          // disabled={group.name.length === 0
          // || group.shortName.length === 0}
        >Изменить</Button>
      </Modal.Footer>
    </Modal>
  );
}
export default GroupUpdateModal;