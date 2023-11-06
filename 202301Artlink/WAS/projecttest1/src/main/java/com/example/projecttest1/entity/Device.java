package com.example.projecttest1.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Getter
@Setter
@Entity
@NoArgsConstructor
public class Device {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "device_pk")
    private Long id;

    @Column(nullable = false)
    private Long deviceId;

    @Column(nullable = false)
    private Long phoneNumber;

    @Builder
    public Device(Long deviceId, Long phoneNumber) {
        this.deviceId = deviceId;
        this.phoneNumber = phoneNumber;
    }

    @OneToMany(mappedBy = "device", cascade = CascadeType.ALL)
    public List<Selection> selections;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "exhibition_pk")
    private Exhibition exhibition;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "gallery_pk")
    private Gallery gallery;

}
