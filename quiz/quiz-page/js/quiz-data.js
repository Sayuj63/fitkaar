// ========================================
// QUIZ DATA & SCORING SYSTEM
// ========================================

const quizData = {
    questions: [
        {
            id: 1,
            question: "What's your weekend vibe? 🌟",
            answers: [
                { text: "Netflix marathon", value: "chill", emoji: "🛋️" },
                { text: "Adventure time!", value: "adventurous", emoji: "🎒" },
                { text: "Brunch with squad", value: "social", emoji: "👯" },
                { text: "Creative projects", value: "creative", emoji: "✨" }
            ]
        },
        {
            id: 2,
            question: "Pick your comfort food 🍕",
            answers: [
                { text: "Spicy noodles", value: "bold", emoji: "🔥" },
                { text: "Classic pizza", value: "chill", emoji: "😋" },
                { text: "Sushi rolls", value: "creative", emoji: "🎎" },
                { text: "Street tacos", value: "adventurous", emoji: "🎉" }
            ]
        },
        {
            id: 3,
            question: "Your go-to emoji combo? 💬",
            answers: [
                { text: "💀😭 (chaos)", value: "bold", emoji: "💀" },
                { text: "✨💖 (wholesome)", value: "social", emoji: "💖" },
                { text: "🔥😎 (confident)", value: "adventurous", emoji: "🔥" },
                { text: "🤔💭 (thoughtful)", value: "creative", emoji: "🤔" }
            ]
        },
        {
            id: 4,
            question: "Dream vacation spot? 🌍",
            answers: [
                { text: "Cozy cabin retreat", value: "chill", emoji: "🏔️" },
                { text: "Tropical beach party", value: "social", emoji: "🏖️" },
                { text: "European art tour", value: "creative", emoji: "🎨" },
                { text: "Mountain hiking", value: "adventurous", emoji: "⛰️" }
            ]
        },
        {
            id: 5,
            question: "Your music playlist is... 🎵",
            answers: [
                { text: "Lo-fi chill beats", value: "chill", emoji: "🎧" },
                { text: "Indie & alternative", value: "creative", emoji: "🎸" },
                { text: "Top 40 hits", value: "social", emoji: "💃" },
                { text: "Rock & EDM bangers", value: "adventurous", emoji: "🤘" }
            ]
        },
        {
            id: 6,
            question: "How do you express yourself? 💭",
            answers: [
                { text: "Through art & design", value: "creative", emoji: "🎨" },
                { text: "Bold fashion choices", value: "bold", emoji: "👗" },
                { text: "Deep conversations", value: "chill", emoji: "☕" },
                { text: "Social media posts", value: "social", emoji: "📱" }
            ]
        },
        {
            id: 7,
            question: "Your ideal Friday night? 🌙",
            answers: [
                { text: "House party vibes", value: "social", emoji: "🎊" },
                { text: "Trying new experiences", value: "adventurous", emoji: "🎢" },
                { text: "Art gallery opening", value: "creative", emoji: "🖼️" },
                { text: "Cozy night in", value: "chill", emoji: "🕯️" }
            ]
        }
    ],
    
    results: {
        "chill": {
            title: "The Chill Curator 🛋️",
            description: "You're all about comfort, good vibes, and keeping it real. You appreciate the simple things in life and know how to create a cozy atmosphere wherever you go. Your style is effortlessly cool and laid-back! 😌✨",
            designStyle: "Minimalist with Comfort Motifs",
            personality: "Relaxed • Thoughtful • Authentic",
            recommended: [
                "Simple text-based designs with meaningful quotes",
                "Comfort icons (coffee cups, plants, cozy elements)",
                "Muted color palette (earth tones, pastels)",
                "Clean typography with breathing room"
            ],
            colors: ["#8B7355", "#A8DADC", "#F1FAEE"],
            vibe: "Your t-shirt should feel like a warm hug – simple, comforting, and totally you."
        },
        "adventurous": {
            title: "The Adventure Seeker 🏔️",
            description: "Life's an adventure and you're here for all of it! You thrive on new experiences, bold moves, and pushing boundaries. Your energy is contagious and you inspire others to step out of their comfort zones! 🚀🔥",
            designStyle: "Bold and Dynamic",
            personality: "Energetic • Fearless • Spontaneous",
            recommended: [
                "Action-packed graphics and dynamic compositions",
                "Vibrant, high-contrast colors",
                "Motivational quotes and empowering messages",
                "Outdoor and adventure-themed elements"
            ],
            colors: ["#FF6B35", "#F7931E", "#004E89"],
            vibe: "Your t-shirt should scream adventure – bold, energetic, and ready for anything!"
        },
        "creative": {
            title: "The Creative Soul 🎨",
            description: "You see art everywhere and express yourself through creativity. Your unique perspective makes the world more beautiful, and you're not afraid to think outside the box. You're a true original! 🌈✨",
            designStyle: "Artistic and Eclectic",
            personality: "Imaginative • Expressive • Unique",
            recommended: [
                "Mixed media elements and artistic compositions",
                "Abstract designs and unique patterns",
                "Personalized collages and custom artwork",
                "Unexpected color combinations"
            ],
            colors: ["#9B59B6", "#E74C3C", "#F39C12"],
            vibe: "Your t-shirt should be a canvas – artistic, expressive, and one-of-a-kind!"
        },
        "social": {
            title: "The Social Butterfly 👯",
            description: "You thrive with your squad and know how to bring people together! Your positive energy lights up any room, and you're always in tune with the latest trends. Life's better with friends, and you're proof of that! 💖🎉",
            designStyle: "Fun and Social",
            personality: "Outgoing • Trendy • Connected",
            recommended: [
                "Pop culture references and trending memes",
                "Friendship and connection themes",
                "Trendy aesthetics and current styles",
                "Fun, playful graphics"
            ],
            colors: ["#FF69B4", "#FFD700", "#00CED1"],
            vibe: "Your t-shirt should celebrate connections – fun, trendy, and totally shareable!"
        },
        "bold": {
            title: "The Bold Trailblazer 🔥",
            description: "You're confident, unapologetic, and always make a statement! You don't follow trends – you set them. Your fearless attitude and strong presence inspire others to be their authentic selves! 💪✨",
            designStyle: "Statement-Making and Powerful",
            personality: "Confident • Daring • Influential",
            recommended: [
                "Bold typography and strong statements",
                "High-impact graphics and striking visuals",
                "Edgy designs with attitude",
                "Monochrome or high-contrast color schemes"
            ],
            colors: ["#000000", "#FF0000", "#FFFFFF"],
            vibe: "Your t-shirt should make a statement – bold, confident, and impossible to ignore!"
        }
    }
};

