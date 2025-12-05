# Emak Yapı Marketing Website

Modern marketing website for Emak Yapı, a construction materials company in Turkey.

## Tech Stack

- **Astro** - Static site generator
- **Vue 3** - Component framework
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Component library (via Radix Vue)

## Features

- 🎥 Hero section with video background
- 📱 Fully responsive design
- 🎨 Modern UI with Tailwind CSS
- 🇹🇷 Turkish language content
- ⚡ Fast and optimized performance

## Getting Started

### Install Dependencies

```bash
npm install
```

### Development

```bash
npm run dev
```

Visit `http://localhost:4321` to see your site.

### Build

```bash
npm run build
```

### Preview

```bash
npm run preview
```

## Project Structure

```
/
├── public/
│   └── emak_hero_video.mp4    # Hero background video
├── src/
│   ├── components/             # Vue components
│   │   ├── Hero.vue           # Hero section with video
│   │   ├── Navbar.vue         # Navigation bar
│   │   ├── About.vue          # About section
│   │   ├── Products.vue       # Products showcase
│   │   ├── Services.vue       # Services section
│   │   ├── Contact.vue        # Contact form
│   │   └── Footer.vue         # Footer
│   ├── layouts/
│   │   └── Layout.astro       # Main layout
│   ├── pages/
│   │   └── index.astro        # Home page
│   ├── styles/
│   │   └── global.css         # Global styles with Tailwind
│   └── lib/
│       └── utils.ts           # Utility functions
└── package.json
```

## Customization

### Update Company Information

Edit the components to update:
- Company name and branding
- Contact information
- Product listings
- Service descriptions

### Styling

The site uses Tailwind CSS with custom CSS variables defined in `src/styles/global.css`. You can customize colors, spacing, and other design tokens there.

## License

All rights reserved © Emak Yapı
