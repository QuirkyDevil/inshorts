package com.example.inshorts.repository;

import com.example.inshorts.model.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findByArticleIdOrderByCreatedAtDesc(Long articleId);
    int countByArticleId(Long articleId);
}