// ========================================
// QUIZ STATE MANAGEMENT
// ========================================

let currentQuestionIndex = 0;
let userAnswers = [];

// ========================================
// QUIZ FUNCTIONS
// ========================================

function startQuiz() {
    currentQuestionIndex = 0;
    userAnswers = [];
    initializeProgressOrbs();
    showSection(document.getElementById('question-container'));
    displayQuestion();
}

// Initialize progress orbs
function initializeProgressOrbs() {
    const progressContainer = document.querySelector('.progress-orbs');
    if (!progressContainer) return;

    progressContainer.innerHTML = '';
    
    quizData.questions.forEach((_, index) => {
        const orb = document.createElement('div');
        orb.className = 'progress-orb';
        orb.setAttribute('data-question', index);
        
        if (index === 0) {
            orb.classList.add('active');
        }
        
        progressContainer.appendChild(orb);
    });
}

// Update progress orbs
function updateProgressOrbs() {
    const orbs = document.querySelectorAll('.progress-orb');
    
    orbs.forEach((orb, index) => {
        orb.classList.remove('active', 'completed');
        
        if (index < currentQuestionIndex) {
            orb.classList.add('completed');
        } else if (index === currentQuestionIndex) {
            orb.classList.add('active');
        }
    });
}

function displayQuestion() {
    const question = quizData.questions[currentQuestionIndex];
    
    // Update question text
    document.getElementById('question-text').textContent = question.question;

    // Update progress counter text
    const progressCounter = document.getElementById('progress-counter');
    if (progressCounter) {
        progressCounter.textContent = `Question ${currentQuestionIndex + 1} of ${quizData.questions.length}`;
    }
    
    // Update progress orbs
    updateProgressOrbs();
    
    // Create answer options with floating bubble structure
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';
    
    question.answers.forEach((answer, index) => {
        const answerBubble = document.createElement('div');
        answerBubble.className = 'answer-bubble option-card';
        answerBubble.setAttribute('data-value', answer.value);
        answerBubble.setAttribute('data-answer', index + 1);
        
        answerBubble.innerHTML = `
            <div class="bubble-emoji option-emoji">${answer.emoji}</div>
            <div class="bubble-text option-text">${answer.text}</div>
            <div class="bubble-glow"></div>
        `;
        
        answerBubble.addEventListener('click', () => selectAnswer(answer.value, index, answerBubble));
        optionsContainer.appendChild(answerBubble);
    });
}

