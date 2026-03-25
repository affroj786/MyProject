package com.example.app.controller;

import com.example.app.model.Message;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.ArrayList;

@RestController
@RequestMapping("/api")
public class AppController {

    @GetMapping("/health")
    public ResponseEntity<Message> health() {
        return ResponseEntity.ok(new Message("Backend is running", "UP"));
    }

    @GetMapping("/messages")
    public ResponseEntity<List<Message>> getMessages() {
        List<Message> messages = new ArrayList<>();
        messages.add(new Message("Welcome to the Full Stack App", "info"));
        messages.add(new Message("Spring Boot Backend is Active", "success"));
        messages.add(new Message("React Frontend Connected", "success"));
        return ResponseEntity.ok(messages);
    }

    @PostMapping("/messages")
    public ResponseEntity<Message> createMessage(@RequestBody Message message) {
        message.setStatus("created");
        return ResponseEntity.status(201).body(message);
    }
}
