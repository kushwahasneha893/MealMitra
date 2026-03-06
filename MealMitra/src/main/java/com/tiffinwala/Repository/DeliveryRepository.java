package com.tiffinwala.Repository;

import com.tiffinwala.Entity.Delivery;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface DeliveryRepository extends JpaRepository<Delivery, Long> {

    Optional<Delivery> findByOrderId(Long orderId);

    List<Delivery> findByCustomerId(Long customerId);

    List<Delivery> findByDeliveryBoyId(Long deliveryBoyId);
}
