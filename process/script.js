document.addEventListener('DOMContentLoaded', () => {
    const models = ['male_model.png', 'female_model.png'];
    let currentModelIndex = 0;
    
    // Store placed stickers for each model. 
    const placedStickers = {
        'male_model.png': new Set(),
        'female_model.png': new Set()
    };

    // Fixed positions for each sticker (Top/Left percentages)
    // Matched to reference image layout
    const stickerConfig = {
        'camera_sticker.png': { top: '42%', left: '50%', width: '25%' }, // Top Center (Neck)
        'chai_sticker.png': { top: '48%', left: '58%', width: '15%' }, // Right side
        'football_sticker.png': { top: '48%', left: '42%', width: '25%' }, // Left side
        'guitar_sticker.png': { top: '55%', left: '62%', width: '15%' }, // Right side vertical
        'mountain_sticker.png': { top: '35%', left: '50%', width: '30%' }, // Top Center (Shoulders)
        'pasta_sticker.png': { top: '55%', left: '50%', width: '20%' }, // Center
        'quote_sticker.png': { top: '48%', left: '50%', width: '35%' }, // Center Text
        'ticket_sticker.png': { top: '60%', left: '45%', width: '22%' } // Bottom Left
    };

    const modelImage = document.getElementById('modelImage');
    const designArea = document.getElementById('designArea');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    // Select all element cards from scatter zones
    const stickerItems = document.querySelectorAll('.element-card');

    // Initialize
    updateModel();

    function updateModel() {
        const modelFile = models[currentModelIndex];
        // Fade out effect
        modelImage.style.opacity = '0';
        setTimeout(() => {
            modelImage.src = `assets/${modelFile}`;
            modelImage.onload = () => {
                modelImage.style.opacity = '1';
            };
            renderStickers();
        }, 200);
    }

    function renderStickers() {
        designArea.innerHTML = '';
        const modelFile = models[currentModelIndex];
        const activeStickers = placedStickers[modelFile];

        activeStickers.forEach(filename => {
            const config = stickerConfig[filename];
            if (!config) return;

            const el = document.createElement('div');
            el.className = 'placed-element fixed-pos';
            el.style.position = 'absolute';
            el.style.top = config.top;
            el.style.left = config.left;
            el.style.width = config.width;
            el.style.transform = 'translate(-50%, -50%)'; // Center on coordinate
            el.style.zIndex = '10';
            el.style.pointerEvents = 'none'; // Fixed position
            
            const img = document.createElement('img');
            img.src = `assets/${filename}`;
            img.style.width = '100%';
            img.style.height = 'auto';
            img.style.filter = 'drop-shadow(0 5px 15px rgba(0,0,0,0.3))';
            
            el.appendChild(img);
            
            // Pop Animation
            el.animate([
                { transform: 'translate(-50%, -50%) scale(0)' },
                { transform: 'translate(-50%, -50%) scale(1.2)' },
                { transform: 'translate(-50%, -50%) scale(1)' }
            ], { duration: 400, easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)' });

            designArea.appendChild(el);
        });
        
        // Update active state in scatter zones
        stickerItems.forEach(item => {
            const src = item.dataset.src.split('/').pop();
            if (activeStickers.has(src)) {
                item.style.border = '3px solid #FFD700';
                item.style.transform = 'scale(1.15) rotate(var(--rot, 0deg))';
                item.classList.add('active-sticker');
            } else {
                item.style.border = 'none';
                item.style.transform = '';
                item.classList.remove('active-sticker');
            }
        });
    }

    // Event Listeners
    prevBtn.addEventListener('click', () => {
        currentModelIndex = (currentModelIndex - 1 + models.length) % models.length;
        updateModel();
    });

    nextBtn.addEventListener('click', () => {
        currentModelIndex = (currentModelIndex + 1) % models.length;
        updateModel();
    });

    // Swipe Support
    let touchStartX = 0;
    let touchEndX = 0;
    
    designArea.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    }, {passive: true});
    
    designArea.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, {passive: true});
    
    function handleSwipe() {
        if (touchEndX < touchStartX - 50) {
            // Swipe Left -> Next
            currentModelIndex = (currentModelIndex + 1) % models.length;
            updateModel();
        }
        if (touchEndX > touchStartX + 50) {
            // Swipe Right -> Prev
            currentModelIndex = (currentModelIndex - 1 + models.length) % models.length;
            updateModel();
        }
    }

    stickerItems.forEach(item => {
        item.addEventListener('click', () => {
            const src = item.dataset.src.split('/').pop(); // get filename
            const modelFile = models[currentModelIndex];
            
            if (placedStickers[modelFile].has(src)) {
                placedStickers[modelFile].delete(src); // Toggle off
            } else {
                placedStickers[modelFile].add(src); // Toggle on
                createConfetti(); // Fun feedback
                createSparkles(item.getBoundingClientRect().left + 30, item.getBoundingClientRect().top);
            }
            renderStickers();
        });
    });

    // --- Effects ---

    function createConfetti() {
        const colors = ['#ff9f43', '#ff9ff3', '#54a0ff', '#5f27cd', '#10ac84'];
        const rect = designArea.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        for (let i = 0; i < 20; i++) {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti-piece');
            confetti.style.position = 'fixed';
            confetti.style.width = '10px';
            confetti.style.height = '10px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = `${centerX}px`;
            confetti.style.top = `${centerY}px`;
            confetti.style.zIndex = '9999';
            
            const angle = Math.random() * Math.PI * 2;
            const velocity = 100 + Math.random() * 100;
            const tx = Math.cos(angle) * velocity;
            const ty = Math.sin(angle) * velocity;
            
            confetti.animate([
                { transform: 'translate(0, 0) rotate(0deg)', opacity: 1 },
                { transform: `translate(${tx}px, ${ty}px) rotate(${Math.random() * 720}deg)`, opacity: 0 }
            ], {
                duration: 1000,
                easing: 'ease-out'
            }).onfinish = () => confetti.remove();
            
            document.body.appendChild(confetti);
        }
    }

    function createSparkles(x, y) {
        for (let i = 0; i < 5; i++) {
            const sparkle = document.createElement('div');
            sparkle.innerHTML = '✨';
            sparkle.style.position = 'fixed';
            sparkle.style.left = `${x}px`;
            sparkle.style.top = `${y}px`;
            sparkle.style.fontSize = '20px';
            sparkle.style.zIndex = '9999';
            sparkle.style.pointerEvents = 'none';
            
            const angle = Math.random() * Math.PI * 2;
            const velocity = 30 + Math.random() * 30;
            const tx = Math.cos(angle) * velocity;
            const ty = Math.sin(angle) * velocity;
            
            sparkle.animate([
                { transform: 'translate(0, 0) scale(0)', opacity: 1 },
                { transform: `translate(${tx}px, ${ty}px) scale(1.5)`, opacity: 0 }
            ], {
                duration: 600,
                easing: 'ease-out'
            }).onfinish = () => sparkle.remove();
            
            document.body.appendChild(sparkle);
        }
    }
});
