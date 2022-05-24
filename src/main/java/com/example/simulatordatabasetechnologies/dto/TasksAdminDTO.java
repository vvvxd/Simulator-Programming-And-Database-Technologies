package com.example.simulatordatabasetechnologies.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class TasksAdminDTO {

    private Long id;
    private String referenceQuery;
    private String title;
    private Long serialNumber;
    private String description;
    private Long decidedRight;
    private Long decidedWrong;
    private Long totalAttempts;
    private Long queryHistoryId;

}
