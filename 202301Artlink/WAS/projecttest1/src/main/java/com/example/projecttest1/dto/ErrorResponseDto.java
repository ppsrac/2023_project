package com.example.projecttest1.dto;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Data
public class ErrorResponseDto {
    private final String message;
    private final Integer code;
}
