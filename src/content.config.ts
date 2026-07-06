import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const events = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/events' }),
  schema: ({ image }) =>  z.object({
    title:         z.string(),
    date:          z.date(), // YYYY-MM-DD
    end_date:      z.date().optional(),
    location:      z.object({
      venue: z.string(),
      city:  z.string(),
      state: z.string(),
      lat:   z.number().optional(),
      long:  z.number().optional(),
    }),
    status:        z.enum(['open', 'sold_out', 'waitlist', 'planning', 'ended']),
    archived:      z.boolean().optional().default(false),
    hosts:         z.array(z.string()).optional(),
    contact_email: z.email().optional(),
    fee:           z.string().optional(),
    capacity:      z.string().optional(),
    hero_image:    image().optional(),
    hookups:       z.string().optional(),
    cta_button:    z.object({
      label: z.string(),
      url:   z.string(),
    }).optional(),
    links: z.array(z.object({
      label: z.string(),
      url:   z.url(),
      style: z.enum(['primary', 'secondary', 'ghost']).default('secondary'),
    })).optional(),
  }),
});

export const collections = { events };
