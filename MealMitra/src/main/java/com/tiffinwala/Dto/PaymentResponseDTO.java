package com.tiffinwala.Dto;

public class PaymentResponseDTO {

    private String status;
    private String transactionId;
    private double amount;

    private double homemakerAmount;
    private double deliveryAmount;
    private double adminAmount;

    public PaymentResponseDTO() {
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getTransactionId() {
        return transactionId;
    }

    public void setTransactionId(String transactionId) {
        this.transactionId = transactionId;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public double getHomemakerAmount() {
        return homemakerAmount;
    }

    public void setHomemakerAmount(double homemakerAmount) {
        this.homemakerAmount = homemakerAmount;
    }

    public double getDeliveryAmount() {
        return deliveryAmount;
    }

    public void setDeliveryAmount(double deliveryAmount) {
        this.deliveryAmount = deliveryAmount;
    }

    public double getAdminAmount() {
        return adminAmount;
    }

    public void setAdminAmount(double adminAmount) {
        this.adminAmount = adminAmount;
    }
}
