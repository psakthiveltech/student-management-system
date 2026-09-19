package com.example.studentproject.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class CreateStudentRequest {

    @NotBlank
    @Size(min=3,max=20,message = "NOT-ALLOWED minimum value should be greater than {min} and less than {max}")
    private String studentName;

    @NotBlank(message="the course must be filled")
    private String course;

    @Min(value = 18,message = "age should be greater than 18 ")
    private Integer age;

    @NotBlank(message = "the studentRecord must be filled")
    private String studentRecord;

    public CreateStudentRequest(){

    }

    public String getStudentName(){
        return studentName;
    }
    public void setStudentName(String studentName){
        this.studentName=studentName;
    }

    public String getCourse(){
        return course;
    }
    public void setCourse(String course){
        this.course=course;
    }



    public String getStudentRecord(){
        return studentRecord;
    }



    public void setStudentRecord(String record){
        this.studentRecord=record;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

}