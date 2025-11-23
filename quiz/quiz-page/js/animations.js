// ========================================
// MINIMAL QUIZ ANIMATIONS (Professional)
// ========================================

// Register GSAP plugins (only for confetti)
gsap.registerPlugin(ScrollTrigger);

// Mobile detection
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768;
const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

console.log('Device Info:', { isMobile, isTouchDevice, width: window.innerWidth });

// ========================================
// RESULT CONFETTI ONLY
// ========================================

// Confetti explosion (only animation we keep)
function createConfettiExplosion() {
    const colors = ['#FBBF24', '#60A5FA', '#DBEAFE', '#FFFFFF', '#3B82F6'];
    const confettiCount = isMobile ? 30 : 60;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.left = centerX + 'px';
        confetti.style.top = centerY + 'px';
        confetti.style.width = gsap.utils.random(8, 15) + 'px';
        confetti.style.height = gsap.utils.random(8, 15) + 'px';
        confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
        confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.pointerEvents = 'none';
        confetti.style.zIndex = '999';
        
        document.body.appendChild(confetti);
        
        const angle = (Math.PI * 2 * i) / confettiCount;
        const velocity = gsap.utils.random(200, 400);
        const gravity = gsap.utils.random(300, 600);
        
        gsap.to(confetti, {
            x: Math.cos(angle) * velocity,
            y: Math.sin(angle) * velocity + gravity,
            rotation: gsap.utils.random(-720, 720),
            opacity: 0,
            duration: gsap.utils.random(1.5, 2.5),
            ease: 'power2.out',
            onComplete: () => confetti.remove()
        });
    }
}

// Trigger confetti when result section becomes active
const originalShowSection = window.showSection;
window.showSection = function(section) {
    if (originalShowSection) {
        originalShowSection.call(this, section);
    }
    
    // Trigger confetti only on result page
    if (section && section.id === 'result') {
        setTimeout(() => {
            createConfettiExplosion();
        }, 300);
    }
};

console.log('✨ Minimal Quiz Animations Loaded (Professional Mode)');
