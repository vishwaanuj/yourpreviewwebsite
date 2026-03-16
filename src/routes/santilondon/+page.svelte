<script>
  import { onMount } from 'svelte';

  let mounted = false;

  onMount(async () => {
    mounted = true;

    // Dynamically load GSAP + ScrollTrigger
    const { gsap } = await import('gsap');
    const { ScrollTrigger } = await import('gsap/ScrollTrigger');
    gsap.registerPlugin(ScrollTrigger);

    /* ── cursor ── */
    const cur  = document.getElementById('cur');
    const ring = document.getElementById('cur-ring');
    let mx = 0, my = 0, rx = 0, ry = 0;

    document.addEventListener('mousemove', e => {
      mx = e.clientX; my = e.clientY;
      gsap.to(cur, { x: mx, y: my, duration: 0.12, ease: 'power2.out' });
    });

    (function animRing() {
      rx += (mx - rx) * 0.09;
      ry += (my - ry) * 0.09;
      gsap.set(ring, { x: rx, y: ry });
      requestAnimationFrame(animRing);
    })();

    document.querySelectorAll('a,button,.bento-card,.bento-img,.jcard,.pillar-item').forEach(el => {
      el.addEventListener('mouseenter', () => gsap.to(cur, { width: 16, height: 16, duration: 0.25 }));
      el.addEventListener('mouseleave', () => gsap.to(cur, { width: 8,  height: 8,  duration: 0.25 }));
    });

    /* ── loader ── */
    const ltl = gsap.timeline({
      onComplete: () => {
        gsap.to('#loader', {
          opacity: 0, duration: 0.7, ease: 'power2.inOut',
          onComplete: () => {
            const loader = document.getElementById('loader');
            if (loader) loader.style.display = 'none';
            startPage(gsap, ScrollTrigger);
          }
        });
      }
    });

    ltl
      .to('#l-word span', { y: '0%',    duration: 0.9,  ease: 'expo.out' })
      .to('#l-bar',       { width: 200,  duration: 1.1, ease: 'power3.inOut' }, '-=.4')
      .to('#l-word span', { y: '-105%', duration: 0.6,  ease: 'power2.in'  }, '.8')
      .to('#l-bar',       { opacity: 0,  duration: 0.3 }, '-=.3');
  });

  function startPage(gsap, ScrollTrigger) {
    /* nav scroll */
    ScrollTrigger.create({
      start: 'top -60',
      onUpdate: s => document.getElementById('nav')?.classList.toggle('stuck', s.scroll() > 60)
    });

    /* hero entrance */
    gsap.to('.h-line-inner', { y: '0%', duration: 1.1, ease: 'expo.out', stagger: 0.12, delay: 0.1 });
    gsap.to('.h-eyebrow',    { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.5 });
    gsap.to('.h-body',       { opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.7 });
    gsap.to('.h-actions',    { opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.9 });
    gsap.to('.h-tags',       { opacity: 1, duration: 0.8, ease: 'power3.out', delay: 1.05 });

    gsap.fromTo('#hero-right',
      { opacity: 0, x: 40 },
      { opacity: 1, x: 0, duration: 1.2, ease: 'expo.out', delay: 0.3 }
    );
    gsap.fromTo('#hero-num',
      { opacity: 0, x: 60 },
      { opacity: 1, x: 0, duration: 1.6, ease: 'expo.out', delay: 0.6 }
    );

    /* scroll reveals */
    gsap.utils.toArray('.reveal').forEach(el => {
      gsap.fromTo(el,
        { opacity: 0, y: 38 },
        { opacity: 1, y: 0, duration: 0.85, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' } }
      );
    });

    gsap.utils.toArray('.bento-card, .bento-img, .bento-feature').forEach((el, i) => {
      gsap.fromTo(el,
        { opacity: 0, y: 32, scale: 0.97 },
        { opacity: 1, y: 0, scale: 1, duration: 0.9, ease: 'power3.out',
          delay: (i % 4) * 0.09,
          scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: 'play none none none' } }
      );
    });

    gsap.utils.toArray('.pillar-item').forEach((el, i) => {
      gsap.fromTo(el,
        { opacity: 0, x: -28 },
        { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out',
          delay: i * 0.1,
          scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' } }
      );
    });

    const jcards = gsap.utils.toArray('.jcard');
    if (jcards.length) {
      ScrollTrigger.create({
        trigger: '#journal', start: 'top 75%', once: true,
        onEnter: () => gsap.fromTo(jcards,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.85, ease: 'power3.out', stagger: 0.12 }
        )
      });
    }

    document.querySelectorAll('.mw-bar-fill').forEach(bar => {
      ScrollTrigger.create({
        trigger: bar, start: 'top 85%', once: true,
        onEnter: () => gsap.to(bar, {
          width: bar.dataset.w + '%', duration: 1.5, ease: 'power2.out', delay: 0.2
        })
      });
    });

    gsap.to('#hero-num', {
      y: 120, ease: 'none',
      scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: 1.5 }
    });

    /* marquee animation */
    gsap.to('.mq-inner', {
      x: '-50%', duration: 20, ease: 'none', repeat: -1
    });

    /* enhanced hover animations */
    document.querySelectorAll('.h-tag').forEach(tag => {
      tag.addEventListener('mouseenter', () => {
        gsap.to(tag, { scale: 1.05, duration: 0.3, ease: 'power2.out' });
      });
      tag.addEventListener('mouseleave', () => {
        gsap.to(tag, { scale: 1, duration: 0.3, ease: 'power2.out' });
      });
    });

    /* footer entrance animation */
    gsap.fromTo('footer',
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: 'footer', start: 'top 90%', toggleActions: 'play none none none' } }
    );

    /* enhanced image hover effects */
    document.querySelectorAll('.hero-img-main img, .hero-img-small-item img').forEach(img => {
      img.addEventListener('mouseenter', () => {
        gsap.to(img, { scale: 1.08, duration: 0.6, ease: 'power2.out' });
      });
      img.addEventListener('mouseleave', () => {
        gsap.to(img, { scale: 1, duration: 0.6, ease: 'power2.out' });
      });
    });

    /* button hover animations */
    document.querySelectorAll('.n-cta, .bf-cta, .bc-link, .jcard-link').forEach(btn => {
      btn.addEventListener('mouseenter', () => {
        gsap.to(btn, { y: -2, duration: 0.3, ease: 'power2.out' });
      });
      btn.addEventListener('mouseleave', () => {
        gsap.to(btn, { y: 0, duration: 0.3, ease: 'power2.out' });
      });
    });

    /* stat counter animation */
    document.querySelectorAll('.bf-stat-item em').forEach(stat => {
      const target = parseInt(stat.textContent.replace(/[^\d]/g, ''));
      gsap.fromTo(stat,
        { innerText: 0 },
        {
          innerText: target,
          duration: 2,
          ease: 'power2.out',
          snap: { innerText: 1 },
          scrollTrigger: { trigger: stat, start: 'top 90%', toggleActions: 'play none none none' }
        }
      );
    });

    /* enhanced card hover effects */
    document.querySelectorAll('.bento-card').forEach(card => {
      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          y: -8,
          rotationY: 2,
          duration: 0.4,
          ease: 'power2.out'
        });
      });
      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          y: 0,
          rotationY: 0,
          duration: 0.4,
          ease: 'power2.out'
        });
      });
    });

    /* text reveal animations for longer content */
    gsap.utils.toArray('.comp-body, .phil-body').forEach(text => {
      gsap.fromTo(text,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: text, start: 'top 85%', toggleActions: 'play none none none' } }
      );
    });
  }

