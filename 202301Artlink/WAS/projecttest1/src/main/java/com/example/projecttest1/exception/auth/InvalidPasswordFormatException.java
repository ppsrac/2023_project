package com.example.projecttest1.exception.auth;

import org.springframework.http.HttpStatus;

public class InvalidPasswordFormatException extends AuthException {
    public InvalidPasswordFormatException(String message) {
        super(message, HttpStatus.BAD_REQUEST);
    }

}
