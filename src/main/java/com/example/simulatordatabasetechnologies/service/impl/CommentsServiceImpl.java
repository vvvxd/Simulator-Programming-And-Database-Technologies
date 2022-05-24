package com.example.simulatordatabasetechnologies.service.impl;

import com.example.simulatordatabasetechnologies.dto.CommentsDTO;
import com.example.simulatordatabasetechnologies.dto.CommentsRequestDTO;
import com.example.simulatordatabasetechnologies.model.CommentsEntity;
import com.example.simulatordatabasetechnologies.model.CommentsEntity_;
import com.example.simulatordatabasetechnologies.model.UserEntity;
import com.example.simulatordatabasetechnologies.model.UserEntity_;
import com.example.simulatordatabasetechnologies.security.SecurityService;
import com.example.simulatordatabasetechnologies.service.CommentsService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Join;
import javax.persistence.criteria.Root;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class CommentsServiceImpl implements CommentsService {

    @PersistenceContext
    private EntityManager em;

    private final SecurityService securityService;

    public CommentsServiceImpl(SecurityService securityService) {
        this.securityService = securityService;
    }

    @Override
    public List<CommentsDTO> getCommentsByTaskId(Long id) {
        CriteriaBuilder cb = em.getCriteriaBuilder();
        CriteriaQuery<CommentsDTO> cq = cb.createQuery(CommentsDTO.class);
        Root<CommentsEntity> root = cq.from(CommentsEntity.class);
        Join<CommentsEntity, UserEntity> userJoin = root.join(CommentsEntity_.user);

        cq.multiselect(
                root.get(CommentsEntity_.id),
                root.get(CommentsEntity_.tasksId),
                root.get(CommentsEntity_.usersId),
                userJoin.get(UserEntity_.lastName),
                userJoin.get(UserEntity_.firstName),
                root.get(CommentsEntity_.text),
                root.get(CommentsEntity_.time)
        );

        cq.where(cb.equal(root.get(CommentsEntity_.tasksId), id));

        try {
            return em.createQuery(cq).getResultList();
        } catch (NoResultException e) {
            return null;
        }
    }

    @Override
    @Transactional
    public void addComment(CommentsRequestDTO data) {
        UserEntity userEntity = securityService.getCurrentUser();
        if (userEntity == null)
            throw new RuntimeException("Пользователь не найден");
        CommentsEntity entity = new CommentsEntity();
        entity.setTasksId(data.getTasksId());
        entity.setUsersId(userEntity.getId());
        entity.setText(data.getText());
        entity.setTime(LocalDateTime.now());

        em.persist(entity);
        em.flush();
    }
}
