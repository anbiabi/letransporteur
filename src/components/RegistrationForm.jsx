import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { addDriver } from '../utils/storage';

function RegistrationForm({ onDriverAdded, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    birthDate: '',
    tel: '',
    block: '',
    profession: '',
    address: '',
    plateNumber: '',
    licensePhoto: '',
    signature: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          licensePhoto: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newDriver = addDriver({
      ...formData,
      id: Date.now()
    });
    onDriverAdded(newDriver);
    onClose();
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <h2 className="text-center mb-4">LE TRANSPORTEUR</h2>
        <h3 className="text-center mb-4">FICHE D'INSCRIPTION</h3>

        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Nom:</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Date de Naissance:</Form.Label>
              <Form.Control
                type="date"
                name="birthDate"
                value={formData.birthDate}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>WhatsApp:</Form.Label>
              <Form.Control
                type="tel"
                name="tel"
                value={formData.tel}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Quartier:</Form.Label>
              <Form.Control
                type="text"
                name="block"
                value={formData.block}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3">
          <Form.Label>Profession:</Form.Label>
          <Form.Control
            type="text"
            name="profession"
            value={formData.profession}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Adresse:</Form.Label>
          <Form.Control
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Numéro d'Immatriculation:</Form.Label>
          <Form.Control
            type="text"
            name="plateNumber"
            value={formData.plateNumber}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Permis de Conduire:</Form.Label>
          <Form.Control
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            required
          />
          {formData.licensePhoto && (
            <img 
              src={formData.licensePhoto} 
              alt="License Preview" 
              className="mt-2"
              style={{ maxWidth: '200px' }}
            />
          )}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Signature:</Form.Label>
          <Form.Control
            type="text"
            name="signature"
            value={formData.signature}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100">
          S'inscrire
        </Button>
      </Form>
    </Container>
  );
}

export default RegistrationForm;
