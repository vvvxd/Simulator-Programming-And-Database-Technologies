package com.example.simulatordatabasetechnologies.model;

import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Data
@Entity
@Table(name = "TASKS_USERS")
@IdClass(TasksUsersKey.class)
public class TasksUsersEntity {
    @Id
    @Column(name = "TASKS_ID")
    private Long tasksId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "TASKS_ID",referencedColumnName = "ID", insertable = false, updatable = false)
    private TasksEntity task;

    @Id
    @Column(name = "USERS_ID")
    private Long usersId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "USERS_ID",referencedColumnName = "ID", insertable = false, updatable = false)
    private UserEntity user;

    @Column(name = "STATUS")
    private Long status;
}
