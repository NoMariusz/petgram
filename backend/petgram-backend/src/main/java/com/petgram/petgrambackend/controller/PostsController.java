package com.petgram.petgrambackend.controller;

import com.petgram.petgrambackend.dto.PostCommentRequest;
import com.petgram.petgrambackend.dto.PostCreateRequest;
import com.petgram.petgrambackend.dto.PostSearchRequest;
import com.petgram.petgrambackend.dto.WithAdvancedFiltersPostSearchRequest;
import com.petgram.petgrambackend.service.PostsService;
import com.petgram.petgrambackend.view.PostCommentSummaryResponse;
import com.petgram.petgrambackend.view.PostFeedResponse;
import com.petgram.petgrambackend.view.PostLikeSummaryResponse;
import com.petgram.petgrambackend.view.PostSummaryResponse;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/posts")
public class PostsController {

    private final PostsService postsService;

    public PostsController(PostsService postsService) {
        this.postsService = postsService;
    }

    @GetMapping("/users/{id}/all")
    public List<PostSummaryResponse> getPostsByUser(@PathVariable("id") Long userId, Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Forbidden");
        }
        return postsService.getPostsByUser(userId);
    }

    @GetMapping("/pets/{id}/memories")
    public List<PostSummaryResponse> getPostsByPet(@PathVariable("id") Long petId, Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Forbidden");
        }
        return postsService.getPostsByPet(petId);
    }

    @GetMapping("/{id}")
    public PostSummaryResponse getPostById(@PathVariable("id") Long id, Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Forbidden");
        }
        return postsService.getPostById(id);
    }

    @PostMapping
    public PostSummaryResponse postPost(@Valid @RequestBody PostCreateRequest req, Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Forbidden");
        }
        return postsService.postPost(req, authentication);
    }

    @PostMapping("/{id}/like")
    public PostLikeSummaryResponse toggleLikePost(@PathVariable("id") Long id, Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Forbidden");
        }
        return postsService.toggleLikePost(id, authentication);
    }

    @GetMapping("/{id}/like")
    public PostLikeSummaryResponse getLikePost(@PathVariable("id") Long id, Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Forbidden");
        }
        return postsService.getLikePost(id, authentication);
    }

    @PostMapping("/{id}/comment")
    public PostCommentSummaryResponse postCommentsPost(
            @PathVariable("id") Long id, @Valid @RequestBody PostCommentRequest req, Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Forbidden");
        }
        return postsService.postCommentPost(id, req, authentication);
    }

    @GetMapping("/{id}/comment")
    public List<PostCommentSummaryResponse> getCommentsPost(@PathVariable("id") Long id, Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Forbidden");
        }
        return postsService.getCommentsPost(id, authentication);
    }

    @PostMapping("/{id}/comment/{commId}/like")
    public PostCommentSummaryResponse toggleLikeCommentPost(
            @PathVariable("id") Long postId, @PathVariable("commId") Long commentId, Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Forbidden");
        }
        return postsService.toggleLikeCommentPost(postId, commentId, authentication);
    }

    @GetMapping("/feed")
    public PostFeedResponse getFeed(
            @RequestParam(required = false) Long cursor,
            @RequestParam(defaultValue = "10") int limit,
            Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Forbidden");
        }
        return postsService.getFeed(cursor, limit, authentication);
    }

    @PostMapping("/search")
    public PostFeedResponse searchPosts(@Valid @RequestBody PostSearchRequest req, Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Forbidden");
        }
        return postsService.searchPosts(req, authentication);
    }

    @PostMapping("/search/advanced")
    public PostFeedResponse searchPostsAdvanced(
            @Valid @RequestBody WithAdvancedFiltersPostSearchRequest req,
            Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Forbidden");
        }
        return postsService.searchPostsAdvanced(req, authentication);
    }
}
