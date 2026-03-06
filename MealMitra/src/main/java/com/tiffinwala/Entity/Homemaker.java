package com.tiffinwala.Entity;

import jakarta.persistence.*;

@Entity
@Table(name = "homemakers")
public class Homemaker {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    @Column(nullable = false)
    private String kitchenName;

    @Column(nullable = false)
    private String location;

    @Column(nullable = false, length = 15)
    private String phone;

    // 🔥 WALLET BALANCE
    @Column(nullable = false)
    private Double walletBalance = 0.0;

    public Homemaker() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public String getKitchenName() { return kitchenName; }
    public void setKitchenName(String kitchenName) { this.kitchenName = kitchenName; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    // 🔥 WALLET GETTER SETTER
    public Double getWalletBalance() { return walletBalance; }
    public void setWalletBalance(Double walletBalance) { this.walletBalance = walletBalance; }
}
