package com.example.simulatordatabasetechnologies.service;

import com.example.simulatordatabasetechnologies.dto.*;

import java.util.List;

public interface TasksService {
    List<TasksDTO> getUserTasks();

    TasksDTO getTaskInfo(Long taskId);

    QueryDTO getWorstTaskQuery(Long taskId);

    List<QueryDTO> getTaskWrongQueries(Long taskId);

    TasksRequestDTO addTask(TasksRequestDTO task);

    TaskStatsDTO getTaskStats(Long id);

    TasksRequestDTO updateTask(TasksRequestDTO data);

    void deleteTask(Long id);

    List<TasksAdminDTO> getAllTasks();

    void saveNewTaskByUser(Long userId);
}
