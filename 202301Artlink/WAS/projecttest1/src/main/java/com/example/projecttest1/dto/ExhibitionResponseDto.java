package com.example.projecttest1.dto;

import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.time.LocalDate;

@RequiredArgsConstructor
@Data
public class ExhibitionResponseDto {
    private final Integer id;

    private final String exhibitionName;

    private final String exhibitionUrl;

    private final String posterUrl;

    private final String exhibitionExplanation;

    private final LocalDate createdAt;
}
