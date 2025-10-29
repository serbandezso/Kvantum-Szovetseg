// Kérdések kezelése
function toggleAnswer(button) {
    const answer = button.querySelector('.answer');
    const isExpanded = button.getAttribute('aria-expanded') === 'true';
    
    if (isExpanded) {
        answer.hidden = true;
        button.setAttribute('aria-expanded', 'false');
        button.style.backgroundColor = '';
    } else {
        answer.hidden = false;
        button.setAttribute('aria-expanded', 'true');
        button.style.backgroundColor = '#f5f2ea';
    }
}

// Enter gomb kezelése a kérdéseknél
document.addEventListener('DOMContentLoaded', function() {
    // Delegált eseménykezelő a kérdésekhez
    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('question') || 
            event.target.closest('.question')) {
            const button = event.target.classList.contains('question') ? 
                          event.target : event.target.closest('.question');
            toggleAnswer(button);
        }
    });
    
    // Enter és space billentyű a kérdéseknél
    document.addEventListener('keydown', function(event) {
        if ((event.key === 'Enter' || event.key === ' ') && 
            (event.target.classList.contains('question') || 
             event.target.closest('.question'))) {
            event.preventDefault();
            const button = event.target.classList.contains('question') ? 
                          event.target : event.target.closest('.question');
            toggleAnswer(button);
        }
    });
});

// Lazy loading képekhez
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
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
});