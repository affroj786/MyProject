package com.klu.controller;
	import com.klu.exception.InvalidInputException;
	import com.klu.exception.StudentNotFoundException;
	import com.klu.model.Student;
	import org.springframework.web.bind.annotation.*;

	import java.util.*;

	@RestController
	public class StudentController {

	    private static Map<Integer,Student> students=new HashMap<>();

	    static{
	        students.put(1,new Student(1,"Rahul","CSE"));
	        students.put(2,new Student(2,"Anita","ECE"));
	        students.put(3,new Student(3,"Kiran","IT"));
	    }

	    @GetMapping("/student/{id}")
	    public Student getStudent(@PathVariable int id){

	        if(id<=0){
	            throw new InvalidInputException("Student ID must be positive");
	        }

	        Student student=students.get(id);

	        if(student==null){
	            throw new StudentNotFoundException("Student with ID "+id+" not found");
	        }

	        return student;
	    }
	}