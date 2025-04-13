package com.example.inshorts.controller;

import com.example.inshorts.model.Article;
import com.example.inshorts.model.User;
import com.example.inshorts.repository.UserRepository;
import com.example.inshorts.service.ArticleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/articles")
public class ArticleController {

    @Autowired
    private ArticleService articleService;

    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public List<Article> getAllArticles() {
        return articleService.getAllArticles();
    }

    @GetMapping("/newest")
    public List<Article> getNewestArticles() {
        return articleService.getAllArticlesByNewest();
    }

    @GetMapping("/trending")
    public List<Article> getTrendingArticles() {
        return articleService.getTrendingArticles();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Article> getArticleById(@PathVariable Long id) {
        Optional<Article> article = articleService.getArticleById(id);
        return article.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public Article createArticle(@RequestBody Article article) {
        return articleService.saveArticle(article);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Article> updateArticle(@PathVariable Long id, @RequestBody Article articleDetails) {
        Optional<Article> articleOptional = articleService.getArticleById(id);
        if (articleOptional.isPresent()) {
            Article article = articleOptional.get();
            article.setTitle(articleDetails.getTitle());
            article.setSummary(articleDetails.getSummary());
            article.setContent(articleDetails.getContent());
            article.setAuthor(articleDetails.getAuthor());
            article.setPublishedAt(articleDetails.getPublishedAt());
            return ResponseEntity.ok(articleService.saveArticle(article));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteArticle(@PathVariable Long id) {
        if (articleService.getArticleById(id).isPresent()) {
            articleService.deleteArticle(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/{id}/like")
    public ResponseEntity<?> toggleLike(@PathVariable Long id, Authentication authentication) {
        if (authentication == null) {
            return ResponseEntity.status(401).build();
        }

        // Get user from authentication
        String username = authentication.getName();
        Optional<User> userOpt = userRepository.findByUsername(username);

        if (userOpt.isEmpty()) {
            return ResponseEntity.status(401).build();
        }

        Long userId = userOpt.get().getId();

        try {
            boolean liked = articleService.toggleLike(id, userId);
            return ResponseEntity.ok(Map.of("liked", liked));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/{id}/isLiked")
    public ResponseEntity<?> isLikedByUser(@PathVariable Long id, Authentication authentication) {
        if (authentication == null) {
            return ResponseEntity.ok(Map.of("liked", false));
        }

        // Get user from authentication
        String username = authentication.getName();
        Optional<User> userOpt = userRepository.findByUsername(username);

        if (userOpt.isEmpty()) {
            return ResponseEntity.ok(Map.of("liked", false));
        }

        Long userId = userOpt.get().getId();

        boolean liked = articleService.isLikedByUser(id, userId);
        return ResponseEntity.ok(Map.of("liked", liked));
    }
}
