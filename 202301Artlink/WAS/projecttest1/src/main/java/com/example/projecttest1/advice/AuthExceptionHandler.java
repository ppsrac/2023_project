package com.example.projecttest1.advice;

import com.example.projecttest1.dto.ErrorResponseDto;
import com.example.projecttest1.exception.auth.AuthException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class AuthExceptionHandler {

    @ExceptionHandler(AuthException.class)
    public ResponseEntity<Object> handleAuthException(AuthException e) {
        System.out.println("AuthExceptionHandler AuthException call()");
        return new ResponseEntity<>(new ErrorResponseDto(e.getMessage(), e.getHttpStatus().value()), e.getHttpStatus());
    }
}
