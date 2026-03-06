package com.tiffinwala.Controller;

import com.tiffinwala.Entity.DeliveryBoy;
import com.tiffinwala.Entity.Order;
import com.tiffinwala.Repository.DeliveryBoyRepository;
import com.tiffinwala.Service.OrderService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/delivery")
public class DeliveryController {

    private final DeliveryBoyRepository deliveryBoyRepo;
    private final OrderService orderService;

    public DeliveryController(DeliveryBoyRepository deliveryBoyRepo,
                              OrderService orderService) {
        this.deliveryBoyRepo = deliveryBoyRepo;
        this.orderService = orderService;
    }

    // GET DELIVERY ORDERS
    @GetMapping("/orders")
    public ResponseEntity<List<Order>> myOrders(Authentication auth) {

        String email = auth.getName();

        DeliveryBoy boy = deliveryBoyRepo.findByUser_Email(email)
                .orElseThrow(() -> new RuntimeException("Delivery boy not found"));

        return ResponseEntity.ok(
                orderService.getDeliveryOrders(boy.getId())
        );
    }

    // 🔥 DELIVERY ACCEPT (FIXED)
    @PutMapping("/accept/{orderId}")
    public ResponseEntity<String> accept(@PathVariable Long orderId,
                                         Authentication auth) {

        String email = auth.getName();

        DeliveryBoy boy = deliveryBoyRepo.findByUser_Email(email)
                .orElseThrow(() -> new RuntimeException("Delivery boy not found"));

        // 🔥 CORRECT METHOD
        orderService.deliveryAccept(orderId, boy.getId());

        return ResponseEntity.ok("Order picked for delivery");
    }

    // REJECT
    @PutMapping("/reject/{orderId}")
    public ResponseEntity<String> reject(@PathVariable Long orderId,
                                         Authentication auth) {

        String email = auth.getName();

        DeliveryBoy boy = deliveryBoyRepo.findByUser_Email(email)
                .orElseThrow(() -> new RuntimeException("Delivery boy not found"));

        orderService.rejectOrder(orderId, boy.getId());

        return ResponseEntity.ok("Order rejected");
    }

    // DELIVERED
    @PutMapping("/deliver/{orderId}")
    public ResponseEntity<String> deliver(@PathVariable Long orderId,
                                          Authentication auth) {

        String email = auth.getName();

        DeliveryBoy boy = deliveryBoyRepo.findByUser_Email(email)
                .orElseThrow(() -> new RuntimeException("Delivery boy not found"));

        orderService.markDelivered(orderId, boy.getId());

        return ResponseEntity.ok("Delivered successfully");
    }
}
