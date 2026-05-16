package com.petgram.petgrambackend.service;

import com.petgram.petgrambackend.view.PostSummaryResponse;

import java.util.List;

public interface PostsService {
    List<PostSummaryResponse> getPostsByUser(Long userId);
}
