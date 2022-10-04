package com.example.simulatordatabasetechnologies.Facade;

import com.example.simulatordatabasetechnologies.dto.AuthenticationRequestDTO;
import com.example.simulatordatabasetechnologies.dto.RegisterRequestDTO;
import com.example.simulatordatabasetechnologies.model.UserEntity;
import com.example.simulatordatabasetechnologies.security.JwtTokenProvider;
import com.example.simulatordatabasetechnologies.service.impl.TasksServiceImpl;
import com.example.simulatordatabasetechnologies.service.impl.UsersServiceImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

@Component
public class UserAuthFacade {

    private final UsersServiceImpl usersService;

    private final TasksServiceImpl tasksService;

    private final JwtTokenProvider jwtTokenProvider;

    public UserAuthFacade(UsersServiceImpl usersService, TasksServiceImpl tasksService, JwtTokenProvider jwtTokenProvider) {
        this.usersService = usersService;
        this.tasksService = tasksService;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    public void register(RegisterRequestDTO request){
        if(request == null){
            throw  new RuntimeException("Request invalid");
        }
        UserEntity user = usersService.saveAndCheckUser(request);
        tasksService.saveNewTaskByUser(user.getId());
    }

    public UserEntity getUserByEmail(String email){
        return usersService.getUserByEmail(email);
    }

    public ResponseEntity<?> getToken(AuthenticationRequestDTO request, UserEntity user){
        String token = jwtTokenProvider.createToken(request.getEmail(), user.getRole().name());
        Map<Object, Object> response = new HashMap<>();
        response.put("id", user.getId());
        response.put("email", request.getEmail());
        response.put("token", token);
        return ResponseEntity.ok(response);
    }
}
