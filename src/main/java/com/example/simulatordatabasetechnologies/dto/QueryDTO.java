package com.example.simulatordatabasetechnologies.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class QueryDTO {

    private Long id;
    private Long userId;
    private String firstName;
    private String lastName;
    private Long tasksId;
    private String task;
    private Long result;
    private String sql;
    private Long cost;
    private LocalDateTime time;

}
