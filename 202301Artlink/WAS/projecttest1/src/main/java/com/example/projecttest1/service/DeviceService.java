package com.example.projecttest1.service;

import com.example.projecttest1.entity.*;
//import com.example.projecttest1.entity.Collection;
import com.example.projecttest1.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.List;

@Service
public class DeviceService {
    @Autowired
    private DeviceRepository deviceRepository;

    @Autowired
    private ArtWorkRepository artWorkRepository;

    @Autowired
    private SelectionRepository selectionRepository;

    @Autowired
    private UserKeyRepository userKeyRepository;

    @Autowired
    private PostEventRepository postEventRepository;

    //추후 유저 로그인 관련하여 추가될 경우...
    //@Autowired
    //private UserRepository userRepository;

    //@Autowired
    //private CollectionRepository collectionRepository;

    public Device save(Device device){
        try{
            return deviceRepository.save(device);
        }catch(Exception e){
            e.printStackTrace();
        }
        return null;
    }

    public Device save(Long deviceId, Long phoneNumber, Exhibition exhibition){
        Device device = new Device();
        device.setDeviceId(deviceId);
        device.setPhoneNumber(phoneNumber);
        device.setExhibition(exhibition);
        System.out.println(exhibition.getId());
        Gallery gallery = exhibition.getGallery();
        System.out.println(gallery.getId());
        device.setGallery(gallery);

        return save(device);
    }

    protected Long power(Long a, Long exp, Long mod){
        Long res = 1L;
        while(exp != 0){
            if(exp % 2 == 1){res = (res * a) % mod;}
            a = (a * a) % mod; exp >>= 1;
        }
        return res;
    }

    //id는 무조건 mod - 2까지만 가능. (약 20억개의 아이디 가능)
    protected Long getIntegerKey(Long id){
        Long mod = 2281701377L;
        Long primitiveRoot = 2L;
        if(id >= (mod - 2L)) {return -1L;}
        id = power(primitiveRoot, id, mod);
        return power(primitiveRoot, id, mod);
    }

    protected String hashKey(Long intKey){
        String res = "";
        while(intKey != 0L){
            Long residue = intKey % 36;
            if(residue < 10){
                res += (char)(residue + 48);
            }
            else{
                res += (char)(residue + 87);
            }
            intKey /= 36;
        }
        return res;
    }

    public String deviceDelete(Device device) throws Exception {
        //유저가 회원가입 되어 있는지를 검증하고 회원가입이 되어 있다면 자동으로 연동하는 코드를 짜야 함.
        //유저가 unique한 숫자를 이용하여 Key를 얻어야 함.


        //새로운 키 값 발행을 위한 숫자를 DB에 저장할수도...?
        Long K = userKeyRepository.countAllKeys();
        Long intKey = getIntegerKey(K + 1L);
        String url = hashKey(intKey);

        System.out.println(url);
        //새롭게 발행한 url을 붙여서 발행

        try{
            //Selection에서 해당하는 미술작품의 id 리스트를 구해낸 후 url과 같이 묶어 저장한다.
            Long deviceId = device.getDeviceId();
            Long phoneNumber = device.getPhoneNumber();

            List<Selection> selections = selectionRepository.getSelectionByDevice(deviceId);
            List<ArtWork> artWorks = new ArrayList<>();

            if(selections.size() == 0){
                throw new Exception("Empty selection");
            }

            for(Selection selection : selections){
                ArtWork artWork = selection.getArtWork();
                artWorks.add(artWork);
            }

            ArtWork artwork = selections.get(0).getArtWork();
            Exhibition exhibition = artwork.getExhibition();
            Gallery gallery = exhibition.getGallery();

            UserKey userKey = userKeyRepository.saveKey(gallery, exhibition, phoneNumber, url);
            postEventRepository.savePostEvent(userKey, artWorks);
            //postEvent에 저장 후 삭제
            deviceRepository.delete(device);
            return url;
        }
        catch(Exception e){
            e.printStackTrace();
            throw e;
        }
    }

    public String deviceDelete(Long deviceId) throws Exception {
        Device device = deviceRepository.findBydeviceId(deviceId);
        return deviceDelete(device);
    }

}
