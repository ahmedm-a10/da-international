/* ==========================================================================
   DA International — shared site script
   --------------------------------------------------------------------------
   The nav bar and footer for EVERY page live in this one file.
   To change a link, phone number, or email everywhere, edit it here once —
   you never need to touch the individual HTML pages.

   Each page contains an empty <nav></nav> and <footer class="footer"></footer>
   that this script fills in when the page loads.
   ========================================================================== */

/* ----- Top navigation bar (shared by all pages) ----- */
const NAV_HTML = `
  <a class="nav-brand" href="index.html"><img class="nav-brand__img" src="photos/logo.svg" alt="DA International — Interior Design LLC" /></a>
  <button class="nav-toggle" aria-label="Open menu" aria-expanded="false">
    <span></span><span></span><span></span>
  </button>
  <ul>
    <li><a href="index.html">Home</a></li>
    <li><a href="about.html">About</a></li>
    <li><a href="services.html">Services</a></li>
    <li><a href="projects.html">Projects</a></li>
    <li><a href="contact.html">Contact</a></li>
  </ul>
`;

/* ----- Footer (shared by all pages) -----
   The copyright year is filled in automatically from today's date. */
const FOOTER_HTML = `
  <div class="container footer__grid">
    <div class="footer__brand">
      <img class="footer__logo" src="photos/logo-light.svg" alt="DA International Interior Design LLC" />
      <p class="footer__tagline">Turnkey luxury interior design &amp; contracting<br />Dubai · Mecca</p>
    </div>
    <nav class="footer__nav" aria-label="Footer">
      <p class="footer__script">Explore</p>
      <a href="index.html">Home</a>
      <a href="about.html">About</a>
      <a href="services.html">Services</a>
      <a href="projects.html">Projects</a>
      <a href="contact.html">Contact</a>
    </nav>
    <div class="footer__contact-col">
      <p class="footer__script">Contact</p>
      <a href="mailto:info@dainternational-id.com">info@dainternational-id.com</a>
      <a href="tel:+971553099800">+971 55 309 9800</a>
      <span><a class="whatsapp-link" href="https://wa.me/971509808812" target="_blank" rel="noopener">WhatsApp</a> <a href="tel:+971509808812">+971 50 980 8812</a></span>
    </div>
  </div>
  <div class="footer__bottom">
    <p>© ${new Date().getFullYear()} DA International Interior Design LLC</p>
  </div>
`;

/* Insert the shared markup into the empty shells on each page.
   "body > nav" targets only the top bar — the footer contains its own
   <nav> which must NOT be matched (see the white-box gotcha in style.css). */
document.querySelector('body > nav').innerHTML = NAV_HTML;
document.querySelector('footer.footer').innerHTML = FOOTER_HTML;

/* ----- WhatsApp icon: swap every "WhatsApp" text link for the logo -----
   The HTML pages keep the word "WhatsApp" inside the link (so the markup
   stays readable); this replaces it with the icon on load. The aria-label
   keeps the link announced as "Chat on WhatsApp" for screen readers. */
const WHATSAPP_ICON = `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>`;
document.querySelectorAll('a.whatsapp-link').forEach(link => {
  link.setAttribute('aria-label', 'Chat on WhatsApp');
  link.setAttribute('title', 'Chat on WhatsApp');
  link.innerHTML = WHATSAPP_ICON;
});

/* ----- Scroll-reveal: fade sections in the first time they enter view ----- */
const revealObserver = new IntersectionObserver(
  entries => entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('is-visible');
      revealObserver.unobserve(e.target);
    }
  }),
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ----- Highlight the current page's link in the nav ----- */
const page = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('nav ul a').forEach(a => {
  if (a.getAttribute('href') === page) a.classList.add('active');
});

/* ----- Mobile hamburger menu open/close ----- */
const toggle = document.querySelector('.nav-toggle');
const navList = document.querySelector('nav ul');
toggle.addEventListener('click', () => {
  const open = navList.classList.toggle('is-open');
  toggle.setAttribute('aria-expanded', open);
});
document.addEventListener('click', e => {
  if (!e.target.closest('nav') && navList.classList.contains('is-open')) {
    navList.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
  }
});
