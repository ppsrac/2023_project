package com.example.projecttest1.exception.user;

public class UserIdNotFoundException extends RuntimeException {
    public UserIdNotFoundException(Integer id) {
        super("User with id " + id + " not found.");
    }
}

