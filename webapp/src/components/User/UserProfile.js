import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Card, Container, Row} from "react-bootstrap";
import authToken from '../../utils/authToken';
import {useParams} from "react-router-dom";
import ProgressBar from 'react-bootstrap/ProgressBar';
import ListGroup from 'react-bootstrap/ListGroup';
import Col from 'react-bootstrap/Col';
import {
  loadBestSolutionsTasks,
  loadInfo,
  loadSolvedTask,
  loadUnresolvedTasks
} from '../../services/prifile/profileActions';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import UpdateUser from "./UpdateUser";


const UserProfile = () => {
  if (localStorage.jwtToken) {
    authToken(localStorage.jwtToken);
  }
  let {id} = useParams();

  const dispatch = useDispatch();
  const [updateShow, setUpdateShow] = useState(false);
  const auth = useSelector((state) => state.auth);

  const isInfoLoading = useSelector(({profile}) => profile.isInfoLoading);
  const isSolvedTasksLoading = useSelector(({profile}) => profile.isSolvedTasksLoading);
  const isUnresolvedTasksLoading = useSelector(({profile}) => profile.isUnresolvedTasksLoading);
  const isBestSolutionsTasksLoading = useSelector(({profile}) => profile.isBestSolutionsTasksLoading);

  const error = useSelector(({profile}) => profile.error);

  const info = useSelector(({profile}) => profile.info);
  const solvedTasks = useSelector(({profile}) => profile.solvedTasks);
  const unresolvedTasks = useSelector(({profile}) => profile.unresolvedTasks);
  const bestSolutionsTasks = useSelector(({profile}) => profile.bestSolutionsTasks);

  React.useEffect(() => {
    dispatch(loadInfo(id))
    dispatch(loadSolvedTask(id))
    dispatch(loadUnresolvedTasks(id))
    dispatch(loadBestSolutionsTasks(id))
  }, []);

  return (
      <Card className={"border bg-light text-dark"}>
        {

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

                  {isInfoLoading
                      ? (info.firstName + " " + info.lastName)
                      : 'Загрузка ...'
                  }
                </div>
                <Button style={{
                  position: "absolute",
                  right: "75%",
                }} onClick={() => setUpdateShow(true)}>Редактировать профиль</Button>
              </Row>
              <Card.Header>Информация</Card.Header>
              {isInfoLoading
                  ? (
                      <ListGroup variant="flush">
                        <ListGroup.Item style={listCss}>
                          <div>Email</div>
                          <div>{info.email}</div>
                        </ListGroup.Item>
                        <ListGroup.Item style={listCss}>
                          <div>Группа</div>
                          <div>{info.group}</div>
                        </ListGroup.Item>
                        <ListGroup.Item style={listCss}>
                          <div>Задач решено</div>
                          <div>{info.tasksSolved}</div>
                        </ListGroup.Item>
                        <ListGroup.Item style={listCss}>
                          <div>Решений послано</div>
                          <div>{info.tasksSent}</div>
                        </ListGroup.Item>
                      </ListGroup>
                  )
                  : (<Spinner animation="border"/>)}
              <Row className="justify-content-center" style={{
                paddingBottom: "10px",
              }}>
                <Card.Header>
                  Прогресс
                </Card.Header>
                {isInfoLoading
                    ? (
                        <ProgressBar style={{width: "110vh"}} animated
                                     now={((info.tasksSolved / info.tasksTotal) * 100).toFixed(0)}/>
                    )
                    : (<ProgressBar style={{width: "110vh"}} animated now={100}/>)
                }
              </Row>
              <Row style={{
                paddingBottom: "10px",
              }}>
                <Col lg={4}>
                  <Card style={{
                    height: '45vh'
                  }}>
                    <Card.Header>Список решенных задач</Card.Header>
                    <Card.Body style={{overflowY: "scroll", padding: "0"}}>
                      <ListGroup variant="flush">
                        <ListGroup variant="flush">
                          <ListGroup.Item style={listCss}>
                            <div>Номер</div>
                            <div>Попыток</div>
                          </ListGroup.Item>
                          {isSolvedTasksLoading
                              ?
                              solvedTasks.map((item, id) => (
                                  <ListGroup.Item key={id} style={listCss}>
                                    <div>{item.serialNumber}</div>
                                    <div>{item.attempts}</div>
                                  </ListGroup.Item>
                              ))
                              : <Spinner animation="border"/>
                          }
                        </ListGroup>
                      </ListGroup>
                    </Card.Body>
                  </Card>
                </Col>
                <Col lg={4}>
                  <Card style={{
                    height: '45vh'
                  }}>
                    <Card.Header>Список не решенных задач</Card.Header>
                    <Card.Body style={{overflowY: "scroll", padding: "0"}}>
                      <ListGroup variant="flush">
                        <ListGroup variant="flush">
                          <ListGroup.Item style={{
                            display: "flex",
                            justifyContent: "space-between"
                          }}>
                            <div>Номер</div>
                            <div>Попыток</div>
                          </ListGroup.Item>

                          {isUnresolvedTasksLoading
                              ?
                              unresolvedTasks.map((item, id) => (
                                  <ListGroup.Item key={id} style={listCss}>
                                    <div>{item.serialNumber}</div>
                                    <div>{item.attempts}</div>
                                  </ListGroup.Item>
                              ))
                              : <Spinner animation="border"/>
                          }

                        </ListGroup>
                      </ListGroup>
                    </Card.Body>
                  </Card>
                </Col>
                <Col lg={4}>
                  <Card style={{
                    height: '45vh'
                  }}>
                    <Card.Header>Список лучших решений для задач</Card.Header>
                    <Card.Body style={{overflowY: "scroll", padding: "0"}}>
                      <ListGroup variant="flush">
                        <ListGroup variant="flush">
                          <ListGroup.Item style={{
                            display: "flex",
                            justifyContent: "space-between"
                          }}>
                            <div>Номер</div>
                            <div>Попыток</div>
                          </ListGroup.Item>

                          {isBestSolutionsTasksLoading
                              ?
                              bestSolutionsTasks.map((item, id) => (
                                  <ListGroup.Item key={id} style={listCss}>
                                    <div>{item.serialNumber}</div>
                                    <div>{item.attempts}</div>
                                  </ListGroup.Item>
                              ))
                              : <Spinner animation="border"/>
                          }
                        </ListGroup>
                      </ListGroup>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
              <UpdateUser
                  show={updateShow}
                  onHide={() => setUpdateShow(false)}
                  item={{...info, password:""}}
                  id={id}
              />
            </Container>
          </div>
        }
      </Card>
  );
};

const listCss = {
  display: "flex",
  justifyContent: "space-between",
  margin: '0'
};

export default UserProfile;