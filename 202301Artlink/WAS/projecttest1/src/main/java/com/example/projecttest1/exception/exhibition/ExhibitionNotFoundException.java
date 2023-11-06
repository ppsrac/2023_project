package com.example.projecttest1.exception.exhibition;

public class ExhibitionNotFoundException extends RuntimeException{
    public ExhibitionNotFoundException(String message) {
        super(message);
    }
}
