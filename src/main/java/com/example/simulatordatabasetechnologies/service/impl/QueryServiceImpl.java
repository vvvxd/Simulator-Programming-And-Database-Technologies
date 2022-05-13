package com.example.simulatordatabasetechnologies.service.impl;

import com.example.simulatordatabasetechnologies.dto.QueryRequestDTO;
import com.example.simulatordatabasetechnologies.service.QueryService;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
public class QueryServiceImpl implements QueryService {

    private final JdbcTemplate jdbcTemplate;

    public QueryServiceImpl(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<Map<String, Object>> executeSelect(String sql) {
        return jdbcTemplate.queryForList(sql);
    }

    @Override
    public Boolean checkSelect(QueryRequestDTO requestDTO) {
        return null;
    }

    @Override
    @Transactional
    public Map<String,Object> getSQLCost(String sql) {
        String uuid = UUID.randomUUID().toString();

        jdbcTemplate.update("EXPLAIN PLAN set STATEMENT_ID = '"+uuid+"' FOR " + sql);

        Map<String,Object> cost = jdbcTemplate.queryForMap("select p.io_cost cost from plan_table p" +
                " where p.STATEMENT_ID = '"+uuid+"' ");

        jdbcTemplate.update("delete from plan_table p" +
                "where p.id = 0 and p.STATEMENT_ID = '"+uuid+"' ");

        return cost;
    }

    @Override
    public  Map<String,Object> getSQLPlan(String sql) {
        jdbcTemplate.update("EXPLAIN PLAN FOR " + sql);

        Map<String,Object> plan = jdbcTemplate.queryForMap("SELECT * FROM table(DBMS_XPLAN.DISPLAY)");

        return plan;
    }
}
