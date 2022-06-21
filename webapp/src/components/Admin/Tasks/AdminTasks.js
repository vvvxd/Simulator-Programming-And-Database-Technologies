import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {deleteGroup} from '../../../services/group/groupActions';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import {Spinner} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import GroupAddModal from '../Groups/GroupAddModal';
import GroupUpdateModal from '../Groups/GroupUpdateModal';
import {deleteTask} from '../../../services/adminTasks/adminTasksActions';
import TasksAddModal from './TasksAddModal';
import TasksUpdateModal from './TasksUpdateModal';

const AdminTasks = () => {
  
  const [activeItem, setActiveItem] = useState(null);
  
  const [modalShow, setModalShow] = useState(false);
  const [updateShow, setUpdateShow] = useState(false);
  
  const dispatch = useDispatch();
  
  const isLoading = useSelector(({adminTasks}) => adminTasks.isLoading);
  const error = useSelector(({adminTasks}) => adminTasks.error);
  const tasks = useSelector(({adminTasks}) => adminTasks.tasks)
  
  const delTask = () => {
    dispatch(deleteTask(activeItem.id))
    setActiveItem(null);
  }
  
  return (
    <>
      <Row style={{
        paddingBottom: "20px",
      }}>
        <Card>
          <Card.Header>Задачи</Card.Header>
          <Card.Body style={{overflowY: "scroll", height: "70vh", width: "85vh",padding:"0"}}>
            <Table responsive hover>
              <thead>
              <tr>
                <th>ИД</th>
                <th>Эталонное решение</th>
                <th>Название</th>
                <th>Номер</th>
                <th>Описание</th>
                <th>Верных решений</th>
                <th>Неверных решений</th>
                <th>Всего решений</th>
                <th>Лучшее решение</th>
              </tr>
              </thead>
              <tbody>
              {isLoading
                ? (
                  tasks.map((item, id) => (
                      <tr key={item.id}
                          onClick={() => setActiveItem(item)}
                          style={{backgroundColor: !!activeItem && activeItem.id === item.id && "rgb(208,208,208)"}}
                      >
                        <td>{item.id}</td>
                        <td>{item.referenceQuery}</td>
                        <td>{item.title}</td>
                        <td>{item.serialNumber}</td>
                        <td>{item.description}</td>
                        <td>{item.decidedRight}</td>
                        <td>{item.decidedWrong}</td>
                        <td>{item.totalAttempts}</td>
                        <td>{item.queryHistoryId}</td>
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
          onClick={delTask}
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
      <TasksAddModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      <TasksUpdateModal
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
export default AdminTasks;