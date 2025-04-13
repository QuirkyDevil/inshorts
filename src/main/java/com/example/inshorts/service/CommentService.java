package com.example.inshorts.service;

import com.example.inshorts.model.Article;
import com.example.inshorts.model.Comment;
import com.example.inshorts.model.User;
import com.example.inshorts.repository.ArticleRepository;
import com.example.inshorts.repository.CommentRepository;
import com.example.inshorts.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class CommentService {

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private ArticleRepository articleRepository;

    @Autowired
    private UserRepository userRepository;

    public List<Comment> getCommentsByArticleId(Long articleId) {
        return commentRepository.findByArticleIdOrderByCreatedAtDesc(articleId);
    }

    public Comment addComment(Long articleId, Long userId, String content) {
        Optional<Article> articleOpt = articleRepository.findById(articleId);
        Optional<User> userOpt = userRepository.findById(userId);

        if (articleOpt.isPresent() && userOpt.isPresent()) {
            Comment comment = new Comment();
            comment.setContent(content);
            comment.setCreatedAt(LocalDateTime.now());
            comment.setArticle(articleOpt.get());
            comment.setUser(userOpt.get());

            return commentRepository.save(comment);
        } else {
            throw new RuntimeException("Article or User not found");
        }
    }

    public void deleteComment(Long commentId, Long userId) {
        Optional<Comment> commentOpt = commentRepository.findById(commentId);
        Optional<User> userOpt = userRepository.findById(userId);

        if (commentOpt.isEmpty()) {
            throw new RuntimeException("Comment not found");
        }

        if (userOpt.isEmpty()) {
            throw new RuntimeException("User not found");
        }

        Comment comment = commentOpt.get();
        User user = userOpt.get();

        // Allow deletion if:
        // 1. The user is the comment owner
        // 2. The user has ADMIN role
        boolean isCommentOwner = comment.getUser().getId().equals(userId);
        boolean isAdmin = user.getRoles() != null && user.getRoles().contains("ADMIN");

        if (isCommentOwner || isAdmin) {
            commentRepository.delete(comment);
        } else {
            throw new RuntimeException("Not authorized to delete this comment");
        }
    }
}
