package com.example.simulatordatabasetechnologies.exception.handler;


import com.example.simulatordatabasetechnologies.dto.ResponseDTO;
import com.example.simulatordatabasetechnologies.exception.NotFoundException;
import lombok.NonNull;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import javax.persistence.NoResultException;


@Slf4j
@ControllerAdvice
public class ControllerExceptionHandler {

    @ExceptionHandler(NotFoundException.class)
    public ResponseEntity<?> handleNotFoundExceptionException(@NonNull final NotFoundException exc) {
        ResponseDTO responseDTO = new ResponseDTO();
        log.error(exc.getMessage());
        responseDTO.setError(exc.getMessage());
        return new ResponseEntity<>(responseDTO, HttpStatus.FORBIDDEN);
    }

    @ExceptionHandler({NoResultException.class})
    ResponseEntity<?> handleNoResultException(@NonNull NoResultException exc) {
        ResponseDTO responseDTO = new ResponseDTO();
        log.error(exc.getMessage());
        responseDTO.setError(exc.getMessage());
        return new ResponseEntity<>(responseDTO, HttpStatus.FORBIDDEN);
    }
}
