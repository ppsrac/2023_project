package com.example.projecttest1.controller;

import com.example.projecttest1.dto.ArtWorkDto;
import com.example.projecttest1.dto.ErrorResponseDto;
import com.example.projecttest1.dto.NearByArtWorkDto;
import com.example.projecttest1.dto.NearbyDto;
import com.example.projecttest1.entity.ArtWork;
import com.example.projecttest1.helper.Helper;
import com.example.projecttest1.repository.ArtWorkRepository;
import com.example.projecttest1.service.ArtWorkService;
import com.example.projecttest1.service.DeviceService;
import com.example.projecttest1.service.SelectionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequiredArgsConstructor
@RequestMapping("/artWork")
public class ArtWorkController {
    private final Helper helper;
    private final ArtWorkService artWorkService;
    private final DeviceService deviceService;
    private final SelectionService selectionService;
    private final ArtWorkRepository artWorkRepository;

    @PostMapping
    public ResponseEntity<ArtWork> addArtWork(@RequestBody ArtWork artWork){
        try{
            artWorkService.addArtWork(artWork);
            return new ResponseEntity<ArtWork>(artWork, HttpStatus.OK);
        }catch (Exception e){
            e.printStackTrace();
            throw e;
        }
    }

    @GetMapping("/drawings/{drawingId}/nearby")
    public ResponseEntity<?> getNearByArtWork(@PathVariable Long drawingId) throws Exception{
        try {
            //장고 요청 서버
            String djangoPath = "https://i9a202.p.ssafy.io/bridge/artwork/getnearby/artwork/" + drawingId.toString() + "/";
            System.out.println(djangoPath);
            Map<String, Object> msg = helper.getSendMsg(djangoPath);
            List<Long> artWorkIndexList = (List<Long>) msg.get("msg");
            List<NearByArtWorkDto> artWorkResponse = new ArrayList<NearByArtWorkDto>();
            for (Long index : artWorkIndexList) {
                ArtWork artWork = artWorkRepository.findById(index);
                artWorkResponse.add(new NearByArtWorkDto(artWork.getId(),
                        artWork.getName(),
                        artWork.getPaintPath()));
            }

            Map<String, Object> response = new HashMap<String, Object>();
            response.put("NearbyDrawing", response);

            return new ResponseEntity<>(response, HttpStatus.OK);
        }catch(Exception e){
            e.printStackTrace();
            return new ResponseEntity<ErrorResponseDto>(new ErrorResponseDto(e.getMessage(), 400), HttpStatus.BAD_REQUEST);
        }
    }


}