</script>

<svelte:head>
  <title>Santi London — Skin, Wellness & Medical Aesthetics</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link
    href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,200;0,9..144,300;0,9..144,400;1,9..144,200;1,9..144,300;1,9..144,400&family=Cabinet+Grotesk:wght@300;400;500;700&display=swap"
    rel="stylesheet"
  />
</svelte:head>

<!-- CURSOR -->
<div id="cur"></div>
<div id="cur-ring"></div>

<!-- LOADER -->
<div id="loader">
  <div id="l-word"><span>Santi London</span></div>
  <div id="l-bar"></div>
</div>

<!-- NAV -->
<nav id="nav">
  <a href="/" class="n-logo">Santi London</a>
  <div class="n-links">
    <a href="/" class="n-link">About</a>
    <a href="/" class="n-link">Wellness</a>
    <a href="/" class="n-link">Aesthetics</a>
    <a href="/" class="n-link">Journal</a>
    <a href="/" class="n-link">Gifts</a>
  </div>
  <a href="/" class="n-cta">Book Now</a>
</nav>

<!-- ═══════════════ HERO ═══════════════ -->
<section id="hero">
  <div id="hero-num">Santil</div>

  <div id="hero-left">
    <div class="h-eyebrow">
      <div class="h-eyebrow-dot"></div>
      Since 2009 · South Kensington
    </div>

    <h1 class="h-h1">
      <span class="h-line"><span class="h-line-inner">Essential</span></span>
      <span class="h-line"><span class="h-line-inner"><em>Optimisation</em></span></span>
      <span class="h-line"><span class="h-line-inner">For Your Skin</span></span>
    </h1>

    <p class="h-body">
      Clinical skin, wellness &amp; medical aesthetics — focused on long-term performance and results that actually last.
    </p>

    <div class="h-actions">
      <a href="/" class="n-cta" style="font-size:.68rem;">Book Appointment</a>
      <a href="#services" class="h-explore-link">Explore Treatments</a>
    </div>

    <div class="h-tags">
      <span class="h-tag">Facials</span>
      <span class="h-tag">Laser & IPL</span>
      <span class="h-tag">Botox</span>
      <span class="h-tag">Skin Peels</span>
      <span class="h-tag">Wellness</span>
      <span class="h-tag">Skin Lab AI</span>
    </div>
  </div>

  <div id="hero-right">
    <div class="hero-img-main">
      <img
        src="https://santilondon.com/wp-content/uploads/2024/06/yasmine.webp"
        alt="Yasmine Naghdi at Santi London"
      />
      <div class="hero-img-credit">Yasmine Naghdi · The Royal Ballet</div>
    </div>
    <div class="hero-img-small">
      <div class="hero-img-small-item">
        <img
          src="https://santilondon.com/wp-content/uploads/2023/05/yoanna-hanbury.PNG-jpg.webp"
          alt="Facials"
        />
        <span>Facials</span>
      </div>
      <div class="hero-img-small-item">
        <img
          src="https://santilondon.com/wp-content/uploads/2023/05/IPL-Treatments-in-South-Kensington-jpg.webp"
          alt="Laser"
        />
        <span>Laser</span>
      </div>
    </div>
  </div>
</section>

<!-- ═══════════════ MARQUEE ═══════════════ -->
<div class="mq-wrap">
  <div class="mq-inner">
    {#each Array(2) as _}
      <span class="mq-item"><span>◆</span> Consultant-Led Care</span>
      <span class="mq-item"><span>◆</span> AI Skin Analysis</span>
      <span class="mq-item"><span>◆</span> Evidence-Based</span>
      <span class="mq-item"><span>◆</span> 15+ Years London</span>
      <span class="mq-item"><span>◆</span> GDPR-First</span>
      <span class="mq-item"><span>◆</span> Medical Aesthetics</span>
      <span class="mq-item"><span>◆</span> Bespoke Wellness</span>
    {/each}
  </div>
</div>

<!-- ═══════════════ SERVICES BENTO ═══════════════ -->
<section id="services">
  <div class="services-header">
    <div class="reveal">
      <div class="sec-label">What We Do</div>
      <h2 class="sec-h2">Every Treatment<br />Crafted for <em>You</em></h2>
    </div>
    <p class="services-sub reveal">
      From glow facials to precision laser and consultant-led medical aesthetics — each service is built around your skin, not a menu.
    </p>
  </div>

  <div class="bento-grid">
    <!-- Feature card -->
    <div class="bento-feature reveal" style="grid-column:span 4; grid-row:span 2; min-height:460px;">
      <div>
        <div class="bf-eyebrow">Signature</div>
        <h3 class="bf-h3">Bespoke<br /><em>Facials</em></h3>
        <p class="bf-body">
          Radiance, hydration, deep sculpting — every session tailored to exactly what your skin needs that day. Built around the TheraGlow method.
        </p>
        <a href="/" class="bf-cta">Explore Facials →</a>
      </div>
      <div class="bf-stat">
        <div class="bf-stat-item"><em>15+</em><span>Years</span></div>
        <div class="bf-stat-item"><em>12+</em><span>Treatments</span></div>
        <div class="bf-stat-item"><em>5k+</em><span>Clients</span></div>
      </div>
    </div>

    <div class="bento-img reveal" style="grid-column:span 5; height:220px;">
      <img src="https://santilondon.com/wp-content/uploads/2025/03/IMG_5200.jpg" alt="Skin Peels" />
      <div class="bento-img-label">
        <span class="bi-tag">Advanced</span>
        <h4>Skin Peels</h4>
      </div>
    </div>

    <div class="bento-card reveal" style="grid-column:span 3; height:220px;">
      <div class="bc-num">03</div>
      <div class="bc-icon">◈</div>
      <div class="bc-title">Laser & IPL</div>
      <div class="bc-desc">Precision targeting of redness, pigment and texture. CO₂ resurfacing to thread vein removal.</div>
      <a href="/" class="bc-link">Laser Clinic →</a>
    </div>

    <div class="bento-card reveal" style="grid-column:span 4; height:232px;">
      <div class="bc-num">04</div>
      <div class="bc-icon">✦</div>
      <div class="bc-title">Medical Aesthetics</div>
      <div class="bc-desc">Botox, fillers, skin boosters — consultant-led for subtle, natural results.</div>
      <a href="/" class="bc-link">Aesthetics →</a>
    </div>

    <div class="bento-img reveal" style="grid-column:span 4; height:232px;">
      <img src="https://santilondon.com/wp-content/uploads/2023/04/Masseter-Botox-jpg.webp" alt="Medical Aesthetics" />
      <div class="bento-img-label">
        <span class="bi-tag">Wellbeing</span>
        <h4>Wellness & Massage</h4>
      </div>
    </div>

    <div class="bento-card reveal" style="grid-column:span 3; height:232px; background:#faf9f6;">
      <div class="bc-num">06</div>
      <div class="bc-icon">◇</div>
      <div class="bc-title">Hair Clinic</div>
      <div class="bc-desc">Clinic-grade PRP for hair loss and scalp health. Science-backed, consultant-led.</div>
      <a href="/" class="bc-link">Hair Clinic →</a>
    </div>

    <div class="bento-card reveal" style="grid-column:span 5; height:220px; background:#1a1410; border-color:#1a1410;">
      <div class="bc-num" style="color:rgba(184,150,90,.18)">07</div>
      <div class="bc-icon" style="background:rgba(184,150,90,.1);">◉</div>
      <div class="bc-title" style="color:#f4f1ec;">Skin Lab Analysis</div>
      <div class="bc-desc" style="color:rgba(244,241,236,.35);">
        AI-assisted diagnostic imaging to map your skin precisely and build a smarter long-term plan.
      </div>
      <a href="/" class="bc-link">Skin Lab →</a>
    </div>

    <div class="bento-img reveal" style="grid-column:span 3; height:220px;">
      <img
        src="https://santilondon.com/wp-content/uploads/2023/05/IPL-Treatments-in-South-Kensington-jpg.webp"
        alt="Facials"
      />
      <div class="bento-img-label">
        <span class="bi-tag">Precision</span>
        <h4>Laser & IPL</h4>
      </div>
    </div>
  </div>
</section>

<!-- ═══════════════ PHILOSOPHY ═══════════════ -->
<section id="philosophy">
  <div class="phil-left">
    <div class="sec-label reveal">Our Approach</div>
    <h2 class="sec-h2 reveal">Clinical Precision.<br /><em>Human</em> Touch.</h2>
    <p class="phil-body reveal">
      Great skin is built — not borrowed. Every treatment plan at Santi is consultant-led, evidence-based, and designed to evolve with your skin over the long term. We combine the precision of a medical clinic with the warmth of a private spa.
    </p>
    <div class="phil-img-stack reveal">
      <div class="pis-main">
        <img
          src="https://santilondon.com/wp-content/uploads/2023/05/yoanna-hanbury.PNG-jpg.webp"
          alt="Santi London treatment"
        />
      </div>
      <div class="pis-accent">
        <img src="https://santilondon.com/wp-content/uploads/2023/10/Santi-Beauty-Lounge.webp" alt="Beauty lounge" />
      </div>
      <div class="pis-badge"><strong>15</strong><small>Yrs</small></div>
    </div>
  </div>

  <div class="phil-right">
    {#each [
      { num: '01', title: 'Consultation First',   body: 'Every journey begins with a thorough skin assessment — AI-assisted and consultant-reviewed.' },
      { num: '02', title: 'Precision Treatment',  body: 'Protocols tuned to your exact skin profile, lifestyle, and long-term goals.' },
      { num: '03', title: 'Monitored Progress',   body: 'Ongoing Skin Lab imaging tracks real change — not guesswork.' },
      { num: '04', title: 'Measurable Results',   body: 'Visible, lasting improvement you can see, feel, and compare over time.' },
    ] as p}
      <div class="pillar-item reveal">
        <div class="pillar-num">{p.num}</div>
        <div class="pillar-text">
          <h4>{p.title}</h4>
          <p>{p.body}</p>
        </div>
      </div>
    {/each}
  </div>
