package com.example.simulatordatabasetechnologies.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CommentsDTO {

    private Long id;
    private Long tasksId;
    private Long usersId;
    private String lastName;
    private String firstName;
    private String text;
    private LocalDateTime time;

}
