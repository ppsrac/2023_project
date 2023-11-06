package com.example.projecttest1.repository;

import com.example.projecttest1.entity.ArtWork;
import com.example.projecttest1.entity.Device;
import com.example.projecttest1.entity.Selection;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.transaction.Transactional;
import java.util.*;

@Transactional
@Repository
public class SelectionRepository{

    @PersistenceContext
    private EntityManager em;

    public void save(Selection selection){
        em.persist(selection);
    }

    public void delete(Selection selection){
        em.remove(selection);
    }

    public List<Selection> getSelectionByDevice(Long deviceId){
        Device device = em.createQuery("select d from Device d where d.deviceId = :deviceId", Device.class).setParameter("deviceId", deviceId).getSingleResult();
        return em.createQuery("SELECT s FROM Selection s WHERE s.device = :device").setParameter("device",device).getResultList();
    }

    public void deleteRecentSelectionByDevice(Long deviceId){
        try{
            List<Selection> selectedList = new ArrayList<>();
            Device device = em.createQuery("select d from Device d where d.deviceId = :deviceId", Device.class).setParameter("deviceId", deviceId).getSingleResult();
            selectedList = em.createQuery("SELECT s FROM Selection s WHERE s.device = :device ORDER BY s.timeStamp DESC " ).setParameter("device",device).getResultList();
            for(Selection selection:selectedList){
                System.out.println(selection.getTimeStamp());
            }
            em.remove(selectedList.get(0));
        }
        catch (Exception e){
            e.printStackTrace();
            throw e;
        }
    }

    public boolean existsDeviceArtwork(Device device, ArtWork artWork){
        String Query = "SELECT s FROM Selection s WHERE s.device = :device AND s.artWork = :artWork";
        TypedQuery<Selection> query = em.createQuery(Query, Selection.class);
        query.setParameter("device",device);
        query.setParameter("artWork",artWork);

        List<Selection> resultList = query.getResultList();
        if(resultList.size() == 0){
            return false;
        }
        return true;
    }
}
