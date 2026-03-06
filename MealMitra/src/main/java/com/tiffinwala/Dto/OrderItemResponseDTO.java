package com.tiffinwala.Dto;

public class OrderItemResponseDTO {

    private String foodName;
    private Integer quantity;
    private Double price;

    public OrderItemResponseDTO() {}

    public OrderItemResponseDTO(String foodName, Integer quantity, Double price) {
        this.foodName = foodName;
        this.quantity = quantity;
        this.price = price;
    }

    public String getFoodName() {
        return foodName;
    }

    public void setFoodName(String foodName) {
        this.foodName = foodName;
    }

    public Integer getQuantity() {
        return quantity;
    }
    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }
}