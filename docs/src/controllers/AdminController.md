# Admin Controller

## Overview
The `AdminController` manages administrative operations in the Inshorts application, providing functionality for article management through a web interface using Thymeleaf templates.

## Endpoints

### Admin Dashboard
```
GET /admin
```
Displays the admin dashboard with a list of all articles.
- **Template**: dashboard.html
- **Model Attribute**: articles (List<Article>)
- **Access**: Admin users only

### Create Article Form
```
GET /create
```
Shows the article creation form.
- **Template**: create.html
- **Access**: Admin users only

### Save Article
```
POST /save
```
Processes the article creation form.
- **Form Data**: Article object (title, summary, content, author, publishedAt)
- **Behavior**: Sets current time if publishedAt is null
- **Redirect**: /admin (dashboard)
- **Access**: Admin users only

### Edit Article Form
```
GET /edit/{id}
```
Shows the article editing form.
- **Path Variable**: id (Long)
- **Template**: edit.html
- **Model Attribute**: article (Article)
- **Access**: Admin users only
- **Behavior**: Redirects to dashboard if article not found

### Update Article
```
POST /update
```
Processes the article update form.
- **Form Data**: Article object with updated fields
- **Redirect**: /admin (dashboard)
- **Access**: Admin users only

### Delete Article
```
GET /delete/{id}
```
Deletes an article.
- **Path Variable**: id (Long)
- **Redirect**: /admin (dashboard)
- **Access**: Admin users only

## Templates Integration

### Dashboard Template
```html
<div th:each="article : ${articles}">
    <td th:text="${article.title}"></td>
    <td th:text="${article.author}"></td>
    <td th:text="${article.publishedAt}"></td>
    <!-- Action buttons -->
</div>
```

### Form Templates
- Create and Edit forms share similar structure
- Uses Thymeleaf form binding
- Includes validation feedback
- Provides cancel action

## Technical Implementation

### Dependencies
- `ArticleService`: Business logic for article management
- `Thymeleaf`: Template engine
- `Spring MVC`: Web framework
- `Spring Security`: Authentication and authorization

### Error Handling
- Graceful handling of missing articles
- Form validation feedback
- Proper redirection on errors

## Usage Example

### Creating an Article
1. Navigate to `/admin`
2. Click "Add New Article"
3. Fill form fields:
   - Title
   - Summary
   - Content
   - Author
   - Published Date (optional)
4. Submit form
5. Redirected to dashboard with new article listed
