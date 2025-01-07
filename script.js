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

prevButton.addEventListener("click", prevSlide);
nextButton.addEventListener("click", nextSlide);

// Auto-advance carousel every 5 seconds
setInterval(nextSlide, 5000);

// Scroll to top functionality
const scrollToTopButton = document.getElementById("scroll-to-top");

function toggleScrollToTopButton() {
    if (window.scrollY > 300) {
        scrollToTopButton.style.display = "block";
    } else {
        scrollToTopButton.style.display = "none";
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

// Form validation
const contactForm = document.getElementById("contact-form");

contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !message) {
        alert("Please fill in all fields");
        return;
    }

    if (!isValidEmail(email)) {
        alert("Please enter a valid email address");
        return;
    }

    // Here you would typically send the form data to a server
    alert("Thank you for your message! I will get back to you soon.");
    contactForm.reset();
});

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
