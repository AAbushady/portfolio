# SEO Optimization To-Do List

## Minor Issues (Low Priority)

### 4. Font loading optimization ❌
**Status:** Not Started  
**Priority:** Low  

**Step-by-Step Implementation:**

1. **Current Font Loading Analysis**
   - Check MainHead component for font imports
   - Identify which fonts are loaded
   - Measure current loading performance

2. **Add font-display: swap**
   - Update Google Fonts URL:
     ```html
     <!-- Before -->
     <link href="https://fonts.googleapis.com/css2?family=Public+Sans:wght@400;700&display=swap" rel="stylesheet">
     
     <!-- After (ensure display=swap is included) -->
     <link href="https://fonts.googleapis.com/css2?family=Public+Sans:wght@400;700&display=swap" rel="stylesheet">
     ```
   
   - Benefits:
     - Prevents invisible text during font load
     - Shows fallback font immediately
     - Swaps to custom font when ready

3. **Implement Font Preloading**
   - Add preload for critical fonts:
     ```astro
     <!-- In MainHead.astro -->
     <link rel="preconnect" href="https://fonts.googleapis.com">
     <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
     <link rel="preload" 
           href="https://fonts.googleapis.com/css2?family=Public+Sans:wght@400;700&display=swap" 
           as="style"
           onload="this.onload=null;this.rel='stylesheet'">
     ```

4. **Optimize Font Weights**
   - Audit font weight usage:
     ```bash
     # Find all font-weight declarations
     grep -r "font-weight" src/styles/
     ```
   - Load only necessary weights (e.g., 400, 700)
   - Remove unused font weights

5. **Consider Self-Hosting (Advanced)**
   - Download fonts from Google Fonts
   - Convert to WOFF2 format
   - Host locally:
     ```css
     @font-face {
       font-family: 'Public Sans';
       src: url('/fonts/public-sans-400.woff2') format('woff2');
       font-weight: 400;
       font-display: swap;
     }
     ```

6. **Fallback Font Stack**
   - Define system font fallbacks:
     ```css
     :root {
       --font-body: 'Public Sans', -apple-system, BlinkMacSystemFont, 
                    'Segoe UI', Roboto, Arial, sans-serif;
     }
     ```

7. **Testing & Monitoring**
   - Test with Chrome DevTools:
     - Network tab: Check font loading time
     - Performance tab: Measure impact
   - Use Lighthouse for Core Web Vitals:
     - First Contentful Paint (FCP)
     - Cumulative Layout Shift (CLS)
   - Test on slow connections (3G throttling)
   - Verify text remains readable during load

### 5. No lang attribute specificity ❌
**Status:** Not Started  
**Priority:** Low  

**Step-by-Step Implementation:**

1. **Update BaseLayout Component**
   - Location: `src/layouts/BaseLayout.astro`
   - Change from generic to specific:
     ```astro
     <!-- Before -->
     <html lang="en">
     
     <!-- After -->
     <html lang="en-US">
     ```

2. **Why Specificity Matters**
   - Better for screen readers
   - Helps search engines understand target audience
   - Improves browser language detection
   - Format: `language-REGION` (ISO codes)

3. **Common Language Codes**
   - `en-US`: English (United States)
   - `en-GB`: English (United Kingdom)
   - `en-CA`: English (Canada)
   - `en-AU`: English (Australia)

4. **Add Hreflang Tags (If Needed)**
   - Only if planning multilingual content
   - Add to MainHead component:
     ```astro
     <!-- For multilingual sites -->
     <link rel="alternate" hreflang="en-US" href="https://alexabushady.com/" />
     <link rel="alternate" hreflang="es" href="https://alexabushady.com/es/" />
     <link rel="alternate" hreflang="x-default" href="https://alexabushady.com/" />
     ```

5. **Content Language Meta Tag**
   - Add to MainHead for extra clarity:
     ```astro
     <meta http-equiv="content-language" content="en-US">
     ```

6. **Considerations for Future**
   - If adding translations:
     - Create language switcher component
     - Use Astro i18n routing
     - Implement proper hreflang tags
     - Consider subdirectories (/es/) or subdomains

7. **Testing & Validation**
   - Check HTML validator for proper lang attribute
   - Test with screen readers
   - Verify in browser language settings
   - Use Google Search Console to check hreflang (if implemented)

### 6. OG Image Optimization ❌
**Status:** Not Started  
**Priority:** Low  

**Step-by-Step Implementation:**

1. **Create Proper Default OG Image**
   - Design a 1200x630px image specifically for social media sharing
   - Include: Your name, role, and brand colors
   - Save as: `public/assets/og-default.png`
   - Replace current temporary usage of `IMG_0714.JPG`

2. **Design Considerations**
   - Optimal dimensions: 1200x630px (1.91:1 aspect ratio)
   - File size: Under 5MB (ideally under 1MB)
   - Format: PNG or JPG (avoid SVG for social media)
   - Text should be readable at small sizes
   - Include professional headshot if desired

3. **Create Project-Specific OG Images**
   - For each project, create or optimize images to 1200x630px
   - Ensure consistent branding across all project images
   - Include project title and brief description overlay

4. **Testing & Validation**
   - Test with [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
   - Test with [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)
   - Verify images display correctly at various sizes
   - Check loading speed and optimization

## Completed ✅
- **Initial SEO audit and issue identification**
- **SEO tracking system setup**
- **Missing robots.txt** - Created in public/robots.txt
- **Missing sitemap.xml** - Configured @astrojs/sitemap integration
- **No structured data** - Added JSON-LD Person and CreativeWork schemas
- **Limited Open Graph tags** - Added complete OG meta tags to MainHead component
- **Generic meta descriptions** - Updated all page descriptions to 100+ characters
- **No canonical URLs** - Added canonical link tags to prevent duplicate content
- **No Twitter Card meta tags** - Added Twitter Card meta tags with dynamic configuration in MainHead component
- **No alt text fallback** - Added fallback alt text to content schema and components, ensuring all images have descriptive alt text
- **No heading hierarchy validation** - Verified proper heading structure across all pages with single H1 and logical hierarchy

## Notes
- Focus on Critical issues first for maximum SEO impact
- Test each change with relevant SEO tools
- Monitor Google Search Console after implementation
- Consider implementing schema markup for better rich snippets