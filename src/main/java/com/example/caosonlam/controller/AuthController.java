package com.example.caosonlam.controller;

import com.example.caosonlam.entity.User;
import com.example.caosonlam.repository.UserRepository;
import com.example.caosonlam.security.JWTUtil;
import com.example.caosonlam.security.JwtResponse;
import com.example.caosonlam.service.impl.CustomUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Date;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JWTUtil jwtUtil;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private CustomUserDetailsService customUserDetailsService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        if (userRepository.existsByEmail(user.getEmail())) {
            return ResponseEntity.badRequest().body("Error: Email is already in use!");
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setStatus(1);
        user.setCreatedBy(1);
        user.setUpdatedBy(1);
        user.setCreatedAt(new Date());
        user.setUpdatedAt(new Date());

        userRepository.save(user);

        return ResponseEntity.ok("Đăng ký thành công, vui lòng đăng nhập để nhận token.");
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User loginRequest) {
        // Tìm người dùng theo email
        User user = userRepository.findByEmail(loginRequest.getEmail()).orElse(null);

        if (user == null) {
            return ResponseEntity
                    .status(401)
                    .body("Đăng nhập thất bại: Email không tồn tại.");
        }

        if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            return ResponseEntity
                    .status(401)
                    .body("Đăng nhập thất bại: Mật khẩu không đúng.");
        }

        UserDetails userDetails = customUserDetailsService.loadUserByUsername(user.getEmail());
        String token = jwtUtil.generateToken(userDetails);

        return ResponseEntity.ok(new JwtResponse("Đăng nhập thành công", token));
    }
}
