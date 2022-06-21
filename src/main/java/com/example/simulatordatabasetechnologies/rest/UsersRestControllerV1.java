package com.example.simulatordatabasetechnologies.rest;

import com.example.simulatordatabasetechnologies.dto.DeleteRequestDTO;
import com.example.simulatordatabasetechnologies.dto.GroupDTO;
import com.example.simulatordatabasetechnologies.dto.TasksDTO;
import com.example.simulatordatabasetechnologies.dto.UserAddDTO;
import com.example.simulatordatabasetechnologies.service.UsersService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/v1/users")
@CrossOrigin(origins="http://localhost:3000")
public class UsersRestControllerV1 {

    private final UsersService usersService;

    public UsersRestControllerV1(UsersService usersService) {
        this.usersService = usersService;
    }

    @GetMapping("/get_groups")
    public ResponseEntity<?> getGroups() {
        try {
            List<GroupDTO> groups = usersService.getGroups();
            return new ResponseEntity<>(groups, HttpStatus.OK);
        } catch (RuntimeException e) {
            log.debug(e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.FORBIDDEN);
        }
    }


    @PostMapping("/add_group")
    @PreAuthorize("hasAuthority('admin_panel')")
    public ResponseEntity<?> addGroup(@RequestBody GroupDTO data) {
        try {
            return new ResponseEntity<>(usersService.addGroup(data), HttpStatus.OK);
        } catch (RuntimeException e) {
            log.debug(e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.FORBIDDEN);
        }
    }


    @PostMapping("/update_group")
    @PreAuthorize("hasAuthority('admin_panel')")
    public ResponseEntity<?> updateGroup(@RequestBody GroupDTO data) {
        try {
            return new ResponseEntity<>(usersService.updateGroup(data), HttpStatus.OK);
        } catch (RuntimeException e) {
            log.debug(e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.FORBIDDEN);
        }
    }


    @PostMapping("/delete_group")
    @PreAuthorize("hasAuthority('admin_panel')")
    public ResponseEntity<?> deleteGroup(@RequestBody DeleteRequestDTO data) {
        try {
            usersService.deleteGroup(data.getId());
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (RuntimeException e) {
            log.debug(e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.FORBIDDEN);
        }
    }

    @GetMapping("/get_user_info/{id}")
    public ResponseEntity<?> getUserInfo(@PathVariable long id) {
        try {
            return new ResponseEntity<>( usersService.getUserInfo(id), HttpStatus.OK);
        } catch (RuntimeException e) {
            log.debug(e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.FORBIDDEN);
        }
    }


    @GetMapping("/get_list_solved_tasks/{id}")
    public ResponseEntity<?> getListSolvedTasks(@PathVariable long id) {
        try {
            return new ResponseEntity<>( usersService.getListSolvedTasks(id), HttpStatus.OK);
        } catch (RuntimeException e) {
            log.debug(e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.FORBIDDEN);
        }
    }


    @GetMapping("/get_list_unresolved_tasks/{id}")
    public ResponseEntity<?> getListUnresolvedTasks(@PathVariable long id) {
        try {
            return new ResponseEntity<>(usersService.getListUnresolvedTasks(id), HttpStatus.OK);
        } catch (RuntimeException e) {
            log.debug(e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.FORBIDDEN);
        }
    }

    @GetMapping("/get_list_best_solutions_tasks/{id}")
    public ResponseEntity<?> getListBestSolutionsTasks(@PathVariable long id) {
        try {
            return new ResponseEntity<>(usersService.getListBestSolutionsTasks(id), HttpStatus.OK);
        } catch (RuntimeException e) {
            log.debug(e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.FORBIDDEN);
        }
    }


    @GetMapping("/get_users")
    public ResponseEntity<?> getUsers() {
        try {
            return new ResponseEntity<>(usersService.getUsers(), HttpStatus.OK);
        } catch (RuntimeException e) {
            log.debug(e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.FORBIDDEN);
        }
    }


    @PostMapping("/add_user")
    @PreAuthorize("hasAuthority('admin_panel')")
    public ResponseEntity<?> addUser(@RequestBody UserAddDTO data) {
        try {
            return new ResponseEntity<>(usersService.addUser(data), HttpStatus.OK);
        } catch (RuntimeException e) {
            log.debug(e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.FORBIDDEN);
        }
    }


    @PostMapping("/update_user")
    @PreAuthorize("hasAuthority('admin_panel')")
    public ResponseEntity<?> updateUser(@RequestBody UserAddDTO data) {
        try {
            return new ResponseEntity<>(usersService.updateUser(data), HttpStatus.OK);
        } catch (RuntimeException e) {
            log.debug(e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.FORBIDDEN);
        }
    }


    @PostMapping("/delete_user")
    @PreAuthorize("hasAuthority('admin_panel')")
    public ResponseEntity<?> deleteUser(@RequestBody DeleteRequestDTO data) {
        try {
            usersService.deleteUser(data.getId());
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (RuntimeException e) {
            log.debug(e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.FORBIDDEN);
        }
    }
}
