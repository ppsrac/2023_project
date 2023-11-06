package com.example.projecttest1.config.jwt.handler;

import com.example.projecttest1.config.auth.PrincipalDetails;
import com.example.projecttest1.config.jwt.JwtProperties;
import com.example.projecttest1.config.jwt.JwtUtil;
import com.example.projecttest1.entity.Principal;
import com.example.projecttest1.service.AdminService;
import com.example.projecttest1.service.UserService;
import com.google.gson.Gson;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Map;

@RequiredArgsConstructor
public class LoginSuccessHandler implements AuthenticationSuccessHandler {

    private final UserService userService;
    private final AdminService adminService;
    private final JwtUtil jwtUtil;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        System.out.println("AuthenticationSuccessHandler call()");
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);

        PrincipalDetails principalDetails = (PrincipalDetails) authentication.getPrincipal();
        Principal principal = principalDetails.getPrincipal();
        String accessToken = jwtUtil.createToken(principal, JwtProperties.ACCESS_EXPIRATION_TIME);

        String refreshToken = jwtUtil.createToken(principal, JwtProperties.REFRESH_EXPIRATION_TIME);



        if ("ROLE_USER".equals(principal.getRole())) {
            userService.saveRefreshToken(principalDetails.getUsername(), refreshToken);
            System.out.println("LoginSuccessHandler : in ROLE_uUSEr");
        }
        else if ("ROLE_ADMIN".equals(principal.getRole())) {
            adminService.saveRefreshToken(principalDetails.getUsername(), refreshToken);
            System.out.println("LoginSuccessHandler : in ROLE_Admin");
        }
        Gson gson = new Gson();

        Map<String, String> keyMap = Map.of(
                "accessToken", accessToken,
                "refreshToken", refreshToken,
                "role", principal.getRole());

        String jsonStr = gson.toJson(keyMap);

        response.getWriter().println(jsonStr);

    }
}
