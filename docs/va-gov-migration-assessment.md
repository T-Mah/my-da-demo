# VA.gov → Edge Delivery Services Migration Assessment

---

## 1. Site Scope & Scale

Based on a live scan of VA.gov's sitemaps, page structures, and content patterns:

| Category | Estimate |
|---|---|
| **Sitemap URLs (indexed)** | ~2,150+ across 2 sub-sitemaps |
| **Benefit hub pages** | ~12 top-level hubs (Health Care, Disability, Education, Pension, Housing, Life Insurance, Burials, Records, Careers, Service Members, Family, VA Dept Info) |
| **Content detail pages** | ~200-300 (eligibility, how-to, FAQ pages under each hub) |
| **Resource/support articles** | ~75+ (tagged by topic, dynamic loading) |
| **Facility pages (VAMC systems)** | ~170+ VA Medical Center systems, each with ~20-30 sub-pages = ~3,500-5,000 facility pages |
| **Event pages** | ~950+ (dynamically generated, facility-specific) |
| **Forms/applications (React apps)** | ~30-40 multi-step form wizards (10-10EZ, 526EZ, etc.) |
| **Tools/applications** | ~10-15 (Find a Location with map, GI Bill Comparison Tool, Facility Locator, Claim Status Tracker) |
| **Total estimated unique pages** | **~6,000-8,000+** |

### What is NOT Migratable to EDS (Out of Scope)

These are JavaScript-heavy web applications that would need to remain as standalone React apps or be rebuilt separately:

- **Multi-step form wizards** (health care applications, disability claims, education benefits)
- **Facility Locator** (map-based interactive application)
- **GI Bill Comparison Tool** (data-driven application)
- **Claim/Appeal Status Tracker** (authenticated, API-driven)
- **My HealtheVet portal** (separate authenticated application)
- **My VA dashboard** (personalized, authenticated)

**Estimated non-migratable application pages: ~40-50 distinct apps**

These would need custom Edge Delivery blocks or embed strategies, or remain as micro-frontends.

---

## 2. Page Template Taxonomy

7 distinct page templates were identified across the site:

| Template | Count | Complexity | EDS Fit |
|---|---|---|---|
| **Homepage** | 1 | High | Good - hero, cards, search, news blocks |
| **Benefit Hub** | 12 | Medium | Excellent - structured content, link lists |
| **Content Detail** | ~250 | Low-Medium | Excellent - text-heavy, sidebar nav |
| **Resource Article** | ~75 | Low | Excellent - simple content + feedback widget |
| **Facility System** | ~170 systems | Medium-High | Good - location cards, services, stories |
| **Facility Sub-page** | ~3,500+ | Low-Medium | Good - templated content |
| **Event Page** | ~950 | Low | Excellent - structured metadata, simple layout |

### Block Inventory Needed

From the scan, these EDS blocks would be required:

- **Hero** (homepage, with search variant)
- **Cards** (benefit categories, 3-column with icons)
- **Link List / Hub Navigation** (benefit hubs, sidebar navigation)
- **Accordion/FAQ** (eligibility pages, expandable sections)
- **Location Card** (facility address, phone, hours)
- **News/Story Teaser** (featured stories with images)
- **CTA Banner** (Crisis Line, account creation prompts)
- **Contact Block** (phone numbers, TTY, messaging links)
- **Breadcrumb** (multi-level hierarchy)
- **Feedback Widget** (page rating component)
- **Email Signup** (newsletter subscription)
- **Table** (rate tables, comparison data)
- **Alert/Banner** (government site banner, service alerts)
- **Search** (site search with category filters)
- **Related Benefits** (cross-linking cards at page bottom)
- **Mega Menu Navigation** (complex multi-column dropdown)

**Estimated: ~20-25 unique blocks, ~40-50 variants**

---

## 3. Accessibility Assessment

This is the **highest-risk dimension** of this migration. VA.gov is a federal government site subject to the strictest accessibility mandates in the United States.

### Regulatory Requirements

| Standard | Requirement | Impact |
|---|---|---|
| **Section 508** | Federal law - mandatory compliance | Every page must pass |
| **WCAG 2.2 Level AA** | VA's stated target | All blocks, all states |
| **21st Century IDEA Act** | Digital modernization mandate | Accessibility + usability |
| **ADA Title II** | Applies to government digital services | Legal liability |

