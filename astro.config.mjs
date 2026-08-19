// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { remarkYearsExperience } from './src/plugins/remark-years-experience';

// https://astro.build/config
export default defineConfig({
    site: "https://alexabushady.com/",
    // FF-theme pages are noindex re-renderings of the same content; keep them
    // out of the sitemap so only the terminal pages are advertised to crawlers.
    integrations: [sitemap({ filter: (page) => !page.includes('/ff/') })],
    markdown: {
        remarkPlugins: [remarkYearsExperience],
    },
});
