package com.example.simulatordatabasetechnologies.rest;

import com.example.simulatordatabasetechnologies.dto.QueryRequestDTO;
import com.example.simulatordatabasetechnologies.service.QueryService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
import java.util.Map;

@Service
@Slf4j
public class QueryRestControllerV1 {

    private final QueryService queryService;

    public QueryRestControllerV1(QueryService queryService) {
        this.queryService = queryService;
    }

    @PostMapping
    @PreAuthorize("hasAuthority('study')")
    public ResponseEntity<?> executeSelect(@RequestBody String sql) {
        try {
            List<Map<String, Object>> result = queryService.executeSelect(sql);
            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (RuntimeException e) {
            log.debug(e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.FORBIDDEN);
        }
    }

    @PostMapping
    @PreAuthorize("hasAuthority('study')")
    public ResponseEntity<?> checkSelect(@RequestBody QueryRequestDTO request) {
        try {
            Boolean result = queryService.checkSelect(request);
            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (RuntimeException e) {
            log.debug(e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.FORBIDDEN);
        }
    }

    @PostMapping
    @PreAuthorize("hasAuthority('study')")
    public ResponseEntity<?> getSQLCost(@RequestBody String sql) {
        try {
            Map<String,Object> result = queryService.getSQLCost(sql);
            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (RuntimeException e) {
            log.debug(e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.FORBIDDEN);
        }
    }

    @PostMapping
    @PreAuthorize("hasAuthority('study')")
    public ResponseEntity<?> getSQLPlan(@RequestBody String sql) {
        try {
            Map<String,Object> result = queryService.getSQLPlan(sql);
            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (RuntimeException e) {
            log.debug(e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.FORBIDDEN);
        }
    }
}
