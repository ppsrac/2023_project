package com.example.projecttest1.exception.auth;

import org.springframework.http.HttpStatus;

public class InvalidNicknameFormatException extends AuthException {
    public InvalidNicknameFormatException(String message) {
        super(message, HttpStatus.BAD_REQUEST);
    }
}
