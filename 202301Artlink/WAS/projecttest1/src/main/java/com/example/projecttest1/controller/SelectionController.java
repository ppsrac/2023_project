package com.example.projecttest1.controller;

import com.example.projecttest1.service.ArtWorkService;
import com.example.projecttest1.service.DeviceService;
import com.example.projecttest1.service.SelectionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@Controller
@RequestMapping("/selections")
@RequiredArgsConstructor
public class SelectionController {
    private final ArtWorkService artWorkService;
    private final DeviceService deviceService;
    private final SelectionService selectionService;


    //TODO: 그림은 하나씩만!
    @PostMapping("/devices/{deviceId}")
    public ResponseEntity pickPainting(@PathVariable Long deviceId, @RequestBody Map<String, Object> mp) throws Exception{
        try{
            Long drawingId = Long.parseLong(String.valueOf(mp.get("drawingId")));
            System.out.println(drawingId);
            selectionService.selectArtWork(deviceId, drawingId);
            Map<String, String> msg = new HashMap<String, String>();
            msg.put("Status", "Artwork Selected");
            return new ResponseEntity(msg, HttpStatus.OK);
        }
        catch (Exception e){
            throw e;
        }
    }

    @DeleteMapping("/devices/{deviceId}")
    public ResponseEntity deletePainting(@PathVariable Long deviceId){
        try{
            selectionService.deleteSingle(deviceId);
            Map<String, String> msg = new HashMap<String, String>();
            msg.put("Status", "Artwork Deleted");
            return new ResponseEntity(msg, HttpStatus.OK);
        }
        catch (Exception e){
            return new ResponseEntity(e, HttpStatus.BAD_REQUEST);
        }
    }
}