package com.example.caosonlam.service;

import com.example.caosonlam.entity.Brand;

import java.util.List;

public interface BrandService {

    Brand createBrand(Brand brand);

    Brand updateBrand(Long id, Brand brandDetails);

    void deleteBrand(Long id);

    List<Brand> getAllBrands();

    Brand getBrandById(Long id);
}
