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

1. Sign up at https://formspree.io and create a form.
2. Copy its ID (the `xxxxxxx` in `formspree.io/f/xxxxxxx`).
3. In `index.html`, replace `YOUR_FORM_ID` in the form's `action`.
4. Each reply is emailed to you and listed in the Formspree dashboard, which can export to CSV.
   The free plan allows 50 submissions a month.

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
