package com.example.simulatordatabasetechnologies.service;

import com.example.simulatordatabasetechnologies.dto.TasksDTO;
import com.example.simulatordatabasetechnologies.dto.TasksRequestDTO;

import java.util.List;

public interface TasksService {
    List<TasksDTO> getUserTasks();

    TasksDTO getTaskInfo(Long taskId);

    TasksRequestDTO addTask(TasksRequestDTO task);
}
