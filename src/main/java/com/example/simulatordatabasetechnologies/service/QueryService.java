package com.example.simulatordatabasetechnologies.service;

import com.example.simulatordatabasetechnologies.dto.QueryRequestDTO;
import com.example.simulatordatabasetechnologies.model.QueryHistoryEntity;

import java.util.List;
import java.util.Map;

public interface QueryService {
    List<Map<String, Object>> executeSelect(String sql);
    Boolean checkSelect(QueryRequestDTO requestDTO);
    Map<String,Object> getSQLCost(String sql) ;
    Long getSQLCostVal(String sql) ;
    String getSQLPlan(String sql);
    QueryHistoryEntity addQueryHistory(Long taskId, Long cost, Long userId, String sql, Long result);
}
