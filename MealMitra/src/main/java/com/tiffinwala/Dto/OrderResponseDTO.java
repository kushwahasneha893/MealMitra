package com.tiffinwala.Dto;

import java.util.List;

public class OrderResponseDTO {

    private Long orderId;
    private String status;
    private Double amount;
    private String homemakerName;
    private List<OrderItemResponseDTO> items;

    public OrderResponseDTO() {}

    public Long getOrderId() {
        return orderId;
    }

    public void setOrderId(Long orderId) {
        this.orderId = orderId;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public String getHomemakerName() {
        return homemakerName;
    }

    public void setHomemakerName(String homemakerName) {
        this.homemakerName = homemakerName;
    }

    public List<OrderItemResponseDTO> getItems() {
        return items;
    }

    public void setItems(List<OrderItemResponseDTO> items) {
        this.items = items;
    }
}