### Current VA.gov Accessibility Features Observed

- Skip-to-content links on every page
- ARIA labels and roles throughout navigation
- Veterans Crisis Line accessible via keyboard
- Focus management on dynamic content
- TTY: 711 support referenced site-wide
- Language assistance in Spanish, Tagalog, and other languages
- 508 compliance page with reporting mechanism
- Alt text on images
- Semantic HTML structure (headings, landmarks, lists)

### Migration Accessibility Risks

| Risk | Severity | Detail |
|---|---|---|
| **Mega menu keyboard navigation** | Critical | Complex dropdown must maintain tab order, arrow key navigation, escape-to-close |
| **Form widget accessibility** | Critical | If any forms are migrated, all ARIA states, error announcements, and focus management must transfer |
| **Dynamic content loading** | High | Current site uses async widget loading - EDS approach must announce content to screen readers |
| **Color contrast in design tokens** | High | VA's blue/white/red palette must maintain 4.5:1 ratios in all EDS CSS |
| **Mobile responsiveness** | High | Must maintain touch targets >= 44x44px |
| **PDF/document accessibility** | Medium | Linked VA forms must remain accessible |
| **Language switching** | Medium | Spanish and Tagalog content must be discoverable by assistive tech |
| **Focus management after navigation** | High | SPA-like interactions need focus reset on page transitions |

### Required Accessibility QA

Every migrated page and block would need:

- Automated testing (axe-core, Lighthouse)
- Manual screen reader testing (JAWS, NVDA, VoiceOver)
- Keyboard-only navigation testing
- High contrast mode testing
- 200% zoom testing
- Mobile assistive technology testing

**This alone represents a significant portion of the migration effort.** For a federal site of this visibility, accessibility failures would be both legally and reputationally damaging.

---

## 4. Wave-Based Migration Plan

### Wave 0: Foundation & Design System

**Scope:** Establish the EDS project, extract design tokens, build core blocks, set up infrastructure.

| Work Item | Size |
|---|---|
| EDS project scaffolding (boilerplate, aem.json, fstab.yaml) | S |
| Design token extraction (colors, typography, spacing from VA Design System - VADS) | L |
| Global styles.css with VA custom properties | M |
| Header/footer/navigation blocks (mega menu) | XL |
| Core blocks: Hero, Cards, CTA Banner, Alert, Breadcrumb | L |
| Accessibility testing framework setup | M |
| Content authoring guidelines documentation | M |
| CI/CD pipeline for preview to live promotion | M |

**Complexity:** High — the VA Design System (VADS) is a comprehensive React-based component library. Extracting it into EDS CSS custom properties and vanilla JS blocks is non-trivial.

### Wave 1: Benefit Hub Pages (Pilot)

**Scope:** Migrate the 12 top-level benefit hub pages as a proof-of-concept.

| Work Item | Pages | Size |
|---|---|---|
| Hub page template (link lists, section nav, contact block) | 12 | M |
| Hub-specific blocks (sidebar nav, related benefits) | - | M |
| Content migration (12 hub pages) | 12 | M |
| Accessibility audit of hub template | - | L |
| Stakeholder review and sign-off | - | M |

**Why start here:** Hub pages are high-traffic, structurally consistent, and provide maximum visibility into the EDS approach without touching complex applications.

### Wave 2: Content Detail Pages

**Scope:** Migrate the ~250 content detail pages under each benefit hub.

| Work Item | Pages | Size |
|---|---|---|
| Content detail template (with sidebar nav, accordion, tables) | ~250 | L |
| Accordion/FAQ block | - | M |
| Table block (rate tables, comparison data) | - | M |
| Feedback widget block | - | S |
| Bulk content migration tooling | - | L |
| Accessibility testing (sampling + automated) | - | L |

### Wave 3: Resource & Support Articles

**Scope:** Migrate ~75+ resource articles.

| Work Item | Pages | Size |
|---|---|---|
| Resource article template | ~75 | M |
| Topic-based browse/filter (may need custom block) | - | M |
| Content migration | ~75 | M |
| Cross-linking and metadata | - | S |

### Wave 4: Facility Pages (Largest Wave)

**Scope:** Migrate ~170 VAMC system pages and their ~3,500+ sub-pages. This is the bulk of the site.

