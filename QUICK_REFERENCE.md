# KIUL Design System - Quick Reference Guide

## 🎨 Color Tokens

### Primary Emerald Scale
```css
--kiul-emerald-900: #064e3b  /* Darkest - Primary Headings */
--kiul-emerald-800: #065f46  /* Dark - Secondary Headings */
--kiul-emerald-700: #047857  /* Standard - Buttons, Icons, Links */
--kiul-emerald-600: #059669  /* Light - Hover States */
--kiul-emerald-500: #10b981  /* Bright - Focus Rings */
--kiul-emerald-200: #a7f3d0  /* Light - Borders */
--kiul-emerald-100: #d1fae5  /* Lighter - Subtle BG */
--kiul-emerald-50:  #ecfdf5  /* Lightest - Notice Boxes */
```

### Text Colors
```css
--kiul-text-dark: #1a1a1a     /* Primary Body Text */
--kiul-text-medium: #4a4a4a   /* Secondary Text */
--kiul-text-light: #6b7280    /* Captions, Meta */
```

### Backgrounds
```css
--kiul-bg-main: #faf9f7   /* Main Page Background */
--kiul-bg-soft: #f0fdfa   /* Section Backgrounds */
--kiul-card-bg: #ffffff   /* Card Backgrounds */
```

### Borders & Shadows
```css
--kiul-border: #e5ece9
--kiul-shadow-soft: 0 4px 20px rgba(0,0,0,0.06)
--kiul-shadow-md: 0 4px 6px -1px rgba(0,0,0,0.1)
--kiul-shadow-lg: 0 10px 15px -3px rgba(0,0,0,0.1)
```

---

## 📏 Spacing Scale

```css
--space-xs:  0.5rem   /* 8px  - Small gaps */
--space-sm:  1rem     /* 16px - Standard padding */
--space-md:  1.5rem   /* 24px - Section spacing */
--space-lg:  2rem     /* 32px - Large padding */
--space-xl:  3rem     /* 48px - Section gaps */
--space-2xl: 4rem     /* 64px - Major sections */
--space-3xl: 6rem     /* 96px - Page sections */
```

---

## 🧩 Component Patterns

### Standard Card
```tsx
<div className="bg-[var(--kiul-card-bg)] 
                border border-[var(--kiul-border)] 
                shadow-[var(--kiul-shadow-soft)] 
                rounded-xl 
                p-[var(--space-lg)] 
                hover:shadow-[var(--kiul-shadow-lg)] 
                hover:border-[var(--kiul-emerald-700)] 
                transition-all duration-300">
  {/* Content */}
</div>
```

### Page Header
```tsx
<section className="w-full bg-[var(--kiul-bg-soft)] 
                    py-[var(--space-2xl)] 
                    px-[var(--space-lg)]">
  <div className="max-w-4xl mx-auto">
    <h1 className="text-4xl font-bold text-[var(--kiul-emerald-900)] 
                   mb-[var(--space-sm)]">
      Page Title
    </h1>
    <p className="text-lg text-[var(--kiul-text-medium)] leading-relaxed">
      Description text
    </p>
  </div>
</section>
```

### Content Section
```tsx
<section className="py-[var(--space-2xl)] px-[var(--space-lg)]">
  <div className="max-w-7xl mx-auto space-y-[var(--space-lg)]">
    {/* Content */}
  </div>
</section>
```

### Primary Button
```tsx
<button className="bg-[var(--kiul-emerald-700)] 
                   text-white 
                   font-semibold 
                   px-8 py-3 
                   rounded-lg 
                   hover:bg-[var(--kiul-emerald-800)] 
                   hover:shadow-[var(--kiul-shadow-lg)] 
                   transition-all duration-300">
  Button Text
</button>
```

### Link with Hover
```tsx
<a href="/path" 
   className="text-[var(--kiul-text-medium)] 
              hover:text-[var(--kiul-emerald-700)] 
              hover:underline 
              transition-all">
  Link Text
</a>
```

### Icon (SVG)
```tsx
<svg className="h-12 w-12 
                text-[var(--kiul-emerald-700)] 
                group-hover:scale-110 
                transition-transform">
  {/* SVG Paths */}
</svg>
```

### Form Input
```tsx
<input 
  type="text"
  className="w-full 
             border border-[var(--kiul-border)] 
             rounded-lg 
             p-3 
             text-[var(--kiul-text-dark)] 
             focus:ring-2 
             focus:ring-[var(--kiul-emerald-500)] 
             focus:outline-none 
             transition-all"
  placeholder="Enter text"
/>
```

