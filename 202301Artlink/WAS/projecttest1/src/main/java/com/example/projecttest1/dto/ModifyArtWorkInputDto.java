package com.example.projecttest1.dto;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class ModifyArtWorkInputDto {
    private final String name;

    private final String artist;

    private final double locationX;

    private final double locationY;

    private final String description;

    private final MultipartFile imageFile;
}
