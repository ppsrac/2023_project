package com.example.projecttest1.service;

import com.example.projecttest1.dto.GalleryUpdateDto;
import com.example.projecttest1.dto.gallery.GallerySignupDto;
import com.example.projecttest1.entity.Gallery;
import com.example.projecttest1.exception.auth.UserAlreadyExistsException;
import com.example.projecttest1.exception.gallery.GalleryNotFoundException;
import com.example.projecttest1.repository.GalleryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GalleryService {

    @Autowired
    private GalleryRepository galleryRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    public void registerGallery(GallerySignupDto requestDto) {
        if (galleryRepository.findByUsername(requestDto.getUsername()) != null) {
            throw new UserAlreadyExistsException("Gallery with gallery id " + requestDto.getUsername() + " already exists.");
        }
        if (galleryRepository.existsByGalleryName(requestDto.getGalleryName())) {
            throw new UserAlreadyExistsException("Gallery with gallery name " + requestDto.getGalleryName() + " already exists.");
        }
        Gallery gallery = new Gallery();
        gallery.setUsername(requestDto.getUsername());
        gallery.setPassword(bCryptPasswordEncoder.encode(requestDto.getPassword()));
        gallery.setGalleryName(requestDto.getGalleryName());
        gallery.setDescription("");
        gallery.setAccepted(Boolean.FALSE);
        galleryRepository.save(gallery);
    }

    public Gallery findByUsername(String username) {
        return galleryRepository.findByUsername(username);
    }

    public List<Gallery> findAll() {
        return galleryRepository.findAll();
    }

    public Gallery findById(Integer id) {
        return galleryRepository.findById(id).orElseThrow(
                ()-> new GalleryNotFoundException("Gallery with id " + id + " not found"));
    }

    public Gallery acceptGallery(Integer id) {
        Gallery gallery = findById(id);
        gallery.setAccepted(Boolean.TRUE);
        return galleryRepository.save(gallery);
    }

    public Gallery updateGallery(GalleryUpdateDto galleryUpdateDto)  {
        Gallery gallery = galleryRepository.findByUsername(galleryUpdateDto.getUsername());
        gallery.setDescription(galleryUpdateDto.getDescription());
        return galleryRepository.save(gallery);
    }

}
