import React, {useState} from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import {Col, Form, FormControl, InputGroup} from 'react-bootstrap';
import {useDispatch} from 'react-redux';
import {updateGroup} from '../../../services/group/groupActions';
import {updateTask} from '../../../services/adminTasks/adminTasksActions';

const TasksUpdateModal = (props) => {
  
  const dispatch = useDispatch();
  
  const [task, setTask] = useState(props.item);

  const taskChange = (event) => {
    const {name, value} = event.target;
    setTask({...task, [name]: value});
  };
  
  const onClickUpdateUserGroup = () => {
    dispatch(updateTask(task.id, task.referenceQuery,
      task.title, task.serialNumber, task.description))
    hide();
  }
  
  React.useEffect(() => {
    setTask(props.item)
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
        <Button onClick={onClickUpdateUserGroup}
                // disabled={task.referenceQuery.length === 0
                // || task.title.length === 0
                // || task.serialNumber.length === 0
                // || task.description.length === 0
                // }
        >Изменить</Button>
      </Modal.Footer>
    </Modal>
  );
}
export default TasksUpdateModal;