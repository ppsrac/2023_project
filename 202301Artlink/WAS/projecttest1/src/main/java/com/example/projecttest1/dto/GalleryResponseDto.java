package com.example.projecttest1.dto;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
public class GalleryResponseDto {
    private final String username;
    private final String galleryName;
    private final Boolean accepted;
    private final String description;
}
