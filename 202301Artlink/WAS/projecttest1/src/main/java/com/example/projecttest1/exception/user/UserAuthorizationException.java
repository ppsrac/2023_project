package com.example.projecttest1.exception.user;

public class UserAuthorizationException extends RuntimeException {
    public UserAuthorizationException(String message) {
        super(message);
    }
}
