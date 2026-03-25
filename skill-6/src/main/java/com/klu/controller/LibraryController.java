package com.klu.controller;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.klu.model.Book;

@RestController
@RequestMapping("/library")
public class LibraryController {

    private List<Book> bookList=new ArrayList<>();

    // 1. Welcome message
    @GetMapping("/welcome")
    public String welcome() {
        return "Welcome to Online Library System";
    }

    // 2. Total book count
    @GetMapping("/count")
    public int getCount() {
        return bookList.size();
    }

    // 3. Sample book price
    @GetMapping("/price")
    public double getPrice() {
        return 499.99;
    }

    // 4. List of book titles
    @GetMapping("/books")
    public List<String> getBooks() {
        return Arrays.asList("Java Programming","Spring Boot Guide","Data Structures");
    }

    // 5. Get book by id (PathVariable)
    @GetMapping("/books/{id}")
    public String getBookById(@PathVariable int id) {
        return "Book details for ID: "+id;
    }

    // 6. Search book by title (RequestParam)
    @GetMapping("/search")
    public String searchBook(@RequestParam String title) {
        return "Searching for book with title: "+title;
    }

    // 7. Author path variable
    @GetMapping("/author/{name}")
    public String getAuthor(@PathVariable String name) {
        return "Books written by Author: "+name;
    }

    // 8. Add book (POST + JSON)
    @PostMapping("/addbook")
    public String addBook(@RequestBody Book book) {
        bookList.add(book);
        return "Book added successfully";
    }

    // 9. View all added books
    @GetMapping("/viewbooks")
    public List<Book> viewBooks() {
        return bookList;
    }
}