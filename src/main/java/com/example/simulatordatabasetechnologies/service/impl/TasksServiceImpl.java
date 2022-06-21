package com.example.simulatordatabasetechnologies.service.impl;

import com.example.simulatordatabasetechnologies.dto.*;
import com.example.simulatordatabasetechnologies.model.*;
import com.example.simulatordatabasetechnologies.security.SecurityService;
import com.example.simulatordatabasetechnologies.service.TasksService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import javax.persistence.criteria.*;
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
                taskJoin.get(TasksEntity_.description),
                taskJoin.get(TasksEntity_.decidedRight),
                taskJoin.get(TasksEntity_.decidedWrong),
                taskJoin.get(TasksEntity_.totalAttempts)
        );

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

        cq.multiselect(taskJoin.get(TasksEntity_.id),
                taskJoin.get(TasksEntity_.serialNumber),
                taskJoin.get(TasksEntity_.title),
                root.get(TasksUsersEntity_.status),
                taskJoin.get(TasksEntity_.description),
                taskJoin.get(TasksEntity_.decidedRight),
                taskJoin.get(TasksEntity_.decidedWrong),
                taskJoin.get(TasksEntity_.totalAttempts)
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
    public QueryDTO getWorstTaskQuery(Long taskId) {
        TasksEntity task = em.find(TasksEntity.class, taskId);
        if (task == null)
            throw new RuntimeException("Задание не найдено");

        CriteriaBuilder cb = em.getCriteriaBuilder();
        CriteriaQuery<QueryDTO> cq = cb.createQuery(QueryDTO.class);
        Root<QueryHistoryEntity> root = cq.from(QueryHistoryEntity.class);
        Join<QueryHistoryEntity, TasksEntity> taskJoin = root.join(QueryHistoryEntity_.task);
        Join<QueryHistoryEntity, UserEntity> userJoin = root.join(QueryHistoryEntity_.user);

        cq.multiselect(root.get(QueryHistoryEntity_.id),
                root.get(QueryHistoryEntity_.userId),
                userJoin.get(UserEntity_.firstName),
                userJoin.get(UserEntity_.lastName),
                root.get(QueryHistoryEntity_.tasksId),
                taskJoin.get(TasksEntity_.title),
                root.get(QueryHistoryEntity_.result),
                root.get(QueryHistoryEntity_.sql),
                root.get(QueryHistoryEntity_.cost),
                root.get(QueryHistoryEntity_.time)
        );

        cq.where(cb.equal(root.get(QueryHistoryEntity_.id), task.getQueryHistoryId()));

        return em.createQuery(cq).getSingleResult();
    }

    @Override
    public List<QueryDTO> getTaskWrongQueries(Long taskId) {
        TasksEntity task = em.find(TasksEntity.class, taskId);
        if (task == null)
            throw new RuntimeException("Задание не найдено");

        CriteriaBuilder cb = em.getCriteriaBuilder();
        CriteriaQuery<QueryDTO> cq = cb.createQuery(QueryDTO.class);
        Root<QueryHistoryEntity> root = cq.from(QueryHistoryEntity.class);
        Join<QueryHistoryEntity, TasksEntity> taskJoin = root.join(QueryHistoryEntity_.task);
        Join<QueryHistoryEntity, UserEntity> userJoin = root.join(QueryHistoryEntity_.user);

        cq.multiselect(root.get(QueryHistoryEntity_.id),
                root.get(QueryHistoryEntity_.userId),
                userJoin.get(UserEntity_.firstName),
                userJoin.get(UserEntity_.lastName),
                root.get(QueryHistoryEntity_.tasksId),
                taskJoin.get(TasksEntity_.title),
                root.get(QueryHistoryEntity_.result),
                root.get(QueryHistoryEntity_.sql),
                root.get(QueryHistoryEntity_.cost),
                root.get(QueryHistoryEntity_.time)
        );

        cq.where(cb.equal(root.get(QueryHistoryEntity_.result), 1L));

        return em.createQuery(cq).getResultList();
    }

    @Override
    public TaskStatsDTO getTaskStats(long id) {
        CriteriaBuilder cb = em.getCriteriaBuilder();
        CriteriaQuery<TaskStatsDTO> cq = cb.createQuery(TaskStatsDTO.class);
        Root<TasksEntity> root = cq.from(TasksEntity.class);

        Subquery<Long> authorsDecided = cq.subquery(Long.class);
        Root<TasksUsersEntity> rootSq1 = authorsDecided.from(TasksUsersEntity.class);
        authorsDecided.select(cb.count(cb.count(rootSq1)));
        authorsDecided.where(cb.equal(rootSq1.get(TasksUsersEntity_.status), 1L));
        authorsDecided.groupBy(rootSq1.get(TasksUsersEntity_.usersId));

        Subquery<Long> authorsSent = cq.subquery(Long.class);
        Root<TasksUsersEntity> rootSq = authorsSent.from(TasksUsersEntity.class);
        authorsSent.select(cb.count(cb.count(rootSq)));
        authorsSent.groupBy(rootSq.get(TasksUsersEntity_.usersId));

        cq.multiselect(
                root.get(TasksEntity_.title),
                authorsDecided,
                authorsSent,
                root.get(TasksEntity_.decidedRight),
                root.get(TasksEntity_.decidedWrong),
                root.get(TasksEntity_.totalAttempts)
        );

        cq.where(cb.equal(root.get(TasksEntity_.id), id));

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

        CriteriaBuilder cb = em.getCriteriaBuilder();
        CriteriaQuery<UserEntity> cq = cb.createQuery(UserEntity.class);
        Root<UserEntity> root = cq.from(UserEntity.class);

        cq.select(root);

        List<UserEntity> listUsers = em.createQuery(cq).getResultList();

        listUsers.forEach(v -> {
            TasksUsersEntity entity = new TasksUsersEntity();
            entity.setTasksId(tasksEntity.getId());
            entity.setUsersId(v.getId());
            em.persist(entity);
        });

        task.setId(tasksEntity.getId());
        em.flush();

        return task;
    }

    @Override
    @Transactional
    public TasksRequestDTO updateTask(TasksRequestDTO data) {
        CriteriaBuilder cb = em.getCriteriaBuilder();
        CriteriaUpdate<TasksEntity> cu = cb.createCriteriaUpdate(TasksEntity.class);
        Root<TasksEntity> root = cu.from(TasksEntity.class);

        cu.set(TasksEntity_.referenceQuery, data.getReferenceQuery());
        cu.set(TasksEntity_.title, data.getTitle());
        cu.set(TasksEntity_.serialNumber, data.getSerialNumber());
        cu.set(TasksEntity_.description, data.getDescription());

        cu.where(cb.equal(root.get(TasksEntity_.id), data.getId()));

        em.createQuery(cu).executeUpdate();

        return data;
    }

    @Override
    @Transactional
    public void deleteTask(Long id) {
        CriteriaBuilder cb = em.getCriteriaBuilder();

        CriteriaDelete<TasksEntity> cd = cb.createCriteriaDelete(TasksEntity.class);
        Root<TasksEntity> root = cd.from(TasksEntity.class);
        cd.where(cb.equal(root.get(TasksEntity_.id), id));
        em.createQuery(cd).executeUpdate();

        CriteriaDelete<TasksUsersEntity> cdTU = cb.createCriteriaDelete(TasksUsersEntity.class);
        Root<TasksUsersEntity> rootTU  = cdTU.from(TasksUsersEntity.class);
        cdTU.where(cb.equal(rootTU.get(TasksUsersEntity_.tasksId), id));
        em.createQuery(cdTU).executeUpdate();
    }

    @Override
    public List<TasksAdminDTO> getAllTasks(){
        CriteriaBuilder cb = em.getCriteriaBuilder();
        CriteriaQuery<TasksAdminDTO> cq = cb.createQuery(TasksAdminDTO.class);
        Root<TasksEntity> root = cq.from(TasksEntity.class);

        cq.multiselect(root.get(TasksEntity_.id),
                root.get(TasksEntity_.referenceQuery),
                root.get(TasksEntity_.title),
                root.get(TasksEntity_.serialNumber),
                root.get(TasksEntity_.description),
                root.get(TasksEntity_.decidedRight),
                root.get(TasksEntity_.decidedWrong),
                root.get(TasksEntity_.totalAttempts),
                root.get(TasksEntity_.queryHistoryId)
        );

        try {
            return em.createQuery(cq).getResultList();
        } catch (NoResultException e) {
            return null;
        }
    }

}

