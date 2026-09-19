package com.example.studentproject.repository;

import com.example.studentproject.student.Student;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StudentRepository extends JpaRepository<Student,Integer> {



    List<Student> findByCourse(String course);

    List<Student> findByStudentName(String StudentName);

    List<Student> findByAgeGreaterThan(Integer age);

    List<Student> findByCourseNotIn(List<String> course);

    List<Student> findByAgeLessThan(Integer age);

    List<Student> findByCourseIn(List<String> course);
}
