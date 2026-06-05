package com.petgram.petgrambackend.posts;

import com.petgram.petgrambackend.dto.PostCreateRequest;
import com.petgram.petgrambackend.entity.PostEntity;
import com.petgram.petgrambackend.entity.RoleEntity;
import com.petgram.petgrambackend.entity.UserEntity;
import com.petgram.petgrambackend.repository.PostCommentsRepository;
import com.petgram.petgrambackend.repository.PostRepository;
import com.petgram.petgrambackend.repository.UsersRepository;
import com.petgram.petgrambackend.service.FileStorageService;
import com.petgram.petgrambackend.service.FileStorageServiceImpl;
import com.petgram.petgrambackend.service.PostsServiceImpl;
import com.petgram.petgrambackend.view.PostLikeSummaryResponse;
import com.petgram.petgrambackend.view.PostSummaryResponse;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.test.util.ReflectionTestUtils;

import com.petgram.petgrambackend.dto.PostCommentRequest;
import com.petgram.petgrambackend.dto.PostSearchRequest;
import com.petgram.petgrambackend.dto.WithAdvancedFiltersPostSearchRequest;
import com.petgram.petgrambackend.entity.*;
import com.petgram.petgrambackend.view.PostCommentSummaryResponse;
import com.petgram.petgrambackend.view.PostFeedResponse;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.mockito.ArgumentMatchers.eq;
import static org.springframework.http.HttpStatus.NOT_FOUND;


public class PostsServiceTests {

    @Test
    @DisplayName("PostsService.postPost creates and saves a post successfully")
    void createPostSucceeds() {
        PostRepository postRepository = mock(PostRepository.class);
        UsersRepository usersRepository = mock(UsersRepository.class);
        PostCommentsRepository postCommentsRepository = mock(PostCommentsRepository.class);
        FileStorageServiceImpl fileStorageService = mock(FileStorageServiceImpl.class);

        PostsServiceImpl service = new PostsServiceImpl(
                postRepository,
                usersRepository,
                postCommentsRepository,
                fileStorageService
        );

        RoleEntity role = new RoleEntity("Pet owner", "Default role");
        UserEntity current = new UserEntity("john", "john@example.com", "hash", "John", "Doe", role);
        org.springframework.test.util.ReflectionTestUtils.setField(current, "id", 1L);

        PostCreateRequest request = new PostCreateRequest();
        org.springframework.test.util.ReflectionTestUtils.setField(request, "text", "A beautiful day with my pet!");
        org.springframework.test.util.ReflectionTestUtils.setField(request, "postPicture", "base64-image");
        org.springframework.test.util.ReflectionTestUtils.setField(request, "pets", new ArrayList<>());

        Authentication authentication = new UsernamePasswordAuthenticationToken("john", null);

        when(usersRepository.findByUsername("john")).thenReturn(Optional.of(current));
        when(fileStorageService.saveBase64("base64-image")).thenReturn("/data/uploads/post.png");

        // Mock the save to return the constructed entity with an ID
        when(postRepository.save(any(PostEntity.class))).thenAnswer(invocation -> {
            PostEntity savedPost = invocation.getArgument(0);
            org.springframework.test.util.ReflectionTestUtils.setField(savedPost, "id", 100L);
            return savedPost;
        });

        PostSummaryResponse response = service.postPost(request, authentication);

        assertNotNull(response);
        verify(postRepository, times(1)).save(any(PostEntity.class));
        verify(fileStorageService, times(1)).saveBase64("base64-image");
    }

    @Test
    @DisplayName("PostsService.getPostById throws NOT_FOUND when post does not exist")
    void getPostByIdThrowsWhenNotFound() {
        PostRepository postRepository = mock(PostRepository.class);
        UsersRepository usersRepository = mock(UsersRepository.class);
        PostCommentsRepository postCommentsRepository = mock(PostCommentsRepository.class);
        FileStorageServiceImpl fileStorageService = mock(FileStorageServiceImpl.class);

        PostsServiceImpl service = new PostsServiceImpl(
                postRepository,
                usersRepository,
                postCommentsRepository,
                fileStorageService
        );

        when(postRepository.findById(99L)).thenReturn(Optional.empty());

        assertThrows(NoSuchElementException.class, () -> service.getPostById(99L));
    }

