// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
});

// Header Search Functionality
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.querySelector('.search-input');
    const blogPosts = document.querySelectorAll('.blog-post');
    
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const query = this.value.toLowerCase().trim();
            
            if (query === '') {
                // Show all posts
                blogPosts.forEach(post => {
                    post.style.display = 'block';
                });
                return;
            }
            
            // Filter posts based on search query
            blogPosts.forEach(post => {
                const title = post.querySelector('h3').textContent.toLowerCase();
                const content = post.querySelector('p').textContent.toLowerCase();
                const category = post.querySelector('.post-category')?.textContent.toLowerCase() || '';
                
                if (title.includes(query) || content.includes(query) || category.includes(query)) {
                    post.style.display = 'block';
                } else {
                    post.style.display = 'none';
                }
            });
        });
        
        // Handle Enter key to scroll to blog section
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                const blogSection = document.querySelector('#blog');
                if (blogSection) {
                    const headerOffset = 100;
                    const elementPosition = blogSection.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Newsletter form submission
document.querySelector('.newsletter-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = this.querySelector('input[type="email"]').value;
    
    if (email) {
        // Simulate newsletter signup
        showNotification('Thanks for subscribing! You\'ll receive our latest reviews and deals.', 'success');
        this.reset();
    }
});

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 350px;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = '#fff';
        header.style.backdropFilter = 'none';
    }
});

// Animate blog posts on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe blog posts for animation
document.addEventListener('DOMContentLoaded', function() {
    const blogPosts = document.querySelectorAll('.blog-post');
    blogPosts.forEach((post, index) => {
        post.style.opacity = '0';
        post.style.transform = 'translateY(30px)';
        post.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(post);
    });
});

