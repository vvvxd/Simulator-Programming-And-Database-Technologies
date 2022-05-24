package com.example.simulatordatabasetechnologies.model;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "USER_GROUP")
public class UserGroupEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Long id;

    @Column(name = "NAME")
    private String name;

    @Column(name = "SHORT_NAME")
    private String shortName;
}
