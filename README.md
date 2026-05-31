# Julia Wang

A dependency-free personal website built with HTML, CSS, and a small JavaScript theme toggle.

## Hosted site

This site is configured to deploy with GitHub Pages after changes are merged to `main`.

Expected GitHub Pages URL:

```text
https://onethousanddollarbeef.github.io/juliawang/
```

The site uses relative asset paths, so it can also run behind a custom domain.

## Custom domain

To use your own domain:

1. In GitHub, open **Settings > Pages** for this repository.
2. Set the custom domain, such as `www.yourdomain.com`.
3. Add the DNS records GitHub shows for that domain.
4. If you want the domain stored in the repository, add a `CNAME` file at the project root with only the domain name inside.

## Local preview

Open `index.html` directly in a browser, or serve the folder with any static file server:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.