</section>

<!-- ═══════════════ AI COMPANION ═══════════════ -->
<section id="companion">
  <div class="comp-left">
    <div class="sec-label reveal" style="color:#b8965a">Intelligent Skincare</div>
    <h2 class="comp-h2 reveal">Santi <em>Skin</em><br />Companion</h2>
    <p class="comp-body reveal">
      Your private, intelligent skin advisor — built by Santi to analyse, guide and evolve with you across every stage of your skincare journey.
    </p>
    <ul class="comp-list reveal">
      <li>Track skin changes with structured check-ins and photo logs</li>
      <li>AI-assisted insights aligned with our Skin Lab findings</li>
      <li>Personalised routines that update as your skin evolves</li>
      <li>Privacy-first — your data stays yours, always</li>
    </ul>
    <a href="/" class="n-cta reveal">Explore Skin Companion</a>
  </div>

  <div class="comp-right reveal">
    <div class="metrics-widget">
      <div class="mw-header">
        <div class="mw-title">Your Skin Report</div>
        <div class="mw-badge">AI Active</div>
      </div>
      {#each [
        { name: 'Hydration', val: '78%', w: 78 },
        { name: 'Radiance',  val: '65%', w: 65 },
        { name: 'Texture',   val: '82%', w: 82 },
        { name: 'Elasticity',val: '71%', w: 71 },
      ] as m}
        <div class="mw-metric">
          <div class="mw-metric-head">
            <span class="mw-metric-name">{m.name}</span>
            <span class="mw-metric-val">{m.val}</span>
          </div>
          <div class="mw-bar"><div class="mw-bar-fill" data-w={m.w}></div></div>
        </div>
      {/each}
      <div class="mw-footer">
        <span class="mw-tag">Consultant-Aligned</span>
        <span class="mw-tag">GDPR-First</span>
        <span class="mw-tag">Built in London</span>
      </div>
    </div>
  </div>
</section>

<!-- ═══════════════ JOURNAL ═══════════════ -->
<section id="journal">
  <div class="journal-header reveal">
    <div>
      <div class="sec-label">Knowledge</div>
      <h2 class="sec-h2">From the <em>Journal</em></h2>
    </div>
    <a href="/" class="view-all-link">View All →</a>
  </div>

  <div class="journal-grid">
    {#each [
      {
        img: 'https://santilondon.com/wp-content/uploads/2023/05/IPL-Treatments-in-South-Kensington-jpg.webp',
        alt: 'PRP',
        cat: 'Hair · 5 min read',
        title: 'The science behind PRP therapy for hair loss',
        desc: 'How platelet-rich plasma supports follicles and what results to expect over multiple sessions.',
      },
      {
        img: 'https://santilondon.com/wp-content/uploads/2023/04/Masseter-Botox-jpg.webp',
        alt: 'Botox',
        cat: 'Medical Aesthetics · 4 min read',
        title: 'Post-Botox care: what to expect',
        desc: 'Simple steps to support smooth, natural results after treatment.',
      },
      {
        img: 'https://santilondon.com/wp-content/uploads/2023/10/Santi-Beauty-Lounge.webp',
        alt: 'IPL',
        cat: 'Laser & IPL · 6 min read',
        title: 'IPL for redness and sun damage',
        desc: 'When IPL is the right choice — and how many sessions you may need.',
      },
    ] as article}
      <a class="jcard reveal" href="/">
        <div class="jcard-img">
          <img src={article.img} alt={article.alt} />
        </div>
        <div class="jcard-body">
          <div class="jcard-cat">{article.cat}</div>
          <div class="jcard-title">{article.title}</div>
          <div class="jcard-desc">{article.desc}</div>
          <span class="jcard-link">Read Article →</span>
        </div>
      </a>
    {/each}
  </div>
</section>

<!-- ═══════════════ CTA BANNER ═══════════════ -->
<section id="cta-banner">
  <div class="cta-left">
    <h2 class="cta-h2 reveal">Visit Us in<br />South <em>Kensington</em></h2>
  </div>
  <div class="cta-right">
    <p class="cta-body reveal">33 Thurloe Street, South Kensington, London SW7 2LQ</p>
    <div class="cta-contacts reveal">
      <div class="cta-contact-item">
        <span>Phone</span><div class="cta-contact-divider"></div>
        <strong>020 7584 7000</strong>
      </div>
      <div class="cta-contact-item">
        <span>WhatsApp</span><div class="cta-contact-divider"></div>
        <strong>+44 7507 389 606</strong>
      </div>
    </div>
    <div class="cta-hours reveal">
      <div class="cta-hours-row"><span>Mon – Fri</span><span>10:00 – 20:00</span></div>
      <div class="cta-hours-row"><span>Saturday</span><span>10:00 – 19:00</span></div>
      <div class="cta-hours-row"><span>Sunday</span><span>10:00 – 19:00</span></div>
    </div>
    <div class="cta-actions reveal">
      <a href="/" class="n-cta">Book Appointment</a>
      <a href="https://wa.me/447507389606" class="cta-wa-btn">WhatsApp Us</a>
    </div>
  </div>
