package com.example.projecttest1.dto;

import lombok.Data;

@Data
public class UserUpdateDto {
    private String username;
    private String nickname;
    private Long phoneNumber;
}
