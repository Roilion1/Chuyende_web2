package com.example.caosonlam.service.impl;

import com.example.caosonlam.entity.Product;
import com.example.caosonlam.repository.ProductRepository;
import com.example.caosonlam.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Override
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    @Override
    public Product getProductById(Long id) {
        Optional<Product> product = productRepository.findById(id);
        return product.orElse(null);
    }

    @Override
    public Product createProduct(Product product) {
        return productRepository.save(product);
    }

    @Override
    public Product updateProduct(Long id, Product productDetails) {
        Optional<Product> optionalProduct = productRepository.findById(id);
        if (optionalProduct.isPresent()) {
            Product product = optionalProduct.get();
            product.setCategoryId(productDetails.getCategoryId());
            product.setBrandId(productDetails.getBrandId());
            product.setName(productDetails.getName());
            product.setSlug(productDetails.getSlug());
            product.setContent(productDetails.getContent());
            product.setPrice(productDetails.getPrice());
            product.setDescription(productDetails.getDescription());
            product.setUpdatedBy(productDetails.getUpdatedBy());
            product.setUpdatedAt(productDetails.getUpdatedAt());
            product.setStatus(productDetails.getStatus());
            return productRepository.save(product);
        }
        return null;
    }

    @Override
    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }

    @Override
    public List<Product> getProductsByCategoryId(Long categoryId) {
        return productRepository.findByCategoryId(categoryId);
    }
}
