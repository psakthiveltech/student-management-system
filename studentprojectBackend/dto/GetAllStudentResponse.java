package com.example.studentproject.dto;

public class GetAllStudentResponse {

    private Integer id;
    private String studentName;
    private String course;
    private Integer age;

   public GetAllStudentResponse(){

   }
   public Integer getId(){
       return id;
   }
   public void setId(Integer id){
       this.id=id;
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

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }
}
