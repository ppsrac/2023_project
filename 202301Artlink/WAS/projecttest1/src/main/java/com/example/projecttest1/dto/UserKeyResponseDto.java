package com.example.projecttest1.dto;

import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.time.LocalDate;

@Data
@RequiredArgsConstructor
public class UserKeyResponseDto {
    private final String userKey;
    private final Integer id;
    private final String exhibitionUrl;
    private final String exhibitonDescription;
    private final String exhibitionName;
    private final String galleryName;
    private final LocalDate visitDate;
    private final String posterUrl;

}
