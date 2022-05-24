package com.example.simulatordatabasetechnologies.rest;

import com.example.simulatordatabasetechnologies.dto.QueryRequestDTO;
import com.example.simulatordatabasetechnologies.dto.ResponseDTO;
import com.example.simulatordatabasetechnologies.dto.SqlDTO;
import com.example.simulatordatabasetechnologies.service.QueryService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

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
        ResponseDTO response = new ResponseDTO();
        try {
            response.setData( queryService.executeSelect(sql.getText()));
        } catch (RuntimeException e) {
            response.setError( e.getMessage());;
        }
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping("/check_select")
    @PreAuthorize("hasAuthority('study')")
    public ResponseEntity<?> checkSelect(@RequestBody QueryRequestDTO request) {
        ResponseDTO response = new ResponseDTO();
        try {
            response.setData( queryService.checkSelect(request));
        } catch (RuntimeException e) {
            response.setError( e.getMessage());;
        }
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping("/get_sql_cost")
    @PreAuthorize("hasAuthority('study')")
    public ResponseEntity<?> getSQLCost(@RequestBody SqlDTO sql) {
        ResponseDTO response = new ResponseDTO();
        try {
            response.setData( queryService.getSQLCost(sql.getText()));
        } catch (RuntimeException e) {
            response.setError( e.getMessage());
        }
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping("/get_sql_plan")
    @PreAuthorize("hasAuthority('study')")
    public ResponseEntity<?> getSQLPlan(@RequestBody SqlDTO sql) {
        ResponseDTO response = new ResponseDTO();
        try {
            response.setData( queryService.getSQLPlan(sql.getText()));
        } catch (RuntimeException e) {
            response.setError( e.getMessage());
        }
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
