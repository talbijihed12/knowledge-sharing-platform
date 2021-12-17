package com.communication.plateforme.controller;

import com.communication.plateforme.services.IAuthService;
import com.communication.plateforme.services.impl.RefreshTokenService;
import com.communication.plateforme.utils.payload.request.LoginRequest;
import com.communication.plateforme.utils.payload.request.SignUpRequest;
import com.communication.plateforme.utils.payload.response.JwtResponse;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private IAuthService authService;
    @Autowired
    private  RefreshTokenService refreshTokenService;

    @PostMapping("/signup")
    public ResponseEntity<String> signup(@RequestBody SignUpRequest signUpRequest) {
        authService.registerUser(signUpRequest);
        return new ResponseEntity<>("User Registration Successful", HttpStatus.OK);
    }

    @GetMapping("accountVerification/{token}")
    public ResponseEntity<String> verifyAccount(@PathVariable String token) {
        authService.verifyAccount(token);
        return new ResponseEntity<>("Account Activated Successfully ", HttpStatus.OK);
    }

    @PostMapping("/login")
    public JwtResponse login(@RequestBody LoginRequest loginRequest) {
        return authService.authenticateUser(loginRequest);

    }



}



