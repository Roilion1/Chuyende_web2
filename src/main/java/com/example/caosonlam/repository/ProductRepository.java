
package com.example.caosonlam.repository;

import com.example.caosonlam.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {

    Product findByImage(String image);

    List<Product> findByCategoryId(Long categoryId);
}