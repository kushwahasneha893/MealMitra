package com.tiffinwala.Service;

import com.tiffinwala.Entity.*;
import com.tiffinwala.Repository.*;
import com.tiffinwala.Dto.PaymentRequestDTO;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class PaymentService {

    private final PaymentRepository paymentRepo;
    private final OrderRepository orderRepo;
    private final AdminRepository adminRepo;
    private final UserRepository userRepo;

    public PaymentService(PaymentRepository paymentRepo,
                          OrderRepository orderRepo,
                          AdminRepository adminRepo,
                          UserRepository userRepo) {
        this.paymentRepo = paymentRepo;
        this.orderRepo = orderRepo;
        this.adminRepo = adminRepo;
        this.userRepo = userRepo;
    }

    public Payment pay(Long userId, PaymentRequestDTO dto) {

        User user = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Order order = orderRepo.findById(dto.getOrderId())
                .orElseThrow(() -> new RuntimeException("Order not found"));

        Admin admin = adminRepo.findAll().get(0); // single admin system

        Payment payment = new Payment();
        payment.setUser(user);
        payment.setAdmin(admin);
        payment.setOrder(order);
        payment.setAmount(order.getAmount());
        PaymentMethod pm = PaymentMethod.valueOf(dto.getMethod());
        payment.setTransactionId(UUID.randomUUID().toString());
        payment.setPaymentStatus(PaymentStatus.SUCCESS);

        paymentRepo.save(payment);

        // Update order
        order.setStatus("PAID");
        orderRepo.save(order);

        // Credit admin wallet
        admin.setWalletBalance(admin.getWalletBalance() + order.getAmount());
        adminRepo.save(admin);

        return payment;
    }
}
