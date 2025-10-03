# Al Mustafa Trust Website - Detailed Code Analysis

## 📋 Overview
This document contains a detailed analysis of the original Al Mustafa Trust website saved in the "New folder".

---

## 🎨 **Design System**

### **Color Palette:**
```css
Primary Teal: #009b83 (Main brand color)
Lime Green: #c7d518 / #C8E880 (CTA buttons, accents)
Pink: #ec008c (Orphan sponsorship)
Light Blue: #0098ec (Water projects)
Green: #66cc33 (Food aid)
Red: #C21807 (Emergency appeals)
Orange: #FFA726 (Donate buttons)
Grey: #666, #333 (Text)
Light Grey: #f8f8f8 (Backgrounds)
```

### **Typography:**
```css
Body Font: 'Lato', Arial, sans-serif
  - Weights: 300, 400, 700, 900
  - Size: 18px base

Heading Font: 'Oswald', sans-serif  
  - Weights: 400, 600
  - Style: UPPERCASE, letter-spacing: -1px
  - Sizes: h1 (3.67rem), h2 (2.67rem), h3 (2rem)
```

---

## 🏗️ **HTML Structure**

### **1. Header (.ph - Primary Header)**
```html
<header class="ph i3-widget-scroll-navigation">
  <div class="ph__wrapper">
    <div class="container">
      <div class="grid-table --style-fixed --style-align-top">
        <!-- Logo Cell (221px width) -->
        <div class="grid-table__cell" style="width:221px">
          <div class="ph__logo">
            <!-- Logo with SVG and PNG fallback -->
          </div>
        </div>

        <!-- Center Cell - Navigation -->
        <div class="grid-table__cell">
          <div class="ph__column">
            <!-- Search Box -->
            <div class="i3-ps">
              <!-- Search form -->
            </div>

            <!-- Currency & Language Selectors -->
            <div class="ph__currency-selector">GBP</div>
            <div class="ph__language-selector">EN</div>

            <!-- Secondary Nav -->
            <nav class="ph__secondary-nav">
              <ul>
                <li>Contact Us</li>
                <li>Zakat Calculator</li>
              </ul>
            </nav>

            <!-- Primary Navigation -->
            <nav class="pn">
              <ul>
                <li>Appeals</li>
                <li>Zakat</li>
                <li>Get Involved</li>
                <li>About Us</li>
              </ul>
            </nav>
          </div>
        </div>

        <!-- Right Cell - CTA Box -->
        <div class="grid-table__cell ph__column-right">
          <div class="ph__cta --style-large">
            <small>Call us for information</small>
            <strong>0208 569 6444</strong>
            <button>Donate now</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</header>
```

