package com.example.projecttest1.exception.auth;

import org.springframework.http.HttpStatus;

public class AdminAlreadyExistsException extends AuthException {
    public AdminAlreadyExistsException(String message) {
        super(message, HttpStatus.CONFLICT);
    }
}
