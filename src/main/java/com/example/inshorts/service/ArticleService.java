package com.example.inshorts.service;

import com.example.inshorts.model.Article;
import com.example.inshorts.model.User;
import com.example.inshorts.repository.ArticleRepository;
import com.example.inshorts.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ArticleService {

    @Autowired
    private ArticleRepository articleRepository;

    @Autowired
    private UserRepository userRepository;

    public List<Article> getAllArticles() {
        return articleRepository.findAll();
    }

    public List<Article> getAllArticlesByNewest() {
        return articleRepository.findAllByOrderByPublishedAtDesc();
    }

    public List<Article> getTrendingArticles() {
        List<Article> articles = articleRepository.findAll();
        // Sort by trending score (descending)
        articles.sort((a1, a2) -> Double.compare(a2.getTrendingScore(), a1.getTrendingScore()));
        // Return top 10 or all if less than 10
        return articles.subList(0, Math.min(10, articles.size()));
    }

    public Optional<Article> getArticleById(Long id) {
        Optional<Article> articleOpt = articleRepository.findById(id);
        // Increment view count when article is retrieved
        articleOpt.ifPresent(article -> {
            article.incrementViewCount();
            articleRepository.save(article);
        });
        return articleOpt;
    }

    public Article saveArticle(Article article) {
        if (article.getPublishedAt() == null) {
            article.setPublishedAt(LocalDateTime.now());
        }
        return articleRepository.save(article);
    }

    public void deleteArticle(Long id) {
        articleRepository.deleteById(id);
    }

    public boolean toggleLike(Long articleId, Long userId) {
        Optional<Article> articleOpt = articleRepository.findById(articleId);
        Optional<User> userOpt = userRepository.findById(userId);

        if (articleOpt.isPresent() && userOpt.isPresent()) {
            Article article = articleOpt.get();
            User user = userOpt.get();

            // Check if user already liked the article
            boolean hasLiked = user.getLikedArticles().stream()
                .anyMatch(likedArticle -> likedArticle.getId().equals(articleId));

            if (hasLiked) {
                // Unlike
                user.getLikedArticles().removeIf(a -> a.getId().equals(articleId));
                article.getLikedByUsers().removeIf(u -> u.getId().equals(userId));
            } else {
                // Like
                user.getLikedArticles().add(article);
                article.getLikedByUsers().add(user);
            }

            userRepository.save(user);
            articleRepository.save(article);

            return !hasLiked; // Return true if liked, false if unliked
        } else {
            throw new RuntimeException("Article or User not found");
        }
    }

    public boolean isLikedByUser(Long articleId, Long userId) {
        Optional<User> userOpt = userRepository.findById(userId);

        if (userOpt.isPresent()) {
            User user = userOpt.get();
            return user.getLikedArticles().stream()
                .anyMatch(article -> article.getId().equals(articleId));
        }

        return false;
    }
}
