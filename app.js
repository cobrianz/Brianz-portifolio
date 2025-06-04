const texts = [
  "Fullstack Software Developer",
  "Frontend Software Developer",
  "Backend Software Developer",
  "MERN Stack Software Developer",
];
const typingSpeed = 150;
const resetDelay = 2000;

let i = 0; // Character index
let textIndex = 0; // Current phrase index
const heroElement = document.getElementById("hero");

if (heroElement) {
  typeText();
} else {
  console.error("Element with ID 'hero' not found.");
}

function typeText() {
  const currentText = texts[textIndex];
  if (i < currentText.length) {
    heroElement.textContent += currentText.charAt(i);
    i++;
    setTimeout(typeText, typingSpeed);
  } else {
    setTimeout(resetText, resetDelay);
  }
}

function resetText() {
  heroElement.textContent = "";
  i = 0;
  textIndex = (textIndex + 1) % texts.length; // Move to next phrase, loop back to 0
  typeText();
}

document.addEventListener("DOMContentLoaded", () => {
  const sidebarLinks = document.querySelectorAll(".hero-sidebar_details a");
  const sections = document.querySelectorAll(".main-section");
  const homeSection = document.getElementById("home");
  const homeLink = document.querySelector(
    '.hero-sidebar_details a[data-section="home"]'
  );

  // Initialize page to show homepage (#home) on load
  if (homeSection && homeLink) {
    // Hide all sections
    sections.forEach((section) => {
      section.style.display = "none";
      section.style.opacity = "0";
    });

    // Show homepage section
    homeSection.style.display = "block";
    setTimeout(() => {
      homeSection.style.opacity = "1"; // Smooth fade-in
    }, 10);

    // Set active class on Home link
    sidebarLinks.forEach((link) => {
      link.classList.remove("active");
    });
    homeLink.classList.add("active");

    // Remove URL fragment to reflect homepage
    window.history.replaceState(null, null, window.location.pathname);

    // Scroll to top
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  // Handle navigation clicks
  sidebarLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();

      const targetSection = document.getElementById(
        link.getAttribute("data-section")
      );

      // Hide all sections
      sections.forEach((section) => {
        section.style.display = "none";
        section.style.opacity = "0";
      });

      // Remove active class from all links
      sidebarLinks.forEach((link) => {
        link.classList.remove("active");
      });

      // Show the selected section and add active class
      targetSection.style.display = "block";
      setTimeout(() => {
        targetSection.style.opacity = "1"; // Smooth fade-in
      }, 10); // Small delay to ensure display: block is applied first
      link.classList.add("active");

      // Smooth scroll to the section
      window.scrollTo({
        top: targetSection.offsetTop,
        behavior: "smooth",
      });
    });
  });
});

