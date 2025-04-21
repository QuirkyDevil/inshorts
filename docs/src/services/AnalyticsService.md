# Analytics Service

## Overview
The `AnalyticsService` provides automated analytics functionality for the Inshorts application, including trending article calculations and daily report generation.

## Features

### Trending Articles Calculation
- Runs automatically every hour using `@Scheduled(fixedRate = 3600000)`
- Calculates trending score using weighted metrics:
  - Views (1x weight)
  - Likes (2x weight)
  - Comments (3x weight)
- Implements freshness factor:
  - Decreases by 10% per day
  - Minimum of 50% of original score
  - Formula: `score = ((views * 1) + (likes * 2) + (comments * 3)) * freshnessFactor`

### Daily Reports
- Generated automatically at midnight using `@Scheduled(cron = "0 0 0 * * ?")`
- Creates detailed report files including:
  - Top 10 most viewed articles
  - Top 10 most liked articles
  - Top 10 most commented articles
- Report format:
```
===== DAILY ANALYTICS REPORT =====
Generated on: [timestamp]

--- TOP 10 MOST VIEWED ARTICLES ---
1. [Article Title] - [view_count] views
...

--- TOP 10 MOST LIKED ARTICLES ---
1. [Article Title] - [like_count] likes
...

--- TOP 10 MOST COMMENTED ARTICLES ---
1. [Article Title] - [comment_count] comments
...
```

## Technical Implementation

### Dependencies
- Uses Spring's `@Scheduled` annotation for automated execution
- Integrates with `ArticleRepository` for data access
- Implements SLF4J logging for operational monitoring

### Trending Score Calculation
```java
double freshnessFactor = Math.max(0.5, 1.0 - (daysOld * 0.1));
double score = ((views * 1) + (likes * 2) + (comments * 3)) * freshnessFactor;
```

### Error Handling
- Robust error handling for file operations
- Logging of all major operations and errors
- Continues operation even if individual article processing fails

## Usage

### Accessing Analytics Data
The service automatically updates article trending scores which can be accessed through:
```java
article.getTrendingScore()
```

### Report Files
Reports are generated as text files with format:
```
report_YYYY-MM-DD.txt
```
