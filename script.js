// Initialize AOS
AOS.init({
    duration: 1000,
    once: true,
    mirror: false,
});

// Mobile Menu Toggle
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const body = document.body;

menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});

// Close menu when clicking outside
document.addEventListener("click", (e) => {
    if (
        !navLinks.contains(e.target) &&
        !menuToggle.contains(e.target) &&
        navLinks.classList.contains("active")
    ) {
        navLinks.classList.remove("active");
    }
});

// Close menu when clicking on a link
document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("active");
    });
});

// Carousel functionality
const carouselContainer = document.querySelector(".carousel-container");
const slides = document.querySelectorAll(".carousel-slide");
const prevButton = document.querySelector(".carousel-prev");
const nextButton = document.querySelector(".carousel-next");

let currentSlide = 0;
const totalSlides = slides.length;

function updateCarousel() {
    carouselContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateCarousel();
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateCarousel();
}

prevButton?.addEventListener("click", prevSlide);
nextButton?.addEventListener("click", nextSlide);

// Auto-advance carousel every 5 seconds
let carouselInterval = setInterval(nextSlide, 5000);

// Pause carousel on hover
carouselContainer?.addEventListener("mouseenter", () => {
    clearInterval(carouselInterval);
});

carouselContainer?.addEventListener("mouseleave", () => {
    carouselInterval = setInterval(nextSlide, 5000);
});

// Scroll to top functionality
const scrollToTopButton = document.getElementById("scroll-to-top");

function toggleScrollToTopButton() {
    if (window.scrollY > 300) {
        scrollToTopButton.style.display = "block";
        scrollToTopButton.style.opacity = "1";
    } else {
        scrollToTopButton.style.opacity = "0";
        setTimeout(() => {
            if (window.scrollY <= 300) {
                scrollToTopButton.style.display = "none";
            }
        }, 300);
    }
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
}

window.addEventListener("scroll", toggleScrollToTopButton);
scrollToTopButton.addEventListener("click", scrollToTop);

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            target.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    });
});

// Form validation
const contactForm = document.getElementById("contact-form");

contactForm?.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !message) {
        showNotification("Please fill in all fields", "error");
        return;
    }

    if (!isValidEmail(email)) {
        showNotification("Please enter a valid email address", "error");
        return;
    }

    // Here you would typically send the form data to a server
    showNotification(
        "Thank you for your message! I will get back to you soon.",
        "success"
    );
    contactForm.reset();
});

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type) {
    const notification = document.createElement("div");
    notification.className = `notification ${type}`;
    notification.textContent = message;

    document.body.appendChild(notification);

    // Trigger animation
    setTimeout(() => notification.classList.add("show"), 10);

    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.classList.remove("show");
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}
