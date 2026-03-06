package com.tiffinwala.Controller;

import com.tiffinwala.Entity.Customer;
import com.tiffinwala.Repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/customer")
@CrossOrigin
public class CustomerController {

    @Autowired

    private CustomerRepository customerRepository;

    @GetMapping("/profile")
    public Customer getCustomerProfile(Authentication authentication) {
        String email = authentication.getName();
        return customerRepository.findByUser_Email(email)
                .orElseThrow(() -> new RuntimeException("Customer not found"));
    }
}
