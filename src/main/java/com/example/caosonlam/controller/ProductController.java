package com.example.caosonlam.controller;

import com.example.caosonlam.entity.Product;
import com.example.caosonlam.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.InputStream;
import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    @Autowired
    private ProductService productService;

    // Đọc upload.path từ application.properties
    @Value("${upload.path}")
    private String uploadPath;

    // Tạo sản phẩm
    @PostMapping
    public ResponseEntity<Product> createProduct(@RequestBody Product product) {
        Product createdProduct = productService.createProduct(product);
        return ResponseEntity.ok(createdProduct);
    }

    // Cập nhật sản phẩm
    @PutMapping("/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable Long id, @RequestBody Product product) {
        Product updatedProduct = productService.updateProduct(id, product);
        return ResponseEntity.ok(updatedProduct);
    }

    // Xóa sản phẩm
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
        return ResponseEntity.noContent().build();
    }

    // Lấy danh sách tất cả sản phẩm
    @GetMapping
    public ResponseEntity<List<Product>> getAllProducts() {
        List<Product> products = productService.getAllProducts();
        return ResponseEntity.ok(products);
    }

    // Lấy hình ảnh từ thư mục images
    @GetMapping("/images/{fileName}")
    public ResponseEntity<InputStreamResource> getImage(@PathVariable String fileName) throws FileNotFoundException {
        String filePath = uploadPath + "/" + fileName;
        String fileExtension = fileName.substring(fileName.lastIndexOf(".")).toLowerCase();
        MediaType mediaType = MediaType.IMAGE_PNG;

        if (fileExtension.equals(".jpg") || fileExtension.equals(".jpeg")) {
            mediaType = MediaType.IMAGE_JPEG;
        } else if (fileExtension.equals(".png")) {
            mediaType = MediaType.IMAGE_PNG;
        } else if (fileExtension.equals(".gif")) {
            mediaType = MediaType.IMAGE_GIF;
        }

        InputStream imageStream = new FileInputStream(filePath);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(mediaType);
        headers.setContentDispositionFormData("inline", fileName);

        return new ResponseEntity<>(new InputStreamResource(imageStream), headers, HttpStatus.OK);
    }

    // // Lấy sản phẩm theo categoryId
    // @GetMapping("/categories/{categoryId}/products")
    // public ResponseEntity<List<Product>> getProductsByCategory(@PathVariable Long
    // categoryId) {
    // try {
    // List<Product> products = productService.getProductsByCategoryId(categoryId);
    // if (products.isEmpty()) {
    // return ResponseEntity.noContent().build(); // Trả về 204 nếu không có sản
    // phẩm
    // }
    // return ResponseEntity.ok(products); // Trả về 200 nếu có sản phẩm
    // } catch (Exception e) {
    // // Log exception và trả về mã lỗi 500 nếu có lỗi server
    // e.printStackTrace();
    // return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
    // }
    // }
}
