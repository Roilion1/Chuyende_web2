package com.example.caosonlam.service.impl;

import com.example.caosonlam.entity.User;
import com.example.caosonlam.repository.UserRepository;
import com.example.caosonlam.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    @Override
    public User createUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public User updateUser(Long id, User userDetails) {
        Optional<User> optionalUser = userRepository.findById(id);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            user.setName(userDetails.getName());
            user.setPassword(userDetails.getPassword());
            user.setFullname(userDetails.getFullname());
            user.setGender(userDetails.getGender());
            user.setThumbnail(userDetails.getThumbnail());
            user.setEmail(userDetails.getEmail());
            user.setPhone(userDetails.getPhone());
            user.setAddress(userDetails.getAddress());
            user.setRoles(userDetails.getRoles());
            user.setUpdatedBy(userDetails.getUpdatedBy());
            user.setUpdatedAt(userDetails.getUpdatedAt());
            user.setStatus(userDetails.getStatus());
            return userRepository.save(user);
        }
        return null;
    }

    @Override
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }
}
