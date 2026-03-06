package com.tiffinwala.Service;

import com.tiffinwala.Entity.*;
import com.tiffinwala.Repository.*;
import com.tiffinwala.Dto.DeliveryAssignDTO;
import org.springframework.stereotype.Service;

@Service
public class DeliveryService {

    private final DeliveryRepository deliveryRepo;
    private final OrderRepository orderRepo;
    private final DeliveryBoyRepository deliveryBoyRepo;

    public DeliveryService(DeliveryRepository deliveryRepo,
                           OrderRepository orderRepo,
                           DeliveryBoyRepository deliveryBoyRepo) {
        this.deliveryRepo = deliveryRepo;
        this.orderRepo = orderRepo;
        this.deliveryBoyRepo = deliveryBoyRepo;
    }

    // 🔥 ADMIN ASSIGN DELIVERY BOY
    public Delivery assignDelivery(DeliveryAssignDTO dto) {

        Order order = orderRepo.findById(dto.getOrderId())
                .orElseThrow(() -> new RuntimeException("Order not found"));

        DeliveryBoy boy = deliveryBoyRepo.findById(dto.getDeliveryBoyId())
                .orElseThrow(() -> new RuntimeException("Delivery boy not found"));

        Delivery delivery = new Delivery();
        delivery.setOrder(order);
        delivery.setCustomer(order.getCustomer());
        delivery.setHomemaker(order.getHomemaker());
        delivery.setDeliveryBoy(boy);
        delivery.setPickupLocation(order.getHomemaker().getLocation());
        delivery.setDropLocation(order.getCustomer().getAddress());
        delivery.setOtp("123456");

        // 🚨 MAIN FIX HERE
        order.setDeliveryBoy(boy);
        order.setStatus("ASSIGNED");   // 🔥 VERY IMPORTANT
        orderRepo.save(order);

        return deliveryRepo.save(delivery);
    }
}
