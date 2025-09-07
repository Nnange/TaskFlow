package com.project.todobackend.controller;

import com.project.todobackend.DTOs.AuthRequest;
import com.project.todobackend.config.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserDetailsService userDetailsService;

    @PostMapping("/login")
    public String login(@RequestBody AuthRequest request) throws Exception {
        authenticationManager.authenticate(
               new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
        );
        final UserDetails userDetails = userDetailsService.loadUserByUsername(request.getUsername());
        return jwtUtil.generateToken(userDetails);
    }
}
