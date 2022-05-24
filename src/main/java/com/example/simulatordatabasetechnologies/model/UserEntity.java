package com.example.simulatordatabasetechnologies.model;

import lombok.Data;

import javax.persistence.*;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "users")
public class UserEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "email")
    private String email;

    @Column(name = "password")
    private String password;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Enumerated(value = EnumType.STRING)
    @Column(name = "role")
    private Role role;

    @Enumerated(value = EnumType.STRING)
    @Column(name = "status")
    private Status status;

    @Column(name = "FIRST_ENTRY")
    private LocalDateTime firstEntry;

    @Column(name = "LAST_ENTRY")
    private LocalDateTime lastEntry;

    @Column(name = "USER_GROUP_ID")
    private Long userGroupId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "USER_GROUP_ID",referencedColumnName = "ID", insertable = false, updatable = false)
    private UserGroupEntity group;
}