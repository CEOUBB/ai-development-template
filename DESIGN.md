---
name: Enterprise High-Craft Design System
description: Editorial clarity with calibrated OKLCH surfaces, optical typography pairing, and critically damped spring physics.
colors:
  primary: "oklch(0.48 0.18 255)"
  primary-active: "oklch(0.38 0.16 255)"
  navy: "oklch(0.24 0.09 255)"
  primary-wash: "rgba(0, 85, 184, 0.07)"
  canvas: "oklch(0.975 0.005 240)"
  canvas-soft: "oklch(0.975 0.005 240)"
  surface: "#ffffff"
  ink: "oklch(0.2 0.03 260)"
  ink-secondary: "oklch(0.36 0.03 255)"
  ink-muted: "oklch(0.48 0.03 250)"
  hairline: "oklch(0.9 0.012 250)"
  emerald: "oklch(0.7 0.17 155)"
  gold: "oklch(0.75 0.16 75)"
  red: "oklch(0.55 0.22 25)"
typography:
  page-title:
    fontFamily: 'Merriweather, "Iowan Old Style", Georgia, serif'
    fontSize: "clamp(27px, 2.6vw, 36px)"
    fontWeight: 700
    lineHeight: 1.22
    letterSpacing: "-0.035em"
  section-title:
    fontFamily: 'Merriweather, "Iowan Old Style", Georgia, serif'
    fontSize: "21px"
    fontWeight: 700
    lineHeight: 1.35
  body:
    fontFamily: 'Manrope, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.5
  button:
    fontFamily: "Manrope, sans-serif"
    fontSize: "13px"
    fontWeight: 600
  metadata:
    fontFamily: "Manrope, sans-serif"
    fontSize: "12px"
    lineHeight: 1.6
rounded:
  xs: "4px"
  sm: "5px"
  md: "8px"
  lg: "12px"
  xl: "16px"
  full: "9999px"
spacing:
  xxs: "4px"
  xs: "8px"
  sm: "12px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  section: "64px"
---

# Design System & Anti-Slop Governance (`DESIGN.md`)

## 1. Visual Philosophy & Surface Hierarchy

- **Calibrated OKLCH Luminance:** Build hierarchy through subtle surface shifts (`canvas` vs `surface`) and `1px` hairline borders (`oklch(0.9 0.012 250)`), never via heavy drop shadows or glowing neon borders.
- **Single Structural Accent:** Reserve `primary` strictly for primary interactive actions, active navigation states, and focus rings.
- **Tabular Numerals:** Apply `.num` (`font-variant-numeric: tabular-nums lining-nums`) to all tables, metrics, prices, grades, counters, and dates.

## 2. Motion & Accessibility (WCAG 2.2 AA)

- **Spring Physics:** Animate strictly `transform` and `opacity` using critically damped springs (`stiffness: 340, damping: 28, mass: 0.8`) or micro-transitions (`<= 150ms`).
- **Reduced Motion:** Wrap all React motion components in `useReducedMotion()` and respect `@media (prefers-reduced-motion: reduce)`.
- **Touch & Focus Targets:** Minimum `44x44px` interactive hit areas and explicit `2px` focus-visible rings.
