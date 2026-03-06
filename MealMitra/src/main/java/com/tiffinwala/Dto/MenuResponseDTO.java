package com.tiffinwala.Dto;

import java.time.LocalDateTime;

public class MenuResponseDTO {

    private Long id;
    private String foodName;
    private String category;
    private Double price;
    private Integer quantity;
    private LocalDateTime createdAt;
    private Long homemakerId;

    public MenuResponseDTO() {}

    public MenuResponseDTO(Long id,
                           String foodName,
                           String category,
                           Double price,
                           Integer quantity,
                           LocalDateTime createdAt,
                           Long homemakerId) {
        this.id = id;
        this.foodName = foodName;
        this.category = category;
        this.price = price;
        this.quantity = quantity;
        this.createdAt = createdAt;
        this.homemakerId = homemakerId;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFoodName() {
        return foodName;
    }

    public void setFoodName(String foodName) {
        this.foodName = foodName;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public Long getHomemakerId() {
        return homemakerId;
    }

    public void setHomemakerId(Long homemakerId) {
        this.homemakerId = homemakerId;
    }
}
