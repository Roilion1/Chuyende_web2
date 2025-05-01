package com.example.caosonlam.controller;

import com.example.caosonlam.entity.Product;
import com.example.caosonlam.repository.ProductRepository;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.io.File;

@RestController
@RequestMapping("/api/images")
public class ImageController {

    private final ProductRepository productRepository;

    public ImageController(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @GetMapping("/{filename:.+}")
    public ResponseEntity<Resource> getImage(@PathVariable String filename) {
        // Kiểm tra trong DB có sản phẩm nào dùng ảnh này không
        Product product = productRepository.findByImage(filename);
        if (product == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        // Tìm ảnh trong thư mục "images/"
        File file = new File("images/" + filename);
        if (!file.exists()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        Resource resource = new FileSystemResource(file);

        MediaType mediaType = MediaType.IMAGE_JPEG;
        if (filename.toLowerCase().endsWith(".png"))
            mediaType = MediaType.IMAGE_PNG;
        else if (filename.toLowerCase().endsWith(".gif"))
            mediaType = MediaType.IMAGE_GIF;

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(mediaType);

        return new ResponseEntity<>(resource, headers, HttpStatus.OK);
    }
}
