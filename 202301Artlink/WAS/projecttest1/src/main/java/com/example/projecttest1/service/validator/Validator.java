package com.example.projecttest1.service.validator;

public abstract class Validator {

    protected boolean isNullOrEmpty(String str) {
        return str == null || str.length() == 0;
    }

    protected boolean inRange(int value, int min, int max) {
        return value >= min && value <= max;
    }

    protected boolean isAlphaNumeric(String str) {
        return str.matches("^[a-zA-Z0-9_]+$");
    }
}
