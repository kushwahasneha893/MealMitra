package com.tiffinwala.Dto;

public class HomemakerProfileDTO {

    private Long id;
    private String email;
    private String kitchenName;
    private String location;
    private String phone;
    private Double walletBalance;

    public HomemakerProfileDTO(
            Long id,
            String email,
            String kitchenName,
            String location,
            String phone,
            Double walletBalance
    ) {
        this.id = id;
        this.email = email;
        this.kitchenName = kitchenName;
        this.location = location;
        this.phone = phone;
        this.walletBalance = walletBalance;
    }

    // getters & setters
}
