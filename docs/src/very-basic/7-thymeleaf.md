# Understanding Thymeleaf

## What is Thymeleaf?
Thymeleaf is a modern server-side Java template engine that can work with both web and standalone environments.

## Basic Syntax

### Text and Variables
```html
<!-- Static text -->
<span th:text="'Hello World'">Placeholder</span>

<!-- Variable expression -->
<span th:text="${user.name}">John Doe</span>

<!-- Message expression (i18n) -->
<span th:text="#{message.welcome}">Welcome</span>
```

### Iteration
```html
<table>
    <tr th:each="article : ${articles}">
        <td th:text="${article.title}">Title</td>
        <td th:text="${article.author}">Author</td>
        <td th:text="${#temporals.format(article.publishedAt, 'dd-MM-yyyy')}">Date</td>
    </tr>
</table>

<!-- With status variable -->
<div th:each="comment, status : ${comments}">
    <span th:text="${status.index}">1</span>
    <span th:text="${comment.content}">Comment text</span>
</div>
```

### Conditionals
```html
<!-- If condition -->
<div th:if="${not #lists.isEmpty(articles)}">
    <!-- Content shown if articles list is not empty -->
</div>

<!-- If-else -->
<div th:if="${user.isAdmin()}" class="admin-panel">
    Admin content
</div>
<div th:unless="${user.isAdmin()}" class="user-panel">
    User content
</div>

<!-- Switch case -->
<div th:switch="${user.role}">
    <p th:case="'admin'">User is an administrator</p>
    <p th:case="'manager'">User is a manager</p>
    <p th:case="*">User is a regular user</p>
</div>
```

### Forms
```html
<!-- Form binding -->
<form th:action="@{/save}" th:object="${article}" method="post">
    <input type="text" th:field="*{title}" />
    <span th:if="${#fields.hasErrors('title')}"
          th:errors="*{title}">Title Error</span>

    <textarea th:field="*{content}"></textarea>
    <span th:if="${#fields.hasErrors('content')}"
          th:errors="*{content}">Content Error</span>

    <button type="submit">Save</button>
</form>
```

### URL Building
```html
<!-- Basic URL -->
<a th:href="@{/articles}">Articles</a>

<!-- URL with path variable -->
<a th:href="@{/articles/{id}(id=${article.id})}">View Article</a>

<!-- URL with query parameters -->
<a th:href="@{/articles(page=${currentPage},size=10)}">Next Page</a>
```

## Security Integration

### Authentication
```html
<!-- Show content for authenticated users -->
<div sec:authorize="isAuthenticated()">
    Welcome back, <span sec:authentication="name">User</span>
</div>

<!-- Show content for anonymous users -->
<div sec:authorize="isAnonymous()">
    Please log in
</div>
```

### Authorization
```html
<!-- Role-based content -->
<div sec:authorize="hasRole('ADMIN')">
    <a th:href="@{/admin}">Admin Dashboard</a>
</div>

<!-- Permission-based content -->
<div sec:authorize="hasPermission(#article, 'EDIT')">
    <a th:href="@{/articles/{id}/edit(id=${article.id})}">Edit</a>
</div>
```

## Layouts and Fragments

### Fragment Definition
```html
<!-- header.html -->
<header th:fragment="pageHeader(title)">
    <h1 th:text="${title}">Title</h1>
    <nav>
        <!-- Navigation content -->
    </nav>
</header>
```

### Fragment Usage
```html
<!-- Including fragment -->
<div th:replace="~{fragments/header :: pageHeader('Home')}"></div>

<!-- Including with parameters -->
<div th:replace="~{fragments/header :: pageHeader(${pageTitle})}"></div>

<!-- Insert fragment -->
<div th:insert="~{fragments/footer :: footer}"></div>
```

## Expression Utility Objects

### Dates and Times
```html
<!-- Formatting dates -->
<span th:text="${#temporals.format(article.publishedAt, 'dd-MM-yyyy HH:mm')}">
    01-01-2024 12:00
</span>

<!-- Date calculations -->
<span th:text="${#temporals.create(2024,1,1)}">
    2024-01-01
</span>
```

### Collections
```html
<!-- List operations -->
<div th:if="${#lists.isEmpty(articles)}">
    No articles found
</div>

<div th:text="${#lists.size(articles)}">
    0
</div>
```

### Strings
```html
<!-- String operations -->
<div th:if="${#strings.isEmpty(article.title)}">
    No title
</div>

<div th:text="${#strings.substring(article.title,0,10) + '...'}">
    Truncated...
</div>
```

## Best Practices

### 1. Natural Templates
```html
<!-- Template works as static prototype -->
<div th:text="${message}">
    This is a placeholder that will be replaced
</div>
```

### 2. Error Handling
```html
<!-- Display validation errors -->
<ul th:if="${#fields.hasAnyErrors()}">
    <li th:each="err : ${#fields.allErrors()}"
        th:text="${err}">Error message</li>
</ul>
```

### 3. Reusable Fragments
```html
<!-- Create modular, reusable components -->
<div th:fragment="articleCard(article)">
    <h2 th:text="${article.title}">Title</h2>
    <p th:text="${article.summary}">Summary</p>
</div>
```
