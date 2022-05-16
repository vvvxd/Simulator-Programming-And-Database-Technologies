package com.example.simulatordatabasetechnologies.rest;

import com.example.simulatordatabasetechnologies.dto.QueryRequestDTO;
import com.example.simulatordatabasetechnologies.dto.SqlDTO;
import com.example.simulatordatabasetechnologies.service.QueryService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/api/v1/query")
@CrossOrigin(origins="http://localhost:3000")
public class QueryRestControllerV1 {

    private final QueryService queryService;

    public QueryRestControllerV1(QueryService queryService) {
        this.queryService = queryService;
    }

    @PostMapping("/execute_select")
    @PreAuthorize("hasAuthority('study')")
    public ResponseEntity<?> executeSelect(@RequestBody SqlDTO sql) {
        try {
            List<Map<String, Object>> result = queryService.executeSelect(sql.getText());
            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (RuntimeException e) {
            log.debug(e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.FORBIDDEN);
        }
    }

    @PostMapping("/check_select")
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

    @PostMapping("/get_sql_cost")
    @PreAuthorize("hasAuthority('study')")
    public ResponseEntity<?> getSQLCost(@RequestBody SqlDTO sql) {
        try {
            Map<String,Object> result = queryService.getSQLCost(sql.getText());
            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (RuntimeException e) {
            log.debug(e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.FORBIDDEN);
        }
    }

    @PostMapping("/get_sql_plan")
    @PreAuthorize("hasAuthority('study')")
    public ResponseEntity<?> getSQLPlan(@RequestBody SqlDTO sql) {
        try {
            String result = queryService.getSQLPlan(sql.getText());
            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (RuntimeException e) {
            log.debug(e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.FORBIDDEN);
        }
    }
}
