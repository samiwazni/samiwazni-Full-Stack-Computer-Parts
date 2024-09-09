import React, { useState } from "react";
import { Container, Row, Col, Button, Modal } from "react-bootstrap";
import "../style/style.scss";
import { ChevronUp, ChevronDown } from 'react-bootstrap-icons';

const BasicRenderComponents = ({ cases, cpus, cpuCoolers, gpus, memories, motherboards, psus, storages }) => {
  const [modalShow, setModalShow] = useState({
    cases: false,
    cpus: false,
    cpuCoolers: false,
    gpus: false,
    memories: false,
    motherboards: false,
    psus: false,
    storages: false
  });

  const toggleModal = (section) => {
    setModalShow((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ height: '100vh', color: 'white' }}>
      <div>
        <h1 className="text-center">Explore Our Components</h1>
        <p className="text-center mb-4">Explore a wide range of computer components to build or upgrade your computer. From cases to CPUs, find all you need in one place.</p>
        <Row>
          {Object.entries({ cases, cpus, cpuCoolers, gpus, memories, motherboards, psus, storages }).map(([key, items]) => (
            <Col xs={12} sm={6} md={4} lg={3} className="mb-3" key={key}>
              <Button
                onClick={() => toggleModal(key)}
                aria-controls={key}
                aria-expanded={modalShow[key]}
                className="w-100 text-left"
                variant="outline-light"
              >
                {key.charAt(0).toUpperCase() + key.slice(1)}
                <span className="float-right">
                  {modalShow[key] ? <ChevronUp /> : <ChevronDown />}
                </span>
              </Button>
              <Modal
                show={modalShow[key]}
                onHide={() => toggleModal(key)}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
              >
                <Modal.Header className="bg-dark text-white" closeButton>
                  <Modal.Title id="contained-modal-title-vcenter">
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body className="bg-dark text-white" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
                  <ul>
                    {items.map((item) => (
                      <li key={item.ID}>
                        {item.Manufacturer} - {item.Name}
                      </li>
                    ))}
                  </ul>
                </Modal.Body>
              </Modal>
            </Col>
          ))}
        </Row>
      </div>
    </Container>
  );
};

export default BasicRenderComponents;
