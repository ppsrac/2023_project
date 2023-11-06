package com.example.projecttest1.controller;

import com.example.projecttest1.config.auth.PrincipalDetails;
import com.example.projecttest1.dto.*;
import com.example.projecttest1.entity.ArtWork;
import com.example.projecttest1.entity.Device;
import com.example.projecttest1.entity.Exhibition;
import com.example.projecttest1.entity.Gallery;
import com.example.projecttest1.exception.django.DjangoFailedException;
import com.example.projecttest1.helper.Helper;
import com.example.projecttest1.helper.S3Uploader;
import com.example.projecttest1.repository.ArtWorkRepository;
import com.example.projecttest1.repository.ExhibitionRepository;
import com.example.projecttest1.repository.GalleryRepository;
import com.example.projecttest1.service.ArtWorkService;
import com.example.projecttest1.service.ExhibitionService;
import com.example.projecttest1.service.GalleryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.relational.core.sql.In;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.annotation.MultipartConfig;
import javax.servlet.http.HttpServletRequest;
import java.util.*;

@RestController
@RequestMapping("/galleries")
public class GalleryController {

    @Autowired
    private GalleryService galleryService;

    @Autowired
    private GalleryRepository galleryRepository;

    @Autowired
    private ExhibitionRepository exhibitionRepository;

    @Autowired
    private ExhibitionService exhibitionService;

    @Autowired
    private ArtWorkRepository artWorkRepository;

    @Autowired
    private ArtWorkService artWorkService;

    @Autowired
    private Helper helper;

    @Autowired
    private S3Uploader s3Uploader;

    @GetMapping("/me")
    public ResponseEntity<GalleryResponseDto> me(HttpServletRequest request) {
        String username = (String) request.getAttribute("username");
        Gallery gallery = galleryService.findByUsername(username);
        return ResponseEntity.ok(new GalleryResponseDto(gallery.getUsername(), gallery.getGalleryName(),
                gallery.getAccepted(), gallery.getDescription()));
    }

    @PutMapping("/me")
    public ResponseEntity<GalleryResponseDto> updateMe(@RequestBody GalleryUpdateDto updateDto, Authentication authentication) {
        String username = ((PrincipalDetails)authentication.getPrincipal()).getUsername();
        updateDto.setUsername(username);
        System.out.println("dto " + updateDto);
        Gallery gallery = galleryService.updateGallery(updateDto);
        GalleryResponseDto responseDto = new GalleryResponseDto(gallery.getUsername(), gallery.getGalleryName(),
                gallery.getAccepted(), gallery.getDescription());
        return ResponseEntity.ok(responseDto);
    }

    @PostMapping("/me/exhibitions")
    public ResponseEntity<ExhibitionDetailResponseDto> registerExhibition(@RequestBody ExhibitionRequestDto requestDto, HttpServletRequest request)
    throws Exception{
        String username = (String) request.getAttribute("username");
        Exhibition exhibition = exhibitionService.registerExhibition(requestDto, username);

        Map<String, Object> sendMsg = new HashMap<String, Object>();
        String path = "https://i9a202.p.ssafy.io/bridge/exhibition/";
        sendMsg.put("id", exhibition.getId());


        int statuscode = helper.postSendMsg(path, sendMsg);
        if(statuscode != 201){
            throw new DjangoFailedException("Django failed");
        }

        ExhibitionDetailResponseDto responseDto = new ExhibitionDetailResponseDto(exhibition.getId(),
                exhibition.getCreatedAt(), exhibition.getExhibitionName(),
                exhibition.getExhibitionExplanation(), exhibition.getExhibitionUrl(), exhibition.getPosterUrl());
        return ResponseEntity.ok(responseDto);
    }

    @GetMapping("/me/exhibitions")
    public ResponseEntity<Map<String, List<ExhibitionResponseDto>>> selectAllExhibitions(HttpServletRequest request, Authentication authentication) {
        System.out.println(authentication);
        String username = (String) request.getAttribute("username");
        List<Exhibition> exhibitions = exhibitionService.selectAllExhibitions(username);
        List<ExhibitionResponseDto> exhibitionResponseDtos = new ArrayList<>();
        exhibitions.forEach(exhibition -> exhibitionResponseDtos.add(new ExhibitionResponseDto(exhibition.getId(),
                exhibition.getExhibitionName(), exhibition.getExhibitionUrl(), exhibition.getPosterUrl(),
                exhibition.getExhibitionExplanation(),
                exhibition.getCreatedAt())));
        return ResponseEntity.ok(Map.of("exhibitions", exhibitionResponseDtos));
    }

