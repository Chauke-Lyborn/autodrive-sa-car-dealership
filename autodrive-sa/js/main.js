// AutoDrive SA - Main JavaScript File

// Mobile Navigation Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        
        // Animate hamburger to X
        const spans = hamburger.querySelectorAll('span');
        if (navMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
    
    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            const spans = hamburger.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });
}

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Car Category Slider
const sliderWrapper = document.getElementById('sliderWrapper');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const sliderDots = document.getElementById('sliderDots');

if (sliderWrapper) {
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;
    const totalSlides = slides.length;
    
    // Create dots
    if (sliderDots) {
        slides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(index));
            sliderDots.appendChild(dot);
        });
    }
    
    function updateSlider() {
        sliderWrapper.style.transform = `translateX(-${currentSlide * 100}%)`;
        
        // Update dots
        const dots = sliderDots ? sliderDots.querySelectorAll('.dot') : [];
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }
    
    function goToSlide(index) {
        currentSlide = index;
        updateSlider();
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateSlider();
    }
    
    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateSlider();
    }
    
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    
    // Auto-advance slider every 5 seconds
    setInterval(nextSlide, 5000);
}

// Testimonial Slider
const testimonials = document.querySelectorAll('.testimonial');
const testimonialDots = document.getElementById('testimonialDots');

if (testimonials.length > 0) {
    let currentTestimonial = 0;
    
    // Create dots for testimonials
    if (testimonialDots) {
        testimonials.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToTestimonial(index));
            testimonialDots.appendChild(dot);
        });
    }
    
    function updateTestimonials() {
        testimonials.forEach((testimonial, index) => {
            testimonial.classList.toggle('active', index === currentTestimonial);
        });
        
        // Update dots
        const dots = testimonialDots ? testimonialDots.querySelectorAll('.dot') : [];
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentTestimonial);
        });
    }
    
    function goToTestimonial(index) {
        currentTestimonial = index;
        updateTestimonials();
    }
    
    function nextTestimonial() {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        updateTestimonials();
    }
    
    // Auto-advance testimonials every 6 seconds
    setInterval(nextTestimonial, 6000);
}

// Progress Bar Animation (About Page)
const progressBars = document.querySelectorAll('.progress-fill');

if (progressBars.length > 0) {
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('progress-cars')) {
                    setTimeout(() => {
                        entry.target.style.width = '85%';
                    }, 300);
                } else if (entry.target.classList.contains('progress-clients')) {
                    setTimeout(() => {
                        entry.target.style.width = '75%';
                    }, 600);
                }
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    progressBars.forEach(bar => observer.observe(bar));
}

// Contact Form Validation and Submission
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const carModelInput = document.getElementById('carModel');
    const messageInput = document.getElementById('message');
    const successMessage = document.getElementById('successMessage');
    
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const carModelError = document.getElementById('carModelError');
    const messageError = document.getElementById('messageError');
    
    // Real-time validation
    function validateName() {
        const value = nameInput.value.trim();
        if (value.length < 2) {
            nameError.style.display = 'block';
            nameInput.style.borderColor = 'var(--primary-red)';
            return false;
        } else {
            nameError.style.display = 'none';
            nameInput.style.borderColor = 'var(--silver)';
            return true;
        }
    }
    
    function validateEmail() {
        const value = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            emailError.style.display = 'block';
            emailInput.style.borderColor = 'var(--primary-red)';
            return false;
        } else {
            emailError.style.display = 'none';
            emailInput.style.borderColor = 'var(--silver)';
            return true;
        }
    }
    
    function validateCarModel() {
        const value = carModelInput.value;
        if (value === '') {
            carModelError.style.display = 'block';
            carModelInput.style.borderColor = 'var(--primary-red)';
            return false;
        } else {
            carModelError.style.display = 'none';
            carModelInput.style.borderColor = 'var(--silver)';
            return true;
        }
    }
    
    function validateMessage() {
        const value = messageInput.value.trim();
        if (value.length < 10) {
            messageError.textContent = 'Please enter at least 10 characters';
            messageError.style.display = 'block';
            messageInput.style.borderColor = 'var(--primary-red)';
            return false;
        } else {
            messageError.style.display = 'none';
            messageInput.style.borderColor = 'var(--silver)';
            return true;
        }
    }
    
    // Add event listeners for real-time validation
    nameInput.addEventListener('blur', validateName);
    emailInput.addEventListener('blur', validateEmail);
    carModelInput.addEventListener('change', validateCarModel);
    messageInput.addEventListener('blur', validateMessage);
    
    // Form submission
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Validate all fields
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isCarModelValid = validateCarModel();
        const isMessageValid = validateMessage();
        
        if (!isNameValid || !isEmailValid || !isCarModelValid || !isMessageValid) {
            alert('Please fill in all fields correctly before submitting.');
            return;
        }
        
        // Prepare form data
        const formData = {
            name: nameInput.value.trim(),
            email: emailInput.value.trim(),
            carModel: carModelInput.value,
            message: messageInput.value.trim()
        };
        
        // Show success message
        successMessage.style.display = 'block';
        contactForm.reset();
        
        // Show JavaScript alert
        alert('Thank you! Your inquiry has been submitted successfully. Our sales team will contact you soon.');
        
        // Hide success message after 10 seconds
        setTimeout(() => {
            successMessage.style.display = 'none';
        }, 10000);
        
        // Log form data (in real app, this would be sent to server)
        console.log('Form submitted:', formData);
    });
}

// Scroll animations for cards and elements
const animatedElements = document.querySelectorAll('.car-card, .team-card, .info-card, .timeline-item');

if (animatedElements.length > 0) {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 100) {
            navbar.style.backgroundColor = 'rgba(0, 0, 0, 0.98)';
        } else {
            navbar.style.backgroundColor = 'rgba(0, 0, 0, 0.95)';
        }
    }
});

// Add loading animation to images
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', () => {
            img.style.opacity = '1';
        });
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.5s ease';
    });
    
    // Initialize images already loaded
    images.forEach(img => {
        if (img.complete) {
            img.style.opacity = '1';
        }
    });
});