</section>

<!-- ═══════════════ FOOTER ═══════════════ -->
<footer>
  <div class="ft-top">
    <div>
      <div class="ft-brand">Santi London</div>
      <p class="ft-tagline">
        Clinical skin, wellness & medical aesthetics in South Kensington — focused on long-term performance since 2009.
      </p>
      <p class="ft-address">33 Thurloe Street<br />South Kensington, London SW7 2LQ</p>
    </div>
    <div>
      <div class="ft-col-label">Aesthetics</div>
      {#each ['Anti-wrinkle (Botox)', 'Dermal Fillers', 'Skin Boosters', 'CO₂ Laser', 'PRP Therapy', 'Skin Lab'] as link}
        <a href="/" class="ft-link">{link}</a>
      {/each}
    </div>
    <div>
      <div class="ft-col-label">Wellness</div>
      {#each ['Bespoke Facials', 'Massage Therapy', 'Physiotherapy', 'Pregnancy', 'Hair Clinic', 'Holistic'] as link}
        <a href="/" class="ft-link">{link}</a>
      {/each}
    </div>
    <div>
      <div class="ft-col-label">Info</div>
      {#each ['Price List', 'About Us', 'Meet the Team', 'Journal', 'Gift Vouchers', 'Contact'] as link}
        <a href="/" class="ft-link">{link}</a>
      {/each}
    </div>
  </div>
  <div class="ft-bottom">
    <span class="ft-copy">© 2025 Santi London · All rights reserved</span>
    <div class="ft-legal">
      <a href="/">Privacy Policy</a>
      <a href="/">Terms</a>
    </div>
  </div>
</footer>

<div id="badge">✦ Design Proposal</div>

<style>
  /* ─ RESET & BASE ─ */
  :global(*, *::before, *::after) { box-sizing: border-box; margin: 0; padding: 0; }
  :global(html) { overflow-x: hidden; scroll-behavior: smooth; }
  :global(body) {
    font-family: 'Cabinet Grotesk', sans-serif;
    background: #f4f1ec;
    color: #3d3530;
    overflow-x: hidden;
    cursor: none;
  }

  /* ─ CURSOR ─ */
  :global(#cur) {
    position: fixed; width: 8px; height: 8px;
    background: #b8965a; border-radius: 50%;
    pointer-events: none; z-index: 9999;
    transform: translate(-50%, -50%);
    transition: width .25s, height .25s, opacity .25s;
    mix-blend-mode: multiply;
  }
  :global(#cur-ring) {
    position: fixed; width: 32px; height: 32px;
    border: 1px solid rgba(184,150,90,.45); border-radius: 50%;
    pointer-events: none; z-index: 9998;
    transform: translate(-50%, -50%);
  }

  /* ─ GRAIN OVERLAY ─ */
  :global(body::after) {
    content: ''; position: fixed; inset: 0; z-index: 9000; pointer-events: none;
    opacity: .03;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
  }

  /* ─ LOADER ─ */
  :global(#loader) {
    position: fixed; inset: 0; background: #1a1410; z-index: 10000;
    display: flex; align-items: center; justify-content: center;
    flex-direction: column; gap: 2rem;
  }
  :global(#l-word) {
    font-family: 'Fraunces', serif; font-size: 3rem; font-weight: 200;
    color: #f4f1ec; letter-spacing: .1em; overflow: hidden;
  }
  :global(#l-word span) { display: block; transform: translateY(100%); }
  :global(#l-bar) { width: 0; height: 1px; background: linear-gradient(90deg, transparent, #b8965a, transparent); }

  /* ─ NAV ─ */
  :global(#nav) {
    position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
    display: flex; align-items: center; justify-content: space-between;
    padding: 1.6rem 3.5rem;
    transition: padding .4s ease, background .4s ease, border-color .4s ease;
    border-bottom: 1px solid transparent;
    background: rgba(244,241,236,0);
  }
  :global(#nav.stuck) {
    padding: 1rem 3.5rem;
    background: rgba(244,241,236,.94);
    backdrop-filter: blur(20px);
    border-bottom-color: #dbd6cc;
  }

  .n-logo {
    font-family: 'Fraunces', serif; font-size: 1.18rem; font-weight: 300;
    letter-spacing: .14em; color: #1a1410; text-decoration: none;
    transition: color .3s;
  }
  .n-links { display: flex; gap: 2.25rem; align-items: center; }
  .n-link {
    font-size: .64rem; letter-spacing: .22em; text-transform: uppercase;
    color: #9e9286; text-decoration: none;
    transition: color .3s; position: relative;
  }
  .n-link::after {
    content: ''; position: absolute; left: 0; bottom: -2px; width: 0; height: 1px;
    background: #b8965a; transition: width .35s ease;
  }
  .n-link:hover { color: #1a1410; }
  .n-link:hover::after { width: 100%; }
  .n-cta {
    font-size: .65rem; letter-spacing: .2em; text-transform: uppercase;
    padding: .6rem 1.5rem; background: #b8965a; color: #1a1410; font-weight: 500;
    text-decoration: none; transition: background .3s, transform .2s;
    display: inline-block;
  }
  .n-cta:hover { background: #d4b87a; transform: translateY(-1px); }

  /* ─ HERO ─ */
  #hero {
    min-height: 100vh;
    display: grid;
    grid-template-columns: 1fr 480px;
    padding-top: 72px;
    background: #f4f1ec;
    position: relative;
    overflow: hidden;
  }
  #hero-num {
    position: absolute; right: 460px; bottom: -3rem;
    font-family: 'Fraunces', serif; font-size: 26vw; font-weight: 200; line-height: 1;
    color: rgba(184,150,90,.04); pointer-events: none; user-select: none;
    white-space: nowrap;
  }
  #hero-left {
    display: flex; flex-direction: column; justify-content: center;
    padding: 5rem 3.5rem 5rem 5rem;
    position: relative; z-index: 2;
  }
  .h-eyebrow {
    display: inline-flex; align-items: center; gap: .7rem;
    font-size: .62rem; letter-spacing: .32em; text-transform: uppercase;
    color: #b8965a; margin-bottom: 2.2rem;
    opacity: 0; transform: translateY(12px);
  }
  .h-eyebrow-dot { width: 5px; height: 5px; border-radius: 50%; background: #b8965a; }
  .h-h1 {
    font-family: 'Fraunces', serif; font-weight: 200;
    font-size: clamp(3rem, 5.5vw, 5.8rem);
    line-height: 1.02; letter-spacing: -.01em; color: #1a1410;
    margin-bottom: 2rem;
  }
  .h-h1 em { font-style: italic; color: #b8965a; }
  .h-line { overflow: hidden; display: block; }
  .h-line-inner { display: block; transform: translateY(102%); }
  .h-body {
    font-size: .92rem; line-height: 1.85; color: #9e9286; font-weight: 300;
    max-width: 400px; margin-bottom: 3rem;
    opacity: 0;
  }
  .h-actions { display: flex; gap: 1rem; align-items: center; opacity: 0; }
  .h-explore-link {
    font-size: .68rem; letter-spacing: .2em; text-transform: uppercase;
    color: #9e9286; text-decoration: none;
    border-bottom: 1px solid #dbd6cc; padding-bottom: 2px;
    transition: color .3s, border-color .3s;
  }
  .h-explore-link:hover { color: #b8965a; border-color: #b8965a; }
  .h-tags { display: flex; flex-wrap: wrap; gap: .5rem; margin-top: 3.5rem; opacity: 0; }
  .h-tag {
    font-size: .6rem; letter-spacing: .18em; text-transform: uppercase;
    padding: .35rem .85rem; border: 1px solid #dbd6cc; color: #9e9286;
    transition: border-color .3s, color .3s;
  }
  .h-tag:hover { border-color: #b8965a; color: #b8965a; }

  /* ─ HERO RIGHT ─ */
  #hero-right {
    display: flex; flex-direction: column;
    padding: 1.5rem 1.5rem 1.5rem 0;
    gap: .75rem; z-index: 2;
    opacity: 0;
  }
  .hero-img-main {
    flex: 1; min-height: 360px;
    overflow: visible; position: relative;
  }
  .hero-img-main img {
    width: 100%; height: 100%; object-fit: cover;
    object-position: center 15%; display: block;
    filter: brightness(.95) contrast(1.03) saturate(.88);
    transition: transform .9s cubic-bezier(.25,.46,.45,.94), filter .5s ease;
  }
  .hero-img-main:hover img { transform: scale(1.03); filter: brightness(.98) saturate(.94) contrast(1.02); }
  .hero-img-credit {
    position: absolute; bottom: 3.5rem; left: 1.4rem; right: 2.5rem;
    padding: .7rem 1rem;
    background: linear-gradient(to top, rgba(26,20,16,.65) 0%, transparent 100%);
    font-size: .58rem; letter-spacing: .12em; color: rgba(244,241,236,.55);
    font-style: italic; pointer-events: none;
  }
  .hero-img-small {
    display: grid; grid-template-columns: 1fr 1fr;
    gap: .75rem; height: 140px; flex-shrink: 0;
  }
  .hero-img-small-item {
    overflow: hidden; position: relative; background: #dbd6cc;
  }
  .hero-img-small-item img {
    width: 100%; height: 100%; object-fit: cover; display: block;
    filter: brightness(.93) saturate(.82) contrast(1.02);
    transition: transform .7s cubic-bezier(.25,.46,.45,.94);
  }
  .hero-img-small-item:hover img { transform: scale(1.06); }
  .hero-img-small-item span {
    position: absolute; bottom: .6rem; left: .7rem;
    font-size: .55rem; letter-spacing: .18em; text-transform: uppercase;
    color: rgba(244,241,236,.7);
  }

  /* ─ MARQUEE ─ */
  .mq-wrap { overflow: hidden; border-top: 1px solid #dbd6cc; border-bottom: 1px solid #dbd6cc; }
  .mq-inner {
    display: inline-flex; gap: 0; white-space: nowrap;
  }
  .mq-inner:hover { animation-play-state: paused; }
  .mq-item {
    display: inline-flex; align-items: center; gap: 2rem;
    padding: .9rem 2.5rem; border-right: 1px solid #dbd6cc;
    font-size: .62rem; letter-spacing: .26em; text-transform: uppercase; color: #9e9286;
    white-space: nowrap;
  }
  .mq-item span { color: #b8965a; font-size: .7rem; }

  /* ─ SECTION HEADER ─ */
  .sec-label {
    font-size: .6rem; letter-spacing: .34em; text-transform: uppercase; color: #b8965a;
    display: flex; align-items: center; gap: .7rem; margin-bottom: .8rem;
  }
  .sec-label::before { content: ''; width: 22px; height: 1px; background: #b8965a; }
  .sec-h2 {
    font-family: 'Fraunces', serif; font-weight: 200; line-height: 1.1;
    color: #1a1410; font-size: clamp(2.2rem, 3.5vw, 3.6rem);
  }
  .sec-h2 em { font-style: italic; color: #b8965a; }

  /* ─ SERVICES ─ */
  #services { padding: 6rem 4rem; background: #f4f1ec; }
  .services-header {
    display: flex; align-items: flex-end; justify-content: space-between;
    margin-bottom: 3rem; flex-wrap: wrap; gap: 2rem;
  }
  .services-sub {
    font-size: .88rem; line-height: 1.7; color: #9e9286;
    font-weight: 300; max-width: 18rem;
  }

  /* ─ BENTO GRID ─ */
  .bento-grid {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    gap: .85rem;
  }
  .bento-card {
    background: #fff; border: 1px solid #e8e3dc;
    padding: 2rem; position: relative; overflow: hidden;
    transition: border-color .35s, box-shadow .35s, transform .35s;
    cursor: default;
    transform-style: preserve-3d;
  }
  .bento-card:hover {
    border-color: #c8a86a;
    box-shadow: 0 6px 36px rgba(184,150,90,.09);
    transform: translateY(-2px);
  }
  .bc-num {
    font-family: 'Fraunces', serif; font-size: 3.5rem; font-weight: 200;
    color: rgba(184,150,90,.1); line-height: 1;
    position: absolute; top: .6rem; right: 1rem;
    transition: color .4s;
  }
  .bento-card:hover .bc-num { color: rgba(184,150,90,.18); }
  .bc-icon {
    width: 32px; height: 32px; border-radius: 50%; background: #f4f1ec;
    display: flex; align-items: center; justify-content: center;
    margin-bottom: 1.2rem; font-size: 1rem;
    transition: background .3s, transform .3s;
  }
  .bento-card:hover .bc-icon { background: rgba(184,150,90,.12); transform: rotate(8deg); }
  .bc-title {
    font-family: 'Fraunces', serif; font-weight: 300; font-size: 1.2rem;
    color: #1a1410; margin-bottom: .5rem;
  }
  .bc-desc { font-size: .78rem; color: #9e9286; line-height: 1.7; font-weight: 300; }
  .bc-link {
    display: inline-flex; align-items: center; gap: .4rem;
    font-size: .6rem; letter-spacing: .18em; text-transform: uppercase; color: #b8965a;
    text-decoration: none; margin-top: 1.2rem;
    transition: gap .3s;
  }
  .bc-link:hover { gap: .7rem; }

  .bento-img { position: relative; overflow: hidden; border: none; }
  .bento-img img {
    width: 100%; height: 100%; object-fit: cover; display: block;
    filter: brightness(.95) saturate(.82) contrast(1.04);
    transition: transform .85s cubic-bezier(.25,.46,.45,.94), filter .5s;
  }
  .bento-img:hover img { transform: scale(1.06); filter: brightness(.98) saturate(.9) contrast(1.03); }
  .bento-img-label {
    position: absolute; bottom: 0; left: 0; right: 0; padding: 1.4rem 1.6rem;
    background: linear-gradient(to top, rgba(26,20,16,.82) 0%, transparent 100%);
  }
  .bento-img-label h4 {
    font-family: 'Fraunces', serif; font-weight: 300; font-size: 1.05rem; color: #f4f1ec;
  }
  .bi-tag {
    font-size: .55rem; letter-spacing: .22em; text-transform: uppercase;
    color: rgba(244,241,236,.45); margin-bottom: .3rem; display: block;
  }

  .bento-feature {
    background: linear-gradient(150deg, #1e1812 0%, #2a1e14 60%, #1a1410 100%);
    border: none; padding: 2.8rem 2.4rem;
    display: flex; flex-direction: column; justify-content: space-between;
    position: relative; overflow: hidden; cursor: default;
  }
  .bento-feature::before {
    content: ''; position: absolute;
    width: 320px; height: 320px; border-radius: 50%;
    background: radial-gradient(circle, rgba(184,150,90,.12) 0%, transparent 70%);
    top: -100px; right: -100px; pointer-events: none;
  }
  .bento-feature::after {
    content: ''; position: absolute;
    width: 200px; height: 200px; border-radius: 50%;
    background: radial-gradient(circle, rgba(184,150,90,.06) 0%, transparent 70%);
    bottom: -60px; left: -60px; pointer-events: none;
  }
  .bf-eyebrow {
    font-size: .56rem; letter-spacing: .32em; text-transform: uppercase; color: #b8965a;
    margin-bottom: 1.2rem; position: relative; z-index: 1;
  }
  .bf-h3 {
    font-family: 'Fraunces', serif; font-weight: 200; font-size: 2rem; line-height: 1.15;
    color: #f4f1ec; margin-bottom: 1rem; position: relative; z-index: 1;
  }
  .bf-h3 em { font-style: italic; color: #b8965a; }
  .bf-body {
    font-size: .77rem; color: rgba(244,241,236,.4); line-height: 1.8;
    font-weight: 300; max-width: 320px; position: relative; z-index: 1;
  }
  .bf-cta {
    display: inline-flex; align-items: center; gap: .5rem;
    font-size: .6rem; letter-spacing: .18em; text-transform: uppercase; color: #b8965a;
    text-decoration: none; margin-top: 1.4rem; transition: gap .3s; position: relative; z-index: 1;
  }
  .bf-cta:hover { gap: .8rem; }
  .bf-stat {
    display: flex; gap: 2rem;
    padding-top: 1.5rem; border-top: 1px solid rgba(255,255,255,.06);
    position: relative; z-index: 1;
  }
  .bf-stat-item em {
    font-family: 'Fraunces', serif; font-style: normal; font-size: 2rem; font-weight: 200;
    color: #b8965a; display: block; line-height: 1;
  }
  .bf-stat-item span {
    font-size: .56rem; letter-spacing: .2em; text-transform: uppercase;
    color: rgba(244,241,236,.25); margin-top: .25rem; display: block;
  }

  /* ─ PHILOSOPHY ─ */
  #philosophy { display: grid; grid-template-columns: 1fr 1fr; background: #f4f1ec; }
  .phil-left {
    padding: 7rem 5rem;
    border-right: 1px solid #dbd6cc;
    display: flex; flex-direction: column; justify-content: center;
  }
  .phil-body {
    font-size: .88rem; line-height: 1.85; color: #9e9286; font-weight: 300;
    max-width: 400px; margin-bottom: 2.5rem;
  }
  .phil-right {
    padding: 7rem 5rem;
    display: flex; flex-direction: column; justify-content: center; gap: 2.5rem;
  }
  .phil-img-stack { position: relative; align-self: flex-start; margin-top: 3rem; }
  .pis-main { width: 320px; height: 400px; overflow: hidden; border: 1px solid #dbd6cc; }
  .pis-main img {
    width: 100%; height: 100%; object-fit: cover; object-position: center top;
    filter: saturate(.85) contrast(1.02);
    transition: transform .7s cubic-bezier(.25,.46,.45,.94);
  }
  .pis-main:hover img { transform: scale(1.04); }
  .pis-accent {
    position: absolute; bottom: -1.5rem; right: -1.5rem;
    width: 140px; height: 140px; overflow: hidden;
    border: 3px solid #f4f1ec;
    box-shadow: 0 8px 32px rgba(0,0,0,.12);
  }
  .pis-accent img { width: 100%; height: 100%; object-fit: cover; filter: saturate(.85); }
  .pis-badge {
    position: absolute; top: -1rem; left: -1rem;
    width: 80px; height: 80px; border-radius: 50%;
    background: #b8965a; display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    box-shadow: 0 4px 16px rgba(184,150,90,.4);
  }
  .pis-badge strong {
    font-family: 'Fraunces', serif; font-size: 1.5rem; font-weight: 300;
    color: #f4f1ec; line-height: 1;
  }
  .pis-badge small {
    font-size: .48rem; letter-spacing: .12em; text-transform: uppercase;
    color: rgba(244,241,236,.7);
  }
  .pillar-item {
    display: flex; gap: 1.2rem; align-items: flex-start;
    padding: 1.4rem; border: 1px solid #dbd6cc; background: #fff;
    transition: border-color .3s, transform .3s;
  }
  .pillar-item:hover { border-color: #b8965a; transform: translateX(4px); }
  .pillar-num {
    font-family: 'Fraunces', serif; font-size: 1.8rem; font-weight: 200;
    color: #b8965a; line-height: 1; flex-shrink: 0; width: 2.2rem;
  }
  .pillar-text h4 {
    font-size: .75rem; letter-spacing: .15em; text-transform: uppercase;
    color: #1a1410; margin-bottom: .3rem;
  }
  .pillar-text p { font-size: .78rem; color: #9e9286; line-height: 1.65; font-weight: 300; }

  /* ─ COMPANION ─ */
  #companion {
    background: #1a1410; padding: 7rem 5rem;
    display: grid; grid-template-columns: 1fr 1fr; gap: 6rem; align-items: center;
    position: relative; overflow: hidden;
  }
  #companion::before {
    content: ''; position: absolute; inset: 0; pointer-events: none;
    background: repeating-linear-gradient(
      -45deg, transparent, transparent 60px,
      rgba(184,150,90,.018) 60px, rgba(184,150,90,.018) 61px
    );
  }
  .comp-left { position: relative; z-index: 1; }
  .comp-right { position: relative; z-index: 1; }
  .comp-h2 {
    font-family: 'Fraunces', serif; font-weight: 200;
    font-size: clamp(2rem, 3.5vw, 3.4rem);
    line-height: 1.1; color: #f4f1ec; margin-bottom: 1.2rem;
  }
  .comp-h2 em { font-style: italic; color: #b8965a; }
  .comp-body {
    font-size: .88rem; line-height: 1.85; color: rgba(244,241,236,.4);
    font-weight: 300; margin-bottom: 2rem; max-width: 380px;
  }
  .comp-list {
    list-style: none; display: flex; flex-direction: column;
    gap: .9rem; margin-bottom: 2.5rem;
  }
  .comp-list li {
    display: flex; align-items: flex-start; gap: .9rem;
    font-size: .82rem; color: rgba(244,241,236,.55); line-height: 1.65; font-weight: 300;
  }
  .comp-list li::before { content: '—'; color: #b8965a; flex-shrink: 0; margin-top: .05rem; }

  .metrics-widget {
    background: rgba(255,255,255,.03); border: 1px solid rgba(255,255,255,.07);
    padding: 2rem; border-radius: 2px;
  }
  .mw-header {
    display: flex; align-items: center; justify-content: space-between;
    margin-bottom: 1.8rem; padding-bottom: 1.2rem;
    border-bottom: 1px solid rgba(255,255,255,.06);
  }
  .mw-title {
    font-family: 'Fraunces', serif; font-size: 1.1rem; font-weight: 300;
    color: #f4f1ec; font-style: italic;
  }
  .mw-badge {
    font-size: .55rem; letter-spacing: .18em; text-transform: uppercase;
    color: #b8965a; padding: .3rem .7rem; border: 1px solid rgba(184,150,90,.3);
  }
  .mw-metric { margin-bottom: 1.4rem; }
  .mw-metric-head { display: flex; justify-content: space-between; margin-bottom: .6rem; }
  .mw-metric-name {
    font-size: .65rem; letter-spacing: .18em; text-transform: uppercase;
    color: rgba(244,241,236,.35);
  }
  .mw-metric-val { font-family: 'Fraunces', serif; font-size: .95rem; color: #b8965a; }
  .mw-bar { height: 2px; background: rgba(255,255,255,.06); border-radius: 1px; overflow: hidden; }
  .mw-bar-fill {
    height: 100%; background: linear-gradient(90deg, #b8965a, #d4b87a);
    width: 0; border-radius: 1px;
    transition: width 1.6s cubic-bezier(.25,.46,.45,.94);
  }
  .mw-footer {
    display: flex; gap: .5rem; flex-wrap: wrap;
    margin-top: 1.8rem; padding-top: 1.2rem;
    border-top: 1px solid rgba(255,255,255,.06);
  }
  .mw-tag {
    font-size: .55rem; letter-spacing: .16em; text-transform: uppercase;
    border: 1px solid rgba(184,150,90,.25); color: rgba(184,150,90,.6);
    padding: .3rem .6rem;
  }

  /* ─ JOURNAL ─ */
  #journal { padding: 7rem 5rem; background: #edeae3; }
  .journal-header {
    display: flex; align-items: flex-end; justify-content: space-between;
    flex-wrap: wrap; gap: 1.5rem; margin-bottom: 3.5rem;
  }
  .view-all-link {
    font-size: .65rem; letter-spacing: .2em; text-transform: uppercase;
    color: #9e9286; text-decoration: none;
    border-bottom: 1px solid #dbd6cc; padding-bottom: 2px;
    transition: color .3s;
  }
  .view-all-link:hover { color: #b8965a; }
  .journal-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 1.5rem; }
  .jcard {
    background: #fff; border: 1px solid #dbd6cc; overflow: hidden;
    cursor: default; transition: box-shadow .4s, border-color .4s;
    display: flex; flex-direction: column; text-decoration: none;
  }
  .jcard:hover { border-color: #b8965a; box-shadow: 0 8px 40px rgba(0,0,0,.07); }
  .jcard-img { height: 220px; overflow: hidden; flex-shrink: 0; }
  .jcard-img img {
    width: 100%; height: 100%; object-fit: cover; display: block;
    filter: saturate(.82) brightness(.97);
    transition: transform .7s cubic-bezier(.25,.46,.45,.94), filter .4s;
  }
  .jcard:hover .jcard-img img { transform: scale(1.05); filter: saturate(.92) brightness(1); }
  .jcard-body { padding: 1.6rem; flex: 1; display: flex; flex-direction: column; }
  .jcard-cat { font-size: .58rem; letter-spacing: .24em; text-transform: uppercase; color: #b8965a; margin-bottom: .7rem; }
  .jcard-title {
    font-family: 'Fraunces', serif; font-weight: 300; font-size: 1.15rem;
    line-height: 1.35; color: #1a1410; margin-bottom: .8rem; flex: 1;
  }
  .jcard-desc { font-size: .77rem; color: #9e9286; line-height: 1.65; font-weight: 300; margin-bottom: 1.2rem; }
  .jcard-link {
    font-size: .62rem; letter-spacing: .18em; text-transform: uppercase; color: #b8965a;
    display: inline-flex; align-items: center; gap: .4rem; transition: gap .3s;
  }
  .jcard:hover .jcard-link { gap: .7rem; }

  /* ─ CTA BANNER ─ */
  #cta-banner {
    padding: 6rem 5rem; background: #1a1410;
    display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center;
    position: relative; overflow: hidden;
  }
  #cta-banner::after {
    content: 'SANTI'; position: absolute; right: -2rem; top: 50%;
    transform: translateY(-50%);
    font-family: 'Fraunces', serif; font-size: 18rem; font-weight: 200; line-height: 1;
    color: rgba(244,241,236,.025); pointer-events: none; user-select: none;
  }
  .cta-left { position: relative; z-index: 1; }
  .cta-right { position: relative; z-index: 1; }
  .cta-h2 {
    font-family: 'Fraunces', serif; font-weight: 200;
    font-size: clamp(2rem, 4vw, 4rem); line-height: 1.05; color: #f4f1ec;
  }
  .cta-h2 em { font-style: italic; color: #b8965a; }
  .cta-body {
    font-size: .88rem; color: rgba(244,241,236,.4); line-height: 1.8;
    font-weight: 300; margin-bottom: 2.2rem; max-width: 360px;
  }
  .cta-contacts { display: flex; flex-direction: column; gap: .8rem; margin-bottom: 2.4rem; }
  .cta-contact-item {
    font-size: .8rem; color: rgba(244,241,236,.5);
    display: flex; align-items: center; gap: .8rem;
  }
  .cta-contact-item strong { color: #f4f1ec; font-weight: 500; letter-spacing: .05em; }
  .cta-contact-divider { width: 24px; height: 1px; background: rgba(184,150,90,.4); flex-shrink: 0; }
  .cta-hours { border: 1px solid rgba(255,255,255,.07); padding: 1.4rem; margin-bottom: 2rem; }
  .cta-hours-row {
    display: flex; justify-content: space-between; padding: .4rem 0;
    border-bottom: 1px solid rgba(255,255,255,.04); font-size: .78rem;
  }
  .cta-hours-row:last-child { border-bottom: none; }
  .cta-hours-row span:first-child {
    color: rgba(244,241,236,.35); font-size: .65rem; letter-spacing: .14em; text-transform: uppercase;
  }
  .cta-hours-row span:last-child { color: #f4f1ec; font-weight: 400; }
  .cta-actions { display: flex; gap: .75rem; flex-wrap: wrap; }
.cta-wa-btn {
  font-size: .65rem;
  letter-spacing: .2em;
  text-transform: uppercase;
  border: 1px solid rgba(244,241,236,.15);
  color: rgba(244,241,236,.7);
  padding: .6rem 1.4rem;
  text-decoration: none;
  transition: border-color .3s, color .3s, transform .2s;
  display: inline-block;
}

.cta-wa-btn:hover {
  border-color: #b8965a;
  color: #b8965a;
  transform: translateY(-1px);
}

/* ─ FOOTER ─ */
footer {
  padding: 5rem 5rem 3rem;
  background: #0f0b08;
  color: rgba(244,241,236,.5);
}

.ft-top {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 3rem;
  margin-bottom: 3rem;
}

.ft-brand {
  font-family: 'Fraunces', serif;
  font-size: 1.4rem;
  color: #f4f1ec;
  margin-bottom: 1rem;
}

.ft-tagline {
  font-size: .82rem;
  line-height: 1.7;
  margin-bottom: 1rem;
}

.ft-address {
  font-size: .75rem;
  line-height: 1.6;
}

.ft-col-label {
  font-size: .6rem;
  letter-spacing: .25em;
  text-transform: uppercase;
  color: #b8965a;
  margin-bottom: 1rem;
}

.ft-link {
  display: block;
  font-size: .72rem;
  margin-bottom: .5rem;
  color: rgba(244,241,236,.45);
  text-decoration: none;
  transition: color .3s;
}

.ft-link:hover {
  color: #b8965a;
}

.ft-bottom {
  border-top: 1px solid rgba(255,255,255,.06);
  padding-top: 1.4rem;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
}

.ft-copy {
  font-size: .65rem;
}

.ft-legal a {
  font-size: .65rem;
  margin-left: 1rem;
  color: rgba(244,241,236,.45);
  text-decoration: none;
}

.ft-legal a:hover {
  color: #b8965a;
}

/* ─ PROPOSAL BADGE ─ */
#badge {
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  font-size: .55rem;
  letter-spacing: .2em;
  text-transform: uppercase;
  padding: .4rem .7rem;
  border: 1px solid #b8965a;
  color: #b8965a;
  background: rgba(0,0,0,.3);
  backdrop-filter: blur(8px);
}

/* ─ MOBILE RESPONSIVE ─ */
@media (max-width: 1024px) {
  :global(body) { cursor: auto; }
  :global(#cur), :global(#cur-ring) { display: none; }
  :global(#nav) { padding: 1.6rem 2rem; }
  :global(#nav.stuck) { padding: 1rem 2rem; }
  .n-links { gap: 1.5rem; }
  .n-link { font-size: .6rem; }

  #hero {
    grid-template-columns: 1fr;
    padding-top: 60px;
    min-height: auto;
  }
  #hero-num {
    right: 2rem;
    bottom: -2rem;
    font-size: 18vw;
  }
  #hero-left {
    padding: 3rem 2rem;
    order: 2;
  }
  #hero-right {
    padding: 2rem;
    order: 1;
    max-width: 400px;
    margin: 0 auto;
  }
  .hero-img-main { min-height: 300px; }
  .hero-img-small { height: 120px; }

  #services { padding: 4rem 2rem; }
  .services-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1.5rem;
  }
  .services-sub { max-width: none; }

  .bento-grid {
    grid-template-columns: repeat(6, 1fr);
    gap: .6rem;
  }
  .bento-feature {
    grid-column: span 6;
    min-height: 350px;
  }
  .bento-card { padding: 1.5rem; }
  .bc-num { font-size: 2.5rem; }

  #philosophy {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
  .phil-left, .phil-right {
    padding: 4rem 2rem;
    border-right: none;
    border-bottom: 1px solid #dbd6cc;
  }
  .phil-left { border-bottom: 1px solid #dbd6cc; }
  .phil-right { border-bottom: none; }

  #companion {
    grid-template-columns: 1fr;
    gap: 3rem;
    padding: 4rem 2rem;
  }

  #journal { padding: 4rem 2rem; }
  .journal-grid { grid-template-columns: 1fr; gap: 1rem; }

  #cta-banner {
    grid-template-columns: 1fr;
    gap: 2rem;
    padding: 4rem 2rem;
    text-align: center;
  }
  #cta-banner::after { display: none; }
  .cta-actions { justify-content: center; }

  footer { padding: 3rem 2rem 2rem; }
  .ft-top { grid-template-columns: 1fr; gap: 2rem; }
}

@media (max-width: 768px) {
  :global(#nav) { padding: 1.2rem 1.5rem; }
  :global(#nav.stuck) { padding: .8rem 1.5rem; }
  .n-logo { font-size: 1rem; }
  .n-links { display: none; } /* Hide nav links on mobile, could add hamburger menu later */
  .n-cta { font-size: .6rem; padding: .5rem 1rem; }

  #hero-left { padding: 2rem 1.5rem; }
  #hero-right { padding: 1.5rem; }
  .h-h1 { font-size: clamp(2.5rem, 8vw, 4rem); }
  .h-body { font-size: .85rem; max-width: none; }
  .h-actions { flex-direction: column; align-items: flex-start; gap: .8rem; }
  .h-tags { margin-top: 2rem; }

  .mq-item { padding: .7rem 1.5rem; font-size: .55rem; }

  .sec-h2 { font-size: clamp(1.8rem, 6vw, 2.8rem); }

  .bento-grid { grid-template-columns: 1fr; gap: .8rem; }
  .bento-feature { grid-column: span 1; }
  .bento-img { height: 200px; }
  .bento-card { height: auto; }

  .phil-left, .phil-right { padding: 3rem 1.5rem; }
  .phil-img-stack { margin-top: 2rem; }
  .pis-main { width: 280px; height: 350px; }

  .comp-h2 { font-size: clamp(1.8rem, 6vw, 2.8rem); }
  .comp-list { gap: .7rem; }

  .jcard { flex-direction: row; height: auto; }
  .jcard-img { width: 120px; height: 120px; flex-shrink: 0; }
  .jcard-body { padding: 1.2rem; }

  .cta-h2 { font-size: clamp(1.8rem, 7vw, 3rem); }
  .cta-contacts { gap: .6rem; }
  .cta-actions { flex-direction: column; align-items: stretch; }
  .cta-wa-btn { text-align: center; }

  .ft-bottom { flex-direction: column; align-items: center; gap: .5rem; }
  .ft-legal { display: flex; flex-direction: column; align-items: center; gap: .5rem; }
  .ft-legal a { margin-left: 0; }
}

@media (max-width: 480px) {
  :global(#nav) { padding: 1rem 1rem; }
  :global(#nav.stuck) { padding: .7rem 1rem; }
  .n-logo { font-size: .9rem; }
  .n-cta { font-size: .55rem; padding: .45rem .8rem; }

  #hero-left { padding: 1.5rem 1rem; }
  #hero-right { padding: 1rem; }
  .h-eyebrow { margin-bottom: 1.5rem; }
  .h-h1 { font-size: clamp(2rem, 9vw, 3rem); margin-bottom: 1.5rem; }
  .h-body { font-size: .8rem; margin-bottom: 2rem; }
  .h-actions { gap: .6rem; }
  .h-tags { flex-wrap: wrap; gap: .4rem; margin-top: 1.5rem; }
  .h-tag { padding: .3rem .6rem; font-size: .55rem; }

  .hero-img-main { min-height: 250px; }
  .hero-img-small { height: 100px; }

  #services { padding: 3rem 1rem; }
  .services-header { margin-bottom: 2rem; }

  .bento-card { padding: 1.2rem; }
  .bc-num { font-size: 2rem; top: .4rem; right: .8rem; }
  .bc-icon { width: 28px; height: 28px; margin-bottom: 1rem; }
  .bc-title { font-size: 1rem; }
  .bc-desc { font-size: .72rem; }

  .bento-feature { padding: 2rem 1.5rem; min-height: 300px; }
  .bf-h3 { font-size: 1.6rem; }
  .bf-body { font-size: .72rem; }

  .phil-left, .phil-right { padding: 2rem 1rem; }
  .phil-body { font-size: .82rem; }

  .pillar-item { padding: 1rem; gap: 1rem; }
  .pillar-num { font-size: 1.4rem; width: 2rem; }

  #companion { padding: 3rem 1rem; }
  .comp-h2 { font-size: clamp(1.6rem, 7vw, 2.4rem); }
  .comp-body { font-size: .82rem; }

  .metrics-widget { padding: 1.5rem; }

  #journal { padding: 3rem 1rem; }
  .journal-header { margin-bottom: 2rem; }

  .jcard { flex-direction: column; }
  .jcard-img { width: 100%; height: 180px; }
  .jcard-body { padding: 1rem; }

  #cta-banner { padding: 3rem 1rem; }
  .cta-h2 { font-size: clamp(1.6rem, 8vw, 2.5rem); }
  .cta-body { font-size: .82rem; margin-bottom: 1.8rem; }
  .cta-contacts { margin-bottom: 2rem; }
  .cta-hours { padding: 1rem; margin-bottom: 1.5rem; }

  footer { padding: 2rem 1rem 1.5rem; }
  .ft-brand { font-size: 1.2rem; }
  .ft-tagline, .ft-address { font-size: .75rem; }
  .ft-link { font-size: .7rem; }
  .ft-copy, .ft-legal a { font-size: .6rem; }
}
</style>