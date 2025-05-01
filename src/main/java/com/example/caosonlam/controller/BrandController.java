package com.example.caosonlam.controller;

import com.example.caosonlam.entity.Brand;
import com.example.caosonlam.service.BrandService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/brands")
public class BrandController {

    @Autowired
    private BrandService brandService;

    @PostMapping
    public ResponseEntity<Brand> createBrand(@RequestBody Brand brand) {
        Brand createdBrand = brandService.createBrand(brand);
        return ResponseEntity.ok(createdBrand);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Brand> updateBrand(@PathVariable Long id, @RequestBody Brand brand) {
        Brand updatedBrand = brandService.updateBrand(id, brand);
        return ResponseEntity.ok(updatedBrand);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBrand(@PathVariable Long id) {
        brandService.deleteBrand(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public ResponseEntity<List<Brand>> getAllBrands() {
        List<Brand> brands = brandService.getAllBrands();
        return ResponseEntity.ok(brands);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Brand> getBrandById(@PathVariable Long id) {
        Brand brand = brandService.getBrandById(id);
        return ResponseEntity.ok(brand);
    }
}
