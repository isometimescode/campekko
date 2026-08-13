import { defineCollection, reference } from 'astro:content';
import { glob, file } from 'astro/loaders';
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
    series:        z.string().optional(), // shared key for related events (e.g. same rally across years, or a numbered event like "camp-ekko"); independent of title/location
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

const schedule = defineCollection({
  loader: file('src/data/schedule.yaml'),
  schema: z.object({
    event:       reference('events'),
    day:         z.enum(['Thursday', 'Friday', 'Saturday']),
    startTime:   z.string(),
    endTime:     z.string().optional(),
    chatBlock:   z.number().min(1).max(4).nullable().default(null),
    title:       z.string(),
    host:        z.string(),
    location:    z.string(),
    categories:  z.array(z.string()).min(1),
    repeatsOn:   z.array(z.object({
      day:       z.enum(['Thursday', 'Friday', 'Saturday']),
      startTime: z.string(),
      location:  z.string(),
    })).default([]),
    description: z.string().optional(),
  }),
});

const vendors = defineCollection({
  loader: file('src/data/vendors.yaml'),
  schema: z.object({
    event:       reference('events'),
    name:        z.string(),
    location:    z.string().optional(), // omitted when not onsite (e.g. a remote sponsor)
    note:        z.string().optional(), // e.g. "Onsite Saturday only"
    description: z.string(),
  }),
});

export const collections = { events, schedule, vendors };
