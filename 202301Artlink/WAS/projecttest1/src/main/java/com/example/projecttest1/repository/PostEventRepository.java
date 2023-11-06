package com.example.projecttest1.repository;

import com.example.projecttest1.entity.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import java.util.List;

@Transactional
@Repository
public class PostEventRepository {
    @Autowired
    private UserKeyRepository userKeyRepository;

    @Autowired
    private ArtWorkRepository artWorkRepository;
    @PersistenceContext
    private EntityManager em;

    public void savePostEvent( UserKey userKey, List<ArtWork> artWorkList){
        try{
            for(ArtWork artWork : artWorkList){
                PostEvent postEvent = new PostEvent();
                postEvent.setArtWork(artWork);
                postEvent.setUserKey(userKey);
                em.persist(postEvent);
            }
        }
        catch(Exception e){
            e.printStackTrace();
            throw e;
        }
    }

    public List<PostEvent> getPostEventsByUserKey(UserKey userKey){
        try {
            List<PostEvent> postEvents = em.createQuery("select p from PostEvent p where p.userKey = : userKey").setParameter("userKey", userKey).getResultList();
            return postEvents;
        }
        catch(Exception e){
            e.printStackTrace();
            throw e;
        }

    }

    public void modifyPostEvent(UserKey userKey, ArtWork srcWork, ArtWork destWork){
        try{
            PostEvent postEvent = (PostEvent) em.createQuery("select p from PostEvent p where p.artWork = :artWork").setParameter("artWork", srcWork).getSingleResult();
            postEvent.setArtWork(destWork);
            em.merge(postEvent);
        }
        catch(Exception e){
            e.printStackTrace();
            throw e;
        }
    }

    public void deletePostEvent(UserKey userKey, ArtWork srcWork){
        try{
            em.createQuery("delete from PostEvent p where p.userKey = :userKey and p.artWork = :artWork").setParameter("userKey", userKey)
                    .setParameter("artWork", srcWork)
                    .executeUpdate();
        }
        catch(Exception e){
            e.printStackTrace();
            throw e;
        }
    }
}
