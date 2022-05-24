package com.example.simulatordatabasetechnologies.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TasksDTO {

    private Long id;
    private Long serialNumber;
    private String title;
    private Long status;
    private String description;
    private Long decidedRight;
    private Long decidedWrong;
    private Long totalAttempts;

}