    @Test
    @DisplayName("PostsService.toggleLikePost successfully adds a like if not already liked")
    void toggleLikePostAddsLikeSuccessfully() {
        PostRepository postRepository = mock(PostRepository.class);
        UsersRepository usersRepository = mock(UsersRepository.class);
        PostCommentsRepository postCommentsRepository = mock(PostCommentsRepository.class);
        FileStorageServiceImpl fileStorageService = mock(FileStorageServiceImpl.class);

        PostsServiceImpl service = new PostsServiceImpl(
                postRepository,
                usersRepository,
                postCommentsRepository,
                fileStorageService
        );

        RoleEntity role = new RoleEntity("Pet owner", "Default role");
        UserEntity currentUser = new UserEntity("john", "john@example.com", "hash", "John", "Doe", role);
        org.springframework.test.util.ReflectionTestUtils.setField(currentUser, "id", 1L);

        UserEntity postCreator = new UserEntity("anna", "anna@example.com", "hash", "Anna", "Doe", role);
        org.springframework.test.util.ReflectionTestUtils.setField(postCreator, "id", 2L);

        PostEntity post = new PostEntity("Check out my dog!", postCreator);
        org.springframework.test.util.ReflectionTestUtils.setField(post, "id", 10L);
        // Ensure the likedByUsers list is initialized and empty
        post.setLikedByUsers(new ArrayList<>());

        Authentication authentication = new UsernamePasswordAuthenticationToken("john", null);

        when(usersRepository.findByUsername("john")).thenReturn(Optional.of(currentUser));
        when(postRepository.findById(10L)).thenReturn(Optional.of(post));
        when(postRepository.save(post)).thenReturn(post);

        PostLikeSummaryResponse response = service.toggleLikePost(10L, authentication);

        assertNotNull(response);
        assertTrue(post.getLikedByUsers().contains(currentUser));
        verify(postRepository, times(1)).save(post);
    }

        @Test
        @DisplayName("PostsService.getPostsByUser fetches and maps posts correctly")
        void getPostsByUserSucceeds() {
            PostRepository postRepository = mock(PostRepository.class);
            UsersRepository usersRepository = mock(UsersRepository.class);
            PostCommentsRepository postCommentsRepository = mock(PostCommentsRepository.class);
            FileStorageService fileStorageService = mock(FileStorageService.class);

            PostsServiceImpl service = new PostsServiceImpl(
                    postRepository, usersRepository, postCommentsRepository, fileStorageService
            );

            RoleEntity role = new RoleEntity("Pet owner", "Default");
            UserEntity author = new UserEntity("john", "john@example.com", "hash", "John", "Doe", role);
            PostEntity post = new PostEntity("Hello world", author);
            ReflectionTestUtils.setField(post, "id", 100L);
            ReflectionTestUtils.setField(post, "createdAt", LocalDateTime.now());

            when(postRepository.findAllWithLikesByCreatorId(1L)).thenReturn(List.of(post));

            List<PostSummaryResponse> responses = service.getPostsByUser(1L);

            assertEquals(1, responses.size());
            assertEquals(100L, responses.get(0).id());
            assertEquals("john", responses.get(0).creatorName());
            assertEquals("Hello world", responses.get(0).text());
        }

