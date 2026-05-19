package com.petgram.petgrambackend.controller;

import com.petgram.petgrambackend.service.PostsService;
import com.petgram.petgrambackend.view.PostSummaryResponse;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.core.Authentication;
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
}