| Work Item | Pages | Size |
|---|---|---|
| Facility system template (location cards, services, stories) | ~170 | L |
| Facility sub-page templates (about, services, programs) | ~3,500 | XL |
| Location card block with structured data | - | M |
| Event page template | ~950 | M |
| Bulk migration scripting (templated content) | - | XL |
| Per-facility content QA | - | XL |
| Accessibility testing (sampling strategy) | - | L |

**Key challenge:** Scale. This wave has the most pages but they are highly templated, making bulk migration scripting essential.

### Wave 5: Homepage & Cross-Cutting Features

**Scope:** Migrate the homepage and implement site-wide features.

| Work Item | Pages | Size |
|---|---|---|
| Homepage migration (hero, search, news, benefit cards) | 1 | XL |
| Site search integration | - | L |
| Email signup block | - | S |
| News/blog integration (news.va.gov) | - | M |
| 404 and error pages | - | S |
| Full site regression testing | - | XL |

### Wave 6: Application Integration

**Scope:** Address the React-based tools and forms — either embed, rebuild, or integrate.

| Work Item | Size |
|---|---|
| Strategy per application (embed vs. rebuild vs. link) | L |
| Facility Locator integration/embed | XL |
| Form application embed strategy | XL |
| Authentication flow integration | XL |
| API gateway and backend service connections | XL |

**This wave has the highest technical risk** and may not be a full migration but rather an integration strategy.

---

## 5. Team Structure

### Core Migration Team

| Role | Count | Responsibility |
|---|---|---|
| **Technical Lead / Architect** | 1 | EDS architecture, block design, integration strategy |
| **EDS Developers** | 3-4 | Block development (JS/CSS), template creation, custom functionality |
| **Content Strategist** | 1-2 | Content mapping, authoring guidelines, information architecture |
| **Content Migration Engineers** | 2-3 | Bulk migration scripting, content transformation, metadata |
| **Accessibility Specialist** | 2 | WCAG/508 testing, remediation guidance, screen reader testing |
| **QA Engineers** | 2 | Visual regression, cross-browser, functional testing |
| **UX Designer** | 1 | Design token mapping, visual fidelity, responsive design |
| **DevOps / Infrastructure** | 1 | CI/CD, preview/live promotion, CDN configuration |
| **Project Manager** | 1 | Sprint planning, stakeholder coordination, risk management |
| **Government Stakeholder Liaison** | 1 | VA approval workflows, compliance review, change management |

**Core team size: 15-19 people**

### Extended / Part-Time Support

| Role | Count | When Needed |
|---|---|---|
| VA Design System (VADS) expert | 1 | Wave 0 - design token extraction |
| React/Application developer | 2-3 | Wave 6 - application integration |
| Security reviewer | 1 | Each wave gate |
| Performance engineer | 1 | Waves 4-5 - scale testing |
| 508 Program Office coordinator | 1 | All waves - compliance sign-off |

---

## 6. Sprint Structure

### Per-Sprint Cadence

| Activity | Description |
|---|---|
| **Sprint Planning** | Scope page batches, assign blocks, identify risks |
| **Development** | Block implementation, content migration, CSS work |
| **Accessibility Check** | Automated axe-core scans on all new pages |
| **Visual QA** | Screenshot comparison against original |
| **Manual A11y Testing** | Screen reader + keyboard testing on sample pages |
| **Stakeholder Demo** | Show migrated pages to VA stakeholders |
| **Retrospective** | Process improvement, velocity tracking |

### Definition of Done (Per Page)

- Content migrated accurately (text, links, images, metadata)
- Visual fidelity matches original (responsive at 3 breakpoints)
- Passes axe-core with zero violations
- Passes manual keyboard navigation
- Passes screen reader testing (JAWS or NVDA)
- Color contrast verified at 4.5:1 minimum
- Performance: Lighthouse score >= 90
- Stakeholder approved
- Preview and live URLs verified

---

## 7. ROI & Value Analysis

### Current State Pain Points (VA.gov)

| Issue | Impact |
|---|---|
| **React-based SSR complexity** | Heavy build pipeline, slow deployments, developer bottleneck |
| **Page weight** | Homepage loads ~2-3MB with JS bundles, analytics, widgets |
| **Content velocity** | Authors cannot make content changes without developer involvement in many areas |
| **Infrastructure cost** | Complex hosting, CDN, and serverless function infrastructure |
| **Performance scores** | Current Lighthouse performance scores are moderate due to JS-heavy architecture |

