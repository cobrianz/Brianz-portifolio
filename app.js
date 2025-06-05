// Typing Animation
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

// Navigation
document.addEventListener("DOMContentLoaded", () => {
  const sidebarLinks = document.querySelectorAll(".hero-sidebar_details a");
  const sections = document.querySelectorAll(".main-section");
  const homeSection = document.getElementById("home");
  const homeLink = document.querySelector(
    '.hero-sidebar_details a[data-section="home"]'
  );

  // Initialize page to show homepage (#home) on load
  if (homeSection && homeLink) {
    sections.forEach((section) => {
      section.style.display = "none";
      section.style.opacity = "0";
    });
    homeSection.style.display = "block";
    setTimeout(() => {
      homeSection.style.opacity = "1";
    }, 10);
    sidebarLinks.forEach((link) => link.classList.remove("active"));
    homeLink.classList.add("active");
    window.history.replaceState(null, null, window.location.pathname);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  sidebarLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const targetSection = document.getElementById(
        link.getAttribute("data-section")
      );
      sections.forEach((section) => {
        section.style.display = "none";
        section.style.opacity = "0";
      });
      sidebarLinks.forEach((link) => link.classList.remove("active"));
      targetSection.style.display = "block";
      setTimeout(() => {
        targetSection.style.opacity = "1";
      }, 10);
      link.classList.add("active");
      window.scrollTo({ top: targetSection.offsetTop, behavior: "smooth" });
    });
  });
});

// Blog Interactivity
document.addEventListener("DOMContentLoaded", () => {
  const blogPosts = document.querySelectorAll(".blog-post");
  const fullContents = document.querySelectorAll(".blog-full-content");
  const topicButtons = document.querySelectorAll(".topic-btn");
  const searchBar = document.getElementById("blog-search");
  const blogContainer = document.querySelector(".blog-container");

  blogPosts.forEach((post) => {
    post.addEventListener("click", () => {
      const targetId = post.getAttribute("data-target");
      blogContainer.style.display = "none";
      fullContents.forEach((content) => {
        content.style.display = content.id === targetId ? "block" : "none";
      });
    });
  });

  document.querySelectorAll(".back-to-blog").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      fullContents.forEach((content) => (content.style.display = "none"));
      blogContainer.style.display = "grid";
    });
  });

  topicButtons.forEach((button) => {
    button.addEventListener("click", () => {
      topicButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");
      const topic = button.getAttribute("data-topic");
      blogPosts.forEach((post) => {
        const postTopic = post.getAttribute("data-topic");
        post.style.display =
          topic === "all" || postTopic === topic ? "block" : "none";
      });
    });
  });

  searchBar.addEventListener("input", () => {
    const searchTerm = searchBar.value.toLowerCase();
    blogPosts.forEach((post) => {
      const title = post.querySelector("h3").textContent.toLowerCase();
      const excerpt = post.querySelector(".excerpt").textContent.toLowerCase();
      post.style.display =
        title.includes(searchTerm) || excerpt.includes(searchTerm)
          ? "block"
          : "none";
    });
  });
});

// Contact Modal Trigger
function contact() {
  const modal = document.getElementById("contact-modal");
  if (modal) {
    const modalContent = modal.querySelector(".modal-content");
    if (modalContent) {
      modal.style.display = "flex";
      setTimeout(() => {
        modalContent.classList.add("visible");
      }, 10); // Slight delay to ensure display is applied
    }
    // Update time dynamically
    const modalTimeElement = modal.querySelector(".detail-item:last-child p");
    const sectionTimeElement = document.querySelector(
      "#contact .detail-item:last-child p"
    );
    const now = new Date();
    const timeString = `${now.toLocaleTimeString("en-US", {
      timeZone: "Africa/Nairobi",
      hour12: true,
    })} ${now.toLocaleDateString("en-US", { timeZone: "Africa/Nairobi" })}`;
    if (modalTimeElement) modalTimeElement.textContent = `Time: ${timeString}`;
    if (sectionTimeElement)
      sectionTimeElement.textContent = `Time: ${timeString}`;
  } else {
    console.error("Contact modal not found.");
  }
}

// Contact Modal and Form Handling
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("contact-modal");
  const modalClose = document.querySelector(".modal-close");

  if (modal && modalClose) {
    modalClose.addEventListener("click", () => {
      const modalContent = modal.querySelector(".modal-content");
      if (modalContent) {
        modalContent.classList.remove("visible");
        setTimeout(() => {
          modal.style.display = "none";
        }, 500); // Match animation duration
      }
    });

    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        const modalContent = modal.querySelector(".modal-content");
        if (modalContent) {
          modalContent.classList.remove("visible");
          setTimeout(() => {
            modal.style.display = "none";
          }, 500); // Match animation duration
        }
      }
    });
  } else {
    console.error("Modal or close button not found.");
  }

  // Form Submission Handler (for both section and modal forms)
  const forms = [
    { formId: "contact-form-section", isModal: false },
    { formId: "contact-form-modal", isModal: true },
  ];

  forms.forEach(({ formId, isModal }) => {
    const form = document.getElementById(formId);
    const overlay = isModal ? document.querySelector(".modal-overlay") : null;
    const statusText = isModal
      ? document.getElementById("modal-status-text")
      : null;

    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();

        if (isModal && overlay && statusText) {
          overlay.style.display = "flex";
          statusText.textContent = "Sending...";
          statusText.classList.remove("success", "error");
        }

        const name = form.querySelector(
          `#${
            formId === "contact-form-section" ? "name-section" : "name-modal"
          }`
        ).value;
        const email = form.querySelector(
          `#${
            formId === "contact-form-section" ? "email-section" : "email-modal"
          }`
        ).value;
        const message = form.querySelector(
          `#${
            formId === "contact-form-section"
              ? "message-section"
              : "message-modal"
          }`
        ).value;

        // EmailJS setup (replace with your credentials)
        (function () {
          emailjs.init("YOUR_USER_ID"); // Replace with your EmailJS user ID
        })();

        emailjs
          .send("YOUR_SERVICE_ID", "template_contact_form", {
            from_name: name,
            from_email: email,
            message: message,
            reply_to: email,
          })
          .then(() => {
            if (isModal && overlay && statusText) {
              statusText.textContent = "Message sent successfully!";
              statusText.classList.add("success");
              setTimeout(() => {
                overlay.style.display = "none";
                const modalContent = modal.querySelector(".modal-content");
                if (modalContent) {
                  modalContent.classList.remove("visible");
                  setTimeout(() => {
                    modal.style.display = "none";
                  }, 500); // Match animation duration
                }
              }, 2000);
            } else {
              alert("Message sent successfully!");
            }
            form.reset();
          })
          .catch((error) => {
            if (isModal && overlay && statusText) {
              statusText.textContent =
                "Failed to send message. Please try again.";
              statusText.classList.add("error");
              setTimeout(() => {
                overlay.style.display = "none";
              }, 2000);
            } else {
              alert("Failed to send message. Please try again.");
            }
            console.error("EmailJS error:", error);
          });
      });
    } else {
      console.error(`Form with ID ${formId} not found.`);
    }
  });
});
