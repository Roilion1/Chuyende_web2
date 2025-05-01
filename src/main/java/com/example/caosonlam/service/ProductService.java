package com.example.caosonlam.service;

import com.example.caosonlam.entity.Product;

import java.util.List;

public interface ProductService {

    Product createProduct(Product product);

    Product updateProduct(Long id, Product productDetails);

    void deleteProduct(Long id);

    List<Product> getAllProducts();

    Product getProductById(Long id);

    List<Product> getProductsByCategoryId(Long categoryId);
}