    @GetMapping("/me/exhibitions/{id}")
    public ResponseEntity<ExhibitionDetailResponseDto> selectExhibition(
            HttpServletRequest request, Authentication authentication, @PathVariable Integer id) {
        System.out.println(((PrincipalDetails)authentication.getPrincipal()).getUsername());
        Exhibition exhibition = exhibitionService.findById(id);
        return ResponseEntity.ok(new ExhibitionDetailResponseDto(exhibition.getId(), exhibition.getCreatedAt(),
                exhibition.getExhibitionName(), exhibition.getExhibitionExplanation(), exhibition.getExhibitionUrl(), exhibition.getPosterUrl()));
    }

    @PutMapping("/me/exhibitions/{id}")
    public ResponseEntity<ExhibitionDetailResponseDto> modifyExhibition(
            @RequestBody ExhibitionRequestDto requestDto, HttpServletRequest request, @PathVariable Integer id) {
        String username = (String) request.getAttribute("username");
        Exhibition exhibition = exhibitionService.modifyExhibition(requestDto, id);
        ExhibitionDetailResponseDto responseDto = new ExhibitionDetailResponseDto(exhibition.getId(),
                exhibition.getCreatedAt(), exhibition.getExhibitionName(),
                exhibition.getExhibitionExplanation(), exhibition.getExhibitionUrl(), exhibition.getPosterUrl());
        return ResponseEntity.ok(responseDto);
    }

