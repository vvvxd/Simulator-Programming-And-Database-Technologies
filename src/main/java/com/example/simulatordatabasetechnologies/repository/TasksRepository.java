package com.example.simulatordatabasetechnologies.repository;

import com.example.simulatordatabasetechnologies.model.TasksEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TasksRepository  extends JpaRepository<TasksEntity, Long> {
}
