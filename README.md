# Student Management System

A full-stack web application for managing student records with Spring Boot backend and React frontend.

## Features

- Create, Read, Update, Delete (CRUD) operations for students
- Search students by name
- Filter students by course
- Responsive UI with Bootstrap
- Real-time form validation
- Error handling

## Tech Stack

**Backend:**
- Spring Boot 3.1.5
- Spring Data JPA
- MySQL 8.0
- Maven

**Frontend:**
- React 18.2.0
- Axios (API calls)
- React Router (Navigation)
- Bootstrap 5

## Prerequisites

- JDK 11+
- Node.js 14+
- MySQL 8.0+
- Maven 3.6+

## Backend Setup

1. **Create Database:**
```sql
CREATE DATABASE student_management_db;
```

2. **Configure Database:**
Edit `backend/src/main/resources/application.properties`:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/student_management_db
spring.datasource.username=root
spring.datasource.password=your_password
```

3. **Build & Run:**
```bash
cd backend
mvn clean install
mvn spring-boot:run
```

Backend will run on: `http://localhost:8080/api`

## Frontend Setup

1. **Install Dependencies:**
```bash
cd frontend
npm install
```

2. **Start Development Server:**
```bash
npm start
```

Frontend will run on: `http://localhost:3000`

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/students` | Get all students |
| GET | `/api/students/{id}` | Get student by ID |
| POST | `/api/students` | Create new student |
| PUT | `/api/students/{id}` | Update student |
| DELETE | `/api/students/{id}` | Delete student |
| GET | `/api/students/search/{name}` | Search by name |
| GET | `/api/students/filter/course/{course}` | Filter by course |

## Student Model

```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "phoneNumber": "1234567890",
  "course": "Computer Science",
  "enrollmentNumber": "CS2024001",
  "gpa": 3.85,
  "address": "123 Main Street"
}
```

## Common Issues & Solutions

### Port Already in Use
```bash
# Windows
netstat -ano | findstr :8080
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:8080 | xargs kill -9
```

### CORS Errors
The backend has CORS enabled for all origins. Ensure `@CrossOrigin` is present in the controller.

### Database Connection Failed
- Check MySQL is running
- Verify credentials in `application.properties`
- Create the database first

### npm start fails
```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
npm start
```

## License

MIT License
