package com.example.simulatordatabasetechnologies.service.impl;

import com.example.simulatordatabasetechnologies.dto.TasksInfoDTO;
import com.example.simulatordatabasetechnologies.dto.TasksDTO;
import com.example.simulatordatabasetechnologies.dto.TasksRequestDTO;
import com.example.simulatordatabasetechnologies.model.*;
import com.example.simulatordatabasetechnologies.security.SecurityService;
import com.example.simulatordatabasetechnologies.service.TasksService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
    public List<TasksDTO> getUserTasks() {
        UserEntity userEntity = securityService.getCurrentUser();
        if (userEntity == null)
            throw new RuntimeException("Пользователь не найден");

        CriteriaBuilder cb = em.getCriteriaBuilder();
        CriteriaQuery<TasksDTO> cq = cb.createQuery(TasksDTO.class);
        Root<TasksUsersEntity> root = cq.from(TasksUsersEntity.class);
        Join<TasksUsersEntity, TasksEntity> taskJoin = root.join(TasksUsersEntity_.task);
        cq.multiselect(
                taskJoin.get(TasksEntity_.id),
                taskJoin.get(TasksEntity_.serialNumber),
                taskJoin.get(TasksEntity_.title),
                root.get(TasksUsersEntity_.status),
                taskJoin.get(TasksEntity_.description));

        cq.where(cb.equal(root.get(TasksUsersEntity_.usersId), userEntity.getId()));

        try {
            return em.createQuery(cq).getResultList();
        } catch (NoResultException e) {
            return null;
        }
    }

    @Override
    public TasksDTO getTaskInfo(Long taskId) {
        UserEntity userEntity = securityService.getCurrentUser();
        if (userEntity == null)
            throw new RuntimeException("Пользователь не найден");

        CriteriaBuilder cb = em.getCriteriaBuilder();
        CriteriaQuery<TasksDTO> cq = cb.createQuery(TasksDTO.class);
        Root<TasksUsersEntity> root = cq.from(TasksUsersEntity.class);
        Join<TasksUsersEntity, TasksEntity> taskJoin = root.join(TasksUsersEntity_.task);

        cq.multiselect(   taskJoin.get(TasksEntity_.id),
                taskJoin.get(TasksEntity_.serialNumber),
                taskJoin.get(TasksEntity_.title),
                root.get(TasksUsersEntity_.status),
                taskJoin.get(TasksEntity_.description)
        );

        cq.where(cb.equal(taskJoin.get(TasksEntity_.id), taskId),
                cb.equal(root.get(TasksUsersEntity_.usersId), userEntity.getId()));

        try {
            return em.createQuery(cq).getSingleResult();
        } catch (NoResultException e) {
            return null;
        }
    }

    @Override
    @Transactional
    public TasksRequestDTO addTask(TasksRequestDTO task) {
        TasksEntity tasksEntity = new TasksEntity();
        tasksEntity.setReferenceQuery(task.getReferenceQuery());
        tasksEntity.setTitle(task.getTitle());
        tasksEntity.setSerialNumber(task.getSerialNumber());
        tasksEntity.setDescription(task.getDescription());

        em.persist(tasksEntity);
        em.flush();

        task.setId(tasksEntity.getId());

        return task;
    }
}

