package com.example.projecttest1.service;

import com.example.projecttest1.dto.ArtWorkDto;
import com.example.projecttest1.entity.ArtWork;
import com.example.projecttest1.entity.Exhibition;
import com.example.projecttest1.repository.ArtWorkRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ArtWorkService {

    @Autowired
    private ArtWorkRepository artWorkRepository;
    public ArtWork addArtWork(String name, String artist, String explanation, double xCoor, double yCoor, String artWorkPath, Exhibition exhibition){
        ArtWork artWork = new ArtWork();
        artWork.setName(name);
        artWork.setArtist(artist);
        artWork.setExplanation(explanation);
        artWork.setXCoor(xCoor);
        artWork.setYCoor(yCoor);
        artWork.setPaintPath(artWorkPath);
        artWork.setExhibition(exhibition);
        return artWorkRepository.save(artWork);
    }

    public void addArtWork(ArtWork artWork){
        artWorkRepository.save(artWork);
    }

    public void modifyArtWork(Long artWorkId, ArtWorkDto artWorkDto) {
        ArtWork artWork = artWorkRepository.findById(artWorkId);
        if (artWorkDto.getName() != null) {

        }
    }

    public ArtWork findArtWork(Long id) {
        return artWorkRepository.findById(id);
    }
}
