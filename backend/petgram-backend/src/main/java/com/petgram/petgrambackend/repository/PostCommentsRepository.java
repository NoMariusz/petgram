package com.petgram.petgrambackend.repository;

import com.petgram.petgrambackend.entity.PostCommentEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PostCommentsRepository extends JpaRepository<PostCommentEntity, Long> {
}
