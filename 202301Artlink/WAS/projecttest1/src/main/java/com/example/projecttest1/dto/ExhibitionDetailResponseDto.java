package com.example.projecttest1.dto;

import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.time.LocalDate;

@RequiredArgsConstructor
@Data
public class ExhibitionDetailResponseDto {
    private final Integer id;
    private final LocalDate createdAt;
    private final String exhibitionName;
    private final String exhibitionExplanation;
    private final String exhibitionUrl;
    private final String posterUrl;
}
