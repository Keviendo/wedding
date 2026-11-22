# Kevin & Rosie — wedding site

Static one-page site with no build step. Hosted on GitHub Pages.

- `index.html` — all content. Replace everything in `[brackets]`.
- `styles.css` — colors and fonts are at the top in `:root`.
- `rsvp.js` — sends RSVP replies to Formspree.

## Preview locally

```bash
python -m http.server 8124 --directory wedding-site
```

Then open http://localhost:8124.

## RSVP (Formspree)

The form posts to `https://formspree.io/f/mkjrqoba`. Responses are at https://formspree.io/forms/mkjrqoba,
which can export to CSV. Each reply is also emailed to you with a subject like
"RSVP: Jane Doe accepts (2)". The free plan allows 50 submissions a month.

## Custom domain

1. Buy the domain from a registrar such as Cloudflare, Porkbun, or Namecheap.
2. At the registrar's DNS settings, add:

   | Type  | Name  | Value                 |
   |-------|-------|-----------------------|
   | A     | @     | 185.199.108.153       |
   | A     | @     | 185.199.109.153       |
   | A     | @     | 185.199.110.153       |
   | A     | @     | 185.199.111.153       |
   | CNAME | www   | keviendo.github.io    |

3. On GitHub, open the repo's Settings → Pages → Custom domain, enter the domain, and save.
   This adds a `CNAME` file to the repo.
4. Once the DNS check passes (minutes to a few hours), turn on **Enforce HTTPS**.
5. Recommended: verify the domain under your account Settings → Pages so no one else can attach it to their repo.
