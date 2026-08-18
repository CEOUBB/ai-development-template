---
name: accessibility-wcag
description: WCAG 2.2 Level AA compliance guidelines, keyboard navigation, focus indicators, and screen reader semantics.
---

# Accessibility & WCAG 2.2 Level AA Compliance

## Key Invariants

1. **Perceivable:**
   - Text contrast ratio $\ge 4.5:1$ against background for normal text, $\ge 3:1$ for large text.
   - UI components and graphical objects contrast $\ge 3:1$.
   - Pure images must have descriptive `alt` text; decorative images must have `alt=""` and `aria-hidden="true"`.

2. **Operable:**
   - Full keyboard navigability (`Tab`, `Shift+Tab`, `Enter`, `Space`, Arrow keys).
   - Visible and high-contrast focus rings on `:focus-visible`.
   - Touch targets $\ge 44 \times 44\text{px}$ on mobile/touch interfaces.

3. **Understandable:**
   - Input errors must provide clear error messages and associate via `aria-describedby`.
   - Required fields must specify `aria-required="true"`.

4. **Robust & Reduced Motion:**
   - Wrap animated elements in `prefers-reduced-motion` fallbacks.
   - Dynamic content updates must utilize appropriate `aria-live` regions (`polite` / `assertive`).
