package com.project.todobackend.controller;

import com.project.todobackend.DTOs.AuthRequest;
import com.project.todobackend.DTOs.ForgotPasswordRequest;
import com.project.todobackend.DTOs.LoginResponse;
import com.project.todobackend.DTOs.ResetPasswordRequest;
import com.project.todobackend.config.JwtUtil;
import com.project.todobackend.entity.User;
import com.project.todobackend.exceptions.ApiRequestException;
import com.project.todobackend.repository.UserRepository;
import com.project.todobackend.service.EmailService;
import com.project.todobackend.service.MyUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
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

    @Value("${SPRING_PROFILE}")
    private String springProfile;

    private AuthenticationManager authenticationManager;
    private final EmailService emailService;
    private final JwtUtil jwtUtil;
    private final UserDetailsService userDetailsService;
    private final MyUserDetailsService myUserDetailsService;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthController(
            UserRepository userRepository,
            EmailService emailService,
            PasswordEncoder passwordEncoder,
            UserDetailsService userDetailsService,
            MyUserDetailsService myUserDetailsService,
            JwtUtil jwtUtil,
            AuthenticationManager authenticationManager) {
        this.userRepository = userRepository;
        this.emailService = emailService;
        this.passwordEncoder = passwordEncoder;
        this.userDetailsService = userDetailsService;
        this.myUserDetailsService = myUserDetailsService;
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

        String token = jwtUtil.generateToken(savedUser.getEmail());
        savedUser.setVerificationToken(token);
        savedUser.setCreatedAt(LocalDateTime.now());
        savedUser.setTokenExpiry(LocalDateTime.now().plusHours(24));
        userRepository.save(savedUser);
        String verifyUrl;

        if (springProfile.equals("prod")) {
            verifyUrl = "http://domain.example/auth/verify?token=" + token;
        }  else if (springProfile.equals("dev")) {
            verifyUrl = "http://192.168.178.36:3001/auth/verify?token=" + token;
        } else {
            verifyUrl = "http://localhost:5173/auth/verify?token=" + token;
        }


        emailService.sendEmail(savedUser.getEmail(),
                "Verify your account",
                "Click the link to verify: " + verifyUrl);

        return ResponseEntity.ok(token);
    }

    @PostMapping("/login")
    public LoginResponse login(@RequestBody AuthRequest request) throws Exception {
        var userDetails = myUserDetailsService.loadUserByUsername(request.getEmail());

        if(!passwordEncoder.matches(request.getPassword(), userDetails.getPassword())) {
            throw new Exception("Incorrect username or password");
        }
        var token = jwtUtil.generateToken(userDetails);

        User user = userRepository.findByEmail(request.getEmail()).orElseThrow(() -> new Exception("User not found"));
        return new LoginResponse(token, user.getUsername());
    }

    @GetMapping("/verify")
    public ResponseEntity<String> verifyAccount(@RequestParam String token) {
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

    @PostMapping("/forgot-password")
    public ResponseEntity<String> forgotPassword(@RequestBody ForgotPasswordRequest request) throws ApiRequestException {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(()-> new ApiRequestException("Email not found. Please try again."));

        String token = jwtUtil.generateToken(user.getEmail());
        user.setResetToken(token);
        user.setResetTokenExpiry(LocalDateTime.now().plusMinutes(10)); // valid for 10 minutes
        userRepository.save(user);

        String resetLink;
        if (springProfile.equals("prod")) {
            resetLink = "http://domain.example/forgort-password?token=" + token;
        }  else if (springProfile.equals("dev")) {
            resetLink = "http://192.168.178.36:3001/forgot-password?token=" + token;
        } else {
            resetLink = "http://localhost:5173/forgot-password?token=" + token;
        }
        emailService.sendEmail(user.getEmail(),
                "Password reset",
                "Click this link to reset password: " + resetLink);

        return ResponseEntity.ok("Password reset link sent to your email.");
    }

    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(@RequestBody ResetPasswordRequest request) throws ApiRequestException {
        Optional<User> optionalUser = userRepository.findByResetToken(request.getToken());

        if (optionalUser.isEmpty()) {
            System.out.println("No user found with this token!");
            throw new ApiRequestException("No token found. Please try again.");
        }
        User user = optionalUser.get();

        if (user.getResetTokenExpiry() == null || user.getResetTokenExpiry().isBefore(LocalDateTime.now())) {
            throw new ApiRequestException("Reset token has expired");
        }

        if (request.getNewPassword().isEmpty()){
            throw new ApiRequestException("Password cannot be empty");
        }

        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        user.setResetToken(null);
        user.setResetTokenExpiry(null);
        userRepository.save(user);

        return ResponseEntity.ok("Password reset successfully.");

    }

}
