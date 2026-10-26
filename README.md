# Balaram B. — Full-Stack Developer (PROJECT ABSOLUTE)

A no-build static portfolio: HTML, CSS and vanilla JavaScript. No framework, API key, paid service or backend of your own.

## Files
| File | What it does |
| --- | --- |
| `index.html` | Home: hero, thesis, work cards, engine, experience summary, closing call-to-action |
| `about.html`, `contact.html` | About (skills, experience, resume) and the contact form |
| `semais.html`, `evidence-trace.html`, `auction-room.html`, `vrkshsaathi.html` | One case-study page per project, each with a diagram and an interactive model |
| `privacy.html`, `terms.html`, `cookies.html`, `accessibility.html`, `404.html` | Legal pages and the not-found page (drafts: have them reviewed) |
| `styles.css`, `pages.css` | Base design and inner-page styles |
| `motion.css`, `motion.js` | The motion system (particles, scroll-driven zoom, kinetic type, simulations) |
| `script.js` | Menu and the contact form (with consent check) |
| `Balaram_B_Resume.pdf` | Resume download |
| `favicon.svg`, `robots.txt` | Site basics |

## Run locally
Open `index.html` in a browser, or from this folder run `python -m http.server 8000` and visit `http://localhost:8000`.
Google Fonts load online; the site falls back to system fonts offline.

## Contact form (messages arrive in your inbox)
The form sends through FormSubmit (free, no account) to **ballubalaram2003@gmail.com**.
1. Publish the site (see below).
2. Send yourself one test message from the live site.
3. FormSubmit emails that address once to confirm it. Click the confirmation link.
4. From then on every message arrives as an email, and **Reply** goes to the visitor.

The form only sends from a real web address (GitHub Pages, Vercel, Netlify). Opening `index.html` as a local file may be blocked by the browser; if sending fails, the page shows a direct email link instead.
To change the inbox, edit `RECIPIENT` in `script.js` and the `action` URL of the `<form id="contact-form">` in `index.html`.

## Updating your resume
Replace `Balaram_B_Resume.pdf` with a new file of the same name. The Download and View buttons pick it up automatically.

## Publish free
GitHub Pages: create a public repository, upload every file in this folder to the root, then Settings → Pages → Deploy from a branch → `main` / root.
Vercel or Netlify: drag the folder into their dashboard.

## Before publishing
- VrkshSaathi is shown as a concept project and is not on your resume. Keep it, retitle it or remove it as you prefer.
- The project simulations use sample data and are labelled that way. Keep the labels.
- Test on a real phone, with keyboard navigation, and with reduced-motion turned on (effects switch off).
