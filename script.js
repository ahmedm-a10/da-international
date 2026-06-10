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
      <a href="tel:+971553099800">DXB +971 55 309 9800</a>
      <a href="tel:+966544513021">KSA +966 54 451 3021</a>
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
