import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Row,
  Col,
  Card,
  Form,
  InputGroup,
  FormControl,
  Button,
  Alert,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignInAlt,
  faEnvelope,
  faLock,
  faUndo,
} from "@fortawesome/free-solid-svg-icons";
import { authenticateUser } from "../../services/index";
import {useHistory} from 'react-router-dom';

const Login = (props) => {
  const [error, setError] = useState();
  const [show, setShow] = useState(true);

  const initialState = {
    email: "",
    password: "",
  };

  const [user, setUser] = useState(initialState);

  const credentialChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const dispatch = useDispatch();
  let history = useHistory();
  
  const validateUser = () => {
    dispatch(authenticateUser(user.email, user.password))
      .then((response) => {
        console.log(response.data);
        return history.push("/tasks");
      })
      // .catch((error) => {
      //   console.log(error.message);
      //   setShow(true);
      //   resetLoginForm();
      //   setError("Неверный адрес электронной почты или пароль");
      // });
  };

  const resetLoginForm = () => {
    setUser(initialState);
  };

  return (
    <Row className="justify-content-md-center">
      <Col xs={5}>
        {show && props.message && (
          <Alert variant="success" onClose={() => setShow(false)} dismissible>
            {props.message}
          </Alert>
        )}
        {show && error && (
          <Alert variant="danger" onClose={() => setShow(false)} dismissible>
            {error}
          </Alert>
        )}
        <Card className={"border bg-light text-dark"}>
          <Card.Header>
            <FontAwesomeIcon icon={faSignInAlt} /> Авторизация
          </Card.Header>
          <Card.Body>
            <Form.Row>
              <Form.Group as={Col}>
                <InputGroup>
                  <InputGroup.Prepend>
                    <InputGroup.Text>
                      <FontAwesomeIcon icon={faEnvelope} />
                    </InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl
                    required
                    autoComplete="off"
                    type="text"
                    name="email"
                    value={user.email}
                    onChange={credentialChange}
                    className={"bg-light text-dark"}
                    placeholder="Enter Email Address"
                  />
                </InputGroup>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col}>
                <InputGroup>
                  <InputGroup.Prepend>
                    <InputGroup.Text>
                      <FontAwesomeIcon icon={faLock} />
                    </InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl
                    required
                    autoComplete="off"
                    type="password"
                    name="password"
                    value={user.password}
                    onChange={credentialChange}
                    className={"bg-light text-dark"}
                    placeholder="Enter Password"
                  />
                </InputGroup>
              </Form.Group>
            </Form.Row>
          </Card.Body>
          <Card.Footer style={{ textAlign: "right" }}>
            <Button
              size="sm"
              type="button"
              variant="success"
              onClick={validateUser}
              disabled={user.email.length === 0 || user.password.length === 0}
            >
              <FontAwesomeIcon icon={faSignInAlt} /> Авторизоваться
            </Button>{" "}
            <Button
              size="sm"
              type="button"
              variant="info"
              onClick={resetLoginForm}
              disabled={user.email.length === 0 && user.password.length === 0}
            >
              <FontAwesomeIcon icon={faUndo} /> Сброс
            </Button>
          </Card.Footer>
        </Card>
      </Col>
    </Row>
  );
};

export default Login;
