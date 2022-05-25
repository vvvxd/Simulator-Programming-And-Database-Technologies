import React, {useState} from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import {Col, Form, FormControl, InputGroup} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux';
import {updateGroup} from '../../../services/group/groupActions';
import {updateTask} from '../../../services/adminTasks/adminTasksActions';

const UsersUpdateModal = (props) => {
  
  const dispatch = useDispatch();
  
  const groups = useSelector(({group}) => group.groups)
  
  const initialState = {
    ...props.item, password: ""
  };
  
  const [user, setUser] = useState(initialState);
  
  const userChange = (event) => {
    const {name, value} = event.target;
    setUser({...user, [name]: value});
  };
  
  const onClickUpdateUser = () => {
    dispatch(updateTask(user.id, user.referenceQuery,
      user.title, user.serialNumber, user.description))
    hide();
  }
  
  React.useEffect(() => {
    setUser(props.item)
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
          Изменить пользователя
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Row>
          <Form.Group as={Col}>
            <InputGroup>
              <FormControl
                autoComplete="off"
                type="text"
                name="firstName"
                value={user.firstName}
                onChange={userChange}
                className={"bg-light text-dark"}
                placeholder="Введите имя"
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
                name="lastName"
                value={user.lastName}
                onChange={userChange}
                className={"bg-light text-dark"}
                placeholder="Введите фамилию"
              />
            </InputGroup>
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col}>
            <InputGroup>
              <FormControl
                required
                autoComplete="off"
                type="text"
                name="email"
                value={user.email}
                onChange={userChange}
                className={"bg-light text-dark"}
                placeholder="Введите Email"
              />
            </InputGroup>
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col}>
            <InputGroup>
              <FormControl
                required
                autoComplete="off"
                type="password"
                name="password"
                value={user.password}
                onChange={userChange}
                className={"bg-light text-dark"}
                placeholder="Введите пороль"
              />
            </InputGroup>
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col}>
            <InputGroup>
              <Form.Control value={user.userGroupId} required name="userGroupId" as="select" onChange={userChange}>
                <option value="-1">Выберите группу</option>
                {groups.map((item, id) => (
                  <option value={item.id}>{item.shortName}</option>)
                )}
              </Form.Control>
            </InputGroup>
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col}>
            <InputGroup>
              <Form.Control value={user.role} required name="role" as="select" onChange={userChange}>
                <option value="-1">Выберите роль</option>
                <option>USER</option>
                <option>ADMIN</option>
                <option>SUPER_ADMIN</option>
              </Form.Control>
            </InputGroup>
          </Form.Group>
        </Form.Row>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={hide}>Закрыть</Button>
        <Button onClick={onClickUpdateUser}
          // disabled={user.referenceQuery.length === 0
          // || user.title.length === 0
          // || user.serialNumber.length === 0
          // || user.description.length === 0
          // }
        >Изменить</Button>
      </Modal.Footer>
    </Modal>
  );
}
export default UsersUpdateModal;