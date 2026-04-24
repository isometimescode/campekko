// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
    integrations: [mdx(), sitemap()],
    output: 'static',
    site: 'https://www.campekko.com',
    fonts: [
        {
            provider: fontProviders.fontsource(),
            name: 'Cabin Condensed',
            cssVariable: '--font-display',
            weights: [400, 600, 700],
        },
        {
            provider: fontProviders.fontsource(),
            name: 'Source Sans 3',
            cssVariable: '--font-ui',
            weights: [400, 600],
        },
    ],
});
