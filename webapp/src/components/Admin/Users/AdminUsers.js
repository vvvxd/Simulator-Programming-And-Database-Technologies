import React, {useState} from 'react';
import UsersAddModal from './UsersAddModal';
import UsersUpdateModal from './UsersUpdateModal';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import {useDispatch, useSelector} from 'react-redux';
import {deleteUser} from '../../../services/adminUsers/adminUsersActions';
import Spinner from 'react-bootstrap/Spinner';

const AdminUsers = () => {
  const [activeItem, setActiveItem] = useState(null);
  
  const [modalShow, setModalShow] = useState(false);
  const [updateShow, setUpdateShow] = useState(false);
  
  const dispatch = useDispatch();
  
  const isLoading = useSelector(({adminUsers}) => adminUsers.isLoading);
  const error = useSelector(({adminUsers}) => adminUsers.error);
  const users = useSelector(({adminUsers}) => adminUsers.users)
  
  const delUser = () => {
    dispatch(deleteUser(activeItem.id))
    setActiveItem(null);
  }
  
  return (
    <>
      <Row style={{
        paddingBottom: "20px",
      }}>
        <Card>
          <Card.Header>Пользователи</Card.Header>
          <Card.Body style={{overflowY: "scroll", height: "70vh", width: "85vh",padding:"0"}}>
            <Table responsive hover>
              <thead>
              <tr>
                <th>ИД</th>
                <th>Имя</th>
                <th>Фамилия</th>
                <th>email</th>
                <th>ИД группы</th>
                <th>Роль</th>
                <th>Статус</th>
                <th>Дата регистрации</th>
                <th>Задач решено</th>
                <th>Ответов отправлено</th>
                <th>Задач всего</th>
              </tr>
              </thead>
              <tbody>
              {isLoading
                ? (
                  users.map((item, id) => (
                      <tr key={item.id}
                          onClick={() => setActiveItem(item)}
                          style={{backgroundColor: !!activeItem && activeItem.id === item.id && "rgb(208,208,208)"}}
                      >
                        <td>{item.id}</td>
                        <td>{item.firstName}</td>
                        <td>{item.lastName}</td>
                        <td>{item.email}</td>
                        <td>{item.userGroupId}</td>
                        <td>{item.role}</td>
                        <td>{item.status}</td>
                        <td>{new Date(item.firstEntry).toLocaleString()}</td>
                        <td>{item.tasksSolved}</td>
                        <td>{item.tasksSent}</td>
                        <td>{item.tasksTotal}</td>
                      </tr>
                    )
                  )
                )
                : <Spinner animation="border"/>}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </Row>
      <Row>
        <Button
          variant="primary"
          style={buttonCss}
          onClick={() => setModalShow(true)}
        >
          Добавить
        </Button>
        <Button
          variant="primary"
          style={buttonCss}
          disabled={activeItem === null}
          onClick={delUser}
        >
          Удалить
        </Button>
        <Button
          variant="primary"
          disabled={activeItem === null}
          style={buttonCss}
          onClick={() => setUpdateShow(true)}
        >
          Изменить
        </Button>
      </Row>
      <UsersAddModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      <UsersUpdateModal
        show={updateShow}
        onHide={() => setUpdateShow(false)}
        item={{...activeItem}}
      />
    </>
  )
}
const buttonCss = {
  marginLeft: "10px",
  marginRight: "1O0px",
  width: "100px",
  textAlign: "center",
  height: "45px"
};

export default AdminUsers;