---

## 📐 Grid Layouts

### 2-Column
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 gap-[var(--space-lg)]">
  {/* Content */}
</div>
```

### 3-Column
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[var(--space-lg)]">
  {/* Content */}
</div>
```

### 4-Column
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[var(--space-lg)]">
  {/* Content */}
</div>
```

---

## 🎯 Typography Patterns

### H1 - Page Title
```tsx
<h1 className="text-4xl md:text-5xl font-bold text-[var(--kiul-emerald-900)]">
  Page Title
</h1>
```

### H2 - Section Title
```tsx
<h2 className="text-3xl font-bold text-[var(--kiul-emerald-900)] mb-[var(--space-sm)]">
  Section Title
</h2>
```

### H3 - Subsection Title
```tsx
<h3 className="text-2xl font-bold text-[var(--kiul-emerald-800)] mb-[var(--space-sm)]">
  Subsection Title
</h3>
```

### Body Text - Primary
```tsx
<p className="text-[var(--kiul-text-dark)] leading-relaxed">
  Primary body text
</p>
```

### Body Text - Secondary
```tsx
<p className="text-[var(--kiul-text-medium)] leading-relaxed">
  Secondary body text
</p>
```

---

## 🎨 Common Class Combinations

### Card with Hover Effect
```
bg-[var(--kiul-card-bg)] 
border border-[var(--kiul-border)] 
shadow-[var(--kiul-shadow-soft)] 
rounded-xl 
p-[var(--space-lg)] 
hover:shadow-[var(--kiul-shadow-lg)] 
hover:border-[var(--kiul-emerald-700)] 
transition-all duration-300
```

### Centered Container
```
max-w-7xl 
mx-auto 
px-[var(--space-lg)] 
py-[var(--space-2xl)]
```

### Flex Row with Gap
```
flex 
items-center 
gap-[var(--space-sm)]
```

### Flex Column with Gap
```
flex 
flex-col 
gap-[var(--space-md)]
```

### Space Between Children
```
space-y-[var(--space-lg)]
```

---

## 📱 Responsive Breakpoints

- **Mobile:** Default (< 640px)
- **Tablet:** `md:` (≥ 640px)
- **Desktop:** `lg:` (≥ 1024px)
- **Wide:** `xl:` (≥ 1280px)

### Example Usage
```tsx
<div className="text-base md:text-lg lg:text-xl">
  Responsive text
</div>
```

---

## ⚡ Quick Tips

1. **Always use design tokens** instead of hard-coded colors
2. **Maintain spacing consistency** with token scale
3. **Group hover effects** using `group` and `group-hover:`
4. **Transition everything** with `transition-all duration-300`
5. **Round corners** with `rounded-xl` or `rounded-lg`
6. **Shadow hierarchy:** soft (default) → md → lg (hover)

---

## 🚫 What NOT to Do

❌ `bg-emerald-700` → ✅ `bg-[var(--kiul-emerald-700)]`  
❌ `px-4` → ✅ `px-[var(--space-sm)]`  
❌ `text-gray-700` → ✅ `text-[var(--kiul-text-medium)]`  
❌ `shadow-md` → ✅ `shadow-[var(--kiul-shadow-md)]`  
❌ Hard-coded hex colors → ✅ CSS variables  

---

## 📚 Component Library (Available)

Import from: `@/app/components/ui` or `@/app/components/layouts`

### UI Components
- `PrimaryButton`, `SecondaryButton`, `TextButton`
- `GenericCard`, `FeatureCard`, `PublicationCard`, `ProfileCard`
- `InputField`, `TextAreaField`, `SubmitButton`
- `SearchBar`, `YearFilter`, `CategoryFilter`

### Layout Components
- `PageHeader`, `StandardPageLayout`, `TwoColumnLayout`
- `Container`, `Section`

**Example:**
```tsx
import { PrimaryButton, GenericCard } from '@/app/components/ui';
import { PageHeader } from '@/app/components/layouts';
```

---

## 🔗 Useful Links

- **Full Design System:** `/DESIGN_SYSTEM.md`
- **Integration Summary:** `/INTEGRATION_SUMMARY.md`
- **Theme File:** `/app/styles/theme.css`
- **Tailwind Config:** `/tailwind.config.ts`

---

**Last Updated:** December 7, 2025  
**Version:** 1.0
