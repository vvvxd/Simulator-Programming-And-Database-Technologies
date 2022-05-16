import React from 'react';
import Table from 'react-bootstrap/Table';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCheckCircle, faCircle, faMinusCircle} from '@fortawesome/free-solid-svg-icons';
import Spinner from 'react-bootstrap/Spinner';
import { useDispatch } from "react-redux";
import {useSelector} from "react-redux";
import {fetchTasks} from '../../services/tasks/tasksActions';


const Tasks = (props) => {
  const dispatch = useDispatch();
  
  const items = useSelector(({tasks}) => tasks.items);
  const isLoaded = useSelector(({tasks}) => tasks.isLoaded);
  const error = useSelector(({tasks}) => tasks.error);
  
  React.useEffect(() => {
    dispatch(fetchTasks())
  }, []);
  
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
          <tr>
            <td><FontAwesomeIcon icon={faCircle} aria-hidden="true"/></td>
            <td>289</td>
            <td>01 - Ближние места</td>
            <td>37%</td>
            <td>959</td>
          </tr>
          <tr>
            <td><FontAwesomeIcon icon={faCheckCircle} color="green"/></td>
            <td>289</td>
            <td>01 - Ближние места</td>
            <td>37%</td>
            <td>959</td>
          </tr>
          <tr>
            <td><FontAwesomeIcon icon={faMinusCircle} color="red"/></td>
            <td>289</td>
            <td>01 - Ближние места</td>
            <td>37%</td>
            <td>959</td>
          </tr>
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
