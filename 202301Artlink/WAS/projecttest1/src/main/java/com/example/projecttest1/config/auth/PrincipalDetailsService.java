package com.example.projecttest1.config.auth;

import com.example.projecttest1.entity.Principal;
import com.example.projecttest1.exception.user.UserNotFoundException;
import com.example.projecttest1.repository.AdminRepository;
import com.example.projecttest1.repository.GalleryRepository;
import com.example.projecttest1.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PrincipalDetailsService implements UserDetailsService {

    private final UserRepository userRepository;
    private final AdminRepository adminRepository;
    private final GalleryRepository galleryRepository;
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        String[] userInfo = username.split("#");
        Principal principal = null;
        if (userInfo[1].equals("USER")) {
            System.out.println("PrincipalDetailsService: user login");
            principal = userRepository.findByUsername(userInfo[0]);
        }
        if (userInfo[1].equals("ADMIN")) {
            System.out.println("PrincipalDetailsService: admin login");
            principal = adminRepository.findByUsername(userInfo[0]);
        }
        if (userInfo[1].equals("GALLERY")) {
            System.out.println("PrincipalDetailsService: gallery login");
            principal = galleryRepository.findByUsername(userInfo[0]);
        }
        if (principal == null) {
            throw new UserNotFoundException(username);
        }
        return new PrincipalDetails(principal);
    }
}
