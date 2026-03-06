package com.tiffinwala.Controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.tiffinwala.Dto.HomemakerProfileDTO;
import com.tiffinwala.Entity.Homemaker;
import com.tiffinwala.Entity.Menu;
import com.tiffinwala.Entity.Order;
import com.tiffinwala.Entity.User;
import com.tiffinwala.Repository.HomemakerRepository;
import com.tiffinwala.Repository.OrderRepository;
import com.tiffinwala.Repository.UserRepository;
import com.tiffinwala.Service.MenuService;
import com.tiffinwala.Service.OrderService;

@RestController
@RequestMapping("/api/homemaker")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class HomemakerController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private HomemakerRepository homemakerRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderService orderService;

    @Autowired
    private MenuService menuService;

    // =====================================================
    // 🔹 FETCH LOGGED-IN HOMEMAKER PROFILE
    // =====================================================
    @GetMapping("/profile")
    public ResponseEntity<HomemakerProfileDTO> getMyProfile(Authentication authentication) {

        Homemaker homemaker = getHomemaker(authentication);
        User user = homemaker.getUser();

        HomemakerProfileDTO dto = new HomemakerProfileDTO(
                homemaker.getId(),
                user.getEmail(),                 // ✅ display name (email)
                homemaker.getKitchenName(),
                homemaker.getLocation(),
                homemaker.getPhone(),
                homemaker.getWalletBalance()
        );

        return ResponseEntity.ok(dto);
    }

    // =====================================================
    // 🔹 VIEW ORDERS ASSIGNED TO HOMEMAKER
    // =====================================================
    @GetMapping("/orders")
    public ResponseEntity<List<Order>> getMyOrders(Authentication authentication) {

        Homemaker homemaker = getHomemaker(authentication);
        List<Order> orders = orderRepository.findByHomemakerId(homemaker.getId());

        return ResponseEntity.ok(orders);
    }

    // =====================================================
    // 🔹 ACCEPT ORDER
    // =====================================================
    @PutMapping("/order/{orderId}/accept")
    public ResponseEntity<String> acceptOrder(
            @PathVariable Long orderId,
            Authentication authentication) {

        Homemaker homemaker = getHomemaker(authentication);
        orderService.acceptOrder(orderId, homemaker.getId());

        return ResponseEntity.ok("Order accepted successfully");
    }

    // =====================================================
    // 🔹 REJECT ORDER
    // =====================================================
    @PutMapping("/order/{orderId}/reject")
    public ResponseEntity<String> rejectOrder(
            @PathVariable Long orderId,
            Authentication authentication) {

        Homemaker homemaker = getHomemaker(authentication);
        orderService.rejectOrder(orderId, homemaker.getId());

        return ResponseEntity.ok("Order rejected successfully");
    }

    // =====================================================
    // 🔹 PUBLIC MENU BY ID
    // =====================================================
    @GetMapping("/public/menu/{id}")
    public ResponseEntity<Menu> getPublicMenuById(@PathVariable Long id) {
        return ResponseEntity.ok(menuService.getMenuById(id));
    }

    // =====================================================
    // 🔹 HELPER METHOD (JWT → User → Homemaker)
    // =====================================================
    private Homemaker getHomemaker(Authentication authentication) {

        // 1️⃣ Email from JWT
        String email = authentication.getName();

        // 2️⃣ Find User
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // 3️⃣ Find Homemaker by userId
        return homemakerRepository.findByUserId(user.getId())
                .orElseThrow(() -> new RuntimeException("Homemaker not found"));
    }
}
