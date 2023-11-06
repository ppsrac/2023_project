package com.example.projecttest1.repository;

import com.example.projecttest1.entity.User;
import com.example.projecttest1.entity.UserKey;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {
    User findByUsername(String username);
    boolean existsByNickname(String Nickname);

    User findByPhoneNumber(Long phoneNumber);
}
