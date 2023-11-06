package com.example.projecttest1.service.validator;

import com.example.projecttest1.dto.PasswordUpdateDto;
import com.example.projecttest1.dto.gallery.GallerySignupDto;
import com.example.projecttest1.entity.Gallery;
import com.example.projecttest1.entity.User;
import com.example.projecttest1.exception.auth.InvalidNicknameFormatException;
import com.example.projecttest1.exception.auth.InvalidPasswordFormatException;
import com.example.projecttest1.exception.auth.InvalidUsernameFormatException;
import com.example.projecttest1.exception.auth.MissingInputException;
import org.springframework.stereotype.Component;

@Component
public class UserSignupValidator extends Validator  {

    private static final int MINIMUM_PASSWORD_LENGTH = 4;
    private static final int MAXIMUM_PASSWORD_LENGTH = 20;
    private static final int MINIMUM_USERNAME_LENGTH = 5;
    private static final int MAXIMUM_USERNAME_LENGTH = 20;
    private static final int MAXIMUM_NICKNAME_LENGTH = 20;

    private void validateUsername(String username) {
        if (isNullOrEmpty(username)) {
            throw new MissingInputException("username");
        }
        if (!inRange(username.length(), MINIMUM_USERNAME_LENGTH, MAXIMUM_USERNAME_LENGTH)) {
            throw new InvalidUsernameFormatException("length");
        }
        if (!isAlphaNumeric(username)) {
            throw new InvalidUsernameFormatException("format");
        }
    }

    private void validatePassword(String password) {
        if (isNullOrEmpty(password)) {
            throw new MissingInputException("password");
        }
        if (!inRange(password.length(), MINIMUM_PASSWORD_LENGTH, MAXIMUM_PASSWORD_LENGTH)) {
            throw new InvalidPasswordFormatException("length");
        }
    }

    private void validateNickname(String nickname) {
        if (isNullOrEmpty(nickname)) {
            throw new MissingInputException("nickname");
        }
        if (!inRange(nickname.length(), 1, MAXIMUM_NICKNAME_LENGTH)) {
            throw new InvalidNicknameFormatException("nick name length");
        }

    }
    public void validateUser(User user) {
        // 입력값 존재 검사
        validateUsername(user.getUsername());
        validatePassword(user.getPassword());
        validateNickname(user.getNickname());
    }
    public void validateGallery(GallerySignupDto dto) {
        validateUsername(dto.getUsername());
        validatePassword(dto.getPassword());
    }

    public void validatePassword(PasswordUpdateDto dto) {
        validatePassword(dto.getNewPassword());
    }
}