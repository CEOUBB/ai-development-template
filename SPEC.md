# SPEC.md — Pre-Code Functional Contract

> **STATUS:** DRAFT | APPROVED FOR IMPLEMENTATION
> **Approved By:** [Lead Developer / Client Representative]
> **Date:** [YYYY-MM-DD]
> **Rule:** AI agents are STRICTLY FORBIDDEN from generating or modifying application code until this document is reviewed and approved.

---

## 1. Project Overview & Deliverables
<!-- Summarize the client objective, core deliverables, and primary conversion goal -->
- **Client / Initiative:** [Name]
- **Primary Goal:** [e.g. Lead generation, booking system, catalog showcase, institutional portal]
- **Target Deadline / Milestones:** [Date]

---

## 2. Core Data Entities & Schema Models
<!-- Define all database entities and schemas using standard TypeScript / Zod types -->

### 2.1 Site Content & Key-Value Configuration (`site_content`)
```typescript
import { z } from 'zod';

export const SiteContentSchema = z.object({
  key: z.string().min(1),
  section: z.string().min(1), // e.g. 'hero', 'about', 'contact'
  content: z.record(z.unknown()), // Structured JSON payload
  updatedAt: z.date(),
});
```

### 2.2 Domain Entities (e.g. Services, Portfolio, Leads, Testimonials)
```typescript
export const ServiceItemSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1).max(120),
  description: z.string().min(1).max(500),
  icon: z.string().min(1), // Phosphor / Lucide icon name
  imageUrl: z.string().url().optional(),
  order: z.number().int().default(0),
  isVisible: z.boolean().default(true),
});

export const ContactMessageSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().max(20).optional(),
  message: z.string().min(10).max(2000),
  status: z.enum(['unread', 'contacted', 'archived']).default('unread'),
  createdAt: z.date(),
});
```

---

## 3. API Contracts & Boundary Validation

| Endpoint / Action | Method | Input Schema (Zod) | Success Response | Auth Level |
| :--- | :--- | :--- | :--- | :--- |
| `/api/contact` | POST | `ContactMessageSchema.omit({ id: true, status: true, createdAt: true })` | `{ "success": true }` | Public (Rate-limited) |
| `/api/admin/content` | PUT | `z.object({ key: z.string(), content: z.record(z.unknown()) })` | `{ "updated": true }` | Admin Session |
| `/api/admin/services` | POST | `ServiceItemSchema.omit({ id: true })` | `{ "id": string }` | Admin Session |

---

## 4. View-to-Data Mapping & Admin CMS Capabilities

| Public Page / Section | Consumed Entity / Key | Editable via Admin CMS? | Admin Field Types |
| :--- | :--- | :--- | :--- |
| **Landing Hero** | `site_content:hero` | Yes | Headline (text), Subheadline (textarea), CTA Text (text), Hero Image (file upload) |
| **Services Grid** | `services` table | Yes | Add/Edit/Delete cards, toggle `isVisible`, drag-and-drop reorder |
| **Contact Form** | Dispatches to `contact_messages` | Read-only in Admin | Inbox list, mark as read/contacted, export CSV |

---

## 5. Security, Media Storage & Performance Constraints
- **File Uploads:** Max 5MB per image, compressed to WebP, stored in secure bucket (e.g. S3 / R2 / Supabase Storage).
- **Authentication:** Admin route protection (`/admin/*`) via cryptographically signed session cookies.
- **Lighthouse Targets:** Performance $\ge 90$, Accessibility $\ge 95$, Best Practices $\ge 95$, SEO $\ge 95$.
