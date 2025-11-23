document.addEventListener('DOMContentLoaded', () => {
    const designArea = document.getElementById('designArea');
    const placeholderHint = document.querySelector('.placeholder-hint');
    const toast = document.getElementById('toast');
    
    let zIndexCounter = 10;
    let placedElements = []; // Track elements

    // Selection Logic
    let selectedElement = null;

    designArea.addEventListener('click', (e) => {
        if (e.target === designArea) {
            deselectAll();
        }
    });

    function selectElement(el) {
        deselectAll();
        selectedElement = el;
        el.classList.add('selected');
    }

    function deselectAll() {
        if (selectedElement) {
            selectedElement.classList.remove('selected');
            selectedElement = null;
        }
    }

    // Dragging Logic
    function makeDraggable(el) {
        let isDragging = false;
        let startX, startY, initialLeft, initialTop;

        function onDragStart(e) {
            if (e.target.classList.contains('resize-handle') || e.target.closest('.delete-btn')) return;
            
            isDragging = true;
            selectElement(el);
            
            const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
            const clientY = e.type.includes('touch') ? e.touches[0].clientY : e.clientY;
            
            startX = clientX;
            startY = clientY;
            initialLeft = el.offsetLeft;
            initialTop = el.offsetTop;
            
            el.style.cursor = 'grabbing';
            if (e.type.includes('touch')) {
                // e.preventDefault(); // Prevent scrolling while dragging
            }
        }

        function onDragMove(e) {
            if (!isDragging) return;

            const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
            const clientY = e.type.includes('touch') ? e.touches[0].clientY : e.clientY;

            const dx = clientX - startX;
            const dy = clientY - startY;

            el.style.left = `${initialLeft + dx}px`;
            el.style.top = `${initialTop + dy}px`;
            
            if (e.type.includes('touch')) e.preventDefault(); // Prevent scroll only when dragging
        }

        function onDragEnd() {
            if (isDragging) {
                isDragging = false;
                el.style.cursor = 'grab';
            }
        }

        el.addEventListener('mousedown', onDragStart);
        el.addEventListener('touchstart', onDragStart, { passive: false });

        document.addEventListener('mousemove', onDragMove);
        document.addEventListener('touchmove', onDragMove, { passive: false });

        document.addEventListener('mouseup', onDragEnd);
        document.addEventListener('touchend', onDragEnd);
    }

    // Resizing Logic
    function makeResizable(el) {
        const handles = el.querySelectorAll('.resize-handle');
        const content = el.querySelector('img, .preview-text, i');
        
        handles.forEach(handle => {
            function onResizeStart(e) {
                e.stopPropagation();
                if (e.type.includes('touch')) e.preventDefault();

                const isNW = handle.classList.contains('nw');
                const isNE = handle.classList.contains('ne');
                const isSW = handle.classList.contains('sw');
                const isSE = handle.classList.contains('se');
                
                const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
                const clientY = e.type.includes('touch') ? e.touches[0].clientY : e.clientY;

                const startX = clientX;
                const startY = clientY;
                const startWidth = el.offsetWidth;
                const startHeight = el.offsetHeight;
                const startLeft = el.offsetLeft;
                const startTop = el.offsetTop;
                
                // Get current scale/font-size
                let startFontSize = 16;
                if (!el.querySelector('img')) {
                    startFontSize = parseFloat(window.getComputedStyle(content).fontSize);
                }

                function onResizeMove(e) {
                    const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
                    const clientY = e.type.includes('touch') ? e.touches[0].clientY : e.clientY;

                    const dx = clientX - startX;
                    const dy = clientY - startY;
                    
                    let newWidth = startWidth;
                    let newHeight = startHeight;
                    
                    // Calculate new dimensions based on handle
                    if (isSE) {
                        newWidth = startWidth + dx;
                        newHeight = startHeight + dy; 
                    } else if (isSW) {
                        newWidth = startWidth - dx;
                        newHeight = startHeight + dy;
                        el.style.left = `${startLeft + dx}px`;
                    } else if (isNE) {
                        newWidth = startWidth + dx;
                        newHeight = startHeight - dy;
                        el.style.top = `${startTop + dy}px`;
                    } else if (isNW) {
                        newWidth = startWidth - dx;
                        newHeight = startHeight - dy;
                        el.style.left = `${startLeft + dx}px`;
                        el.style.top = `${startTop + dy}px`;
                    }

                    // Min/Max size check
                    if (newWidth > 30 && newHeight > 30 && newWidth < 80 && newHeight < 80) {
                        el.style.width = `${newWidth}px`;
                        el.style.height = `${newHeight}px`;
                        
                        // Scale content
                        if (el.querySelector('img')) {
                            // Image scales automatically
                        } else {
                            // Scale text/icon
                            const scaleFactor = newWidth / startWidth;
                            content.style.fontSize = `${startFontSize * scaleFactor}px`;
                        }
                    }
                    
                    if (e.type.includes('touch')) e.preventDefault();
                }

                function onResizeEnd() {
                    document.removeEventListener('mousemove', onResizeMove);
                    document.removeEventListener('touchmove', onResizeMove);
                    document.removeEventListener('mouseup', onResizeEnd);
                    document.removeEventListener('touchend', onResizeEnd);
                }

                document.addEventListener('mousemove', onResizeMove);
                document.addEventListener('touchmove', onResizeMove, { passive: false });
                document.addEventListener('mouseup', onResizeEnd);
                document.addEventListener('touchend', onResizeEnd);
            }

            handle.addEventListener('mousedown', onResizeStart);
            handle.addEventListener('touchstart', onResizeStart, { passive: false });
        });

        // Delete Button
        el.querySelector('.delete-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            deleteElement(el);
        });
    }

    function deleteElement(el) {
        el.classList.add('fading-out');
        setTimeout(() => {
            el.remove();
            placedElements = placedElements.filter(e => e !== el);
            if (placedElements.length === 0) {
                placeholderHint.style.display = 'block';
            }
        }, 300); // Match animation duration
    }

    // --- Animations & Interactions ---

    // Page Load Stagger
    const cards = document.querySelectorAll('.element-card');
    cards.forEach(card => {
        // Random fly-in direction
        const rx = (Math.random() - 0.5) * 100;
        const ry = (Math.random() - 0.5) * 100;
        card.style.setProperty('--fly-x', `${rx}px`);
        card.style.setProperty('--fly-y', `${ry}px`);
        
        // Add flyIn animation class
        card.style.animation = `flyIn 0.8s ease-out forwards ${card.style.animationDelay || '0s'}`;

        // Switch to float animation after load
        card.addEventListener('animationend', (e) => {
            if (e.animationName === 'flyIn') {
                card.style.animation = ''; // Clear flyIn
                card.classList.add('loaded'); // Triggers floatScatter in CSS
            }
        });
    });

    // Cursor Trail
    let lastTrailTime = 0;
    document.addEventListener('mousemove', (e) => {
        const now = Date.now();
        if (now - lastTrailTime > 50) { // Limit creation rate
            createTrailDot(e.clientX, e.clientY);
            lastTrailTime = now;
        }
    });

    function createTrailDot(x, y) {
        const dot = document.createElement('div');
        dot.classList.add('cursor-trail');
        dot.style.left = `${x}px`;
        dot.style.top = `${y}px`;
        document.body.appendChild(dot);
        setTimeout(() => dot.remove(), 500);
    }

    // Click to Place (Flying Element)
    cards.forEach(card => {
        card.addEventListener('click', (e) => {
            e.stopPropagation(); 
            
            // 1. Create flying clone
            const rect = card.getBoundingClientRect();
            const clone = card.cloneNode(true);
            clone.classList.add('flying-element');
            clone.style.left = `${rect.left}px`;
            clone.style.top = `${rect.top}px`;
            clone.style.width = `${rect.width}px`;
            clone.style.height = `${rect.height}px`;
            clone.style.margin = '0';
            clone.style.transform = 'none'; // Reset rotations for flight
            document.body.appendChild(clone);

            // 2. Calculate target position (random spot on t-shirt)
            const designRect = designArea.getBoundingClientRect();
            // Random position within 60% of design area center
            const targetX = designRect.left + (designRect.width * 0.2) + Math.random() * (designRect.width * 0.6);
            const targetY = designRect.top + (designRect.height * 0.2) + Math.random() * (designRect.height * 0.6);

            // 3. Animate
            requestAnimationFrame(() => {
                clone.classList.add('moving');
                clone.style.left = `${targetX - rect.width/2}px`;
                clone.style.top = `${targetY - rect.height/2}px`;
            });

            // 4. On Arrival
            setTimeout(() => {
                clone.remove();
                addStickerToTshirt(card, targetX, targetY);
                createConfetti(targetX, targetY);
                placeholderHint.style.display = 'none';
            }, 600); // Match transition duration
        });
    });

    function addStickerToTshirt(originalCard, pageX, pageY) {
        const type = originalCard.dataset.type;
        const content = originalCard.dataset.content;
        const src = originalCard.dataset.src;
        
        // Create the actual element on the t-shirt
        const newEl = document.createElement('div');
        newEl.classList.add('placed-element'); // Use placed-element class
        
        // Calculate relative position inside designArea
        const designRect = designArea.getBoundingClientRect();
        const relX = pageX - designRect.left;
        const relY = pageY - designRect.top;
        
        newEl.style.left = `${relX}px`;
        newEl.style.top = `${relY}px`;
        newEl.style.width = '60px'; // Initial size
        newEl.style.height = '60px'; // Initial size
        newEl.style.zIndex = zIndexCounter++;
        
        // Content Logic
        if (type === 'image') {
            const img = document.createElement('img');
            img.src = src;
            newEl.appendChild(img);
        } else if (type === 'text') {
            const textContent = originalCard.querySelector('.preview-text').cloneNode(true);
            textContent.style.fontSize = '1rem'; // Reset font size
            newEl.appendChild(textContent);
        } else if (type === 'icon') {
            const iconContent = originalCard.querySelector('i').cloneNode(true);
            iconContent.style.fontSize = '2.5rem';
            newEl.appendChild(iconContent);
        }

        // Add controls
        const controls = document.createElement('div');
        controls.classList.add('element-controls');
        controls.innerHTML = `
            <div class="resize-handle nw"></div>
            <div class="resize-handle ne"></div>
            <div class="resize-handle sw"></div>
            <div class="resize-handle se"></div>
            <div class="control-btn delete-btn">×</div>
            <div class="control-btn rotate-btn">↻</div>
        `;
        newEl.appendChild(controls);

        // Make draggable/interactive
        makeDraggable(newEl);
        makeResizable(newEl);
        
        designArea.appendChild(newEl);
        placedElements.push(newEl);
        
        // Bounce effect on landing
        newEl.animate([
            { transform: 'scale(0)' },
            { transform: 'scale(1.2)' },
            { transform: 'scale(1)' }
        ], {
            duration: 400,
            easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)'
        });
        
        selectElement(newEl);
    }

    function createConfetti(x, y) {
        const colors = ['#ff9f43', '#ff9ff3', '#54a0ff', '#5f27cd', '#10ac84'];
        for (let i = 0; i < 12; i++) {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti-piece');
            confetti.style.left = `${x}px`;
            confetti.style.top = `${y}px`;
            confetti.style.setProperty('--color', colors[Math.floor(Math.random() * colors.length)]);
            
            const angle = Math.random() * Math.PI * 2;
            const velocity = 50 + Math.random() * 80;
            const tx = Math.cos(angle) * velocity;
            const ty = Math.sin(angle) * velocity;
            
            confetti.style.setProperty('--tx', `${tx}px`);
            confetti.style.setProperty('--ty', `${ty}px`);
            
            document.body.appendChild(confetti);
            setTimeout(() => confetti.remove(), 800);
        }
    }

    // Haptic Feedback Simulation & Sparkles
    document.addEventListener('click', (e) => {
        const target = e.target.closest('button, .category-header, .control-btn');
        if (target) {
             createSparkles(e.clientX, e.clientY);
             target.classList.add('haptic-active');
             setTimeout(() => target.classList.remove('haptic-active'), 100);
        }
    });

    function createSparkles(x, y) {
        for (let i = 0; i < 5; i++) {
            const sparkle = document.createElement('div');
            sparkle.classList.add('sparkle');
            sparkle.innerHTML = '✨';
            sparkle.style.left = `${x}px`;
            sparkle.style.top = `${y}px`;
            
            // Random direction
            const angle = Math.random() * Math.PI * 2;
            const velocity = 30 + Math.random() * 50;
            const tx = Math.cos(angle) * velocity;
            const ty = Math.sin(angle) * velocity;
            
            sparkle.style.setProperty('--tx', `${tx}px`);
            sparkle.style.setProperty('--ty', `${ty}px`);
            
            document.body.appendChild(sparkle);
            
            setTimeout(() => sparkle.remove(), 800);
        }
    }
});
