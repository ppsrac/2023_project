package com.example.projecttest1.exception.django;

public class DjangoFailedException extends RuntimeException{
    public DjangoFailedException(String message) {
        super(message);
    }
}
