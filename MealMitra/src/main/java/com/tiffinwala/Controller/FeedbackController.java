package com.tiffinwala.Controller;

import com.tiffinwala.Dto.FeedbackRequestDTO;
import com.tiffinwala.Dto.FeedbackResponseDTO;
import com.tiffinwala.Entity.Feedback;
import com.tiffinwala.Service.FeedbackService;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class FeedbackController {

    private final FeedbackService feedbackService;

    public FeedbackController(FeedbackService feedbackService) {
        this.feedbackService = feedbackService;
    }

    // ---------------- CUSTOMER GIVE FEEDBACK ----------------
    @PostMapping("/customer/feedback")
    public ResponseEntity<Feedback> giveFeedback(
            @RequestBody FeedbackRequestDTO dto,
            Authentication auth) {

        String email = auth.getName();
        return ResponseEntity.ok(
                feedbackService.giveFeedbackByEmail(email, dto)
        );
    }

    // ---------------- HOMEMAKER VIEW FEEDBACK ----------------
    @GetMapping("/homemaker/feedback")
    public ResponseEntity<List<FeedbackResponseDTO>> getFeedback(
            Authentication auth) {

        String email = auth.getName();
        return ResponseEntity.ok(
                feedbackService.getFeedbackForHomemaker(email)
        );
    }
}
