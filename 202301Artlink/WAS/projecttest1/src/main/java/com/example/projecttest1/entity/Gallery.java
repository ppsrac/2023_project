package com.example.projecttest1.entity;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor
public class Gallery implements Principal {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "gallery_pk")
    private Integer id;

    @Setter
    private String username; // gallery_id

    @Setter
    @Column(length = 100)
    private String galleryName;

    @Setter
    private String password;

    @Setter
    @Column(columnDefinition = "TEXT", nullable = false)
    private String description;

    @Setter
    private String refreshToken;

    @Setter
    private Boolean accepted;


    @OneToMany(mappedBy = "gallery", cascade = CascadeType.ALL)
    private List<UserKey> userkeys;

    @OneToMany(mappedBy = "gallery", cascade = CascadeType.ALL)
    private List<Device> devices;

    //일대다 다대일 관계는 뒤로 빼려고 하였음.
    public Gallery(String username, String password, String galleryName) {
        this.username = username;
        this.galleryName = galleryName;
        this.password = password;
        this.accepted = Boolean.FALSE;
    }

    @Override
    public String toString() {
        return String.format(galleryName + " : " + description);
    }
    @Override
    public String getRole() {
//        if (!accepted) {
//            return "UNACCEPTED";
//        }
        return "ROLE_GALLERY";
    }
}
