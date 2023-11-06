package com.example.projecttest1.dto;

import lombok.Data;

import java.util.List;
import java.util.Map;

@Data
public class NearbyDto {
    private Map<String, List<Object>> nearbyList;
}
