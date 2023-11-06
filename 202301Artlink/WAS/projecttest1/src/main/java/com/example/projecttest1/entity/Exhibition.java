package com.example.projecttest1.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor
public class Exhibition {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "exhibition_pk")
    private Integer id;

    @Setter
    @Column(length = 100)
    private String exhibitionName;

    @Setter
    @Column(columnDefinition = "TEXT", nullable = false)
    private String exhibitionExplanation;

    @Setter
    private String exhibitionUrl;

    @Setter
    private String posterUrl;

    @Setter
//    @CreatedDate
    private LocalDate createdAt;

    @Setter
    @ManyToOne(fetch = FetchType.LAZY)
    private Gallery gallery;

    @OneToMany(mappedBy = "exhibition", cascade = CascadeType.ALL)
    private List<UserKey> userkeys;

    @OneToMany(mappedBy = "exhibition", cascade = CascadeType.ALL)
    private List<ArtWork> artWorks;

    @OneToMany(mappedBy = "exhibition", cascade = CascadeType.ALL)
    private List<Device> devices;

    public Exhibition(String exhibitionName, Gallery gallery) {
        this.exhibitionName = exhibitionName;
        this.gallery = gallery;
    }
}
