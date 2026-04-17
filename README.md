# CampEKKO.com

## Adding a new event

1. Add an event file in `src/content/events`.
2. If images for the event are needed, add them in `src/content/events/assets`


## Technical Project Structure

```
campekko/
├── astro.config.mjs          # Astro configuration
├── package.json              # Node.js dependencies and scripts
├── tsconfig.json             # TypeScript configuration
├── public/                   # Static assets served at root
├── src/
│   ├── content.config.ts     # Content collections schema
│   ├── assets/               # Optimized general images and media
│   ├── components/           # Reusable Astro components
│   ├── content/              # Content collections (Markdown)
│   │   └── events/           # Event data files
│   │   └── events/assets/    # Optimized event-specific image files
│   ├── layouts/              # Page layout components
│   ├── pages/                # Route-based pages
│   ├── styles/               # Global stylesheets
│   └── utils/                # Utility functions
```
