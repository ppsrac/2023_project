package com.example.projecttest1.repository;

import com.example.projecttest1.entity.Exhibition;
import com.example.projecttest1.entity.Gallery;
import com.example.projecttest1.entity.User;
import com.example.projecttest1.entity.UserKey;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import java.time.LocalDate;
import java.util.Optional;
import java.util.List;

@Transactional
@Repository
public class UserKeyRepository {

    @Autowired
    private UserRepository userRepository;

    @PersistenceContext
    private EntityManager em;

    public Long countAllKeys(){
        System.out.println("Count Try");
        try{
            return em.createQuery("SELECT COUNT(k) FROM UserKey k", Long.class).getSingleResult();
        }
        catch(Exception e){
            System.out.println("Count Failed");
            return -1L;
        }
    }

    public UserKey saveKey(Gallery gallery, Exhibition exhibition, Long phoneNumber, String hashKey){
        try{
            UserKey userKey = new UserKey();
            User user = userRepository.findByPhoneNumber(phoneNumber);
            userKey.setGallery(gallery);
            userKey.setExhibition(exhibition);
            userKey.setUser(user);
            userKey.setHashKey(hashKey);
            userKey.setVisitDate(LocalDate.now());
            em.persist(userKey);
            return userKey;
        }
        catch(Exception e){
            e.printStackTrace();
            throw e;
        }
    }

    public UserKey findKey(String hashKey){
        try{
            return (UserKey) em.createQuery("SELECT k FROM UserKey k WHERE k.hashKey = :hashKey").setParameter("hashKey", hashKey).getSingleResult();
        }
        catch(Exception e){
            e.printStackTrace();
            throw e;
        }
    }

    public Long findIdx(String hashkey){
        try{
            return (Long) em.createQuery("SELECT k.id FROM UserKey k WHERE k.hashKey = :hashKey").setParameter("hashKey", hashkey).getSingleResult();
        }
        catch(Exception e){
            e.printStackTrace();
            throw e;
        }
    }

    public List<UserKey> findByUser(User user){
        try{
            return em.createQuery("SELECT k FROM UserKey k WHERE k.user = :user").setParameter("user", user).getResultList();
        }
        catch(Exception e){
            e.printStackTrace();
            throw e;
        }
    }
}
