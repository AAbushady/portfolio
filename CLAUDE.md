# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is Alex Abushady's portfolio website built with Astro 5. It's a statically generated site showcasing work projects, built for deployment to GitHub Pages at alexabushady.com.

## Development Commands

### Core Development
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run astro` - Run Astro CLI commands

### Deployment
The site automatically deploys to GitHub Pages via GitHub Actions when pushing to the `master` branch.

## Architecture Overview

### Content Management
- **Content Collection**: Uses Astro's content collections with `src/content.config.ts` defining the schema
- **Work Projects**: Stored in `src/content/work/` with subfolders for organization (LLM/, Tools/, Unity/)
- **Content Schema**: Each work item requires: title, description, publishDate, tags, img, img_alt
- **Dynamic Routing**: `src/pages/work/[...slug].astro` generates individual project pages

### Layout System
- **Base Layout**: `src/layouts/BaseLayout.astro` provides the main HTML structure
- **Responsive Backgrounds**: Complex background system with light/dark theme support and lazy-loaded images
- **SEO Integration**: Structured data, Open Graph, and Twitter Card support built into base layout

### Component Architecture
- **Modular Components**: Each component is self-contained with scoped styles
- **Icon System**: `src/components/Icon.astro` with paths defined in `src/components/IconPaths.ts`
- **Theme Support**: Dark/light theme toggle with CSS custom properties
- **Content Rendering**: Uses Astro's `render()` function for markdown content

### Styling Approach
- **Global Styles**: `src/styles/global.css` contains design system variables
- **Scoped Component Styles**: Each .astro component includes its own `<style>` block
- **CSS Custom Properties**: Extensive use of CSS variables for theming and responsive design
- **Background System**: Sophisticated multi-layer background images with blend modes

### Asset Management
- **Static Assets**: Stored in `public/assets/` with organized subfolders
- **Background Images**: Multiple resolutions (800w, 1440w) for responsive serving
- **Project Images**: Referenced in content frontmatter, served from public/assets/

## Content Guidelines

### Adding New Work Projects
1. Create markdown file in `src/content/work/` (use subfolders for organization)
2. Include required frontmatter fields matching the schema in `src/content.config.ts`
3. Add project image to `public/assets/` and reference in frontmatter
4. Use appropriate tags for categorization

### Content Structure
- **Frontmatter**: Must include all required schema fields
- **Image Paths**: Use relative paths starting with `/assets/`
- **Date Format**: Use `publishDate: YYYY-MM-DD HH:MM:SS` format
- **Tags**: Use consistent tagging for filtering (Enterprise, Full-Stack, Unity, Tools, etc.)

## Key Technical Details

### Astro Configuration
- **Site URL**: Configured as `https://alexabushady.com/`
- **Sitemap**: Automatically generated via `@astrojs/sitemap` integration
- **TypeScript**: Uses Astro's strict TypeScript configuration

### SEO & Metadata
- **Structured Data**: Automatic generation of Schema.org CreativeWork markup for projects
- **Meta Tags**: Dynamic title, description, and social media tags
- **Canonical URLs**: Properly configured for SEO

### Performance Optimizations
- **Lazy Loading**: Background images loaded after page load via `.loaded` class
- **Responsive Images**: Multiple resolutions served based on viewport
- **Static Generation**: Full site pre-rendered for optimal performance

## File Organization Patterns

- `src/components/` - Reusable UI components
- `src/content/work/` - Project content organized by category
- `src/layouts/` - Page layout templates
- `src/pages/` - Route definitions and page components
- `src/styles/` - Global CSS and design system
- `public/assets/` - Static assets (images, PDFs, etc.)

## Development Notes

- The project uses ES modules (`"type": "module"` in package.json)
- All components follow Astro's component syntax with frontmatter and template sections
- Content collection schema is strictly typed - ensure new content matches the defined schema
- The site is optimized for GitHub Pages deployment with appropriate base URL configuration