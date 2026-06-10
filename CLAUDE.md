# DA International Website

Static brochure site for DA International Interior Design LLC (Dubai + Mecca).
Plain HTML/CSS/JS — no build step, no framework, no dependencies.

Live at **dainternational-id.com**. Deployed via cPanel Git Version Control:
push to GitHub, then the owner manually does Pull/Deploy in cPanel. Pushing
does NOT make changes live.

## Files

- `index.html` — homepage (hero with logo, signature intro overlay, featured projects)
- `about.html`, `services.html`, `projects.html`, `contact.html` — inner pages
- `style.css` — ALL styles for every page, organized in commented sections
- `script.js` — shared layout + behavior for every page (see below)
- `photos/` — all images, plus `logo.svg`, `logo-light.svg` (cream variant), `favicon.svg`
- `da-international-photos/`, `*.zip`, `*.pdf` — local-only source material, gitignored

## Shared layout (edit once, applies everywhere)

The top nav bar and footer for ALL pages live in **`script.js`** as template
strings (`NAV_HTML`, `FOOTER_HTML`). Each page only contains empty shells:

```html
<nav><!-- filled in by script.js --></nav>
<footer class="footer"><!-- filled in by script.js --></footer>
```

To change a nav link, phone number, email, or footer text: edit `script.js`
only — never the HTML pages. The footer copyright year is computed from the
current date automatically. `script.js` also owns the scroll-reveal animation,
active-nav-link highlight, and mobile hamburger menu.

Still duplicated per page (small, rarely changes): the `<head>` block
(fonts, favicon, stylesheet/script links) and per-page `<title>`.

## Conventions

- Reusable CSS system: `.section` + `--light/--grey/--dark`, `.section-heading`
  (script-over-serif, `--center`), `.container`, `.split`, `.cards`, `.gallery`,
  `.reveal` (fades in on scroll — add it to new content blocks).
- Fonts: Cormorant Garamond (serif) + Pinyon Script (script) via Google Fonts.
- Images: `loading="lazy"` on everything below the fold.

## Gotchas

- **`body > nav` scoping is load-bearing**: the footer contains its own
  `<nav>`. Top-bar CSS must stay scoped to `body > nav` or the footer grows a
  white sticky-bar ("white box" bug, fixed in 4002789).
- **The signature intro script in `index.html` must stay inline** (right after
  the `#intro` div) so it runs before paint. It plays once per session
  (`sessionStorage.introSeen`), is skippable by click, and is disabled under
  `prefers-reduced-motion`. The 33 inlined SVG paths above it belong to the
  intro — don't reformat that block.
- The site requires JavaScript: `.reveal` content stays invisible and
  nav/footer stay empty without it (acceptable, decided deliberately).
- Photo names that don't match their content: `leadership-1` = Mohamed Aboamer
  (CFO), `leadership-2` = Dalia Adel (CEO).

## Owner context

The site owner is a near-beginner learning as they go. Explain changes in
plain language, one step at a time. Work goes live only after they review and
Pull/Deploy in cPanel.
