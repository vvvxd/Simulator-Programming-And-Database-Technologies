package com.example.simulatordatabasetechnologies.service;

import com.example.simulatordatabasetechnologies.dto.GroupDTO;
import com.example.simulatordatabasetechnologies.dto.UserInfoDTO;
import com.example.simulatordatabasetechnologies.dto.UserTasksStatsDTO;

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

}