**Key Header Classes:**
- `.ph` - Primary Header
- `.ph__logo` - Logo container (teal background #009b83)
- `.ph__column` - Center navigation area
- `.ph__cta` - Call-to-action box (lime green #c7d518)
- `.ph__currency-selector` - Currency dropdown
- `.ph__language-selector` - Language selector
- `.ph__secondary-nav` - Top right links
- `.pn` - Primary Navigation
- `.pn__dropdown` - Mega menu dropdowns

---

## 📐 **Layout System**

### **Grid Structure:**
```css
/* Grid Table System */
.grid-table {
  display: table;
  width: 100%;
}

.grid-table__row {
  display: table-row;
}

.grid-table__cell {
  display: table-cell;
  vertical-align: top;
}

/* Grid Block System */
.grid-block {
  overflow: hidden;
}

.grid-block > * {
  float: left;
  box-sizing: border-box;
}

.--type-three-blocks > * {
  width: 33.333%;
}
```

### **Container Widths:**
```css
.container {
  max-width: 1562px;
  margin: 0 auto;
  padding: 0 20px;
}

body {
  max-width: 1920px;
  min-width: 1850px;
  margin: 0 auto;
}
```

---

## 🎯 **Key Components**

### **1. Logo Section**
```css
.ph__logo {
  float: left;
  background-color: #009b83; /* Teal */
  padding: 26px 36px;
}

.ph__logo img {
  width: 100%;
  min-width: 220px;
}
```

### **2. Navigation Mega Menu**
```css
.pn__dropdown {
  background: #FFF;
  position: absolute;
  left: -221px;
  right: -405px;
  top: 100%;
  padding: 20px;
}

.pn__row ul li a {
  font-family: 'Oswald', serif;
  font-size: 36px;
  letter-spacing: -0.01em;
  text-transform: uppercase;
  color: #333;
}
```

### **3. CTA Box**
```css
.ph__cta {
  padding: 20px 30px;
  background-color: #c7d518; /* Lime Green */
  font-size: 22px;
  text-align: center;
  width: 267px;
  height: 165px;
}

.ph__cta strong {
  letter-spacing: 0.08em;
  font-size: 22px;
}
```

### **4. Buttons**
```css
.btn {
  padding: 20px 30px;
  font-size: 16px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  border: 2px solid transparent;
}

.btn.--theme-primary {
  background-color: #009b83; /* Teal */
  color: #FFF;
}

.btn.--theme-secondary {
  background-color: #c8d518; /* Lime Green */
  color: #333;
}

.btn.--style-small {
  font-size: 14px;
  padding: 12px 15px;
}
```

### **5. Icon System**
```css
@font-face {
  font-family: 'default';
  src: url('fonts/default.eot');
  /* Custom icon font */
}

.icon {
  font-family: 'default' !important;
  speak: none;
  font-style: normal;
  font-weight: 400;
  font-variant: normal;
  text-transform: none;
  line-height: 1;
  -webkit-font-smoothing: antialiased;
}

/* Icon Classes */
.icon-chevron-down:before { content: "\e902"; }
.icon-search:before { content: "\e908"; }
.icon-heart:before { content: "\e916"; }
.icon-water:before { content: "\e91c"; }
.icon-orphan:before { content: "\e918"; }
```

---

## 📱 **Responsive Breakpoints**

```css
/* Desktop: 1850px - 1920px (min-max) */
body {
  max-width: 1920px;
  min-width: 1850px;
}

/* Tablet: 860px */
@media screen and (max-width: 860px) {
  /* Navigation arrows visible */
}

/* Mobile: Device specific */
@media only screen and (min-device-width: 768px) 
  and (max-device-width: 1024px) {
  /* iPad specific styles */
}
```

---

## 🎨 **Styling Patterns**

### **Modifier Classes (BEM-like):**
```css
/* Style modifiers use -- prefix */
.--style-large
.--style-medium  
.--style-small
.--style-xsmall
.--style-block
.--style-outline
.--style-two-lines
.--style-fixed

/* Theme modifiers */
.--theme-primary   (teal)
.--theme-secondary (lime green)
.--theme-white

/* Type modifiers */
.--type-three-blocks
.--type-featured
.--type-search
```

### **Utility Classes:**
```css
.offset-bottom-0 { margin-bottom: 0 !important; }
.offset-bottom-2 { margin-bottom: 20px !important; }
.offset-bottom-3 { margin-bottom: 30px !important; }
.offset-bottom-5 { margin-bottom: 50px !important; }

.unstyled { 
  list-style: none; 
  margin-left: 0; 
}

.inline li { 
  display: inline-block; 
  vertical-align: top; 
}

.clear-fix:after { 
  clear: both; 
}
```

---

## 🔍 **JavaScript Features**

### **1. Widget System:**
```javascript
// i3 Framework - Custom widget system
i3.widget.scroll-navigation
i3.donation-overlay
i3.donation-cart
i3.toggle
i3.typeahead
i3.cookies-popover
```

### **2. Scroll Behavior:**
```javascript
// Sticky header at 180px scroll
data-widget-scroll-navigation="offsets:{ '--is-fixed': 180 }"

// Transform/Zoom scaling for responsive
html.scaleType = "zoom" or "transform"
```

### **3. Analytics:**
```javascript
// Google Analytics
ga('create', 'UA-74788235-1', 'auto');

// Facebook Pixel
fbq('init', '3335975433082608');

// Google Tag Manager
GTM-5R9MQ4R

// Mixpanel, Hotjar, Bing UET
```

---

## 📦 **Asset Structure**

```
Al Mustafa Welfare Trust _ A Muslim Charity Changing Lives_files/
├── al-mustafa-logo.png          # Main logo PNG
├── al-mustafa-logo.svg          # Main logo SVG
├── al-mustafa-logo-fixed.png    # Sticky header logo
├── give-your-zakat.png          # Section image
├── zakat-policy.png             # Badge image
├── ef3c7cc4...css               # Main stylesheet
├── mochi.css                    # Additional styles
├── fonts/                       # Icon fonts
├── js/                          # JavaScript files
└── css/                         # Additional CSS
```

---

## 🎯 **Key Observations**

### **Design Philosophy:**
1. **Bold Typography** - Large Oswald headings, UPPERCASE
2. **Bright Colors** - High contrast, accessible
3. **Clear Hierarchy** - Distinct sections, visual weight
4. **Trust Signals** - Phone number prominent, charity info
5. **Action-Oriented** - Multiple CTAs, donation focused

### **Technical Stack:**
1. **Custom Framework** - "i3" JavaScript framework
2. **jQuery** - DOM manipulation
3. **Slick Slider** - Carousels
4. **Google Translate** - Multi-language
5. **Custom Icon Font** - SVG/icon system

### **Performance:**
1. **Lazy Loading** - Images loaded on demand
2. **Minified Assets** - CSS/JS compressed
3. **CDN Usage** - Google Fonts, Font Awesome
4. **Caching** - Browser caching headers
5. **Responsive Images** - Multiple sizes

---

## 📋 **Implementation Checklist**

### ✅ **Already Implemented:**
- [x] Lato and Oswald fonts
- [x] Color scheme (teal, lime green, etc.)
- [x] Basic header structure
- [x] Navigation menu
- [x] Hero section
- [x] Donation cards
- [x] Footer
- [x] Responsive design

### 🔲 **To Improve:**
- [ ] Exact header layout (logo left, nav center, CTA right)
- [ ] Mega menu dropdowns
- [ ] Icon font system
- [ ] CTA box styling (lime green box)
- [ ] Precise spacing and typography
- [ ] Custom cursor/hover states
- [ ] Animation timings
- [ ] SVG decorative elements

---

## 🎨 **CSS Architecture**

### **Naming Convention:**
```
Component__element--modifier

Examples:
.ph              (Primary Header)
.ph__logo       (Header Logo)
.ph__cta        (Header CTA)
.ph__cta--style-large (CTA Modifier)

.pn              (Primary Navigation)
.pn__row        (Nav Row)
.pn__dropdown   (Nav Dropdown)
```

### **Specificity Strategy:**
```css
/* Low specificity - reusable */
.btn { }

/* Medium - component */
.ph__cta { }

/* High - state */
.ph__cta.--style-large { }

/* Overrides - !important used sparingly */
.offset-bottom-0 { margin-bottom: 0 !important; }
```

---

## 📝 **Notes for Perfect Recreation**

1. **Header must use `grid-table` layout** - Not flexbox
2. **Logo background is teal (#009b83)** - Full height
3. **CTA box is lime green (#c7d518)** - Fixed 267px width
4. **Nav uses Oswald 36px** - Very large, bold
5. **Icons are custom font** - Not Font Awesome for nav
6. **Dropdowns are mega menus** - Full width, multi-column
7. **SVG cutouts** - Decorative wave shapes between sections
8. **Sticky behavior** - Header changes at 180px scroll
9. **Currency/Language** - Top right, before nav
10. **Phone number** - Prominently displayed in CTA box

---

## 🔗 **External Dependencies**

```html
<!-- Fonts -->
<link href="https://fonts.googleapis.com/css?family=Lato:300,400,700,900&display=swap">
<link href="https://fonts.googleapis.com/css?family=Oswald:400,600&display=swap">

<!-- No Font Awesome in header - uses custom icon font -->

<!-- jQuery (version not specified, likely 3.x) -->
<!-- Slick Slider -->
<!-- Google Translate Widget -->
<!-- Custom i3 Framework -->
```

---

*Analysis completed on: October 3, 2025*
*Original website: https://www.almustafatrust.org/*
