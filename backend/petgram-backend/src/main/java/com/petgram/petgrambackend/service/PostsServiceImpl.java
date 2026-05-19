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
        return posts.stream().map(this::toSummaryResponse).toList();
    }

    @Override
    public List<PostSummaryResponse> getPostsByPet(Long petId) {
        List<PostEntity> posts = postRepository.findAllWithLikesByPetId(petId);
        return posts.stream().map(this::toSummaryResponse).toList();
    }

    private PostSummaryResponse toSummaryResponse(PostEntity post) {
        return new PostSummaryResponse(
                post.getId(),
                post.getText(),
                post.getPostPictureUrl(),
                post.getCreator() == null ? null : post.getCreator().getUsername(),
                post.getCreatedAt(),
                post.getLikedByUsers() == null ? 0L : post.getLikedByUsers().size()
        );
    }
}
