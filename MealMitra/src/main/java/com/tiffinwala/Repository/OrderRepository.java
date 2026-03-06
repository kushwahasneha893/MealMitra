package com.tiffinwala.Repository;

import com.tiffinwala.Entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {

    List<Order> findByCustomerId(Long customerId);

    List<Order> findByHomemakerId(Long homemakerId);

    // DELIVERY PAGE USES THIS
    List<Order> findByDeliveryBoyId(Long deliveryBoyId);
}
