package com.example.caosonlam.controller;

import com.example.caosonlam.entity.Menu;
import com.example.caosonlam.repository.MenuRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class MenuController {

    @Autowired
    private MenuRepository menuRepository;

    @GetMapping("/api/menus")
    public List<Menu> getMenus() {
        return menuRepository.findAll();
    }
}