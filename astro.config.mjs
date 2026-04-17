// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

// https://astro.build/config
export default defineConfig({
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
            name: 'Lora',
            cssVariable: '--font-body',
            weights: [400, 600],
            styles: ['normal', 'italic'],
        },
        {
            provider: fontProviders.fontsource(),
            name: 'Source Sans 3',
            cssVariable: '--font-ui',
            weights: [400, 600],
        },
    ],
});