    //TODO:갤러리 관리자 그림 조회: Done
    //GalleryArtWorkResponseDto 사용.
    @GetMapping("/me/exhibitions/{exhibitionId}/artworks")
    public ResponseEntity<?> getGalleryArtwork(HttpServletRequest request, Authentication authentication, @PathVariable Integer exhibitionId){
        try {
            Exhibition exhibition = exhibitionService.findById(exhibitionId);
            List<ArtWork> artWorkList = exhibition.getArtWorks();

            List<ArtWorkDto> galleryArtWorkList = new ArrayList<ArtWorkDto>();
            for (ArtWork artWork : artWorkList) {
                galleryArtWorkList.add(new ArtWorkDto(
                        artWork.getId(),
                        artWork.getName(),
                        artWork.getArtist(),
                        artWork.getXCoor(),
                        artWork.getYCoor(),
                        artWork.getPaintPath(),
                        artWork.getExplanation()
                        ));
            }
            Map<String, Object> msg = new HashMap<String, Object>();
            msg.put("DrawingList", galleryArtWorkList);
            return new ResponseEntity<Map<String, Object>>(msg, HttpStatus.OK);
        }
        catch(Exception e){
            e.printStackTrace();
            return new ResponseEntity<ErrorResponseDto>(new ErrorResponseDto("Get Drawing Failed", 400), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/me/exhibitions/{exhibitionId}/artworks")
    public ResponseEntity<?> postGalleryArtwork(HttpServletRequest request, Authentication authentication, @PathVariable Integer exhibitionId,
                                                @ModelAttribute ArtWorkInputDto artWorkInputDto) throws Exception {
        try{
            //그림만 모아두는 폴더를 만들 예정.
            String folder = String.format("artworks/%d", exhibitionId);
            String ImageUrl = s3Uploader.upload(folder, artWorkInputDto.getName(), artWorkInputDto.getImageFile());
            Exhibition exhibition = exhibitionService.findById(exhibitionId);
            ArtWork artWork = artWorkService.addArtWork(
                    artWorkInputDto.getName(),
                    artWorkInputDto.getArtist(),
                    artWorkInputDto.getDescription(),
                    artWorkInputDto.getLocationX(),
                    artWorkInputDto.getLocationY(),
                    ImageUrl,
                    exhibition
            );

            ArtWorkDto artWorkDto = new ArtWorkDto(
                    artWork.getId(),
                    artWork.getName(),
                    artWork.getArtist(),
                    artWork.getXCoor(),
                    artWork.getYCoor(),
                    ImageUrl,
                    artWork.getExplanation()
            );
            //Send the data to Django server.
            Map<String, Object> sendMsg = new HashMap<String, Object>();
            String path = "https://i9a202.p.ssafy.io/bridge/artwork/";

            sendMsg.put("exhibitionid", exhibition.getId());
            sendMsg.put("artworkid", artWork.getId());
            sendMsg.put("coorx", artWork.getXCoor());
            sendMsg.put("coory", artWork.getYCoor());

            //sendMsg
            int statuscode = helper.postSendMsg(path, sendMsg);
            if (statuscode != 201){
                throw new DjangoFailedException("Django failed to send");
            }

            return new ResponseEntity<ArtWorkDto>(artWorkDto, HttpStatus.OK);
        }
        catch(DjangoFailedException de){
            de.printStackTrace();
            return new ResponseEntity<ErrorResponseDto>(new ErrorResponseDto("Django failed to send", 400), HttpStatus.BAD_REQUEST);
        }
        catch(Exception e){
            e.printStackTrace();
            return new ResponseEntity<ErrorResponseDto>(new ErrorResponseDto("Post Drawing Failed", 400), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/me/exhibitions/{exhibitionId}/artworks/{artworksId}")
    public ResponseEntity<?> getArtworkDetail(@PathVariable Integer exhibitionId, @PathVariable Long artworksId) {
        ArtWork artWork = artWorkService.findArtWork(artworksId);
        ArtWorkDto dto = new ArtWorkDto(artWork.getId(), artWork.getName(), artWork.getArtist(), artWork.getXCoor(),
                artWork.getYCoor(), artWork.getPaintPath(), artWork.getExplanation());
        return ResponseEntity.ok(dto);
    }

    @PutMapping("/me/exhibitions/{exhibitionId}/artworks/{artworkId}")
    public ResponseEntity<?> putGalleryArtwork(HttpServletRequest request, Authentication authentication, @PathVariable Integer exhibitionId,
                                                @PathVariable Long artworkId, @ModelAttribute ModifyArtWorkInputDto modifyArtWorkInputDto) throws Exception {
        try{
            //그림만 모아두는 폴더를 만들 예정.
            Exhibition exhibition = exhibitionService.findById(exhibitionId);
            ArtWork artWork = artWorkRepository.findById(artworkId);
            System.out.println(modifyArtWorkInputDto);
            artWork.setName(modifyArtWorkInputDto.getName());
            artWork.setArtist(modifyArtWorkInputDto.getArtist());
            artWork.setXCoor(modifyArtWorkInputDto.getLocationX());
            artWork.setYCoor(modifyArtWorkInputDto.getLocationY());
            artWork.setExplanation(modifyArtWorkInputDto.getDescription());
            if (modifyArtWorkInputDto.getImageFile() != null) {
                String folder = String.format("artworks/%d", exhibitionId);
                String imageUrl = s3Uploader.upload(folder, modifyArtWorkInputDto.getName(), modifyArtWorkInputDto.getImageFile());
                artWork.setPaintPath(imageUrl);
            }
            artWorkRepository.save(artWork);
            ArtWorkDto artWorkDto = new ArtWorkDto(
                    artWork.getId(),
                    artWork.getName(),
                    artWork.getArtist(),
                    artWork.getXCoor(),
                    artWork.getYCoor(),
                    artWork.getPaintPath(),
                    artWork.getExplanation()
            );
            //Send the data to Django server.
            Map<String, Object> sendMsg = new HashMap<String, Object>();
            String path = "https://i9a202.p.ssafy.io/bridge/artwork/";

            sendMsg.put("exhibitionid", exhibition.getId());
            sendMsg.put("artworkid", artWork.getId());
            sendMsg.put("coorx", artWork.getXCoor());
            sendMsg.put("coory", artWork.getYCoor());

            //sendMsg
            int statuscode = helper.putSendMsg(path, sendMsg);
            if (statuscode != 200){
                throw new DjangoFailedException("Django failed to send");
            }

            return new ResponseEntity<ArtWorkDto>(artWorkDto, HttpStatus.OK);
        }
        catch(DjangoFailedException de){
            de.printStackTrace();
            return new ResponseEntity<ErrorResponseDto>(new ErrorResponseDto("Django failed to send", 400), HttpStatus.BAD_REQUEST);
        }
        catch(Exception e){
            e.printStackTrace();
            return new ResponseEntity<ErrorResponseDto>(new ErrorResponseDto("Post Drawing Failed", 400), HttpStatus.BAD_REQUEST);
        }
    }

    //갤러리 별 관람 중 기기 띄우기
    @GetMapping("/devices")
    public ResponseEntity<?> getGalleryDevices(HttpServletRequest request, Authentication authentication) throws Exception{
        try{
            String username = (String) request.getAttribute("username");
            Gallery gallery = galleryService.findByUsername(username);
            List<Device> deviceList = gallery.getDevices();

            List<GalleryDeviceDto> response = new ArrayList<GalleryDeviceDto>();
            for(Device device: deviceList){
                response.add(new GalleryDeviceDto(device.getDeviceId(), device.getPhoneNumber()));
            }
            return new ResponseEntity<List<GalleryDeviceDto>>(response, HttpStatus.OK);

        }catch(Exception e) {
            e.printStackTrace();
            return new ResponseEntity<ErrorResponseDto>(new ErrorResponseDto(e.getMessage(), 400), HttpStatus.BAD_REQUEST);
        }
    }

    //전시회 포스터 조회? => 필요한가? URL을 제공하니 필요없을지도.

    //전시회 포스터는 S3의 exhibition/{exhibitionId}에 저장할 것임.
    @PostMapping("me/exhibitions/{exhibitionId}/posters")
    public ResponseEntity<?> addExhibitionPoster(HttpServletRequest request, Authentication authentication,
                                                 @PathVariable Integer exhibitionId,
                                                 @RequestParam MultipartFile posterFile) throws Exception{
        try{
            String username = (String) request.getAttribute("username");
            Gallery gallery = galleryService.findByUsername(username);
            Optional<Exhibition> optionalExhibition = exhibitionRepository.findById(exhibitionId);

            Exhibition exhibition = optionalExhibition.get();

            String folderName = String.format("exhibition/%d", exhibitionId);
            String posterName = exhibition.getExhibitionName();

            String posterUrl = s3Uploader.upload(folderName, posterName, posterFile);
            System.out.println(posterUrl);
            exhibition.setPosterUrl(posterUrl);

            exhibitionRepository.save(exhibition);

            return new ResponseEntity<GalleryPosterResponseDto>(new GalleryPosterResponseDto(posterUrl), HttpStatus.OK);

        }catch(Exception e){
            e.printStackTrace();
            return new ResponseEntity<ErrorResponseDto>(new ErrorResponseDto(e.getMessage(), 400), HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("me/exhibitions/{exhibitionId}/posters")
    public ResponseEntity<?> modifyExhibitionPoster(HttpServletRequest request, Authentication authentication,
                                                 @PathVariable Integer exhibitionId,
                                                 @RequestParam String oldPosterUrl,
                                                 @RequestParam MultipartFile posterFile) throws Exception {
        try{
            String username = (String) request.getAttribute("username");
            Gallery gallery = galleryService.findByUsername(username);
            Optional<Exhibition> optionalExhibition = exhibitionRepository.findById(exhibitionId);
            Exhibition exhibition = optionalExhibition.get();
            if(exhibition == null){
                throw new Exception();
            }

            String folderName = String.format("exhibition/%d", exhibitionId);
            String posterName = exhibition.getExhibitionName();
            String posterUrl = s3Uploader.modify(folderName, posterName, posterFile);
            exhibition.setPosterUrl(posterUrl);
            System.out.println(exhibition.getPosterUrl());
            exhibitionRepository.save(exhibition);

            return new ResponseEntity<GalleryPosterResponseDto>(new GalleryPosterResponseDto(posterUrl), HttpStatus.OK);
        }catch(Exception e){
            e.printStackTrace();
            return new ResponseEntity<ErrorResponseDto>(new ErrorResponseDto(e.getMessage(), 400), HttpStatus.BAD_REQUEST);
        }
    }
}