function selectAnswer(value, index, clickedBubble) {
    // Store the answer
    userAnswers.push(value);
    
    // Add selected class for animation
    if (clickedBubble) {
        clickedBubble.classList.add('selected');
    }
    
    // Move to next question or show results
    if (currentQuestionIndex < quizData.questions.length - 1) {
        currentQuestionIndex++;
        setTimeout(() => {
            displayQuestion();
        }, 800); // Wait for animation to complete
    } else {
        setTimeout(() => {
            calculateAndShowResult();
        }, 800);
    }
}

// ========================================
// SCORING SYSTEM
// ========================================

function calculateAndShowResult() {
    // Count occurrences of each value type
    const valueCounts = {};
    
    userAnswers.forEach(value => {
        valueCounts[value] = (valueCounts[value] || 0) + 1;
    });
    
    // Find the most common value
    let maxCount = 0;
    let resultType = 'chill'; // default
    
    for (const [value, count] of Object.entries(valueCounts)) {
        if (count > maxCount) {
            maxCount = count;
            resultType = value;
        }
    }
    
    // Handle ties by prioritizing certain types
    const priorityOrder = ['creative', 'adventurous', 'social', 'bold', 'chill'];
    const tiedValues = Object.keys(valueCounts).filter(key => valueCounts[key] === maxCount);
    
    if (tiedValues.length > 1) {
        resultType = priorityOrder.find(type => tiedValues.includes(type)) || resultType;
    }
    
    // Display the result
    displayResult(resultType);
}

function displayResult(resultType) {
    const result = quizData.results[resultType];
    
    // Map result types to emojis
    const iconMap = {
        'chill': '🛋️',
        'adventurous': '🏔️',
        'creative': '🎨',
        'social': '👯',
        'bold': '🔥'
    };
    
    // Update result content
    document.getElementById('result-name').textContent = result.title;
    document.getElementById('result-subtitle').textContent = result.description.split('.')[0] + '.';
    document.getElementById('result-icon').textContent = iconMap[resultType] || '✨';
    
    // Update description
    document.getElementById('result-description').innerHTML = `
        <p>${result.description}</p>
        <div style="background: rgba(255,255,255,0.1); padding: 1.5rem; border-radius: 20px; margin-top: 1.5rem;">
            <h4 style="font-family: var(--font-heading); font-size: 1.3rem; margin-bottom: 0.5rem; color: var(--color-accent-yellow);">Your Design Style</h4>
            <p style="font-size: 1.1rem; margin-bottom: 0.5rem;">${result.designStyle}</p>
            <p style="font-size: 0.95rem; color: var(--color-text-muted);">${result.personality}</p>
        </div>
    `;
    
    // Update recommendations
    document.getElementById('result-recommendations').innerHTML = `
        <h3>Perfect for You ✨</h3>
        <ul>
            ${result.recommended.map(item => `<li>${item}</li>`).join('')}
        </ul>
    `;
    
    // Show result section
    showSection(document.getElementById('result'));
}

// ========================================
// SECTION NAVIGATION
// ========================================

function showSection(section) {
    // Hide all sections
    document.querySelectorAll('.quiz-section').forEach(s => {
        s.classList.remove('active');
    });
    
    // Show target section
    section.classList.add('active');
}

// ========================================
// EVENT LISTENERS
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    // Start button
    const startBtn = document.getElementById('start-btn');
    if (startBtn) {
        startBtn.addEventListener('click', startQuiz);
    }
    
    // Restart button
    const restartBtn = document.getElementById('restart-btn');
    if (restartBtn) {
        restartBtn.addEventListener('click', () => {
            showSection(document.getElementById('intro'));
        });
    }
});

console.log('📊 Quiz Data & Scoring System Loaded! 🎯');
