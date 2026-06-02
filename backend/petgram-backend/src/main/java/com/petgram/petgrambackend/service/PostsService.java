package com.petgram.petgrambackend.service;

import com.petgram.petgrambackend.dto.PostCreateRequest;
import com.petgram.petgrambackend.view.PostSummaryResponse;
import org.springframework.security.core.Authentication;

import java.util.List;

public interface PostsService {
    List<PostSummaryResponse> getPostsByUser(Long userId);

    List<PostSummaryResponse> getPostsByPet(Long petId);

    PostSummaryResponse getPostById(Long postId);

    PostSummaryResponse postPost(PostCreateRequest req, Authentication authentication);
}
