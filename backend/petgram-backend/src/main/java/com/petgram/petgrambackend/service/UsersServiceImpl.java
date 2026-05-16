package com.petgram.petgrambackend.service;

import com.petgram.petgrambackend.dto.UserCreateRequest;
import com.petgram.petgrambackend.entity.PostEntity;
import com.petgram.petgrambackend.entity.RoleEntity;
import com.petgram.petgrambackend.entity.UserEntity;
import com.petgram.petgrambackend.repository.PostRepository;
import com.petgram.petgrambackend.repository.RoleRepository;
import com.petgram.petgrambackend.repository.UsersRepository;
import com.petgram.petgrambackend.view.UserCreateResponse;
import com.petgram.petgrambackend.view.UserDataResponse;
import com.petgram.petgrambackend.view.UserProfileResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

import static org.springframework.http.HttpStatus.CONFLICT;
import static org.springframework.http.HttpStatus.NOT_FOUND;

@Service
public class UsersServiceImpl implements UsersService {

	private static final String DEFAULT_ROLE_NAME = "USER";

	private final UsersRepository usersRepository;
	private final PostRepository postRepository;
	private final RoleRepository roleRepository;
	private final PasswordEncoder passwordEncoder;
	private final UserActivationEmailService userActivationEmailService;
	private final FileStorageService fileStorageService;

	public UsersServiceImpl(
            UsersRepository usersRepository,
            PostRepository postRepository,
            RoleRepository roleRepository,
            PasswordEncoder passwordEncoder,
            UserActivationEmailService userActivationEmailService, FileStorageService fileStorageService
    ) {
		this.usersRepository = usersRepository;
		this.postRepository = postRepository;
		this.roleRepository = roleRepository;
		this.passwordEncoder = passwordEncoder;
		this.userActivationEmailService = userActivationEmailService;
        this.fileStorageService = fileStorageService;
    }

	@Override
	@Transactional
	public UserCreateResponse createUser(UserCreateRequest request) {
		usersRepository.findByUsername(request.getUsername()).ifPresent(existingUser -> {
			throw new ResponseStatusException(CONFLICT, "Username is already taken");
		});
		usersRepository.findByEmail(request.getEmail()).ifPresent(existingUser -> {
			throw new ResponseStatusException(CONFLICT, "Email is already taken");
		});

		RoleEntity defaultRole = getOrCreateDefaultRole();

		UserEntity user = new UserEntity(
				request.getUsername(),
				request.getEmail(),
				passwordEncoder.encode(request.getPassword()),
				request.getFirstName(),
				request.getLastName(),
				defaultRole
		);
		user.setBio(request.getBio());
		user.setLocation(request.getLocation());
		user.setWebsite(request.getWebsite());
		user.setIsActive(false);
		user.setIsVerified(false);

		// handle file save
		String file = request.getProfilePictureImage();
		if (file != null && !file.isEmpty()) {
			String imageUrl = fileStorageService.saveBase64(file);
			user.setProfilePictureUrl(imageUrl); // Stores something like "/uploads/abc-123.jpg"
		}

		UserEntity savedUser = usersRepository.save(user);
		userActivationEmailService.sendActivationEmail(savedUser);

		return toResponse(savedUser);
	}

	private RoleEntity getOrCreateDefaultRole() {
		return roleRepository.findByName(DEFAULT_ROLE_NAME)
				.orElseGet(() -> roleRepository.save(new RoleEntity(DEFAULT_ROLE_NAME, "Default Petgram user role")));
	}

	private UserCreateResponse toResponse(UserEntity user) {
		return new UserCreateResponse(user.getId(), user.getUsername(), user.getEmail());
	}

	@Override
	@Transactional(readOnly = true)
	public UserDataResponse getCurrentUserData(String username) {
		UserEntity user = usersRepository.findByUsername(username)
				.orElseThrow(() -> new ResponseStatusException(NOT_FOUND, "User not found"));

		String roleName = user.getRole() == null ? null : user.getRole().getName();
		boolean active = Boolean.TRUE.equals(user.getIsActive());
		boolean verified = Boolean.TRUE.equals(user.getIsVerified());

		return new UserDataResponse(
				user.getId(),
				user.getUsername(),
				user.getEmail(),
				user.getFirstName(),
				user.getLastName(),
				roleName,
				active,
				verified,
				user.getCreatedAt()
		);
	}

	@Override
	@Transactional(readOnly = true)
	public UserProfileResponse getCurrentUserProfile(Authentication authentication) {
		String username = authentication.getName();
		UserEntity user = usersRepository.findByUsername(username)
				.orElseThrow(() -> new ResponseStatusException(NOT_FOUND, "User not found"));

		return getUserProfileById(user.getId(), authentication);
	}

	@Override
	@Transactional(readOnly = true)
	public UserProfileResponse getUserProfileById(Long userId, Authentication authentication) {
		String currentUsername = authentication.getName();
		UserEntity currentUser = usersRepository.findByUsername(currentUsername)
				.orElseThrow(() -> new ResponseStatusException(NOT_FOUND, "Current user not found"));
		Long currentUserId = currentUser.getId();

		System.out.println("Fetching profile for userId: " + userId + " as currentUserId: " + currentUserId);
		UserEntity user = usersRepository.findWithProfileById(userId)
				.orElseThrow(() -> new ResponseStatusException(NOT_FOUND, "User not found"));

		String roleName = user.getRole() == null ? null : user.getRole().getName();

		List<UserProfileResponse.UserProfilePetResponse> petResponses = user.getPets().stream()
				.map(pet -> new UserProfileResponse.UserProfilePetResponse(
						pet.getId(),
						pet.getName(),
						pet.getProfilePictureUrl()
				))
				.toList();

		Optional<PostEntity> pinnedPost = postRepository.findFirstByCreatorIdAndIsPinnedTrueOrderByUpdatedAtDesc(user.getId());

		UserProfileResponse.UserPinnedPostResponse pinnedPostResponse = pinnedPost
				.map(post -> new UserProfileResponse.UserPinnedPostResponse(
						post.getId(),
						post.getText(),
						post.getPostPictureUrl(),
						post.getCreator() == null ? null : post.getCreator().getUsername(),
						post.getLikedByUsers() == null ? 0L : post.getLikedByUsers().size()
				))
				.orElse(null);

		// Check if current user follows this user
		Boolean isFollowed = currentUser.getFollowing().stream()
				.anyMatch(followedUser -> followedUser.getId().equals(userId));

		// Calculate counts
		long postsCount = usersRepository.countCreatedPostsById(userId);
		long followersCount = usersRepository.countFollowersById(userId);
		long followingCount = usersRepository.countFollowingById(userId);
		boolean isOwnProfile = userId.equals(currentUserId);

		return new UserProfileResponse(
				user.getId(),
				user.getUsername(),
				user.getFirstName(),
				user.getLastName(),
				user.getBio(),
				user.getProfilePictureUrl(),
				user.getLocation(),
				roleName,
				petResponses,
				pinnedPostResponse,
				isFollowed,
				postsCount,
				followersCount,
				followingCount,
				isOwnProfile
		);
	}
}
