package com.example.projecttest1.service;

import com.example.projecttest1.dto.ArtWorkResponseDto;
import com.example.projecttest1.entity.ArtWork;
import com.example.projecttest1.entity.Exhibition;
import com.example.projecttest1.entity.UserKey;
import com.example.projecttest1.entity.Gallery;
import com.example.projecttest1.repository.PostEventRepository;
import com.example.projecttest1.repository.UserKeyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.projecttest1.entity.PostEvent;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class PostEventService {
    @Autowired
    private PostEventRepository postEventRepository;

    @Autowired
    private UserKeyRepository userKeyRepository;

    // HashKey로 데이터 불러오기
    public Map<String, Object> getPostEventByUserKey(String hashKey){
        try{
            UserKey userKey = userKeyRepository.findKey(hashKey);
            List<PostEvent> eventList = postEventRepository.getPostEventsByUserKey(userKey);

            List<ArtWork> artworklist = new ArrayList<ArtWork>();
            for(PostEvent event : eventList){
                ArtWork artwork = event.getArtWork();
                artworklist.add(artwork);
            }

            List<ArtWorkResponseDto> artWorkResponseDtoList = new ArrayList<ArtWorkResponseDto>();
            for(ArtWork artwork: artworklist){
                artWorkResponseDtoList.add(new ArtWorkResponseDto(artwork.getId(), artwork.getName(), artwork.getPaintPath()));
            }

            ArtWork artwork = artworklist.get(0);
            Exhibition exhibition = artwork.getExhibition();
            Gallery gallery = exhibition.getGallery();

            Map<String, Object> result = new HashMap<>();
            result.put("exhibitionID", exhibition.getId());
            result.put("exhibitionName", exhibition.getExhibitionName());
            result.put("exhibitionUrl", exhibition.getExhibitionUrl());
            result.put("exhibitionDescription", exhibition.getExhibitionExplanation());
            result.put("galleryID", gallery.getId());
            result.put("galleryName", gallery.getGalleryName());
            result.put("visitDate", userKey.getVisitDate());
            result.put("workList", artWorkResponseDtoList);

            return result;
        }
        catch(Exception e) {
            e.printStackTrace();
            throw e;
        }
    }

    //TODO: 장고 서버에 nearby api 요청 후 데이터 받아오기.

}
