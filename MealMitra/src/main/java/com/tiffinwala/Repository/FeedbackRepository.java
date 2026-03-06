package com.tiffinwala.Repository;

import com.tiffinwala.Entity.Feedback;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface FeedbackRepository extends JpaRepository<Feedback, Long> {

    Optional<Feedback> findByOrderId(Long orderId);

    List<Feedback> findByHomemakerId(Long homemakerId);

    List<Feedback> findByCustomerId(Long customerId);
}
