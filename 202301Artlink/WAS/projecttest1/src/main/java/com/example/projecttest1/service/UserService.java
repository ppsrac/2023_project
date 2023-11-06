package com.example.projecttest1.service;

import com.example.projecttest1.dto.UserResponseDto;
import com.example.projecttest1.dto.UserUpdateDto;
import com.example.projecttest1.entity.User;
import com.example.projecttest1.exception.auth.UserAlreadyExistsException;
import com.example.projecttest1.exception.user.UserIdNotFoundException;
import com.example.projecttest1.exception.user.UserNotFoundException;
import com.example.projecttest1.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    private UserRepository userRepository;

    @Value("${server.port}")
    private Integer PORT;


    public void registerUser(User user) {
        if (userRepository.findByUsername(user.getUsername()) != null) {
            throw new UserAlreadyExistsException("User with username " + user.getUsername() + " already exists.");
        }
        if (userRepository.existsByNickname(user.getNickname())) {
            throw new UserAlreadyExistsException("User with nickname " + user.getNickname() + " already exists.");
        }
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        user.setProfilePictureUrl(String.format("http://i9a202.p.ssafy.io:%d/static/default_profile.png", PORT));
        userRepository.save(user);
    }

    public void saveRefreshToken(String username, String refreshToken) {
        User user = userRepository.findByUsername(username);
        if (user == null) {
            throw new UserNotFoundException(user.getUsername());
        }
        user.setRefreshToken(refreshToken);
        userRepository.save(user);
        System.out.println("Userservice : saveRefreshToken call");
    }

    public void logout(String username) {
        User user = userRepository.findByUsername(username);
        if (user == null) {
            throw new UserNotFoundException(user.getUsername());
        }
        user.setRefreshToken(null);
        userRepository.save(user);
        System.out.println("UserService : removeRefreshToken call");
    }

    public User updateUser(UserUpdateDto userUpdateDto) {
        User user = userRepository.findByUsername(userUpdateDto.getUsername());
        user.setNickname(userUpdateDto.getNickname());
        return userRepository.save(user);
    }

    public List<User> findAll() {
        return userRepository.findAll();
    }

    public User findById(Integer id) {
        return userRepository.findById(id).orElseThrow(() -> new UserIdNotFoundException(id));
    }

    public String getProfilePicture(String username) {
        return userRepository.findByUsername(username).getProfilePictureUrl();
    }

    public void setNewPassword(String username, String newPassword) {
        User user = userRepository.findByUsername(username);
        user.setPassword(bCryptPasswordEncoder.encode(newPassword));
        userRepository.save(user);
    }
}
