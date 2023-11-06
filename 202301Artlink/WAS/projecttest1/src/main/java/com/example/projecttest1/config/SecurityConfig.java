package com.example.projecttest1.config;

import com.example.projecttest1.config.jwt.JwtAuthenticationFilter;
import com.example.projecttest1.config.jwt.JwtAuthorizationFilter;
import com.example.projecttest1.config.jwt.JwtUtil;
import com.example.projecttest1.config.jwt.RefreshTokenFilter;
import com.example.projecttest1.config.jwt.entrypoint.JwtAuthenticationEntryPoint;
import com.example.projecttest1.config.jwt.handler.LoginSuccessHandler;
import com.example.projecttest1.repository.AdminRepository;
import com.example.projecttest1.repository.GalleryRepository;
import com.example.projecttest1.repository.UserRepository;
import com.example.projecttest1.service.AdminService;
import com.example.projecttest1.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private GalleryRepository galleryRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private AdminService adminService;

    @Autowired
    private CorsConfig corsConfig;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;

    @Bean
    SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.exceptionHandling().authenticationEntryPoint(jwtAuthenticationEntryPoint);
        return http
                .csrf().disable()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS) // 세션 사용안함
                .and()
                .formLogin().disable()
                .httpBasic().disable()
                .apply(new MyCustomDsl())
                .and()
                .authorizeRequests(authorize -> authorize.antMatchers("/users/**")
                        .access("hasRole('ROLE_USER')")
                        .antMatchers("/galleries/**")
                        .access("hasRole('ROLE_GALLERY')")
                        .antMatchers("/admin/**")
                        .access("hasRole('ROLE_ADMIN')")
                        .anyRequest().permitAll())
                .build();
    }

     public class MyCustomDsl extends AbstractHttpConfigurer<MyCustomDsl, HttpSecurity> {
        @Override
        public void configure(HttpSecurity http) throws Exception {
            AuthenticationManager authenticationManager = http.getSharedObject(AuthenticationManager.class);
            JwtAuthenticationFilter jwtAuthenticationFilter = new JwtAuthenticationFilter(authenticationManager);
            jwtAuthenticationFilter.setFilterProcessesUrl("/auth/login");
            jwtAuthenticationFilter.setAuthenticationSuccessHandler(new LoginSuccessHandler(userService, adminService, jwtUtil));

            http.addFilterBefore(new RefreshTokenFilter(userRepository, jwtUtil), JwtAuthenticationFilter.class);
            http
                    .addFilter(corsConfig.corsFilter())
                    .addFilter(jwtAuthenticationFilter)
                    .addFilter(new JwtAuthorizationFilter(authenticationManager,
                            userRepository, adminRepository, galleryRepository, jwtUtil));
        }
    }
}
