package com.example.simulatordatabasetechnologies.rest;

import com.example.simulatordatabasetechnologies.dto.TasksDto;
import com.example.simulatordatabasetechnologies.dto.TasksInfoDto;
import com.example.simulatordatabasetechnologies.model.UserEntity;
import com.example.simulatordatabasetechnologies.service.TasksService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/v1/tasks")
public class TasksRestControllerV1 {

    private final TasksService tasksService;

    public TasksRestControllerV1(TasksService tasksService) {
        this.tasksService = tasksService;
    }

    @GetMapping
    @PreAuthorize("hasAuthority('study')")
    public ResponseEntity<?> getUserTasks() {
        try {
            List<TasksDto> tasks = tasksService.getUserTasks();
            return new ResponseEntity<>(tasks, HttpStatus.OK);
        } catch (RuntimeException e) {
            log.debug(e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.FORBIDDEN);
        }
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAuthority('study')")
    public ResponseEntity<?> getTaskInfo(@PathVariable long id) {
        try {
            TasksInfoDto tasks = tasksService.getTaskInfo(id);
            return new ResponseEntity<>(tasks, HttpStatus.OK);
        } catch (RuntimeException e) {
            log.debug(e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.FORBIDDEN);
        }
    }
}