        @Test
        @DisplayName("PostsService.postCommentPost successfully saves a comment")
        void postCommentPostSucceeds() {
            PostRepository postRepository = mock(PostRepository.class);
            UsersRepository usersRepository = mock(UsersRepository.class);
            PostCommentsRepository postCommentsRepository = mock(PostCommentsRepository.class);
            FileStorageService fileStorageService = mock(FileStorageService.class);

            PostsServiceImpl service = new PostsServiceImpl(
                    postRepository, usersRepository, postCommentsRepository, fileStorageService
            );

            RoleEntity role = new RoleEntity("Pet owner", "Default");
            UserEntity current = new UserEntity("john", "john@example.com", "hash", "John", "Doe", role);
            ReflectionTestUtils.setField(current, "id", 1L);

            PostEntity post = new PostEntity("Original post text", current);
            ReflectionTestUtils.setField(post, "id", 10L);

            PostCommentRequest req = new PostCommentRequest();
            ReflectionTestUtils.setField(req, "text", "Great post!");

            Authentication auth = new UsernamePasswordAuthenticationToken("john", null);

            when(usersRepository.findByUsername("john")).thenReturn(Optional.of(current));
            when(postRepository.findById(10L)).thenReturn(Optional.of(post));

            when(postCommentsRepository.save(any(PostCommentEntity.class))).thenAnswer(invocation -> {
                PostCommentEntity savedComment = invocation.getArgument(0);
                ReflectionTestUtils.setField(savedComment, "id", 50L);
                ReflectionTestUtils.setField(savedComment, "createdAt", LocalDateTime.now());
                ReflectionTestUtils.setField(savedComment, "updatedAt", LocalDateTime.now());
                return savedComment;
            });

            PostCommentSummaryResponse response = service.postCommentPost(10L, req, auth);

            assertNotNull(response);
            assertEquals(50L, response.id());
            assertEquals("Great post!", response.text());
            assertEquals("john", response.creatorUsername());
            verify(postCommentsRepository, times(1)).save(any(PostCommentEntity.class));
        }

        @Test
        @DisplayName("PostsService.toggleLikeCommentPost throws NOT_FOUND when comment not linked to post")
        void toggleLikeCommentPostValidatesCommentBelongsToPost() {
            PostRepository postRepository = mock(PostRepository.class);
            UsersRepository usersRepository = mock(UsersRepository.class);
            PostCommentsRepository postCommentsRepository = mock(PostCommentsRepository.class);
            FileStorageService fileStorageService = mock(FileStorageService.class);

            PostsServiceImpl service = new PostsServiceImpl(
                    postRepository, usersRepository, postCommentsRepository, fileStorageService
            );

            UserEntity current = new UserEntity("john", "john@example.com", "hash", "John", "Doe", null);
            PostEntity post = new PostEntity("Post text", current);
            // Ensure post has empty comments
            ReflectionTestUtils.setField(post, "postComments", new ArrayList<>());

            Authentication auth = new UsernamePasswordAuthenticationToken("john", null);

            when(usersRepository.findByUsername("john")).thenReturn(Optional.of(current));
            when(postRepository.findById(10L)).thenReturn(Optional.of(post));

            // Tries to like comment 99L, but it's not in post.getPostComments()
            ResponseStatusException ex = assertThrows(ResponseStatusException.class,
                    () -> service.toggleLikeCommentPost(10L, 99L, auth));

            assertEquals(NOT_FOUND, ex.getStatusCode());
            assertEquals("Comment not found", ex.getReason());
        }

        @Test
        @DisplayName("PostsService.getFeed accurately maps pagination and nextCursor")
        void getFeedReturnsCorrectCursorAndLimits() {
            PostRepository postRepository = mock(PostRepository.class);
            UsersRepository usersRepository = mock(UsersRepository.class);
            PostCommentsRepository postCommentsRepository = mock(PostCommentsRepository.class);
            FileStorageService fileStorageService = mock(FileStorageService.class);

            PostsServiceImpl service = new PostsServiceImpl(
                    postRepository, usersRepository, postCommentsRepository, fileStorageService
            );

            UserEntity current = new UserEntity("john", "john@example.com", "hash", "John", "Doe", null);
            ReflectionTestUtils.setField(current, "id", 1L);
            current.setFollowing(new ArrayList<>());
            current.setFollowedPets(new ArrayList<>());

            // Mock 3 posts from repository for a limit of 2 (to simulate hasNext = true)
            PostEntity p1 = new PostEntity("Post 1", current);
            ReflectionTestUtils.setField(p1, "id", 103L);
            PostEntity p2 = new PostEntity("Post 2", current);
            ReflectionTestUtils.setField(p2, "id", 102L);
            PostEntity p3 = new PostEntity("Post 3", current);
            ReflectionTestUtils.setField(p3, "id", 101L);

            List<PostEntity> fetchedPosts = new ArrayList<>(List.of(p1, p2, p3));

            Authentication auth = new UsernamePasswordAuthenticationToken("john", null);
            Pageable expectedPageable = PageRequest.of(0, 3); // limit(2) + 1

            when(usersRepository.findByUsername("john")).thenReturn(Optional.of(current));
            when(postRepository.findFeedPostsCursor(any(), any(), eq(Long.MAX_VALUE), eq(expectedPageable)))
                    .thenReturn(fetchedPosts);

            // Fetch feed with limit = 2
            PostFeedResponse response = service.getFeed(null, 2, auth);

            // We expect size 2 (it sublists the extra one)
            assertEquals(2, response.posts().size());
            assertEquals(103L, response.posts().get(0).id());
            assertEquals(102L, response.posts().get(1).id());
            // nextCursor should be the ID of the last element in the sublisted array
            assertEquals(102L, response.nextCursor());
        }

