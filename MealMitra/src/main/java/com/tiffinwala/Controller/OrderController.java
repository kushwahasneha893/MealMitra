package com.tiffinwala.Controller;

import com.tiffinwala.Dto.CreateOrderDTO;
import com.tiffinwala.Entity.Order;
import com.tiffinwala.Service.OrderService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/customer")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping("/orders")
    public ResponseEntity<Order> createOrder(
            @RequestBody CreateOrderDTO dto,
            Authentication auth) {
    	
    	 System.out.println("USER = " + auth.getName());
    	    System.out.println("ROLES = " + auth.getAuthorities());


        return ResponseEntity.ok(
                orderService.createOrderByEmail(auth.getName(), dto)
        );
    }

    @GetMapping("/orders")
    public ResponseEntity<List<Order>> getOrders(Authentication auth) {
        return ResponseEntity.ok(
                orderService.getCustomerOrdersByEmail(auth.getName())
        );
    }
    
    
}
