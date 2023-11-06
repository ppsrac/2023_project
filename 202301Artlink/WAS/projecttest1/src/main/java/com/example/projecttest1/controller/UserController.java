package com.example.projecttest1.controller;

import com.example.projecttest1.config.auth.PrincipalDetails;
import com.example.projecttest1.dto.PasswordUpdateDto;
import com.example.projecttest1.dto.UserKeyResponseDto;
import com.example.projecttest1.dto.UserResponseDto;
import com.example.projecttest1.dto.UserUpdateDto;
import com.example.projecttest1.entity.User;
import com.example.projecttest1.entity.UserKey;
import com.example.projecttest1.exception.user.UserAuthorizationException;
import com.example.projecttest1.helper.S3Uploader;
import com.example.projecttest1.repository.UserKeyRepository;
import com.example.projecttest1.repository.UserRepository;
import com.example.projecttest1.service.UserService;
import com.example.projecttest1.service.validator.UserSignupValidator;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private UserKeyRepository userKeyRepository;

    @Autowired
    private S3Uploader s3Uploader;

    @Autowired
    private UserSignupValidator validator;

    @Value("${server.port}")
    private Integer PORT;

    private String DEFAULT_URL = String.format("http://43.201.84.42:%d/static/default_profile.png", PORT);
    @GetMapping("/me")
    public ResponseEntity<UserResponseDto> me(HttpServletRequest request) {
        String username = (String) request.getAttribute("username");
        User user = userRepository.findByUsername(username);
        return ResponseEntity.ok(new UserResponseDto(user.getUsername(), user.getPhoneNumber(), user.getNickname()));
    }

    @PutMapping("/me")
    public ResponseEntity<UserResponseDto> updateMe(@RequestBody UserUpdateDto userUpdateDto, HttpServletRequest request) {
        String username = (String) request.getAttribute("username");
        if (!userUpdateDto.getUsername().equals(username)) {
            throw new UserAuthorizationException("권한없음");
        }
        User user = userService.updateUser(userUpdateDto);
        return ResponseEntity.ok(new UserResponseDto(user.getUsername(), user.getPhoneNumber(), user.getNickname()));
    }

    @PutMapping("/me/profile-picture")
    public ResponseEntity<?> uploadProfilePicture(HttpServletRequest request, @RequestParam MultipartFile file) throws IOException {
        // 유저 찾기
        String username = (String) request.getAttribute("username");
        User user = userRepository.findByUsername(username);

        String folder = String.format("user/profile/%d", user.getId());


        String imageUrl = user.getProfilePictureUrl();
        try {
            if (imageUrl.equals(DEFAULT_URL)) {
                imageUrl = s3Uploader.upload(folder, user.getUsername(), file);
            } else {
                imageUrl = s3Uploader.modify(folder, user.getUsername(), file);
            }
        } catch (Exception e) {
            throw new RuntimeException(e);
        }


        // 유저 레코드 업데이트
        user.setProfilePictureUrl(imageUrl);
        userRepository.save(user);

        // 응답 반환
        return ResponseEntity.ok().build();
    }

    @GetMapping("/me/profile-picture")
    public ResponseEntity<Map<String, String>> getProfilePicture(HttpServletRequest request) throws IOException {

        String username = (String) request.getAttribute("username");
        System.out.println("username : " + username);

        String url = userService.getProfilePicture(username);
        // 이미지 반환
        if (url == null || url.length() == 0) {
            url = DEFAULT_URL;
        }
        return ResponseEntity.ok(Map.of("profilePicture", url));
    }

    @PatchMapping("/me/password")
    public ResponseEntity<String> setNewPassword(@RequestBody PasswordUpdateDto dto, Authentication authentication) {
        System.out.println(dto);
        validator.validatePassword(dto);
        String newPassword = dto.getNewPassword();
        String username = ((PrincipalDetails)authentication.getPrincipal()).getUsername();
        userService.setNewPassword(username, newPassword);
        return ResponseEntity.ok("Password changed successfully");
    }


    //TODO: User UserKey 반환
    @GetMapping("/me/userkeys")
    public ResponseEntity getUserKeys(HttpServletRequest request){
        try{
            //유저 찾기...?
            User user = userRepository.findByUsername((String) request.getAttribute("username"));

            //유저 키 찾기
            List<UserKey> userKeys = userKeyRepository.findByUser(user);
            List<UserKeyResponseDto> responseDtoList = new ArrayList<UserKeyResponseDto>();
            for(UserKey userKey : userKeys){
                responseDtoList.add(new UserKeyResponseDto(userKey.getHashKey(), userKey.getExhibition().getId(),
                        userKey.getExhibition().getExhibitionUrl(), userKey.getExhibition().getExhibitionExplanation(),
                        userKey.getExhibition().getExhibitionName(),
                        userKey.getExhibition().getGallery().getGalleryName(),
                        userKey.getVisitDate(), userKey.getExhibition().getPosterUrl()
                ));
            }
            if (responseDtoList.isEmpty()) {
                responseDtoList.add(new UserKeyResponseDto("", 1, "", "", "", "", LocalDate.of(2023, 8, 9), ""));
            }
            return new ResponseEntity<List<UserKeyResponseDto>>(responseDtoList, HttpStatus.OK);
        } catch (Exception e){
            e.printStackTrace();
            throw e;
        }

    }
}
