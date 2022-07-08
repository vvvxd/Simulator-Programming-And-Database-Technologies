package com.example.simulatordatabasetechnologies.dto;


import lombok.Data;

@Data
public class ProfileDTO {

    private Long id;

    private String email;

    private String firstName;

    private String lastName;

    private String password;
}
