package com.petgram.petgrambackend.repository;

import com.petgram.petgrambackend.entity.PetEntity;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface PetRepository extends JpaRepository<PetEntity, Long> {

	List<PetEntity> findByOwnerId(Long ownerId);

	@EntityGraph(attributePaths = {"owner"})
	Optional<PetEntity> findWithOwnerById(Long id);

	@Query("SELECT COUNT(p) FROM PostEntity p JOIN p.pets pet WHERE pet.id = :petId")
	long countPostsByPetId(@Param("petId") Long petId);

	@Query("SELECT COUNT(u) FROM PetEntity p JOIN p.followedByUsers u WHERE p.id = :petId")
	long countFollowersByPetId(@Param("petId") Long petId);
}
