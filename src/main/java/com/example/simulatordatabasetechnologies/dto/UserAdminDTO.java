package com.example.simulatordatabasetechnologies.dto;

import com.example.simulatordatabasetechnologies.model.Role;
import com.example.simulatordatabasetechnologies.model.Status;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserAdminDTO {
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private Long userGroupId;
    private Role role;
    private Status status;
    private LocalDateTime firstEntry;
    private Long tasksSolved;
    private Long tasksSent;
    private Long tasksTotal;
}
