// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Hamburger menu
const hamburger = document.getElementById('hamburger');
const navMobile = document.getElementById('nav-mobile');
hamburger.addEventListener('click', () => {
    navMobile.classList.toggle('open');
});

// Close mobile menu on link click
navMobile.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navMobile.classList.remove('open'));
});

// Smooth scroll active link
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    sections.forEach(section => {
        const top = section.offsetTop - 90;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
        const link = document.querySelector(`.nav-links a[href="#${id}"]`);
        if (link) {
            if (scrollY >= top && scrollY < top + height) {
                link.style.color = '#F5C518';
            } else {
                link.style.color = '';
            }
        }
    });
});

// Lightbox
const images = Array.from(document.querySelectorAll('.galeria-item img')).map(img => img.src);
let currentIndex = 0;

function openLightbox(src) {
    currentIndex = images.findIndex(s => s.endsWith(src.replace('img/', '')));
    if (currentIndex === -1) currentIndex = 0;
    document.getElementById('lightbox-img').src = images[currentIndex];
    document.getElementById('lightbox').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    document.getElementById('lightbox').classList.remove('active');
    document.body.style.overflow = '';
}

function changeImg(dir) {
    currentIndex = (currentIndex + dir + images.length) % images.length;
    document.getElementById('lightbox-img').src = images[currentIndex];
}

document.addEventListener('keydown', (e) => {
    const lb = document.getElementById('lightbox');
    if (!lb.classList.contains('active')) return;
    if (e.key === 'ArrowRight') changeImg(1);
    if (e.key === 'ArrowLeft') changeImg(-1);
    if (e.key === 'Escape') closeLightbox();
});

// Form submit → redirect to WhatsApp
function sendForm(event) {
    event.preventDefault();
    const form = event.target;
    const nombre = form.querySelector('input[type="text"]').value;
    const telefono = form.querySelector('input[type="tel"]').value;
    const ciudad = form.querySelector('select').value;
    const servicio = form.querySelectorAll('select')[1].value;
    const descripcion = form.querySelector('textarea').value;

    const mensaje = `Hola, soy *${nombre}*.\n\n📞 Teléfono: ${telefono}\n📍 Ciudad: ${ciudad}\n🔧 Servicio: ${servicio}\n\n📝 Proyecto: ${descripcion}`;
    const url = `https://wa.me/573112109398?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
}
