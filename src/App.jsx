import React, { useState, useEffect } from 'react';
import { Container, Navbar, Button, Modal } from 'react-bootstrap';
import RegistrationForm from './components/RegistrationForm';
import DriverCatalog from './components/DriverCatalog';
import { getDrivers } from './utils/storage';

function App() {
  const [drivers, setDrivers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setDrivers(getDrivers());
  }, []);

  const handleDriverAdded = (newDriver) => {
    setDrivers([...drivers, newDriver]);
  };

  return (
    <>
      <Navbar bg="primary" variant="dark" className="mb-4">
        <Container>
          <Navbar.Brand>LE TRANSPORTEUR</Navbar.Brand>
          <div>
            {!isLoggedIn ? (
              <Button 
                variant="outline-light" 
                onClick={() => setIsLoggedIn(true)}
              >
                Se Connecter
              </Button>
            ) : (
              <>
                <Button 
                  variant="outline-light" 
                  onClick={() => setShowModal(true)}
                  className="me-2"
                >
                  Nouveau Chauffeur
                </Button>
                <Button 
                  variant="danger" 
                  onClick={() => setIsLoggedIn(false)}
                >
                  Se Déconnecter
                </Button>
              </>
            )}
          </div>
        </Container>
      </Navbar>

      <Container>
        <DriverCatalog drivers={drivers} />
      </Container>

      <Modal 
        show={showModal} 
        onHide={() => setShowModal(false)}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Inscription Chauffeur</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <RegistrationForm 
            onDriverAdded={handleDriverAdded}
            onClose={() => setShowModal(false)}
          />
        </Modal.Body>
      </Modal>
    </>
  );
}

export default App;
