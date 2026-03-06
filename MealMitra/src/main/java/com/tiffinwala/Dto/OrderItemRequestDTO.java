package com.tiffinwala.Dto;

public class OrderItemRequestDTO {

    private Long menuId;
    private Integer quantity;

    public OrderItemRequestDTO() {}

    public Long getMenuId() {
        return menuId;
    }

    public void setMenuId(Long menuId) {
        this.menuId = menuId;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }
}