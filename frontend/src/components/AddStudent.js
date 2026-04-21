import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StudentService from '../services/StudentService';
import { Container, Form, Button, Card, Alert } from 'react-bootstrap';

function AddStudent() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    course: '',
    enrollmentNumber: '',
    gpa: '',
    address: ''
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    StudentService.createStudent(formData)
      .then(() => {
        setMessage('Student added successfully!');
        setTimeout(() => {
          navigate('/');
        }, 1500);
      })
      .catch(error => {
        setMessage('Error adding student: ' + (error.response?.data?.message || 'Please try again'));
        console.error(error);
      })
      .finally(() => setLoading(false));
  };

  return (
    <Container className="mt-5">
      <Card className="shadow">
        <Card.Header className="bg-primary text-white">
          <h3>➕ Add New Student</h3>
        </Card.Header>
        <Card.Body>
          {message && (
            <Alert variant={message.includes('Error') ? 'danger' : 'success'} onClose={() => setMessage('')} dismissible>
              {message}
            </Alert>
          )}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Full Name *</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Enter full name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email *</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Phone Number *</Form.Label>
              <Form.Control
                type="tel"
                name="phoneNumber"
                placeholder="Enter phone number"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Course *</Form.Label>
              <Form.Control
                type="text"
                name="course"
                placeholder="Enter course name"
                value={formData.course}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Enrollment Number *</Form.Label>
              <Form.Control
                type="text"
                name="enrollmentNumber"
                placeholder="Enter enrollment number"
                value={formData.enrollmentNumber}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>GPA *</Form.Label>
              <Form.Control
                type="number"
                name="gpa"
                placeholder="Enter GPA"
                step="0.01"
                value={formData.gpa}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Address *</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="address"
                placeholder="Enter address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <div className="d-grid gap-2">
              <Button variant="primary" type="submit" disabled={loading}>
                {loading ? 'Adding...' : 'Add Student'}
              </Button>
              <Button variant="secondary" onClick={() => navigate('/')}>
                Back to List
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default AddStudent;
