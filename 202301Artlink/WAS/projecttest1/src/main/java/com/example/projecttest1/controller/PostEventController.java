package com.example.projecttest1.controller;

import com.example.projecttest1.dto.ErrorResponseDto;
import com.example.projecttest1.dto.SimpleMsgDto;
import com.example.projecttest1.entity.ArtWork;
import com.example.projecttest1.entity.PostEvent;
import com.example.projecttest1.repository.ArtWorkRepository;
import com.example.projecttest1.repository.PostEventRepository;
import com.example.projecttest1.repository.UserKeyRepository;
import com.example.projecttest1.service.PostEventService;
import com.example.projecttest1.entity.UserKey;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/postevents")
@RequiredArgsConstructor
public class PostEventController {

    private final PostEventService postEventService;
    private final PostEventRepository postEventRepository;
    private final UserKeyRepository userKeyRepository;
    private final ArtWorkRepository artWorkRepository;

    @GetMapping("/{Key}")
    @ResponseBody
    public ResponseEntity getDataByKey(@PathVariable String Key){
        try{
            Map<String, Object> response = new HashMap<String, Object>();
            response = postEventService.getPostEventByUserKey(Key);
            return new ResponseEntity(response, HttpStatus.OK);
        }
        catch(Exception e){
            e.printStackTrace();
            return new ResponseEntity<ErrorResponseDto>(new ErrorResponseDto(e.getMessage(), 400), HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/{Key}")
    public ResponseEntity<?> putPostEvent(@PathVariable String Key, @RequestBody Map<String, Object> request){
        try{
            // 두 Drawing의 ID를 request body에서 불러온다.
            Integer Origin = (Integer) request.get("OriginalDrawingID");
            Integer After = (Integer) request.get("AfterDrawingID");

            Long originalDrawingID = Origin.longValue();
            Long afterDrawingID = After.longValue();

            // PathVariable에 해당하는 UserKey를 불러온다.
            UserKey userKey = userKeyRepository.findKey(Key);
            // 해당 UserKey에 대한 List<PostEvent>를 불러온다.
            List<PostEvent> postEventList = postEventRepository.getPostEventsByUserKey(userKey);

            ArtWork OriginalArtWork = artWorkRepository.findById(originalDrawingID);
            ArtWork AfterArtWork = artWorkRepository.findById(afterDrawingID);
            for(PostEvent postEvent: postEventList){
                ArtWork artWork = postEvent.getArtWork();
                if(artWork == OriginalArtWork){
                    artWork = AfterArtWork;
                    break;
                }
            }

            Map<String, Object> msg = new HashMap<String, Object>();
            msg.put("msg", "ok");
            return new ResponseEntity<>(msg, HttpStatus.OK);
        }
        catch(Exception e){
            e.printStackTrace();
            return new ResponseEntity<ErrorResponseDto>(new ErrorResponseDto(e.getMessage(), 400), HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/{Key}/drawings/{drawingId}")
    public ResponseEntity<?> deletePostEvnetDrawings(@PathVariable String Key, @PathVariable Long drawingId){
        try{
            UserKey userKey = userKeyRepository.findKey(Key);
            ArtWork artWork = artWorkRepository.findById(drawingId);
            postEventRepository.deletePostEvent(userKey, artWork);
            return new ResponseEntity<SimpleMsgDto>(new SimpleMsgDto("Successfully deleted drawing"), HttpStatus.OK);
        }catch(Exception e){
            e.printStackTrace();
            return new ResponseEntity<ErrorResponseDto>(new ErrorResponseDto(e.getMessage(), 400), HttpStatus.BAD_REQUEST);
        }
    }
}
