package com.tiffinwala.Dto;


public class FeedbackResponseDTO {

    private Long feedbackId;
    private int rating;
    private String comment;
    private String customerName;
    private String homemakerName;

    public FeedbackResponseDTO() {}

    public Long getFeedbackId() {
        return feedbackId;
    }

    public void setFeedbackId(Long feedbackId) {
        this.feedbackId = feedbackId;
    }

    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public String getHomemakerName() {
        return homemakerName;
    }

    public void setHomemakerName(String homemakerName) {
        this.homemakerName = homemakerName;
    }
}
