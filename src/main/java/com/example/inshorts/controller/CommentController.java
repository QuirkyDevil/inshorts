package com.example.inshorts.controller;

import com.example.inshorts.model.Comment;
import com.example.inshorts.model.User;
import com.example.inshorts.repository.UserRepository;
import com.example.inshorts.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/comments")
public class CommentController {

    @Autowired
    private CommentService commentService;

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/article/{articleId}")
    public List<Comment> getCommentsByArticleId(@PathVariable Long articleId) {
        return commentService.getCommentsByArticleId(articleId);
    }

    @PostMapping("/article/{articleId}")
    public ResponseEntity<Comment> addComment(
            @PathVariable Long articleId,
            @RequestBody Map<String, String> payload,
            Authentication authentication) {

        // For unauthenticated endpoints, we need to check if user is logged in
        if (authentication == null) {
            return ResponseEntity.status(401).build();
        }

        String content = payload.get("content");
        if (content == null || content.trim().isEmpty()) {
            return ResponseEntity.badRequest().build();
        }

        // Get user from authentication
        String username = authentication.getName();
        Optional<User> userOpt = userRepository.findByUsername(username);

        if (userOpt.isEmpty()) {
            return ResponseEntity.status(401).build();
        }

        Long userId = userOpt.get().getId();

        Comment comment = commentService.addComment(articleId, userId, content);
        return ResponseEntity.ok(comment);
    }

    @DeleteMapping("/{commentId}")
    public ResponseEntity<Void> deleteComment(
            @PathVariable Long commentId,
            Authentication authentication) {

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
            commentService.deleteComment(commentId, userId);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.status(403).build();
        }
    }
}
