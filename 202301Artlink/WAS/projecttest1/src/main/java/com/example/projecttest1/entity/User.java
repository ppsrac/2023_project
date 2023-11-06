package com.example.projecttest1.entity;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.*;

@Entity
@Getter
@NoArgsConstructor
public class User implements Principal{
    @Id
    @Column(name="user_pk")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotNull
    private String username;

    @Setter
    @NotNull
    private String password;


    private Long phoneNumber;

    @Setter
    private String nickname;

    @Setter
    private String profilePictureUrl;

//    private String provider;
//    private String providerId;

    //TODO: userkeys 추가 확인 요청. 아마도 쓸모 없을것.
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<UserKey> userKeys;


    @Setter
    private String refreshToken;

    public User(String username, String password, Long phoneNumber) {
        this.username = username;
        this.password = password;
        this.phoneNumber = phoneNumber;
    }
    @Override
    public String getRole() {
        return "ROLE_USER";
    }
}
