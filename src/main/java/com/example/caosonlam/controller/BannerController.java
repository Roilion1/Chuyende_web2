package com.example.caosonlam.controller;

import com.example.caosonlam.entity.Banner;
import com.example.caosonlam.repository.BannerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/banners")
public class BannerController {

    @Autowired
    private BannerRepository bannerRepository;

    @GetMapping
    public List<Banner> getAllBanners() {
        return bannerRepository.findAll();
    }

    @PostMapping
    public Banner createBanner(@RequestBody Banner banner) {
        banner.setCreatedAt(new Date());
        banner.setUpdatedAt(new Date());
        return bannerRepository.save(banner);
    }

    @PutMapping("/{id}")
    public Banner updateBanner(@PathVariable Long id, @RequestBody Banner bannerDetails) {
        Banner banner = bannerRepository.findById(id).orElseThrow();
        banner.setImage(bannerDetails.getImage());
        banner.setLink(bannerDetails.getLink());
        banner.setStatus(bannerDetails.getStatus());
        banner.setUpdatedAt(new Date());
        return bannerRepository.save(banner);
    }

    @DeleteMapping("/{id}")
    public void deleteBanner(@PathVariable Long id) {
        bannerRepository.deleteById(id);
    }
}
