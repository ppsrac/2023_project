package com.example.projecttest1.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Getter
@Setter
@Entity
@NoArgsConstructor
public class PostEvent {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userkey_pk")
    private UserKey userKey;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "artWork_pk")
    private ArtWork artWork;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "gallery_pk")
    private Gallery gallery;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "exhibition_pk")
    private Exhibition exhibition;
}
