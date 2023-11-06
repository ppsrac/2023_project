package com.example.projecttest1.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class IndexController {
    @GetMapping("/health-check")
    public String healthCheck() {
        System.out.println("check");
        return "running";
    }
}