### Edge Delivery Services Value Proposition

| Benefit | Detail |
|---|---|
| **Lighthouse 100** | EDS consistently achieves perfect Lighthouse scores out of the box |
| **Content velocity** | Authors edit in Google Docs/SharePoint, publish in seconds, no developer needed |
| **Reduced JS payload** | Vanilla JS blocks vs. React framework = dramatically smaller page weight |
| **Edge-delivered** | Global CDN with edge-side includes, sub-second TTFB |
| **Lower infrastructure cost** | No build servers, no SSR infrastructure, no complex deployment pipeline |
| **Simplified developer experience** | Plain HTML/CSS/JS blocks, no framework lock-in |

### Quantifiable Value Areas

**Performance improvement:**

- Current estimated LCP: 2-4 seconds (React hydration + async widget loading)
- EDS target LCP: <1 second
- Impact: Every 100ms improvement in page load correlates with measurable improvements in task completion for government services

**Content authoring efficiency:**

- Current: Content changes require developer PR, review, and deploy cycle
- EDS: Author edits in document, preview, publish (minutes, not days)
- Impact: Faster updates for benefits information, emergency communications, policy changes

**Infrastructure simplification:**

- Eliminates React build pipeline complexity
- Reduces deployment failure risk
- Simplifies content delivery architecture
- Potential for significant hosting cost reduction

**Accessibility:**

- EDS semantic HTML-first approach naturally produces more accessible markup
- Fewer JS-dependent accessibility patterns to maintain
- Simpler testing surface area

### Risk Factors Affecting ROI

| Risk | Impact | Mitigation |
|---|---|---|
| **Application pages cannot migrate** | ~40-50 React apps remain separate | Embed strategy, gradual rewrite |
| **VA stakeholder approval cycles** | Government approval adds overhead | Dedicated liaison, early demos |
| **VADS design system gap** | VA React component library will not transfer 1:1 | CSS-only recreation of visual design |
| **Scale of facility pages** | ~3,500+ pages to migrate | Bulk scripting, templated approach |
| **Accessibility re-certification** | Every page needs 508 re-validation | Automated + sampling strategy |
| **Content freeze coordination** | Cannot have two systems serving same content | Wave-based cutover with redirects |

---

## 8. Migration Sizing Summary

| Dimension | Value |
|---|---|
| **Total pages in scope** | ~5,000-7,000 (content pages, excluding apps) |
| **Pages out of scope (apps)** | ~40-50 distinct applications |
| **Unique templates** | 7 |
| **Custom blocks needed** | ~20-25 blocks, ~40-50 variants |
| **Waves** | 6 (Foundation, Hubs, Detail, Resources, Facilities, Apps) |
| **Core team size** | 15-19 people |
| **Highest risk** | Accessibility compliance, facility page scale, application integration |
| **Highest value** | Performance (LCP), content velocity, infrastructure simplification |

---

## 9. Key Recommendations

1. **Start with a pilot hub** — Migrate one complete benefit hub (e.g., Education) end-to-end before committing to the full site. This validates the approach, surfaces issues early, and gives stakeholders something concrete to evaluate.

2. **Invest heavily in accessibility from day one** — Do not bolt it on later. Every block should be built and tested for 508/WCAG 2.2 AA before being used in content. The legal and reputational risk for a federal site is too high.

3. **Build bulk migration tooling early** — With ~3,500+ facility pages following consistent templates, manual migration is not viable. Invest in import scripts during Wave 0-1 that can process facility pages at scale.

4. **Accept a hybrid architecture** — The React-based forms and tools (claim status, facility locator, GI Bill comparison tool) will likely remain as separate applications embedded within EDS pages. Plan for this from the start rather than trying to migrate everything.

5. **Coordinate with VA Design System (VADS) team** — The VADS team maintains the React component library. Close coordination ensures the EDS CSS blocks accurately represent the approved design system without introducing visual inconsistencies.

6. **Plan content freeze windows per wave** — Each wave needs a content freeze period during cutover to prevent content drift between old and new systems.

---

*Assessment generated from live scan of VA.gov on February 26, 2026.*
