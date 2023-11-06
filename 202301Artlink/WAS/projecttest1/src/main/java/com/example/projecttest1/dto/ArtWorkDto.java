package com.example.projecttest1.dto;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
public class ArtWorkDto {
    private final Long id;

    private final String name;

    private final String artist;

    private final double locationX;

    private final double locationY;

    private final String drawingPath;

    private final String description;

}
