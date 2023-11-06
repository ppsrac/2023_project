package com.example.projecttest1.service;

import com.example.projecttest1.dto.ExhibitionRequestDto;
import com.example.projecttest1.dto.ExhibitionResponseDto;
import com.example.projecttest1.entity.Exhibition;
import com.example.projecttest1.entity.Gallery;
import com.example.projecttest1.exception.exhibition.ExhibitionNotFoundException;
import com.example.projecttest1.repository.ExhibitionRepository;
import com.example.projecttest1.repository.GalleryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
public class ExhibitionService {

    @Autowired
    private ExhibitionRepository exhibitionRepository;

    @Autowired
    private GalleryRepository galleryRepository;

    public Exhibition registerExhibition(ExhibitionRequestDto requestDto, String username) {
        // 검증
        Gallery gallery = galleryRepository.findByUsername(username);
        Exhibition exhibition = new Exhibition();
        exhibition.setExhibitionName(requestDto.getExhibitionName());
        exhibition.setGallery(gallery);
        exhibition.setExhibitionUrl(requestDto.getExhibitionUrl());
        exhibition.setExhibitionExplanation(requestDto.getExhibitionExplanation());
        exhibition.setCreatedAt(LocalDate.now());
        return exhibitionRepository.save(exhibition);
    }

    public Exhibition findById(Integer id) {
        return exhibitionRepository.findById(id).orElseThrow(()->new ExhibitionNotFoundException("Exhibition with id " + id + " not found"));
    }

    public List<Exhibition> selectAllExhibitions(String username) {
        Gallery gallery = galleryRepository.findByUsername(username);
        return exhibitionRepository.findAllByGallery(gallery);
    }

    @Transactional
    public Exhibition modifyExhibition(ExhibitionRequestDto requestDto, Integer id) {
        Exhibition exhibition = findById(id);
        if (requestDto.getExhibitionName() != null) {
            exhibition.setExhibitionName(requestDto.getExhibitionName());
        }

        if (requestDto.getExhibitionExplanation() != null) {
            exhibition.setExhibitionExplanation(requestDto.getExhibitionExplanation());
        }

        if (requestDto.getExhibitionUrl() != null) {
            exhibition.setExhibitionUrl(requestDto.getExhibitionUrl());
        }

        return exhibition;
    }

}
