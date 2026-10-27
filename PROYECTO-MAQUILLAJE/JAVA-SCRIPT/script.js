document.documentElement.classList.add('js');
/* INTERACCIONES: menú móvil, filtros, carrusel, avisos y animaciones */
const menuButton = document.querySelector('.menu-button');
const navigation = document.querySelector('.nav');
menuButton.addEventListener('click', () => {
  const open = navigation.classList.toggle('open');
  menuButton.classList.toggle('open', open);
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  navigation.classList.remove('open'); menuButton.classList.remove('open'); menuButton.setAttribute('aria-expanded', 'false');
}));


const catalogo = document.querySelector('#catalogo');
const filterButtons = catalogo
  ? catalogo.querySelectorAll('.filters [data-filter]')
  : [];
const products = catalogo
  ? catalogo.querySelectorAll('.product')
  : [];

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    const categoria = button.dataset.filter;

    // Mostrar la cuadrícula
    catalogo.classList.add('mostrar-productos');

    // Actualizar el botón seleccionado
    filterButtons.forEach(item => item.classList.remove('active'));
    button.classList.add('active');

    // Filtrar las tarjetas
    products.forEach(product => {
      const coincide =
        categoria === 'Todos' ||
        product.dataset.category === categoria;

      product.classList.remove('hidden');
      product.style.display = coincide ? '' : 'none';
      product.classList.add('visible');
    });
  });
});


const slides = [...document.querySelectorAll('.slide')];
let currentSlide = 0;
function showSlide(index) { slides[currentSlide].classList.remove('active'); currentSlide = (index + slides.length) % slides.length; slides[currentSlide].classList.add('active'); }
document.querySelector('#prev-slide').addEventListener('click', () => showSlide(currentSlide - 1));
document.querySelector('#next-slide').addEventListener('click', () => showSlide(currentSlide + 1));

const notice = document.querySelector('.notice');
function showNotice(message) { notice.textContent = message; notice.classList.add('show'); window.setTimeout(() => notice.classList.remove('show'), 2400); }
document.querySelectorAll('.product-link').forEach(button => button.addEventListener('click', () => showNotice(`${button.dataset.product} — próximamente disponible`)));
document.querySelectorAll('.read-more').forEach(button => button.addEventListener('click', () => showNotice('Artículo completo próximamente')));

const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); }), { threshold: .1 });
document.querySelectorAll('.reveal').forEach(element => observer.observe(element));
const backTop = document.querySelector('.back-top');
window.addEventListener('scroll', () => backTop.classList.toggle('visible', window.scrollY > 650), { passive: true });
backTop.addEventListener('click', () => document.querySelector('#inicio').scrollIntoView({ behavior: 'smooth' }));

