package com.example.simulatordatabasetechnologies.service.impl;

import com.example.simulatordatabasetechnologies.dto.TasksInfoDto;
import com.example.simulatordatabasetechnologies.dto.TasksDto;
import com.example.simulatordatabasetechnologies.model.*;
import com.example.simulatordatabasetechnologies.security.SecurityService;
import com.example.simulatordatabasetechnologies.service.TasksService;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Join;
import javax.persistence.criteria.Root;
import java.util.List;

@Service
public class TasksServiceImpl implements TasksService {
    @PersistenceContext
    private EntityManager em;

    private final SecurityService securityService;

    public TasksServiceImpl(SecurityService securityService) {
        this.securityService = securityService;
    }

    @Override
    public List<TasksDto> getUserTasks() {
        UserEntity userEntity = securityService.getCurrentUser();
        if (userEntity == null)
            throw new RuntimeException("Пользователь не найден");

        CriteriaBuilder cb = em.getCriteriaBuilder();
        CriteriaQuery<TasksDto> cq = cb.createQuery(TasksDto.class);
        Root<TasksUsersEntity> root = cq.from(TasksUsersEntity.class);
        Join<TasksUsersEntity, TasksEntity> taskJoin = root.join(TasksUsersEntity_.task);
        cq.multiselect(
                taskJoin.get(TasksEntity_.id),
                taskJoin.get(TasksEntity_.serialNumber),
                taskJoin.get(TasksEntity_.title),
                root.get(TasksUsersEntity_.status));

        cq.where(cb.equal(root.get(TasksUsersEntity_.usersId), userEntity.getId()));

        try {
            return em.createQuery(cq).getResultList();
        } catch (NoResultException e) {
            return null;
        }
    }

    @Override
    public TasksInfoDto getTaskInfo(Long taskId) {
        CriteriaBuilder cb = em.getCriteriaBuilder();
        CriteriaQuery<TasksInfoDto> cq = cb.createQuery(TasksInfoDto.class);
        Root<TasksEntity> root = cq.from(TasksEntity.class);

        cq.multiselect(root.get(TasksEntity_.id),
                root.get(TasksEntity_.serialNumber),
                root.get(TasksEntity_.title),
                root.get(TasksEntity_.description)
        );

        cq.where(cb.equal(root.get(TasksEntity_.id), taskId));

        try {
            return em.createQuery(cq).getSingleResult();
        } catch (NoResultException e) {
            return null;
        }
    }
}

