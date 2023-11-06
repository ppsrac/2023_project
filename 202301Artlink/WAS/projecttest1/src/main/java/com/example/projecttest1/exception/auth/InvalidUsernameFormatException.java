package com.example.projecttest1.exception.auth;

import org.springframework.http.HttpStatus;

public class InvalidUsernameFormatException extends AuthException {
    public InvalidUsernameFormatException(String message) {
        super(message, HttpStatus.BAD_REQUEST);
    }

}
