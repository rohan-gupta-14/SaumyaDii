// Custom Cursor
const cursor = document.getElementById('cursor-glow');
document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// Loading Screen
window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loading-screen');
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 800);
    }, 1500); // Artificial delay for a smooth feel
});

// Smooth Scroll
function scrollToSection(id) {
    const element = document.getElementById(id);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// Floating Props Generator
const propsContainer = document.getElementById('floating-props');
const props = ['🌸', '🧸', '✨', '☁️', '💜', '🌷', '🎀', '🧸', '🍭', '⭐', '🎈'];

function createProp() {
    const prop = document.createElement('div');
    prop.className = 'prop';
    prop.innerText = props[Math.floor(Math.random() * props.length)];
    
    const startX = Math.random() * 100;
    prop.style.left = startX + 'vw';
    
    const duration = Math.random() * 20 + 15;
    prop.style.animationDuration = duration + 's';
    
    const delay = Math.random() * 10;
    prop.style.animationDelay = '-' + delay + 's'; // Negative delay to start mid-animation
    
    const size = Math.random() * 25 + 15;
    prop.style.fontSize = size + 'px';
    
    propsContainer.appendChild(prop);

    // Remove prop after animation and create a new one
    setTimeout(() => {
        prop.remove();
        createProp();
    }, (duration - delay) * 1000);
}

// Image Gallery Data
const galleryData = [
    { src: 'photos/1.jpeg', quote: '“Your kindness makes people feel safe.”', poetry: 'In a world of noise, you are the softest song.' },
    { src: 'photos/2.jpeg', quote: '“Some smiles quietly heal others.”', poetry: 'A spark of warmth that lights up the darkest corners.' },
    { src: 'photos/3.jpeg', quote: '“You carry positivity so naturally.”', poetry: 'Like sunlight filtering through the leaves.' },
    { src: 'photos/4.jpeg', quote: '“The world becomes softer around good people like you.”', poetry: 'A gentle heart is a rare and beautiful gem.' },
    { src: 'photos/5.jpeg', quote: '“Your presence itself feels comforting.”', poetry: 'Like the first sip of tea on a cold morning.' },
    { src: 'photos/6.jpeg', quote: '“Not everyone inspires people without trying — but you do.”', poetry: 'A silent leader of kindness and grace.' },
    { src: 'photos/7.jpeg', quote: '“You are proof that gentleness is strength.”', poetry: 'The quiet power of a soul that cares.' },
    { src: 'photos/8.jpeg', quote: '“Some souls shine without making noise.”', poetry: 'A steady flame that never flickers.' },
    { src: 'photos/9.jpeg', quote: '“People may forget moments, but never the warmth you give.”', poetry: 'A memory etched in the hearts of everyone you meet.' },
    { src: 'photos/10.jpeg', quote: '“You make ordinary days feel beautiful.”', poetry: 'Turning the mundane into something extraordinary.' }
];

// Initialize Story Gallery
const storyContainer = document.getElementById('story-container');

galleryData.forEach((data, index) => {
    const storyItem = document.createElement('div');
    // Vary size for some items (enlarged)
    const isEnlarged = index % 3 === 0 ? 'enlarged' : '';
    storyItem.className = `story-item animate-on-scroll ${isEnlarged}`;
    
    storyItem.innerHTML = `
        <div class="story-image-wrapper glass">
            <img src="${data.src}" alt="Memory ${index + 1}" loading="lazy">
        </div>
        <div class="story-content">
            <p class="story-quote">${data.quote}</p>
            <p class="story-poetry">${data.poetry}</p>
        </div>
    `;
    storyContainer.appendChild(storyItem);
});

// Modal Logic (Re-implemented for story items if needed, or simply let the scroll do the work)
// For this new UI, the modal might be redundant, but we can keep it as a zoom feature.
document.querySelectorAll('.story-image-wrapper img').forEach((img, index) => {
    img.onclick = () => openModal(index);
});

// Modal Logic
const modal = document.getElementById('image-modal');
const modalImg = document.getElementById('modal-img');
const modalQuote = document.getElementById('modal-quote');
const modalPoetry = document.getElementById('modal-poetry');

function openModal(index) {
    modal.style.display = 'flex';
    modalImg.src = galleryData[index].src;
    modalQuote.innerText = galleryData[index].quote;
    modalPoetry.innerText = galleryData[index].poetry;
    document.body.style.overflow = 'hidden'; // Prevent scroll
}

document.getElementById('close-modal').onclick = () => {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
};

// Intersection Observer for Scroll Animations
const observerOptions = {
    threshold: 0.2
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('appear');
        }
    });
}, observerOptions);

document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));

// Stars Generator for Ending
const starsContainer = document.getElementById('stars-container');
function createStar() {
    const star = document.createElement('div');
    star.className = 'star';
    const size = Math.random() * 3 + 1;
    star.style.width = size + 'px';
    star.style.height = size + 'px';
    star.style.left = Math.random() * 100 + 'vw';
    star.style.top = Math.random() * 100 + 'vh';
    star.style.setProperty('--duration', (Math.random() * 3 + 2) + 's');
    starsContainer.appendChild(star);
}

for (let i = 0; i < 150; i++) {
    createStar();
}

// Typing Animation Logic
const text1 = "Some people become memories… some become inspiration.";
const text2 = "Thank You, Saumya Di 💜";
const typingEl1 = document.getElementById('typing-text-1');
const typingEl2 = document.getElementById('typing-text-2');

let charIndex1 = 0;
let charIndex2 = 0;

function typeText1() {
    if (charIndex1 < text1.length) {
        typingEl1.textContent += text1.charAt(charIndex1);
        charIndex1++;
        setTimeout(typeText1, 100);
    } else {
        setTimeout(typeText2, 1000);
    }
}

function typeText2() {
    if (charIndex2 < text2.length) {
        typingEl2.textContent += text2.charAt(charIndex2);
        charIndex2++;
        setTimeout(typeText2, 150);
    }
}

// Trigger typing when ending section is visible
const endingObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
        typeText1();
        endingObserver.disconnect();
    }
}, { threshold: 0.5 });

endingObserver.observe(document.getElementById('ending'));

// Background Music Logic
const bgMusic = document.getElementById('bg-music');
const musicToggle = document.getElementById('music-toggle');
let isPlaying = false;

function toggleMusic() {
    if (isPlaying) {
        bgMusic.pause();
        musicToggle.classList.remove('playing');
        musicToggle.querySelector('.icon').innerText = '🔇';
    } else {
        if (bgMusic.currentTime === 0) bgMusic.currentTime = 25; // Skip first 25s
        bgMusic.play();
        musicToggle.classList.add('playing');
        musicToggle.querySelector('.icon').innerText = '🎵';
    }
    isPlaying = !isPlaying;
}

musicToggle.addEventListener('click', toggleMusic);

// Auto-play on first interaction (browsers block auto-play without interaction)
document.addEventListener('click', () => {
    if (!isPlaying) {
        bgMusic.currentTime = 25; // Skip first 25s
        bgMusic.play().then(() => {
            isPlaying = true;
            musicToggle.classList.add('playing');
            musicToggle.querySelector('.icon').innerText = '🎵';
        }).catch(err => console.log("Autoplay prevented:", err));
    }
}, { once: true });
