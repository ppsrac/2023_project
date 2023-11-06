package com.example.projecttest1.dto;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Data
public class ArtWorkResponseDto {
    private final Long artworkId;
    private final String paintName;
    private final String paintPath;
}
