# Design System Document: The Galactic Archive

## 1. Overview & Creative North Star: "The Neon Luminary"
This design system is built to transcend the standard "dark mode" portfolio. The Creative North Star is **The Neon Luminary**—an aesthetic that treats the screen as a deep-space viewport where content doesn't just sit on a grid; it glows, floats, and pulses with life. 

To move beyond the "template" look, we employ **intentional asymmetry**. Align large display text to the far left while pushing supportive metadata to the extreme right. Use overlapping elements—such as a project image bleeding off the edge of a card—to create a sense of scale and motion. This system is about "Atmospheric Depth," where the interface feels like a high-tech instrument cluster, sleek and purposeful.

## 2. Colors: Tonal Depth & Radiant Accents
The palette is rooted in deep obsidian tones, punctuated by high-energy violets and cyans.

### The Palette
- **Primary (`#c4c0ff`):** Used for primary actions and glowing highlights.
- **Secondary (`#a2e7ff`):** Used for technical accents, links, and data visualization.
- **Background (`#131318`):** The infinite void. 
- **Surface Tiers:** 
    - `surface_container_lowest` (#0e0e13) for deep background sections.
    - `surface_container_high` (#2a292f) for interactive card states.

### The "No-Line" Rule
Prohibit the use of 1px solid borders to define sections. Content blocks must be separated by shifts in surface temperature. For example, a `surface_container_low` section should transition into a `surface_container_lowest` section to define a boundary. 

### Surface Hierarchy & Nesting
Treat the UI as layered sheets of obsidian glass.
*   **Level 0 (Background):** The base canvas.
*   **Level 1 (Surface Container Low):** The primary content area.
*   **Level 2 (Surface Container High):** Cards or "floating" modules nested within Level 1.

### The "Glass & Gradient" Rule
Floating elements (like the Navigation Bar) must utilize **Glassmorphism**. Use `surface` colors at 60% opacity with a `20px` backdrop-blur. 
*   **Signature Texture:** Apply a linear gradient from `primary` (#c4c0ff) to `primary_container` (#8781ff) at a 135-degree angle for main Call-to-Actions to provide a "metallic glow" effect.

## 3. Typography: The Editorial Edge
We use a high-contrast pairing: **Manrope** for technical authority and **Inter** for functional clarity, with **Space Grotesk** as the "data" typeface.

*   **Display (`manrope`, 3.5rem - 2.25rem):** Set with -2% letter spacing. Use `display-lg` for hero statements. This is the "voice" of the portfolio.
*   **Headline (`manrope`, 2rem - 1.5rem):** Used for section titles. Pair with a `primary` color glow effect on hover.
*   **Title (`inter`, 1.375rem - 1rem):** For card headings and sub-sections. High legibility.
*   **Body (`inter`, 1rem - 0.75rem):** The workhorse. Use `on_surface_variant` (#c7c4d8) for body text to reduce eye strain against the dark background.
*   **Label (`spaceGrotesk`, 0.75rem):** Used for "Metadata" (dates, tags, technical specs). Always uppercase with 5% letter spacing.

## 4. Elevation & Depth: Atmospheric Layering
Traditional shadows are too "heavy" for this system. We use **Tonal Layering** and **Ambient Light**.

*   **The Layering Principle:** To lift a card, move it from `surface_container` to `surface_container_highest`. 
*   **Ambient Shadows:** For "floating" states, use a shadow with a 40px blur, 0px offset, and 6% opacity using the `primary` color (#c4c0ff). This mimics the glow of a screen rather than a physical shadow.
*   **The "Ghost Border" Fallback:** If a container requires definition, use `outline_variant` (#464555) at 15% opacity. This creates a "barely-there" edge that catches the light.
*   **Glassmorphism Depth:** Apply a 1px top-border of `primary_fixed` at 10% opacity to glass elements to simulate a "beveled edge" catching a light source from above.

## 5. Components: High-Tech Primitives

### Navigation (The Glass Hub)
*   **Style:** Fixed position, `surface_container` at 60% opacity, `backdrop-filter: blur(12px)`.
*   **Edge:** Use the "Ghost Border" on the bottom edge only.

### Project Cards
*   **Interaction:** No borders. On hover, transition the background from `surface_container` to `surface_container_high` and apply a `secondary` (#a2e7ff) outer glow.
*   **Separation:** Forbid dividers. Use 48px of vertical whitespace to separate card metadata from the title.

### Animated Skill Bars
*   **Track:** `surface_container_highest`.
*   **Fill:** A gradient from `secondary` (#a2e7ff) to `primary` (#c4c0ff).
*   **Glow:** Add a `drop-shadow` to the fill head to create a "leading spark" effect as the bar animates.

### Glow-Based Contact Form
*   **Inputs:** `surface_container_lowest` background. 
*   **Active State:** When focused, the "Ghost Border" transitions to 100% opacity `primary`, accompanied by a subtle 4px `primary` outer glow.

### Vertical Timeline (The Pulse)
*   **Line:** A 2px wide gradient line (`surface_variant` to `primary` to `surface_variant`).
*   **Nodes:** Use `primary` circles with a pulse animation (infinite scale-out opacity).

## 6. Do's and Don'ts

### Do:
*   **Do** use asymmetrical margins (e.g., 10% left, 20% right) to create a sophisticated, editorial rhythm.
*   **Do** use `secondary_fixed_dim` (#3cd7ff) for technical labels and numbers to make them "pop."
*   **Do** allow images to bleed into the edges of their containers.

### Don't:
*   **Don't** use pure white (#FFFFFF) for text; it causes "halogen halation" on dark backgrounds. Stick to `on_surface` (#e4e1e9).
*   **Don't** use 100% opaque borders. They break the "fluid space" illusion.
*   **Don't** use standard easing. Use `cubic-bezier(0.22, 1, 0.36, 1)` for all transitions to give a "weighted" premium feel.