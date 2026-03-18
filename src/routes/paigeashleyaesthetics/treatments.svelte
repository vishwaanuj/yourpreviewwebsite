<script>
  let txActive = $state('all');

  const TX_CATEGORIES = [
    { id: 'all',        label: 'All' },
    { id: 'facial',     label: 'Facials' },
    { id: 'needling',   label: 'Needling' },
    { id: 'prp',        label: 'PRP & Advanced' },
    { id: 'dermaplane', label: 'Dermaplane' },
    { id: 'brow-lash',  label: 'Brows & Lashes' },
    { id: 'package',    label: 'Packages' },
  ];

  const TX_TREATMENTS = [
    {
      id: 1, category: 'prp', categoryLabel: 'PRP & Advanced', popular: true,
      name: 'Medical Grade PRP Nano-Needling Facial',
      price: '$450', duration: '90 min',
      tagline: 'Your own blood, reimagined as liquid gold.',
      desc: 'Paige draws your blood as a licensed Phlebotomist, processes it in a centrifuge, and applies the Platelet-Rich Plasma via nano-needling. Visibly smoother, firmer skin with reduced fine lines, wrinkles, and acne scars.',
      img: 'https://images.squarespace-cdn.com/content/v1/65dfa464466e783cc78e1294/e28353f0-b891-42ca-935e-a0dcbd7de725/IMG_97017018A041-1.jpeg',
    },
    {
      id: 2, category: 'prp', categoryLabel: 'PRP & Advanced', popular: false,
      name: 'Medical Grade PRP Microneedling',
      price: 'Contact for Pricing', duration: '90 min',
      tagline: 'Deep renewal meets the power of your own plasma.',
      desc: 'Microneedling channels allow Platelet-Rich Plasma to penetrate deeply — boosting collagen, smoothing fine lines, reducing scars, and delivering firmer, younger-looking skin.',
      img: 'https://images.squarespace-cdn.com/content/v1/65dfa464466e783cc78e1294/7fc4ebce-3ba1-44d5-9980-b4905c49bcd3/Screenshot+2024-10-02+at+12.22.27%E2%80%AFPM.png',
    },
    {
      id: 3, category: 'prp', categoryLabel: 'PRP & Advanced', popular: false,
      name: 'PDRN (Salmon Sperm) Microneedling',
      price: '$450', duration: '75 min',
      tagline: 'Regenerative science meets luxury skincare.',
      desc: 'PDRN derived from salmon DNA penetrates deep skin layers via microneedling — stimulating collagen, promoting cellular regeneration, and repairing damaged tissue. Ideal for fine lines, acne scars, and hyperpigmentation. Recovery 3–5 days.',
      img: 'https://images.squarespace-cdn.com/content/v1/65dfa464466e783cc78e1294/554f3d52-7ec9-4687-ba7b-1756b98298f0/Screenshot+2025-05-16+at+11.01.17%E2%80%AFAM.png',
    },
    {
      id: 4, category: 'needling', categoryLabel: 'Needling', popular: true,
      name: 'Nano-Needling Facial',
      price: '$150', duration: '60 min',
      tagline: 'Non-invasive glow — zero downtime.',
      desc: "Non-invasive nano-needling triggers the skin's natural healing process without breaking the barrier. Includes Paige's European-style scalp, décolletage, hand and arm massage. Improved texture, even tone, enhanced absorption.",
      img: 'https://images.squarespace-cdn.com/content/v1/65dfa464466e783cc78e1294/98271d30-c39d-4a2f-8f48-69335cf92bbc/Screenshot+2024-07-08+at+6.59.23%E2%80%AFAM.png',
    },
    {
      id: 5, category: 'needling', categoryLabel: 'Needling', popular: false,
      name: 'Nano Needling with Custom Peel',
      price: '$225', duration: '75 min',
      tagline: 'Brighter, clearer skin — two powerhouses in one.',
      desc: "Nano-needling combined with Image Skincare's I PEEL Lightening Lift targets hyperpigmentation, sun spots, and uneven tone. Enhanced peel absorption plus collagen stimulation for a luminous, youthful result.",
      img: 'https://images.squarespace-cdn.com/content/v1/65dfa464466e783cc78e1294/95944eca-ee95-43f0-9375-cb71fcd97d72/Screenshot+2024-08-04+at+2.32.22%E2%80%AFPM.png',
    },
    {
      id: 6, category: 'facial', categoryLabel: 'Facials', popular: true,
      name: "Paige's Signature Facial",
      price: '$100', duration: '60 min',
      tagline: 'Clinical precision. Spa-level luxury.',
      desc: "Premium products, customized exfoliation and mask, steam hydration, plus a European-style massage for face, scalp, décolletage, hands and arms. You'll leave refreshed, radiant, and utterly rejuvenated.",
      img: 'https://images.squarespace-cdn.com/content/v1/65dfa464466e783cc78e1294/de04c300-ed00-45ac-9db3-0b1b55d66a36/Screenshot+2024-06-11+at+1.29.23%E2%80%AFPM.png',
    },
    {
      id: 7, category: 'facial', categoryLabel: 'Facials', popular: false,
      name: "Gentlemen's Facial",
      price: '$100', duration: '60 min',
      tagline: "Skincare built for men's unique needs.",
      desc: 'Deep cleansing, exfoliation, and hydration tailored specifically for men. Addresses texture, oil, and congestion — leaving skin fresh, clean, and revitalized.',
      img: 'https://images.squarespace-cdn.com/content/v1/65dfa464466e783cc78e1294/b803db6c-dc0c-4429-99d6-31f6cad07b07/Screenshot+2024-06-05+at+9.18.25%E2%80%AFPM.png',
    },
    {
      id: 8, category: 'facial', categoryLabel: 'Facials', popular: false,
      name: 'Teen Facial',
      price: '$55', duration: '45 min',
      tagline: 'Gentle care for young, changing skin.',
      desc: 'Tailored to adolescent skin — cleansing, exfoliation, extractions, and hydration to combat acne, excess oil, and congestion. Builds healthy skincare habits with products suited for sensitive skin.',
      img: 'https://images.squarespace-cdn.com/content/v1/65dfa464466e783cc78e1294/6626dba1-4f4d-4396-9628-3885bf45916a/Screenshot+2024-07-10+at+3.13.52%E2%80%AFPM.png',
    },
    {
      id: 9, category: 'dermaplane', categoryLabel: 'Dermaplane', popular: true,
      name: 'DermaplanePro Facial',
      price: '$160', duration: '60 min',
      tagline: 'Velvet-smooth skin, instantly.',
      desc: 'Double cleansing, dermaplaning with a surgical scalpel, customized mask, steam hydration, décolleté and hand & arm massage. Removes dead skin and peach fuzz — deeper product penetration, reduced acne scars and hyperpigmentation.',
      img: 'https://images.squarespace-cdn.com/content/v1/65dfa464466e783cc78e1294/5688b9e4-76fa-43f2-87ca-cb381e7c69fb/paigeashleyaestheticsdermaplane.png',
    },
    {
      id: 10, category: 'dermaplane', categoryLabel: 'Dermaplane', popular: false,
      name: 'DermaplanePro Facial + Custom Peel',
      price: '$200', duration: '75 min',
      tagline: 'Triple exfoliation — the ultimate skin reset.',
      desc: 'DermaplanePro plus the Happy Peel: dermaplane, enzyme, and chemical peel in one session. Boosts cellular turnover and reduces fine lines after just one treatment. Suitable for all skin types.',
      img: 'https://images.squarespace-cdn.com/content/v1/65dfa464466e783cc78e1294/f0ac4217-9665-4926-ab76-41f2cee5641c/Screenshot+2024-05-22+at+6.47.41%E2%80%AFPM.png',
    },
    {
      id: 11, category: 'brow-lash', categoryLabel: 'Brows & Lashes', popular: true,
      name: 'Lash Lift + Tint + Keratin',
      price: '$95', duration: '60 min',
      tagline: 'Wide-awake eyes. Zero mascara required.',
      desc: "Elleebana's vegan-friendly Elleeplex Profusion lifts, tints, and strengthens natural lashes. Cysteamine Hydrochloride protects lash integrity; amino acid technology keeps them healthy. Results last 6–8 weeks.",
      img: 'https://images.squarespace-cdn.com/content/v1/65dfa464466e783cc78e1294/78f82b73-2ef0-482b-bc22-7e6b0a6023e6/Screenshot+2024-05-22+at+7.00.00%E2%80%AFPM.png',
    },
    {
      id: 12, category: 'brow-lash', categoryLabel: 'Brows & Lashes', popular: false,
      name: 'Brow Lamination + Tint + Clean Up',
      price: '$80', duration: '45 min',
      tagline: 'Fuller, defined brows — effortlessly.',
      desc: "Elleebana brow lamination with Elleeplex Profusion restructures brow hair for a fuller, uniform shape lasting 6–8 weeks. Paired with Belmacil Swiss tinting in 10 luxurious colors, plus wax and tweeze clean up.",
      img: 'https://images.squarespace-cdn.com/content/v1/65dfa464466e783cc78e1294/e121eec8-1808-4eac-a25e-a69c76d0a622/Screenshot+2024-05-22+at+7.03.05%E2%80%AFPM.png',
    },
    {
      id: 13, category: 'package', categoryLabel: 'Package', popular: true,
      name: '👑 Luxury Pamper Package',
      price: 'Ask Paige', duration: '3+ hrs',
      tagline: 'The full experience — head to toe.',
      desc: 'Deluxe Facial, LED Therapy, Scalp Massage, Lash Lift + Tint, Brow Lamination + Tint, plus a FREE ORMEDIC Sheer Pink Lip Enhancement Complex. Emerge feeling refreshed, revitalized, and effortlessly beautiful.',
      img: 'https://images.squarespace-cdn.com/content/v1/65dfa464466e783cc78e1294/debd5943-3d49-42ab-994f-2fefac777b1d/paigeashleyfacial.png',
    },
  ];

  const txFiltered = $derived(
    txActive === 'all'
      ? TX_TREATMENTS
      : TX_TREATMENTS.filter(t => t.category === txActive)
  );
