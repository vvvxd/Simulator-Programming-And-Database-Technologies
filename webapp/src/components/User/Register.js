import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import  {Button,Spinner, Card, Col, Form, FormControl, InputGroup, Row,} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEnvelope, faLock, faUndo, faUser, faUserPlus, faUsers,} from "@fortawesome/free-solid-svg-icons";
import {registerUser} from "../../services/index";
import MyToast from "../MyToast";
import {loadGroups} from '../../services/group/groupActions';

const Register = (props) => {
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  
  const initialState = {
    lastName: "",
    firstName: "",
    email: "",
    password: "",
    userGroupId: ""
  };
  
  const [user, setUser] = useState(initialState);
  
  const userChange = (event) => {
    const {name, value} = event.target;

    setUser({...user, [name]: value});
    console.log(user)
  };
  
  const dispatch = useDispatch();
  
  const isLoadingAllGroup = useSelector(({group}) => group.isLoadingAllGroup);
  const error = useSelector(({group}) => group.error);
  const groups = useSelector(({group}) => group.groups);
  
  React.useEffect(() => {
    dispatch((loadGroups()))
  }, []);
  
  const saveUser = () => {
    dispatch(registerUser(user))
    .then((response) => {
      setShow(true);
      setMessage(response.message);
      resetRegisterForm();
      setTimeout(() => {
        setShow(false);
        props.history.push("/login");
      }, 2000);
    })
    .catch((error) => {
      console.log(error);
    });
  };
  
  const resetRegisterForm = () => {
    setUser(initialState);
  };
  
  return (
    <div>
      <div style={{display: show ? "block" : "none"}}>
        <MyToast show={show} message={message} type={"success"}/>
      </div>
      <Row className="justify-content-md-center">
        <Col xs={5}>
          <Card className={"border bg-light text-dark"}>
            <Card.Header>
              <FontAwesomeIcon icon={faUserPlus}/> Регистрация
            </Card.Header>
            {isLoadingAllGroup
              ? <Card.Body>
                <Form.Row>
                  <Form.Group as={Col}>
                    <InputGroup>
                      <InputGroup.Prepend>
                        <InputGroup.Text>
                          <FontAwesomeIcon icon={faUser}/>
                        </InputGroup.Text>
                      </InputGroup.Prepend>
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
                      <InputGroup.Prepend>
                        <InputGroup.Text>
                          <FontAwesomeIcon icon={faUser}/>
                        </InputGroup.Text>
                      </InputGroup.Prepend>
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
                      <InputGroup.Prepend>
                        <InputGroup.Text>
                          <FontAwesomeIcon icon={faEnvelope}/>
                        </InputGroup.Text>
                      </InputGroup.Prepend>
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
                      <InputGroup.Prepend>
                        <InputGroup.Text>
                          <FontAwesomeIcon icon={faLock}/>
                        </InputGroup.Text>
                      </InputGroup.Prepend>
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
                      <InputGroup.Prepend>
                        <InputGroup.Text>
                          <FontAwesomeIcon icon={faUsers}/>
                        </InputGroup.Text>
                      </InputGroup.Prepend>
                      <Form.Control required name="userGroupId" as="select" onChange={userChange}>
                        <option value="-1">Выберите группу</option>
                        {groups.map((item,id)=>(
                          <option value={item.id}>{item.shortName}</option>)
                        )}
                      </Form.Control>
                    </InputGroup>
                  </Form.Group>
                </Form.Row>
              </Card.Body>
              
              :<Spinner animation="border"/>
            }
            <Card.Footer style={{textAlign: "right"}}>
              <Button
                size="sm"
                type="button"
                variant="success"
                onClick={saveUser}
                disabled={user.email.length === 0
                || user.password.length === 0
                || user.firstName.length === 0
                || user.lastName.length === 0
                || user.userGroupId.length === 0
                || user.userGroupId === "-1"
                }
              >
                <FontAwesomeIcon icon={faUserPlus}/> Register
              </Button>{" "}
              <Button
                size="sm"
                type="button"
                variant="info"
                onClick={resetRegisterForm}
              >
                <FontAwesomeIcon icon={faUndo}/> Reset
              </Button>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Register;
