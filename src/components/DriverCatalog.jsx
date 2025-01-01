import React, { useState, useEffect } from 'react';
import { Card, Container, Row, Col, Form } from 'react-bootstrap';

function DriverCatalog({ drivers }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [userBlock, setUserBlock] = useState('');

  useEffect(() => {
    // Get user's location (simplified version - you might want to use proper geolocation)
    setUserBlock('Quartier 1'); // Default value for demonstration
  }, []);

  const sortedDrivers = [...drivers].sort((a, b) => {
    // Sort by matching block first
    if (a.block === userBlock && b.block !== userBlock) return -1;
    if (b.block === userBlock && a.block !== userBlock) return 1;
    return 0;
  });

  const filteredDrivers = sortedDrivers.filter((driver) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      (driver.tel?.toLowerCase() || '').includes(searchLower) ||
      (driver.plateNumber?.toLowerCase() || '').includes(searchLower)
    );
  });

  return (
    <Container>
      <Form.Group className="mb-4">
        <Form.Control
          type="text"
          placeholder="Rechercher par WhatsApp ou numéro d'immatriculation"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Form.Group>

      <Row xs={1} md={2} lg={3} className="g-4">
        {filteredDrivers.map((driver) => (
          <Col key={driver.id}>
            <Card>
              {driver.licensePhoto && (
                <Card.Img 
                  variant="top" 
                  src={driver.licensePhoto} 
                  style={{ height: '200px', objectFit: 'cover' }}
                />
              )}
              <Card.Body>
                <Card.Text>
                  <strong>WhatsApp:</strong> {driver.tel || 'Non spécifié'}<br />
                  <strong>Quartier:</strong> {driver.block || 'Non spécifié'}<br />
                  <strong>Immatriculation:</strong> {driver.plateNumber || 'Non spécifié'}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default DriverCatalog;
