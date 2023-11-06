package com.example.projecttest1.exception.auth;

import org.springframework.http.HttpStatus;

public class UserAlreadyExistsException extends AuthException {
    public UserAlreadyExistsException(String message) {
        super(message, HttpStatus.CONFLICT);
    }
}
