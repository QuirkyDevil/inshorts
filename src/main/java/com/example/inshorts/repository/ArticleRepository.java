package com.example.inshorts.repository;

import com.example.inshorts.model.Article;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ArticleRepository extends JpaRepository<Article, Long> {
    // Find articles ordered by publish date
    List<Article> findAllByOrderByPublishedAtDesc();

    // Find articles published after a specific date
    List<Article> findByPublishedAtAfterOrderByPublishedAtDesc(LocalDateTime date);

    // Find articles with the highest view count
    List<Article> findTop10ByOrderByViewCountDesc();

    // Custom query to find articles with most comments
    @Query("SELECT a FROM Article a LEFT JOIN a.comments c GROUP BY a.id ORDER BY COUNT(c.id) DESC")
    List<Article> findTopArticlesByCommentCount();

    // Custom query to find articles with most likes
    @Query("SELECT a FROM Article a LEFT JOIN a.likedByUsers u GROUP BY a.id ORDER BY COUNT(u.id) DESC")
    List<Article> findTopArticlesByLikeCount();
}
