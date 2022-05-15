import React from "react";
import {useSelector} from "react-redux";
import {Alert, Card, Col, Container, Image, Row} from "react-bootstrap";
import authToken from '../../utils/authToken';
import img from '../../assets/img/user.jpg'

const UserProfile = () => {
  if (localStorage.jwtToken) {
    authToken(localStorage.jwtToken);
  }
  
  const auth = useSelector((state) => state.auth);
  console.log(auth)
  return (
    <Card className={"border border-dark bg-dark text-white"}>
      {!!auth.isLoggedIn
        ?
        <Container>
          <Row>
            <Col xs={6} md={4}>
              <Image src={auth.urlImg !== '' ? auth.urlImg : img} roundedCircle width="200" height="200"/>
            </Col>
            <Col xs={6} md={4} className='profile-info'>
              <div>username : {auth.username}</div>
              <div>email : {auth.email}</div>
              <div>mobile : {auth.mobile}</div>
            </Col>
          </Row>
        </Container>
        :
        <Alert style={{backgroundColor: "#343A40", color: "#ffffff80"}}>
          Please login
        </Alert>
      }
    </Card>
  );
};

export default UserProfile;
