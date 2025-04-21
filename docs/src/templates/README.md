# HTML Templates

## Overview
The application uses Thymeleaf templates for server-side rendering of various pages. Each template is designed with a consistent style and responsive layout.

## Template Structure

### Common Pages
1. **Articles Page (`articles.html`)**
   - Main user-facing content view
   - Displays article cards in grid layout
   - Filtering options for newest/trending
   - Authentication status display
   - Responsive design with user interactions

2. **Login & Register Pages**
   - Clean, centered form design
   - Error message handling
   - Cross-page navigation links
   - Form validation support

### Admin Pages
1. **Dashboard (`dashboard.html`)**
   - Article management interface
   - Tabular data display
   - Action buttons for CRUD operations
   - Quick access to article creation

2. **Create/Edit Form (`create.html`, `edit.html`)**
   - Article form with all fields
   - Rich text support for content
   - Date-time picker for scheduling
   - Cancel/Save actions

## Styling Features

### Common Elements
```css
* {
    box-sizing: border-box;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

body {
    margin: 0;
    padding: 20px;
    background-color: #f5f5f5;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
}
```

### Component Styles
- Card-based layouts
- Responsive tables
- Form styling
- Button variations
- Error/success messages

## Thymeleaf Integration

### Security Integration
```html
<div sec:authorize="isAuthenticated()">
    <span sec:authentication="name"></span>
    <form th:action="@{/logout}" method="post">
        <button type="submit">Logout</button>
    </form>
</div>
```

### Data Iteration
```html
<div th:each="article : ${articles}">
    <h3 th:text="${article.title}">Title</h3>
    <p th:text="${article.summary}">Summary</p>
</div>
```

### Form Handling
```html
<form th:action="@{/save}" method="post">
    <input type="text" th:field="*{title}" required/>
    <textarea th:field="*{content}" required></textarea>
</form>
```

## Responsive Design

### Breakpoints
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

### Mobile Optimizations
- Fluid grid system
- Stackable elements
- Touch-friendly inputs
- Readable font sizes
