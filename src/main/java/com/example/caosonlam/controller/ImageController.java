package com.example.caosonlam.controller;

import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.io.File;

@RestController
@RequestMapping("/api/images")
public class ImageController {

    // Xóa phần ProductRepository vì không cần thiết nữa
    // private final ProductRepository productRepository;

    // Constructor không cần nữa vì không cần truy vấn DB
    // public ImageController(ProductRepository productRepository) {
    // this.productRepository = productRepository;
    // }

    @GetMapping("/{filename:.+}")
    public ResponseEntity<Resource> getImage(@PathVariable String filename) {
        // Tìm ảnh trong thư mục "images/"
        File file = new File("images/" + filename); // Hoặc đường dẫn tuyệt đối nếu cần
        if (!file.exists()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build(); // Nếu file không tồn tại
        }

        Resource resource = new FileSystemResource(file);

        // Xác định loại media (ảnh) dựa trên phần mở rộng của file
        MediaType mediaType = MediaType.APPLICATION_OCTET_STREAM; // Mặc định nếu không phải hình ảnh
        if (filename.toLowerCase().endsWith(".png")) {
            mediaType = MediaType.IMAGE_PNG;
        } else if (filename.toLowerCase().endsWith(".jpg") || filename.toLowerCase().endsWith(".jpeg")) {
            mediaType = MediaType.IMAGE_JPEG;
        } else if (filename.toLowerCase().endsWith(".gif")) {
            mediaType = MediaType.IMAGE_GIF;
        }

        // Thêm thông tin headers để xác định loại content
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(mediaType);

        return new ResponseEntity<>(resource, headers, HttpStatus.OK);
    }
}
