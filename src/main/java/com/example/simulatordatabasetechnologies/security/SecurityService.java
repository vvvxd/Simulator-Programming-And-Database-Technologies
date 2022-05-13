package com.example.simulatordatabasetechnologies.security;

import com.example.simulatordatabasetechnologies.model.UserEntity;
import com.example.simulatordatabasetechnologies.repository.UserRepository;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Component
public class SecurityService {

    private final UserRepository userRepository;

    public SecurityService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public UserEntity getCurrentUser() {
        SecurityContext securityContext = SecurityContextHolder.getContext();
        Authentication authentication = securityContext.getAuthentication();
        if (authentication instanceof UsernamePasswordAuthenticationToken) {
            userRepository.findByEmail(authentication.getName());
        }
        return null;
    }
}
