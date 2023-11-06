package com.example.projecttest1.controller;

import com.example.projecttest1.dto.GalleryResponseDto;
import com.example.projecttest1.dto.UserResponseDto;
import com.example.projecttest1.dto.gallery.GallerySignupDto;
import com.example.projecttest1.entity.Admin;
import com.example.projecttest1.entity.User;
import com.example.projecttest1.service.AdminService;
import com.example.projecttest1.service.GalleryService;
import com.example.projecttest1.service.UserService;
import com.example.projecttest1.service.validator.UserSignupValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private AdminService adminService;

    @Autowired
    private GalleryService galleryService;

    @Autowired
    private UserSignupValidator validator;


    @PostMapping("/signup")
    public ResponseEntity<UserResponseDto> signup(@RequestBody User user) {
        validator.validateUser(user);
        userService.registerUser(user);
        System.out.println("AuthController : 회원가입 완료");
        UserResponseDto dto = new UserResponseDto(user.getUsername(), user.getPhoneNumber(), user.getNickname());
        return ResponseEntity.ok(dto);
    }

    @PostMapping("/signup/galleries")
    public ResponseEntity<GalleryResponseDto> gallerySignup(@RequestBody GallerySignupDto requestDto) {
        validator.validateGallery(requestDto);
        galleryService.registerGallery(requestDto);
        GalleryResponseDto dto = new GalleryResponseDto(requestDto.getUsername(), requestDto.getGalleryName(),
                Boolean.FALSE, "");
        return ResponseEntity.ok(dto);
    }

    @PostMapping("/signup/admin")
    public String adminSignup(@RequestBody Admin admin) {
        adminService.registerAdmin(admin);
        return "관리자 계정 생성 완료";
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout(HttpServletRequest request) {
        String username = (String) request.getAttribute("username");
        userService.logout(username);
        return ResponseEntity.ok().body("logout");
    }

}
