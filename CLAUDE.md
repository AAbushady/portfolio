# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a portfolio website built with Astro 5.8.0, showcasing software engineering projects and skills. The site is deployed at https://alexabushady.com/ and features a dark/light theme toggle, responsive design, and content management through Markdown files.

## Development Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run astro` - Run Astro CLI commands

## Architecture

**Framework**: Astro 5.8.0 with TypeScript support
**Content Management**: Astro Content Collections for portfolio projects
**Styling**: Scoped CSS with CSS custom properties for theming
**Deployment**: Static site generation

### Key Directory Structure

- `src/components/` - Reusable Astro components (Hero, Nav, Footer, etc.)
- `src/layouts/` - Base page layout with navigation and theming
- `src/pages/` - Route pages including dynamic work project pages
- `src/content/work/` - Markdown files for portfolio projects with frontmatter
- `src/styles/global.css` - Global styles and CSS custom properties
- `public/assets/` - Static assets including images and PDFs

### Content Collection Schema

The `work` collection (`src/content.config.ts`) defines the schema for portfolio projects:
- `title`: Project title
- `description`: Project description
- `publishDate`: Publication date (used for sorting)
- `tags`: Array of project tags
- `img`: Image path for project preview
- `img_alt`: Optional alt text for images

### Theming System

The site uses CSS custom properties for light/dark theme switching:
- Theme toggle component updates root class (`theme-dark`)
- Background images and colors switch based on theme
- Responsive background images with different sizes for mobile/desktop

### Project Organization

Portfolio projects are organized in subdirectories under `src/content/work/`:
- `LLM/` - Large Language Model projects
- `Tools/` - Development tools and utilities
- Individual project `.md` files for main projects

Projects are automatically sorted by `publishDate` in descending order on the homepage, displaying the 4 most recent projects.