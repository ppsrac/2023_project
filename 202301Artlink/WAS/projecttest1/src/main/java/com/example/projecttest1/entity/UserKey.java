package com.example.projecttest1.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.*;
import com.example.projecttest1.entity.User;
@Getter
@Setter
@Entity
@NoArgsConstructor
public class UserKey {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "userkey_pk")
    private Long id;

    @Column
    private String hashKey;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_pk")
    private User user;

    @Column
    private LocalDate visitDate;

    @Column
    private Long phoneNumber;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "gallery_pk")
    private Gallery gallery;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "exhibition_pk")
    private Exhibition exhibition;

    @OneToMany(mappedBy = "userKey", cascade = CascadeType.ALL)
    public List<PostEvent> postEvents;
}
