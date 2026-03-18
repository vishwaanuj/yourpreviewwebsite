
<script>
  import { onMount, tick } from 'svelte';
    import Treatments from './treatments.svelte';

  let menuOpen   = false;
  let intakeOpen = false;
  let email      = '';
  let submitted  = false;
  let aboutExpanded = false;

  // ── Treatments Modal State ──
  let treatmentsOpen = false;
  let selectedCategory = 'all';
  let selectedTreatment = null;

  /* ── nav ── */
  const NAV = [
    { label: 'Home',                  href: '/' },
    { label: 'Monthly Offers',        href: '/monthly-offers' },
    { label: 'Schedule Now',          href: '/schedule-now' },
    { label: 'About Paige',           href: '/about-paige' },
    { label: 'Treatments & Packages', href: '#', modal: true },
    { label: 'Buy Products!',         href: '/buy-products' },
    { label: 'Contact',               href: '/contact' },
  ];
  const INTAKE = [
    ['New Client Facial Intake',       '/new-client-facial-intake'],
    ['Brow Lamination Intake',         '/browlaminationintake'],
    ['Lash Lift Intake',               '/lashlliftintake'],
    ['Derma + PDRN-Nano Intake',       '/derma-pdrn-nano-intake'],
    ['Nanoneedling Intake',            '/nanoneedling-intake'],
    ['DermaplanePro Intake',           '/dermaplanepro-intake'],
    ['DermaplanePro w/ Peel Intake',   '/dermaplanepro-w/-intake'],
    ['Medical PRP Nanoneedle Intake',  '/medical-prp-nanoneedle-intake'],
    ['Medical PRP Microneedle Intake', '/medical-prp-microneedle-intake'],
    ['Microneedle Intake',             '/microneedle-intake-1'],
    ['PDRN Salmon Treatment Intake',   '/pdrn-salmon-treatment-intake'],
    ['Lip Blushing Intake',            '/lip-blushing-intake'],
    ['Chemical Peel Consent Form',     '/chemical-peel-consent-form'],
  ];

  /* ── Treatments Data ── */
  const TREATMENTS = [
    {
      id: 1,
      category: 'prp',
      categoryLabel: 'PRP & Advanced',
      name: 'Medical Grade PRP Nano-Needling Facial',
      price: '$450',
      duration: '90 min',
      tagline: 'Your own blood, reimagined as liquid gold.',
      description: 'PRP facials use Platelet-Rich Plasma drawn directly from your blood to stimulate collagen production and cell regeneration. As a licensed Phlebotomist, Paige draws your blood, processes it in a centrifuge, and applies it via nano-needling for a visibly smoother, firmer, and more radiant complexion.',
      benefits: ['Reduces fine lines & wrinkles', 'Fades acne scars', 'Improves skin texture & tone', 'Minimal downtime', '100% natural — uses your own blood'],
      img: 'https://images.squarespace-cdn.com/content/v1/65dfa464466e783cc78e1294/e28353f0-b891-42ca-935e-a0dcbd7de725/IMG_97017018A041-1.jpeg',
    },
    {
      id: 2,
      category: 'prp',
      categoryLabel: 'PRP & Advanced',
      name: 'Medical Grade PRP Microneedling',
      price: 'Contact for Pricing',
      duration: '90 min',
      tagline: 'Deep renewal meets the power of your own plasma.',
      description: 'Combining the collagen-triggering power of microneedling with Platelet-Rich Plasma, this treatment delivers exceptional skin renewal. The micro-channels allow PRP to penetrate deeply — smoothing fine lines, improving texture, and reducing scars for long-lasting, transformative results.',
      benefits: ['Boosts collagen production', 'Smooths fine lines', 'Improves skin texture', 'Reduces scarring', 'Radiant, healthy glow'],
      img: 'https://images.squarespace-cdn.com/content/v1/65dfa464466e783cc78e1294/7fc4ebce-3ba1-44d5-9980-b4905c49bcd3/Screenshot+2024-10-02+at+12.22.27%E2%80%AFPM.png',
    },
    {
      id: 3,
      category: 'prp',
      categoryLabel: 'PRP & Advanced',
      name: 'PDRN (Salmon Sperm) Microneedling',
      price: '$450',
      duration: '75 min',
      tagline: 'Regenerative science meets luxury skincare.',
      description: 'PDRN derived from salmon DNA is combined with microneedling to penetrate deep skin layers. It stimulates collagen, promotes cellular regeneration, and repairs damaged tissue — ideal for fine lines, acne scars, uneven texture, and hyperpigmentation. Recovery is 3–5 days.',
      benefits: ['Stimulates collagen & repair', 'Targets hyperpigmentation', 'Evens skin texture', 'Reduces fine lines & acne scars', '3–5 day recovery'],
      img: 'https://images.squarespace-cdn.com/content/v1/65dfa464466e783cc78e1294/554f3d52-7ec9-4687-ba7b-1756b98298f0/Screenshot+2025-05-16+at+11.01.17%E2%80%AFAM.png',
    },
    {
      id: 4,
      category: 'needling',
      categoryLabel: 'Needling',
      name: 'Nano-Needling Facial',
      price: '$150',
      duration: '60 min',
      tagline: 'Non-invasive glow — zero downtime.',
      description: 'Non-invasive nano-needling triggers the skin\'s natural healing process, stimulating collagen production without breaking the skin barrier. Paired with Paige\'s European-style massage — scalp, décolletage, hand and arm — this treatment improves texture, evens tone, and enhances product absorption.',
      benefits: ['Zero downtime', 'Improves skin texture', 'Evens skin tone', 'Boosts product absorption', 'European-style massage included'],
      img: 'https://images.squarespace-cdn.com/content/v1/65dfa464466e783cc78e1294/98271d30-c39d-4a2f-8f48-69335cf92bbc/Screenshot+2024-07-08+at+6.59.23%E2%80%AFAM.png',
    },
    {
      id: 5,
      category: 'facial',
      categoryLabel: 'Facials',
      name: "Paige's Signature Facial",
      price: '$100',
      duration: '60 min',
      tagline: 'Clinical precision. Spa-level luxury.',
      description: 'Paige\'s signature facial is meticulously crafted around your unique skin. Using premium products, customized exfoliation and masks, steam hydration, and a European-style massage for your face, scalp, décolletage, hands, and arms — you\'ll leave refreshed, radiant, and utterly rejuvenated.',
      benefits: ['Deeply personalized', 'Premium product blend', 'Steam hydration', 'European massage included', 'Visibly radiant results'],
      img: 'https://images.squarespace-cdn.com/content/v1/65dfa464466e783cc78e1294/de04c300-ed00-45ac-9db3-0b1b55d66a36/Screenshot+2024-06-11+at+1.29.23%E2%80%AFPM.png',
    },
    {
      id: 6,
      category: 'needling',
      categoryLabel: 'Needling',
      name: 'Nano Needling with Custom Peel',
      price: '$225',
      duration: '75 min',
      tagline: 'Brighter, clearer skin — two powerhouses in one.',
      description: 'Combining nano-needling technology with Image Skincare\'s I PEEL Lightening Lift, this treatment targets hyperpigmentation, sun spots, and uneven skin tone. The nano-needling enhances peel absorption while stimulating collagen — delivering a brighter, more luminous complexion.',
      benefits: ['Targets hyperpigmentation', 'Reduces sun spots', 'Enhanced peel absorption', 'Stimulates collagen', 'Suitable for all skin types'],
      img: 'https://images.squarespace-cdn.com/content/v1/65dfa464466e783cc78e1294/95944eca-ee95-43f0-9375-cb71fcd97d72/Screenshot+2024-08-04+at+2.32.22%E2%80%AFPM.png',
    },
    {
      id: 7,
      category: 'dermaplane',
      categoryLabel: 'Dermaplane',
      name: 'DermaplanePro Facial',
      price: '$100',
      duration: '60 min',
      tagline: 'Velvet-smooth skin, instantly.',
      description: 'DermaplanePro is professional-grade physical exfoliation that removes dead skin cells and vellus hair (peach fuzz) in one precise sweep — revealing silky, smooth skin. This treatment primes skin to absorb serums and products up to 70% better.',
      benefits: ['Removes peach fuzz', 'Deep physical exfoliation', 'Boosts product absorption up to 70%', 'Instant smoothness', 'No downtime'],
      img: 'https://images.squarespace-cdn.com/content/v1/65dfa464466e783cc78e1294/f0ac4217-9665-4926-ab76-41f2cee5641c/Screenshot+2024-05-22+at+6.47.41%E2%80%AFPM.png',
    },
    {
      id: 8,
      category: 'dermaplane',
      categoryLabel: 'Dermaplane',
      name: 'DermaplanePro + Custom Peel',
      price: '$150',
      duration: '75 min',
      tagline: 'The ultimate skin reset.',
      description: 'All the benefits of DermaplanePro plus the Happy Peel — a triple exfoliation powerhouse combining physical, chemical, and enzyme exfoliation. Skin will look visibly brighter, smoother, and more even-toned from the very first session.',
      benefits: ['Triple exfoliation method', 'Visibly brighter skin', 'Smoother texture immediately', 'Even skin tone', 'Best of both worlds'],
      img: 'https://images.squarespace-cdn.com/content/v1/65dfa464466e783cc78e1294/f0ac4217-9665-4926-ab76-41f2cee5641c/Screenshot+2024-05-22+at+6.47.41%E2%80%AFPM.png',
    },
    {
      id: 9,
      category: 'brow-lash',
      categoryLabel: 'Brows & Lashes',
      name: 'Brow Lamination',
      price: 'From $85',
      duration: '45 min',
      tagline: 'Effortlessly groomed brows, every morning.',
      description: 'Brow lamination restructures your brow hairs into a uniform, upward shape — giving the appearance of fuller, fluffier brows that hold their style for weeks. Combined with tinting and shaping, it\'s the ultimate low-maintenance brow treatment.',
      benefits: ['Fuller-looking brows', 'Lasts 6–8 weeks', 'No daily styling needed', 'Can be combined with tint', 'Great for sparse or unruly brows'],
      img: 'https://images.squarespace-cdn.com/content/v1/65dfa464466e783cc78e1294/05b29a31-696a-41e9-95c7-0c111c6d568e/Screenshot+2025-05-12+at+6.44.15%E2%80%AFPM.png?format=2500w',
    },
    {
      id: 10,
      category: 'brow-lash',
      categoryLabel: 'Brows & Lashes',
      name: 'Lash Lift',
      price: 'From $95',
      duration: '60 min',
      tagline: 'Wide-awake eyes, no mascara needed.',
      description: 'A lash lift curls your natural lashes from the base, creating the illusion of longer, lifted lashes that open up the eye. Paired with a lash tint, the result is stunning — mascara-level drama without any effort. Results last 6–8 weeks.',
      benefits: ['Lifts & curls natural lashes', 'Lasts 6–8 weeks', 'Can add tint for extra drama', 'Low maintenance', 'Makes eyes appear larger & brighter'],
      img: 'https://images.squarespace-cdn.com/content/v1/65dfa464466e783cc78e1294/1714665360402-E5VR5TTKMB8PZ6XY7SBK/image-asset.jpeg',
    },
    {
      id: 11,
      category: 'lip',
      categoryLabel: 'Lip & Peel',
      name: 'Lip Blushing',
      price: 'Contact for Pricing',
      duration: '2 hrs',
      tagline: 'Your perfect lip color — permanently.',
      description: 'Lip blushing is semi-permanent cosmetic tattooing that deposits soft pigment into the lips to enhance their natural color, shape, and fullness. The result looks incredibly natural — like your lips, but perfected. Color intensity is fully customizable.',
      benefits: ['Semi-permanent color', 'Enhances lip shape & fullness', 'Natural-looking result', 'Customizable intensity', 'Lasts 2–3 years with a touch-up'],
      img: 'https://images.squarespace-cdn.com/content/v1/65dfa464466e783cc78e1294/1714665870653-X8MF3W5GGQPJA8WB5LZE/image-asset.jpeg',
    },
    {
      id: 12,
      category: 'lip',
      categoryLabel: 'Lip & Peel',
      name: 'Chemical Peel',
      price: 'From $75',
      duration: '45 min',
      tagline: 'Reveal the skin you were born with.',
      description: 'Chemical peels use carefully selected acids to dissolve the outer layer of dead skin cells, revealing fresher, more even-toned skin. Paige customizes each peel to your skin type and concern — from gentle lactic acid for sensitive skin to stronger TCA peels for deeper resurfacing.',
      benefits: ['Evens skin tone', 'Reduces dark spots', 'Smooths texture', 'Stimulates cell renewal', 'Fully customized to your skin'],
      img: 'https://images.squarespace-cdn.com/content/v1/65dfa464466e783cc78e1294/e8797f66-1d2a-4b2e-91a8-b65153dc4cd9/Screenshot+2024-08-27+at+7.34.30%E2%80%AFPM.png',
    },
  ];

  const CATEGORIES = [
    { id: 'all', label: 'All Treatments' },
    { id: 'facial', label: 'Facials' },
    { id: 'needling', label: 'Needling' },
    { id: 'prp', label: 'PRP & Advanced' },
    { id: 'dermaplane', label: 'Dermaplane' },
    { id: 'brow-lash', label: 'Brows & Lashes' },
    { id: 'lip', label: 'Lip & Peel' },
  ];

  function getFilteredTreatments() {
    return selectedCategory === 'all'
      ? TREATMENTS
      : TREATMENTS.filter(t => t.category === selectedCategory);
  }

  function openTreatmentsModal(e) {
    e?.preventDefault();
    treatmentsOpen = true;
    selectedTreatment = null;
    selectedCategory = 'all';
    document.body.style.overflow = 'hidden';
  }
  function closeTreatmentsModal() {
    treatmentsOpen = false;
    selectedTreatment = null;
    document.body.style.overflow = '';
  }
  function openTreatmentDetail(t) { selectedTreatment = t; }
  function closeTreatmentDetail() { selectedTreatment = null; }
  function handleModalKeydown(e) {
    if (e.key === 'Escape') {
      if (selectedTreatment) closeTreatmentDetail();
      else closeTreatmentsModal();
    }
  }

  /* ── image URLs ── */
  const IMG = {
    logo:     'https://images.squarespace-cdn.com/content/v1/65dfa464466e783cc78e1294/cafea29f-17ef-4c45-a2cc-547328bb64c6/2.png?format=1500w',
    hero:     'https://images.squarespace-cdn.com/content/v1/65dfa464466e783cc78e1294/1716502051949-UYJOXU7EVS11HF4MA7SP/image-asset.jpeg',
    flower:   'https://images.squarespace-cdn.com/content/v1/624b503a3a6154640a151782/1649102921799-ZRRB9ENBQUSP9C1Z926Z/Frame+10.png?format=2500w',
    paige:    'https://images.squarespace-cdn.com/content/v1/65dfa464466e783cc78e1294/05b29a31-696a-41e9-95c7-0c111c6d568e/Screenshot+2025-05-12+at+6.44.15%E2%80%AFPM.png?format=2500w',
    skincare: 'https://images.squarespace-cdn.com/content/v1/65dfa464466e783cc78e1294/e8797f66-1d2a-4b2e-91a8-b65153dc4cd9/Screenshot+2024-08-27+at+7.34.30%E2%80%AFPM.png',
    sky:      'https://images.squarespace-cdn.com/content/v1/65dfa464466e783cc78e1294/1714665360402-E5VR5TTKMB8PZ6XY7SBK/image-asset.jpeg',
    wordmark: 'https://images.squarespace-cdn.com/content/v1/624b503a3a6154640a151782/1649102907959-N66JW4JRP8T4X3H6H4JV/Frame+3.png',
    satin:    'https://images.squarespace-cdn.com/content/v1/65dfa464466e783cc78e1294/1714665870653-X8MF3W5GGQPJA8WB5LZE/image-asset.jpeg',
    heart:    'https://images.squarespace-cdn.com/content/v1/65dfa464466e783cc78e1294/b83bc298-a79c-4eb7-96cd-737384ed8001/Screenshot+2024-05-02+at+9.03.31%E2%80%AFAM.png',
  };

  function loadScript(src) {
    return new Promise((res, rej) => {
      if (document.querySelector(`script[src="${src}"]`)) { res(); return; }
      const s = document.createElement('script');
      s.src = src; s.onload = res; s.onerror = rej;
      document.head.appendChild(s);
    });
  }

  onMount(async () => {
    await tick();
    await loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js');
    await loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js');

    const { gsap } = window;
    const { ScrollTrigger } = window;
    gsap.registerPlugin(ScrollTrigger);

    gsap.set('.h-eyebrow', { opacity: 0, y: 20 });
    gsap.set('.h-line',    { y: '105%' });
    gsap.set('.h-sub',     { opacity: 0, y: 24 });
    gsap.set('.h-btn',     { opacity: 0, y: 18 });
    gsap.set('.h-stats',   { opacity: 0, y: 20 });
    gsap.set('.scrl-hint', { opacity: 0 });

    const tl = gsap.timeline({ delay: 0.15 });
    tl.from('.hero-photo', { scale: 1.15, duration: 2.4, ease: 'expo.out' }, 0)
      .to('.h-eyebrow',    { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }, 0.5)
      .to('.h-line',       { y: '0%', duration: 1.1, stagger: 0.14, ease: 'expo.out' }, 0.7)
      .to('.h-sub',        { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }, 1.1)
      .to('.h-btn',        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out' }, 1.3)
      .to('.h-stats',      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, 1.5)
      .to('.scrl-hint',    { opacity: 1, duration: 0.7 }, 1.9);

    gsap.to('.hero-photo', {
      yPercent: 25, ease: 'none',
      scrollTrigger: { trigger: '.hero-wrap', start: 'top top', end: 'bottom top', scrub: 1.2 },
    });

    gsap.set('.bc', { opacity: 0, y: 40, scale: 0.97 });
    ScrollTrigger.create({
      trigger: '.bento-grid', start: 'top 78%',
      onEnter: () => gsap.to('.bc', { opacity: 1, y: 0, scale: 1, duration: 0.85, stagger: { each: 0.07, from: 'start' }, ease: 'power3.out' }),
      once: true,
    });

    document.querySelectorAll('.reveal').forEach(el => {
      gsap.set(el, { opacity: 0, y: 38 });
      ScrollTrigger.create({
        trigger: el, start: 'top 82%',
        onEnter: () => gsap.to(el, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }),
        once: true,
      });
    });

    gsap.set('.offer-txt', { opacity: 0, x: -50 });
    gsap.set('.offer-img', { opacity: 0, x: 50 });
    ScrollTrigger.create({
      trigger: '.offer-row', start: 'top 78%',
      onEnter: () => {
        gsap.to('.offer-txt', { opacity: 1, x: 0, duration: 1.1, ease: 'expo.out' });
        gsap.to('.offer-img', { opacity: 1, x: 0, duration: 1.1, ease: 'expo.out', delay: 0.08 });
      },
      once: true,
    });

    /* Beauty Whispers */
    const words = document.querySelectorAll('.bw-word');
    if (words.length) {
      gsap.set(words, { color: 'rgba(26,18,16,0.13)' });
      gsap.set('.bw-top', { opacity: 0, y: 16 });
      ScrollTrigger.create({
        trigger: '.beauty-section', start: 'top 80%',
        onEnter: () => gsap.to('.bw-top', { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }),
        once: true,
      });
      ScrollTrigger.create({
        trigger: '.beauty-section', start: 'top 55%', end: 'bottom 25%', scrub: 0.8,
        onUpdate(self) {
          const p = self.progress;
          const total = words.length;
          words.forEach((w, i) => {
            const threshold = (i / total) * 0.85;
            const lit  = p >= threshold;
            const near = p >= threshold - (0.5 / total);
            gsap.to(w, { color: lit ? '#1a1210' : near ? 'rgba(26,18,16,0.5)' : 'rgba(26,18,16,0.13)', duration: 0.2, ease: 'none', overwrite: 'auto' });
          });
        },
      });
      gsap.set('.bw-bottom', { opacity: 0, y: 30 });
      ScrollTrigger.create({
        trigger: '.bw-bottom', start: 'top 85%',
        onEnter: () => gsap.to('.bw-bottom', { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }),
        once: true,
      });
      gsap.to('.bw-bg-floral', {
        yPercent: -20, ease: 'none',
        scrollTrigger: { trigger: '.beauty-section', start: 'top bottom', end: 'bottom top', scrub: 1.4 },
      });
    }

    gsap.set('.ab-left',  { opacity: 0, x: -50 });
    gsap.set('.ab-right', { opacity: 0, x: 50 });
    ScrollTrigger.create({
      trigger: '.about-section', start: 'top 76%',
      onEnter: () => {
        gsap.to('.ab-left',  { opacity: 1, x: 0, duration: 1.1, ease: 'expo.out' });
        gsap.to('.ab-right', { opacity: 1, x: 0, duration: 1.1, ease: 'expo.out', delay: 0.1 });
      },
      once: true,
    });

    gsap.set('.if-left',  { opacity: 0, x: -50 });
    gsap.set('.if-right', { opacity: 0, x: 50 });
    ScrollTrigger.create({
      trigger: '.intake-section', start: 'top 76%',
      onEnter: () => {
        gsap.to('.if-left',  { opacity: 1, x: 0, duration: 1.1, ease: 'expo.out' });
        gsap.to('.if-right', { opacity: 1, x: 0, duration: 1.1, ease: 'expo.out', delay: 0.1 });
      },
      once: true,
    });

    document.querySelectorAll('[data-mag]').forEach(btn => {
      btn.addEventListener('mousemove', e => {
        const r = btn.getBoundingClientRect();
        gsap.to(btn, { x: (e.clientX - r.left - r.width/2)*0.2, y: (e.clientY - r.top - r.height/2)*0.2, duration: 0.35, ease: 'power2.out' });
      });
      btn.addEventListener('mouseleave', () => gsap.to(btn, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1,0.4)' }));
    });
  });

  function sub(e) { e.preventDefault(); if (email) submitted = true; }

  let form = { name: '', email: '', phone: '', service: '', message: '' };
  let formSent = false;
  let formSending = false;
  const SERVICES = [
    'New Client Consultation','Custom Facial','Microneedling','Brow Lamination',
    'Lash Lift','Chemical Peel','DermaplanePro','DermaplanePro w/ Peel',
    'PRP Nano Needle','PRP Micro Needle','Nano Needling','PDRN Salmon Treatment',
    'Lip Blushing','Derma + PDRN-Nano','Other',
  ];
  function sendForm(e) {
    e.preventDefault();
    formSending = true;
    const body = encodeURIComponent(`Name: ${form.name}\nPhone: ${form.phone}\nEmail: ${form.email}\nService: ${form.service}\n\nMessage:\n${form.message}`);
    window.location.href = `mailto:me@paigeashleyaesthetics.com?subject=Appointment Request — ${form.service}&body=${body}`;
    setTimeout(() => { formSent = true; formSending = false; }, 1400);
  }
</script>

<svelte:head>
  <title>Paige Ashley Aesthetics | Biltmore Phoenix</title>
  <link rel="preconnect" href="https://fonts.googleapis.com"/>
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous"/>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400;1,600&family=Inter:wght@300;400;500&family=Cinzel:wght@400;500&display=swap" rel="stylesheet"/>
</svelte:head>

<svelte:window on:keydown={handleModalKeydown}/>

<!-- ══════════════════ HEADER ══════════════════ -->
<header>
  <div class="hdr-inner">
    <a href="/" class="logo-a">
      <img src={IMG.logo} alt="Paige Ashley Aesthetics" class="hdr-logo"/>
    </a>
    <nav class="desk-nav">
      {#each NAV as n}
        {#if n.modal}
          <button class="n-link n-dd-btn" on:click={openTreatmentsModal}>{n.label}</button>
        {:else}
          <a href={n.href} class="n-link">{n.label}</a>
        {/if}
      {/each}
      <div class="n-dd">
        <button class="n-link n-dd-btn" on:click={() => intakeOpen = !intakeOpen}>
          Intake Forms <span class="caret" class:open={intakeOpen}>›</span>
        </button>
        {#if intakeOpen}
          <div class="dd-menu">
            {#each INTAKE as [label, href]}
              <a {href} class="dd-link">{label}</a>
            {/each}
          </div>
        {/if}
      </div>
    </nav>
    <div class="hdr-right">
      <a href="https://www.facebook.com/PaigeAshleyAesthetics" target="_blank" aria-label="Facebook" class="soc-a">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
      </a>
      <a href="https://www.instagram.com/paigeashleyaesthetics/" target="_blank" aria-label="Instagram" class="soc-a">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>
      </a>
      <button class="burger" on:click={() => menuOpen = !menuOpen} aria-label="Menu">
        <span class:x1={menuOpen}></span>
        <span class:x2={menuOpen}></span>
        <span class:x3={menuOpen}></span>
      </button>
    </div>
  </div>
</header>

{#if menuOpen}
  <div class="mob-overlay">
    <div class="mob-scroll">
      {#each NAV as n}
        {#if n.modal}
          <button class="mob-a" on:click={() => { menuOpen = false; openTreatmentsModal(); }}>{n.label}</button>
        {:else}
          <a href={n.href} class="mob-a" on:click={() => menuOpen = false}>{n.label}</a>
        {/if}
      {/each}
      <button class="mob-a mob-folder" on:click={() => intakeOpen = !intakeOpen}>
        Intake Forms <span class="caret" class:open={intakeOpen}>›</span>
      </button>
      {#if intakeOpen}
        <div class="mob-sub">
          {#each INTAKE as [label, href]}
            <a {href} class="mob-sub-a" on:click={() => menuOpen = false}>{label}</a>
          {/each}
        </div>
      {/if}
      <div style="display:flex;gap:.8rem;margin-top:2rem;">
        <a href="https://www.facebook.com/PaigeAshleyAesthetics" target="_blank" aria-label="Facebook" class="soc-a dark"><svg viewBox="0 0 24 24" fill="currentColor" style="width:22px;height:22px"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg></a>
        <a href="https://www.instagram.com/paigeashleyaesthetics/" target="_blank" aria-label="Instagram" class="soc-a dark"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="width:22px;height:22px"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg></a>
      </div>
    </div>
  </div>
{/if}

<!-- ══════════════════ TREATMENTS MODAL ══════════════════ -->
{#if treatmentsOpen}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div class="tm-backdrop" on:click={closeTreatmentsModal}></div>
  <div class="tm-panel" role="dialog" aria-modal="true" aria-label="Treatments & Packages">

    <!-- Panel Header -->
    <div class="tm-header">
      <div class="tm-header-left">
        <img src={IMG.logo} alt="Paige Ashley Aesthetics" class="tm-logo"/>
        <div class="tm-header-text">
          <h2>Treatments <em>&amp; Packages</em></h2>
          <p>Biltmore · Phoenix, AZ · 206-484-2367</p>
        </div>
      </div>
      <button class="tm-close" on:click={closeTreatmentsModal} aria-label="Close">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    </div>

    {#if selectedTreatment}
      <!-- ── TREATMENT DETAIL VIEW ── -->
      <div class="tm-detail">
        <button class="tm-back" on:click={closeTreatmentDetail}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="14" height="14"><polyline points="15 18 9 12 15 6"/></svg>
          Back to All Treatments
        </button>
        <div class="tm-detail-inner">
          <div class="tm-detail-img">
            <img src={selectedTreatment.img} alt={selectedTreatment.name} loading="lazy"/>
            <div class="tm-detail-img-overlay"></div>
            <div class="tm-detail-price-badge">
              <span class="tm-detail-price">{selectedTreatment.price}</span>
              <span class="tm-detail-dur">{selectedTreatment.duration}</span>
            </div>
          </div>
          <div class="tm-detail-body">
            <span class="tm-cat-pill">{selectedTreatment.categoryLabel}</span>
            <h3 class="tm-detail-name">{selectedTreatment.name}</h3>
            <p class="tm-detail-tagline">{selectedTreatment.tagline}</p>
            <p class="tm-detail-desc">{selectedTreatment.description}</p>
            <div class="tm-detail-benefits">
              <h4>What You'll Experience</h4>
              <ul>
                {#each selectedTreatment.benefits as b}
                  <li><span class="tm-check">✦</span>{b}</li>
                {/each}
              </ul>
            </div>
            <div class="tm-detail-actions">
              <a href="/schedule-now" class="btn-dark">Book This Treatment →</a>
              <a href="https://www.paigeashleyaesthetics.com/treatments-packages" target="_blank" class="tm-ext-link">
                View Full Page ↗
              </a>
            </div>
          </div>
        </div>
      </div>

    {:else}
      <!-- ── TREATMENTS GRID VIEW ── -->
      <div class="tm-body">
        <!-- Category Filter -->
        <div class="tm-cats">
          {#each CATEGORIES as cat}
            <button
              class="tm-cat-btn"
              class:active={selectedCategory === cat.id}
              on:click={() => selectedCategory = cat.id}
            >{cat.label}</button>
          {/each}
        </div>

        <!-- Grid -->
        <div class="tm-grid">
          {#each getFilteredTreatments() as t (t.id)}
            <button class="tm-card" on:click={() => openTreatmentDetail(t)}>
              <div class="tm-card-img">
                <img src={t.img} alt={t.name} loading="lazy"/>
                <div class="tm-card-overlay"></div>
                <span class="tm-card-cat">{t.categoryLabel}</span>
              </div>
              <div class="tm-card-body">
                <h3>{t.name}</h3>
                <p>{t.tagline}</p>
                <div class="tm-card-footer">
                  <span class="tm-card-price">{t.price}</span>
                  <span class="tm-card-cta">Details →</span>
                </div>
              </div>
            </button>
          {/each}
        </div>

        <!-- Footer CTA -->
        <div class="tm-footer-cta">
          <div class="tm-footer-cta-inner">
            <div>
              <p class="tm-footer-eyebrow">Ready to glow?</p>
              <p class="tm-footer-sub">Schedule your personalized treatment at the Biltmore, Phoenix.</p>
            </div>
            <div class="tm-footer-acts">
              <a href="/schedule-now" class="btn-dark">Schedule Now</a>
              <a href="https://www.paigeashleyaesthetics.com/treatments-packages" target="_blank" class="tm-full-link">Full Treatments Page ↗</a>
            </div>
          </div>
        </div>
      </div>
    {/if}
  </div>
{/if}

<!-- ══════════════════ HERO ══════════════════ -->
<section class="hero-wrap">
  <div class="hero-photo-wrap">
    <img src={IMG.hero} alt="Paige Ashley Aesthetics Biltmore Phoenix" class="hero-photo"/>
  </div>
  <div class="ov ov1"></div>
  <div class="ov ov2"></div>
  <div class="ov ov3"></div>
  <div class="hero-copy">
    <p class="h-eyebrow">Paige Ashley Aesthetics · Biltmore · Phoenix, AZ</p>
    <h1 class="h-title">
      <span class="line-clip"><span class="h-line">Hey! You're</span></span>
      <span class="line-clip em-line"><span class="h-line">like so pretty.</span></span>
    </h1>
    <p class="h-sub">Luxury facial treatments, brow artistry &amp; advanced skin wellness — entirely tailored to you at the Biltmore, Phoenix.</p>
    <div class="h-btns">
      <a href="/schedule-now" class="btn-dark h-btn" data-mag>Schedule Treatment</a>
      <button class="btn-ghost h-btn" data-mag on:click={openTreatmentsModal}>View Treatments</button>
      <a href="/monthly-offers" class="btn-ghost h-btn" data-mag>Monthly Offers</a>
    </div>
    <div class="h-stats">
      <div class="stat"><span class="stat-n">500+</span><span class="stat-l">Happy Clients</span></div>
      <div class="stat-div"></div>
      <div class="stat"><span class="stat-n">10+</span><span class="stat-l">Treatments</span></div>
      <div class="stat-div"></div>
      <div class="stat"><span class="stat-n">5★</span><span class="stat-l">Rated</span></div>
    </div>
  </div>
  <img src={IMG.flower} alt="" aria-hidden="true" class="hero-floral"/>
  <div class="scrl-hint">
    <span>scroll</span>
    <div class="scrl-line"></div>
  </div>
</section>

<!-- ══════════════════ MARQUEE ══════════════════ -->
<div class="marquee">
  <div class="mq-track">
    {#each Array(4) as _}
      <span>Facials</span><em>✦</em>
      <span>Microneedling</span><em>✦</em>
      <span>Brow Lamination</span><em>✦</em>
      <span>Lash Lift</span><em>✦</em>
      <span>Chemical Peels</span><em>✦</em>
      <span>Dermaplane Pro</span><em>✦</em>
      <span>PRP Treatments</span><em>✦</em>
      <span>Nano Needling</span><em>✦</em>
      <span>Lip Blushing</span><em>✦</em>
    {/each}
  </div>
</div>

<!-- ══════════════════ BEAUTY WHISPERS ══════════════════ -->
<section class="beauty-section">
  <div class="bw-top reveal">
    <span class="kicker">A Word from Paige</span>
  </div>

  <div class="bw-quote-wrap">
    <!-- Line 1 -->
    <p class="bw-p">
      {#each ['Beauty','whispers','in','the','gentle','breeze,','paints','the','sky','with','hues','of','dawn','and','dusk,'] as word}
        <span class="bw-word">{word}{' '}</span>
      {/each}
    </p>
    <!-- Line 2 italic -->
    <p class="bw-p bw-p2">
      {#each ['and','blooms','in','the','kindness','we','offer','one','another.'] as word}
        <span class="bw-word">{word}{' '}</span>
      {/each}
    </p>
    <!-- Line 3 -->
    <p class="bw-p">
      {#each ["It's","a","reflection","of","our","inner","light,","a","reminder","that","even","in","the","chaos,"] as word}
        <span class="bw-word">{word}{' '}</span>
      {/each}
    </p>
    <!-- Line 4 italic -->
    <p class="bw-p bw-p2">
      {#each ['there','is','always','something','breathtaking','to','behold.'] as word}
        <span class="bw-word">{word}{' '}</span>
      {/each}
    </p>
    <!-- Line 5 -->
    <p class="bw-p">
      {#each ['True','beauty','is','not','a','standard','to','meet,','but','a','story','to','tell —'] as word}
        <span class="bw-word">{word}{' '}</span>
      {/each}
    </p>
    <!-- Line 6 italic -->
    <p class="bw-p bw-p2">
      {#each ['written','in','the','glow','of','skin','that','has','been','deeply','loved','and','cared','for.'] as word}
        <span class="bw-word">{word}{' '}</span>
      {/each}
    </p>
  </div>

  <div class="bw-bottom">
    <div class="bw-bottom-left">
      <div class="bw-img-box">
        <img src={IMG.flower} alt="" aria-hidden="true" class="bw-floral-img" loading="lazy"/>
      </div>
      <span class="bw-pill">Beauty, Inside &amp; Out</span>
    </div>
    <div class="bw-bottom-right">
      <div class="bw-sig">
        <div class="bw-sig-line"></div>
        <span>Paige Ashley Aesthetics · Biltmore · Phoenix</span>
      </div>
      <a href="/schedule-now" class="btn-dark" data-mag>Schedule a Visit</a>
    </div>
  </div>

  <img src={IMG.flower} alt="" aria-hidden="true" class="bw-bg-floral"/>
</section>

<!-- ══════════════════ BENTO GRID ══════════════════ -->
<section class="bento-section">
  <div class="section-intro reveal">
    <span class="kicker">The Studio</span>
    <h2 class="section-h2">Everything You Need for Radiant Skin</h2>
    <p class="section-p">At Paige Ashley Aesthetics in the Biltmore, every treatment is curated with intention.</p>
  </div>

  <div class="bento-grid">
    <div class="bc b1">
      <img src={IMG.paige} alt="Paige Ashley Aesthetics" class="bc-img" loading="lazy" style="object-position:center top"/>
      <div class="bc-dark-grad"></div>
      <div class="bc-body">
        <span class="bc-tag">Welcome</span>
        <h3>Hey! You're<br/><em>like so pretty.</em></h3>
        <a href="/schedule-now" class="bc-btn" data-mag>Book Now →</a>
      </div>
    </div>

    <div class="bc b2 bc-dark">
      <img src={IMG.flower} alt="" aria-hidden="true" class="bc-floral-bg"/>
      <div class="bc-body centered">
        <p class="bc-quote">"Beauty whispers in the gentle breeze and blooms in the kindness we offer one another."</p>
        <span class="bc-cite">— Paige Ashley</span>
      </div>
    </div>

    <div class="bc b3">
      <img src={IMG.sky} alt="Phoenix sky" class="bc-img" loading="lazy"/>
      <div class="bc-dark-grad"></div>
      <div class="bc-body">
        <span class="bc-tag">Give the Gift of Beauty</span>
        <h4>Gift Cards</h4>
        <a href="https://squareup.com/gift/MLFFPGJWZXJ3T/order" target="_blank" class="bc-btn" data-mag>Buy a Gift Card →</a>
      </div>
    </div>

    <div class="bc b4 bc-blush">
      <div class="bc-body">
        <span class="bc-tag">This Month</span>
        <div class="offer-badge-sm">15% OFF</div>
        <h4>Buy One IMAGE Skincare or LiLash Product,<br/>Get the Second 15% Off</h4>
        <a href="/buy-products" class="bc-btn dark" data-mag>Shop Products →</a>
      </div>
      <img src={IMG.skincare} alt="IMAGE Skincare" class="bc-img-fit" loading="lazy"/>
    </div>

    <div class="bc b5">
      <img src={IMG.satin} alt="Soft pink satin" class="bc-img" loading="lazy"/>
      <div class="bc-dark-grad"></div>
      <div class="bc-body">
        <span class="bc-tag">About</span>
        <h4>Meet Paige</h4>
        <a href="/about-paige" class="bc-btn" data-mag>Learn More →</a>
      </div>
    </div>

    <div class="bc b6 bc-cream">
      <img src={IMG.wordmark} alt="Paige Ashley Aesthetics" class="bc-wordmark" loading="lazy"/>
      <div class="bc-body centered" style="margin-top:auto;">
        <p class="bc-services-list">Facials · Microneedling · Brow Lamination · Lash Lift · Chemical Peels · Dermaplane · PRP · Nano Needling · Lip Blushing</p>
        <button class="bc-btn dark" data-mag on:click={openTreatmentsModal} style="border:none;cursor:pointer;">All Treatments →</button>
      </div>
    </div>

    <div class="bc b7 bc-rose">
      <img src={IMG.flower} alt="" aria-hidden="true" class="bc-frame-deco"/>
      <div class="bc-body centered">
        <span class="bc-tag light">Special Offers</span>
        <h4>Monthly<br/>Specials!</h4>
        <a href="/monthly-offers" class="bc-btn light" data-mag>View Offers →</a>
      </div>
    </div>

    <div class="bc b8 bc-cream">
      <img src={IMG.heart} alt="" aria-hidden="true" class="bc-heart"/>
      <div class="bc-body centered">
        <h4>Schedule Your<br/>Visit Today</h4>
        <p class="bc-sub-p">Paige Ashley Aesthetics<br/>Biltmore · Phoenix, AZ<br/>206-484-2367</p>
        <a href="/schedule-now" class="bc-btn dark" data-mag>Schedule Now →</a>
      </div>
    </div>
  </div>
</section>

<!-- ══════════════════ ABOUT PAIGE ══════════════════ -->
<section class="about-section">
  <div class="about-inner">
    <div class="about-img-col ab-left">
      <div class="about-img-frame">
        <img src={IMG.paige} alt="Paige Ashley Guiste" class="about-photo" loading="lazy"/>
        <div class="about-img-overlay"></div>
        <div class="about-img-badge">
          <img src={IMG.flower} alt="" aria-hidden="true" class="badge-flower"/>
        </div>
        <div class="about-nameplate">
          <span class="about-nameplate-name">Paige Ashley Guiste</span>
          <span class="about-nameplate-title">Licensed Aesthetician · Phlebotomist</span>
        </div>
      </div>
      <div class="about-stat-row">
        <div class="about-stat"><span class="about-stat-n">18+</span><span class="about-stat-l">Certifications</span></div>
        <div class="about-stat-div"></div>
        <div class="about-stat"><span class="about-stat-n">500+</span><span class="about-stat-l">Happy Clients</span></div>
        <div class="about-stat-div"></div>
        <div class="about-stat"><span class="about-stat-n">5★</span><span class="about-stat-l">Rated</span></div>
      </div>
    </div>

    <div class="about-text-col ab-right">
      <span class="kicker">Meet Your Aesthetician</span>
      <h2 class="about-h2">Hi! I'm <em>Paige Ashley</em> 👋</h2>
      <div class="about-intro-badges">
        <span class="about-badge">Licensed Esthetician</span>
        <span class="about-badge">Phlebotomist</span>
        <span class="about-badge">Nursing Student</span>
        <span class="about-badge">Biltmore · Phoenix</span>
      </div>
      <p class="about-lead">I'm a passionate and newly licensed Aesthetician &amp; Phlebotomist, dedicated to helping you achieve a glowing complexion and embrace your natural beauty. I chose this profession because I love connecting with humans — nothing makes my heart happier than making people feel relaxed and important. 🥹🩷</p>
      <div class="about-expandable" class:expanded={aboutExpanded}>
        <p>I want to hear about your skin goals and what I can do to help you achieve them. My mission is to provide expert advice, personalized treatments, and the best products to enhance your skin's health and vitality.</p>
        <p>I'm obsessed with all the advanced treatments — PRP, Nano-Needling, Dermaplane — and all the incredible benefits that come with them! Whether you're struggling with acne, looking to reduce fine lines, or simply wanting to pamper yourself, I'm here to guide you every step of the way. 🥹</p>
        <p>✨ Sign up for my Monthly Emails for exclusive offers, skincare secrets, and random events that happen to me. 😂</p>
        <div class="about-certs">
          <h4>My Certifications &amp; Licenses</h4>
          <div class="certs-grid">
            {#each [
              'Licensed Esthetician','Licensed Phlebotomist','National Esthetician Certified',
              'ElleePlex Lash & Brow Lamination','DermaplanePro Certified','Manual Lymphatic Drainage',
              'PRP Microneedling Certified','LightStim LED Certified','Nanobrasion / Needling',
              'Microdermabrasion Certified','Chemical Peel Certified','Spa Body Works Certified',
              'Fearless Beauties Certified','Skin Care Advocate — Impact Melanoma','Oncology Certified',
              'Infection Control Certified','First Aid & CPR Certified','HIV Prevention Certified',
            ] as cert}
              <span class="cert-item">✦ {cert}</span>
            {/each}
          </div>
        </div>
      </div>
      <div class="about-actions">
        <button class="about-toggle" on:click={() => aboutExpanded = !aboutExpanded}>
          {aboutExpanded ? 'Show Less ↑' : 'Read More About Paige ↓'}
        </button>
        <a href="/about-paige" class="btn-dark" data-mag>Full Story →</a>
      </div>
      <img src={IMG.flower} alt="" aria-hidden="true" class="about-flower-deco"/>
    </div>
  </div>
</section>

<!-- ══════════════════ OFFER DETAIL ══════════════════ -->
<section class="offer-section">
  <div class="offer-row">
    <div class="offer-txt">
      <span class="kicker">Featured Offer</span>
      <h2>Buy One IMAGE Skincare<br/>or LiLash Product —<br/><em>Get the Second 15% Off</em></h2>
      <p>Elevate your at-home ritual with clinical-grade skincare and lash serums personally curated by Paige at the Biltmore.</p>
      <div class="offer-acts">
        <a href="/buy-products" class="btn-dark" data-mag>Shop Products</a>
        <a href="/monthly-offers" class="offer-more">See All Offers →</a>
      </div>
    </div>
    <div class="offer-img">
      <div class="offer-frame">
        <img src={IMG.skincare} alt="IMAGE Skincare products" loading="lazy"/>
      </div>
      <div class="offer-pct">15%<br/><small>OFF</small></div>
    </div>
  </div>
</section>

<!-- ══════════════════ INTAKE FORM ══════════════════ -->
<section class="intake-section">
  <div class="intake-inner">
    <div class="if-left">
      <div class="if-img-wrap">
        <img src={IMG.satin} alt="Soft pink satin" loading="lazy" class="if-img"/>
        <div class="if-img-overlay"></div>
        <div class="if-img-text">
          <img src={IMG.logo} alt="Paige Ashley Aesthetics" class="if-logo"/>
          <h3>Book Your<br/><em>Treatment</em></h3>
          <p>At the Biltmore, Phoenix</p>
        </div>
      </div>
      <div class="if-contact-pills">
        <a href="tel:2064842367" class="if-pill">
          <span class="if-pill-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.43 11.5 19.79 19.79 0 0 1 1.35 2.85a2 2 0 0 1 1.99-2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.27a16 16 0 0 0 6 6l.77-.77a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg></span>
          <span>206-484-2367</span>
        </a>
        <a href="mailto:me@paigeashleyaesthetics.com" class="if-pill">
          <span class="if-pill-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg></span>
          <span>me@paigeashleyaesthetics.com</span>
        </a>
        <div class="if-pill no-link">
          <span class="if-pill-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg></span>
          <span>Biltmore · Phoenix, AZ</span>
        </div>
      </div>
      <div class="if-service-tags">
        {#each ['Facials','Microneedling','Brow Lamination','Lash Lift','Chemical Peels','DermaplanePro','PRP','Nano Needling','Lip Blushing'] as svc}
          <span class="if-tag">{svc}</span>
        {/each}
      </div>
    </div>

    <div class="if-right">
      <div class="if-form-header">
        <span class="kicker">Get in Touch</span>
        <h2>Request an<br/><em>Appointment</em></h2>
        <p>Fill out the form and Paige will be in touch to confirm your visit at the Biltmore.</p>
      </div>
      {#if formSent}
        <div class="form-success">
          <div class="fs-icon">✦</div>
          <h3>We've received your request!</h3>
          <p>Paige will reach out at <strong>{form.email || 'your email'}</strong> shortly.</p>
          <a href="/schedule-now" class="btn-dark" data-mag style="margin-top:1.5rem;display:inline-block;">Or Book Online Now</a>
        </div>
      {:else}
        <form class="if-form" on:submit={sendForm}>
          <div class="if-row">
            <div class="if-field">
              <label for="if-name">Full Name <span class="req">*</span></label>
              <input id="if-name" type="text" placeholder="Jane Smith" bind:value={form.name} required/>
            </div>
            <div class="if-field">
              <label for="if-phone">Phone</label>
              <input id="if-phone" type="tel" placeholder="(602) 555-0100" bind:value={form.phone}/>
            </div>
          </div>
          <div class="if-field">
            <label for="if-email">Email Address <span class="req">*</span></label>
            <input id="if-email" type="email" placeholder="you@example.com" bind:value={form.email} required/>
          </div>
          <div class="if-field">
            <label for="if-svc">Treatment of Interest</label>
            <select id="if-svc" bind:value={form.service}>
              <option value="">— Select a treatment —</option>
              {#each SERVICES as s}<option value={s}>{s}</option>{/each}
            </select>
          </div>
          <div class="if-field">
            <label for="if-msg">Message / Questions</label>
            <textarea id="if-msg" rows="4" placeholder="Tell us anything that would help Paige prepare for your visit…" bind:value={form.message}></textarea>
          </div>
          <div class="if-form-footer">
            <button type="submit" class="btn-dark if-submit" data-mag disabled={formSending}>
              {#if formSending}<span class="spinner"></span> Sending…{:else}Send Request{/if}
            </button>
            <p class="if-privacy">Your information is sent directly to<br/><a href="mailto:me@paigeashleyaesthetics.com">me@paigeashleyaesthetics.com</a></p>
          </div>
        </form>
      {/if}
    </div>
  </div>
</section>
<section>
    <Treatments/>
</section>
<!-- ══════════════════ FOOTER ══════════════════ -->
<footer>
  <div class="ft-grid">
    <div class="ft-brand reveal">
      <img src={IMG.logo} alt="Paige Ashley Aesthetics" class="ft-logo"/>
      <p>Where beauty meets intention.<br/>Biltmore · Phoenix, Arizona.</p>
      <div class="ft-socs">
        <a href="https://www.facebook.com/PaigeAshleyAesthetics" target="_blank" aria-label="Facebook" class="soc-a light"><svg viewBox="0 0 24 24" fill="currentColor" style="width:20px;height:20px"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg></a>
        <a href="https://www.instagram.com/paigeashleyaesthetics/" target="_blank" aria-label="Instagram" class="soc-a light"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="width:20px;height:20px"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg></a>
      </div>
    </div>
    <div class="ft-news reveal">
      <h3>Monthly Offers in Your Inbox</h3>
      <p>Every month brings a fresh special — be the first to know.</p>
      {#if submitted}
        <p class="ty">Thank you! You're on the list ✦</p>
      {:else}
        <form class="nl" on:submit={sub}>
          <input type="email" placeholder="your@email.com" bind:value={email} required/>
          <button type="submit" class="btn-dark" data-mag>Sign Up</button>
        </form>
      {/if}
    </div>
    <div class="ft-contact reveal">
      <h3>Get in Touch</h3>
      <p><a href="tel:2064842367">206-484-2367</a></p>
      <p><a href="mailto:me@paigeashleyaesthetics.com">me@paigeashleyaesthetics.com</a></p>
      <a href="/schedule-now" class="btn-dark" style="display:inline-block;margin-top:1.3rem;" data-mag>Book Now</a>
    </div>
  </div>
  <div class="ft-bar">
    <p>© {new Date().getFullYear()} Paige Ashley Aesthetics · Biltmore · Phoenix, AZ</p>
    <div style="display:flex;gap:2rem;">
      <a href="/contact">Contact</a>
      <button class="ft-link" on:click={openTreatmentsModal}>Treatments</button>
      <a href="/monthly-offers">Offers</a>
    </div>
  </div>
</footer>
<style>
:global(*,*::before,*::after){box-sizing:border-box;margin:0;padding:0}
:global(html){scroll-behavior:smooth}
:global(body){font-family:'Inter',sans-serif;background:#fff;color:#1a1210;overflow-x:hidden}
:global(a){text-decoration:none;color:inherit}
:global(img){display:block;max-width:100%}

:root{
  --cream:#fdf8f5;--blush:#f4cdd7;--rose:#c9778b;--deep:#8b3a52;
  --char:#1a1210;--muted:#6b5e5a;--dark:#130d0b;--H:72px;
}

/* BUTTONS */
.btn-dark{display:inline-block;padding:.78rem 2rem;background:var(--char);color:#fff;font-family:'Inter',sans-serif;font-size:.7rem;font-weight:500;letter-spacing:.16em;text-transform:uppercase;border:1.5px solid var(--char);cursor:pointer;transition:background .3s,border-color .3s;will-change:transform}
.btn-dark:hover{background:var(--deep);border-color:var(--deep)}
.btn-ghost{display:inline-block;padding:.78rem 2rem;background:transparent;color:#fff;font-family:'Inter',sans-serif;font-size:.7rem;font-weight:400;letter-spacing:.16em;text-transform:uppercase;border:1.5px solid rgba(255,255,255,.5);cursor:pointer;transition:background .3s,border-color .3s;will-change:transform}
.btn-ghost:hover{background:rgba(255,255,255,.1);border-color:#fff}

/* HEADER */
header{position:fixed;top:0;left:0;right:0;z-index:200;height:var(--H);background:#fff;border-bottom:1px solid rgba(26,18,16,.09);box-shadow:0 2px 18px rgba(26,18,16,.06)}
.hdr-inner{max-width:1440px;margin:0 auto;padding:0 2.5rem;height:100%;display:flex;align-items:center;justify-content:space-between;gap:1rem}
.hdr-logo{height:46px;width:auto;object-fit:contain}
.desk-nav{display:flex;align-items:center;flex:1;justify-content:center;flex-wrap:wrap}
.n-link{font-family:'Inter',sans-serif;font-size:.64rem;font-weight:400;letter-spacing:.12em;text-transform:uppercase;padding:.45rem .65rem;color:var(--char);background:none;border:none;cursor:pointer;position:relative;transition:color .25s}
.n-link::after{content:'';position:absolute;bottom:0;left:.65rem;right:.65rem;height:1.5px;background:var(--rose);transform:scaleX(0);transition:transform .3s}
.n-link:hover{color:var(--deep)}
.n-link:hover::after{transform:scaleX(1)}
.n-dd{position:relative}
.n-dd-btn{display:flex;align-items:center;gap:.22rem}
.caret{display:inline-block;transition:transform .25s;font-style:normal}
.caret.open{transform:rotate(90deg)}
.dd-menu{position:absolute;top:calc(100% + 6px);left:0;min-width:228px;background:#fff;border:1px solid rgba(26,18,16,.1);box-shadow:0 16px 48px rgba(26,18,16,.12);padding:.4rem 0;z-index:300}
.dd-link{display:block;padding:.48rem 1.1rem;font-family:'Inter',sans-serif;font-size:.68rem;letter-spacing:.04em;color:var(--char);transition:background .2s,color .2s}
.dd-link:hover{background:var(--blush);color:var(--deep)}
.hdr-right{display:flex;align-items:center;gap:.7rem;flex-shrink:0}
.soc-a{width:19px;height:19px;display:flex;align-items:center;color:var(--char);transition:color .3s,transform .25s}
.soc-a svg{width:100%;height:100%}
.soc-a:hover{color:var(--rose);transform:scale(1.18)}
.soc-a.light{color:rgba(255,255,255,.5)}
.soc-a.light:hover{color:var(--blush)}
.soc-a.dark{color:var(--char)}
.soc-a.dark:hover{color:var(--rose)}
.burger{display:none;flex-direction:column;gap:5px;background:none;border:none;cursor:pointer;padding:.3rem}
.burger span{display:block;width:21px;height:1px;background:var(--char);transition:all .28s;transform-origin:center}
.burger span.x1{transform:rotate(45deg) translate(4px,4px)}
.burger span.x2{opacity:0;transform:scaleX(0)}
.burger span.x3{transform:rotate(-45deg) translate(4px,-4px)}

/* MOBILE OVERLAY */
.mob-overlay{position:fixed;inset:0;background:#fff;z-index:190;padding-top:var(--H);overflow-y:auto}
.mob-scroll{padding:1.5rem 2rem 4rem;display:flex;flex-direction:column}
.mob-a{display:block;padding:.85rem 0;font-family:'Cormorant Garamond',serif;font-size:1.45rem;color:var(--char);border-bottom:1px solid rgba(26,18,16,.07);background:none;border-top:none;border-left:none;border-right:none;text-align:left;cursor:pointer;transition:color .22s}
.mob-a:hover{color:var(--deep)}
.mob-folder{font-family:'Cormorant Garamond',serif;font-size:1.45rem;display:flex;justify-content:space-between;align-items:center}
.mob-sub{padding:.3rem 0 .3rem 1.3rem}
.mob-sub-a{display:block;padding:.38rem 0;font-size:.82rem;color:var(--muted);transition:color .2s}
.mob-sub-a:hover{color:var(--deep)}

/* TREATMENTS MODAL */
.tm-backdrop{position:fixed;inset:0;z-index:400;background:rgba(13,9,8,.65);backdrop-filter:blur(6px);animation:tmFadeIn .3s ease}
@keyframes tmFadeIn{from{opacity:0}to{opacity:1}}
.tm-panel{position:fixed;top:0;right:0;bottom:0;width:min(92vw,1080px);z-index:401;background:#fff;display:flex;flex-direction:column;overflow:hidden;box-shadow:-24px 0 80px rgba(13,9,8,.22);animation:tmSlideIn .4s cubic-bezier(.16,1,.3,1)}
@keyframes tmSlideIn{from{transform:translateX(100%)}to{transform:translateX(0)}}
.tm-header{display:flex;align-items:center;justify-content:space-between;padding:1.4rem 2.4rem;border-bottom:1px solid rgba(26,18,16,.09);background:var(--cream);flex-shrink:0}
.tm-header-left{display:flex;align-items:center;gap:1.2rem}
.tm-logo{height:36px;object-fit:contain}
.tm-header-text h2{font-family:'Cormorant Garamond',serif;font-size:1.35rem;font-weight:600;color:var(--char);line-height:1.2}
.tm-header-text h2 em{font-style:italic;color:var(--deep)}
.tm-header-text p{font-family:'Inter',sans-serif;font-size:.6rem;letter-spacing:.14em;text-transform:uppercase;color:var(--muted);margin-top:.18rem}
.tm-close{width:38px;height:38px;display:flex;align-items:center;justify-content:center;background:none;border:1px solid rgba(26,18,16,.15);border-radius:50%;cursor:pointer;color:var(--char);flex-shrink:0;transition:background .25s,transform .3s,border-color .25s}
.tm-close svg{width:16px;height:16px}
.tm-close:hover{background:var(--blush);border-color:var(--rose);transform:rotate(90deg)}
.tm-body{flex:1;overflow-y:auto;display:flex;flex-direction:column;overscroll-behavior:contain}
.tm-body::-webkit-scrollbar{width:4px}
.tm-body::-webkit-scrollbar-track{background:var(--cream)}
.tm-body::-webkit-scrollbar-thumb{background:var(--blush)}
.tm-cats{display:flex;flex-wrap:wrap;gap:.5rem;padding:1.4rem 2.4rem 1rem;border-bottom:1px solid rgba(26,18,16,.07);flex-shrink:0;background:#fff;position:sticky;top:0;z-index:10;box-shadow:0 2px 8px rgba(26,18,16,.04)}
.tm-cat-btn{padding:.35rem 1rem;font-family:'Inter',sans-serif;font-size:.58rem;font-weight:500;letter-spacing:.1em;text-transform:uppercase;border:1.5px solid rgba(26,18,16,.14);background:transparent;color:var(--muted);border-radius:100px;cursor:pointer;transition:all .22s}
.tm-cat-btn:hover{border-color:var(--rose);color:var(--deep);background:var(--blush)}
.tm-cat-btn.active{background:var(--char);color:#fff;border-color:var(--char)}
.tm-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(270px,1fr));gap:1.1rem;padding:1.6rem 2.4rem;flex:1}
.tm-card{display:flex;flex-direction:column;background:#fff;border:1px solid rgba(26,18,16,.08);border-radius:6px;overflow:hidden;cursor:pointer;text-align:left;transition:transform .32s cubic-bezier(.16,1,.3,1),box-shadow .32s,border-color .32s;will-change:transform}
.tm-card:hover{transform:translateY(-5px);box-shadow:0 18px 44px rgba(26,18,16,.12);border-color:var(--blush)}
.tm-card:focus-visible{outline:2px solid var(--rose);outline-offset:2px}
.tm-card-img{position:relative;height:178px;overflow:hidden;flex-shrink:0}
.tm-card-img img{width:100%;height:100%;object-fit:cover;transition:transform .65s cubic-bezier(.16,1,.3,1)}
.tm-card:hover .tm-card-img img{transform:scale(1.07)}
.tm-card-overlay{position:absolute;inset:0;background:linear-gradient(to top,rgba(13,9,8,.55) 0%,transparent 55%)}
.tm-card-cat{position:absolute;top:.7rem;left:.7rem;font-family:'Inter',sans-serif;font-size:.5rem;letter-spacing:.16em;text-transform:uppercase;background:rgba(255,255,255,.14);color:#fff;backdrop-filter:blur(8px);padding:.25rem .65rem;border-radius:100px;border:1px solid rgba(255,255,255,.22)}
.tm-card-body{padding:1.05rem 1.15rem 1.2rem;display:flex;flex-direction:column;flex:1}
.tm-card-body h3{font-family:'Cormorant Garamond',serif;font-size:1.05rem;font-weight:600;color:var(--char);line-height:1.25;margin-bottom:.4rem}
.tm-card-body p{font-family:'Inter',sans-serif;font-size:.73rem;font-weight:300;color:var(--muted);line-height:1.6;flex:1;margin-bottom:.9rem;font-style:italic}
.tm-card-footer{display:flex;align-items:center;justify-content:space-between}
.tm-card-price{font-family:'Cormorant Garamond',serif;font-size:1.05rem;font-weight:600;color:var(--deep)}
.tm-card-cta{font-family:'Inter',sans-serif;font-size:.58rem;font-weight:500;letter-spacing:.12em;text-transform:uppercase;color:var(--rose);transition:letter-spacing .22s,color .22s}
.tm-card:hover .tm-card-cta{letter-spacing:.18em;color:var(--deep)}
.tm-footer-cta{background:var(--dark);padding:1.8rem 2.4rem;flex-shrink:0}
.tm-footer-cta-inner{display:flex;align-items:center;justify-content:space-between;gap:1.5rem;flex-wrap:wrap}
.tm-footer-eyebrow{font-family:'Cormorant Garamond',serif;font-size:1.45rem;font-weight:600;color:var(--blush);font-style:italic;margin-bottom:.2rem}
.tm-footer-sub{font-family:'Inter',sans-serif;font-size:.78rem;font-weight:300;color:rgba(255,255,255,.42)}
.tm-footer-acts{display:flex;align-items:center;gap:1.4rem;flex-wrap:wrap}
.tm-full-link{font-family:'Inter',sans-serif;font-size:.62rem;letter-spacing:.12em;text-transform:uppercase;color:rgba(255,255,255,.38);transition:color .22s}
.tm-full-link:hover{color:var(--blush)}
.tm-detail{flex:1;overflow-y:auto;display:flex;flex-direction:column}
.tm-detail::-webkit-scrollbar{width:4px}
.tm-detail::-webkit-scrollbar-thumb{background:var(--blush)}
.tm-back{display:flex;align-items:center;gap:.5rem;margin:1.3rem 2.4rem .6rem;font-family:'Inter',sans-serif;font-size:.6rem;font-weight:500;letter-spacing:.12em;text-transform:uppercase;color:var(--muted);background:none;border:none;cursor:pointer;width:fit-content;padding:.4rem 0;transition:color .22s}
.tm-back:hover{color:var(--deep)}
.tm-detail-inner{display:grid;grid-template-columns:1.05fr 1fr;flex:1;min-height:0}
.tm-detail-img{position:relative;overflow:hidden;min-height:300px}
.tm-detail-img img{width:100%;height:100%;object-fit:cover}
.tm-detail-img-overlay{position:absolute;inset:0;background:linear-gradient(to top,rgba(13,9,8,.6) 0%,transparent 55%)}
.tm-detail-price-badge{position:absolute;bottom:1.6rem;left:1.6rem;background:rgba(255,255,255,.1);backdrop-filter:blur(14px);border:1px solid rgba(255,255,255,.2);padding:.8rem 1.3rem;border-radius:4px}
.tm-detail-price{display:block;font-family:'Cormorant Garamond',serif;font-size:1.9rem;font-weight:700;color:#fff;line-height:1}
.tm-detail-dur{display:block;font-family:'Inter',sans-serif;font-size:.54rem;letter-spacing:.16em;text-transform:uppercase;color:rgba(255,255,255,.6);margin-top:.3rem}
.tm-detail-body{padding:2.2rem 2.4rem;overflow-y:auto;display:flex;flex-direction:column;gap:.9rem;background:var(--cream)}
.tm-detail-body::-webkit-scrollbar{width:4px}
.tm-detail-body::-webkit-scrollbar-thumb{background:var(--blush)}
.tm-cat-pill{display:inline-block;font-family:'Inter',sans-serif;font-size:.54rem;letter-spacing:.16em;text-transform:uppercase;background:var(--blush);color:var(--deep);padding:.26rem .78rem;border-radius:100px;width:fit-content}
.tm-detail-name{font-family:'Cormorant Garamond',serif;font-size:1.5rem;font-weight:700;color:var(--char);line-height:1.2}
.tm-detail-tagline{font-family:'Cormorant Garamond',serif;font-style:italic;font-size:1.02rem;color:var(--deep);line-height:1.5}
.tm-detail-desc{font-family:'Inter',sans-serif;font-size:.8rem;font-weight:300;color:var(--muted);line-height:1.82}
.tm-detail-benefits{margin-top:.3rem}
.tm-detail-benefits h4{font-family:'Inter',sans-serif;font-size:.58rem;font-weight:500;letter-spacing:.16em;text-transform:uppercase;color:var(--muted);margin-bottom:.7rem}
.tm-detail-benefits ul{list-style:none;display:flex;flex-direction:column;gap:.48rem}
.tm-detail-benefits li{display:flex;align-items:flex-start;gap:.6rem;font-family:'Inter',sans-serif;font-size:.78rem;font-weight:300;color:var(--char)}
.tm-check{color:var(--rose);font-size:.58rem;flex-shrink:0;margin-top:.12rem}
.tm-detail-actions{display:flex;align-items:center;gap:1.2rem;flex-wrap:wrap;margin-top:auto;padding-top:1rem}
.tm-ext-link{font-family:'Inter',sans-serif;font-size:.6rem;letter-spacing:.12em;text-transform:uppercase;color:var(--muted);transition:color .22s}
.tm-ext-link:hover{color:var(--deep)}

/* HERO */
.hero-wrap{position:relative;height:100vh;min-height:680px;overflow:hidden;display:flex;align-items:flex-end;padding-bottom:7vh}
.hero-photo-wrap{position:absolute;inset:0;overflow:hidden}
.hero-photo{position:absolute;top:-10%;left:0;right:0;width:100%;height:120%;object-fit:cover;object-position:center 18%;will-change:transform;transform-origin:center top}
.ov{position:absolute;inset:0;pointer-events:none}
.ov1{background:linear-gradient(105deg,rgba(13,9,8,.78) 0%,rgba(13,9,8,.4) 50%,rgba(13,9,8,.22) 100%)}
.ov2{background:linear-gradient(to top,rgba(13,9,8,.85) 0%,transparent 50%)}
.ov3{background:linear-gradient(to right,rgba(139,58,82,.18),transparent 60%)}
.hero-copy{position:relative;z-index:10;max-width:1440px;width:100%;margin:0 auto;padding:0 5rem;padding-top:var(--H)}
.h-eyebrow{font-family:'Inter',sans-serif;font-size:.62rem;letter-spacing:.3em;text-transform:uppercase;color:rgba(244,205,215,.85);margin-bottom:1.4rem}
.line-clip{display:block;overflow:hidden;line-height:1.04}
.em-line{margin-top:.04em}
.h-line{display:block;font-family:'Cormorant Garamond',serif;font-size:clamp(4.2rem,9vw,9rem);font-weight:700;color:#fff;line-height:1.0;will-change:transform}
.em-line .h-line{font-style:italic;color:var(--blush)}
.h-sub{font-family:'Inter',sans-serif;font-size:.92rem;font-weight:300;color:rgba(255,255,255,.65);max-width:440px;line-height:1.75;margin:1.6rem 0 2.5rem}
.h-btns{display:flex;gap:.9rem;flex-wrap:wrap;margin-bottom:3rem}
.h-stats{display:flex;align-items:center;background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.13);backdrop-filter:blur(10px);padding:.85rem 1.6rem;width:fit-content;will-change:transform}
.stat{display:flex;flex-direction:column;align-items:center;padding:0 1.4rem}
.stat-n{font-family:'Cormorant Garamond',serif;font-size:1.7rem;font-weight:600;color:var(--blush);line-height:1}
.stat-l{font-family:'Inter',sans-serif;font-size:.58rem;letter-spacing:.14em;text-transform:uppercase;color:rgba(255,255,255,.5);margin-top:.2rem}
.stat-div{width:1px;height:36px;background:rgba(255,255,255,.16)}
.hero-floral{position:absolute;bottom:-1rem;right:3rem;z-index:5;width:200px;opacity:.18;pointer-events:none;transform:rotate(-12deg)}
.scrl-hint{position:absolute;bottom:2.5rem;right:4rem;z-index:10;display:flex;flex-direction:column;align-items:center;gap:.5rem}
.scrl-hint span{font-family:'Inter',sans-serif;font-size:.52rem;letter-spacing:.25em;text-transform:uppercase;color:rgba(255,255,255,.35);writing-mode:vertical-rl}
.scrl-line{width:1px;height:52px;background:linear-gradient(to bottom,rgba(255,255,255,.35),transparent);animation:lp 2.4s ease-in-out infinite}
@keyframes lp{0%,100%{opacity:.35;transform:scaleY(1)}50%{opacity:.1;transform:scaleY(.5)}}

/* MARQUEE */
.marquee{background:var(--dark);padding:.9rem 0;overflow:hidden}
.mq-track{display:flex;width:max-content;animation:mq 32s linear infinite}
.mq-track span{font-family:'Cormorant Garamond',serif;font-style:italic;font-size:1.05rem;color:var(--blush);padding:0 1rem;flex-shrink:0}
.mq-track em{font-style:normal;font-size:.52rem;color:var(--rose);align-self:center}
@keyframes mq{from{transform:translateX(0)}to{transform:translateX(-25%)}}

/* SHARED */
.kicker{display:inline-block;font-family:'Inter',sans-serif;font-size:.58rem;letter-spacing:.28em;text-transform:uppercase;color:var(--rose);margin-bottom:.7rem}
.section-intro{text-align:center;margin-bottom:3.5rem}
.section-h2{font-family:'Cormorant Garamond',serif;font-size:clamp(1.8rem,3.5vw,3rem);font-weight:400;color:var(--char);margin-bottom:.6rem}
.section-p{font-family:'Inter',sans-serif;font-size:.88rem;font-weight:300;color:var(--muted)}

/* BEAUTY WHISPERS — 6 lines */
.beauty-section{position:relative;background:var(--cream);padding:7rem 5rem 6.5rem;overflow:hidden}
.bw-bg-floral{position:absolute;top:50%;right:-8rem;transform:translateY(-50%);width:520px;opacity:.055;pointer-events:none;will-change:transform;user-select:none}
.bw-top{max-width:1180px;margin:0 auto;margin-bottom:3rem}
.bw-quote-wrap{max-width:1180px;margin:0 auto;position:relative;z-index:2;display:flex;flex-direction:column;gap:.05em}
.bw-p{font-family:'Cormorant Garamond',serif;font-size:clamp(1.65rem,2.8vw,2.6rem);font-weight:300;line-height:1.55;letter-spacing:-.01em;color:var(--char)}
.bw-p2{font-style:italic}
.bw-word{display:inline;white-space:pre;transition:color .18s ease;will-change:color}
.bw-bottom{max-width:1180px;margin:4rem auto 0;display:flex;align-items:center;justify-content:space-between;gap:2rem;flex-wrap:wrap;position:relative;z-index:2;will-change:opacity,transform}
.bw-bottom-left{display:flex;align-items:center;gap:1.4rem}
.bw-img-box{width:80px;height:80px;background:var(--dark);border-radius:50%;overflow:hidden;display:flex;align-items:center;justify-content:center;flex-shrink:0;box-shadow:0 4px 18px rgba(26,18,16,.18)}
.bw-floral-img{width:64px;height:64px;object-fit:contain;filter:invert(1);opacity:.8}
.bw-pill{font-family:'Inter',sans-serif;font-size:.6rem;letter-spacing:.2em;text-transform:uppercase;color:var(--deep);background:var(--blush);padding:.45rem 1.1rem;border-radius:100px;white-space:nowrap}
.bw-bottom-right{display:flex;align-items:center;gap:2.5rem;flex-wrap:wrap}
.bw-sig{display:flex;align-items:center;gap:.9rem}
.bw-sig-line{width:36px;height:1px;background:var(--rose);flex-shrink:0}
.bw-sig span{font-family:'Inter',sans-serif;font-size:.58rem;letter-spacing:.18em;text-transform:uppercase;color:var(--muted);white-space:nowrap}

/* BENTO */
.bento-section{background:var(--cream);padding:5rem 4rem 6rem}
.bento-grid{max-width:1200px;margin:0 auto;display:grid;grid-template-columns:repeat(12,1fr);grid-template-rows:300px 240px 260px;gap:14px}
.bc{position:relative;overflow:hidden;border-radius:6px;will-change:opacity,transform}
.bc-img{width:100%;height:100%;object-fit:cover;transition:transform .75s cubic-bezier(.16,1,.3,1)}
.bc:hover .bc-img{transform:scale(1.05)}
.bc-dark-grad{position:absolute;inset:0;background:linear-gradient(to top,rgba(13,9,8,.72) 0%,rgba(13,9,8,.1) 55%,transparent 100%);pointer-events:none}
.bc-body{position:absolute;inset:0;display:flex;flex-direction:column;justify-content:flex-end;padding:1.4rem 1.5rem;z-index:2}
.bc-body.centered{justify-content:center;align-items:center;text-align:center;padding:1.8rem}
.bc-tag{font-family:'Inter',sans-serif;font-size:.56rem;letter-spacing:.22em;text-transform:uppercase;color:rgba(255,255,255,.65);margin-bottom:.5rem;display:block}
.bc-tag.light{color:rgba(255,255,255,.7)}
.bc h3{font-family:'Cormorant Garamond',serif;font-size:2.1rem;font-weight:700;color:#fff;line-height:1.1;margin-bottom:.9rem}
.bc h3 em{font-style:italic;color:var(--blush)}
.bc h4{font-family:'Cormorant Garamond',serif;font-size:1.45rem;font-weight:600;color:#fff;line-height:1.2;margin-bottom:.85rem}
.bc-btn{display:inline-block;padding:.55rem 1.35rem;font-family:'Inter',sans-serif;font-size:.62rem;font-weight:500;letter-spacing:.14em;text-transform:uppercase;background:rgba(255,255,255,.15);color:#fff;border:1px solid rgba(255,255,255,.35);backdrop-filter:blur(6px);width:fit-content;transition:background .3s,border-color .3s;will-change:transform}
.bc-btn:hover{background:rgba(255,255,255,.28);border-color:rgba(255,255,255,.7)}
.bc-btn.dark{background:var(--char);color:#fff;border-color:var(--char)}
.bc-btn.dark:hover{background:var(--deep);border-color:var(--deep)}
.bc-btn.light{background:rgba(255,255,255,.14);color:#fff;border-color:rgba(255,255,255,.38)}
.b1{grid-column:1/5;grid-row:1/3}.b2{grid-column:5/9;grid-row:1/2}.b3{grid-column:9/13;grid-row:1/2}
.b4{grid-column:5/9;grid-row:2/3}.b5{grid-column:9/13;grid-row:2/3}.b6{grid-column:1/5;grid-row:3/4}
.b7{grid-column:5/9;grid-row:3/4}.b8{grid-column:9/13;grid-row:3/4}
.bc-dark{background:var(--dark)}
.bc-dark .bc-body{justify-content:center;align-items:center;text-align:center}
.bc-quote{font-family:'Cormorant Garamond',serif;font-style:italic;font-size:clamp(.95rem,1.4vw,1.2rem);color:var(--blush);line-height:1.75;margin-bottom:1rem}
.bc-cite{font-family:'Inter',sans-serif;font-size:.58rem;letter-spacing:.2em;text-transform:uppercase;color:var(--rose)}
.bc-floral-bg{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:.14;pointer-events:none}
.bc-blush{background:var(--blush);display:flex;flex-direction:row;align-items:stretch}
.bc-blush .bc-body{position:relative;padding:1.4rem 1.3rem;justify-content:space-between;flex:1;z-index:2}
.bc-blush .bc-tag{color:var(--deep)}
.bc-blush h4{font-family:'Cormorant Garamond',serif;font-size:1.15rem;font-weight:600;color:var(--char);line-height:1.3;margin-bottom:.9rem}
.offer-badge-sm{font-family:'Cormorant Garamond',serif;font-size:2.2rem;font-weight:700;color:var(--deep);line-height:1;margin-bottom:.5rem}
.bc-img-fit{width:45%;height:100%;object-fit:cover;flex-shrink:0;transition:transform .75s cubic-bezier(.16,1,.3,1)}
.bc:hover .bc-img-fit{transform:scale(1.04)}
.bc-cream{background:#fff;border:1px solid rgba(26,18,16,.06)}
.bc-cream .bc-tag{color:var(--rose)}
.bc-cream .bc-body{justify-content:flex-end}
.bc-wordmark{position:absolute;top:1.5rem;left:50%;transform:translateX(-50%);width:70%;object-fit:contain;filter:invert(1) sepia(.2) brightness(.25);opacity:.8}
.bc-services-list{font-family:'Inter',sans-serif;font-size:.68rem;line-height:1.9;color:var(--muted);text-align:center;margin-bottom:1rem}
.bc-rose{background:var(--deep)}
.bc-frame-deco{position:absolute;inset:0;width:100%;height:100%;object-fit:contain;opacity:.14;pointer-events:none;object-position:center}
.bc-rose h4{color:#fff;font-size:1.7rem}
.bc-heart{position:absolute;top:1.5rem;left:50%;transform:translateX(-50%);width:52px;height:52px;object-fit:contain;opacity:.4}
.bc-cream h4{font-family:'Cormorant Garamond',serif;font-size:1.35rem;color:var(--char);margin-bottom:.6rem}
.bc-sub-p{font-family:'Inter',sans-serif;font-size:.7rem;font-weight:300;color:var(--muted);line-height:1.8;text-align:center;margin-bottom:1rem}

/* ABOUT */
.about-section{background:#fff;padding:8rem 5rem;border-top:1px solid rgba(26,18,16,.06);position:relative;overflow:hidden}
.about-inner{max-width:1180px;margin:0 auto;display:grid;grid-template-columns:1fr 1.4fr;gap:7rem;align-items:start}
.about-img-col{display:flex;flex-direction:column;gap:2rem}
.about-img-frame{position:relative;overflow:hidden;border-radius:4px;aspect-ratio:3/4;box-shadow:18px 18px 0 var(--blush)}
.about-photo{width:100%;height:100%;object-fit:cover;object-position:center top;transition:transform .7s cubic-bezier(.16,1,.3,1)}
.about-img-frame:hover .about-photo{transform:scale(1.04)}
.about-img-overlay{position:absolute;inset:0;background:linear-gradient(to top,rgba(13,9,8,.55) 0%,transparent 50%);pointer-events:none}
.about-img-badge{position:absolute;bottom:-1.2rem;right:-1.2rem;width:84px;height:84px;background:var(--cream);border-radius:50%;display:flex;align-items:center;justify-content:center;border:3px solid #fff;box-shadow:0 6px 20px rgba(26,18,16,.14);z-index:2}
.badge-flower{width:52px;height:52px;object-fit:contain}
.about-nameplate{position:absolute;bottom:1.4rem;left:1.4rem;right:1.4rem;z-index:2}
.about-nameplate-name{display:block;font-family:'Cormorant Garamond',serif;font-size:1.25rem;font-weight:600;color:#fff;line-height:1.2}
.about-nameplate-title{display:block;font-family:'Inter',sans-serif;font-size:.58rem;letter-spacing:.18em;text-transform:uppercase;color:rgba(255,255,255,.6);margin-top:.25rem}
.about-stat-row{display:flex;align-items:center;justify-content:center;background:var(--cream);border:1px solid rgba(26,18,16,.07);padding:1.1rem 0;border-radius:4px}
.about-stat{display:flex;flex-direction:column;align-items:center;padding:0 1.6rem}
.about-stat-n{font-family:'Cormorant Garamond',serif;font-size:1.7rem;font-weight:600;color:var(--deep);line-height:1}
.about-stat-l{font-family:'Inter',sans-serif;font-size:.56rem;letter-spacing:.14em;text-transform:uppercase;color:var(--muted);margin-top:.2rem}
.about-stat-div{width:1px;height:32px;background:rgba(26,18,16,.1)}
.about-h2{font-family:'Cormorant Garamond',serif;font-size:clamp(2.2rem,3.8vw,3.4rem);font-weight:600;line-height:1.15;color:var(--char);margin:.6rem 0 1.2rem}
.about-h2 em{font-style:italic;color:var(--deep)}
.about-intro-badges{display:flex;flex-wrap:wrap;gap:.45rem;margin-bottom:1.4rem}
.about-badge{padding:.3rem .82rem;font-family:'Inter',sans-serif;font-size:.58rem;letter-spacing:.1em;text-transform:uppercase;background:var(--blush);color:var(--deep);border-radius:100px;font-weight:500}
.about-lead{font-family:'Inter',sans-serif;font-size:.95rem;font-weight:300;color:var(--char);line-height:1.85;margin-bottom:1.4rem}
.about-expandable{overflow:hidden;max-height:0;opacity:0;transition:max-height .75s cubic-bezier(.16,1,.3,1),opacity .5s ease}
.about-expandable.expanded{max-height:1400px;opacity:1}
.about-expandable p{font-family:'Inter',sans-serif;font-size:.88rem;font-weight:300;color:var(--muted);line-height:1.85;margin-bottom:1rem}
.about-certs{margin-top:1.6rem;padding-top:1.6rem;border-top:1px solid rgba(26,18,16,.08)}
.about-certs h4{font-family:'Cormorant Garamond',serif;font-size:1.1rem;font-weight:600;color:var(--char);margin-bottom:1rem}
.certs-grid{display:grid;grid-template-columns:1fr 1fr;gap:.5rem .8rem}
.cert-item{font-family:'Inter',sans-serif;font-size:.7rem;font-weight:300;color:var(--muted);line-height:1.5}
.about-actions{display:flex;align-items:center;gap:1.5rem;margin-top:1.8rem;flex-wrap:wrap}
.about-toggle{font-family:'Inter',sans-serif;font-size:.68rem;font-weight:500;letter-spacing:.12em;text-transform:uppercase;color:var(--deep);background:none;border:none;border-bottom:1px solid var(--rose);cursor:pointer;padding:.5rem 0;transition:color .25s,letter-spacing .25s}
.about-toggle:hover{color:var(--rose);letter-spacing:.18em}
.about-flower-deco{position:absolute;bottom:2rem;right:3rem;width:180px;opacity:.06;pointer-events:none;transform:rotate(15deg)}

/* OFFER */
.offer-section{padding:7rem 5rem;background:var(--cream)}
.offer-row{max-width:1180px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:7rem;align-items:center}
.offer-txt .kicker{display:block;margin-bottom:1.2rem}
.offer-txt h2{font-family:'Cormorant Garamond',serif;font-size:clamp(1.9rem,3.2vw,3rem);font-weight:600;line-height:1.2;color:var(--char);margin-bottom:1.2rem}
.offer-txt h2 em{color:var(--deep);font-style:italic}
.offer-txt p{font-family:'Inter',sans-serif;font-size:.88rem;font-weight:300;color:var(--muted);line-height:1.75;max-width:360px;margin-bottom:2rem}
.offer-acts{display:flex;align-items:center;gap:1.8rem}
.offer-more{font-family:'Inter',sans-serif;font-size:.7rem;letter-spacing:.1em;color:var(--deep);transition:letter-spacing .25s}
.offer-more:hover{letter-spacing:.18em}
.offer-img{position:relative}
.offer-frame{overflow:hidden;box-shadow:20px 20px 50px rgba(26,18,16,.1),-5px -5px 0 var(--blush)}
.offer-frame img{width:100%;display:block;transition:transform .7s cubic-bezier(.16,1,.3,1)}
.offer-frame:hover img{transform:scale(1.04)}
.offer-pct{position:absolute;top:-1.2rem;right:-1.2rem;width:76px;height:76px;background:var(--deep);color:#fff;border-radius:50%;display:flex;flex-direction:column;align-items:center;justify-content:center;font-family:'Cormorant Garamond',serif;font-size:1.4rem;font-weight:700;line-height:1;box-shadow:0 8px 22px rgba(139,58,82,.4)}
.offer-pct small{font-family:'Inter',sans-serif;font-size:.44rem;letter-spacing:.14em;text-transform:uppercase}

/* INTAKE */
.intake-section{background:#fff;padding:8rem 5rem;border-top:1px solid rgba(26,18,16,.06)}
.intake-inner{max-width:1180px;margin:0 auto;display:grid;grid-template-columns:1fr 1.4fr;gap:6rem;align-items:start}
.if-img-wrap{position:relative;overflow:hidden;border-radius:4px;height:320px;margin-bottom:2rem}
.if-img{width:100%;height:100%;object-fit:cover}
.if-img-overlay{position:absolute;inset:0;background:linear-gradient(to top,rgba(13,9,8,.8) 0%,rgba(13,9,8,.2) 60%,transparent 100%)}
.if-img-text{position:absolute;bottom:1.8rem;left:1.8rem;right:1.8rem;z-index:2}
.if-logo{height:36px;object-fit:contain;filter:brightness(2);margin-bottom:.8rem}
.if-img-text h3{font-family:'Cormorant Garamond',serif;font-size:1.9rem;font-weight:700;color:#fff;line-height:1.15;margin-bottom:.3rem}
.if-img-text h3 em{font-style:italic;color:var(--blush)}
.if-img-text p{font-family:'Inter',sans-serif;font-size:.68rem;letter-spacing:.15em;text-transform:uppercase;color:rgba(255,255,255,.55)}
.if-contact-pills{display:flex;flex-direction:column;gap:.7rem;margin-bottom:1.8rem}
.if-pill{display:flex;align-items:center;gap:.8rem;padding:.65rem 1rem;background:var(--cream);border:1px solid rgba(26,18,16,.08);border-radius:4px;font-family:'Inter',sans-serif;font-size:.78rem;color:var(--char);transition:border-color .25s,background .25s}
.if-pill:hover{border-color:var(--rose);background:var(--blush)}
.if-pill.no-link{cursor:default}
.if-pill.no-link:hover{border-color:rgba(26,18,16,.08);background:var(--cream)}
.if-pill-icon{width:16px;height:16px;color:var(--rose);flex-shrink:0}
.if-pill-icon svg{width:100%;height:100%}
.if-service-tags{display:flex;flex-wrap:wrap;gap:.5rem}
.if-tag{padding:.3rem .75rem;font-family:'Inter',sans-serif;font-size:.6rem;letter-spacing:.1em;text-transform:uppercase;background:transparent;border:1px solid rgba(26,18,16,.12);color:var(--muted);border-radius:100px;transition:background .2s,color .2s,border-color .2s}
.if-tag:hover{background:var(--blush);border-color:var(--rose);color:var(--deep)}
.if-form-header{margin-bottom:2.5rem}
.if-form-header h2{font-family:'Cormorant Garamond',serif;font-size:clamp(2rem,3.2vw,2.9rem);font-weight:600;color:var(--char);line-height:1.15;margin:.7rem 0 .8rem}
.if-form-header h2 em{font-style:italic;color:var(--deep)}
.if-form-header p{font-family:'Inter',sans-serif;font-size:.86rem;font-weight:300;color:var(--muted);line-height:1.7}
.if-form{display:flex;flex-direction:column;gap:1.2rem}
.if-row{display:grid;grid-template-columns:1fr 1fr;gap:1.2rem}
.if-field{display:flex;flex-direction:column;gap:.4rem}
.if-field label{font-family:'Inter',sans-serif;font-size:.62rem;font-weight:500;letter-spacing:.1em;text-transform:uppercase;color:var(--muted)}
.req{color:var(--rose)}
.if-field input,.if-field select,.if-field textarea{padding:.82rem 1rem;background:var(--cream);border:1.5px solid rgba(26,18,16,.12);font-family:'Inter',sans-serif;font-size:.88rem;color:var(--char);outline:none;transition:border-color .25s,background .25s;border-radius:2px;appearance:none;-webkit-appearance:none;resize:none}
.if-field input::placeholder,.if-field textarea::placeholder{color:rgba(107,94,90,.45)}
.if-field input:focus,.if-field select:focus,.if-field textarea:focus{border-color:var(--rose);background:#fff}
.if-field select{background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%236b5e5a' stroke-width='1.5'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 1rem center;background-size:16px;padding-right:2.5rem;cursor:pointer}
.if-form-footer{display:flex;align-items:center;gap:2rem;flex-wrap:wrap;margin-top:.4rem}
.if-submit{display:flex;align-items:center;gap:.6rem;min-width:160px;justify-content:center}
.if-submit:disabled{opacity:.65;cursor:not-allowed}
.spinner{width:13px;height:13px;border:1.5px solid rgba(255,255,255,.3);border-top-color:#fff;border-radius:50%;animation:spin .7s linear infinite}
@keyframes spin{to{transform:rotate(360deg)}}
.if-privacy{font-family:'Inter',sans-serif;font-size:.68rem;font-weight:300;color:var(--muted);line-height:1.6}
.if-privacy a{color:var(--rose);transition:color .2s}
.if-privacy a:hover{color:var(--deep)}
.form-success{display:flex;flex-direction:column;align-items:flex-start;padding:3rem;background:var(--cream);border:1px solid rgba(26,18,16,.08);border-radius:4px}
.fs-icon{font-size:2rem;color:var(--rose);margin-bottom:1rem}
.form-success h3{font-family:'Cormorant Garamond',serif;font-size:1.7rem;color:var(--char);margin-bottom:.6rem}
.form-success p{font-family:'Inter',sans-serif;font-size:.88rem;font-weight:300;color:var(--muted);line-height:1.7}

/* FOOTER */
footer{background:var(--dark);color:#fff;padding:5.5rem 5rem 0}
.ft-grid{max-width:1180px;margin:0 auto;display:grid;grid-template-columns:1.1fr 1.4fr 1fr;gap:5rem;padding-bottom:5rem;border-bottom:1px solid rgba(255,255,255,.07)}
.ft-logo{height:42px;object-fit:contain;margin-bottom:1.1rem;filter:brightness(1.6)}
.ft-brand p{font-family:'Inter',sans-serif;font-size:.84rem;font-weight:300;color:rgba(255,255,255,.42);line-height:1.7;margin-bottom:1.4rem}
.ft-socs{display:flex;gap:.8rem}
.ft-news h3,.ft-contact h3{font-family:'Cormorant Garamond',serif;font-size:1.25rem;font-weight:400;margin-bottom:.7rem}
.ft-news p,.ft-contact p{font-family:'Inter',sans-serif;font-size:.84rem;font-weight:300;color:rgba(255,255,255,.42);line-height:1.7;margin-bottom:.2rem}
.ft-contact a{color:rgba(255,255,255,.42);transition:color .25s}
.ft-contact a:hover{color:var(--blush)}
.nl{display:flex;gap:.5rem;margin-top:1.1rem;flex-wrap:wrap}
.nl input{flex:1;min-width:155px;padding:.78rem 1rem;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.12);color:#fff;font-family:'Inter',sans-serif;font-size:.8rem;outline:none;transition:border-color .25s}
.nl input::placeholder{color:rgba(255,255,255,.22)}
.nl input:focus{border-color:var(--rose)}
.ty{font-family:'Cormorant Garamond',serif!important;font-style:italic;color:var(--blush)!important;font-size:1rem!important;margin-top:1rem}
.ft-bar{max-width:1180px;margin:0 auto;padding:1.7rem 0;display:flex;align-items:center;justify-content:space-between;gap:1rem}
.ft-bar p{font-family:'Inter',sans-serif;font-size:.58rem;letter-spacing:.1em;text-transform:uppercase;color:rgba(255,255,255,.22)}
.ft-bar a,.ft-link{font-family:'Inter',sans-serif;font-size:.58rem;letter-spacing:.1em;text-transform:uppercase;color:rgba(255,255,255,.22);transition:color .25s;background:none;border:none;cursor:pointer}
.ft-bar a:hover,.ft-link:hover{color:var(--blush)}

/* RESPONSIVE */
@media(max-width:1100px){
  .desk-nav{display:none}
  .burger{display:flex}
  .hdr-inner{padding:0 1.5rem}
  .hero-copy{padding:0 2rem;padding-top:var(--H)}
  .h-stats{display:none}
  .hero-floral{display:none}
  .beauty-section{padding:5rem 2rem 4.5rem}
  .bw-bg-floral{display:none}
  .bento-section{padding:4rem 2rem 5rem}
  .bento-grid{grid-template-columns:1fr 1fr;grid-template-rows:280px 280px 260px 240px}
  .b1{grid-column:1/2;grid-row:1/3}.b2{grid-column:2/3;grid-row:1/2}.b3{grid-column:2/3;grid-row:2/3}
  .b4{grid-column:1/2;grid-row:3/4}.b5{grid-column:2/3;grid-row:3/4}.b6{grid-column:1/2;grid-row:4/5}
  .b7{grid-column:2/3;grid-row:4/5}.b8{grid-column:1/-1;grid-row:5/6}
  .about-section{padding:5rem 2.5rem}
  .about-inner{grid-template-columns:1fr;gap:3.5rem}
  .about-img-frame{aspect-ratio:4/3;max-height:400px}
  .about-flower-deco{display:none}
  .certs-grid{grid-template-columns:1fr}
  .offer-section{padding:5rem 2rem}
  .offer-row{grid-template-columns:1fr;gap:3rem}
  .intake-section{padding:5rem 2.5rem}
  .intake-inner{grid-template-columns:1fr;gap:3rem}
  .if-row{grid-template-columns:1fr}
  .ft-grid{grid-template-columns:1fr 1fr;gap:3rem}
  .ft-brand{grid-column:1/-1}
  footer{padding:4.5rem 2rem 0}
  .tm-panel{width:100vw}
  .tm-detail-inner{grid-template-columns:1fr}
  .tm-detail-img{min-height:240px;max-height:280px}
}

@media(max-width:640px){
  .hero-copy{padding:0 1.4rem;padding-top:var(--H)}
  .bento-grid{grid-template-columns:1fr;grid-template-rows:auto}
  .b1,.b2,.b3,.b4,.b5,.b6,.b7,.b8{grid-column:1/-1;grid-row:auto;height:260px}
  .b1{height:320px}
  .bc-blush{flex-direction:column}
  .bc-img-fit{width:100%;height:140px}
  .bento-section{padding:3rem 1.2rem 4rem}
  .beauty-section{padding:4rem 1.4rem 3.5rem}
  .bw-p{font-size:clamp(1.3rem,4.8vw,1.8rem)}
  .bw-bottom{flex-direction:column;align-items:flex-start;gap:1.5rem}
  .bw-bottom-right{flex-direction:column;align-items:flex-start;gap:1.2rem}
  .about-section{padding:4rem 1.4rem}
  .about-img-frame{aspect-ratio:1/1}
  .offer-section{padding:4rem 1.2rem}
  .intake-section{padding:4rem 1.4rem}
  .if-img-wrap{height:240px}
  .if-row{grid-template-columns:1fr}
  .ft-grid{grid-template-columns:1fr;gap:2.5rem}
  footer{padding:3.5rem 1.2rem 0}
  .ft-bar{flex-direction:column;text-align:center}
  .scrl-hint{display:none}
  .tm-header{padding:1rem 1.2rem}
  .tm-header-text p{display:none}
  .tm-cats{padding:1rem 1.2rem .8rem}
  .tm-grid{padding:1rem 1.2rem;grid-template-columns:1fr}
  .tm-footer-cta{padding:1.5rem 1.2rem}
  .tm-footer-cta-inner{flex-direction:column;align-items:flex-start}
  .tm-back{margin:1rem 1.2rem .6rem}
  .tm-detail-body{padding:1.4rem 1.2rem}
}
</style>