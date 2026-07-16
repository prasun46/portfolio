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