package com.petgram.petgrambackend.store;

import com.petgram.petgrambackend.entity.PetEntity;
import com.petgram.petgrambackend.entity.PostEntity;
import com.petgram.petgrambackend.entity.RoleEntity;
import com.petgram.petgrambackend.entity.UserEntity;
import com.petgram.petgrambackend.repository.PetRepository;
import com.petgram.petgrambackend.repository.PostRepository;
import com.petgram.petgrambackend.repository.RoleRepository;
import com.petgram.petgrambackend.repository.UsersRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Component
public class DatabaseSeeder implements CommandLineRunner {

	private static final String DEFAULT_PASSWORD = "password";

	private final RoleRepository roleRepository;
	private final UsersRepository usersRepository;
	private final PetRepository petRepository;
	private final PostRepository postRepository;
	private final PasswordEncoder passwordEncoder;

	public DatabaseSeeder(
			RoleRepository roleRepository,
			UsersRepository usersRepository,
			PetRepository petRepository,
			PostRepository postRepository,
			PasswordEncoder passwordEncoder
	) {
		this.roleRepository = roleRepository;
		this.usersRepository = usersRepository;
		this.petRepository = petRepository;
		this.postRepository = postRepository;
		this.passwordEncoder = passwordEncoder;
	}

	@Override
	@Transactional
	public void run(String... args) {
		if (roleRepository.count() > 0) {
			return;
		}

		RoleEntity adminRole = new RoleEntity("Admin", "Administrator with full access");
		RoleEntity moderatorRole = new RoleEntity("Moderator", "Moderator who can manage content");
		RoleEntity userRole = new RoleEntity("Pet owner", "Standard Petgram user");
		RoleEntity specialistRole = new RoleEntity("Specialist", "Professional in pet care and training");
		roleRepository.saveAll(List.of(adminRole, moderatorRole, userRole, specialistRole));

		UserEntity admin = new UserEntity(
				"admin",
				"admin@petgram.test",
				passwordEncoder.encode(DEFAULT_PASSWORD),
				"Admin",
				"User",
				adminRole
		);
		admin.setBio("Petgram administrator and site curator.");
		admin.setLocation("Kraków, Poland");
		admin.setIsActive(true);
		admin.setIsVerified(true);

		UserEntity joanna = new UserEntity(
				"kowanna",
				"joanna@petgram.test",
				passwordEncoder.encode(DEFAULT_PASSWORD),
				"Joanna",
				"Kowalska",
				userRole
		);
		joanna.setBio("Just a happy soul loving rainy afternoons and anyone who carries warm smile in their souls. Happy to see you!");
		joanna.setProfilePictureUrl("/data/seed/woman_profile_picture.png");
		joanna.setLocation("Kraków, Poland");
		joanna.setIsActive(true);
		joanna.setIsVerified(false);

		UserEntity bob = new UserEntity(
				"bob",
				"bob@petgram.test",
				passwordEncoder.encode(DEFAULT_PASSWORD),
				"Bob",
				"Stone",
				specialistRole
		);
		bob.setBio("Professional behaviorist and pet care specialist. Also free time photographer, and weekend coder.");
		bob.setProfilePictureUrl("/data/seed/man_profile_picture.png");
		bob.setLocation("Gdańsk, Poland");
		bob.setWebsite("https://bobstone.petcare");
		bob.setIsActive(true);
		bob.setIsVerified(true);

		usersRepository.saveAll(List.of(admin, joanna, bob));

		PetEntity azor = new PetEntity("Azor", joanna);
		azor.setBio("Just a happy soul chasing sunsets and squirrels. Azor is a certified\n" +
				"therapy dog who loves rainy afternoon naps and anyone who carries treats in their pockets");
		azor.setProfilePictureUrl("/data/seed/dog_profile_picture.png");

		PetEntity sally = new PetEntity("Sally", joanna);
		sally.setBio("A curious beagle with a nose for snacks.");
		sally.setProfilePictureUrl("/data/seed/dog_profile_picture2.png");

		PetEntity max = new PetEntity("Max", bob);
		max.setBio("A lazy cat who enjoys sunny windows.");
		max.setProfilePictureUrl("/data/seed/cat_profile_picture.png");

		petRepository.saveAll(List.of(azor, sally, max));

		PostEntity joannaPost1 = new PostEntity("Me & Azor at the best day of my life", joanna);
		joannaPost1.setPostPictureUrl("/data/seed/woman_dog_post.png");
		joannaPost1.setIsPinned(true);
		joannaPost1.getPets().add(azor);

		PostEntity joannaPost2 = new PostEntity("Second best day with Azor :)", joanna);
		joannaPost2.setPostPictureUrl("/data/seed/woman_dog_post2.png");
		joannaPost2.getPets().add(azor);

		PostEntity joannaPost3 = new PostEntity("Sally is soo fast!", joanna);
		joannaPost3.setPostPictureUrl("/data/seed/dog_post.jpg");
		joannaPost3.getPets().add(sally);

		postRepository.saveAll(List.of(joannaPost1, joannaPost2, joannaPost3));

		joanna.getFollowing().add(bob);
		joanna.getFollowedPets().add(max);

		bob.getFollowing().add(joanna);
		joanna.getFollowers().add(bob);

		joannaPost1.getLikedByUsers().add(bob);
		joannaPost1.getLikedByUsers().add(admin);
		joannaPost2.getLikedByUsers().add(admin);

		usersRepository.saveAll(List.of(admin, joanna, bob));
		petRepository.saveAll(List.of(azor, sally, max));
		postRepository.saveAll(List.of(joannaPost1, joannaPost2, joannaPost3));
	}
}
