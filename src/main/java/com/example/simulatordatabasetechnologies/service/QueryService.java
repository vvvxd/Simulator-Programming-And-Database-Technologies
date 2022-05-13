package com.example.simulatordatabasetechnologies.service;

import com.example.simulatordatabasetechnologies.dto.QueryRequestDTO;

import java.util.List;
import java.util.Map;

public interface QueryService {
    List<Map<String, Object>> executeSelect(String sql);
    Boolean checkSelect(QueryRequestDTO requestDTO);
    Map<String,Object> getSQLCost(String sql) ;
    Map<String,Object> getSQLPlan(String sql);
}
