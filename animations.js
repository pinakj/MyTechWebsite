// Animation for blog post transitions
document.addEventListener('DOMContentLoaded', function() {
  // Add click event listeners to all "Read More" buttons
  const readMoreButtons = document.querySelectorAll('.read-more');
  
  readMoreButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      const postUrl = this.getAttribute('href');
      
      // Add animation class to the blog post container
      const blogPost = this.closest('.blog-post');
      blogPost.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
      blogPost.style.transform = 'scale(0.98)';
      blogPost.style.opacity = '0.8';
      
      // Create page unfolding animation effect
      createPageTransitionEffect(blogPost, postUrl);
    });
  });
  
  // Function to create page transition effect
  function createPageTransitionEffect(blogPost, url) {
    // Create overlay for smooth transition
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = 'rgba(102, 126, 234, 0.1)';
    overlay.style.zIndex = '9999';
    overlay.style.opacity = '0';
    overlay.style.transition = 'all 0.6s cubic-bezier(0.645, 0.045, 0.355, 1)';
    document.body.appendChild(overlay);
    
    // Animate overlay in
    setTimeout(() => {
      overlay.style.opacity = '0.3';
      
      // Create unfolding effect
      const unfold = document.createElement('div');
      unfold.style.position = 'fixed';
      unfold.style.top = '50%';
      unfold.style.left = '50%';
      unfold.style.width = '0';
      unfold.style.height = '0';
      unfold.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
      unfold.style.borderRadius = '50%';
      unfold.style.zIndex = '10000';
      unfold.style.transform = 'translate(-50%, -50%)';
      unfold.style.transition = 'all 1s cubic-bezier(0.645, 0.045, 0.355, 1)';
      unfold.style.boxShadow = '0 0 60px rgba(102, 126, 234, 0.3)';
      document.body.appendChild(unfold);
      
      // Animate unfold effect
      setTimeout(() => {
        unfold.style.width = '200vw';
        unfold.style.height = '200vh';
        unfold.style.borderRadius = '0';
        
        // Navigate to post after animation completes
        setTimeout(() => {
          window.location.href = url;
        }, 800);
      }, 100);
    }, 100);
  }
});