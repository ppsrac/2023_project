package com.example.projecttest1.service.validator;

import com.example.projecttest1.entity.User;
import com.example.projecttest1.exception.auth.InvalidNicknameFormatException;
import com.example.projecttest1.exception.auth.InvalidUsernameFormatException;
import com.example.projecttest1.exception.auth.MissingInputException;
import org.springframework.stereotype.Component;

@Component
public class UserUpdateValidator extends Validator{
    private static final int MINIMUM_USERNAME_LENGTH = 5;
    private static final int MAXIMUM_USERNAME_LENGTH = 20;

    private static final int MAXIMUM_NICKNAME_LENGTH = 5;

    public void validate(User user) {
        // 입력값 존재 검사
        if (isNullOrEmpty(user.getUsername())) {
            throw new MissingInputException("username");
        }
        if (isNullOrEmpty(user.getNickname())) {
            throw new MissingInputException("nickname");
        }
        if (user.getPhoneNumber() == null) {
            throw new MissingInputException("phoneNumber");
        }
        // 입력값 유효성 검사
        if (!inRange(user.getUsername().length(), MINIMUM_USERNAME_LENGTH, MAXIMUM_USERNAME_LENGTH)) {
            throw new InvalidUsernameFormatException("length");
        }
        if (!isAlphaNumeric(user.getUsername())) {
            throw new InvalidUsernameFormatException("format");
        }
        if (!inRange(user.getNickname().length(), 1, MAXIMUM_NICKNAME_LENGTH)) {
            throw new InvalidNicknameFormatException("length");
        }

    }

}
