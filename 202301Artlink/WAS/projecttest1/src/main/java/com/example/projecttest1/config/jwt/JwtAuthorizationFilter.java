package com.example.projecttest1.config.jwt;

import com.example.projecttest1.config.auth.PrincipalDetails;
import com.example.projecttest1.entity.Principal;
import com.example.projecttest1.repository.AdminRepository;
import com.example.projecttest1.repository.GalleryRepository;
import com.example.projecttest1.repository.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class JwtAuthorizationFilter extends BasicAuthenticationFilter {

    private UserRepository userRepository;
    private AdminRepository adminRepository;
    private GalleryRepository galleryRepository;

    private JwtUtil jwtUtil;

    public JwtAuthorizationFilter(AuthenticationManager authenticationManager, UserRepository userRepository,
                                  AdminRepository adminRepository, GalleryRepository galleryRepository, JwtUtil jwtUtil) {
        super(authenticationManager);
        this.userRepository = userRepository;
        this.adminRepository = adminRepository;
        this.galleryRepository = galleryRepository;
        this.jwtUtil = jwtUtil;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws IOException, ServletException {
        String header = request.getHeader(JwtProperties.HEADER_STRING);
        if (header == null || !header.startsWith(JwtProperties.TOKEN_PREFIX)) {
            chain.doFilter(request, response);
            return;
        }
        String token = header.replace(JwtProperties.TOKEN_PREFIX, "");
        // 유저네임, role 가져오기
        String username = jwtUtil.getClaim(token, "username");
        String role = jwtUtil.getClaim(token, "role");
        if (username != null) {
            System.out.println(role);
            Principal principal = findByUsername(role, username);
            System.out.println("principal : " + principal);
            PrincipalDetails principalDetails = new PrincipalDetails(principal);
            Authentication authentication = new UsernamePasswordAuthenticationToken(
                    principalDetails, null, principalDetails.getAuthorities());
            //DEBUG
            for (GrantedAuthority g : principalDetails.getAuthorities()) {
                System.out.println(g.getAuthority());
            }
            //DEBUG END
            SecurityContextHolder.getContext().setAuthentication(authentication);

            request.setAttribute("id", principal.getId());
            request.setAttribute("username", username);
        }
        chain.doFilter(request, response);
    }
    Principal findByUsername(String role, String username) {
        if ("ROLE_USER".equals(role)) {
            return userRepository.findByUsername(username);
        } else if ("ROLE_ADMIN".equals(role)) {
            return adminRepository.findByUsername(username);
        } else if ("ROLE_GALLERY".equals(role)) {
            return galleryRepository.findByUsername(username);
        }
        return null;
    }
}
