import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserPlus,
  faSignInAlt,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { logoutUser } from "../services/index";

const NavigationBar = () => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(logoutUser());
  };

  const guestLinks = (
    <>
      <div className="mr-auto"></div>
      <Nav className="navbar-right">
        <Link to={"register"} className="nav-link">
          <FontAwesomeIcon icon={faUserPlus} /> Регистрация
        </Link>
        <Link to={"login"} className="nav-link">
          <FontAwesomeIcon icon={faSignInAlt} /> Авторизация
        </Link>
      </Nav>
    </>
  );
  const userLinks = (
    <>
      <Nav className="mr-auto">
        <Link to={"tasks"} className="nav-link">
          Задачи
        </Link>
        <Link to={"add"} className="nav-link">
          Add Book
        </Link>
        <Link to={"list"} className="nav-link">
          Book List
        </Link>
        <Link to={"profile"} className="nav-link">
          User Profile
        </Link>
      </Nav>
      <Nav className="navbar-right">
        <Link to={"logout"} className="nav-link" onClick={logout}>
          <FontAwesomeIcon icon={faSignOutAlt} /> Выход
        </Link>
      </Nav>
    </>
    
  );
  const toastCss = {

    boxShadow:
      "0 1px 8px 0 rgba(0, 0, 0, 0.01), 0 6px 20px 0 rgba(0, 0, 0, 0.07)",
  };
  return (
    <Navbar style={toastCss} className={"border text-dark"} bg="light" variant="light">
      <Link to={auth.isLoggedIn ? "home" : ""} className="navbar-brand">
        <img
          src="http://atpp.vstu.edu.ru/atpphead2.gif"
          width="50"
          height="50"
          alt="brand"
        />{" "}
        Базы данных. SQL
      </Link>
      {auth.isLoggedIn ? userLinks : guestLinks}
    </Navbar>
  );
};

export default NavigationBar;
