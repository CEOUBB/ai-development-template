---
name: frontend-craftsmanship
description: High-craft frontend engineering guidelines, visual anti-slop governance, spring animation physics, and typography.
---

# Frontend Craftsmanship & High-Design Governance

## Core Philosophy
Great software interfaces feel tactile, fast, and calm. Avoid decorative fluff, neon glows, and AI-generated design clichés.

---

## 1. Surface Architecture
- **Layered Neutrals:** Never use `#000000` or raw zinc-950 as a flat background. Use multi-stop OKLCH neutral surfaces (`bg-surface-base`, `bg-surface-raised`, `bg-surface-overlay`).
- **Micro-Borders:** Separate surfaces with subtle 1px borders (`border-subtle`).
- **Shadows:** Use low-opacity, layered ambient shadows rather than saturated neon glows.

---

## 2. Dynamic Physics & Motion
- **Springs over Easing:** Use critically damped spring physics for dialogs, popovers, and drawers (`stiffness: 340, damping: 28`).
- **Modal Scale Origins:** Never scale modals from `scale(0)`. Start entrances subtly from `scale(0.96)` or subtle 4px $y$-translation.
- **Immediate Keyboard Feedback:** Keyboard navigation and shortcuts must activate instantly ($0\text{ms}$).

---

## 3. Data & Typography
- **Tabular Figures:** Always use `font-variant-numeric: tabular-nums lining-nums` for tables, prices, scores, dates, and counters.
- **Hierarchy:** Maintain clear visual contrast between title, body, and caption text through scale and opacity.
