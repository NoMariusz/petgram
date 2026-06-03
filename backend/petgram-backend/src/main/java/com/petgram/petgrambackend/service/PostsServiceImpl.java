package com.petgram.petgrambackend.service;

import com.petgram.petgrambackend.dto.PostCommentRequest;
import com.petgram.petgrambackend.dto.PostCreateRequest;
import com.petgram.petgrambackend.entity.PetEntity;
import com.petgram.petgrambackend.entity.PostCommentEntity;
import com.petgram.petgrambackend.entity.PostEntity;
import com.petgram.petgrambackend.entity.UserEntity;
import com.petgram.petgrambackend.repository.PostCommentsRepository;
import com.petgram.petgrambackend.repository.PostRepository;
import com.petgram.petgrambackend.repository.UsersRepository;
import com.petgram.petgrambackend.view.PostCommentSummaryResponse;
import com.petgram.petgrambackend.view.PostFeedResponse;
import com.petgram.petgrambackend.view.PostLikeSummaryResponse;
import com.petgram.petgrambackend.view.PostSummaryResponse;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashSet;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Set;

import static org.springframework.http.HttpStatus.NOT_FOUND;

@Service
public class PostsServiceImpl implements PostsService {

    private final PostRepository postRepository;
    private final UsersRepository usersRepository;
    private final PostCommentsRepository postCommentsRepository;
    private final FileStorageService fileStorageService;

    public PostsServiceImpl(
            PostRepository postRepository,
            UsersRepository usersRepository,
            PostCommentsRepository postCommentsRepository,
            FileStorageService fileStorageService) {
        this.postRepository = postRepository;
        this.usersRepository = usersRepository;
        this.postCommentsRepository = postCommentsRepository;
        this.fileStorageService = fileStorageService;
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
            ent.setPostPictureUrl(fileStorageService.saveBase64(req.getPostPicture()));

        if (req.getPets() != null && !req.getPets().isEmpty() && req.getPets().stream().noneMatch(String::isBlank)) {
            List<PetEntity> authorPetsMentioned = author.getPets().stream()
                    .filter(x -> req.getPets().contains(x.getName())).toList();

            if (authorPetsMentioned.size() == req.getPets().size())
                ent.setPets(authorPetsMentioned);
            else
                throw new ResponseStatusException(NOT_FOUND, "Pets not found");
        }

        return this.toSummaryResponse(postRepository.save(ent));
    }

    @Override
    public PostLikeSummaryResponse toggleLikePost(Long postId, Authentication authentication) {
        UserEntity liker = this.usersRepository.findByUsername(authentication.getName())
                .orElseThrow(() -> new ResponseStatusException(NOT_FOUND, "Current user not found"));

        PostEntity ent = this.postRepository.findById(postId)
                .orElseThrow(() -> new ResponseStatusException(NOT_FOUND, "Post not found"));

        // ideally this should be a set and not a list...
        if (! ent.getLikedByUsers().remove(liker))
            ent.getLikedByUsers().add(liker);

        return this.toLikeSummaryResponse(postRepository.save(ent), liker);
    }

    @Override
    public PostLikeSummaryResponse getLikePost(Long postId, Authentication authentication) {
        UserEntity liker = this.usersRepository.findByUsername(authentication.getName())
                .orElseThrow(() -> new ResponseStatusException(NOT_FOUND, "Current user not found"));

        PostEntity ent = this.postRepository.findById(postId)
                .orElseThrow(() -> new ResponseStatusException(NOT_FOUND, "Post not found"));

        return this.toLikeSummaryResponse(ent, liker);
    }

    @Override
    public PostCommentSummaryResponse postCommentPost(
            Long postId, PostCommentRequest req, Authentication authentication) {
        UserEntity loggedInUser = this.usersRepository.findByUsername(authentication.getName())
                .orElseThrow(() -> new ResponseStatusException(NOT_FOUND, "Current user not found"));

        PostEntity post = this.postRepository.findById(postId)
                .orElseThrow(() -> new ResponseStatusException(NOT_FOUND, "Post not found"));

        PostCommentEntity ent = new PostCommentEntity(
                req.getText(),
                loggedInUser,
                post
        );

        return this.toCommentSummaryResponse(this.postCommentsRepository.save(ent), loggedInUser);
    }

