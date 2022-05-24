package com.example.simulatordatabasetechnologies.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CommentsRequestDTO {
    private Long tasksId;
    private String text;
}
