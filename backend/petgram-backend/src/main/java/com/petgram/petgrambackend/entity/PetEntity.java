package com.petgram.petgrambackend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "pets")
public class PetEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(nullable = false, length = 255)
	private String name;

	@Column(length = 500)
	private String bio;

	@Column(length = 255)
	private String profilePictureUrl;

	@Column
	private LocalDateTime bornAt;

	@Column(nullable = false, updatable = false)
	private LocalDateTime createdAt;

	@Column(nullable = false)
	private LocalDateTime updatedAt;

	@ManyToOne(fetch = FetchType.EAGER, optional = false)
	@JoinColumn(name = "owner_id", nullable = false)
	private UserEntity owner;

	@ManyToMany(mappedBy = "pets", fetch = FetchType.LAZY)
	private List<PostEntity> posts = new ArrayList<>();

	public PetEntity() {
	}

	public PetEntity(String name, UserEntity owner) {
		this.name = name;
		this.owner = owner;
	}

	@PrePersist
	protected void onCreate() {
		if (createdAt == null) {
			createdAt = LocalDateTime.now();
		}
		if (updatedAt == null) {
			updatedAt = LocalDateTime.now();
		}
	}

	@PreUpdate
	protected void onUpdate() {
		updatedAt = LocalDateTime.now();
	}

	public Long getId() {
		return id;
	}

	public String getName() {
		return name;
	}

	public String getBio() {
		return bio;
	}

	public String getProfilePictureUrl() {
		return profilePictureUrl;
	}

	public LocalDateTime getBornAt() {
		return bornAt;
	}

	public LocalDateTime getCreatedAt() {
		return createdAt;
	}

	public LocalDateTime getUpdatedAt() {
		return updatedAt;
	}

	public UserEntity getOwner() {
		return owner;
	}

	public List<PostEntity> getPosts() {
		return posts;
	}

	public void setName(String name) {
		this.name = name;
	}

	public void setBio(String bio) {
		this.bio = bio;
	}

	public void setProfilePictureUrl(String profilePictureUrl) {
		this.profilePictureUrl = profilePictureUrl;
	}

	public void setBornAt(LocalDateTime bornAt) {
		this.bornAt = bornAt;
	}

	public void setOwner(UserEntity owner) {
		this.owner = owner;
	}

	public void setPosts(List<PostEntity> posts) {
		this.posts = posts;
	}
}
