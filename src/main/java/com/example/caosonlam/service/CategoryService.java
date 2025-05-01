package com.example.caosonlam.service;

import com.example.caosonlam.entity.Category;

import java.util.List;

public interface CategoryService {

    Category createCategory(Category category);

    Category updateCategory(Long id, Category categoryDetails);

    void deleteCategory(Long id);

    List<Category> getAllCategories();

    Category getCategoryById(Long id);
}
