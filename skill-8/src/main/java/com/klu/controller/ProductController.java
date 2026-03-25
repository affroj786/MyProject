package com.klu.controller;

import com.klu.entity.Product;
import com.klu.repository.ProductRepository;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/products")
public class ProductController {

    private final ProductRepository repository;

    public ProductController(ProductRepository repository){
        this.repository=repository;
    }

    @GetMapping("/category/{category}")
    public List<Product> getByCategory(@PathVariable String category){
        return repository.findByCategory(category);
    }

    @GetMapping("/filter")
    public List<Product> filterProducts(@RequestParam double min,@RequestParam double max){
        return repository.findByPriceBetween(min,max);
    }

    @GetMapping("/sorted")
    public List<Product> getSortedProducts(){
        return repository.getProductsSortedByPrice();
    }

    @GetMapping("/expensive/{price}")
    public List<Product> getExpensiveProducts(@PathVariable double price){
        return repository.getProductsAbovePrice(price);
    }
}