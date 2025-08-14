# Tech & Gaming Blog - Customization Guide

This guide will help you edit content, modify styles, and add new blog posts to your website.

## 📁 Project Structure

```
tech-gaming-blog/
├── index.html          # Main homepage
├── styles.css          # All styling and design
├── script.js           # Interactive features
├── posts/              # Blog posts directory
│   └── gaming-mics-under-20.html
└── README.md           # This guide
```

## ✏️ How to Edit Content

### 1. Editing the Homepage (`index.html`)

#### Change Your Personal Background
Find the "About Me" section (around line 65):
```html
<section id="about" class="about">
    <div class="container">
        <h2>About Me</h2>
        <div class="about-content">
            <div class="about-text">
                <p>Hi! I'm a passionate tech enthusiast...</p>
                <!-- Edit these paragraphs with your own story -->
```

#### Update Statistics
Find the stats section (around line 80):
```html
<div class="stat">
    <h3>500+</h3>
    <p>Products Tested</p>
</div>
<!-- Change numbers and labels to match your experience -->
```

#### Modify Blog Post Previews
Find the blog grid section (around line 95) and edit each article:
```html
<article class="blog-post featured">
    <div class="post-content">
        <h3>Your New Blog Post Title</h3>
        <p>Your post description...</p>
        <div class="post-meta">
            <span><i class="fas fa-calendar"></i> Your Date</span>
        </div>
        <a href="posts/your-new-post.html" class="read-more">Read Full Review</a>
    </div>
</article>
```

### 2. Editing Styles (`styles.css`)

#### Change Colors
Find these CSS variables at the top of the file:
```css
/* Main brand colors */
.nav-brand h1 { color: #2563eb; }  /* Change blue color */
.hero { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }  /* Change gradient */
```

#### Modify Fonts
Change the font family (line 8):
```css
body {
    font-family: 'Inter', sans-serif;  /* Replace with your preferred font */
}
```

#### Adjust Layout
- **Container width**: Change `max-width: 1200px` in `.container` class
- **Blog grid**: Modify `grid-template-columns` in `.blog-grid`
- **Spacing**: Adjust `padding` and `margin` values throughout

## 📝 How to Add New Blog Posts

### Method 1: Copy Existing Post Template

1. **Copy the template**:
   ```
   Copy: posts/gaming-mics-under-20.html
   Rename to: posts/your-new-post.html
   ```

2. **Edit the new post**:
   - Change the `<title>` tag
   - Update the article header section
   - Replace all content in the `<article class="article-content">` section
   - Update the "Back to Blog" link if needed

3. **Add to homepage**:
   - Open `index.html`
   - Find the blog grid section
   - Add a new `<article class="blog-post">` block
   - Link to your new post: `href="posts/your-new-post.html"`

### Method 2: Create from Scratch

1. **Create new HTML file** in the `posts/` directory
2. **Use this template**:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Post Title - Tech & Gaming Hub</title>
    <link rel="stylesheet" href="../styles.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
</head>
<body>
    <!-- Copy header from existing post -->
    <header class="header">...</header>
    
    <!-- Article header -->
    <section class="article-header">
        <div class="container">
            <h1>Your Post Title</h1>
            <div class="article-meta">
                <span><i class="fas fa-calendar"></i> Your Date</span>
                <span><i class="fas fa-clock"></i> X min read</span>
                <span><i class="fas fa-tag"></i> Category</span>
            </div>
        </div>
    </section>

    <!-- Article content -->
    <article class="article-content">
        <a href="../index.html#blog" class="back-button">
            <i class="fas fa-arrow-left"></i> Back to Blog
        </a>
        
        <!-- Your content here -->
        <p>Your article content...</p>
    </article>
    
    <!-- Copy footer from existing post -->
    <footer class="footer">...</footer>
    <script src="../script.js"></script>
</body>
</html>
```

## 🎨 Customization Tips

### Adding Product Review Cards
Use this template for product reviews:
```html
<div class="product-card">
    <div class="product-header">
        <h3 class="product-title">Product Name</h3>
        <span class="product-price">$XX.XX</span>
    </div>
    
    <div class="rating">
        <span class="stars">★★★★☆</span>
        <span>4.0/5 - Your Rating</span>
    </div>

    <p>Product description...</p>

    <div class="pros-cons">
        <div class="pros">
            <h4>Pros</h4>
            <ul>
                <li>Pro point 1</li>
                <li>Pro point 2</li>
            </ul>
        </div>
        <div class="cons">
            <h4>Cons</h4>
            <ul>
                <li>Con point 1</li>
                <li>Con point 2</li>
            </ul>
        </div>
    </div>
</div>
```

### Changing Blog Categories
Update the category tags in both the homepage and individual posts:
```html
<span class="post-category">Your Category</span>
```

Available category colors are automatically styled for:
- Audio
- Peripherals  
- Hardware
- Displays

### Adding Images
To add images to your posts:
1. Create an `images/` folder in your project
2. Add your images there
3. Reference them in HTML:
```html
<img src="../images/your-image.jpg" alt="Description" style="width: 100%; border-radius: 10px; margin: 1rem 0;">
```

## 🚀 Publishing Your Blog

### Option 1: Local Development
- Simply open `index.html` in your browser
- Edit files and refresh to see changes

### Option 2: Web Hosting
- Upload all files to a web hosting service (GitHub Pages, Netlify, Vercel)
- Your blog will be live on the internet

## 🔧 Advanced Customizations

### Adding New JavaScript Features
Edit `script.js` to add:
- Custom animations
- Form handling
- Interactive elements

### SEO Optimization
Add to each page's `<head>`:
```html
<meta name="description" content="Your page description">
<meta name="keywords" content="gaming, tech, reviews">
<meta property="og:title" content="Your Page Title">
<meta property="og:description" content="Your page description">
```

## 📱 Mobile Responsiveness

The blog is already mobile-responsive, but you can adjust breakpoints in `styles.css`:
```css
@media (max-width: 768px) {
    /* Mobile styles */
}

@media (max-width: 480px) {
    /* Small mobile styles */
}
```

## 🆘 Need Help?

If you need assistance with any customizations:
1. Check the existing code for examples
2. Use browser developer tools (F12) to inspect elements
3. Test changes in small increments
4. Keep backups of working versions

Happy blogging! 🎮✨