package com.example.projecttest1.config.jwt.exception;

import org.springframework.security.core.AuthenticationException;

public class JWTAuthenticationException extends AuthenticationException {
    public JWTAuthenticationException(String msg) {
        super(msg);
    }
}