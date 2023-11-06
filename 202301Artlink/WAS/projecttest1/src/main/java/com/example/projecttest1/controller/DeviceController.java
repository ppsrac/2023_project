package com.example.projecttest1.controller;

import com.example.projecttest1.dto.DeviceDto;
import com.example.projecttest1.dto.ErrorResponseDto;
import com.example.projecttest1.entity.Device;
import com.example.projecttest1.entity.Exhibition;
import com.example.projecttest1.entity.Gallery;
import com.example.projecttest1.repository.ExhibitionRepository;
import com.example.projecttest1.repository.GalleryRepository;
import com.example.projecttest1.repository.PostEventRepository;
import com.example.projecttest1.service.ArtWorkService;
import com.example.projecttest1.service.DeviceService;
import com.example.projecttest1.service.SelectionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Controller
@RequestMapping("/devices")
@RequiredArgsConstructor
public class DeviceController {
    private final ArtWorkService artWorkService;
    private final DeviceService deviceService;
    private final SelectionService selectionService;
    private final GalleryRepository galleryRepository;
    private final ExhibitionRepository exhibitionRepository;


    @PostMapping("/{deviceId}")
    public ResponseEntity AddVisitor(@PathVariable Long deviceId, @RequestBody Map<String, Object> mp) throws Exception {
        try{
            Long phoneNumber = (Long)mp.get("phoneNumber");
            Integer exhibitionId = (Integer)mp.get("exhibitionId");
            Optional<Exhibition> exhibition = exhibitionRepository.findById(exhibitionId);

            if(exhibition == null){
                throw new NoSuchFieldException("Could not find gallery");
            }
            Device device = deviceService.save(deviceId, phoneNumber, exhibition.get());
            return new ResponseEntity<DeviceDto>(new DeviceDto(phoneNumber), HttpStatus.OK);
        }catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<ErrorResponseDto>(new ErrorResponseDto(e.getMessage(), 400), HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/{deviceId}")
    public ResponseEntity DeleteVisitor(@PathVariable Long deviceId){
        try{
            String url = deviceService.deviceDelete(deviceId);
            Map<String, String> msg = new HashMap<String, String>();
            msg.put("Status", "OK");
            msg.put("url", url);
            return new ResponseEntity<>(url, HttpStatus.OK);
        }catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(e, HttpStatus.BAD_REQUEST);
        }
    }

}
