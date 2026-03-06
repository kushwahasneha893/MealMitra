package com.tiffinwala.Controller;

import com.tiffinwala.Dto.PaymentRequestDTO;
import com.tiffinwala.Dto.PaymentResponseDTO;
import com.tiffinwala.Entity.Order;
import com.tiffinwala.Repository.OrderRepository;
import com.tiffinwala.Service.OrderService;

import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("/api/payment")
public class PaymentController {

    private final RestTemplate restTemplate;
    private final OrderRepository orderRepo;
    private final OrderService orderService;

    public PaymentController(RestTemplate restTemplate,
                             OrderRepository orderRepo,
                             OrderService orderService){
        this.restTemplate = restTemplate;
        this.orderRepo = orderRepo;
        this.orderService = orderService;
    }

    @PostMapping("/pay")
    public ResponseEntity<?> payNow(@RequestBody PaymentRequestDTO dto){

        Order order = orderRepo.findById(dto.getOrderId())
                .orElseThrow(() -> new RuntimeException("Order not found"));

        String dotnetUrl = "http://localhost:5290/api/payment/pay";

        // 🔥 VERY IMPORTANT: SEND amount ALSO
        String body = "{ \"orderId\": " + order.getId() +
                ", \"method\": \"" + dto.getMethod() + "\"" +
                ", \"amount\": " + order.getAmount() + "}";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<String> request = new HttpEntity<>(body, headers);

        ResponseEntity<PaymentResponseDTO> response =
                restTemplate.postForEntity(dotnetUrl, request, PaymentResponseDTO.class);

        PaymentResponseDTO paymentResponse = response.getBody();

        if(paymentResponse == null ||
                !"SUCCESS".equalsIgnoreCase(paymentResponse.getStatus())){
            return ResponseEntity.badRequest().body("Payment Failed");
        }

        // ✅ SUCCESS
        order.setStatus("PAID");
        orderRepo.save(order);

        // distribute money
//        orderService.distributeMoney(order);

        return ResponseEntity.ok("Payment Success");
    }
}
