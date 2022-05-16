package com.example.simulatordatabasetechnologies.service.impl;

import com.example.simulatordatabasetechnologies.dto.QueryRequestDTO;
import com.example.simulatordatabasetechnologies.dto.TasksDTO;
import com.example.simulatordatabasetechnologies.model.*;
import com.example.simulatordatabasetechnologies.security.SecurityService;
import com.example.simulatordatabasetechnologies.service.QueryService;
import com.example.simulatordatabasetechnologies.service.TasksService;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaUpdate;
import javax.persistence.criteria.Root;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
public class QueryServiceImpl implements QueryService {

    @PersistenceContext
    private EntityManager em;

    private final JdbcTemplate jdbcTemplate;
    private final SecurityService securityService;
    private final TasksService tasksService;

    public QueryServiceImpl(JdbcTemplate jdbcTemplate, SecurityService securityService, TasksService tasksService) {
        this.jdbcTemplate = jdbcTemplate;
        this.securityService = securityService;
        this.tasksService = tasksService;
    }


    @Override
    public List<Map<String, Object>> executeSelect(String sql) {
        return jdbcTemplate.queryForList(sql);
    }

    @Override
    @Transactional
    public Boolean checkSelect(QueryRequestDTO requestDTO) {
        TasksEntity task = em.find(TasksEntity.class, requestDTO.getTaskId());
        if (task == null)
            throw new RuntimeException("Задание не найдено.");

        UserEntity userEntity = securityService.getCurrentUser();
        if (userEntity == null)
            throw new RuntimeException("Пользователь не найден");

        Boolean result = true;

        List<Map<String, Object>> userQueryResult = jdbcTemplate.queryForList(requestDTO.getSql());

        List<Map<String, Object>> referenceQueryResult = jdbcTemplate.queryForList(task.getReferenceQuery());

        if (referenceQueryResult.size() != userQueryResult.size())
            result = false;

        for (int i = 0; i < referenceQueryResult.size(); i++) {
            List<Object> userQuery = new ArrayList<>(userQueryResult.get(i).values());
            List<Object> referenceQuery = new ArrayList<>(referenceQueryResult.get(i).values());

            if (userQuery.size() != referenceQuery.size())
                result = false;

            if (!referenceQuery.equals(userQuery))
                result = false;
        }

        if (result) {
            changeTasksStatus(task.getId(),userEntity.getId(),1L);

            Long cost = getSQLCostVal(requestDTO.getSql());
            QueryHistoryEntity userQueryHistory = addQueryHistory(task.getId(), cost, userEntity.getId(), requestDTO.getSql(), 1L);

            if (task.getQueryHistoryId() == null)
                task.setQueryHistoryId(userQueryHistory.getId());
            else {
                QueryHistoryEntity worstTasksQuery = em.find(QueryHistoryEntity.class, task.getQueryHistoryId());

                if (worstTasksQuery.getCost() <= userQueryHistory.getCost())
                    task.setQueryHistoryId(userQueryHistory.getId());
            }
        } else {
            changeTasksStatus(task.getId(),userEntity.getId(),0L);
            addQueryHistory(task.getId(), null, userEntity.getId(), requestDTO.getSql(), 0L);
        }

        return result;
    }

    @Override
    @Transactional
    public Long getSQLCostVal(String sql) {
        String uuid = UUID.randomUUID().toString().substring(0, 18);

        jdbcTemplate.update("EXPLAIN PLAN set STATEMENT_ID = '" + uuid + "' FOR " + sql);

        Map<String, Object> cost = jdbcTemplate.queryForMap("select DISTINCT p.io_cost cost from plan_table p" +
                " where p.STATEMENT_ID = '" + uuid + "' ");

        jdbcTemplate.update("delete from plan_table p " +
                "where p.id = 0 and p.STATEMENT_ID = '" + uuid + "' ");

        return (Long) cost.get("COST");
    }

    @Override
    @Transactional
    public Map<String, Object> getSQLCost(String sql) {
        String uuid = UUID.randomUUID().toString().substring(0, 18);

        jdbcTemplate.update("EXPLAIN PLAN set STATEMENT_ID = '" + uuid + "' FOR " + sql);

        Map<String, Object> cost = jdbcTemplate.queryForMap("select DISTINCT p.io_cost cost from plan_table p" +
                " where p.STATEMENT_ID = '" + uuid + "' ");

        jdbcTemplate.update("delete from plan_table p " +
                "where p.id = 0 and p.STATEMENT_ID = '" + uuid + "' ");

        return cost;
    }

    @Override
    public String getSQLPlan(String sql) {
        jdbcTemplate.update("EXPLAIN PLAN FOR " + sql);

        List<Map<String, Object>> plan = jdbcTemplate.queryForList("SELECT * FROM table(DBMS_XPLAN.DISPLAY)");

        StringBuilder result = new StringBuilder();

        plan.forEach(v -> {
            v.values().forEach(e -> result.append(e.toString()).append("\n"));
        });

        return result.toString();
    }

    @Override
    @Transactional(propagation = Propagation.MANDATORY)
    public QueryHistoryEntity addQueryHistory(Long taskId, Long cost, Long userId, String sql, Long result) {
        QueryHistoryEntity queryHistory = new QueryHistoryEntity();

        queryHistory.setTasksId(taskId);
        queryHistory.setCost(cost);
        queryHistory.setUserId(userId);
        queryHistory.setSql(sql);
        queryHistory.setResult(result);
        queryHistory.setTime(LocalDateTime.now());

        em.persist(queryHistory);
        em.flush();

        return queryHistory;
    }

    @Transactional(propagation = Propagation.MANDATORY)
    void changeTasksStatus(Long taskId, Long userId, Long status) {
        TasksDTO tasksDTO = tasksService.getTaskInfo(taskId);

        if (!Long.getLong("1").equals(tasksDTO.getStatus())) {
            CriteriaBuilder cb = em.getCriteriaBuilder();
            CriteriaUpdate<TasksUsersEntity> cu = cb.createCriteriaUpdate(TasksUsersEntity.class);
            Root<TasksUsersEntity> root = cu.from(TasksUsersEntity.class);

            cu.set(TasksUsersEntity_.STATUS, status);

            cu.where(cb.equal(root.get(TasksUsersEntity_.TASKS_ID), taskId),
                    cb.equal(root.get(TasksUsersEntity_.USERS_ID), userId)
            );

            em.createQuery(cu).executeUpdate();
        }
    }
}
