import React from "react";
import { Link } from "react-router-dom";
import { Container, Button, Row, Col } from "react-bootstrap";
import "../style/style.scss";
import Hero from "../assets/hero.png"

const Home = ({ currentUser }) => {
  return (
    <div className="d-flex align-items-center justify-content-center p-3" style={{ height: '90vh', color: 'white' }}>
      <Container className="text-container">
        <Row className="align-items-center">
          <Col md={6}>
            <div className="text-white pt-5 pb-5 rounded-lg">
              <h1 className="display-6">Welcome to the PC Building Website</h1>
              <p className="lead mt-4">
                Take a look at the latest computer parts that our database has.
              </p>
              <p className="mt-4">
                Our project is a full-stack application built with:
              </p>
              <ul className="lead">
                <li>ReactJS for the front end</li>
                <li>NodeJS for the back end</li>
                <li>Python for creating the database tables</li>
                <li>SQLite for the database</li>
              </ul>
              {!currentUser && (
                <p className="mt-4">
                  To use the <strong>Computer Builder</strong>{" "}
                  <Button variant="outline-info" size="sm">
                    <Link to="/signin" className="text-info text-decoration-none">
                      sign in
                    </Link>
                </Button>
                  
                </p>
              )}
              <Button variant="dark" size="sm" className="mt-3">
                <Link to="/components" className="text-white text-decoration-none">
                  Components
                </Link>
              </Button>
            </div>
          </Col>
          <Col md={6}>
            <div className="image-container">
              <img
                src={Hero}
                alt="Motherboard"
                className="img-fluid"
              />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
