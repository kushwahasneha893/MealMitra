package com.tiffinwala.Controller;

import com.tiffinwala.Dto.LoginRequestDTO;
import com.tiffinwala.Dto.LoginResponseDTO;
import com.tiffinwala.Dto.RegisterRequestDTO;
import com.tiffinwala.Service.AuthService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    // LOGIN
    @PostMapping("/login")
    public LoginResponseDTO login(@RequestBody LoginRequestDTO request) {
        return authService.login(request);
    }

    //  REGISTER (USER / HOMEMAKER)
    @PostMapping("/register")
    public String register(@RequestBody RegisterRequestDTO request) {
        authService.register(request);
        return "Registration successful";
    }
}
