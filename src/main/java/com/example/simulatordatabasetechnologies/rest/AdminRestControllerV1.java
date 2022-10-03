package com.example.simulatordatabasetechnologies.rest;


import com.example.simulatordatabasetechnologies.dto.DeleteRequestDTO;
import com.example.simulatordatabasetechnologies.dto.GroupDTO;
import com.example.simulatordatabasetechnologies.dto.TasksRequestDTO;
import com.example.simulatordatabasetechnologies.dto.UserAddDTO;
import com.example.simulatordatabasetechnologies.service.TasksService;
import com.example.simulatordatabasetechnologies.service.UsersService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/admin")
@CrossOrigin(origins="http://localhost:3000")
@Slf4j

public class AdminRestControllerV1 {
    private final UsersService usersService;
    private final TasksService tasksService;

    public AdminRestControllerV1(UsersService usersService, TasksService tasksService) {
        this.usersService = usersService;
        this.tasksService = tasksService;
    }

    @GetMapping("/groups")
    public ResponseEntity<?> getGroups() {
        try {
            List<GroupDTO> groups = usersService.getGroups();
            return ResponseEntity.ok().header("Content-Range", "1")
                    .header("Access-Control-Expose-Headers", "Content-Range").body(groups);
        } catch (RuntimeException e) {
            log.debug(e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.FORBIDDEN);
        }
    }

    @GetMapping("/users")
    public ResponseEntity<?> getUsers() {
        try {
            return ResponseEntity.ok().header("Content-Range", "1")
                    .header("Access-Control-Expose-Headers", "Content-Range").body(usersService.getUsers());
        } catch (RuntimeException e) {
            log.debug(e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.FORBIDDEN);
        }
    }

    @GetMapping("/tasks")
    public ResponseEntity<?> getAllTasks() {
        try {
            return ResponseEntity.ok().header("Content-Range", "1")
                    .header("Access-Control-Expose-Headers", "Content-Range").body(tasksService.getAllTasks());
        } catch (RuntimeException e) {
            log.debug(e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.FORBIDDEN);
        }
    }
    @GetMapping("/groups/{id}")
    public ResponseEntity<?> updateGroup(@PathVariable Long id) {
        try {
            return new ResponseEntity<>(usersService.getGroup(id), HttpStatus.OK);
        } catch (RuntimeException e) {
            log.debug(e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.FORBIDDEN);
        }
    }
    @PostMapping("/groups")
    public ResponseEntity<?> addGroup(@RequestBody GroupDTO data) {
        try {
            return new ResponseEntity<>(usersService.addGroup(data), HttpStatus.OK);
        } catch (RuntimeException e) {
            log.debug(e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.FORBIDDEN);
        }
    }
    @PutMapping("/groups/{id}")
    public ResponseEntity<?> updateGroup(@PathVariable Long id, @RequestBody GroupDTO data) {
        data.setId(id);
        try {
            return new ResponseEntity<>(usersService.updateGroup(data), HttpStatus.OK);
        } catch (RuntimeException e) {
            log.debug(e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.FORBIDDEN);
        }
    }
    @DeleteMapping("/groups/{id}")
    public ResponseEntity<?> deleteGroup(@PathVariable Long id) {
        try {
            usersService.deleteGroup(id);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (RuntimeException e) {
            log.debug(e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.FORBIDDEN);
        }
    }
    @PostMapping("/tasks")
    public ResponseEntity<?> addTasks(@RequestBody TasksRequestDTO request) {
        try {
            TasksRequestDTO tasks = tasksService.addTask(request);
            return new ResponseEntity<>(tasks, HttpStatus.OK);
        } catch (RuntimeException e) {
            log.debug(e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.FORBIDDEN);
        }
    }
    @PutMapping("/tasks/{id}")
    public ResponseEntity<?> updateTasks(@PathVariable Long id, @RequestBody TasksRequestDTO data) {
        data.setId(id);
        try {
            return new ResponseEntity<>(tasksService.updateTask(data), HttpStatus.OK);
        } catch (RuntimeException e) {
            log.debug(e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.FORBIDDEN);
        }
    }
    @DeleteMapping("/tasks/{id}")
    public ResponseEntity<?> deleteTask(@PathVariable Long id) {
        try {
            tasksService.deleteTask(id);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (RuntimeException e) {
            log.debug(e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.FORBIDDEN);
        }
    }
    @GetMapping("/tasks/{id}")
    public ResponseEntity<?> updateTask(@PathVariable Long id) {
        try {
            return new ResponseEntity<>(tasksService.getTaskInfo(id), HttpStatus.OK);
        } catch (RuntimeException e) {
            log.debug(e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.FORBIDDEN);
        }
    }
    @PostMapping("/users")
    public ResponseEntity<?> addUser(@RequestBody UserAddDTO data) {
        try {
            return new ResponseEntity<>(usersService.addUser(data), HttpStatus.OK);
        } catch (RuntimeException e) {
            log.debug(e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.FORBIDDEN);
        }
    }
    @DeleteMapping("/users/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        try {
            usersService.deleteUser(id);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (RuntimeException e) {
            log.debug(e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.FORBIDDEN);
        }
    }
    @GetMapping("/users/{id}")
    public ResponseEntity<?> addUser(@PathVariable Long id) {
        try {
            return new ResponseEntity<>(usersService.getUserInfo(id), HttpStatus.OK);
        } catch (RuntimeException e) {
            log.debug(e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.FORBIDDEN);
        }
    }
    @PutMapping("/users/{id}")
    public ResponseEntity<?> updateUser(@PathVariable Long id, @RequestBody UserAddDTO data) {
        data.setId(id);
        try {
            return new ResponseEntity<>(usersService.updateUser(data), HttpStatus.OK);
        } catch (RuntimeException e) {
            log.debug(e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.FORBIDDEN);
        }
    }
}
