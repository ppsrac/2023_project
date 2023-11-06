package com.example.projecttest1.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Service
public class ImageService {
//    @Value("${file.upload-dir}")
    private String uploadDir = "C:\\Users\\SSAFY\\Documents\\resources";

    public String saveImage(MultipartFile file, String username) throws IOException {
        // 유저 아이디로 폴더 생성
        Path uploadPath = Paths.get(uploadDir, username);
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        // 이미지에 고유한 이름 생성
        String fileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();

        // 이미지 저장
        Path filePath = uploadPath.resolve(fileName);
        Files.copy(file.getInputStream(), filePath);

        // 저장된 이미지의 경로를 반환
        return fileName;
    }

    public byte[] loadImage(String filename) throws IOException {
        Path imagePath = Paths.get(uploadDir, filename);
        return Files.readAllBytes(imagePath);
    }
}
