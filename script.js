// Smooth scroll for navigation
const navLinks = document.querySelectorAll('nav a');
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// 1. Animate section entrances (fade-in)
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('main section');
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });
    sections.forEach(section => {
        section.classList.add('fade-init');
        observer.observe(section);
    });
});

// 2. Add keyboard accessibility for navigation
navLinks.forEach(link => {
    link.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});

// Dynamic progress bars for education section (hardcoded values from HTML)
function setBarFromSpan(spanId, barId, isCgpa = false) {
    const span = document.getElementById(spanId);
    const bar = document.getElementById(barId);
    let val = 0;
    if (span && bar) {
        if (isCgpa) {
            // Extract CGPA value and convert to percentage (assuming out of 10)
            const match = span.textContent.match(/([\d.]+)/);
            if (match) {
                val = Math.min(100, Math.max(0, (parseFloat(match[1]) * 10)));
            }
        } else {
            val = parseFloat(span.textContent);
            if (isNaN(val)) val = 0;
        }
        bar.style.width = val + '%';
    }
}
setBarFromSpan('tenth-value', 'tenth-bar');
setBarFromSpan('twelfth-value', 'twelfth-bar');
setBarFromSpan('btech-value', 'btech-bar', true);
