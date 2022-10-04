package com.example.simulatordatabasetechnologies.rest;

import com.example.simulatordatabasetechnologies.dto.CommentsRequestDTO;
import com.example.simulatordatabasetechnologies.service.CommentsService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/api/v1/comments")
@CrossOrigin(origins = "http://localhost:3000")
public class CommentsRestControllerV1 {

    private final CommentsService commentsService;

    public CommentsRestControllerV1(CommentsService commentsService) {
        this.commentsService = commentsService;
    }

    @GetMapping("/get_comments/{id}")
    @PreAuthorize("hasAuthority('study')")
    public ResponseEntity<?> getCommentsByTaskId(@PathVariable Long id) {
        try {
            return new ResponseEntity<>(commentsService.getCommentsByTaskId(id), HttpStatus.OK);
        } catch (RuntimeException e) {
            log.debug(e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.FORBIDDEN);
        }
    }

    @PostMapping("/add_comment")
    @PreAuthorize("hasAuthority('study')")
    public ResponseEntity<?> addComment(@RequestBody CommentsRequestDTO data) {
        try {
            commentsService.addComment(data);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (RuntimeException e) {
            log.debug(e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.FORBIDDEN);
        }
    }
}
