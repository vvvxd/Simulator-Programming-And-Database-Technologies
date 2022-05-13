package com.example.simulatordatabasetechnologies.model;

import javax.persistence.*;
import java.io.Serializable;

@Embeddable
public class TasksUsersKey  implements Serializable {
    @Column(name = "TASKS_ID")
    private Long tasksId;

    @Column(name = "USERS_ID")
    private Long usersId;
}
