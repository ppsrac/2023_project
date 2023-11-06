package com.example.projecttest1.exception.auth;

import org.springframework.http.HttpStatus;

public class MissingInputException extends AuthException {
    public MissingInputException(String message) {
        super(message + " must be provided.", HttpStatus.BAD_REQUEST);
    }
}
