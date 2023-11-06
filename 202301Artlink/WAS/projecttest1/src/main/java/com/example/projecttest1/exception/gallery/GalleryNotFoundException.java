package com.example.projecttest1.exception.gallery;

public class GalleryNotFoundException extends RuntimeException {
    public GalleryNotFoundException(String message) {
        super(message);
    }
}
