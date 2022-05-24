import React, {useState} from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import {Col, Form, FormControl, InputGroup} from 'react-bootstrap';
import {useDispatch} from 'react-redux';
import {addGroup} from '../../../services/group/groupActions';
import {addTasks} from '../../../services/adminTasks/adminTasksActions';

const TasksAddModal = (props) => {
  
  const dispatch = useDispatch();
  
  const initialState = {
    referenceQuery: "",
    title: "",
    serialNumber: "",
    description: ""
  };
  
  const [task, setTask] = useState(initialState);
  
  const taskChange = (event) => {
    const {name, value} = event.target;
    setTask({...task, [name]: value});
    console.log(task)
  };
  
  const onClickAddTasks = () => {
    dispatch(addTasks( task.referenceQuery, task.title, task.serialNumber, task.description))
    hide();
  }
  
  const hide = () => {
    setTask(initialState);
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
          Добавить задачу
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Row>
          <Form.Group as={Col}>
            <InputGroup>
              <FormControl
                as="textarea" rows={3}
                autoComplete="off"
                type="text"
                name="referenceQuery"
                value={task.referenceQuery}
                onChange={taskChange}
                className={"bg-light text-dark"}
                placeholder="Введите эталонное решение"
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
                name="title"
                value={task.title}
                onChange={taskChange}
                className={"bg-light text-dark"}
                placeholder="Введите название"
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
                name="serialNumber"
                value={task.serialNumber}
                onChange={taskChange}
                className={"bg-light text-dark"}
                placeholder="Введите номер"
              />
            </InputGroup>
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col}>
            <InputGroup>
              <FormControl
                as="textarea" rows={3}
                autoComplete="off"
                type="text"
                name="description"
                value={task.description}
                onChange={taskChange}
                className={"bg-light text-dark"}
                placeholder="Введите описание"
              />
            </InputGroup>
          </Form.Group>
        </Form.Row>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={hide}>Закрыть</Button>
        <Button onClick={onClickAddTasks}
                disabled={task.referenceQuery.length === 0
                || task.title.length === 0
                || task.serialNumber.length === 0
                || task.description.length === 0
                }
        >Добавить</Button>
      </Modal.Footer>
    </Modal>
  );
}
export default TasksAddModal;