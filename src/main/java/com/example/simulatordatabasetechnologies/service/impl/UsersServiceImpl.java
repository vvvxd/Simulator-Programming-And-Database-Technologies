package com.example.simulatordatabasetechnologies.service.impl;

import com.example.simulatordatabasetechnologies.dto.*;
import com.example.simulatordatabasetechnologies.model.*;
import com.example.simulatordatabasetechnologies.repository.TasksRepository;
import com.example.simulatordatabasetechnologies.repository.UserRepository;
import com.example.simulatordatabasetechnologies.security.SecurityService;
import com.example.simulatordatabasetechnologies.service.UsersService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import javax.persistence.criteria.*;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class UsersServiceImpl implements UsersService {

    @PersistenceContext
    private EntityManager em;

    private final SecurityService securityService;
    private final TasksRepository tasksRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UsersServiceImpl(SecurityService securityService, TasksRepository tasksRepository, UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.securityService = securityService;
        this.tasksRepository = tasksRepository;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public List<GroupDTO> getGroups() {
        CriteriaBuilder cb = em.getCriteriaBuilder();
        CriteriaQuery<GroupDTO> cq = cb.createQuery(GroupDTO.class);
        Root<UserGroupEntity> root = cq.from(UserGroupEntity.class);

        cq.multiselect(root.get(UserGroupEntity_.id),
                root.get(UserGroupEntity_.name),
                root.get(UserGroupEntity_.shortName));

        try {
            return em.createQuery(cq).getResultList();
        } catch (NoResultException e) {
            throw new NoResultException("Группы отсутствуют");
        }
    }
    @Override
    public GroupDTO getGroup(Long id) {
        CriteriaBuilder cb = em.getCriteriaBuilder();
        CriteriaQuery<GroupDTO> cq = cb.createQuery(GroupDTO.class);
        Root<UserGroupEntity> root = cq.from(UserGroupEntity.class);
        cq.where(cb.equal(root.get(UserGroupEntity_.id), id));
        cq.multiselect(root.get(UserGroupEntity_.id),
                root.get(UserGroupEntity_.name),
                root.get(UserGroupEntity_.shortName));

        try {
            return em.createQuery(cq).getSingleResult();
        } catch (NoResultException e) {
            throw new NoResultException(String.format("Отсутствует группа с id:%s", id));
        }
    }

    @Override
    @Transactional
    public GroupDTO addGroup(GroupDTO data) {
        UserGroupEntity group = new UserGroupEntity();
        group.setName(data.getName());
        group.setShortName(data.getShortName());

        em.persist(group);
        em.flush();

        data.setId(group.getId());

        return data;
    }

    @Override
    @Transactional
    public GroupDTO updateGroup(GroupDTO data) {
        CriteriaBuilder cb = em.getCriteriaBuilder();
        CriteriaUpdate<UserGroupEntity> cu = cb.createCriteriaUpdate(UserGroupEntity.class);
        Root<UserGroupEntity> root = cu.from(UserGroupEntity.class);

        cu.set(UserGroupEntity_.shortName, data.getShortName());
        cu.set(UserGroupEntity_.name, data.getName());

        cu.where(cb.equal(root.get(UserGroupEntity_.id), data.getId()));

        em.createQuery(cu).executeUpdate();

        return data;
    }

    @Override
    @Transactional
    public void deleteGroup(Long id) {
        CriteriaBuilder cb = em.getCriteriaBuilder();
        CriteriaDelete<UserGroupEntity> cd = cb.createCriteriaDelete(UserGroupEntity.class);
        Root<UserGroupEntity> root = cd.from(UserGroupEntity.class);
        cd.where(cb.equal(root.get(UserGroupEntity_.id), id));
        em.createQuery(cd).executeUpdate();
    }

    @Override
    public UserInfoDTO getUserInfo(Long id) {
        CriteriaBuilder cb = em.getCriteriaBuilder();
        CriteriaQuery<UserInfoDTO> cq = cb.createQuery(UserInfoDTO.class);
        Root<UserEntity> root = cq.from(UserEntity.class);
        Join<UserEntity, UserGroupEntity> groupJoin = root.join(UserEntity_.group);

        Subquery<Long> tasksSolved = cq.subquery(Long.class);
        Root<TasksUsersEntity> rootTS = tasksSolved.from(TasksUsersEntity.class);
        tasksSolved.select(cb.count(rootTS));
        tasksSolved.where(cb.equal(rootTS.get(TasksUsersEntity_.usersId), id),
                cb.equal(rootTS.get(TasksUsersEntity_.status), 1L));

        Subquery<Long> tasksSent = cq.subquery(Long.class);
        Root<QueryHistoryEntity> rootSE = tasksSent.from(QueryHistoryEntity.class);
        tasksSent.select(cb.count(rootSE));
        tasksSent.where(cb.equal(rootSE.get(QueryHistoryEntity_.userId), id));

        Subquery<Long> tasksTotal = cq.subquery(Long.class);
        Root<TasksUsersEntity> rootTT = tasksTotal.from(TasksUsersEntity.class);
        tasksTotal.select(cb.count(rootTT));
        tasksTotal.where(cb.equal(rootTT.get(TasksUsersEntity_.usersId), id));

        cq.multiselect(
                root.get(UserEntity_.id),
                root.get(UserEntity_.firstName),
                root.get(UserEntity_.lastName),
                root.get(UserEntity_.email),
                groupJoin.get(UserGroupEntity_.shortName),
                tasksSolved,
                tasksSent,
                tasksTotal
        );

        cq.where(cb.equal(root.get(UserEntity_.id), id));

        try {
            return em.createQuery(cq).getSingleResult();
        } catch (NoResultException e) {
            throw new NoResultException(String.format("Отсутствует информация об пользователя с id:%s", id));
        }
    }

    @Override
    public List<UserTasksStatsDTO> getListSolvedTasks(Long id) {
        CriteriaBuilder cb = em.getCriteriaBuilder();
        CriteriaQuery<UserTasksStatsDTO> cq = cb.createQuery(UserTasksStatsDTO.class);
        Root<TasksUsersEntity> root = cq.from(TasksUsersEntity.class);
        Join<TasksUsersEntity, TasksEntity> taskJoin = root.join(TasksUsersEntity_.task);

        Subquery<Long> attempts = cq.subquery(Long.class);
        Root<QueryHistoryEntity> rootA = attempts.from(QueryHistoryEntity.class);
        attempts.select(cb.count(rootA));
        attempts.where(cb.equal(rootA.get(QueryHistoryEntity_.userId), id),
                cb.equal(rootA.get(QueryHistoryEntity_.tasksId), taskJoin.get(TasksEntity_.id)));

        cq.multiselect(taskJoin.get(TasksEntity_.id),
                taskJoin.get(TasksEntity_.serialNumber),
                attempts
        );

        cq.where(cb.equal(root.get(TasksUsersEntity_.usersId), id),
                cb.equal(root.get(TasksUsersEntity_.status), 1L));

        try {
            return em.createQuery(cq).getResultList();
        } catch (NoResultException e) {
            throw new NoResultException(String.format("Отсутствует информация об выполненных заданий у пользователя с id:%s", id));
        }
    }

    @Override
    public List<UserTasksStatsDTO> getListUnresolvedTasks(Long id) {
        CriteriaBuilder cb = em.getCriteriaBuilder();
        CriteriaQuery<UserTasksStatsDTO> cq = cb.createQuery(UserTasksStatsDTO.class);
        Root<TasksUsersEntity> root = cq.from(TasksUsersEntity.class);
        Join<TasksUsersEntity, TasksEntity> taskJoin = root.join(TasksUsersEntity_.task);

        Subquery<Long> attempts = cq.subquery(Long.class);
        Root<QueryHistoryEntity> rootA = attempts.from(QueryHistoryEntity.class);
        attempts.select(cb.count(rootA));
        attempts.where(cb.equal(rootA.get(QueryHistoryEntity_.userId), id),
                cb.equal(rootA.get(QueryHistoryEntity_.tasksId), taskJoin.get(TasksEntity_.id)));

        cq.multiselect(taskJoin.get(TasksEntity_.id),
                taskJoin.get(TasksEntity_.serialNumber),
                attempts
        );

        cq.where(cb.equal(root.get(TasksUsersEntity_.usersId), id),
                cb.equal(root.get(TasksUsersEntity_.status), 0L));

        try {
            return em.createQuery(cq).getResultList();
        } catch (NoResultException e) {
            throw new NoResultException(String.format("Отсутствует информация об не выполненных заданий у пользователя с id:%s", id));
        }
    }

    @Override
    public List<UserTasksStatsDTO> getListBestSolutionsTasks(Long id) {
        CriteriaBuilder cb = em.getCriteriaBuilder();
        CriteriaQuery<UserTasksStatsDTO> cq = cb.createQuery(UserTasksStatsDTO.class);
        Root<TasksEntity> root = cq.from(TasksEntity.class);
        Join<TasksEntity, QueryHistoryEntity> historyJoin = root.join(TasksEntity_.queryHistory);

        Subquery<Long> attempts = cq.subquery(Long.class);
        Root<QueryHistoryEntity> rootA = attempts.from(QueryHistoryEntity.class);
        attempts.select(cb.count(rootA));
        attempts.where(cb.equal(rootA.get(QueryHistoryEntity_.userId), id),
                cb.equal(rootA.get(QueryHistoryEntity_.tasksId), root.get(TasksEntity_.id)));

        cq.multiselect(root.get(TasksEntity_.id),
                root.get(TasksEntity_.serialNumber),
                attempts
        );

        cq.where(cb.equal(historyJoin.get(QueryHistoryEntity_.userId), id));

        try {
            return em.createQuery(cq).getResultList();
        } catch (NoResultException e) {
            throw new NoResultException(String.format("Отсутствует информация об лучших выполнений заданий у пользователя с id:%s", id));
        }
    }


    @Override
    public List<UserAdminDTO> getUsers() {
        CriteriaBuilder cb = em.getCriteriaBuilder();
        CriteriaQuery<UserAdminDTO> cq = cb.createQuery(UserAdminDTO.class);
        Root<UserEntity> root = cq.from(UserEntity.class);

        Subquery<Long> tasksSolved = cq.subquery(Long.class);
        Root<TasksUsersEntity> rootTS = tasksSolved.from(TasksUsersEntity.class);
        tasksSolved.select(cb.count(rootTS));
        tasksSolved.where(cb.equal(rootTS.get(TasksUsersEntity_.usersId), root.get(UserEntity_.id)),
                cb.equal(rootTS.get(TasksUsersEntity_.status), 1L));

        Subquery<Long> tasksSent = cq.subquery(Long.class);
        Root<QueryHistoryEntity> rootSE = tasksSent.from(QueryHistoryEntity.class);
        tasksSent.select(cb.count(rootSE));
        tasksSent.where(cb.equal(rootSE.get(QueryHistoryEntity_.userId), root.get(UserEntity_.id)));

        Subquery<Long> tasksTotal = cq.subquery(Long.class);
        Root<TasksUsersEntity> rootTT = tasksTotal.from(TasksUsersEntity.class);
        tasksTotal.select(cb.count(rootTT));
        tasksTotal.where(cb.equal(rootTT.get(TasksUsersEntity_.usersId), root.get(UserEntity_.id)));

        cq.multiselect(
                root.get(UserEntity_.id),
                root.get(UserEntity_.firstName),
                root.get(UserEntity_.lastName),
                root.get(UserEntity_.email),
                root.get(UserEntity_.userGroupId),
                root.get(UserEntity_.role),
                root.get(UserEntity_.status),
                root.get(UserEntity_.firstEntry),
                tasksSolved,
                tasksSent,
                tasksTotal
        );

        try {
            return em.createQuery(cq).getResultList();
        } catch (NoResultException e) {
            throw new NoResultException("Пользователи не найдены");
        }
    }

    @Override
    @Transactional
    public UserAddDTO addUser(UserAddDTO data) {
        Boolean present = userRepository.findByEmail(data.getEmail()).isPresent();
        if (present.equals(true))
            throw new RuntimeException("With this email, the user already exists");

        UserEntity user = new UserEntity();
        user.setFirstName(data.getFirstName());
        user.setLastName(data.getLastName());
        user.setUserGroupId(data.getUserGroupId());
        user.setEmail(data.getEmail());
        user.setPassword(passwordEncoder.encode(data.getPassword()));
        user.setRole(Role.valueOf(data.getRole()));
        user.setStatus(Status.ACTIVE);
        user.setFirstEntry(LocalDateTime.now());
        em.persist(user);

        List<Long> listTasksId = tasksRepository.findAll().stream().map(TasksEntity::getId).toList();
        listTasksId.forEach(v -> {
            TasksUsersEntity entity = new TasksUsersEntity();
            entity.setTasksId(v);
            entity.setUsersId(user.getId());
            em.persist(entity);
        });

        em.flush();

        data.setId(user.getId());

        return data;
    }

    @Override
    @Transactional
    public UserAddDTO updateUser(UserAddDTO data) {
        CriteriaBuilder cb = em.getCriteriaBuilder();
        CriteriaUpdate<UserEntity> cu = cb.createCriteriaUpdate(UserEntity.class);
        Root<UserEntity> root = cu.from(UserEntity.class);

        cu.set(UserEntity_.email, data.getEmail());

        if (data.getPassword() != null && !"".equals(data.getPassword()))
            cu.set(UserEntity_.password, passwordEncoder.encode(data.getPassword()));

        cu.set(UserEntity_.firstName, data.getFirstName());
        cu.set(UserEntity_.lastName, data.getLastName());
        cu.set(UserEntity_.userGroupId, data.getUserGroupId());
        cu.set(UserEntity_.role, Role.valueOf(data.getRole()));

        cu.where(cb.equal(root.get(UserEntity_.id), data.getId()));

        em.createQuery(cu).executeUpdate();

        return data;
    }

    @Override
    @Transactional
    public ProfileDTO profileUpdate(ProfileDTO data) {
        CriteriaBuilder cb = em.getCriteriaBuilder();
        CriteriaUpdate<UserEntity> cu = cb.createCriteriaUpdate(UserEntity.class);
        Root<UserEntity> root = cu.from(UserEntity.class);

        if (data.getPassword() != null && !"".equals(data.getPassword()))
            cu.set(UserEntity_.password, passwordEncoder.encode(data.getPassword()));

        cu.set(UserEntity_.firstName, data.getFirstName());
        cu.set(UserEntity_.lastName, data.getLastName());

        cu.where(cb.equal(root.get(UserEntity_.id), data.getId()));

        em.createQuery(cu).executeUpdate();

        return data;
    }

    @Override
    @Transactional
    public void deleteUser(Long id) {
        CriteriaBuilder cb = em.getCriteriaBuilder();
        CriteriaUpdate<UserEntity> cu = cb.createCriteriaUpdate(UserEntity.class);
        Root<UserEntity> root = cu.from(UserEntity.class);

        cu.set(UserEntity_.status, Status.BANNED);

        cu.where(cb.equal(root.get(UserEntity_.id), id));

        em.createQuery(cu).executeUpdate();
    }

}
