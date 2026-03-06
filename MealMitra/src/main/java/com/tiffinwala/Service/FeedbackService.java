package com.tiffinwala.Service;

import com.tiffinwala.Dto.FeedbackRequestDTO;
import com.tiffinwala.Dto.FeedbackResponseDTO;
import com.tiffinwala.Entity.*;
import com.tiffinwala.Repository.*;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class FeedbackService {

    private final FeedbackRepository feedbackRepo;
    private final OrderRepository orderRepo;
    private final CustomerRepository customerRepo;
    private final HomemakerRepository homemakerRepo;
    private final UserRepository userRepo;

    public FeedbackService(
            FeedbackRepository feedbackRepo,
            OrderRepository orderRepo,
            CustomerRepository customerRepo,
            HomemakerRepository homemakerRepo,
            UserRepository userRepo) {

        this.feedbackRepo = feedbackRepo;
        this.orderRepo = orderRepo;
        this.customerRepo = customerRepo;
        this.homemakerRepo = homemakerRepo;
        this.userRepo = userRepo;
    }

    // ---------------- CUSTOMER GIVE FEEDBACK ----------------
    public Feedback giveFeedbackByEmail(String email, FeedbackRequestDTO dto) {

        Customer customer = customerRepo.findByUser_Email(email)
                .orElseThrow(() -> new RuntimeException("Customer not found"));

        Order order = orderRepo.findById(dto.getOrderId())
                .orElseThrow(() -> new RuntimeException("Order not found"));

        // Security Check
        if (!order.getCustomer().getId().equals(customer.getId())) {
            throw new RuntimeException("You can only review your own orders");
        }

        // Prevent duplicate feedback
        feedbackRepo.findByOrderId(order.getId())
                .ifPresent(f -> {
                    throw new RuntimeException("Feedback already submitted");
                });

        Feedback fb = new Feedback();
        fb.setOrder(order);
        fb.setCustomer(customer);
        fb.setHomemaker(order.getHomemaker());
        fb.setRating(dto.getRating());
        fb.setComment(dto.getComment());

        return feedbackRepo.save(fb);
    }

    // ---------------- HOMEMAKER GET FEEDBACK ----------------
    public List<FeedbackResponseDTO> getFeedbackForHomemaker(String email) {

        User user = userRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Homemaker homemaker = homemakerRepo.findByUserId(user.getId())
                .orElseThrow(() -> new RuntimeException("Homemaker not found"));

        List<Feedback> feedbackList =
                feedbackRepo.findByHomemakerId(homemaker.getId());

        return feedbackList.stream().map(fb -> {
            FeedbackResponseDTO dto = new FeedbackResponseDTO();

            dto.setFeedbackId(fb.getId());
            dto.setRating(fb.getRating());
            dto.setComment(fb.getComment());

            dto.setCustomerName(
                    fb.getCustomer().getName()
            );

            dto.setHomemakerName(
                    fb.getHomemaker().getKitchenName()
            );

            return dto;
        }).collect(Collectors.toList());
    }
}
