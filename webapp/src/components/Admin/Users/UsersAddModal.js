import React, {useState} from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import {Col, Form, FormControl, InputGroup} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux';
import {addUser} from '../../../services/adminUsers/adminUsersActions';

const UsersAddModal = (props) => {
  
  const dispatch = useDispatch();
  
  const groups = useSelector(({group}) => group.groups)
  
  const initialState = {
    lastName: "",
    firstName: "",
    email: "",
    password: "",
    userGroupId: "",
    role: ""
  };
  
  const [user, setUser] = useState(initialState);
  
  const userChange = (event) => {
    const {name, value} = event.target;
    setUser({...user, [name]: value});
    console.log(user)
  };
  
  const onClickAddTasks = () => {
    dispatch(addUser(user.lastName,
      user.firstName,
      user.email,
      user.password,
      user.userGroupId,
      user.role,
    ))
    hide();
  }
  
  const hide = () => {
    setUser(initialState);
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
          Добавить пользователя
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
              <Form.Control required name="userGroupId" as="select" onChange={userChange}>
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
              <Form.Control required name="role" as="select" onChange={userChange}>
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
        <Button onClick={onClickAddTasks}
                disabled={user.lastName.length === 0
                || user.firstName.length === 0
                || user.email.length === 0
                || user.password.length === 0
                || user.userGroupId.length === 0
                || user.userGroupId === "-1"
                || user.role.length === 0
                }
        >Добавить</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default UsersAddModal;