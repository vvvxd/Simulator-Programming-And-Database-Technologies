package com.example.simulatordatabasetechnologies.rest;

import com.example.simulatordatabasetechnologies.dto.*;
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
@CrossOrigin(origins = "http://localhost:3000")
public class TasksRestControllerV1 {

    private final TasksService tasksService;

    public TasksRestControllerV1(TasksService tasksService) {
        this.tasksService = tasksService;
    }

    @GetMapping
    @PreAuthorize("hasAuthority('study')")
    public ResponseEntity<?> getUserTasks() {
        try {
            List<TasksDTO> tasks = tasksService.getUserTasks();
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
            TasksDTO tasks = tasksService.getTaskInfo(id);
            return new ResponseEntity<>(tasks, HttpStatus.OK);
        } catch (RuntimeException e) {
            log.debug(e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.FORBIDDEN);
        }
    }


    @GetMapping("/get_worst_task_query/{id}")
    @PreAuthorize("hasAuthority('study')")
    public ResponseEntity<?> getWorstTaskQuery(@PathVariable long id) {
        try {
            QueryDTO query = tasksService.getWorstTaskQuery(id);
            return new ResponseEntity<>(query, HttpStatus.OK);
        } catch (RuntimeException e) {
            log.debug(e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.FORBIDDEN);
        }
    }

    @GetMapping("/get_task_wrong_queries/{id}")
    @PreAuthorize("hasAuthority('study')")
    public ResponseEntity<?> getTaskWrongQueries(@PathVariable long id) {
        try {
            List<QueryDTO> query = tasksService.getTaskWrongQueries(id);
            return new ResponseEntity<>(query, HttpStatus.OK);
        } catch (RuntimeException e) {
            log.debug(e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.FORBIDDEN);
        }
    }


    @GetMapping("/get_task_stats/{id}")
    @PreAuthorize("hasAuthority('study')")
    public ResponseEntity<?> getTaskStats(@PathVariable long id) {
        try {
            TaskStatsDTO query = tasksService.getTaskStats(id);
            return new ResponseEntity<>(query, HttpStatus.OK);
        } catch (RuntimeException e) {
            log.debug(e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.FORBIDDEN);
        }
    }

    @GetMapping("/get_all_tasks")
    @PreAuthorize("hasAuthority('study')")
    public ResponseEntity<?> getAllTasks() {
        try {
            return new ResponseEntity<>(tasksService.getAllTasks(), HttpStatus.OK);
        } catch (RuntimeException e) {
            log.debug(e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.FORBIDDEN);
        }
    }

    @PostMapping("/add_tasks")
    @PreAuthorize("hasAuthority('admin_panel')")
    public ResponseEntity<?> addTasks(@RequestBody TasksRequestDTO request) {
        try {
            TasksRequestDTO tasks = tasksService.addTask(request);
            return new ResponseEntity<>(tasks, HttpStatus.OK);
        } catch (RuntimeException e) {
            log.debug(e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.FORBIDDEN);
        }
    }


    @PostMapping("/update_task")
    @PreAuthorize("hasAuthority('admin_panel')")
    public ResponseEntity<?> updateTask(@RequestBody TasksRequestDTO data) {
        try {
            return new ResponseEntity<>(tasksService.updateTask(data), HttpStatus.OK);
        } catch (RuntimeException e) {
            log.debug(e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.FORBIDDEN);
        }
    }


    @PostMapping("/delete_task")
    @PreAuthorize("hasAuthority('admin_panel')")
    public ResponseEntity<?> deleteTask(@RequestBody DeleteRequestDTO data) {
        try {
            tasksService.deleteTask(data.getId());
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (RuntimeException e) {
            log.debug(e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.FORBIDDEN);
        }
    }
}
