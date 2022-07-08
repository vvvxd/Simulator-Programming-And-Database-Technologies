import {useDispatch, useSelector} from 'react-redux';
import React, {useState} from 'react';
import {fetchTask, setActiveTaskId, setCheckPage, setTask} from '../../services/task/taskActions';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import {Card, Form} from 'react-bootstrap';

import Editor from "@monaco-editor/react";
import Spinner from 'react-bootstrap/Spinner';
import DataSchema from './DataSchema';
import {
  checkSelect,
  executeSelect, setCheckResult,
  setErrorCheckingSelect,
  setErrorExecutingSql,
  setInputValueSql
} from '../../services/query/queryActions';
import Alert from 'react-bootstrap/Alert';
import {useHistory} from 'react-router-dom';
import authToken from '../../utils/authToken';
import {addComment, fetchComments, setInputValueText} from '../../services/comment/commentActions';


const Task = () => {
  
  if (localStorage.jwtToken) {
    authToken(localStorage.jwtToken);
  }
  
  const dispatch = useDispatch();
  let history = useHistory();
  
  const [value, setValue] = useState(1);
  
  const handleChange = (val) => {
    setValue(val)
  };
  
  const item = useSelector(({task}) => task.item);
  const isLoaded = useSelector(({task}) => task.isLoaded);
  const error = useSelector(({task}) => task.error);
  const activeTaskId = useSelector(({task}) => task.activeTaskId);
  
  const inputValue = useSelector(({query}) => query.inputValue);
  const isExecutingSql = useSelector(({query}) => query.isExecutingSql);
  const errorExecutingSql = useSelector(({query}) => query.errorExecutingSql);
  const sqlItems = useSelector(({query}) => query.sqlItems);
  
  const CheckSelectResult = useSelector(({query}) => query.CheckSelectResult);
  const isCheckingSelect = useSelector(({query}) => query.isCheckingSelect);
  const errorCheckingSelect = useSelector(({query}) => query.errorCheckingSelect);

  const CheckStatusPage = useSelector(({task}) => task.CheckSelectResult) //Переменная показывает выполнил ли пользователь задание или нет
  const inputValueComment = useSelector(({comment}) => comment.inputValue);
  const isLoadingComment = useSelector(({comment}) => comment.isLoading);
  const errorComment = useSelector(({comment}) => comment.error);
  const itemsComment = useSelector(({comment}) => comment.items);

  
  React.useEffect(() => {
    dispatch(fetchTask(activeTaskId))
    dispatch(fetchComments(activeTaskId))
  }, []);

  React.useEffect(() => {
    if (CheckStatusPage === true) {
      history.push('/task_stats/' + activeTaskId);
      dispatch(setCheckPage(false)) //обнуление страницы тк запрос идёт после условия(и по другому я хз ,как сделать)
    }
  }, [CheckStatusPage]);

  React.useEffect(() => {
    if (CheckSelectResult === true) {
      history.push('/task_stats/' + activeTaskId);
      dispatch(setCheckResult(false)) //обнуление, чтобы повторно не загружались результаты
    }
  }, [CheckSelectResult]);

  const onClickBack = () => {
    dispatch(setActiveTaskId(null));
    history.push('/tasks');
  }
  const onClickRun = () => {
    dispatch(executeSelect(inputValue));
  }
  
  const onClickClose = () => {
    dispatch(setErrorExecutingSql(""));
  }
  
  const onClickCloseErrorCheckingSelect = () => {
    dispatch(setErrorCheckingSelect(""));
  }
  
  const inpValue = React.useRef(null);
  const commentRef = React.useRef(null);
  
  const onChangeInput = () => {
    let text = inpValue.current.getValue();
    dispatch(setInputValueSql(text));
  };
  
  const onChangeComment = () => {
    let text = commentRef.current.value;
    dispatch(setInputValueText(text));
  };
  
  function handleEditorDidMount(editor, monaco) {
    inpValue.current = editor;
  }
  
  const onCheckClick = () => {
    dispatch(checkSelect(inputValue, activeTaskId));
  }
  
  const addTaskComment = () => {
    dispatch(addComment(activeTaskId, inputValueComment));
    dispatch(setInputValueText(""));
  }
  
  return (
    <>
      <Row>
        <Col lg={10}>
          <ToggleButtonGroup className="button_group" type="radio" name="options" defaultValue={1} value={value}
                             onChange={handleChange}>
            <ToggleButton id="tbg-radio-2" value={1}>
              Рабочая область
            </ToggleButton>
            <ToggleButton id="tbg-radio-3" value={2}>
              Схема базы данных
            </ToggleButton>
            <ToggleButton id="tbg-radio-4" value={3}>
              Комментарии
            </ToggleButton>
          </ToggleButtonGroup>
        </Col>
        <Col>
          <Button className="float-right" variant="primary" onClick={onClickBack}>Назад</Button>
        </Col>
      </Row>
      {value === 1
        ?
        (isLoaded
          ?  <Card className={"border bg-light text-dark"}>
            <Container>
              <Row>
                <Col lg={4} className="info_place">
                  <div>
                    {item.title}
                  </div>
                  <div style={{paddingBottom: "33vh"}}>
                    {item.description}
                  </div>
                  {
                    !!errorExecutingSql &&
                    <Alert variant="danger" onClose={onClickClose} dismissible>
                      <Alert.Heading>Ошибка!</Alert.Heading>
                      <p>
                        {errorExecutingSql}
                      </p>
                    </Alert>
                  }
                  {
                    !!errorCheckingSelect &&
                    <Alert variant="danger" onClose={onClickCloseErrorCheckingSelect} dismissible>
                      <Alert.Heading>Ошибка!</Alert.Heading>
                      <p>
                        {errorCheckingSelect}
                      </p>
                    </Alert>
                  }
                </Col>
                <Col>
                  <Row className="editor_place">
                    <Editor
                      value={inputValue}
                      width="70vh"
                      height="35vh"
                      defaultLanguage="sql"
                      theme="light"
                      onChange={onChangeInput}
                      onMount={handleEditorDidMount}
                      options={{
                        selectOnLineNumbers: true,
                        renderLineHighlight: "none",
                        hideCursorInOverviewRuler: true,
                        minimap: {
                          enabled: false,
                        },
                        fontSize: 12,
                        wordWrap: "on",
                        lineHeight: 16,
                      }}
                    />
                    <Button className="float-right"
                            disabled={!isExecutingSql}
                            variant="primary"
                            onClick={isExecutingSql ? onClickRun : null}
                            style={{
                              marginLeft: "auto",
                              marginRight: "Opx",
                              width: "100px",
                              textAlign: "center",
                              height: "45px"
                            }}
                    >
                      {!isExecutingSql
                        ? <Spinner animation="border"/>
                        : "Запустить"
                      }
                    </Button>
                    <Button
                      variant="primary"
                      disabled={!isCheckingSelect}
                      onClick={isCheckingSelect ? onCheckClick : null}
                      style={{
                        marginLeft: "10px",
                        marginRight: "Opx",
                        width: "100px",
                        textAlign: "center",
                        height: "45px"
                      }}
                    >
                      {!isCheckingSelect
                        ? <Spinner animation="border"/>
                        : 'Проверка'
                      }
                    </Button>
                  </Row>
                  <Row className="table_place">
                    <div>
                      <Card bg="light" text="dark">
                        <Card.Body style={{overflowY: "scroll", height: "40vh", width: "70vh"}}>
                          {isExecutingSql
                            ? <Table striped bordered hover>
                              <thead>
                              <tr>
                                {sqlItems.length > 0 && Object.keys(sqlItems[0]).map((item, id) => (
                                  <th key={id}>{item}</th>
                                ))
                                }
                              </tr>
                              </thead>
                              <tbody>
                              {sqlItems.length > 0 && sqlItems.map((sqlItem, id) => (
                                <tr key={id}>
                                  {Object.values(sqlItem).map((item, id) => (
                                    <td key={id}>{item}</td>
                                  ))}
                                </tr>
                              ))
                              }
                              </tbody>
                            </Table>
                            : <Spinner animation="border"/>
                          }
                        </Card.Body>
                      </Card>
                    </div>
                  </Row>
                </Col>
              </Row>
            </Container>
          </Card>
          
          : <Spinner animation="border" style={spinnerCss}/>)
        
        : (value === 2
            ? <DataSchema/>
            : (<Card className={"border bg-light text-dark"}>
              <Container>
                <Row>
                  <Card text="dark">
                    <Card.Body style={{overflowY: "scroll", height: "60vh", width: "115vh"}}>
                      
                      {
                        isLoadingComment === true
                          ?
                          itemsComment.map((item,id) => (
                            <Alert variant="secondary" key={id}>
                              <Alert.Heading>{item.lastName + " " + item.firstName + "   " + new Date(item.time).toLocaleString()}</Alert.Heading>
                              <p>
                                {item.text}
                              </p>
                            </Alert>
                          ))
                          
                          : <Spinner animation="border"/>
                      }
                    </Card.Body>
                  </Card>
                </Row>
                <Row style={{padding: "20px"}}>
              
                    <Form.Group>
                      <Form.Group>
                        <Form.Control onChange={onChangeComment} value={inputValueComment} ref={commentRef}
                                      style={{width: "110vh"}} as="textarea" rows={4}/>
                      </Form.Group>
                    </Form.Group>
                    
                    <Button variant="primary" type="submit"   onClick={addTaskComment}>
                      Submit
                    </Button>
        
                </Row>
              </Container>
            </Card>)
        )
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

export default Task;