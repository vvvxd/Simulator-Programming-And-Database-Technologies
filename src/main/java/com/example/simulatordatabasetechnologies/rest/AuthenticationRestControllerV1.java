package com.example.simulatordatabasetechnologies.rest;


import com.example.simulatordatabasetechnologies.dto.AuthenticationRequestDTO;
import com.example.simulatordatabasetechnologies.dto.RegisterRequestDTO;
import com.example.simulatordatabasetechnologies.model.*;
import com.example.simulatordatabasetechnologies.repository.TasksRepository;
import com.example.simulatordatabasetechnologies.repository.TasksUsersRepository;
import com.example.simulatordatabasetechnologies.repository.UserRepository;
import com.example.simulatordatabasetechnologies.security.JwtTokenProvider;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/auth")
@Slf4j
@CrossOrigin(origins="http://localhost:3000")
public class AuthenticationRestControllerV1 {
    @PersistenceContext
    private EntityManager em;

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final PasswordEncoder passwordEncoder;
    private final TasksRepository tasksRepository;
    private final TasksUsersRepository tasksUsersRepository;

    public AuthenticationRestControllerV1(AuthenticationManager authenticationManager, UserRepository userRepository, JwtTokenProvider jwtTokenProvider, PasswordEncoder passwordEncoder, TasksRepository tasksRepository, TasksUsersRepository tasksUsersRepository) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.jwtTokenProvider = jwtTokenProvider;
        this.passwordEncoder = passwordEncoder;
        this.tasksRepository = tasksRepository;
        this.tasksUsersRepository = tasksUsersRepository;
    }

    @Transactional
    @PostMapping(value = "/register", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> register(@RequestBody RegisterRequestDTO request) {
        try {
            Boolean present =  userRepository.findByEmail(request.getEmail()).isPresent();
            if (present.equals(true))
                throw  new RuntimeException("With this email, the user already exists");

            UserEntity user = new UserEntity();
            user.setFirstName(request.getFirstName());
            user.setLastName(request.getLastName());
            user.setUserGroupId(request.getUserGroupId());
            user.setEmail(request.getEmail());
            user.setPassword(passwordEncoder.encode(request.getPassword()));
            user.setRole(Role.USER);
            user.setStatus(Status.ACTIVE);
            user.setFirstEntry(LocalDateTime.now());
            userRepository.saveAndFlush(user);

            List<Long> listTasksId =  tasksRepository.findAll().stream().map(TasksEntity::getId).toList();
            listTasksId.forEach(v->{
                TasksUsersEntity entity = new TasksUsersEntity();
                entity.setTasksId(v);
                entity.setUsersId(user.getId());
                tasksUsersRepository.saveAndFlush(entity);
            });

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
            UserEntity user = userRepository.findByEmail(request.getEmail()).orElseThrow(() -> new UsernameNotFoundException("User doesn't exists"));
            user.setLastEntry(LocalDateTime.now());
            em.merge(user);
            em.flush();
            String token = jwtTokenProvider.createToken(request.getEmail(), user.getRole().name());
            Map<Object, Object> response = new HashMap<>();
            response.put("id", user.getId());
            response.put("email", request.getEmail());
            response.put("token", token);
            return ResponseEntity.ok(response);
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
}