package com.petgram.petgrambackend.service;

import com.petgram.petgrambackend.dto.UserCreateRequest;
import com.petgram.petgrambackend.entity.RoleEntity;
import com.petgram.petgrambackend.entity.UserEntity;
import com.petgram.petgrambackend.repository.RoleRepository;
import com.petgram.petgrambackend.repository.UsersRepository;
import com.petgram.petgrambackend.view.UserCreateResponse;
import com.petgram.petgrambackend.view.UserDataResponse;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import static org.springframework.http.HttpStatus.CONFLICT;
import static org.springframework.http.HttpStatus.NOT_FOUND;

@Service
public class UsersServiceImpl implements UsersService {

	private static final String DEFAULT_ROLE_NAME = "USER";

	private final UsersRepository usersRepository;
	private final RoleRepository roleRepository;
	private final PasswordEncoder passwordEncoder;
	private final UserActivationEmailService userActivationEmailService;

	public UsersServiceImpl(
			UsersRepository usersRepository,
			RoleRepository roleRepository,
			PasswordEncoder passwordEncoder,
			UserActivationEmailService userActivationEmailService
	) {
		this.usersRepository = usersRepository;
		this.roleRepository = roleRepository;
		this.passwordEncoder = passwordEncoder;
		this.userActivationEmailService = userActivationEmailService;
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
		user.setProfilePictureUrl(request.getProfilePictureUrl());
		user.setLocation(request.getLocation());
		user.setWebsite(request.getWebsite());
		user.setIsActive(false);
		user.setIsVerified(false);

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
}
