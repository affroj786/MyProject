package com.example.app.model;

public class Message {
    private String text;
    private String status;

    public Message() {}

    public Message(String text, String status) {
        this.text = text;
        this.status = status;
    }

    public String getText() { return text; }
    public void setText(String text) { this.text = text; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}
