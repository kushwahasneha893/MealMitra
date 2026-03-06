package com.tiffinwala.Repository;

import com.tiffinwala.Entity.DeliveryBoy;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface DeliveryBoyRepository extends JpaRepository<DeliveryBoy, Long> {

    Optional<DeliveryBoy> findByUser_Email(String email);

    Optional<DeliveryBoy> findFirstByAvailableTrue();
}
