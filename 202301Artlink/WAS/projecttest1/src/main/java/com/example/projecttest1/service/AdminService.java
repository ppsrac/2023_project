package com.example.projecttest1.service;

import com.example.projecttest1.entity.Admin;
import com.example.projecttest1.exception.auth.AdminAlreadyExistsException;
import com.example.projecttest1.exception.user.UserNotFoundException;
import com.example.projecttest1.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AdminService {

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    public void registerAdmin(Admin admin) {
        if (adminRepository.findByUsername(admin.getUsername()) != null) {
            throw new AdminAlreadyExistsException("Admin with username " + admin.getUsername() + " already exists.");
        }
        admin.setPassword(bCryptPasswordEncoder.encode(admin.getPassword()));
        adminRepository.save(admin);
    }

    public void saveRefreshToken(String username, String refreshToken) {
        Admin admin = adminRepository.findByUsername(username);
        if (admin == null) {
            throw new UserNotFoundException(admin.getUsername());
        }
        admin.setRefreshToken(refreshToken);
        adminRepository.save(admin);
        System.out.println("Adminservice : saveRefreshToken call");
    }

}
