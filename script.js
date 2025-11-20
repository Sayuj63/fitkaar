document.addEventListener('DOMContentLoaded', () => {
    const storyBlocks = document.querySelectorAll('.story-block');
    const finalSection = document.getElementById('final-transition');
    const centerImage = document.getElementById('center-flow-img');
    const scrollStorySection = document.getElementById('scroll-story');

    // Observer for Story Blocks (Fade In / Slide)
    const blockObserverOptions = {
        threshold: 0.3, // Trigger when 30% of the block is visible
        rootMargin: "0px 0px -100px 0px"
    };

    const blockObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                entry.target.classList.remove('visible');
            }
        });
    }, blockObserverOptions);

    storyBlocks.forEach(block => {
        blockObserver.observe(block);
    });

    // Scroll Listener for Gradual Shrink
    window.addEventListener('scroll', () => {
        if (!scrollStorySection || !centerImage) return;

        const sectionRect = scrollStorySection.getBoundingClientRect();
        const sectionTop = sectionRect.top;
        const sectionHeight = sectionRect.height;
        const viewportHeight = window.innerHeight;

        // Calculate progress: 0 when section enters, 1 when it leaves
        // We want to shrink from 1.0 to ~0.6 over the course of the scroll
        // Start shrinking when the sticky container locks (top <= 0)

        if (sectionTop <= 0 && sectionRect.bottom > viewportHeight) {
            // We are scrolling within the section
            const scrollDistance = Math.abs(sectionTop);
            const maxScroll = sectionHeight - viewportHeight;
            const progress = Math.min(Math.max(scrollDistance / maxScroll, 0), 1);

            // Scale from 1.0 down to 0.6
            const scale = 1 - (progress * 0.4);

            centerImage.style.transform = `scale(${scale})`;
        }
    });

    // Observer for Dummy Image Spread Animation
    const spreadObserverOptions = {
        threshold: 0.2 // Trigger when 20% of the section is visible
    };

    const spreadObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const dummies = entry.target.querySelectorAll('.dummy-image');
            if (entry.isIntersecting) {
                dummies.forEach(d => d.classList.add('spread'));
            } else {
                dummies.forEach(d => d.classList.remove('spread'));
            }
        });
    }, spreadObserverOptions);

    if (finalSection) {
        spreadObserver.observe(finalSection);
    }
});
