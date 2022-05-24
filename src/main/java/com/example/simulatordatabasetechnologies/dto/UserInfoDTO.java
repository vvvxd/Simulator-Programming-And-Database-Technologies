package com.example.simulatordatabasetechnologies.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserInfoDTO {
    private String firstName;
    private String lastName;
    private String email;
    private String group;
    private Long tasksSolved;
    private Long tasksSent;
    private Long tasksTotal;
}
