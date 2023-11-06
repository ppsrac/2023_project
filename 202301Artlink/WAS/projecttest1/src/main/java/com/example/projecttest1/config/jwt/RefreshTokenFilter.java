package com.example.projecttest1.config.jwt;

import com.example.projecttest1.entity.User;
import com.example.projecttest1.repository.UserRepository;
import com.google.gson.Gson;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.Reader;
import java.util.Map;

@RequiredArgsConstructor
public class RefreshTokenFilter extends OncePerRequestFilter {
    private AntPathRequestMatcher matcher = new AntPathRequestMatcher("/auth/refreshToken");
    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        if (!matcher.matches(request)) {
            filterChain.doFilter(request, response);
            return;
        }
        System.out.println("RefreshTokenFilter ....");

        Map<String,String> tokens = parseRequestJson(request);
        String refreshToken = tokens.get("refreshToken");

        String username = jwtUtil.checkToken(refreshToken);
        User user = userRepository.findByUsername(username);
        if (!user.getRefreshToken().equals(refreshToken)) {
            //리프레시토큰에러
            return;
        }
        String accessToken = jwtUtil.createToken(user, JwtProperties.ACCESS_EXPIRATION_TIME);

        response.setContentType(MediaType.APPLICATION_JSON_VALUE);

        Gson gson = new Gson();

        Map<String, String> keyMap = Map.of(
                "accessToken", accessToken);

        String jsonStr = gson.toJson(keyMap);
        response.getWriter().println(jsonStr);
    }

    private Map<String, String> parseRequestJson(HttpServletRequest request) {
        try (Reader reader = new InputStreamReader(request.getInputStream())) {
            Gson gson = new Gson();
            return gson.fromJson(reader, Map.class);
        } catch (Exception e ) {
            e.printStackTrace();
        }
        return null;
    }
}
