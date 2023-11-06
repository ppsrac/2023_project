package com.example.projecttest1.repository;

import com.example.projecttest1.entity.ArtWork;
import com.example.projecttest1.entity.Device;
import org.springframework.stereotype.Repository;

import javax.persistence.PersistenceContext;
import javax.persistence.EntityManager;
import javax.transaction.Transactional;
import java.util.List;

@Transactional
@Repository
public class DeviceRepository{
    @PersistenceContext
    private EntityManager em;

    //Device 객체를 입력하면 해당 기기 DB 등록
    //Input: Device 객체
    //Output: None
    public Device save(Device device){
        em.persist(device);
        return device;
    }


    //Device 객체를 입력하면 해당 기기 DB 삭제
    //Input: Device 객체
    //Output: None
    public void delete(Device device){
        try {
            em.remove(device);
        }catch (Exception e) {
            e.printStackTrace();
            throw e;
        }
    }

    //객체의 deviceId를 입력하면 해당 기기 DB 삭제
    //Input: Device id
    //Output: None
    public boolean deleteById(Long id){
        boolean status = false;
        try{
            em.createQuery("delete from Device d where d.deviceId = :id").setParameter("id", id).executeUpdate();
            status = true;
        }catch(Exception e){
            e.printStackTrace();
        }
        return status;
    }

    //Device 객체의 id를 입력하면 해당 기기 반환
    //Input: Device 객체의 id(Long)
    //Output: 해당 id를 가진 Device 객체
    public Device findById(Long id){
        return em.find(Device.class, id);
    }

    //Device 객체의 deviceId를 입력하면 해당 기기 반환
    //Input: Device 객체의 deviceId(Long)
    //Output: 해당 deviceId를 가진 Device 객체
    public Device findBydeviceId(Long deviceId){
        System.out.println(deviceId);
        return em.createQuery("select d from Device d where d.deviceId = :deviceId", Device.class).setParameter("deviceId", deviceId).getSingleResult();
    }


    //모든 Device 객체를 반환
    //Input: None
    //Output: DB에 포함된 모든 객체 반환.
    public List<Device> findAll(){
        return em.createQuery("select d from Device d", Device.class).getResultList();
    }

}
