package com.example.simulatordatabasetechnologies.model;

import lombok.Data;

import javax.persistence.*;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "QUERY_HISTORY")
public class QueryHistoryEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Long id;

    @Column(name = "USERS_ID")
    private Long userId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "USERS_ID",referencedColumnName = "ID", insertable = false, updatable = false)
    private UserEntity user;

    @Column(name = "TASKS_ID")
    private Long tasksId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "TASKS_ID",referencedColumnName = "ID", insertable = false, updatable = false)
    private TasksEntity task;

    @Column(name = "RESULT")
    private Long result;

    @Column(name = "SQL")
    private String sql;

    @Column(name = "COST")
    private Long cost;

    @Column(name = "TIME")
    private LocalDateTime time;
}

