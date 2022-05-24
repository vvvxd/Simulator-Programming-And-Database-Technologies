package com.example.simulatordatabasetechnologies.service;

import com.example.simulatordatabasetechnologies.dto.CommentsDTO;
import com.example.simulatordatabasetechnologies.dto.CommentsRequestDTO;

import java.util.List;

public interface CommentsService {

    List<CommentsDTO> getCommentsByTaskId(Long id);
    void addComment(CommentsRequestDTO data);

}
