package com.example.projecttest1.advice;

import com.example.projecttest1.dto.ErrorResponseDto;
import com.example.projecttest1.exception.exhibition.ExhibitionNotFoundException;
import com.example.projecttest1.exception.user.UserIdNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class ApiExceptionHandler {
    @ExceptionHandler(ExhibitionNotFoundException.class)
    public ResponseEntity<Object> handleExhibitionException(ExhibitionNotFoundException e) {
        System.out.println("AuthExceptionHandler AuthException call()");
        return new ResponseEntity<>(new ErrorResponseDto(e.getMessage(), HttpStatus.NOT_FOUND.value()), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(UserIdNotFoundException.class)
    public ResponseEntity<Object> handleExhibitionException(UserIdNotFoundException e) {
        System.out.println("AuthExceptionHandler AuthException call()");
        return new ResponseEntity<>(new ErrorResponseDto(e.getMessage(), HttpStatus.NOT_FOUND.value()), HttpStatus.NOT_FOUND);
    }
}
