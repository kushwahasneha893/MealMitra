package com.tiffinwala.Service;

import com.tiffinwala.Dto.LoginRequestDTO;
import com.tiffinwala.Dto.LoginResponseDTO;
import com.tiffinwala.Dto.RegisterRequestDTO;
import com.tiffinwala.Entity.*;
import com.tiffinwala.Repository.CustomerRepository;
import com.tiffinwala.Repository.DeliveryBoyRepository;
import com.tiffinwala.Repository.HomemakerRepository;
import com.tiffinwala.Repository.UserRepository;
import com.tiffinwala.Security.JwtUtil;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
@Service
public class AuthService {

    private final UserRepository userRepository;
    private final HomemakerRepository homemakerRepository;
    private final CustomerRepository customerRepository;
    private final DeliveryBoyRepository deliveryBoyRepository;
    private final JwtUtil jwtUtil;
    private final PasswordEncoder passwordEncoder;

    public AuthService(UserRepository userRepository,
                       HomemakerRepository homemakerRepository,
                       CustomerRepository customerRepository, DeliveryBoyRepository deliveryBoyRepository,
                       JwtUtil jwtUtil,
                       PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.homemakerRepository = homemakerRepository;
        this.customerRepository = customerRepository;
        this.deliveryBoyRepository = deliveryBoyRepository;
        this.jwtUtil = jwtUtil;
        this.passwordEncoder = passwordEncoder;
    }

    // 🔐 LOGIN
    public LoginResponseDTO login(LoginRequestDTO req) {

        User user = userRepository.findByEmail(req.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(req.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }

        Long userId = user.getId();
        String email = user.getEmail();
        String role = user.getRole().name();

        String token = jwtUtil.generateToken(email, userId, role);

        return new LoginResponseDTO(token, role, userId);
    }
    public void register(RegisterRequestDTO req) {

        // 1. Save User first
        User user = new User();
        user.setEmail(req.getEmail());
        user.setPassword(passwordEncoder.encode(req.getPassword()));
        user.setRole(req.getRole());
        user = userRepository.save(user);

        // 2. Role-based profile creation
        if (req.getRole() == Role.HOMEMAKER) {

            Homemaker h = new Homemaker();
            h.setUser(user);
            h.setKitchenName(req.getKitchenName());   // MUST NOT be null
            h.setLocation(req.getLocation());
            h.setPhone(req.getPhone());

            homemakerRepository.save(h);

        }  else if (req.getRole() == Role.DELIVERY) {   // ###############
 
            DeliveryBoy d = new DeliveryBoy();
            d.setUser(user);
            d.setName(req.getName());          // 🔥 REQUIRED FIELD
            d.setPhone(req.getPhone());
            d.setLicenceNo(req.getLicenceNo());
            deliveryBoyRepository.save(d);
        } else if (req.getRole() == Role.CUSTOMER) {

            Customer c = new Customer();
            c.setUser(user);
            c.setName(req.getName());
            c.setPhone(req.getPhone());
            c.setAddress(req.getAddress());
            c.setCity(req.getCity());
            c.setPincode(req.getPincode());

            customerRepository.save(c);
        }
    }

}