</script>

<section class="tx-section" id="treatments-packages">
  <div class="tx-intro">
    <span class="kicker">Treatments &amp; Packages</span>
    <h2 class="tx-h2">Every Treatment, <em>Curated for You</em></h2>
    <p class="tx-sub">From signature facials to medical-grade PRP — Paige tailors every service at the Biltmore, Phoenix.</p>
  </div>

  <!-- Category filter tabs -->
  <div class="tx-tabs">
    {#each TX_CATEGORIES as cat}
      <button
        class="tx-tab"
        class:tx-tab-active={txActive === cat.id}
        onclick={() => txActive = cat.id}
      >{cat.label}</button>
    {/each}
  </div>

  <!-- Treatment cards -->
  <div class="tx-grid">
    {#each txFiltered as t (t.id)}
      <div class="tx-card">
        <div class="tx-card-img">
          <img src={t.img} alt={t.name} loading="lazy"/>
          <div class="tx-card-overlay"></div>
          <div class="tx-card-badges">
            <span class="tx-badge-cat">{t.categoryLabel}</span>
            {#if t.popular}<span class="tx-badge-pop">Popular</span>{/if}
          </div>
          <div class="tx-card-price-wrap">
            <span class="tx-card-price">{t.price}</span>
            <span class="tx-card-dur">{t.duration}</span>
          </div>
        </div>
        <div class="tx-card-body">
          <h3>{t.name}</h3>
          <p class="tx-card-tagline">{t.tagline}</p>
          <p class="tx-card-desc">{t.desc}</p>
          <div class="tx-card-actions">
            <a href="/schedule-now" class="tx-book-btn">Book Now →</a>
          </div>
        </div>
      </div>
    {/each}
  </div>

  <!-- Bottom CTA banner -->
  <div class="tx-cta-banner">
    <div class="tx-cta-left">
      <img
        src="https://images.squarespace-cdn.com/content/v1/624b503a3a6154640a151782/1649102921799-ZRRB9ENBQUSP9C1Z926Z/Frame+10.png?format=2500w"
        alt="" aria-hidden="true" class="tx-cta-floral"
      />
      <div>
        <p class="tx-cta-title">Not sure which treatment is right for you?</p>
        <p class="tx-cta-text">Paige offers personalized consultations to build your perfect skin ritual.</p>
      </div>
    </div>
    <div class="tx-cta-right">
      <a href="/schedule-now" class="tx-book-btn tx-book-btn-light">Book a Consultation</a>
      <a href="https://www.paigeashleyaesthetics.com/treatments-packages" target="_blank" class="tx-ext">
        Full Treatments Page ↗
      </a>
    </div>
  </div>
</section>

<style>
  .tx-section {
    background: #fff;
    padding: 8rem 5rem 7rem;
    border-top: 1px solid rgba(26,18,16,.07);
  }

  .tx-intro {
    max-width: 1180px;
    margin: 0 auto 3.5rem;
    text-align: center;
  }

  .kicker {
    display: inline-block;
    font-family: 'Inter', sans-serif;
    font-size: .58rem;
    letter-spacing: .28em;
    text-transform: uppercase;
    color: #c9778b;
    margin-bottom: .7rem;
  }

  .tx-h2 {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(2rem, 3.8vw, 3.4rem);
    font-weight: 600;
    color: #1a1210;
    line-height: 1.15;
    margin: .5rem 0 .9rem;
  }

  .tx-h2 em {
    font-style: italic;
    color: #8b3a52;
  }

  .tx-sub {
    font-family: 'Inter', sans-serif;
    font-size: .9rem;
    font-weight: 300;
    color: #6b5e5a;
    max-width: 480px;
    margin: 0 auto;
    line-height: 1.75;
  }

  /* Category tabs */
  .tx-tabs {
    max-width: 1180px;
    margin: 0 auto 3rem;
    display: flex;
    flex-wrap: wrap;
    gap: .5rem;
    justify-content: center;
  }

  .tx-tab {
    padding: .42rem 1.15rem;
    font-family: 'Inter', sans-serif;
    font-size: .6rem;
    font-weight: 500;
    letter-spacing: .12em;
    text-transform: uppercase;
    border: 1.5px solid rgba(26,18,16,.15);
    background: transparent;
    color: #6b5e5a;
    border-radius: 100px;
    cursor: pointer;
    transition: all .22s;
  }

  .tx-tab:hover {
    border-color: #c9778b;
    color: #8b3a52;
    background: #f4cdd7;
  }

  .tx-tab-active {
    background: #1a1210;
    color: #fff;
    border-color: #1a1210;
  }

  /* Treatment grid — 3 col desktop */
  .tx-grid {
    max-width: 1180px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
  }

  /* Treatment card */
  .tx-card {
    display: flex;
    flex-direction: column;
    border: 1px solid rgba(26,18,16,.08);
    border-radius: 8px;
    overflow: hidden;
    background: #fff;
    transition: transform .32s cubic-bezier(.16,1,.3,1), box-shadow .32s, border-color .32s;
  }

  .tx-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 20px 50px rgba(26,18,16,.1);
    border-color: #f4cdd7;
  }

  .tx-card-img {
    position: relative;
    height: 220px;
    overflow: hidden;
    flex-shrink: 0;
  }

  .tx-card-img img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform .65s cubic-bezier(.16,1,.3,1);
  }

  .tx-card:hover .tx-card-img img {
    transform: scale(1.06);
  }

  .tx-card-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(13,9,8,.65) 0%, transparent 55%);
  }

  .tx-card-badges {
    position: absolute;
    top: .75rem;
    left: .75rem;
    display: flex;
    gap: .4rem;
    align-items: center;
  }

  .tx-badge-cat {
    font-family: 'Inter', sans-serif;
    font-size: .48rem;
    letter-spacing: .15em;
    text-transform: uppercase;
    background: rgba(255,255,255,.14);
    color: #fff;
    backdrop-filter: blur(8px);
    padding: .22rem .6rem;
    border-radius: 100px;
    border: 1px solid rgba(255,255,255,.22);
  }

  .tx-badge-pop {
    font-family: 'Inter', sans-serif;
    font-size: .48rem;
    letter-spacing: .15em;
    text-transform: uppercase;
    background: #c9778b;
    color: #fff;
    padding: .22rem .6rem;
    border-radius: 100px;
  }

  .tx-card-price-wrap {
    position: absolute;
    bottom: 1rem;
    left: 1.1rem;
    display: flex;
    align-items: baseline;
    gap: .5rem;
  }

  .tx-card-price {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.55rem;
    font-weight: 700;
    color: #fff;
    line-height: 1;
  }

  .tx-card-dur {
    font-family: 'Inter', sans-serif;
    font-size: .55rem;
    letter-spacing: .14em;
    text-transform: uppercase;
    color: rgba(255,255,255,.65);
  }

  .tx-card-body {
    padding: 1.4rem 1.5rem 1.6rem;
    display: flex;
    flex-direction: column;
    flex: 1;
    gap: .6rem;
  }

  .tx-card-body h3 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.15rem;
    font-weight: 600;
    color: #1a1210;
    line-height: 1.25;
  }

  .tx-card-tagline {
    font-family: 'Cormorant Garamond', serif;
    font-style: italic;
    font-size: .95rem;
    color: #8b3a52;
    line-height: 1.4;
  }

  .tx-card-desc {
    font-family: 'Inter', sans-serif;
    font-size: .76rem;
    font-weight: 300;
    color: #6b5e5a;
    line-height: 1.75;
    flex: 1;
  }

  .tx-card-actions {
    margin-top: .8rem;
  }

  .tx-book-btn {
    display: inline-block;
    padding: .62rem 1.5rem;
    background: #1a1210;
    color: #fff;
    font-family: 'Inter', sans-serif;
    font-size: .62rem;
    font-weight: 500;
    letter-spacing: .16em;
    text-transform: uppercase;
    border: 1.5px solid #1a1210;
    text-decoration: none;
    cursor: pointer;
    transition: background .3s, border-color .3s;
  }

  .tx-book-btn:hover {
    background: #8b3a52;
    border-color: #8b3a52;
  }

  .tx-book-btn-light {
    background: transparent;
    color: #fff;
    border-color: rgba(255,255,255,.45);
  }

  .tx-book-btn-light:hover {
    background: rgba(255,255,255,.1);
    border-color: #fff;
  }

  /* Bottom CTA banner */
  .tx-cta-banner {
    max-width: 1180px;
    margin: 4rem auto 0;
    background: #130d0b;
    border-radius: 8px;
    padding: 2.4rem 3rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 2rem;
    flex-wrap: wrap;
    position: relative;
    overflow: hidden;
  }

  .tx-cta-floral {
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    width: 260px;
    opacity: .06;
    pointer-events: none;
  }

  .tx-cta-left {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    position: relative;
    z-index: 2;
  }

  .tx-cta-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.35rem;
    font-weight: 600;
    color: #fff;
    line-height: 1.25;
    margin-bottom: .3rem;
  }

  .tx-cta-text {
    font-family: 'Inter', sans-serif;
    font-size: .78rem;
    font-weight: 300;
    color: rgba(255,255,255,.45);
    line-height: 1.6;
  }

  .tx-cta-right {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    flex-wrap: wrap;
    position: relative;
    z-index: 2;
  }

  .tx-ext {
    font-family: 'Inter', sans-serif;
    font-size: .62rem;
    letter-spacing: .12em;
    text-transform: uppercase;
    color: rgba(255,255,255,.38);
    text-decoration: none;
    transition: color .22s;
  }

  .tx-ext:hover {
    color: #f4cdd7;
  }

  /* Responsive */
  @media (max-width: 1100px) {
    .tx-section { padding: 6rem 2.5rem 5rem; }
    .tx-grid { grid-template-columns: repeat(2, 1fr); gap: 1.4rem; }
    .tx-cta-banner { padding: 2rem; }
    .tx-cta-floral { display: none; }
  }

  @media (max-width: 640px) {
    .tx-section { padding: 4rem 1.4rem 3.5rem; }
    .tx-grid { grid-template-columns: 1fr; gap: 1.2rem; }
    .tx-card-img { height: 200px; }
    .tx-tabs { justify-content: flex-start; }
    .tx-cta-banner { flex-direction: column; align-items: flex-start; padding: 1.6rem 1.4rem; }
    .tx-cta-right { flex-direction: column; align-items: flex-start; gap: 1rem; }
  }
</style>