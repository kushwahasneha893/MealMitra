package com.tiffinwala.Controller;



import com.tiffinwala.Entity.Delivery;
import com.tiffinwala.Dto.DeliveryAssignDTO;
import com.tiffinwala.Service.DeliveryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
public class Admincontroller {

    private final DeliveryService deliveryService;

    public Admincontroller(DeliveryService deliveryService) {
        this.deliveryService = deliveryService;
    }

    @PostMapping("/assign-delivery")
    public ResponseEntity<Delivery> assign(@RequestBody DeliveryAssignDTO dto) {
        return ResponseEntity.ok(deliveryService.assignDelivery(dto));
    }
}

