// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { remarkYearsExperience } from './src/plugins/remark-years-experience';

// https://astro.build/config
export default defineConfig({
    site: "https://alexabushady.com/",
    // Candy-theme pages are noindex re-renderings of the same content; keep
    // them out of the sitemap so only the terminal pages reach crawlers.
    integrations: [sitemap({ filter: (page) => !['/ff/', '/resonance/', '/scratch/'].some((p) => page.includes(p)) })],
    markdown: {
        remarkPlugins: [remarkYearsExperience],
    },
});
