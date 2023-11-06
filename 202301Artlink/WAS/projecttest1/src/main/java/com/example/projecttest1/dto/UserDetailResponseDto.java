package com.example.projecttest1.dto;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
public class UserDetailResponseDto {
    private final Integer id;
    private final String username;
    private final Long phoneNumber;
    private final String nickname;
    private final String userImageUrl;
}