    @Override
    public List<PostCommentSummaryResponse> getCommentsPost(Long postId, Authentication authentication) {
        UserEntity loggedInUser = this.usersRepository.findByUsername(authentication.getName())
                .orElseThrow(() -> new ResponseStatusException(NOT_FOUND, "Current user not found"));

        PostEntity ent = this.postRepository.findById(postId)
                .orElseThrow(() -> new ResponseStatusException(NOT_FOUND, "Post not found"));

        return ent.getPostComments().stream()
                .map(x -> this.toCommentSummaryResponse(x, loggedInUser)).toList();
    }

    @Override
    public PostCommentSummaryResponse toggleLikeCommentPost(
            Long postId, Long commentId, Authentication authentication) {
        UserEntity loggedInUser = this.usersRepository.findByUsername(authentication.getName())
                .orElseThrow(() -> new ResponseStatusException(NOT_FOUND, "Current user not found"));

        PostEntity ent = this.postRepository.findById(postId)
                .orElseThrow(() -> new ResponseStatusException(NOT_FOUND, "Post not found"));

        if (ent.getPostComments().stream().noneMatch(x -> x.getId().equals(commentId)))
            throw new ResponseStatusException(NOT_FOUND, "Comment not found");

        PostCommentEntity comment = this.postCommentsRepository.findById(commentId)
                .orElseThrow(() -> new ResponseStatusException(NOT_FOUND, "Post not found"));

        if (! comment.getLikedByUsers().contains(loggedInUser))
            comment.getLikedByUsers().add(loggedInUser);

        return this.toCommentSummaryResponse(this.postCommentsRepository.save(comment), loggedInUser);
    }

    @Override
    public PostFeedResponse getFeed(Long cursor, int limit, Authentication authentication) {
        UserEntity currentUser = usersRepository.findByUsername(authentication.getName())
                .orElseThrow(() -> new ResponseStatusException(NOT_FOUND, "Current user not found"));

        Set<UserEntity> feedUsers = new HashSet<>(currentUser.getFollowing());
        feedUsers.add(currentUser);
        Set<PetEntity> feedPets = new HashSet<>(currentUser.getFollowedPets());

        Long effectiveCursor = cursor != null ? cursor : Long.MAX_VALUE;

        Pageable pageable = org.springframework.data.domain.PageRequest.of(0, limit + 1);
        List<PostEntity> feedPosts = postRepository.findFeedPostsCursor(feedUsers, feedPets, effectiveCursor, pageable);

        boolean hasNext = feedPosts.size() > limit;
        if (hasNext)
            feedPosts = feedPosts.subList(0, limit);

        List<PostSummaryResponse> postResponses = feedPosts.stream()
                .map(this::toSummaryResponse)
                .toList();

        Long nextCursor = null;
        if (hasNext && !postResponses.isEmpty())
            nextCursor = postResponses.get(postResponses.size() - 1).id();

        return new PostFeedResponse(postResponses, nextCursor);
    }

    private PostSummaryResponse toSummaryResponse(PostEntity post) {
        return new PostSummaryResponse(
                post.getId(),
                post.getText(),
                post.getPostPictureUrl(),
                post.getCreator() == null ? null : post.getCreator().getUsername(),
                post.getCreatedAt(),
                post.getLikedByUsers() == null ? 0L : post.getLikedByUsers().size(),
                post.getPostComments() == null ? 0L : post.getPostComments().size(),
                post.getPets().stream().map(PetEntity::getName).toList()
        );
    }

    private PostLikeSummaryResponse toLikeSummaryResponse(PostEntity post, UserEntity liker) {
        return new PostLikeSummaryResponse(
                post.getId(),
                post.getLikedByUsers() == null ? 0L : post.getLikedByUsers().size(),
                post.getLikedByUsers().contains(liker)
        );
    }

    private PostCommentSummaryResponse toCommentSummaryResponse(PostCommentEntity comment, UserEntity user) {
        return new PostCommentSummaryResponse(
                comment.getId(),
                comment.getText(),
                comment.getCreator() == null ? null : comment.getCreator().getUsername(),
                comment.getCreatedAt(),
                comment.getUpdatedAt(),
                comment.getLikedByUsers() == null ? 0L : comment.getLikedByUsers().size(),
                comment.getLikedByUsers().contains(user)
        );
    }
}
