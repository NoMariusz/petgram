package com.petgram.petgrambackend.service;

import com.petgram.petgrambackend.dto.PostCreateRequest;
import com.petgram.petgrambackend.entity.PetEntity;
import com.petgram.petgrambackend.entity.PostEntity;
import com.petgram.petgrambackend.entity.UserEntity;
import com.petgram.petgrambackend.repository.PostRepository;
import com.petgram.petgrambackend.repository.UsersRepository;
import com.petgram.petgrambackend.view.PostSummaryResponse;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.NoSuchElementException;

import static org.springframework.http.HttpStatus.NOT_FOUND;

@Service
public class PostsServiceImpl implements PostsService {

    private final PostRepository postRepository;
    private final UsersRepository usersRepository;

    public PostsServiceImpl(PostRepository postRepository, UsersRepository usersRepository) {
        this.postRepository = postRepository;
        this.usersRepository = usersRepository;
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

    @Override
    public PostSummaryResponse getPostById(Long postId) {
        return postRepository.findById(postId)
                .map(this::toSummaryResponse)
                .orElseThrow(() -> new NoSuchElementException("Post not found"));
    }

    @Override
    public PostSummaryResponse postPost(PostCreateRequest req, Authentication authentication) {
        UserEntity author = usersRepository.findByUsername(authentication.getName())
                .orElseThrow(() -> new ResponseStatusException(NOT_FOUND, "Current user not found"));

        PostEntity ent = new PostEntity(
                req.getText(),
                author
        );

        if (req.getPostPicture() != null && !req.getPostPicture().isBlank())
            ent.setPostPictureUrl(req.getPostPicture());

        if (!req.getPets().isEmpty() && req.getPets().stream().noneMatch(String::isBlank)) {
            List<PetEntity> authorPetsMentioned = author.getPets().stream()
                    .filter(x -> req.getPets().contains(x.getName())).toList();

            if (authorPetsMentioned.size() == req.getPets().size())
                ent.setPets(authorPetsMentioned);
            else
                throw new ResponseStatusException(NOT_FOUND, "Pets not found");
        }

        return this.toSummaryResponse(postRepository.save(ent));
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
