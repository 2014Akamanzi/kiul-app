# KIUL Institutional Design System

## Overview
The Katoki Institute for Ubuntu Leadership (KIUL) Design System provides a comprehensive set of design tokens, components, and patterns to ensure visual consistency and brand cohesion across the entire website.

## 📚 Table of Contents
1. [Design Tokens](#design-tokens)
2. [Components](#components)
3. [Layouts](#layouts)
4. [Usage Examples](#usage-examples)
5. [Best Practices](#best-practices)

---

## Design Tokens

### Color Palette

#### Primary Emerald Identity
```css
--kiul-emerald-900: #064e3b  /* Darkest - Headers, Important Text */
--kiul-emerald-800: #065f46  /* Dark - Subheadings */
--kiul-emerald-700: #047857  /* Primary Buttons, Links */
--kiul-emerald-600: #059669  /* Hover States */
--kiul-emerald-500: #10b981  /* Focus Rings, Accents */
--kiul-emerald-200: #a7f3d0  /* Borders, Light Accents */
--kiul-emerald-100: #d1fae5  /* Card Borders, Subtle BG */
--kiul-emerald-50:  #ecfdf5  /* Lightest BG, Tints */
```

#### Neutral Text System
```css
--kiul-text-dark: #1a1a1a     /* Primary Text */
--kiul-text-medium: #4a4a4a   /* Secondary Text */
--kiul-text-light: #6b7280    /* Tertiary Text, Captions */
```

#### Backgrounds
```css
--kiul-bg-main: #faf9f7       /* Main Page Background */
--kiul-bg-soft: #f0fdfa       /* Section Background */
--kiul-card-bg: #ffffff       /* Card Background */
```

#### Borders & Shadows
```css
--kiul-border: #e5ece9
--kiul-shadow-soft: 0 4px 20px rgba(0,0,0,0.06)
--kiul-shadow-md: 0 4px 6px -1px rgba(0,0,0,0.1)
--kiul-shadow-lg: 0 10px 15px -3px rgba(0,0,0,0.1)
```

### Typography

#### Font Families
```css
--font-heading: 'Inter', 'Geist', sans-serif
--font-body: 'Inter', 'Geist', sans-serif
```

#### Font Sizes
```css
--h1-size: 2.5rem    /* 40px */
--h2-size: 2rem      /* 32px */
--h3-size: 1.5rem    /* 24px */
--h4-size: 1.25rem   /* 20px */
--body-size: 1rem    /* 16px */
--small-size: 0.875rem /* 14px */
```

#### Font Weights
```css
--font-weight-bold: 700
--font-weight-semibold: 600
--font-weight-medium: 500
--font-weight-regular: 400
```

### Spacing System
```css
--space-xs: 0.5rem   /* 8px */
--space-sm: 1rem     /* 16px */
--space-md: 1.5rem   /* 24px */
--space-lg: 2rem     /* 32px */
--space-xl: 3rem     /* 48px */
--space-2xl: 4rem    /* 64px */
--space-3xl: 6rem    /* 96px */
```

---

## Components

### Buttons

#### PrimaryButton
```tsx
import { PrimaryButton } from '@/app/components/ui';

<PrimaryButton href="/publishing">
  Explore Publishing
</PrimaryButton>

<PrimaryButton onClick={handleSubmit} type="submit">
  Submit Form
</PrimaryButton>
```

#### SecondaryButton
```tsx
import { SecondaryButton } from '@/app/components/ui';

<SecondaryButton href="/about">
  Learn More
</SecondaryButton>
```

#### TextButton
```tsx
import { TextButton } from '@/app/components/ui';

<TextButton onClick={handleCancel}>
  Cancel
</TextButton>
```

### Cards

#### GenericCard
```tsx
import { GenericCard } from '@/app/components/ui';

<GenericCard hover={true}>
  <h3>Card Title</h3>
  <p>Card content goes here.</p>
</GenericCard>
```

#### FeatureCard
```tsx
import { FeatureCard } from '@/app/components/ui';

<FeatureCard href="/membership">
  <svg>...</svg>
  <h3>Membership</h3>
  <p>Join our community</p>
</FeatureCard>
```

#### PublicationCard
```tsx
import { PublicationCard } from '@/app/components/ui';

<PublicationCard
  title="Ubuntu Leadership in Africa"
  authors="Dr. John Doe, Prof. Jane Smith"
  year="2024"
  abstract="This paper explores..."
  pdfLink="/publications/paper.pdf"
/>
```

#### ProfileCard
```tsx
import { ProfileCard } from '@/app/components/ui';

<ProfileCard
  name="Dr. John Doe"
  title="Senior Researcher"
  bio="Specialist in Ubuntu philosophy..."
  image="/team/john-doe.jpg"
/>
```

### Forms

#### InputField
```tsx
import { InputField } from '@/app/components/ui';

<InputField
  label="Full Name"
  name="fullName"
  value={formData.fullName}
  onChange={handleChange}
  placeholder="Enter your name"
  required={true}
/>
```

#### TextAreaField
```tsx
import { TextAreaField } from '@/app/components/ui';

<TextAreaField
  label="Message"
  name="message"
  value={formData.message}
  onChange={handleChange}
  rows={6}
  required={true}
/>
```

#### SubmitButton
```tsx
import { SubmitButton } from '@/app/components/ui';

<SubmitButton>
  Send Message
</SubmitButton>
```

### Search & Filters

#### SearchBar
```tsx
import { SearchBar } from '@/app/components/ui';

const [searchQuery, setSearchQuery] = useState('');

<SearchBar
  value={searchQuery}
  onChange={setSearchQuery}
  placeholder="Search publications..."
/>
```

#### YearFilter
```tsx
import { YearFilter } from '@/app/components/ui';

const [selectedYear, setSelectedYear] = useState<string | null>(null);

<YearFilter
  years={['2024', '2023', '2022', '2021']}
  selectedYear={selectedYear}
  onChange={setSelectedYear}
/>
```

#### CategoryFilter
```tsx
import { CategoryFilter } from '@/app/components/ui';

<CategoryFilter
  categories={['Leadership', 'Development', 'Ubuntu']}
  selectedCategory={selectedCategory}
  onChange={setSelectedCategory}
/>
```

---

## Layouts

### PageHeader
```tsx
import { PageHeader } from '@/app/components/layouts';

<PageHeader
  title="Publishing Hub"
  subtitle="A continental platform for scholarly work"
  icon={<svg>...</svg>}
/>
```

### StandardPageLayout
```tsx
import { StandardPageLayout } from '@/app/components/layouts';

<StandardPageLayout
  header={<PageHeader title="About KIUL" />}
  sidebar={<Sidebar />}
>
  <p>Main content goes here</p>
</StandardPageLayout>
```

### TwoColumnLayout
```tsx
import { TwoColumnLayout } from '@/app/components/layouts';

<TwoColumnLayout
  header={<PageHeader title="Contact Us" />}
  leftColumn={<ContactInfo />}
  rightColumn={<ContactForm />}
/>
```

### Container
```tsx
import { Container } from '@/app/components/layouts';

<Container size="xl">
  <p>Content constrained to max-width</p>
</Container>
```

### Section
```tsx
import { Section } from '@/app/components/layouts';

<Section background="soft" spacing="lg">
  <h2>Section Title</h2>
  <p>Section content</p>
</Section>
```

---

## Usage Examples

### Complete Contact Page Example
```tsx
"use client";

import { useState } from 'react';
import { TwoColumnLayout, PageHeader } from '@/app/components/layouts';
import { InputField, TextAreaField, SubmitButton } from '@/app/components/ui';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <TwoColumnLayout
      header={<PageHeader title="Contact Us" subtitle="Get in touch with KIUL" />}
      leftColumn={
        <div>
          <h2>Contact Information</h2>
          <p>Email: info.kiul@katokifoundation.org</p>
        </div>
      }
      rightColumn={
        <form>
          <InputField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <InputField
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <TextAreaField
            label="Message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          />
          <SubmitButton>Send Message</SubmitButton>
        </form>
      }
    />
  );
}
```

### Publications Page with Search
```tsx
"use client";

import { useState } from 'react';
import { StandardPageLayout, PageHeader, Container } from '@/app/components/layouts';
import { SearchBar, YearFilter, PublicationCard } from '@/app/components/ui';

export default function PublicationsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedYear, setSelectedYear] = useState<string | null>(null);

  return (
    <StandardPageLayout
      header={<PageHeader title="Publications" subtitle="Browse our research" />}
    >
      <Container size="lg">
        <div className="flex gap-4 mb-8">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search publications..."
            className="flex-1"
          />
          <YearFilter
            years={['2024', '2023', '2022']}
            selectedYear={selectedYear}
            onChange={setSelectedYear}
          />
        </div>

        <PublicationCard
          title="Ubuntu Leadership Principles"
          authors="Dr. Smith, Prof. Jones"
          year="2024"
          abstract="An exploration of Ubuntu leadership..."
          pdfLink="/publications/ubuntu-leadership.pdf"
        />
      </Container>
    </StandardPageLayout>
  );
}
```

---

## Best Practices

### 1. Color Usage
- Use `--kiul-emerald-700` for primary CTAs
- Use `--kiul-emerald-900` for headings
- Use `--kiul-text-dark` for body text
- Use `--kiul-text-medium` for secondary text

### 2. Typography
- Maintain consistent heading hierarchy (h1 → h2 → h3)
- Use `font-bold` for headings
- Use `font-semibold` for emphasis
- Maintain line-height of 1.6 for body text

### 3. Spacing
- Use the spacing scale consistently
- Maintain vertical rhythm with consistent margins
- Use `section-spacing` utility for sections

### 4. Components
- Always import from `@/app/components/ui` or `@/app/components/layouts`
- Use semantic component names
- Leverage component props for customization

### 5. Accessibility
- Always include `aria-labels` for icons
- Maintain proper heading hierarchy
- Use semantic HTML elements
- Ensure sufficient color contrast (WCAG AA)

### 6. Responsive Design
- Mobile-first approach
- Test all breakpoints (sm, md, lg, xl)
- Use Tailwind responsive utilities
- Ensure touch targets are at least 44x44px

---

## File Structure
```
app/
├── components/
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Form.tsx
│   │   ├── Search.tsx
│   │   └── index.ts
│   └── layouts/
│       ├── Layout.tsx
│       └── index.ts
├── styles/
│   └── theme.css
└── globals.css

tailwind.config.ts
```

---

## Support
For questions or contributions to the design system, contact the KIUL development team.

**Version:** 1.0  
**Last Updated:** December 2025
