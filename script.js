// 1. Initialize AOS Animations
AOS.init({ duration: 1000, once: true });

// 2. 3D Coverflow Slider for Works
// تشغيل السليدر المطور للمشاريع الكثيرة
var swiper = new Swiper(".mySwiper", {
    // إعدادات العرض
    slidesPerView: 1,
    spaceBetween: 20,
    loop: true,
    centeredSlides: true,
    
    // التشغيل التلقائي (مهم للعدد الكبير)
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },

    // استجابة الشاشات (Responsive)
    breakpoints: {
        640: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
        1400: { slidesPerView: 4 }
    },

    // تأثيرات حركية
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },

    // تحسين الأداء للصور الكثيرة
    observer: true,
    observeParents: true,
    watchSlidesProgress: true,
});

// 3. Hero Background Particles
const canvas = document.getElementById('canvas-bg');
if(canvas) {
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particlesArray = [];
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 1;
            this.speedX = Math.random() * 2 - 1;
            this.speedY = Math.random() * 2 - 1;
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.size > 0.2) this.size -= 0.01;
        }
        draw() {
            ctx.fillStyle = 'rgba(255,255,255,0.5)';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function initParticles() {
        for (let i = 0; i < 100; i++) {
            particlesArray.push(new Particle());
        }
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
            particlesArray[i].draw();
            if (particlesArray[i].size <= 0.2) {
                particlesArray.splice(i, 1);
                i--;
                particlesArray.push(new Particle());
            }
        }
        requestAnimationFrame(animateParticles);
    }
    initParticles();
    animateParticles();
}

// 4. Navbar Active State Management
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
// --- التحكم في توسيع كروت الخدمات ---
document.querySelectorAll('.expand-btn').forEach(button => {
    button.addEventListener('click', function() {
        const card = this.parentElement;
        
        // إغلاق أي كارد آخر مفتوح حالياً (اختياري لجعل الموقع أنظف)
        document.querySelectorAll('.service-expand-card').forEach(c => {
            if (c !== card) {
                c.classList.remove('active');
                c.querySelector('.expand-btn').innerText = "اقرأ المزيد";
            }
        });

        // تبديل حالة الكارد المختار
        card.classList.toggle('active');

        // تغيير نص الزر بناءً على الحالة
        if (card.classList.contains('active')) {
            this.innerText = "إغلاق التفاصيل";
        } else {
            this.innerText = "اقرأ المزيد";
        }
    });
});
