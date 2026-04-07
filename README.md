# Personal portfolio website

A minimal, responsive portfolio built with **React**, **Vite**, **Tailwind CSS v4**, and **Framer Motion**.

## Folder structure

```
├── index.html              # Entry HTML, SEO meta, theme flash prevention script
├── package.json
├── vite.config.js          # Vite + React + Tailwind plugin
├── public/
│   └── favicon.svg
├── src/
│   ├── main.jsx            # React entry
│   ├── App.jsx             # Layout and section order
│   ├── index.css           # Tailwind import + global styles
│   ├── data/
│   │   └── siteContent.js  # Name, bio, projects, links — edit this to personalize
│   ├── context/
│   │   └── ThemeContext.jsx
│   ├── hooks/
│   │   └── useTypewriter.js
│   └── components/
│       ├── Navbar.jsx
│       ├── Hero.jsx
│       ├── About.jsx
│       ├── Projects.jsx
│       ├── Resume.jsx
│       ├── Contact.jsx
│       ├── Footer.jsx
│       └── FadeIn.jsx
└── README.md
```

## Run locally

1. Install dependencies (once):

   ```bash
   npm install
   ```

2. Start the dev server:

   ```bash
   npm run dev
   ```

3. Open the URL shown in the terminal (usually `http://localhost:5173`).

## Build for production

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Customize

- **Copy and text:** edit `src/data/siteContent.js` (name, titles, bio, skills, projects, timeline, email, social URLs).
- **Page title / meta:** update `index.html` (`<title>` and `meta name="description"`).
- **Styling:** Tailwind classes in components; global tweaks in `src/index.css`.

## Tech stack

- React 19, Vite 8
- Tailwind CSS v4 (`@tailwindcss/vite`)
- Framer Motion (page load, scroll, hover animations)
