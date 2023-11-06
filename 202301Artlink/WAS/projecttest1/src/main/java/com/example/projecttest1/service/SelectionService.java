package com.example.projecttest1.service;

import com.example.projecttest1.entity.ArtWork;
import com.example.projecttest1.entity.Device;
import com.example.projecttest1.entity.Selection;
import com.example.projecttest1.exception.selections.NotUniqueException;
import com.example.projecttest1.repository.DeviceRepository;
import com.example.projecttest1.repository.ArtWorkRepository;
import com.example.projecttest1.repository.SelectionRepository;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Date;

@Service
public class SelectionService {
    @Autowired
    private DeviceRepository deviceRepository;

    @Autowired
    private ArtWorkRepository artWorkRepository;

    @Autowired
    private SelectionRepository selectionRepository;

    public void selectArtWork(Long deviceId, Long artWorkId) throws Exception {
        try{
            System.out.println(artWorkId);
            System.out.println(deviceId);
            Selection selection = new Selection();
            ArtWork artWork = artWorkRepository.findById(artWorkId);
            Device device = deviceRepository.findBydeviceId(deviceId);
            if(selectionRepository.existsDeviceArtwork(device, artWork)){
                throw new NotUniqueException(deviceId, artWorkId);
            }
            Date timestamp = new Date();
            System.out.println(timestamp);
            selection.setArtWork(artWork);
            selection.setDevice(device);
            selection.setTimeStamp(timestamp);

            selectionRepository.save(selection);
        }
        catch(NotUniqueException de){
            de.printStackTrace();
            throw de;
        }
        catch(Exception e){
            e.printStackTrace();
            throw e;
        }
    }

    public void deleteSingle(Long deviceId){
        try{
            selectionRepository.deleteRecentSelectionByDevice(deviceId);
        }
        catch(Exception e){
            e.printStackTrace();
            throw e;
        }
    }
}
