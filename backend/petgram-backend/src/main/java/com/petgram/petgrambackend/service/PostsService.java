package com.petgram.petgrambackend.service;

import com.petgram.petgrambackend.dto.PostCommentRequest;
import com.petgram.petgrambackend.dto.PostCreateRequest;
import com.petgram.petgrambackend.dto.PostSearchRequest;
import com.petgram.petgrambackend.dto.WithAdvancedFiltersPostSearchRequest;
import com.petgram.petgrambackend.view.PostCommentSummaryResponse;
import com.petgram.petgrambackend.view.PostFeedResponse;
import com.petgram.petgrambackend.view.PostLikeSummaryResponse;
import com.petgram.petgrambackend.view.PostSummaryResponse;
import org.springframework.security.core.Authentication;

import java.util.List;

public interface PostsService {
    List<PostSummaryResponse> getPostsByUser(Long userId);

    List<PostSummaryResponse> getPostsByPet(Long petId);

    PostSummaryResponse getPostById(Long postId);

    PostSummaryResponse postPost(PostCreateRequest req, Authentication authentication);

    PostLikeSummaryResponse toggleLikePost(Long postId, Authentication authentication);

    PostLikeSummaryResponse getLikePost(Long postId, Authentication authentication);

    PostCommentSummaryResponse postCommentPost(Long postId, PostCommentRequest req, Authentication authentication);

    List<PostCommentSummaryResponse> getCommentsPost(Long postId, Authentication authentication);

    PostCommentSummaryResponse toggleLikeCommentPost(Long postId, Long commentId, Authentication authentication);

    PostFeedResponse getFeed(Long cursor, int limit, Authentication authentication);

    PostFeedResponse searchPosts(PostSearchRequest req, Authentication authentication);

    PostFeedResponse searchPostsAdvanced(WithAdvancedFiltersPostSearchRequest req, Authentication authentication);
}
