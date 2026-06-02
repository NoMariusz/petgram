package com.petgram.petgrambackend.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "users", uniqueConstraints = {
    @UniqueConstraint(columnNames = "username"),
    @UniqueConstraint(columnNames = "email")
})
public class UserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 50)
    private String username;

    @Column(nullable = false, unique = true, length = 100)
    private String email;

    @Column(nullable = false, length = 255)
    private String passwordHash;

    @Column(nullable = false, length = 50)
    private String firstName;

    @Column(nullable = false, length = 50)
    private String lastName;

    @Column(length = 500)
    private String bio;

    @Column(length = 255)
    private String profilePictureUrl;

    @Column(length = 100)
    private String location;

    @Column(length = 255)
    private String website;

    @Column(nullable = false)
    private Boolean isVerified = false;

    @Column(nullable = false)
    private Boolean isActive = true;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "role_id", nullable = false)
    private RoleEntity role;

    @OneToMany(mappedBy = "owner", fetch = FetchType.LAZY)
    private List<PetEntity> pets = new ArrayList<>();

    @OneToMany(mappedBy = "creator", fetch = FetchType.LAZY)
    private List<PostEntity> createdPosts = new ArrayList<>();

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
        name = "user_follows",
        joinColumns = @JoinColumn(name = "follower_id"),
        inverseJoinColumns = @JoinColumn(name = "following_id")
    )
    private List<UserEntity> following = new ArrayList<>();

    @ManyToMany(mappedBy = "following", fetch = FetchType.LAZY)
    private List<UserEntity> followers = new ArrayList<>();

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
        name = "user_follows_pets",
        joinColumns = @JoinColumn(name = "user_id"),
        inverseJoinColumns = @JoinColumn(name = "pet_id")
    )
    private List<PetEntity> followedPets = new ArrayList<>();

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(nullable = false)
    private LocalDateTime updatedAt;

    // Constructors
    public UserEntity() {
    }

    public UserEntity(String username, String email, String passwordHash, String firstName, String lastName, RoleEntity role) {
        this.username = username;
        this.email = email;
        this.passwordHash = passwordHash;
        this.firstName = firstName;
        this.lastName = lastName;
        this.role = role;
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    // Lifecycle callbacks
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

    // Getters
    public Long getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public String getEmail() {
        return email;
    }

    public String getPasswordHash() {
        return passwordHash;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public String getBio() {
        return bio;
    }

    public String getProfilePictureUrl() {
        return profilePictureUrl;
    }

    public String getLocation() {
        return location;
    }

    public String getWebsite() {
        return website;
    }

    public Boolean getIsVerified() {
        return isVerified;
    }

    public Boolean getIsActive() {
        return isActive;
    }

    public RoleEntity getRole() {
        return role;
    }

    public List<PetEntity> getPets() {
        return pets;
    }

    public List<PostEntity> getCreatedPosts() {
        return createdPosts;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    // Setters for editable fields
    public void setUsername(String username) {
        this.username = username;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPasswordHash(String passwordHash) {
        this.passwordHash = passwordHash;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }

    public void setProfilePictureUrl(String profilePictureUrl) {
        this.profilePictureUrl = profilePictureUrl;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public void setWebsite(String website) {
        this.website = website;
    }

    public void setIsVerified(Boolean isVerified) {
        this.isVerified = isVerified;
    }

    public void setIsActive(Boolean isActive) {
        this.isActive = isActive;
    }

    public void setRole(RoleEntity role) {
        this.role = role;
    }

    public void setPets(List<PetEntity> pets) {
        this.pets = pets;
    }

    public void setCreatedPosts(List<PostEntity> createdPosts) {
        this.createdPosts = createdPosts;
    }

    public List<UserEntity> getFollowing() {
        return following;
    }

    public void setFollowing(List<UserEntity> following) {
        this.following = following;
    }

    public List<UserEntity> getFollowers() {
        return followers;
    }

    public void setFollowers(List<UserEntity> followers) {
        this.followers = followers;
    }

    public List<PetEntity> getFollowedPets() {
        return followedPets;
    }

    public void setFollowedPets(List<PetEntity> followedPets) {
        this.followedPets = followedPets;
    }
}
