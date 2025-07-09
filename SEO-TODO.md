# SEO Optimization To-Do List

## Critical Issues (High Priority)

### 3. No structured data ✅
**Status:** Completed  
**Priority:** Critical  
**Implementation:**
- ✅ Added JSON-LD Person schema to MainHead component
- ✅ Added CreativeWork schema to individual project pages
- ✅ Included relevant properties (name, jobTitle, worksFor, etc.)
- ⚠️ Validate with Google's Rich Results Test (pending)

### 4. Limited Open Graph tags ❌
**Status:** Not Started  
**Priority:** Critical  
**Plan:**
- Add og:title, og:image, og:url, og:type to MainHead
- Create default OG image for site
- Add project-specific OG images
- Test with Facebook Sharing Debugger

### 5. No Twitter Card meta tags ❌
**Status:** Not Started  
**Priority:** Critical  
**Plan:**
- Add Twitter Card meta tags (summary_large_image)
- Include twitter:title, twitter:description, twitter:image
- Test with Twitter Card Validator

## Moderate Issues (Medium Priority)

### 6. Generic meta descriptions ❌
**Status:** Not Started  
**Priority:** Medium  
**Plan:**
- Write unique, descriptive meta descriptions for each page
- Ensure descriptions are 150-160 characters
- Include relevant keywords naturally
- Update MainHead component to handle page-specific descriptions

### 7. No canonical URLs ❌
**Status:** Not Started  
**Priority:** Medium  
**Plan:**
- Add canonical link tags to prevent duplicate content
- Use site URL from astro.config.mjs
- Add to MainHead component with dynamic URL generation

### 8. No alt text fallback ❌
**Status:** Not Started  
**Priority:** Medium  
**Plan:**
- Ensure all images have meaningful alt text
- Add fallback alt text for project images
- Review existing img_alt usage in content schema

### 9. No heading hierarchy validation ❌
**Status:** Not Started  
**Priority:** Medium  
**Plan:**
- Audit heading structure across all pages
- Ensure proper h1 > h2 > h3 hierarchy
- Fix any heading gaps or misuse

## Minor Issues (Low Priority)

### 10. Font loading optimization ❌
**Status:** Not Started  
**Priority:** Low  
**Plan:**
- Add font-display: swap to Google Fonts URL
- Consider preloading critical fonts
- Test impact on Core Web Vitals

### 11. No lang attribute specificity ❌
**Status:** Not Started  
**Priority:** Low  
**Plan:**
- Update lang="en" to lang="en-US" in BaseLayout
- Consider adding hreflang if multiple languages planned

## Completed ✅
- Initial SEO audit and issue identification
- SEO tracking system setup
- Missing robots.txt (✅ Created in public/robots.txt)
- Missing sitemap.xml (✅ Configured @astrojs/sitemap integration)

## Notes
- Focus on Critical issues first for maximum SEO impact
- Test each change with relevant SEO tools
- Monitor Google Search Console after implementation
- Consider implementing schema markup for better rich snippets