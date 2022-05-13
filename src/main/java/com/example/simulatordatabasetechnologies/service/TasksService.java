package com.example.simulatordatabasetechnologies.service;

import com.example.simulatordatabasetechnologies.dto.TasksInfoDto;
import com.example.simulatordatabasetechnologies.dto.TasksDto;

import java.util.List;

public interface TasksService {
    List<TasksDto> getUserTasks();

    TasksInfoDto getTaskInfo(Long taskId);
}
