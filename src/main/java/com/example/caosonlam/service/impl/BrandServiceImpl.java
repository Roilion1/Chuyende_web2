package com.example.caosonlam.service.impl;

import com.example.caosonlam.entity.Brand;
import com.example.caosonlam.repository.BrandRepository;
import com.example.caosonlam.service.BrandService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BrandServiceImpl implements BrandService {

    @Autowired
    private BrandRepository brandRepository;

    @Override
    public Brand createBrand(Brand brand) {
        return brandRepository.save(brand);
    }

    @Override
    public Brand updateBrand(Long id, Brand brandDetails) {
        Brand brand = brandRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Brand not found with id " + id));
        brand.setName(brandDetails.getName());
        brand.setSlug(brandDetails.getSlug());
        brand.setImage(brandDetails.getImage());
        brand.setDescription(brandDetails.getDescription());
        brand.setSortOrder(brandDetails.getSortOrder());
        brand.setUpdatedBy(brandDetails.getUpdatedBy());
        brand.setUpdatedAt(brandDetails.getUpdatedAt());
        brand.setStatus(brandDetails.getStatus());
        return brandRepository.save(brand);
    }

    @Override
    public void deleteBrand(Long id) {
        Brand brand = brandRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Brand not found with id " + id));
        brandRepository.delete(brand);
    }

    @Override
    public List<Brand> getAllBrands() {
        return brandRepository.findAll();
    }

    @Override
    public Brand getBrandById(Long id) {
        return brandRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Brand not found with id " + id));
    }
}
