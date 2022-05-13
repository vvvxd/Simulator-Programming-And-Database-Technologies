package com.example.simulatordatabasetechnologies.repository;

import com.example.simulatordatabasetechnologies.model.TasksUsersEntity;
import com.example.simulatordatabasetechnologies.model.TasksUsersKey;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TasksUsersRepository extends JpaRepository<TasksUsersEntity, TasksUsersKey> {
}
