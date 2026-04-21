import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import StudentService from '../services/StudentService';
import { Container, Table, Button, Form, Alert, Spinner } from 'react-bootstrap';

function StudentList() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCourse, setFilterCourse] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = () => {
    setLoading(true);
    StudentService.getAllStudents()
      .then(response => {
        setStudents(response.data);
        setMessage('');
      })
      .catch(error => {
        setMessage('Error loading students');
        console.error(error);
      })
      .finally(() => setLoading(false));
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      StudentService.deleteStudent(id)
        .then(() => {
          setMessage('Student deleted successfully');
          loadStudents();
        })
        .catch(error => {
          setMessage('Error deleting student');
          console.error(error);
        });
    }
  };

  const handleSearch = () => {
    if (searchTerm.trim()) {
      setLoading(true);
      StudentService.searchByName(searchTerm)
        .then(response => {
          setStudents(response.data);
        })
        .catch(error => {
          setMessage('Error searching students');
          console.error(error);
        })
        .finally(() => setLoading(false));
    } else {
      loadStudents();
    }
  };

  const handleFilterByCourse = () => {
    if (filterCourse.trim()) {
      setLoading(true);
      StudentService.filterByCourse(filterCourse)
        .then(response => {
          setStudents(response.data);
        })
        .catch(error => {
          setMessage('Error filtering students');
          console.error(error);
        })
        .finally(() => setLoading(false));
    } else {
      loadStudents();
    }
  };

  const handleReset = () => {
    setSearchTerm('');
    setFilterCourse('');
    loadStudents();
  };

  return (
    <Container>
      <h1 className="mb-4 mt-4">📖 Student List</h1>

      {message && (
        <Alert variant={message.includes('Error') ? 'danger' : 'success'} onClose={() => setMessage('')} dismissible>
          {message}
        </Alert>
      )}

      <div className="card p-4 mb-4">
        <h5 className="mb-3">Search & Filter</h5>
        <div className="row">
          <div className="col-md-4">
            <Form.Group>
              <Form.Label>Search by Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter student name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Form.Group>
          </div>
          <div className="col-md-4">
            <Form.Group>
              <Form.Label>Filter by Course</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter course name"
                value={filterCourse}
                onChange={(e) => setFilterCourse(e.target.value)}
              />
            </Form.Group>
          </div>
          <div className="col-md-4">
            <Form.Group>
              <Form.Label>&nbsp;</Form.Label>
              <div>
                <Button 
                  variant="primary" 
                  onClick={handleSearch}
                  className="me-2"
                >
                  🔍 Search
                </Button>
                <Button 
                  variant="secondary" 
                  onClick={handleFilterByCourse}
                  className="me-2"
                >
                  🎓 Filter
                </Button>
                <Button 
                  variant="info" 
                  onClick={handleReset}
                >
                  ↺ Reset
                </Button>
              </div>
            </Form.Group>
          </div>
        </div>
      </div>

      {loading && (
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}

      {!loading && (
        <div className="table-responsive">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Course</th>
                <th>Enrollment #</th>
                <th>GPA</th>
                <th>Address</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.length > 0 ? (
                students.map(student => (
                  <tr key={student.id}>
                    <td>{student.id}</td>
                    <td>{student.name}</td>
                    <td>{student.email}</td>
                    <td>{student.phoneNumber}</td>
                    <td>{student.course}</td>
                    <td>{student.enrollmentNumber}</td>
                    <td>{student.gpa}</td>
                    <td>{student.address}</td>
                    <td>
                      <Link to={`/edit/${student.id}`}>
                        <Button variant="warning" size="sm" className="me-2">
                          ✎ Edit
                        </Button>
                      </Link>
                      <Button 
                        variant="danger" 
                        size="sm"
                        onClick={() => handleDelete(student.id)}
                      >
                        🗑 Delete
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="text-center">No students found</td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      )}
    </Container>
  );
}

export default StudentList;
