import React from "react";

import { Navbar, Container, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <Navbar fixed="bottom" bg="light" variant="light">
      <Container>
        <Col lg={12} className="text-center text-muted">
          <div>
            made  by vvvxdd
          </div>
        </Col>
      </Container>
    </Navbar>
  );
};

export default Footer;
