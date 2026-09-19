package com.example.studentproject.service;


import com.example.studentproject.dto.CreateStudentRequest;
import com.example.studentproject.dto.GetAllStudentResponse;
import com.example.studentproject.dto.GetByIdStudentReponse;
import com.example.studentproject.dto.UpdateStudentRequest;
import com.example.studentproject.exception.StudentNotFoundException;
import com.example.studentproject.repository.StudentRepository;
import com.example.studentproject.student.Student;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class StudentService {

    private final StudentRepository studentrepository;

    public StudentService (StudentRepository studentrepository){
        this.studentrepository = studentrepository;
    }

    public Student createStudent(CreateStudentRequest request){
        Student student = new Student();

        student.setStudentName(request.getStudentName());

        student.setCourse(request.getCourse());

        student.setAge(request.getAge());

        student.setStudentRecord(request.getStudentRecord());

        return  studentrepository.save(student);
    }

    public List<GetAllStudentResponse> findAllStudent(){

        List<Student> students = studentrepository.findAll();

        List<GetAllStudentResponse> responses = new ArrayList<>();

        for(Student student : students){

            GetAllStudentResponse response = new GetAllStudentResponse();

            response.setId(student.getId());

            response.setStudentName(student.getStudentName());

            response.setCourse(student.getCourse());

            response.setAge(student.getAge());

            responses.add(response);
        }

        return responses;

    }

    public GetByIdStudentReponse getStudentById(Integer id){
        Student student =  studentrepository.findById(id)
                .orElseThrow(()->
                        new StudentNotFoundException("STUDENT NOT FOUND"));

        GetByIdStudentReponse newStudent = new GetByIdStudentReponse();

        newStudent.setId(student.getId());
        newStudent.setStudentName(student.getStudentName());
        newStudent.setCourse(student.getCourse());
        newStudent.setAge(student.getAge());
        newStudent.setStudentRecord(student.getStudentRecord());

        return newStudent;

    }

    public Student updateStudent(Integer id, UpdateStudentRequest newStudent){
        Student existingStudent = studentrepository.findById(id)
                .orElseThrow(()->
        new StudentNotFoundException("ID NOT FOUND"));
        existingStudent.setStudentName(newStudent.getStudentName());
        existingStudent.setCourse(newStudent.getCourse());
        existingStudent.setAge(newStudent.getAge());
        existingStudent.setStudentRecord(newStudent.getStudentRecord());
        return studentrepository.save(existingStudent);
    }

    public void deleteStudent(Integer id){

        Student student = studentrepository.findById(id)
                .orElseThrow(()->
                        new StudentNotFoundException("STUDENT NOT FOUND ."));
        studentrepository.delete(student);
    }

    public void deleteAllStudent(){
        studentrepository.deleteAll();
    }


    public List<Student> findStudentByCourse(String course){
       return  studentrepository.findByCourse(course);
    }

    public List<Student> findStudentByStudentName(String name){
        return studentrepository.findByStudentName(name);
    }

    public List<Student> findStudentAgeGreaterThan(Integer age){
        return studentrepository.findByAgeGreaterThan(age);
    }

    public List<Student> findStudentCourseNotIn(List<String> course){
        return studentrepository.findByCourseNotIn(course);
    }

    public List<Student> findStudentByAgeLessThan(Integer age){
        return studentrepository.findByAgeLessThan(age);
    }

    public List<Student> findStudentByCourseIn(List<String> course){
        return studentrepository.findByCourseIn(course);
    }
}