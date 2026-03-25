package com.klu.model;

import org.springframework.stereotype.Component;

@Component
public class Certification {
	private int certId;
	private String certName;
	private String dateOfCompletion;
	
	public Certification() {
		this.certId=101;
		this.certName="Full Stack Developer";
		this.dateOfCompletion="22-01-2026";
	}
	
	public int getId() {
		return certId;
	}
	
	public String getName() {
		return certName;
	}
	
	public String getDate() {
		return dateOfCompletion;
	}
}