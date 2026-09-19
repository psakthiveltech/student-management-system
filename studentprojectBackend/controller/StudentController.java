package com.example.studentproject.controller;


import com.example.studentproject.dto.CreateStudentRequest;
import com.example.studentproject.dto.GetAllStudentResponse;
import com.example.studentproject.dto.GetByIdStudentReponse;
import com.example.studentproject.dto.UpdateStudentRequest;
import com.example.studentproject.service.StudentService;
import com.example.studentproject.student.Student;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins =  "*")
public class StudentController {

    private final StudentService studentservice;

    public StudentController(StudentService studentservice){
        this.studentservice=studentservice;
    }

    @GetMapping("/student")
    public List<GetAllStudentResponse> getAllStudent(){

        return studentservice.findAllStudent();
    }

    @GetMapping("/student/{id}")
    public GetByIdStudentReponse getStudentById(@PathVariable Integer id){

        return studentservice.getStudentById(id);
    }

    @PostMapping("/student")
    public Student createStudent(@Valid @RequestBody CreateStudentRequest request){
        return  studentservice.createStudent(request);

    }



    @PutMapping("/student/{id}")
    public Student updateStudent( @PathVariable Integer id,
                                  @Valid @RequestBody UpdateStudentRequest newStudent){
        return studentservice.updateStudent(id,newStudent);
    }

    @DeleteMapping("/student/{id}")
    public String deleteStudent(@PathVariable Integer id){
        studentservice.deleteStudent(id);
        return "DELETED SUCCESSFULLY .";
    }

    @DeleteMapping("/student")
    public String deleteAllStudent(){
        studentservice.deleteAllStudent();
        return "All Record Deleted Successfully";
    }

    @GetMapping("/student/course/{course}")
    public List<Student> getStudentByCourse(@PathVariable String course){
        return studentservice.findStudentByCourse(course);
    }

    @GetMapping("/student/studentName/{studentName}")

    public List<Student> getStudentByStudentName(@PathVariable String studentName){
        return studentservice.findStudentByStudentName(studentName);
    }

    @GetMapping("/student/ageGreater/{age}")

    public List<Student> getStudentByAgeGreaterThan(@PathVariable Integer age){
        return studentservice.findStudentAgeGreaterThan(age);
    }

    @GetMapping("/student/courseNotIn")
    public List<Student> getStudentCourseNotIn(@RequestParam("courseNotIn") List<String> course ){
        return studentservice.findStudentCourseNotIn(course);
    }

    @GetMapping("/student/ageLesser/{age}")
    public List<Student> getStudentByAgeLessThan(@PathVariable Integer age){
        return studentservice.findStudentByAgeLessThan(age);
    }

    @GetMapping("/student/courseIn")
    public List<Student> getStudentByCourseIn(@RequestParam("courseIn") List<String> course){
        return studentservice.findStudentByCourseIn(course);
    }

}