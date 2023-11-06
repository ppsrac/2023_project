package com.example.projecttest1.exception.helper;

public class S3DeleteFailException extends RuntimeException {
    public S3DeleteFailException(String message){
        super(message);
    }
}
