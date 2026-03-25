package com.klu.repository;

import com.klu.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product,Long>{

    // Derived Query Methods

    List<Product> findByCategory(String category);

    List<Product> findByPriceBetween(double min,double max);

    // JPQL Queries

    @Query("SELECT p FROM Product p ORDER BY p.price ASC")
    List<Product> getProductsSortedByPrice();

    @Query("SELECT p FROM Product p WHERE p.price > ?1")
    List<Product> getProductsAbovePrice(double price);

    @Query("SELECT p FROM Product p WHERE p.category=?1")
    List<Product> getProductsByCategoryJPQL(String category);
}