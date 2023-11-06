package com.example.projecttest1.controller;

import com.example.projecttest1.dto.*;
import com.example.projecttest1.dto.gallery.GallerySignupDto;
import com.example.projecttest1.entity.Gallery;
import com.example.projecttest1.entity.User;
import com.example.projecttest1.service.GalleryService;
import com.example.projecttest1.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private UserService userService;

    @Autowired
    private GalleryService galleryService;

    @GetMapping("/users")
    private ResponseEntity<Map<String, List<UserDetailResponseDto>>> findAllUsers() {
        List<UserDetailResponseDto> usersDto = new ArrayList<>();
        userService.findAll().forEach( u -> usersDto.add(
                new UserDetailResponseDto(u.getId(), u.getUsername(), u.getPhoneNumber(), u.getNickname(), u.getProfilePictureUrl())));
        return ResponseEntity.ok(Map.of("users", usersDto));
    }

    @GetMapping("/users/{id}")
    private ResponseEntity<UserDetailResponseDto> findByIdUser(@PathVariable Integer id) {
        User user = userService.findById(id);
        UserDetailResponseDto responseDto = new UserDetailResponseDto(
                user.getId(), user.getUsername(),
                user.getPhoneNumber(), user.getNickname(), user.getProfilePictureUrl());
        return ResponseEntity.ok(responseDto);
    }

    @GetMapping("/galleries")
    public ResponseEntity<Map<String, List<GalleryManagementDto>>> findAllGalleries() {
        List<GalleryManagementDto> galleriesDto = new ArrayList<>();
        galleryService.findAll().forEach( g -> galleriesDto.add(new GalleryManagementDto(g.getId(), g.getUsername(), g.getGalleryName(), g.getAccepted(), g.getDescription())));
        return ResponseEntity.ok(Map.of("galleries", galleriesDto));
    }

    @GetMapping("/galleries/{id}")
    public ResponseEntity<GalleryManagementDto> findByIdGallery(@PathVariable Integer id) {
        Gallery gallery = galleryService.findById(id);
        GalleryManagementDto responseDto = new GalleryManagementDto(gallery.getId(), gallery.getUsername(), gallery.getGalleryName(), gallery.getAccepted(), gallery.getDescription());
        return ResponseEntity.ok(responseDto);
    }

    @PatchMapping("/galleries/{id}/accept")
    public ResponseEntity<GalleryManagementDto> acceptGallery(@PathVariable Integer id) {
        Gallery gallery = galleryService.acceptGallery(id);
        GalleryManagementDto responseDto = new GalleryManagementDto(gallery.getId(), gallery.getUsername(), gallery.getGalleryName(), gallery.getAccepted(), gallery.getDescription());
        return ResponseEntity.ok(responseDto);
    }


    @PostMapping("/galleries")
    public ResponseEntity<GallerySignupResponseDto> createGallery(@RequestBody GallerySignupDto requestDto) {
        System.out.println(requestDto);
        galleryService.registerGallery(requestDto);
        Gallery gallery = galleryService.findByUsername(requestDto.getUsername());
        GallerySignupResponseDto dto = new GallerySignupResponseDto(gallery.getUsername(), gallery.getGalleryName(), gallery.getDescription());
        return ResponseEntity.ok(dto);
    }
}
