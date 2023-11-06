package com.example.projecttest1.config.jwt;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTCreator;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.example.projecttest1.config.jwt.exception.JWTAuthenticationException;
import com.example.projecttest1.entity.Principal;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtUtil {
    public String createToken(Principal principal, long time) {
        return JWT.create()
                .withSubject(principal.getUsername())
                .withExpiresAt(new Date(System.currentTimeMillis() + time))
                .withClaim("id", principal.getId())
                .withClaim("username", principal.getUsername())
                .withClaim("role", principal.getRole())
                .sign(Algorithm.HMAC512(JwtProperties.SECRET));
    }
    public String checkToken(String token) throws JWTVerificationException {
        JWT.require(Algorithm.HMAC512(JwtProperties.SECRET)).build().verify(token);
        String username = JWT.decode(token).getClaim("username").asString();
        String role = JWT.decode(token).getClaim("role").asString();
        System.out.println("checkToken : " + username);
        System.out.println("role : " + role);
        return username;
    }

    public String getClaim(String token, String claim) throws JWTAuthenticationException {
//        try {
//            return JWT.require(Algorithm.HMAC512(JwtProperties.SECRET)).build().verify(token)
//                    .getClaim(claim).asString();
//        } catch (TokenExpiredException e) {
//            throw new JWTAuthenticationException(e.getMessage());
//        }
        return JWT.require(Algorithm.HMAC512(JwtProperties.SECRET)).build().verify(token)
                .getClaim(claim).asString();

    }
}
