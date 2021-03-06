package com.example.simulatordatabasetechnologies.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class TasksInfoDTO {

    private Long id;
    private String title;
    private Long serialNumber;
    private String description;

}
