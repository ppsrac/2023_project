package com.example.projecttest1.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.*;

import javax.persistence.*;

@Getter
@Setter
@Entity
@NoArgsConstructor
public class ArtWork {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "artWork_pk")
    private Long id;

    @Column(length = 50, nullable = false)
    private String artist;

    @Column(length = 50, nullable = false)
    private String name;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String explanation;

    @Column
    private double xCoor;

    @Column
    private double yCoor;

    @Column
    private String paintPath;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "exhibition_pk")
    private Exhibition exhibition;

    @OneToMany(mappedBy = "artWork", cascade = CascadeType.ALL)
    private List<Selection> selections;
}
