// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { remarkYearsExperience } from './src/plugins/remark-years-experience';

// https://astro.build/config
export default defineConfig({
    site: "https://alexabushady.com/",
    integrations: [sitemap()],
    markdown: {
        remarkPlugins: [remarkYearsExperience],
    },
});
