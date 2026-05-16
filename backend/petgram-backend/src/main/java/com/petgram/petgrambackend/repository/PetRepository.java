package com.petgram.petgrambackend.repository;

import com.petgram.petgrambackend.entity.PetEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PetRepository extends JpaRepository<PetEntity, Long> {

	List<PetEntity> findByOwnerId(Long ownerId);
}
