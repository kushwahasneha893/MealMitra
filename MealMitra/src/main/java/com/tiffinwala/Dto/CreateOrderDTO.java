package com.tiffinwala.Dto;

import com.tiffinwala.Entity.PaymentMethod;
import java.util.List;

public class CreateOrderDTO {

    private Long homemakerId;
    private List<OrderItemRequestDTO> items;

    // 🔥 ADD THIS FIELD
    private PaymentMethod paymentMethod;

    public CreateOrderDTO() {}

    public Long getHomemakerId() {
        return homemakerId;
    }

    public void setHomemakerId(Long homemakerId) {
        this.homemakerId = homemakerId;
    }

    public List<OrderItemRequestDTO> getItems() {
        return items;
    }

    public void setItems(List<OrderItemRequestDTO> items) {
        this.items = items;
    }

    // 🔥 PAYMENT GETTER SETTER
    public PaymentMethod getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(PaymentMethod paymentMethod) {
        this.paymentMethod = paymentMethod;
    }
}
