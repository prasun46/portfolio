// Dynamic Typing Effect
const textElement = document.querySelector('.typing-text');
const roles = ["Frontend Developer", "Web Designer", "Problem Solver"];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
        textElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
    } else {
        textElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
    }

    // Adjust typing speed
    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentRole.length) {
        typeSpeed = 1500; // Pause at the end of the word
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length; // Move to next role
        typeSpeed = 500; // Pause before typing next word
    }

    setTimeout(typeEffect, typeSpeed);
}

// Start the typing effect when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    if(roles.length) typeEffect();
});

// Basic Form Submission Handler
const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Simulate form submission success
    alert('Thank you! Your message has been sent successfully.');
    contactForm.reset();
});
// =========================================================================
// INTERACTIVE PARTICLES CONSTELLATION PHYSICS ENGINE
// =========================================================================

const canvas = document.getElementById('physics-canvas');
const ctx = canvas.getContext('2d');

let particlesArray = [];
const numberOfParticles = 85; // Balanced for high performance
const connectionDistance = 120; // How close nodes must be to connect

// Mouse Object with a physical "interaction radius"
const mouse = {
    x: null,
    y: null,
    radius: 150 // Distance from cursor where particles react
};

// Track cursor movement
window.addEventListener('mousemove', (event) => {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
});

// Clear mouse coordinates when leaving window
window.addEventListener('mouseout', () => {
    mouse.x = null;
    mouse.y = null;
});

// Auto-adjust canvas size when scaling window
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles();
});

// Setup Initial Canvas Boundaries
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Particle Blueprint
class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1; // Nodes ranging from 1 to 4px
        this.baseX = this.x;
        this.baseY = this.y;
        
        // Speed velocities
        this.vx = (Math.random() - 0.5) * 1.5;
        this.vy = (Math.random() - 0.5) * 1.5;
    }

    // Draw individual node
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = '#00eeff'; // Matches your var(--main-color) theme!
        ctx.shadowBlur = 8;
        ctx.shadowColor = '#00eeff'; // Makes particles glow!
        ctx.fill();
    }

    // Update coordinates & calculate mouse interactions
    update() {
        // Move particle
        this.x += this.vx;
        this.y += this.vy;

        // Bounce off edges smoothly
        if (this.x < 0 || this.x > canvas.width) this.vx = -this.vx;
        if (this.y < 0 || this.y > canvas.height) this.vy = -this.vy;

        // Mouse Repulsion Physics
        if (mouse.x != null && mouse.y != null) {
            let dx = this.x - mouse.x;
            let dy = this.y - mouse.y;
            let distance = Math.hypot(dx, dy);

            if (distance < mouse.radius) {
                // Generate simple vector away from the cursor
                let force = (mouse.radius - distance) / mouse.radius; // Stronger force closer to center
                let forceX = (dx / distance) * force * 4;
                let forceY = (dy / distance) * force * 4;

                this.x += forceX;
                this.y += forceY;
            }
        }
    }
}

// Generate the Array of Nodes
function initParticles() {
    particlesArray = [];
    for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
    }
}

// Draw the glowing network connectors
function connect() {
    for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
            let dx = particlesArray[a].x - particlesArray[b].x;
            let dy = particlesArray[a].y - particlesArray[b].y;
            let distance = Math.hypot(dx, dy);

            if (distance < connectionDistance) {
                // Calculate opacity: closer particles get brighter, solid lines
                let opacity = (1 - (distance / connectionDistance)).toFixed(2);
                ctx.strokeStyle = `rgba(0, 238, 255, ${opacity})`;
                ctx.lineWidth = 1;
                
                ctx.beginPath();
                ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                ctx.stroke();
            }
        }
    }
}

// Main Animation Loop
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Wipe frame clear
    
    // Reset glow for lines
    ctx.shadowBlur = 0; 
    
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
    }
    
    connect();
    requestAnimationFrame(animate);
}

// Fire it up!
initParticles();
animate();