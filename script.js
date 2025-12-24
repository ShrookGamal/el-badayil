AOS.init({ duration: 1000, once: true });
var swiper = new Swiper(".mySwiper", {

    slidesPerView: 1,
    spaceBetween: 20,
    loop: true,
    centeredSlides: true,
        autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },
        breakpoints: {
        640: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
        1400: { slidesPerView: 4 }
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    observer: true,
    observeParents: true,
    watchSlidesProgress: true,
});
const canvas = document.getElementById('canvas-bg');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];
const color = "#00bcd4"; 

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 1.5 - 0.75;
        this.speedY = Math.random() * 1.5 - 0.75;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x > canvas.width || this.x < 0) this.speedX = -this.speedX;
        if (this.y > canvas.height || this.y < 0) this.speedY = -this.speedY;
    }

    draw() {
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function init() {
    particlesArray = [];
    let numberOfParticles = (canvas.height * canvas.width) / 9000;
    for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
        for (let j = i; j < particlesArray.length; j++) {
            const dx = particlesArray[i].x - particlesArray[j].x;
            const dy = particlesArray[i].y - particlesArray[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 150) { 
                ctx.strokeStyle = color;
                ctx.lineWidth = 0.5; 
                ctx.globalAlpha = 1 - (distance / 150); 
                ctx.beginPath();
                ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
                ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
                ctx.stroke();
                ctx.closePath();
            }
        }
    }
    ctx.globalAlpha = 1;
    requestAnimationFrame(animate);
}
window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});

init();
animate();
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(a => {
        a.classList.remove('active');
        if (a.getAttribute('href').includes(current)) {
            a.classList.add('active');
        }
    });
});
document.querySelectorAll('.expand-btn').forEach(button => {
    button.addEventListener('click', function() {
        const card = this.parentElement;
            document.querySelectorAll('.service-expand-card').forEach(c => {
            if (c !== card) {
                c.classList.remove('active');
                c.querySelector('.expand-btn').innerText = "اقرأ المزيد";
            }
        });
        card.classList.toggle('active');
        if (card.classList.contains('active')) {
            this.innerText = "إغلاق التفاصيل";
        } else {
            this.innerText = "اقرأ المزيد";
        }
    });
});
const menuBtn = document.getElementById('menu-open');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');
const sideLinks = document.querySelectorAll('.sidebar a');

function toggleMenu() {
    sidebar.classList.toggle('active');
    overlay.classList.toggle('active');
}

if(menuBtn) {
    menuBtn.addEventListener('click', toggleMenu);
}
overlay.addEventListener('click', toggleMenu);
sideLinks.forEach(link => link.addEventListener('click', toggleMenu));
function toggleMenu() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    sidebar.classList.toggle('active');
    overlay.classList.toggle('active');
}
