package com.klu.config;

import com.klu.entity.Product;
import com.klu.repository.ProductRepository;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.boot.CommandLineRunner;

@Configuration
public class DataLoader {

    @Bean
    CommandLineRunner loadData(ProductRepository repo){
        return args -> {

            repo.save(new Product("Laptop","Electronics",60000));
            repo.save(new Product("Mobile","Electronics",25000));
            repo.save(new Product("Shoes","Fashion",3000));
            repo.save(new Product("Watch","Fashion",5000));
            repo.save(new Product("Headphones","Electronics",2000));

        };
    }
}