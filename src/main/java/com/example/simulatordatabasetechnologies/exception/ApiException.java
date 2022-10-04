package com.example.simulatordatabasetechnologies.exception;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ApiException {
    private String message;
    private String debugMessage;
}
