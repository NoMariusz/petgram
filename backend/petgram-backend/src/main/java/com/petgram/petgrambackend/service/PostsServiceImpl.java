package com.petgram.petgrambackend.service;

import com.petgram.petgrambackend.entity.PostEntity;
import com.petgram.petgrambackend.repository.PostRepository;
import com.petgram.petgrambackend.view.PostSummaryResponse;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PostsServiceImpl implements PostsService {

    private final PostRepository postRepository;

    public PostsServiceImpl(PostRepository postRepository) {
        this.postRepository = postRepository;
    }

    @Override
    public List<PostSummaryResponse> getPostsByUser(Long userId) {
        List<PostEntity> posts = postRepository.findAllWithLikesByCreatorId(userId);
        return posts.stream().map(p -> new PostSummaryResponse(
                p.getId(),
                p.getText(),
                p.getPostPictureUrl(),
                p.getCreator() == null ? null : p.getCreator().getUsername(),
                p.getCreatedAt(),
                p.getLikedByUsers() == null ? 0L : p.getLikedByUsers().size()
        )).toList();
    }
}
