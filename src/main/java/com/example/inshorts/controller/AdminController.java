package com.example.inshorts.controller;

import com.example.inshorts.model.Article;
import com.example.inshorts.service.ArticleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Controller
public class AdminController {

    @Autowired
    private ArticleService articleService;

    @GetMapping("/admin")
    public String getAdminDashboard(Model model) {
        List<Article> articles = articleService.getAllArticles();
        model.addAttribute("articles", articles);
        return "dashboard";
    }

    @GetMapping("/create")
    public String createArticleForm() {
        return "create";
    }

    @PostMapping("/save")
    public String saveArticle(Article article) {
        if (article.getPublishedAt() == null) {
            article.setPublishedAt(LocalDateTime.now());
        }
        articleService.saveArticle(article);
        return "redirect:/admin";
    }

    @GetMapping("/edit/{id}")
    public String editArticleForm(@PathVariable Long id, Model model) {
        Optional<Article> articleOptional = articleService.getArticleById(id);
        if (articleOptional.isPresent()) {
            model.addAttribute("article", articleOptional.get());
            return "edit";
        } else {
            return "redirect:/admin";
        }
    }

    @PostMapping("/update")
    public String updateArticle(@ModelAttribute Article article) {
        articleService.saveArticle(article);
        return "redirect:/admin";
    }

    @GetMapping("/delete/{id}")
    public String deleteArticle(@PathVariable Long id) {
        articleService.deleteArticle(id);
        return "redirect:/admin";
    }
}
