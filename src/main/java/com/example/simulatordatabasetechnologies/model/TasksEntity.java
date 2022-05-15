package com.example.simulatordatabasetechnologies.model;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "tasks")
public class TasksEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Long id;

    @Column(name = "REFERENCE_QUERY")
    private String referenceQuery;

    @Column(name = "TITLE")
    private String title;

    @Column(name = "SERIAL_NUMBER")
    private Long serialNumber;

    @Column(name = "DESCRIPTION")
    private String description;

    @Column(name = "QUERY_HISTORY_ID")
    private Long queryHistoryId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "QUERY_HISTORY_ID",referencedColumnName = "ID", insertable = false, updatable = false)
    private QueryHistoryEntity queryHistory;
}

