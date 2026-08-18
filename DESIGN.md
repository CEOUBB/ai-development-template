# DESIGN.md — Visual Design Tokens & High-Craft Governance

> **STATUS:** CANONICAL DESIGN SYSTEM & ANTI-SLOP SPECIFICATION
> Governs visual hierarchy, color spaces, surface elevation, optical typography, animation physics, and accessibility.

---

## 1. Anti-Slop Visual Commandments

Every AI coding agent MUST obey the following visual design constraints:

1. **No Pitch-Black / Flat Black Backgrounds:** Do not use `#000000`, `bg-black`, or `bg-zinc-950` with high-saturation neon accents (`violet-500`, `cyan-400`, `fuchsia-500`). Use warm, multi-stop luminance neutral tokens (`bg-surface-base`, `bg-surface-raised`).
2. **No Saturated Glows or Gradients on Borders:** Do not use `box-shadow: 0 0 50px rgba(139, 92, 246, 0.5)` or continuous rainbow/gradient borders. Use refined micro-borders (`1px solid var(--border-subtle)`) and layered ambient micro-shadows.
3. **No Continuous Text Gradients:** Avoid `bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent` on long paragraphs or subheadings. Reserve subtle gradients strictly for key brand wordmarks when explicitly requested.
4. **No Pulsating Pill Badges:** Do not use pulsing colored dots (`animate-ping`) on badge pills above headlines.
5. **No Decorative Emoji Icons:** Do not use decorative emojis (✨, 🚀, 🔥, ⚡) as UI component icons. Use dedicated icon vectors from a single cohesive icon library.

---

## 2. Color System & Surface Elevation (OKLCH)

We design with perceptually uniform color spaces (OKLCH / CSS Color Module Level 4) for predictable luminance and contrast.

### 2.1 Surface Tokens
```css
:root {
  /* Neutral surfaces (Light mode) */
  --surface-base: oklch(98.5% 0.002 247.8);
  --surface-raised: oklch(100% 0 0);
  --surface-overlay: oklch(96.5% 0.005 247.8);
  --surface-sunken: oklch(94.5% 0.008 247.8);
  --border-subtle: oklch(89.5% 0.008 247.8);
  --border-strong: oklch(78.5% 0.015 247.8);

  /* Content / Foreground */
  --text-primary: oklch(18.5% 0.02 247.8);
  --text-secondary: oklch(42.5% 0.02 247.8);
  --text-tertiary: oklch(62.5% 0.015 247.8);

  /* Primary Brand Accent (Calibrated) */
  --brand-primary: oklch(52.5% 0.18 250);
  --brand-primary-hover: oklch(47.5% 0.18 250);
  --brand-surface: oklch(94% 0.04 250);
}

[data-theme="dark"] {
  /* Neutral surfaces (Dark mode — Warm luminance) */
  --surface-base: oklch(14.5% 0.008 247.8);
  --surface-raised: oklch(18.5% 0.008 247.8);
  --surface-overlay: oklch(22.5% 0.01 247.8);
  --surface-sunken: oklch(11.5% 0.006 247.8);
  --border-subtle: oklch(26.5% 0.01 247.8);
  --border-strong: oklch(36.5% 0.015 247.8);

  /* Content / Foreground */
  --text-primary: oklch(96.5% 0.005 247.8);
  --text-secondary: oklch(74.5% 0.015 247.8);
  --text-tertiary: oklch(54.5% 0.015 247.8);

  /* Primary Brand Accent */
  --brand-primary: oklch(68.5% 0.16 250);
  --brand-primary-hover: oklch(74.5% 0.16 250);
  --brand-surface: oklch(24% 0.06 250);
}
```

---

## 3. Optical Typography & Tabular Numerals

- **Font Pairing:** Use clear typographic hierarchy with appropriate optical sizing, letter-spacing (tracking), and line heights (leading).
- **Tabular Lining Numerals:** All data tables, statistics, counters, financial numbers, dates, and timestamps MUST use tabular figures:
  ```css
  .tabular-nums, .num {
    font-variant-numeric: tabular-nums lining-nums;
  }
  ```

---

## 4. Physics & Spring Animation Tokens

Avoid generic `transition: all 0.3s ease`. Use physically modeled, critically damped springs or exact micro-timings:

| Interaction Type | Timing / Physics | Easing / Formula |
| :--- | :--- | :--- |
| **Micro-hover (Button, Card)** | $120\text{ms}$ | `cubic-bezier(0.16, 1, 0.3, 1)` |
| **Modal / Dialog Entrance** | Spring | `stiffness: 340, damping: 28` (Start from `scale(0.96)`, not `scale(0)`) |
| **Dropdown / Popover** | Spring | `stiffness: 400, damping: 30` |
| **Keyboard Navigation** | $0\text{ms}$ | Instantaneous |

### Reduced Motion Compliance (WCAG 2.2)
All animated components must respect user OS accessibility preferences:
```css
@media (prefers-reduced-motion: reduce) {
  *, ::before, ::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

---

## 5. Touch & Focus Targets (Accessibility)
- **Minimum Interactive Touch Target:** $\ge 44 \times 44\text{px}$ on touch devices.
- **Focus Rings:** Distinct, high-contrast, non-obscured focus rings on `:focus-visible` (`outline: 2px solid var(--brand-primary); outline-offset: 2px;`).
