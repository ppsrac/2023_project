package com.example.projecttest1.exception.auth;

import org.springframework.http.HttpStatus;

public abstract class AuthException extends RuntimeException{
    private HttpStatus httpStatus;

    public AuthException(String message, HttpStatus httpStatus) {
        super(message);
        this.httpStatus = httpStatus;
    }

    public HttpStatus getHttpStatus() {
        return httpStatus;
    }
}
