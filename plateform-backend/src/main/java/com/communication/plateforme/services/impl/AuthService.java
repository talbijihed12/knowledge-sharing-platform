package com.communication.plateforme.services.impl;

import com.communication.plateforme.model.NotificationEmail;
import com.communication.plateforme.model.Role;
import com.communication.plateforme.model.User;
import com.communication.plateforme.model.VerificationToken;
import com.communication.plateforme.model.enums.RoleEnum;
import com.communication.plateforme.repositry.RoleRepository;
import com.communication.plateforme.repositry.UserRepository;
import com.communication.plateforme.repositry.VerificationRepository;
import com.communication.plateforme.security.jwt.JwtUtils;
import com.communication.plateforme.security.services.UserDetailsImpl;
import com.communication.plateforme.services.IAuthService;
import com.communication.plateforme.utils.exceptions.BadRequestException;
import com.communication.plateforme.utils.exceptions.SpringPlateformeException;
import com.communication.plateforme.utils.payload.request.LoginRequest;
import com.communication.plateforme.utils.payload.request.SignUpRequest;
import com.communication.plateforme.utils.payload.response.JwtResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@Slf4j
public class AuthService implements IAuthService {
    @Autowired
    AuthenticationManager authenticationManager;
    @Autowired
    UserRepository userRepository;
    @Autowired
    PasswordEncoder encoder;
    @Autowired
    RoleRepository roleRepository;
    @Autowired
    JwtUtils jwtUtils;
    @Autowired
    RefreshTokenService refreshTokenService;
    @Autowired
    VerificationRepository verificationRepositry;
    @Autowired
    MailService mailService;


    @Override
    public JwtResponse authenticateUser(LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        List roles = userDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());
        return new JwtResponse(jwt,
                userDetails.getId(),
                userDetails.getUsername(),
                userDetails.getEmail(),
                roles);
    }

    @Override
    public void registerUser(SignUpRequest signUpRequest) {
        if (userRepository.existsByUsername(signUpRequest.getUsername())) {
            throw new BadRequestException("Error: Username is already taken!");
        }

        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            throw new BadRequestException("Error: Email is already in use!");
        }

        // Create new user's account
        User user = User.builder().username(signUpRequest.getUsername()).email(signUpRequest.getEmail()).password(encoder.encode(signUpRequest.getPassword())).build();
        Set roles = new HashSet<>();
        Optional<Role> userRole = roleRepository.findByName(RoleEnum.ROLE_USER);
        if (!userRole.isPresent()) throw new RuntimeException("Error: Role is not found.");
        roles.add(userRole.get());


        user.setRoles(roles);

        userRepository.save(user);
        mailService.sendMail(new NotificationEmail("Please Activate your Account",
                user.getEmail(), "Thank you for signing up to Spring Reddit, " +
                "please click on the below url to activate your account : " +
                "http://localhost:8080/api/auth/accountVerification/"));

    }

    @Override
    public User getCurrentUser() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException("User name not found -" + username));

    }

    @Override
    public void fetchUserAndEnable(VerificationToken verificationToken) {
        String userName = verificationToken.getUser().getUsername();
        User user = userRepository.findByUsername(userName).orElseThrow(() -> new SpringPlateformeException("user not found with name -" + userName));
        user.setEnabled(true);
        userRepository.save(user);
    }

    @Override
    public boolean isLoggedIn() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return !(authentication instanceof AnonymousAuthenticationToken) && authentication.isAuthenticated();

    }

    @Override
    public void verifyAccount(String token) {
        Optional<VerificationToken> verificationToken = verificationRepositry.findByToken(token);
        verificationToken.orElseThrow(() -> new SpringPlateformeException("invalid Token"));
        fetchUserAndEnable(verificationToken.get());
    }



}
