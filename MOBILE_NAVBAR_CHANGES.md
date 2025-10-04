# Mobile Navbar Changes - Two-Row Layout

## Overview
Updated the mobile navbar (on screens 768px and below) to have a two-row structure as requested.

## Changes Made

### Row 1: Green Background
- **Background Color**: Green (#009B83)
- **Content**: 
  - Logo on the LEFT side
  - DONATE button on the RIGHT side
- **Layout**: Flexbox with `justify-content: space-between`

### Row 2: White Background
- **Background Color**: White
- **Content**: 
  - MENU button (left side)
  - SEARCH button (right side)
- **Layout**: Flexbox with `space-evenly` distribution
- **Separator**: Thin border between the two buttons

## File Changes

### 1. `index.html`
- Restructured the navbar container to have two distinct sections:
  - `.navbar-logo` div containing logo and mobile CTA button
  - `.mobile-nav-row` div containing menu and search buttons
- Added classes to differentiate mobile and desktop CTA buttons:
  - `.navbar-cta-mobile` for mobile donate button
  - `.navbar-cta-desktop` for desktop donate section

### 2. `styles.css`
- Added `.mobile-nav-row` styles (hidden on desktop, visible on mobile)
- Modified `.navbar-logo` styles for mobile to display as a row with space-between
- Updated hamburger menu styles to appear as a full-width button
- Updated search button styles to match the menu button
- Hidden cart icon on mobile view
- Adjusted body padding-top to 110px on mobile to accommodate the two-row navbar
- Added proper show/hide logic for mobile vs desktop CTA buttons

## Mobile Breakpoints

### @media (max-width: 768px)
- Two-row navbar structure activated
- Body padding-top: 110px
- Logo max-width: 100px
- Donate button: Yellow background (#c7d518), compact size

### @media (max-width: 576px)
- Body padding-top: 110px (maintained)
- Logo max-width: 80px (even more compact)

## Visual Structure

```
┌─────────────────────────────────────────┐
│  Row 1: Green (#009B83)                 │
│  ┌──────────┐              ┌─────────┐  │
│  │  LOGO    │              │ DONATE  │  │
│  └──────────┘              └─────────┘  │
└─────────────────────────────────────────┘
┌─────────────────────────────────────────┐
│  Row 2: White                           │
│  ┌──────────────┐  │  ┌──────────────┐  │
│  │    MENU      │  │  │   SEARCH     │  │
│  └──────────────┘  │  └──────────────┘  │
└─────────────────────────────────────────┘
```

## Testing Recommendations

1. **Test on different mobile devices**:
   - iPhone SE (375px width)
   - iPhone 12/13 (390px width)
   - Samsung Galaxy S21 (360px width)
   - iPad Mini (768px width)

2. **Test interactions**:
   - Click MENU button → Should open mobile sidebar
   - Click SEARCH button → Should open search functionality
   - Click DONATE button → Should navigate to donate section
   - Test scrolling behavior

3. **Test responsive breakpoints**:
   - At 769px and above → Desktop navbar
   - At 768px and below → Two-row mobile navbar
   - At 576px and below → Compact two-row mobile navbar

## Browser Compatibility
- Works on all modern browsers (Chrome, Firefox, Safari, Edge)
- Uses flexbox for layout (widely supported)
- No JavaScript changes required for the layout structure
