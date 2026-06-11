document.addEventListener('DOMContentLoaded', () => {
  // Initialize all dynamic elements
  initNavbar();
  initTypingEffect();
  initNeuralNetCanvas();
  initScrollReveal();
  initProjectFilters();
  initContactForm();
});

/* --- Navbar Actions --- */
function initNavbar() {
  const header = document.querySelector('header');
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  const links = document.querySelectorAll('.nav-links a');

  // Shrink header on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Update active nav link based on scroll position
    let currentSection = '';
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        currentSection = section.getAttribute('id');
      }
    });

    links.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  });

  // Mobile navigation toggle
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    // Animate hamburger lines
    const spans = hamburger.querySelectorAll('span');
    spans[0].style.transform = navLinks.classList.contains('active') ? 'rotate(45deg) translate(5px, 5px)' : 'none';
    spans[1].style.opacity = navLinks.classList.contains('active') ? '0' : '1';
    spans[2].style.transform = navLinks.classList.contains('active') ? 'rotate(-45deg) translate(5px, -5px)' : 'none';
  });

  // Close mobile nav when clicking a link
  links.forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      const spans = hamburger.querySelectorAll('span');
      spans.forEach(span => span.removeAttribute('style'));
    });
  });
}

/* --- Typing Effect for Hero Subtitle --- */
function initTypingEffect() {
  const words = [
    "Computer Science Student",
    "AIML & Data Science Enthusiast",
    "Passionate Web Developer",
    "Problem Solver"
  ];
  const element = document.getElementById('typing-text');
  if (!element) return;

  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let delay = 100;

  function type() {
    const currentWord = words[wordIndex];
    if (isDeleting) {
      element.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
      delay = 50; // Delete faster
    } else {
      element.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
      delay = 120; // Type standard speed
    }

    if (!isDeleting && charIndex === currentWord.length) {
      // Pause at full word
      delay = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      delay = 500; // Pause before typing next word
    }

    setTimeout(type, delay);
  }

  type();
}

/* --- Interactive Neural Net Background Canvas --- */
function initNeuralNetCanvas() {
  const canvas = document.getElementById('neural-net-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  const particles = [];
  const properties = {
    bgColor: 'rgba(6, 8, 15, 1)',
    particleColor: 'rgba(146, 239, 253, 0.45)',
    lineColor: 'rgba(78, 101, 255, 0.08)',
    particleRadius: 2.5,
    particleCount: calculateCount(),
    maxVelocity: 0.5,
    lineLength: 150,
  };

  function calculateCount() {
    // Fewer particles on mobile for performance
    return window.innerWidth < 768 ? 40 : 90;
  }

  // Mouse coords
  let mouse = { x: null, y: null };

  window.addEventListener('mousemove', e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('mouseout', () => {
    mouse.x = null;
    mouse.y = null;
  });

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    properties.particleCount = calculateCount();
    initParticles();
  });

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.velocityX = (Math.random() - 0.5) * properties.maxVelocity;
      this.velocityY = (Math.random() - 0.5) * properties.maxVelocity;
    }

    position() {
      // Bounce off walls
      if (this.x + this.velocityX > width || this.x + this.velocityX < 0) {
        this.velocityX = -this.velocityX;
      }
      if (this.y + this.velocityY > height || this.y + this.velocityY < 0) {
        this.velocityY = -this.velocityY;
      }

      this.x += this.velocityX;
      this.y += this.velocityY;
    }

    reDraw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, properties.particleRadius, 0, Math.PI * 2);
      ctx.closePath();
      ctx.fillStyle = properties.particleColor;
      ctx.fill();
    }
  }

  function initParticles() {
    particles.length = 0;
    for (let i = 0; i < properties.particleCount; i++) {
      particles.push(new Particle());
    }
  }

  function drawLines() {
    let x1, y1, x2, y2, distance, opacity;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        x1 = particles[i].x;
        y1 = particles[i].y;
        x2 = particles[j].x;
        y2 = particles[j].y;
        distance = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);

        if (distance < properties.lineLength) {
          opacity = 1 - distance / properties.lineLength;
          ctx.strokeStyle = `rgba(78, 101, 255, ${opacity * 0.12})`;
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.closePath();
          ctx.stroke();
        }
      }

      // Draw line to mouse
      if (mouse.x !== null && mouse.y !== null) {
        x1 = particles[i].x;
        y1 = particles[i].y;
        distance = Math.sqrt((mouse.x - x1) ** 2 + (mouse.y - y1) ** 2);
        if (distance < properties.lineLength * 1.2) {
          opacity = 1 - distance / (properties.lineLength * 1.2);
          ctx.strokeStyle = `rgba(146, 239, 253, ${opacity * 0.22})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.closePath();
          ctx.stroke();
        }
      }
    }
  }

  function loop() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      particles[i].position();
      particles[i].reDraw();
    }

    drawLines();
    requestAnimationFrame(loop);
  }

  initParticles();
  loop();
}

/* --- Scroll Reveal Animation --- */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          // Once animated, we don't need to observe it again
          observer.unobserve(entry.target);
        }
      });
    },
    {
      root: null,
      threshold: 0.12, // Trigger when 12% visible
    }
  );

  reveals.forEach(reveal => {
    revealObserver.observe(reveal);
  });
}

/* --- Project Category Filters --- */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.projects-grid .glass-card');

  if (filterBtns.length === 0) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle active button style
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          // Fade/slide back in
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0) scale(1)';
          }, 50);
        } else {
          // Transition out
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px) scale(0.95)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });
}

/* --- Contact Form Simulation --- */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const statusElement = document.getElementById('form-status');

  if (!form) return;

  form.addEventListener('submit', async event => {
    event.preventDefault();
    const submitBtn = form.querySelector('.submit-btn');
    const originalBtnHTML = submitBtn.innerHTML;

    // Change button text to loading state
    submitBtn.innerHTML = `<span>Sending...</span>`;
    submitBtn.disabled = true;

    // Simulate Network Request
    setTimeout(() => {
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const message = document.getElementById('message').value;

      if (name && email && message) {
        statusElement.textContent = "Thank you! Your message has been sent successfully.";
        statusElement.className = "form-status success";
        form.reset();
      } else {
        statusElement.textContent = "Error: Please fill in all fields.";
        statusElement.className = "form-status error";
      }

      // Restore button
      submitBtn.innerHTML = originalBtnHTML;
      submitBtn.disabled = false;

      // Hide message after 5 seconds
      setTimeout(() => {
        statusElement.style.display = 'none';
      }, 5000);
    }, 1200);
  });
}
