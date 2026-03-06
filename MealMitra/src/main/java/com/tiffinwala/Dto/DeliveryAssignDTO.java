package com.tiffinwala.Dto;


public class DeliveryAssignDTO {

    private Long orderId;
    private Long deliveryBoyId;

    public DeliveryAssignDTO() {}

    public Long getOrderId() {
        return orderId;
    }

    public void setOrderId(Long orderId) {
        this.orderId = orderId;
    }

    public Long getDeliveryBoyId() {
        return deliveryBoyId;
    }

    public void setDeliveryBoyId(Long deliveryBoyId) {
        this.deliveryBoyId = deliveryBoyId;
    }
}