package com.example.simulatordatabasetechnologies.rest;


import com.example.simulatordatabasetechnologies.Facade.UserAuthFacade;
import com.example.simulatordatabasetechnologies.dto.AuthenticationRequestDTO;
import com.example.simulatordatabasetechnologies.dto.RegisterRequestDTO;
import com.example.simulatordatabasetechnologies.model.Role;
import com.example.simulatordatabasetechnologies.model.UserEntity;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/api/v1/auth")
@Slf4j
@CrossOrigin(origins="http://localhost:3000")
public class AuthenticationRestControllerV1 {
    private final AuthenticationManager authenticationManager;

    private final UserAuthFacade userAuthFacade;

    public AuthenticationRestControllerV1(AuthenticationManager authenticationManager, UserAuthFacade userAuthFacade) {
        this.authenticationManager = authenticationManager;
        this.userAuthFacade = userAuthFacade;
    }

    @Transactional
    @PostMapping(value = "/register", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> register(@RequestBody RegisterRequestDTO request) {
        try {
            userAuthFacade.register(request);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (RuntimeException e) {
            log.debug(e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.FORBIDDEN);
        }
    }
    @Transactional
    @PostMapping("/login")
    public ResponseEntity<?> authenticate(@RequestBody AuthenticationRequestDTO request) {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
            UserEntity user = userAuthFacade.getUserByEmail(request.getEmail());
            return userAuthFacade.getToken(request, user);
        } catch (AuthenticationException e) {
            log.debug(e.getMessage());
            return new ResponseEntity<>("Invalid email/password combination", HttpStatus.FORBIDDEN);
        }
    }

    @PostMapping("/logout")
    public void logout(HttpServletRequest request, HttpServletResponse response) {
        SecurityContextLogoutHandler securityContextLogoutHandler = new SecurityContextLogoutHandler();
        securityContextLogoutHandler.logout(request, response, null);
    }

    @Transactional
    @PostMapping("/login/admin")
    public ResponseEntity<?> authenticateAdmin(@RequestBody AuthenticationRequestDTO request) {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
            UserEntity user = userAuthFacade.getUserByEmail(request.getEmail());
            if(user.getRole().equals(Role.USER)){
                return new ResponseEntity<>("Do not find admin with this email", HttpStatus.FORBIDDEN);
            }
            return userAuthFacade.getToken(request, user);
        } catch (AuthenticationException e) {
            log.debug(e.getMessage());
            return new ResponseEntity<>("Invalid email/password combination", HttpStatus.FORBIDDEN);
        }
    }
}