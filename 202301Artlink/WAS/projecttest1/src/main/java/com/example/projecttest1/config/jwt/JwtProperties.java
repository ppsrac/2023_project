package com.example.projecttest1.config.jwt;

public interface JwtProperties {
    String SECRET = "artlink"; // 우리 서버만 알고 있는 비밀값
    long ACCESS_EXPIRATION_TIME = 1000l * 60l * 60l * 6l; // 6시간 (1/1000초)
//    long ACCESS_EXPIRATION_TIME = 1000 * 60 * 2; // 2분 (1/1000초)
    long REFRESH_EXPIRATION_TIME = 1000l * 60l * 60l * 24l * 30l;
    String TOKEN_PREFIX = "Bearer ";
    String HEADER_STRING = "Authorization";
}
