package com.klu.main;

import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import com.klu.config.AppConfig;
import com.klu.model.Student;

public class MainApp {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		ApplicationContext con=new AnnotationConfigApplicationContext(AppConfig.class);
		Student stu=con.getBean(Student.class);
		stu.display();
		ApplicationContext con1=new ClassPathXmlApplicationContext("bean.xml");
		Student stu1=con1.getBean(Student.class);
		stu1.display();
	}

}