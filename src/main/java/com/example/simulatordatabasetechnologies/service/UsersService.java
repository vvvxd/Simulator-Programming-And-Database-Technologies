package com.example.simulatordatabasetechnologies.service;

import com.example.simulatordatabasetechnologies.dto.*;

import java.util.List;

public interface UsersService {

    List<GroupDTO> getGroups();

    GroupDTO addGroup(GroupDTO data);

    GroupDTO updateGroup(GroupDTO data);

    void deleteGroup(Long id);

    UserInfoDTO getUserInfo(Long id);

    List<UserTasksStatsDTO> getListSolvedTasks(Long id);

    List<UserTasksStatsDTO> getListUnresolvedTasks(Long id);

    List<UserTasksStatsDTO> getListBestSolutionsTasks(Long id);

    List<UserAdminDTO> getUsers();

    UserAddDTO addUser(UserAddDTO data);

    UserAddDTO updateUser(UserAddDTO data);

    void deleteUser(Long id);
    GroupDTO getGroup(Long id);
}
