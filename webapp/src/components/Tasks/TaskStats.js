import authToken from '../../utils/authToken';
import React, {useState} from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {loadBest, loadDecisions, loadStats} from '../../services/stats/statsActions';
import Spinner from 'react-bootstrap/Spinner';
import Table from 'react-bootstrap/Table';
import UsersUpdateModal from '../Admin/Users/UsersUpdateModal';
import SqlModal from './SqlModal';

const TaskStats = () => {
  if (localStorage.jwtToken) {
    authToken(localStorage.jwtToken);
  }
  const [modalShow, setModalShow] = useState(false);
  const [sql, setSql] = useState('');
  
  const dispatch = useDispatch();
  let history = useHistory();
  
  const isLoadingStats = useSelector(({stats}) => stats.isLoadingStats);
  const isLoadingBest = useSelector(({stats}) => stats.isLoadingBest);
  const isLoadingDecision = useSelector(({stats}) => stats.isLoadingDecision);
  
  const error = useSelector(({stats}) => stats.error);
  const statsItem = useSelector(({stats}) => stats.statsItem);
  const bestItem = useSelector(({stats}) => stats.bestItem);
  const decisionItems = useSelector(({stats}) => stats.decisionItems);
  const activeTaskId = useSelector(({task}) => task.activeTaskId);
  
  React.useEffect(() => {
    dispatch(loadStats(activeTaskId))
    dispatch(loadBest(activeTaskId))
    dispatch(loadDecisions(activeTaskId))
  }, []);
  
  const showModal=(sql)=>{
    setSql(sql);
    setModalShow(true);
  }
  
  return (
    <>
      <Card className={"border bg-light text-dark"}>
        <Container>
          <Row className="justify-content-center"
               style={{
                 fontSize: "30px",
                 paddingBottom: "10px",
                 paddingTop: "10px"
               }}
          >
            <div>
              {isLoadingStats
                ? statsItem.title
                : 'Загрузка ...'
              }
            </div>
          </Row>
          <Row style={{
            paddingBottom: "20px",
          }}>
            <Col lg={6}>
              <Card style={{
                width: '48vh',
                height: '29vh'
              }}>
                <Card.Header>Статистика</Card.Header>
                {isLoadingStats
                  ? (
                    <ListGroup variant="flush">
                      <ListGroup.Item style={listCss}>
                       <div>Авторов, которые решили</div><div>{statsItem.authorsDecided}</div>
                      </ListGroup.Item>
                      <ListGroup.Item style={listCss}>
                        <div>Авторов, которые посылали</div><div>{statsItem.authorsSent}</div>
                      </ListGroup.Item>
                      <ListGroup.Item style={listCss}>
                        <div>Решений послано</div><div>{statsItem.totalAttempts}</div>
                      </ListGroup.Item>
                      <ListGroup.Item style={listCss}>
                        <div>Верно</div><div>{statsItem.decidedRight}</div>
                      </ListGroup.Item>
                      <ListGroup.Item style={listCss}>
                        <div>Неправильный ответ</div><div>{statsItem.decidedWrong}</div>
                      </ListGroup.Item>
                    </ListGroup>
                  )
                  : (<Spinner animation="border"/>)}
              
              </Card>
            </Col>
            <Col>
              <Card style={{
                width: '48vh',
                height: '29vh',
                marginLeft:'40px'
              }}>
                <Card.Header>Лучшее решение</Card.Header>
                {isLoadingBest
                  ?
                  <ListGroup variant="flush">
                    <ListGroup variant="flush">
                      <ListGroup.Item style={listCss}>
                        <div>Номер</div><div>{bestItem.id}</div>
                      </ListGroup.Item>
                      <ListGroup.Item style={listCss}>
                        <div>Дата</div><div> {new Date(bestItem.time).toLocaleString()}</div>
                      </ListGroup.Item>
                      <ListGroup.Item style={listCss}>
                        <div>Автор</div><div>{bestItem.firstName + ' ' + bestItem.lastName}</div>
                      </ListGroup.Item>
                      <ListGroup.Item style={listCss}>
                        <div>Стоимость запроса</div><div>{bestItem.cost}</div>
                      </ListGroup.Item>
                      <ListGroup.Item style={listCss}>
                        <div>Исходный код</div><div onClick={()=>showModal(bestItem.sql)}>ссылка sql</div>
                      </ListGroup.Item>
                    </ListGroup>
                  </ListGroup>
                  : <Spinner animation="border"/>}
              </Card>
            </Col>
          </Row>
          <Row style={{
            paddingBottom: "20px",
          }}>
            <Col >
              <Card >
                <Card.Header>Все решения</Card.Header>
                <Card.Body style={{overflowY: "scroll", height: "40vh"}}>
                  {isLoadingDecision
                    ? (<Table responsive>
                      <thead>
                      <tr>
                        <th>Номер</th>
                        <th>Дата</th>
                        <th>Автор</th>
                        <th>Стоимость запроса</th>
                        <th>Исходный код</th>
                      </tr>
                      </thead>
                      <tbody>
                      {decisionItems.map((item, id) => (
                        <tr key={id}>
                          <td>{item.id}</td>
                          <td>{ new Date(item.time).toLocaleString()}</td>
                          <td>{item.firstName + ' ' + item.lastName}</td>
                          <td>{item.cost}</td>
                          <td onClick={()=>showModal(item.sql)}>sql</td>
                        </tr>
                      ))}
                      </tbody>
                    </Table>)
                    : <Spinner animation="border"/>}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </Card>
      <SqlModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        sql={sql}
      />
    </>
  );
};

const listCss = {
  display: "flex",
  justifyContent: "space-between",
  margin: '0',
  padding:'8px'
};


export default TaskStats;
