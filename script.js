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
const dotsContainer = document.querySelector(".carousel-dots");

let currentSlide = 0;
const totalSlides = slides.length;

// Create dots
function createDots() {
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement("div");
        dot.classList.add("dot");
        if (i === 0) dot.classList.add("active");
        dot.addEventListener("click", () => {
            goToSlide(i);
            resetCarouselTimer();
        });
        dotsContainer.appendChild(dot);
    }
}

// Update dots
function updateDots() {
    const dots = document.querySelectorAll(".dot");
    dots.forEach((dot, index) => {
        dot.classList.toggle("active", index === currentSlide);
    });
}

// Update carousel
function updateCarousel(smooth = true) {
    if (smooth) {
        carouselContainer.style.transition = "transform 0.5s ease-in-out";
    } else {
        carouselContainer.style.transition = "none";
    }
    carouselContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
    updateDots();
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateCarousel();
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateCarousel();
}

function goToSlide(index) {
    currentSlide = index;
    updateCarousel();
}

// Touch events for mobile swipe
let touchStartX = 0;
let touchEndX = 0;

carouselContainer?.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

carouselContainer?.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            nextSlide();
        } else {
            prevSlide();
        }
        resetCarouselTimer();
    }
}

// Event listeners
prevButton?.addEventListener("click", () => {
    prevSlide();
    resetCarouselTimer();
});

nextButton?.addEventListener("click", () => {
    nextSlide();
    resetCarouselTimer();
});

// Auto-advance carousel
let carouselInterval = setInterval(nextSlide, 5000);

function resetCarouselTimer() {
    clearInterval(carouselInterval);
    carouselInterval = setInterval(nextSlide, 5000);
}

// Pause carousel on hover
carouselContainer?.addEventListener("mouseenter", () => {
    clearInterval(carouselInterval);
});

carouselContainer?.addEventListener("mouseleave", () => {
    carouselInterval = setInterval(nextSlide, 5000);
});

// Initialize carousel
createDots();
updateCarousel(false);

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

function showNotification(message, type) {
    const backgroundColor = type === "success" ? "#28a745" : "#dc3545";

    Toastify({
        text: message,
        duration: 3000,
        gravity: "top",
        position: "right",
        backgroundColor: backgroundColor,
        stopOnFocus: true,
        className: "custom-toast",
        onClick: function () {}, // Callback after click
    }).showToast();
}

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

    // Simulate sending message with loading state
    const submitBtn = this.querySelector(".btn-submit");
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;

    // Simulate API call
    setTimeout(() => {
        showNotification(
            "Thank you for your message! I will get back to you soon.",
            "success"
        );
        contactForm.reset();
        // Reset button state
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }, 1500);
});

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
