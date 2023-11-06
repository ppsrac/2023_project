package com.example.projecttest1.dto;

import lombok.Data;

@Data
public class LoginRequestDto {
    private String username;
    private String password;
    private String role = "USER";
}