// Search functionality (basic implementation)
function createSearchBar() {
    const searchHTML = `
        <div class="search-container" style="display: none;">
            <div class="search-overlay"></div>
            <div class="search-modal">
                <div class="search-header">
                    <input type="text" class="search-input" placeholder="Search articles...">
                    <button class="search-close">&times;</button>
                </div>
                <div class="search-results"></div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', searchHTML);
    
    // Add search styles
    const searchStyles = `
        .search-container {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 10000;
        }
        
        .search-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.8);
        }
        
        .search-modal {
            position: relative;
            max-width: 600px;
            margin: 100px auto;
            background: white;
            border-radius: 15px;
            overflow: hidden;
            box-shadow: 0 25px 50px rgba(0,0,0,0.3);
        }
        
        .search-header {
            display: flex;
            align-items: center;
            padding: 1rem;
            border-bottom: 1px solid #e5e7eb;
        }
        
        .search-input {
            flex: 1;
            border: none;
            outline: none;
            font-size: 1.2rem;
            padding: 0.5rem;
        }
        
        .search-close {
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            padding: 0.5rem;
            color: #666;
        }
        
        .search-results {
            max-height: 400px;
            overflow-y: auto;
            padding: 1rem;
        }
        
        .search-result {
            padding: 1rem;
            border-bottom: 1px solid #f3f4f6;
            cursor: pointer;
            transition: background 0.2s ease;
        }
        
        .search-result:hover {
            background: #f9fafb;
        }
        
        .search-result h4 {
            margin-bottom: 0.5rem;
            color: #333;
        }
        
        .search-result p {
            color: #666;
            font-size: 0.9rem;
        }
    `;
    
    const styleSheet = document.createElement('style');
    styleSheet.textContent = searchStyles;
    document.head.appendChild(styleSheet);
}

// Add keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + K to open search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const searchContainer = document.querySelector('.search-container');
        if (searchContainer) {
            searchContainer.style.display = 'block';
            document.querySelector('.search-input').focus();
        }
    }
    
    // Escape to close search
    if (e.key === 'Escape') {
        const searchContainer = document.querySelector('.search-container');
        if (searchContainer) {
            searchContainer.style.display = 'none';
        }
    }
});

// Initialize search functionality
document.addEventListener('DOMContentLoaded', function() {
    createSearchBar();
    
    // Search functionality
    const searchContainer = document.querySelector('.search-container');
    const searchInput = document.querySelector('.search-input');
    const searchResults = document.querySelector('.search-results');
    const searchClose = document.querySelector('.search-close');
    const searchOverlay = document.querySelector('.search-overlay');
    
    // Sample blog data for search
    const blogData = [
        {
            title: "Top 5 Gaming Mics Under $20 That Actually Sound Great",
            excerpt: "After testing dozens of budget gaming microphones, I've found 5 hidden gems...",
            url: "posts/gaming-mics-under-20.html"
        },
        {
            title: "Budget Gaming Mouse Showdown: 7 Mice Under $30",
            excerpt: "Precision doesn't have to cost a fortune. I've tested 7 gaming mice...",
            url: "posts/budget-gaming-mice.html"
        },
        {
            title: "Wireless vs Wired Gaming Headsets: The 2025 Truth",
            excerpt: "Is wireless finally ready for competitive gaming? I've spent 3 months testing...",
            url: "posts/wireless-vs-wired-headsets.html"
        },
        {
            title: "Mechanical Keyboard Switches Explained: A Beginner's Guide",
            excerpt: "Confused by Cherry MX, Gateron, and Kailh switches? This comprehensive guide...",
            url: "posts/mechanical-switches-guide.html"
        },
        {
            title: "Building a 1080p Gaming PC for Under $600 in 2025",
            excerpt: "Yes, it's still possible! Here's my complete build guide for a capable 1080p gaming rig...",
            url: "posts/budget-gaming-pc-build.html"
        },
        {
            title: "Top 5 Budget Friendly Gaming Mice Under $50",
            excerpt: "Quality gaming mice don't have to break the bank. I've tested over 20 budget options to find the five best gaming mice under $50 that deliver premium performance...",
            url: "posts/top-5-budget-gaming-mice-under-50.html"
        }
    ];
    
    // Search input handler
    searchInput.addEventListener('input', function() {
        const query = this.value.toLowerCase().trim();
        
        if (query.length === 0) {
            searchResults.innerHTML = '<p style="color: #666; text-align: center; padding: 2rem;">Start typing to search articles...</p>';
            return;
        }
        
        const results = blogData.filter(post => 
            post.title.toLowerCase().includes(query) || 
            post.excerpt.toLowerCase().includes(query)
        );
        
        if (results.length === 0) {
            searchResults.innerHTML = '<p style="color: #666; text-align: center; padding: 2rem;">No articles found matching your search.</p>';
            return;
        }
        
        searchResults.innerHTML = results.map(post => `
            <div class="search-result" onclick="window.location.href='${post.url}'">
                <h4>${post.title}</h4>
                <p>${post.excerpt}</p>
            </div>
        `).join('');
    });
    
    // Close search handlers
    searchClose.addEventListener('click', () => {
        searchContainer.style.display = 'none';
    });
    
    searchOverlay.addEventListener('click', () => {
        searchContainer.style.display = 'none';
    });
    
    // Initialize search results
    searchResults.innerHTML = '<p style="color: #666; text-align: center; padding: 2rem;">Start typing to search articles...</p>';
});

// Add mobile menu styles
const mobileMenuStyles = `
    @media (max-width: 768px) {
        .nav-menu {
            position: fixed;
            left: -100%;
            top: 70px;
            flex-direction: column;
            background-color: white;
            width: 100%;
            text-align: center;
            transition: 0.3s;
            box-shadow: 0 10px 27px rgba(0,0,0,0.05);
            padding: 2rem 0;
        }
        
        .nav-menu.active {
            left: 0;
        }
        
        .hamburger.active span:nth-child(2) {
            opacity: 0;
        }
        
        .hamburger.active span:nth-child(1) {
            transform: translateY(8px) rotate(45deg);
        }
        
        .hamburger.active span:nth-child(3) {
            transform: translateY(-8px) rotate(-45deg);
        }
    }
`;

const mobileStyleSheet = document.createElement('style');
mobileStyleSheet.textContent = mobileMenuStyles;
document.head.appendChild(mobileStyleSheet);

// Performance optimization: Lazy load images when implemented
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading when DOM is ready
document.addEventListener('DOMContentLoaded', lazyLoadImages);

console.log('Tech & Gaming Hub - Blog loaded successfully! 🎮');