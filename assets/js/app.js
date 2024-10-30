const text = "Fullstack Software Developer.";
const typingSpeed = 150;
const resetDelay = 2000;

let i = 0;
const heroElement = document.getElementById("hero");

function typeText() {
    if (i < text.length) {
        heroElement.textContent += text.charAt(i);
        i++;
        setTimeout(typeText, typingSpeed);
    } else {
        setTimeout(resetText, resetDelay);
    }
}

function resetText() {
    heroElement.textContent = "";
    i = 0;
    typeText();
}

typeText();

document.addEventListener('DOMContentLoaded', () => {
    const sidebarLinks = document.querySelectorAll('.hero-sidebar_details a');
    const sections = document.querySelectorAll('.main');

    sidebarLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            
            const targetSection = link.getAttribute('data-section');

            // Hide all sections
            sections.forEach(section => {
                section.style.display = 'none';
            });

            // Remove active class from all links
            sidebarLinks.forEach(link => {
                link.classList.remove('active');
            });

            // Show the selected section and add active class to clicked link
            document.getElementById(targetSection).style.display = 'block';
            link.classList.add('active');
        });
    });
});
