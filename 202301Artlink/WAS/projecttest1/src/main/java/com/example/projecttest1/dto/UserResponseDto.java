package com.example.projecttest1.dto;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
public class UserResponseDto {
    private final String username;
    private final Long phoneNumber;
    private final String nickname;
}
