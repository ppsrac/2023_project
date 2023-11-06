package com.example.projecttest1.exception.selections;

public class NotUniqueException extends RuntimeException{
    public NotUniqueException(Long deviceId, Long artWorkId) {
        super(String.format("Device %d already picked %d", deviceId, artWorkId));
    }
}
