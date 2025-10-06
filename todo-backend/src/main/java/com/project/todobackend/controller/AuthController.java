package com.project.todobackend.controller;

import com.project.todobackend.DTOs.AuthRequest;
import com.project.todobackend.config.JwtUtil;
import com.project.todobackend.entity.User;
import com.project.todobackend.repository.UserRepository;
import com.project.todobackend.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private AuthenticationManager authenticationManager;
    private final EmailService emailService;
    private final JwtUtil jwtUtil;
    private final UserDetailsService userDetailsService;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthController(
            UserRepository userRepository,
            EmailService emailService,
            PasswordEncoder passwordEncoder,
            UserDetailsService userDetailsService,
            JwtUtil jwtUtil,
            AuthenticationManager authenticationManager) {
        this.userRepository = userRepository;
        this.emailService = emailService;
        this.passwordEncoder = passwordEncoder;
        this.userDetailsService = userDetailsService;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/signup")
    public ResponseEntity<String> signup(@RequestBody User user) {
        if (userRepository.findByEmail(user.getEmail()).isPresent()){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email already in use");
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setEnabled(false);

        User savedUser = userRepository.save(user);

        UserDetails userDetails = userDetailsService.loadUserByUsername(savedUser.getUsername());
        String token = jwtUtil.generateToken(userDetails);
        savedUser.setVerificationToken(token);
        savedUser.setTokenExpiry(LocalDateTime.now().plusHours(24));
        userRepository.save(savedUser);

        String verifyUrl = "http://localhost:5173/auth/verify?token=" + token;
        emailService.sendEmail(savedUser.getEmail(),
                "Verify your account",
                "Click the link to verify: " + verifyUrl);

        return ResponseEntity.ok(token);
    }

    @PostMapping("/login")
    public String login(@RequestBody AuthRequest request) throws Exception {
        var userDetails = userDetailsService.loadUserByUsername(request.getUsername());
        if(!passwordEncoder.matches(request.getPassword(), userDetails.getPassword())) {
            throw new Exception("Incorrect username or password");
        }
        // generate JWT
        return jwtUtil.generateToken(userDetails);
    }

    @GetMapping("/verify")
    public ResponseEntity<String> verifyAccount(@RequestParam String token) {
        System.out.println("Received token: " + token);

        Optional<User> optionalUser = userRepository.findByVerificationToken(token);

        if (optionalUser.isEmpty()) {
            System.out.println("No user found with this token!");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid verification token");
        }

        User user = optionalUser.get();

        if (user.getTokenExpiry() == null || user.getTokenExpiry().isBefore(LocalDateTime.now())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Verification token has expired");
        }

        user.setEnabled(true);
        user.setVerificationToken(null);
        user.setTokenExpiry(null);
        userRepository.save(user);

        return ResponseEntity.ok("Account verified successfully! You can now log in.");
    }

}