        @Test
        @DisplayName("PostsService.searchPosts returns mapped search results")
        void searchPostsReturnsResults() {
            PostRepository postRepository = mock(PostRepository.class);
            UsersRepository usersRepository = mock(UsersRepository.class);
            PostCommentsRepository postCommentsRepository = mock(PostCommentsRepository.class);
            FileStorageService fileStorageService = mock(FileStorageService.class);

            PostsServiceImpl service = new PostsServiceImpl(
                    postRepository, usersRepository, postCommentsRepository, fileStorageService
            );

            UserEntity current = new UserEntity("john", "john@example.com", "hash", "John", "Doe", null);
            PostEntity matchedPost = new PostEntity("Look at my cute dog", current);
            ReflectionTestUtils.setField(matchedPost, "id", 88L);

            PostSearchRequest req = new PostSearchRequest();
            ReflectionTestUtils.setField(req, "query", "cute dog");

            Authentication auth = new UsernamePasswordAuthenticationToken("john", null);

            when(postRepository.searchBasic("cute dog")).thenReturn(List.of(matchedPost));

            PostFeedResponse response = service.searchPosts(req, auth);

            assertEquals(1, response.posts().size());
            assertEquals("Look at my cute dog", response.posts().get(0).text());
            assertEquals(0L, response.nextCursor()); // Hardcoded in your impl for search basic
        }

        @Test
        @DisplayName("PostsService.searchPostsAdvanced successfully maps parameters to repository")
        void searchPostsAdvancedMapsParameters() {
            PostRepository postRepository = mock(PostRepository.class);
            UsersRepository usersRepository = mock(UsersRepository.class);
            PostCommentsRepository postCommentsRepository = mock(PostCommentsRepository.class);
            FileStorageService fileStorageService = mock(FileStorageService.class);

            PostsServiceImpl service = new PostsServiceImpl(
                    postRepository, usersRepository, postCommentsRepository, fileStorageService
            );

            WithAdvancedFiltersPostSearchRequest req = new WithAdvancedFiltersPostSearchRequest();
            LocalDate targetDate = LocalDate.of(2025, 1, 1);
            ReflectionTestUtils.setField(req, "query", "vacation");
            ReflectionTestUtils.setField(req, "authorHandle", "anna");
            ReflectionTestUtils.setField(req, "taggedPet", "burek");
            ReflectionTestUtils.setField(req, "creationDate", targetDate);

            Authentication auth = new UsernamePasswordAuthenticationToken("john", null);

            UserEntity current = new UserEntity("anna", "anna@example.com", "hash", "Anna", "Doe", null);
            PostEntity post = new PostEntity("Family vacation", current);
            ReflectionTestUtils.setField(post, "id", 77L);

            when(postRepository.searchAdvanced("vacation", "anna", "burek", targetDate))
                    .thenReturn(List.of(post));

            PostFeedResponse response = service.searchPostsAdvanced(req, auth);

            assertEquals(1, response.posts().size());
            assertEquals(77L, response.posts().get(0).id());
            assertEquals("anna", response.posts().get(0).creatorName());
        }
    }