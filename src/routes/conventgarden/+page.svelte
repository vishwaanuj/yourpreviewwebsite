{@html `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Covent Garden Aesthetic Clinic · London</title>

<!-- Fonts -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Jost:wght@300;400;500;600&display=swap" rel="stylesheet" />

<!-- GSAP -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>

<style>
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --cream: #f5f0e8;
    --dark: #1a1612;
    --gold: #b89b6a;
    --gold-light: #d4b98a;
    --muted: #7a6e5f;
    --soft: #e8e0d0;
    --white: #fdfaf4;
    --font-serif: 'Cormorant Garamond', Georgia, serif;
    --font-sans: 'Jost', sans-serif;
  }

  html { scroll-behavior: smooth; }

  body {
    background: var(--cream);
    color: var(--dark);
    font-family: var(--font-sans);
    font-weight: 300;
    overflow-x: hidden;
    cursor: none;
  }

  /* ── Custom cursor ── */
  #cursor {
    width: 10px; height: 10px;
    background: var(--gold);
    border-radius: 50%;
    position: fixed;
    top: 0; left: 0;
    pointer-events: none;
    z-index: 9999;
    transform: translate(-50%, -50%);
    transition: width .25s, height .25s, background .25s;
  }
  #cursor-ring {
    width: 36px; height: 36px;
    border: 1px solid var(--gold);
    border-radius: 50%;
    position: fixed;
    top: 0; left: 0;
    pointer-events: none;
    z-index: 9998;
    transform: translate(-50%, -50%);
    opacity: .6;
  }
  body:has(a:hover) #cursor,
  body:has(button:hover) #cursor { width: 20px; height: 20px; background: var(--gold-light); }

  /* ── Nav ── */
  nav {
    position: fixed; top: 0; left: 0; right: 0;
    z-index: 100;
    display: flex; align-items: center; justify-content: space-between;
    padding: 1.6rem 3.5rem;
    mix-blend-mode: normal;
  }
  .nav-logo {
    font-family: var(--font-serif);
    font-size: 1.1rem;
    font-weight: 400;
    letter-spacing: .18em;
    text-transform: uppercase;
    color: var(--white);
  }
  .nav-links {
    display: flex; gap: 2.8rem;
    list-style: none;
  }
  .nav-links a {
    font-size: .72rem;
    letter-spacing: .22em;
    text-transform: uppercase;
    color: rgba(255,255,255,.8);
    text-decoration: none;
    transition: color .3s;
  }
  .nav-links a:hover { color: var(--gold-light); }
  .nav-cta {
    font-size: .72rem;
    letter-spacing: .18em;
    text-transform: uppercase;
    border: 1px solid rgba(255,255,255,.5);
    color: var(--white);
    background: transparent;
    padding: .6rem 1.4rem;
    cursor: none;
    transition: background .3s, border-color .3s;
    text-decoration: none;
  }
  .nav-cta:hover { background: var(--gold); border-color: var(--gold); }

  /* ── Hero ── */
  #hero {
    position: relative;
    height: 100vh;
    display: flex; align-items: flex-end;
    overflow: hidden;
    background: var(--dark);
  }
  .hero-bg {
    position: absolute; inset: 0;
    background: linear-gradient(135deg, #0d0b09 0%, #2a2016 50%, #1a1209 100%);
  }
  /* Decorative grain */
  .hero-bg::after {
    content: '';
    position: absolute; inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.04'/%3E%3C/svg%3E");
    opacity: .5;
    pointer-events: none;
  }
  /* Golden orb */
  .hero-orb {
    position: absolute;
    width: 55vw; height: 55vw;
    border-radius: 50%;
    top: -10%; right: -15%;
    background: radial-gradient(ellipse at 40% 40%, rgba(184,155,106,.18) 0%, rgba(184,155,106,.06) 50%, transparent 70%);
    pointer-events: none;
  }
  .hero-line {
    position: absolute;
    top: 50%; left: 0; right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(184,155,106,.3), transparent);
  }

  .hero-content {
    position: relative;
    padding: 0 3.5rem 6rem;
    max-width: 860px;
  }
  .hero-eyebrow {
    font-family: var(--font-sans);
    font-size: .68rem;
    letter-spacing: .35em;
    text-transform: uppercase;
    color: var(--gold);
    margin-bottom: 1.8rem;
    opacity: 0;
  }
  .hero-title {
    font-family: var(--font-serif);
    font-size: clamp(3.2rem, 8vw, 7rem);
    font-weight: 300;
    line-height: 1.04;
    color: var(--white);
    opacity: 0;
  }
  .hero-title em {
    font-style: italic;
    color: var(--gold-light);
  }
  .hero-sub {
    margin-top: 2rem;
    font-size: .88rem;
    line-height: 1.8;
    color: rgba(253,250,244,.55);
    max-width: 480px;
    opacity: 0;
  }
  .hero-actions {
    margin-top: 3rem;
    display: flex; gap: 1.4rem; align-items: center;
    opacity: 0;
  }
  .btn-primary {
    background: var(--gold);
    color: var(--dark);
    border: none;
    padding: .95rem 2.4rem;
    font-family: var(--font-sans);
    font-size: .72rem;
    letter-spacing: .2em;
    text-transform: uppercase;
    cursor: none;
    text-decoration: none;
    transition: background .3s;
    display: inline-block;
  }
  .btn-primary:hover { background: var(--gold-light); }
  .btn-ghost {
    color: rgba(253,250,244,.6);
    font-size: .72rem;
    letter-spacing: .2em;
    text-transform: uppercase;
    text-decoration: none;
    border-bottom: 1px solid rgba(253,250,244,.25);
    padding-bottom: 2px;
    transition: color .3s, border-color .3s;
    cursor: none;
  }
  .btn-ghost:hover { color: var(--gold-light); border-color: var(--gold-light); }

  .hero-scroll {
    position: absolute;
    bottom: 2.5rem; right: 3.5rem;
    display: flex; flex-direction: column; align-items: center; gap: .7rem;
    opacity: 0;
  }
  .hero-scroll span {
    font-size: .62rem;
    letter-spacing: .28em;
    text-transform: uppercase;
    color: rgba(253,250,244,.4);
    writing-mode: vertical-rl;
  }
  .scroll-line {
    width: 1px; height: 60px;
    background: linear-gradient(to bottom, var(--gold), transparent);
    animation: scrollPulse 2s ease-in-out infinite;
  }
  @keyframes scrollPulse {
    0%,100% { transform: scaleY(1); opacity:.7; }
    50% { transform: scaleY(.5); opacity:.3; }
  }

  /* ── Section shared ── */
  section { padding: 7rem 3.5rem; }
  .section-label {
    font-size: .65rem;
    letter-spacing: .35em;
    text-transform: uppercase;
    color: var(--gold);
    margin-bottom: 1.2rem;
    display: block;
  }
  .section-title {
    font-family: var(--font-serif);
    font-size: clamp(2rem, 4vw, 3.2rem);
    font-weight: 300;
    line-height: 1.15;
    color: var(--dark);
  }
  .section-title em { font-style: italic; }
  .divider {
    width: 48px; height: 1px;
    background: var(--gold);
    margin: 2rem 0;
  }

  /* ── About ── */
  #about {
    background: var(--white);
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 5rem;
    align-items: center;
  }
  .about-visual {
    position: relative;
    height: 540px;
  }
  .about-card {
    position: absolute;
    background: var(--cream);
    border: 1px solid rgba(184,155,106,.2);
  }
  .about-card-main {
    inset: 0 0 0 0;
    display: flex; align-items: center; justify-content: center;
    overflow: hidden;
  }
  .about-card-main svg { width: 100%; height: 100%; }
  .about-badge {
    position: absolute;
    bottom: -2rem; left: -2rem;
    width: 140px; height: 140px;
    background: var(--dark);
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    gap: .4rem;
  }
  .about-badge .num {
    font-family: var(--font-serif);
    font-size: 2.6rem;
    color: var(--gold);
    line-height: 1;
  }
  .about-badge .lbl {
    font-size: .6rem;
    letter-spacing: .2em;
    text-transform: uppercase;
    color: rgba(253,250,244,.5);
    text-align: center;
    max-width: 90px;
  }
  .about-text p {
    font-size: .92rem;
    line-height: 1.9;
    color: var(--muted);
    margin-bottom: 1.2rem;
  }
  .about-stats {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
    margin-top: 2.5rem;
    padding-top: 2.5rem;
    border-top: 1px solid var(--soft);
  }
  .stat-num {
    font-family: var(--font-serif);
    font-size: 2rem;
    color: var(--gold);
    display: block;
  }
  .stat-lbl {
    font-size: .68rem;
    letter-spacing: .15em;
    text-transform: uppercase;
    color: var(--muted);
    display: block;
    margin-top: .2rem;
  }

  /* ── Services ── */
  #services {
    background: var(--cream);
  }
  .services-header {
    max-width: 600px;
    margin-bottom: 4rem;
  }
  .services-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5px;
    background: rgba(184,155,106,.15);
  }
  .service-card {
    background: var(--white);
    padding: 3rem 2.4rem;
    position: relative;
    overflow: hidden;
    transition: background .4s;
  }
  .service-card::before {
    content: '';
    position: absolute;
    bottom: 0; left: 0;
    width: 0; height: 2px;
    background: var(--gold);
    transition: width .5s ease;
  }
  .service-card:hover::before { width: 100%; }
  .service-card:hover { background: var(--cream); }
  .service-icon {
    width: 48px; height: 48px;
    margin-bottom: 2rem;
  }
  .service-icon circle, .service-icon path, .service-icon line, .service-icon rect {
    stroke: var(--gold);
  }
  .service-num {
    position: absolute;
    top: 1.5rem; right: 1.8rem;
    font-family: var(--font-serif);
    font-size: 4rem;
    color: rgba(184,155,106,.08);
    line-height: 1;
    pointer-events: none;
  }
  .service-name {
    font-family: var(--font-serif);
    font-size: 1.5rem;
    font-weight: 400;
    margin-bottom: .8rem;
    color: var(--dark);
  }
  .service-desc {
    font-size: .84rem;
    line-height: 1.8;
    color: var(--muted);
  }
  .service-link {
    display: inline-flex; align-items: center; gap: .5rem;
    margin-top: 1.8rem;
    font-size: .7rem;
    letter-spacing: .2em;
    text-transform: uppercase;
    color: var(--gold);
    text-decoration: none;
    cursor: none;
  }
  .service-link svg { width: 18px; transition: transform .3s; }
  .service-link:hover svg { transform: translateX(5px); }

  /* ── Process ── */
  #process {
    background: var(--dark);
    color: var(--white);
  }
  #process .section-title { color: var(--white); }
  .process-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 0;
    margin-top: 4rem;
    position: relative;
  }
  .process-grid::before {
    content: '';
    position: absolute;
    top: 3rem; left: 12%;
    right: 12%; height: 1px;
    background: linear-gradient(90deg, transparent, var(--gold), transparent);
    opacity: .35;
  }
  .process-step {
    padding: 0 2rem;
    text-align: center;
  }
  .step-circle {
    width: 60px; height: 60px;
    border: 1px solid rgba(184,155,106,.4);
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    margin: 0 auto 2rem;
    font-family: var(--font-serif);
    font-size: 1.4rem;
    color: var(--gold);
    position: relative;
    background: var(--dark);
  }
  .step-title {
    font-family: var(--font-serif);
    font-size: 1.2rem;
    margin-bottom: .8rem;
    color: var(--white);
  }
  .step-desc {
    font-size: .82rem;
    line-height: 1.8;
    color: rgba(253,250,244,.4);
  }

  /* ── Testimonials ── */
  #testimonials {
    background: var(--soft);
    overflow: hidden;
  }
  .testimonials-header {
    max-width: 520px;
    margin-bottom: 4rem;
  }
  .testimonials-track {
    display: flex;
    gap: 1.5rem;
    overflow: hidden;
    position: relative;
  }
  .testimonials-slider {
    display: flex;
    gap: 1.5rem;
    will-change: transform;
  }
  .testi-card {
    min-width: 400px;
    background: var(--white);
    padding: 2.8rem;
    position: relative;
    border-top: 2px solid var(--gold);
    flex-shrink: 0;
  }
  .testi-quote {
    font-family: var(--font-serif);
    font-size: 4rem;
    color: var(--gold);
    line-height: .7;
    margin-bottom: 1.2rem;
    opacity: .4;
  }
  .testi-text {
    font-family: var(--font-serif);
    font-size: 1.08rem;
    font-weight: 300;
    font-style: italic;
    line-height: 1.7;
    color: var(--dark);
    margin-bottom: 1.8rem;
  }
  .testi-meta {
    display: flex; align-items: center; gap: 1rem;
  }
  .testi-avatar {
    width: 42px; height: 42px;
    border-radius: 50%;
    background: var(--soft);
    display: flex; align-items: center; justify-content: center;
    font-family: var(--font-serif);
    font-size: 1.1rem;
    color: var(--gold);
  }
  .testi-name {
    font-size: .78rem;
    letter-spacing: .12em;
    text-transform: uppercase;
    color: var(--dark);
    display: block;
  }
  .testi-treatment {
    font-size: .72rem;
    color: var(--muted);
    margin-top: .2rem;
    display: block;
  }
  .stars { color: var(--gold); font-size: .8rem; margin-bottom: .8rem; }

  /* ── CTA Banner ── */
  #cta {
    background: var(--dark);
    padding: 6rem 3.5rem;
    display: flex; align-items: center; justify-content: space-between;
    gap: 3rem;
  }
  #cta .section-title { color: var(--white); }
  .cta-text { max-width: 580px; }
  .cta-text p {
    font-size: .9rem;
    line-height: 1.8;
    color: rgba(253,250,244,.45);
    margin-top: 1rem;
  }
  .cta-actions {
    display: flex; flex-direction: column; gap: 1.2rem; align-items: flex-start;
    flex-shrink: 0;
  }
  .cta-tel {
    font-family: var(--font-serif);
    font-size: 1.5rem;
    color: var(--gold);
    text-decoration: none;
  }
  .cta-address {
    font-size: .8rem;
    color: rgba(253,250,244,.4);
    line-height: 1.7;
  }

  /* ── Footer ── */
  footer {
    background: #111009;
    padding: 3rem 3.5rem;
    display: flex; align-items: center; justify-content: space-between;
    border-top: 1px solid rgba(184,155,106,.12);
  }
  .footer-logo {
    font-family: var(--font-serif);
    font-size: .95rem;
    letter-spacing: .22em;
    text-transform: uppercase;
    color: rgba(253,250,244,.3);
  }
  .footer-copy {
    font-size: .7rem;
    color: rgba(253,250,244,.2);
    letter-spacing: .08em;
  }
  .footer-links {
    display: flex; gap: 2rem;
    list-style: none;
  }
  .footer-links a {
    font-size: .68rem;
    letter-spacing: .18em;
    text-transform: uppercase;
    color: rgba(253,250,244,.3);
    text-decoration: none;
    transition: color .3s;
  }
  .footer-links a:hover { color: var(--gold); }

  /* ── Nav glass on scroll ── */
  nav.scrolled {
    background: rgba(26,22,18,.92);
    backdrop-filter: blur(16px);
    padding: 1.1rem 3.5rem;
    transition: background .4s, padding .4s;
  }

  /* Utility */
  .overflow-hidden { overflow: hidden; }
  .reveal { opacity: 0; transform: translateY(30px); }
</style>
</head>
<body>

<!-- Cursor -->
<div id="cursor"></div>
<div id="cursor-ring"></div>

<!-- Nav -->
<nav id="navbar">
  <div class="nav-logo">CGAC · London</div>
  <ul class="nav-links">
    <li><a href="#about">About</a></li>
    <li><a href="#services">Treatments</a></li>
    <li><a href="#process">Process</a></li>
    <li><a href="#testimonials">Reviews</a></li>
  </ul>
  <a href="#cta" class="nav-cta">Book Now</a>
</nav>

<!-- Hero -->
<section id="hero">
  <div class="hero-bg"></div>
  <div class="hero-orb"></div>
  <div class="hero-line"></div>

  <div class="hero-content">
    <div class="hero-eyebrow">Covent Garden · London WC2N</div>
    <h1 class="hero-title">
      The Art of<br><em>Aesthetic</em><br>Excellence
    </h1>
    <p class="hero-sub">
      Premium non-surgical treatments by GDC-registered clinicians in the heart of London's West End. Over 10 years of expertise, 20,000+ smiles transformed.
    </p>
    <div class="hero-actions">
      <a href="#cta" class="btn-primary">Book a Consultation</a>
      <a href="#services" class="btn-ghost">View Treatments</a>
    </div>
  </div>

  <div class="hero-scroll">
    <div class="scroll-line"></div>
    <span>Scroll</span>
  </div>
</section>

<!-- About -->
<section id="about">
  <div class="about-visual">
    <div class="about-card about-card-main">
      <!-- Elegant SVG illustration -->
      <svg viewBox="0 0 500 540" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="500" height="540" fill="#f0ebe0"/>
        <!-- Abstract face silhouette -->
        <ellipse cx="250" cy="200" rx="110" ry="130" fill="none" stroke="#b89b6a" stroke-width=".8" opacity=".4"/>
        <ellipse cx="250" cy="200" rx="80" ry="95" fill="none" stroke="#b89b6a" stroke-width=".5" opacity=".25"/>
        <!-- Decorative lines -->
        <line x1="80" y1="350" x2="420" y2="350" stroke="#b89b6a" stroke-width=".6" opacity=".3"/>
        <line x1="140" y1="370" x2="360" y2="370" stroke="#b89b6a" stroke-width=".4" opacity=".2"/>
        <!-- Small circles ornament -->
        <circle cx="250" cy="80" r="4" fill="#b89b6a" opacity=".5"/>
        <circle cx="250" cy="80" r="12" fill="none" stroke="#b89b6a" stroke-width=".6" opacity=".3"/>
        <circle cx="250" cy="80" r="22" fill="none" stroke="#b89b6a" stroke-width=".4" opacity=".15"/>
        <!-- Cross marks -->
        <g opacity=".3" stroke="#b89b6a" stroke-width=".8">
          <line x1="100" y1="180" x2="110" y2="180"/><line x1="105" y1="175" x2="105" y2="185"/>
          <line x1="380" y1="240" x2="390" y2="240"/><line x1="385" y1="235" x2="385" y2="245"/>
          <line x1="150" y1="440" x2="160" y2="440"/><line x1="155" y1="435" x2="155" y2="445"/>
          <line x1="320" y1="460" x2="330" y2="460"/><line x1="325" y1="455" x2="325" y2="465"/>
        </g>
        <!-- Text -->
        <text x="250" y="430" text-anchor="middle" font-family="'Cormorant Garamond', serif" font-size="11" fill="#b89b6a" letter-spacing="5" opacity=".6">CLINICAL EXCELLENCE</text>
        <text x="250" y="450" text-anchor="middle" font-family="'Cormorant Garamond', serif" font-size="9" fill="#7a6e5f" letter-spacing="3" opacity=".4">EST. COVENT GARDEN</text>
      </svg>
    </div>
    <div class="about-badge">
      <span class="num">10+</span>
      <span class="lbl">Years of Excellence</span>
    </div>
  </div>

  <div class="about-text">
    <span class="section-label">Our Story</span>
    <h2 class="section-title">Precision Meets<br><em>Artistry</em></h2>
    <div class="divider"></div>
    <p>
      Nestled on the cobbled lanes of Goodwin's Court, moments from Leicester Square, Covent Garden Aesthetic Clinic is a sanctuary of refined aesthetic medicine. We offer a curated menu of non-surgical treatments delivered by GDC-registered doctors, clinical nurses, and cosmetic dentists.
    </p>
    <p>
      Every treatment is tailored to you — your features, your goals, your rhythm. We believe that true beauty is deeply personal and endlessly nuanced.
    </p>

    <div class="about-stats">
      <div>
        <span class="stat-num">20k+</span>
        <span class="stat-lbl">Smiles Transformed</span>
      </div>
      <div>
        <span class="stat-num">4.0★</span>
        <span class="stat-lbl">Trusted Rating</span>
      </div>
      <div>
        <span class="stat-num">100%</span>
        <span class="stat-lbl">Medical Grade</span>
      </div>
    </div>
  </div>
</section>

<!-- Services -->
<section id="services">
  <div class="services-header">
    <span class="section-label">Treatments</span>
    <h2 class="section-title">Our <em>Signature</em><br>Procedures</h2>
    <div class="divider"></div>
  </div>

  <div class="services-grid">

    <!-- 1 -->
    <div class="service-card">
      <span class="service-num">01</span>
      <svg class="service-icon" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="24" cy="24" r="14"/>
        <path d="M18 26s2 4 6 4 6-4 6-4"/>
        <circle cx="19" cy="21" r="1.5" fill="#b89b6a" stroke="none"/>
        <circle cx="29" cy="21" r="1.5" fill="#b89b6a" stroke="none"/>
      </svg>
      <h3 class="service-name">Zoom Teeth Whitening</h3>
      <p class="service-desc">Achieve a brilliantly bright, celebrity-calibre smile in a single session with our Zoom Whitespeed laser treatment. Painless. Immediate. Transformative.</p>
      <a href="#cta" class="service-link">
        Book Treatment
        <svg viewBox="0 0 24 24" fill="none" stroke="#b89b6a" stroke-width="1.5" stroke-linecap="round">
          <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
        </svg>
      </a>
    </div>

    <!-- 2 -->
    <div class="service-card">
      <span class="service-num">02</span>
      <svg class="service-icon" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" stroke-width="1.2" stroke-linecap="round">
        <path d="M24 8 C24 8 14 18 14 28a10 10 0 0020 0C34 18 24 8 24 8z"/>
        <line x1="24" y1="22" x2="24" y2="34"/>
        <line x1="20" y1="27" x2="28" y2="27"/>
      </svg>
      <h3 class="service-name">Botox & Anti-Wrinkle</h3>
      <p class="service-desc">Expertly administered botulinum toxin treatments to soften fine lines and prevent deeper wrinkles. Natural results that move with you.</p>
      <a href="#cta" class="service-link">
        Book Treatment
        <svg viewBox="0 0 24 24" fill="none" stroke="#b89b6a" stroke-width="1.5" stroke-linecap="round">
          <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
        </svg>
      </a>
    </div>

    <!-- 3 -->
    <div class="service-card">
      <span class="service-num">03</span>
      <svg class="service-icon" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" stroke-width="1.2" stroke-linecap="round">
        <ellipse cx="24" cy="28" rx="10" ry="7"/>
        <path d="M18 28 C18 20 24 14 24 14 C24 14 30 20 30 28"/>
        <line x1="24" y1="14" x2="24" y2="10"/>
        <line x1="20" y1="11" x2="24" y2="10"/>
        <line x1="28" y1="11" x2="24" y2="10"/>
      </svg>
      <h3 class="service-name">Dermal Fillers</h3>
      <p class="service-desc">Sculpt and restore with hyaluronic acid fillers for lips, cheeks, jawline and tear troughs. Subtle volume, defined contours.</p>
      <a href="#cta" class="service-link">
        Book Treatment
        <svg viewBox="0 0 24 24" fill="none" stroke="#b89b6a" stroke-width="1.5" stroke-linecap="round">
          <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
        </svg>
      </a>
    </div>

    <!-- 4 -->
    <div class="service-card">
      <span class="service-num">04</span>
      <svg class="service-icon" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" stroke-width="1.2" stroke-linecap="round">
        <rect x="14" y="14" width="20" height="20" rx="3"/>
        <path d="M20 24 L23 27 L28 21"/>
      </svg>
      <h3 class="service-name">Lip Augmentation</h3>
      <p class="service-desc">Fuller, more defined lips with precision filler placement. From a subtle enhancement to a bold pout — always balanced to your face.</p>
      <a href="#cta" class="service-link">
        Book Treatment
        <svg viewBox="0 0 24 24" fill="none" stroke="#b89b6a" stroke-width="1.5" stroke-linecap="round">
          <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
        </svg>
      </a>
    </div>

    <!-- 5 -->
    <div class="service-card">
      <span class="service-num">05</span>
      <svg class="service-icon" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" stroke-width="1.2" stroke-linecap="round">
        <circle cx="24" cy="24" r="12"/>
        <path d="M18 18 Q24 14 30 18"/>
        <path d="M18 30 Q24 34 30 30"/>
        <line x1="24" y1="12" x2="24" y2="36"/>
      </svg>
      <h3 class="service-name">Cheek Augmentation</h3>
      <p class="service-desc">Restore youthful facial structure and lift with strategically placed cheek fillers. Achieve sculpted, harmonious proportions.</p>
      <a href="#cta" class="service-link">
        Book Treatment
        <svg viewBox="0 0 24 24" fill="none" stroke="#b89b6a" stroke-width="1.5" stroke-linecap="round">
          <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
        </svg>
      </a>
    </div>

    <!-- 6 -->
    <div class="service-card">
      <span class="service-num">06</span>
      <svg class="service-icon" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" stroke-width="1.2" stroke-linecap="round">
        <path d="M12 36 Q24 8 36 36"/>
        <path d="M16 28 Q24 18 32 28"/>
        <line x1="24" y1="36" x2="24" y2="42"/>
      </svg>
      <h3 class="service-name">Non-Surgical Treatments</h3>
      <p class="service-desc">Chemical peels, laser skin resurfacing and advanced skin rejuvenation — all without surgery, all with medical-grade efficacy.</p>
      <a href="#cta" class="service-link">
        Book Treatment
        <svg viewBox="0 0 24 24" fill="none" stroke="#b89b6a" stroke-width="1.5" stroke-linecap="round">
          <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
        </svg>
      </a>
    </div>

  </div>
</section>

<!-- Process -->
<section id="process">
  <span class="section-label">How It Works</span>
  <h2 class="section-title">Your Journey<br><em>to Radiance</em></h2>

  <div class="process-grid">
    <div class="process-step reveal">
      <div class="step-circle">1</div>
      <h3 class="step-title">Free Consultation</h3>
      <p class="step-desc">Discuss your goals with our expert clinicians. No pressure, no obligation — just expert guidance tailored to you.</p>
    </div>
    <div class="process-step reveal">
      <div class="step-circle">2</div>
      <h3 class="step-title">Bespoke Plan</h3>
      <p class="step-desc">We design a personalised treatment programme aligned with your unique anatomy and aesthetic ambitions.</p>
    </div>
    <div class="process-step reveal">
      <div class="step-circle">3</div>
      <h3 class="step-title">Treatment Day</h3>
      <p class="step-desc">Relax in our discreet, private clinic. All procedures are performed by medically qualified professionals.</p>
    </div>
    <div class="process-step reveal">
      <div class="step-circle">4</div>
      <h3 class="step-title">Aftercare</h3>
      <p class="step-desc">Receive a comprehensive aftercare kit and follow-up support. We're with you every step of the way.</p>
    </div>
  </div>
</section>

<!-- Testimonials -->
<section id="testimonials">
  <div class="testimonials-header">
    <span class="section-label">Client Reviews</span>
    <h2 class="section-title">Words That<br><em>Speak for Us</em></h2>
    <div class="divider"></div>
  </div>

  <div class="testimonials-track">
    <div class="testimonials-slider" id="slider">

      <div class="testi-card">
        <div class="testi-quote">"</div>
        <div class="stars">★★★★★</div>
        <p class="testi-text">My teeth are blindingly and evenly white. Everyone was so friendly and professional. I had absolutely no pain at all, neither during the procedure nor afterwards.</p>
        <div class="testi-meta">
          <div class="testi-avatar">R</div>
          <div>
            <span class="testi-name">Rhianna M.</span>
            <span class="testi-treatment">Zoom Whitespeed Treatment</span>
          </div>
        </div>
      </div>

      <div class="testi-card">
        <div class="testi-quote">"</div>
        <div class="stars">★★★★★</div>
        <p class="testi-text">Victor was exceptionally attentive and achieved a visibly whiter result. He thoroughly explained the treatment options and I am very pleased with the outcome.</p>
        <div class="testi-meta">
          <div class="testi-avatar">J</div>
          <div>
            <span class="testi-name">James T.</span>
            <span class="testi-treatment">Teeth Whitening</span>
          </div>
        </div>
      </div>

      <div class="testi-card">
        <div class="testi-quote">"</div>
        <div class="stars">★★★★★</div>
        <p class="testi-text">The only clinic I would use for laser whitening. They always make me very comfortable and the whitening procedure doesn't hurt at all. Highly recommend.</p>
        <div class="testi-meta">
          <div class="testi-avatar">S</div>
          <div>
            <span class="testi-name">Sarah K.</span>
            <span class="testi-treatment">Laser Whitening</span>
          </div>
        </div>
      </div>

      <div class="testi-card">
        <div class="testi-quote">"</div>
        <div class="stars">★★★★★</div>
        <p class="testi-text">I came across the Tear Trough treatment here and the results were incredible. The staff were knowledgeable and the atmosphere was calm and professional throughout.</p>
        <div class="testi-meta">
          <div class="testi-avatar">A</div>
          <div>
            <span class="testi-name">Amara L.</span>
            <span class="testi-treatment">Tear Trough Filler</span>
          </div>
        </div>
      </div>

      <div class="testi-card">
        <div class="testi-quote">"</div>
        <div class="stars">★★★★★</div>
        <p class="testi-text">Great experience as a birthday gift! Super friendly staff, excellent results and would absolutely recommend to anyone considering treatment.</p>
        <div class="testi-meta">
          <div class="testi-avatar">P</div>
          <div>
            <span class="testi-name">Priya N.</span>
            <span class="testi-treatment">Zoom Whitening</span>
          </div>
        </div>
      </div>

    </div>
  </div>
</section>

<!-- CTA -->
<section id="cta">
  <div class="cta-text reveal">
    <span class="section-label">Book Your Visit</span>
    <h2 class="section-title">Begin Your<br><em>Transformation</em></h2>
    <p>A complimentary consultation awaits. Our clinic is a 5-minute walk from Covent Garden and Leicester Square tube stations.</p>
  </div>
  <div class="cta-actions reveal">
    <a href="tel:+442032897904" class="cta-tel">+44 20 3289 7904</a>
    <a href="#cta" class="btn-primary">Book Online</a>
    <p class="cta-address">
      7 Goodwin's Court<br>
      London WC2N 4LL<br>
      Mon – Sun · 09:00 – 21:00
    </p>
  </div>
</section>

<!-- Footer -->
<footer>
  <div class="footer-logo">Covent Garden Aesthetic Clinic</div>
  <ul class="footer-links">
    <li><a href="#about">About</a></li>
    <li><a href="#services">Treatments</a></li>
    <li><a href="#cta">Contact</a></li>
    <li><a href="#">Privacy</a></li>
  </ul>
  <div class="footer-copy">© 2025 CGAC · All Rights Reserved</div>
</footer>

<script>
gsap.registerPlugin(ScrollTrigger);

// ── Cursor ────────────────────────────────────────
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursor-ring');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

function animateCursor() {
  gsap.set(cursor, { x: mx, y: my });
  rx += (mx - rx) * .12;
  ry += (my - ry) * .12;
  gsap.set(ring, { x: rx, y: ry });
  requestAnimationFrame(animateCursor);
}
animateCursor();

// ── Nav on scroll ─────────────────────────────────
const navbar = document.getElementById('navbar');
ScrollTrigger.create({
  start: 100,
  onEnter: () => navbar.classList.add('scrolled'),
  onLeaveBack: () => navbar.classList.remove('scrolled')
});

// ── Hero entrance ─────────────────────────────────
const tl = gsap.timeline({ delay: .2 });
tl.to('.hero-eyebrow', { opacity: 1, y: 0, duration: 1, ease: 'power3.out' })
  .to('.hero-title', { opacity: 1, y: 0, duration: 1.1, ease: 'power3.out' }, '-=.7')
  .to('.hero-sub', { opacity: 1, y: 0, duration: .9, ease: 'power3.out' }, '-=.7')
  .to('.hero-actions', { opacity: 1, y: 0, duration: .9, ease: 'power3.out' }, '-=.6')
  .to('.hero-scroll', { opacity: 1, duration: .8 }, '-=.4');

gsap.set(['.hero-eyebrow','.hero-title','.hero-sub','.hero-actions'], { y: 40 });

// ── Hero orb parallax ─────────────────────────────
gsap.to('.hero-orb', {
  y: -120,
  scrollTrigger: { trigger: '#hero', scrub: 1.5, start: 'top top', end: 'bottom top' }
});

// ── About section ─────────────────────────────────
gsap.from('.about-visual', {
  x: -60, opacity: 0, duration: 1.2, ease: 'power3.out',
  scrollTrigger: { trigger: '#about', start: 'top 75%' }
});
gsap.from('.about-text', {
  x: 60, opacity: 0, duration: 1.2, ease: 'power3.out',
  scrollTrigger: { trigger: '#about', start: 'top 75%' }
});
gsap.from('.about-badge', {
  scale: .6, opacity: 0, duration: .9, ease: 'back.out(1.7)', delay: .4,
  scrollTrigger: { trigger: '#about', start: 'top 75%' }
});
gsap.from('.stat-num', {
  textContent: 0, duration: 1.5, ease: 'power2.out', snap: { textContent: 1 },
  scrollTrigger: { trigger: '.about-stats', start: 'top 85%' }
});

// ── Services ──────────────────────────────────────
gsap.from('.service-card', {
  y: 50, opacity: 0, duration: .9, ease: 'power3.out',
  stagger: .1,
  scrollTrigger: { trigger: '.services-grid', start: 'top 80%' }
});

// ── Process ───────────────────────────────────────
gsap.from('.process-step', {
  y: 40, opacity: 0, duration: .9, ease: 'power3.out',
  stagger: .18,
  scrollTrigger: { trigger: '.process-grid', start: 'top 80%' }
});
gsap.from('.step-circle', {
  scale: 0, duration: .7, ease: 'back.out(1.7)',
  stagger: .18,
  scrollTrigger: { trigger: '.process-grid', start: 'top 80%' }
});

// ── Testimonials infinite slider ──────────────────
const slider = document.getElementById('slider');
const cards = slider.querySelectorAll('.testi-card');
const cardWidth = 400 + 24; // width + gap
let offset = 0;

// Clone cards for seamless loop
cards.forEach(c => slider.appendChild(c.cloneNode(true)));

function slideLoop() {
  offset -= .6;
  if (Math.abs(offset) >= cardWidth * cards.length) offset = 0;
  gsap.set(slider, { x: offset });
  requestAnimationFrame(slideLoop);
}
slideLoop();

// Pause on hover
slider.addEventListener('mouseenter', () => gsap.globalTimeline.pause());
slider.addEventListener('mouseleave', () => gsap.globalTimeline.resume());

// ── CTA reveal ────────────────────────────────────
gsap.from('#cta .reveal', {
  y: 40, opacity: 0, duration: 1, ease: 'power3.out', stagger: .2,
  scrollTrigger: { trigger: '#cta', start: 'top 80%' }
});

// ── Divider lines ─────────────────────────────────
gsap.from('.divider', {
  scaleX: 0, duration: 1, ease: 'power3.out', transformOrigin: 'left',
  scrollTrigger: { trigger: '.divider', start: 'top 90%' }
});

</script>
</body>
</html>`}