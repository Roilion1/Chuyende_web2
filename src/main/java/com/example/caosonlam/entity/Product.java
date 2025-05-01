package com.example.caosonlam.entity;

import jakarta.persistence.*; // Đảm bảo bạn đã import đúng các thư viện
import java.util.Date;

@Entity
@Table(name = "product")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String slug;
    private String content;
    private String image;
    private double price;
    private String description;
    private int created_by;
    private int updated_by;
    private Date created_at;
    private Date updated_at;
    private int status;

    @Column(name = "category_id") // Ánh xạ với cột category_id trong cơ sở dữ liệu
    private Long categoryId;

    @Column(name = "brand_id") // Ánh xạ với cột brand_id trong cơ sở dữ liệu
    private Long brandId;

    // Getter và Setter cho id
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    // Getter và Setter cho name
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    // Getter và Setter cho slug
    public String getSlug() {
        return slug;
    }

    public void setSlug(String slug) {
        this.slug = slug;
    }

    // Getter và Setter cho content
    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    // Getter và Setter cho price
    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    // Getter và Setter cho description
    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    // Getter và Setter cho created_by
    public int getCreatedBy() {
        return created_by;
    }

    public void setCreatedBy(int created_by) {
        this.created_by = created_by;
    }

    // Getter và Setter cho updated_by
    public int getUpdatedBy() {
        return updated_by;
    }

    public void setUpdatedBy(int updated_by) {
        this.updated_by = updated_by;
    }

    // Getter và Setter cho created_at
    public Date getCreatedAt() {
        return created_at;
    }

    public void setCreatedAt(Date created_at) {
        this.created_at = created_at;
    }

    // Getter và Setter cho updated_at
    public Date getUpdatedAt() {
        return updated_at;
    }

    public void setUpdatedAt(Date updated_at) {
        this.updated_at = updated_at;
    }

    // Getter và Setter cho status
    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    // Getter và Setter cho categoryId
    public Long getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Long categoryId) {
        this.categoryId = categoryId;
    }

    // Getter và Setter cho brandId
    public Long getBrandId() {
        return brandId;
    }

    public void setBrandId(Long brandId) {
        this.brandId = brandId;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }
}