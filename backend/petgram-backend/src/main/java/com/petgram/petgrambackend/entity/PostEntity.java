package com.petgram.petgrambackend.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "posts")
public class PostEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(nullable = false, length = 500)
	private String text;

	@Column(length = 255)
	private String postPictureUrl;

	@Column(nullable = false)
	private Boolean isPinned = false;

	@Column(nullable = false, updatable = false)
	private LocalDateTime createdAt;

	@Column(nullable = false)
	private LocalDateTime updatedAt;

	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "creator_id", nullable = false)
	private UserEntity creator;

	@ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(
			name = "post_pets",
			joinColumns = @JoinColumn(name = "post_id"),
			inverseJoinColumns = @JoinColumn(name = "pet_id")
	)
	private List<PetEntity> pets = new ArrayList<>();

	@ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(
			name = "post_likes",
			joinColumns = @JoinColumn(name = "post_id"),
			inverseJoinColumns = @JoinColumn(name = "user_id")
	)
	private List<UserEntity> likedByUsers = new ArrayList<>();

	@OneToMany(mappedBy = "post", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<PostCommentEntity> postComments = new ArrayList<>();

	public PostEntity() {
	}

	public PostEntity(String text, UserEntity creator) {
		this.text = text;
		this.creator = creator;
	}

	@PrePersist
	protected void onCreate() {
		if (createdAt == null) {
			createdAt = LocalDateTime.now();
		}
		if (updatedAt == null) {
			updatedAt = LocalDateTime.now();
		}
		if (isPinned == null) {
			isPinned = false;
		}
	}

	@PreUpdate
	protected void onUpdate() {
		updatedAt = LocalDateTime.now();
	}

	public Long getId() {
		return id;
	}

	public String getText() {
		return text;
	}

	public String getPostPictureUrl() {
		return postPictureUrl;
	}

	public Boolean getIsPinned() {
		return isPinned;
	}

	public LocalDateTime getCreatedAt() {
		return createdAt;
	}

	public LocalDateTime getUpdatedAt() {
		return updatedAt;
	}

	public UserEntity getCreator() {
		return creator;
	}

	public List<PetEntity> getPets() {
		return pets;
	}

	public List<UserEntity> getLikedByUsers() {
		return likedByUsers;
	}

	public List<PostCommentEntity> getPostComments() {
		return postComments;
	}

	public void setText(String text) {
		this.text = text;
	}

	public void setPostPictureUrl(String postPictureUrl) {
		this.postPictureUrl = postPictureUrl;
	}

	public void setIsPinned(Boolean isPinned) {
		this.isPinned = isPinned;
	}

	public void setCreator(UserEntity creator) {
		this.creator = creator;
	}

	public void setPets(List<PetEntity> pets) {
		this.pets = pets;
	}

	public void setLikedByUsers(List<UserEntity> likedByUsers) {
		this.likedByUsers = likedByUsers;
	}
}
