package com.satyainfotech.academy.controller;

import org.springframework.web.bind.annotation.*;
import java.util.Collections;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @org.springframework.beans.factory.annotation.Value("${ADMIN_USERNAME:admin}")
    private String adminUsername;

    @org.springframework.beans.factory.annotation.Value("${ADMIN_PASSWORD:admin123}")
    private String adminPassword;

    @PostMapping("/login")
    public Map<String, Object> login(@RequestBody Map<String, String> credentials) {
        String username = credentials.get("username");
        String password = credentials.get("password");

        if (adminUsername.equals(username) && adminPassword.equals(password)) {
            return Collections.singletonMap("token", "dummy-admin-token");
        } else {
            throw new RuntimeException("Invalid credentials");
        }
    }
}
