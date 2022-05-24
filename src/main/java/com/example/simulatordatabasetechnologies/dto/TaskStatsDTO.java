package com.example.simulatordatabasetechnologies.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TaskStatsDTO {

    private String title;
    private Long authorsDecided;
    private Long authorsSent;
    private Long decidedRight;
    private Long decidedWrong;
    private Long totalAttempts;

}
