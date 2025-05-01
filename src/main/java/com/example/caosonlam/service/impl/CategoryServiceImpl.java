package com.example.caosonlam.service.impl;

import com.example.caosonlam.entity.Category;
import com.example.caosonlam.repository.CategoryRepository;
import com.example.caosonlam.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public Category createCategory(Category category) {
        return categoryRepository.save(category);
    }

    @Override
    public Category updateCategory(Long id, Category categoryDetails) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found with id " + id));
        category.setName(categoryDetails.getName());
        category.setSlug(categoryDetails.getSlug());
        category.setParentId(categoryDetails.getParentId());
        category.setSortOrder(categoryDetails.getSortOrder());
        category.setImage(categoryDetails.getImage());
        category.setDescription(categoryDetails.getDescription());
        category.setUpdatedBy(categoryDetails.getUpdatedBy());
        category.setUpdatedAt(categoryDetails.getUpdatedAt());
        category.setStatus(categoryDetails.getStatus());
        return categoryRepository.save(category);
    }

    @Override
    public void deleteCategory(Long id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found with id " + id));
        categoryRepository.delete(category);
    }

    @Override
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    @Override
    public Category getCategoryById(Long id) {
        return categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found with id " + id));
    }
}
