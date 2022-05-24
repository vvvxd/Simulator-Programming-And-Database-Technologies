package com.example.simulatordatabasetechnologies.model;

import lombok.Data;

import javax.persistence.*;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "COMMENTS")
public class CommentsEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Long id;

    @Column(name = "TASKS_ID")
    private Long tasksId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "TASKS_ID",referencedColumnName = "ID", insertable = false, updatable = false)
    private TasksEntity task;

    @Column(name = "USERS_ID")
    private Long usersId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "USERS_ID",referencedColumnName = "ID", insertable = false, updatable = false)
    private UserEntity user;

    @Column(name = "TEXT")
    private String text;

    @Column(name = "TIME")
    private LocalDateTime time;
}
