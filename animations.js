// Animation for blog tile transitions
document.addEventListener('DOMContentLoaded', function() {
  // Add click event listeners to all blog tiles
  const blogTiles = document.querySelectorAll('.blog-tile');
  
  blogTiles.forEach(tile => {
    tile.addEventListener('click', function(e) {
      e.preventDefault();
      const postUrl = this.getAttribute('href');
      
      // Store the tile position for animation origin
      const rect = this.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // Add animation class to the clicked tile
      this.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
      this.style.transform = 'scale(0.95)';
      this.style.opacity = '0.9';
      
      // Create page transition effect
      createPageTransitionEffect(centerX, centerY, postUrl);
    });
  });
  
  // Function to create smooth page transition effect
  function createPageTransitionEffect(originX, originY, url) {
    // Create overlay for smooth transition
    const overlay = document.createElement('div');
    overlay.className = 'page-transition-overlay';
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, rgba(102, 126, 234, 0.95) 0%, rgba(118, 75, 162, 0.95) 50%, rgba(240, 147, 251, 0.95) 100%);
      z-index: 99999;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    `;
    document.body.appendChild(overlay);
    
    // Create expanding circle effect from click origin
    const circle = document.createElement('div');
    circle.className = 'page-transition-circle';
    circle.style.cssText = `
      position: fixed;
      left: ${originX}px;
      top: ${originY}px;
      width: 0;
      height: 0;
      background: radial-gradient(circle, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.7) 50%, transparent 100%);
      border-radius: 50%;
      transform: translate(-50%, -50%);
      z-index: 100000;
      transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      box-shadow: 0 0 40px rgba(102, 126, 234, 0.4);
    `;
    document.body.appendChild(circle);
    
    // Create content fade effect
    const contentFade = document.createElement('div');
    contentFade.className = 'page-transition-content';
    contentFade.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: white;
      z-index: 100001;
      opacity: 0;
      transition: opacity 0.5s ease-in-out 0.3s;
    `;
    document.body.appendChild(contentFade);
    
    // Trigger animations
    requestAnimationFrame(() => {
      // Fade in overlay
      overlay.style.opacity = '0.3';
      
      // Expand circle
      circle.style.width = '300vmax';
      circle.style.height = '300vmax';
      circle.style.opacity = '0.8';
      
      // After circle expands, fade to white
      setTimeout(() => {
        contentFade.style.opacity = '1';
        
        // Navigate to the new page
        setTimeout(() => {
          window.location.href = url;
        }, 300);
      }, 500);
    });
  }
  
  // Add smooth scroll animation for internal links
  const internalLinks = document.querySelectorAll('a[href^="#"]:not(.blog-tile)');
  internalLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Add hover effect animations for tiles
  blogTiles.forEach(tile => {
    tile.addEventListener('mouseenter', function() {
      // Add subtle animation on hover
      const icon = this.querySelector('.tile-image i');
      if (icon) {
        icon.style.transition = 'transform 0.3s ease';
        icon.style.transform = 'scale(1.1) rotate(5deg)';
      }
    });
    
    tile.addEventListener('mouseleave', function() {
      const icon = this.querySelector('.tile-image i');
      if (icon) {
        icon.style.transform = 'scale(1) rotate(0deg)';
      }
    });
  });
  
  // Page load animation for tiles
  const animateTilesOnLoad = () => {
    blogTiles.forEach((tile, index) => {
      tile.style.opacity = '0';
      tile.style.transform = 'translateY(30px) scale(0.95)';
      
      setTimeout(() => {
        tile.style.transition = 'opacity 0.5s ease, transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
        tile.style.opacity = '1';
        tile.style.transform = 'translateY(0) scale(1)';
      }, index * 50);
    });
  };
  
  // Check if tiles are in viewport
  const checkTilesInView = () => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('tile-visible');
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });
    
    blogTiles.forEach(tile => {
      observer.observe(tile);
    });
  };
  
  // Initialize animations
  if (document.readyState === 'complete') {
    animateTilesOnLoad();
    checkTilesInView();
  } else {
    window.addEventListener('load', () => {
      animateTilesOnLoad();
      checkTilesInView();
    });
  }
});

// Add CSS for page transitions
const transitionStyles = document.createElement('style');
transitionStyles.textContent = `
  /* Prevent layout shift during animation */
  .blog-tile {
    will-change: transform, opacity;
    backface-visibility: hidden;
    -webkit-font-smoothing: antialiased;
  }
  
  /* Smooth tile visibility animation */
  .tile-visible {
    animation: tileSlideIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
  }
  
  @keyframes tileSlideIn {
    from {
      opacity: 0;
      transform: translateY(20px) scale(0.95);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }
  
  /* Disable default link styles during transition */
  .blog-tile:active {
    transform: scale(0.98);
  }
  
  /* Page transition overlay styles */
  .page-transition-overlay,
  .page-transition-circle,
  .page-transition-content {
    pointer-events: none;
  }
  
  /* Prevent scrolling during transition */
  body.transitioning {
    overflow: hidden;
  }
`;
document.head.appendChild(transitionStyles);

// Add class to body during transition
document.addEventListener('click', function(e) {
  if (e.target.closest('.blog-tile')) {
    document.body.classList.add('transitioning');
  }
});