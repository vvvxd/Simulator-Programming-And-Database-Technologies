import authToken from '../../utils/authToken';
import React from 'react';
import {Container, Tab} from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import {loadGroups} from '../../services/group/groupActions';
import {useDispatch} from 'react-redux';
import AdminGroups from './Groups/AdminGroups';
import AdminUsers from './Users/AdminUsers';
import AdminTasks from './Tasks/AdminTasks';
import {loadTasks} from '../../services/adminTasks/adminTasksActions';
import {loadUsers} from '../../services/adminUsers/adminUsersActions';


const Admin = () => {
  if (localStorage.jwtToken) {
    authToken(localStorage.jwtToken);
  }
  
  const dispatch = useDispatch();
  
  React.useEffect(() => {
    dispatch((loadGroups()))
    dispatch((loadTasks()))
    dispatch((loadUsers()))
  }, []);
  
  return (
    <>
      <div className="container__mod">
        <Container>
          <Tab.Container id="left-tabs-example" defaultActiveKey="1">
            <Row>
              <Col sm={3}>
                <Nav variant="pills" className="flex-column">
                  <Nav.Item>
                    <Nav.Link eventKey="1">Пользователи</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="2">Группы</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="3">Задания</Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>
              <Col sm={9}>
                <Tab.Content>
                  <Tab.Pane eventKey="1">
                    <AdminUsers/>
                  </Tab.Pane>
                  <Tab.Pane eventKey="2">
                    <AdminGroups/>
                  </Tab.Pane>
                  <Tab.Pane eventKey="3">
                    <AdminTasks/>
                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </Container>
      </div>
    </>
  )
}
export default Admin;