package com.example.projecttest1.repository;

import com.example.projecttest1.entity.ArtWork;
import com.example.projecttest1.entity.Device;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import java.util.List;

@Transactional
@Repository
public class ArtWorkRepository{
    @PersistenceContext
    private EntityManager em;

    public ArtWork save(ArtWork artWork){
        em.persist(artWork);
        return artWork;
    }

    public boolean delete(ArtWork artWork){
        boolean status = false;
        try {
            em.remove(artWork);
            status = true;
        }catch (Exception e) {
            e.printStackTrace();
        }
        return status;
    }
    public ArtWork findById(Long id){
        return em.find(ArtWork.class, id);
    }

    public List<ArtWork> findAll(){
        return em.createQuery("select a from ArtWork a", ArtWork.class).getResultList();
    }

    public List<ArtWork> findByName(String name){
        return em.createQuery("select a from ArtWork a where a.name = :name", ArtWork.class).setParameter("name", name).getResultList();
    }
}
