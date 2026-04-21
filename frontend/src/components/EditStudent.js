import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import StudentService from '../services/StudentService';
import { Container, Form, Button, Card, Alert, Spinner } from 'react-bootstrap';

function EditStudent() {
  const { id } = useParams();
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
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadStudent();
  }, [id]);

  const loadStudent = () => {
    StudentService.getStudentById(id)
      .then(response => {
        setFormData(response.data);
      })
      .catch(error => {
        setMessage('Error loading student');
        console.error(error);
      })
      .finally(() => setLoading(false));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);

    StudentService.updateStudent(id, formData)
      .then(() => {
        setMessage('Student updated successfully!');
        setTimeout(() => {
          navigate('/');
        }, 1500);
      })
      .catch(error => {
        setMessage('Error updating student');
        console.error(error);
      })
      .finally(() => setSubmitting(false));
  };

  if (loading) {
    return (
      <Container className="mt-5 text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <Card className="shadow">
        <Card.Header className="bg-warning">
          <h3>✏️ Edit Student</h3>
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
                value={formData.address}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <div className="d-grid gap-2">
              <Button variant="warning" type="submit" disabled={submitting}>
                {submitting ? 'Updating...' : 'Update Student'}
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

export default EditStudent;
