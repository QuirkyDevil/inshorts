package com.example.inshorts.service;

import com.example.inshorts.model.Article;
import com.example.inshorts.repository.ArticleRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.io.FileWriter;
import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
public class AnalyticsService {

    private static final Logger logger = LoggerFactory.getLogger(AnalyticsService.class);
    private static final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

    @Autowired
    private ArticleRepository articleRepository;

    // Calculate trending articles every hour
    @Scheduled(fixedRate = 3600000) // 1 hour
    public void calculateTrendingArticles() {
        logger.info("Calculating trending articles at {}", LocalDateTime.now().format(formatter));

        List<Article> articles = articleRepository.findAll();

        // Calculate trending score for each article
        // The formula: (views * 1) + (likes * 2) + (comments * 3)
        for (Article article : articles) {
            int views = article.getViewCount();
            int likes = article.getLikedByUsers().size();
            int comments = article.getComments().size();

            // Freshness factor (newer articles get a boost)
            long daysOld = java.time.Duration.between(article.getPublishedAt(), LocalDateTime.now()).toDays();
            double freshnessFactor = Math.max(0.5, 1.0 - (daysOld * 0.1)); // Decreases by 10% per day, min 50%

            // Calculate score
            double score = ((views * 1) + (likes * 2) + (comments * 3)) * freshnessFactor;

            // Update article's trending score
            article.setTrendingScore(score);
        }

        // Save updated scores
        articleRepository.saveAll(articles);

        logger.info("Finished calculating trending scores for {} articles", articles.size());
    }

    // Generate daily report at midnight
    @Scheduled(cron = "0 0 0 * * ?")
    public void generateDailyReport() {
        logger.info("Generating daily analytics report at {}", LocalDateTime.now().format(formatter));

        try {
            // Get data
            List<Article> topViewedArticles = articleRepository.findTop10ByOrderByViewCountDesc();
            List<Article> topLikedArticles = articleRepository.findTopArticlesByLikeCount();
            List<Article> topCommentedArticles = articleRepository.findTopArticlesByCommentCount();

            // Generate report file
            String fileName = "report_" + LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd")) + ".txt";

            try (FileWriter writer = new FileWriter(fileName)) {
                writer.write("===== DAILY ANALYTICS REPORT =====\n");
                writer.write("Generated on: " + LocalDateTime.now().format(formatter) + "\n\n");

                writer.write("--- TOP 10 MOST VIEWED ARTICLES ---\n");
                for (int i = 0; i < topViewedArticles.size(); i++) {
                    Article article = topViewedArticles.get(i);
                    writer.write((i + 1) + ". " + article.getTitle() + " - " + article.getViewCount() + " views\n");
                }

                writer.write("\n--- TOP 10 MOST LIKED ARTICLES ---\n");
                for (int i = 0; i < Math.min(10, topLikedArticles.size()); i++) {
                    Article article = topLikedArticles.get(i);
                    writer.write((i + 1) + ". " + article.getTitle() + " - " + article.getLikedByUsers().size() + " likes\n");
                }

                writer.write("\n--- TOP 10 MOST COMMENTED ARTICLES ---\n");
                for (int i = 0; i < Math.min(10, topCommentedArticles.size()); i++) {
                    Article article = topCommentedArticles.get(i);
                    writer.write((i + 1) + ". " + article.getTitle() + " - " + article.getComments().size() + " comments\n");
                }
            }

            logger.info("Daily report generated successfully: {}", fileName);
        } catch (IOException e) {
            logger.error("Error generating daily report", e);
        }
    }
}
