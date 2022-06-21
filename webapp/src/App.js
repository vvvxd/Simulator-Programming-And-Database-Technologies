import React from "react";
import "./App.css";

import { Container, Row, Col } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import NavigationBar from "./components/NavigationBar";
import Welcome from "./components/Welcome";
import UserList from "./components/User/UserProfile";
import Register from "./components/User/Register";
import Login from "./components/User/Login";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Tasks from './components/Tasks/Tasks';
import Task from './components/Tasks/Task';
import TaskStats from './components/Tasks/TaskStats';
import Admin from './components/Admin/Admin';

const App = () => {
  window.onbeforeunload = (event) => {
    const e = event || window.event;
    e.preventDefault();
    if (e) {
      e.returnValue = "";
    }
    return "";
  };

  return (
    <Router>
      <NavigationBar />
      <Container>
        <Row>
          <Col xl={12} className={"margin-top"}>
            <Switch>
              <Route path="/" exact component={Welcome} />
              <Route path="/tasks" exact component={Tasks} />
              <Route path="/task_stats/:id" exact component={TaskStats} />
              <Route path="/task/:id" exact component={Task} />
              <Route path="/home" exact component={Home} />
              <Route path="/admin" exact component={Admin} />
              <Route path="/profile/:id" exact component={UserList} />
              <Route path="/register" exact component={Register} />
              <Route path="/login" exact component={Login} />
              <Route
                path="/logout"
                exact
                component={() => (
                  <Login message="Пользователь успешно вышел из системы." />
                )}
              />
            </Switch>
          </Col>
        </Row>
      </Container>
      <Footer />
    </Router>
  );
};

export default App;
