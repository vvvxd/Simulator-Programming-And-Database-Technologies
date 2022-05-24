import authToken from '../../utils/authToken';
import React from 'react';
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

const TaskStats = () => {
  if (localStorage.jwtToken) {
    authToken(localStorage.jwtToken);
  }
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
  
  return (
    <>
      <div className="container__mod">
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
                width: '55vh',
                height: '29vh'
              }}>
                <Card.Header>Статистика</Card.Header>
                {isLoadingStats
                  ? (
                    <ListGroup variant="flush">
                      <ListGroup.Item>
                        <pre style={{margin: '0'}}>Авторов, которые решили {statsItem.authorsDecided}</pre>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <pre style={{margin: '0'}}>Авторов, которые посылали {statsItem.authorsSent}</pre>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <pre style={{margin: '0'}}>Решений послано {statsItem.totalAttempts}</pre>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <pre style={{margin: '0'}}>Верно {statsItem.decidedRight}</pre>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <pre style={{margin: '0'}}>Неправильный ответ {statsItem.decidedWrong}</pre>
                      </ListGroup.Item>
                    </ListGroup>
                  )
                  : (<Spinner animation="border"/>)}
              
              </Card>
            </Col>
            <Col>
              <Card style={{
                width: '55vh',
                height: '29vh'
              }}>
                <Card.Header>Лучшее решение</Card.Header>
                {isLoadingBest
                  ?
                  <ListGroup variant="flush">
                    <ListGroup variant="flush">
                      <ListGroup.Item>
                        <pre style={{margin: '0'}}>Номер {bestItem.id}</pre>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <pre style={{margin: '0'}}>Дата {bestItem.time}</pre>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <pre style={{margin: '0'}}>Автор {bestItem.firstName + ' ' + bestItem.lastName}  </pre>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <pre style={{margin: '0'}}>Стоимость запроса {bestItem.cost}</pre>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <pre style={{margin: '0'}}>Исходный код               ссылка sql</pre>
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
                          <td>{item.time}</td>
                          <td>{item.firstName + ' ' + item.lastName}</td>
                          <td>{item.cost}</td>
                          <td>sql</td>
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
      </div>
    </>
  );
};

const spinnerCss = {
  position: "fixed",
  top: "50%",
  right: "50%",
  zIndex: "1",
};

export default TaskStats;
