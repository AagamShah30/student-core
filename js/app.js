// main.js or app.js
const contentContainer = document.getElementById('app-content');

// Listen for navigation via History API
window.addEventListener('popstate', () => {
  replayAnimation();
});

// For link clicks, intercept and trigger animation
document.addEventListener('click', (e) => {
  const link = e.target.closest('a[href^="/"]');
  if (link && !link.target) {
    e.preventDefault();
    replayAnimation(() => {
      window.history.pushState(null, '', link.href);
      // Load new page content (via fetch or page reload)
    });
  }
});

function replayAnimation(onComplete) {
  contentContainer.classList.remove('page-enter');
  
  // Force reflow to restart animation
  void contentContainer.offsetHeight;
  
  contentContainer.classList.add('page-enter');
  
  if (onComplete) {
    contentContainer.addEventListener('animationend', onComplete, { once: true });
  }
}