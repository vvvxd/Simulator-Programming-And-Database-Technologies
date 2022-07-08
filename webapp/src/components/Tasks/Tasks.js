import React from 'react';
import Table from 'react-bootstrap/Table';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCheckCircle, faCircle, faMinusCircle} from '@fortawesome/free-solid-svg-icons';
import Spinner from 'react-bootstrap/Spinner';
import {useDispatch, useSelector} from "react-redux";
import {fetchTasks} from '../../services/tasks/tasksActions';
import {setActiveTaskId} from '../../services/task/taskActions';
import {useHistory} from 'react-router-dom';
import authToken from '../../utils/authToken';


const Tasks = (props) => {
  
  if (localStorage.jwtToken) {
    authToken(localStorage.jwtToken);
  }
  
  const dispatch = useDispatch();
  let history = useHistory();
  
  const items = useSelector(({tasks}) => tasks.items);
  const isLoaded = useSelector(({tasks}) => tasks.isLoaded);
  
  //todo сделать обработку ошибки
  
  const error = useSelector(({tasks}) => tasks.error);
  
  React.useEffect(() => {
    dispatch(fetchTasks())
  }, []);
  
  const onClickTable = (id, status) => {
    dispatch(setActiveTaskId({
      id:id,
      status:status
    }));//Статус для отрисовки страницы сразу до запроса
    history.push('/task/' + id);
  };
  
  return (
    <>{
      isLoaded ?
        <Table striped bordered hover>
          <thead>
          <tr>
            <th></th>
            <th>Номер</th>
            <th>Название</th>
            <th>% верных</th>
            <th>Решило</th>
          </tr>
          </thead>
          <tbody>
          {items.map((item, id) => (
            <tr key={item.id} onClick={() => onClickTable(item.id, item.status)}>
              <td>{
                item.status == null
                  ? <FontAwesomeIcon icon={faCircle} aria-hidden="true"/>
                  : (item.status === 1
                    ? <FontAwesomeIcon icon={faCheckCircle} color="green"/>
                    : <FontAwesomeIcon icon={faMinusCircle} color="red"/>
                  )
              }
              </td>
              <td>{item.serialNumber}</td>
              <td>{item.title}</td>
              <td>{((item.decidedRight / item.totalAttempts) * 100).toFixed(2)}%</td>
              <td>{item.decidedRight}</td>
            </tr>
          ))
          }
          </tbody>
        </Table>
        
        : <Spinner animation="border" style={spinnerCss}/>
    }
    </>
  );
};

const spinnerCss = {
  position: "fixed",
  top: "50%",
  right: "50%",
  zIndex: "1",
};

export default Tasks;
