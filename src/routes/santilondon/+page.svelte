<script lang="ts">
	import { onMount } from 'svelte';

	const metrics = [
		{ value: '17+', label: 'years shaping skin-first treatment plans' },
		{ value: '01', label: 'South Kensington destination with a private-clinic feel' },
		{ value: '360', label: 'facial, laser, body and regenerative aesthetics' }
	];

	const services = [
		{
			eyebrow: 'Facial design',
			title: 'Clinical facials that lift, refine and reset the skin barrier.',
			copy:
				'Protocols built around texture, hydration, tone and post-treatment recovery rather than one-size-fits-all pampering.',
			image: 'https://santilondon.com/wp-content/uploads/2023/05/yoanna-hanbury.PNG-jpg.webp'
		},
		{
			eyebrow: 'Laser + light',
			title: 'IPL and device-led correction for clarity, pigment and overall radiance.',
			copy:
				'High-precision sessions designed to improve visible redness, uneven tone and dullness without losing a luxurious feel.',
			image: 'https://santilondon.com/wp-content/uploads/2023/05/IPL-Treatments-in-South-Kensington-jpg.webp'
		},
		{
			eyebrow: 'Medical aesthetics',
			title: 'Subtle injectables with structure, balance and restraint.',
			copy:
				'Refinement over exaggeration, with plans that protect expression and support long-term facial harmony.',
			image: 'https://santilondon.com/wp-content/uploads/2023/04/Masseter-Botox-jpg.webp'
		},
		{
			eyebrow: 'Regenerative skin',
			title: 'Peels, PRP and collagen-focused treatments for durable results.',
			copy:
				'Performance-focused treatment architecture that improves skin quality session by session.',
			image: 'https://santilondon.com/wp-content/uploads/2025/03/IMG_5200.jpg'
		}
	];

	const principles = [
		{
			number: '01',
			title: 'Diagnosis before treatment',
			copy: 'Every plan starts by reading the skin properly: barrier state, inflammation, texture, pigment and recovery capacity.'
		},
		{
			number: '02',
			title: 'Layered modalities',
			copy: 'Facials, injectables, peels and light-based treatments are sequenced so each session compounds the last.'
		},
		{
			number: '03',
			title: 'Luxury with discipline',
			copy: 'The experience feels calm and elevated, but the thinking is clinical and outcomes-led.'
		}
	];

	const testimonials = [
		{
			quote: 'It feels less like a beauty appointment and more like a carefully directed treatment strategy.',
			author: 'Private client'
		},
		{
			quote: 'The work is subtle, polished and consistently elegant. Nothing looks overdone.',
			author: 'Returning patient'
		},
		{
			quote: 'Every visit builds on the previous one. The skin keeps improving instead of just being refreshed for a day.',
			author: 'Skin programme client'
		}
	];

	let scrollY = $state(0);
	let mounted = $state(false);

	onMount(() => {
		mounted = true;

		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) {
						entry.target.classList.add('in-view');
						observer.unobserve(entry.target);
					}
				}
			},
			{
				threshold: 0.16,
				rootMargin: '0px 0px -8% 0px'
			}
		);

		document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((node) => observer.observe(node));

		return () => observer.disconnect();
	});
</script>

<svelte:head>
	<title>Santi London | Elevated Skin, Laser & Medical Aesthetics</title>
	<meta
		name="description"
		content="An editorial, skin-first landing page for Santi London with advanced facials, laser, regenerative treatments and medical aesthetics in South Kensington."
	/>
	<meta property="og:title" content="Santi London" />
	<meta
		property="og:description"
		content="Skin, wellness and medical aesthetics shaped with clinical precision and a luxury editorial feel."
	/>
	<meta property="og:type" content="website" />
	<meta property="og:image" content="https://santilondon.com/wp-content/uploads/2024/06/yasmine.webp" />
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Cormorant+Garamond:wght@400;500;600;700&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<svelte:window bind:scrollY />

<div class="page-shell">
	<div class="page-glow page-glow-a"></div>
	<div class="page-glow page-glow-b"></div>

	<nav class:scrolled={scrollY > 32}>
		<a class="brand" href="#top">Santi London</a>
		<div class="nav-links">
			<a href="#services">Treatments</a>
			<a href="#approach">Approach</a>
			<a href="#results">Results</a>
		</div>
		<a class="nav-cta" href="#consultation">Book a consultation</a>
	</nav>

	<section class:ready={mounted} class="hero" id="top">
		<div class="hero-copy">
			<p class="eyebrow">
				<span></span>
				South Kensington skin atelier
			</p>

			<h1>
				A sharper, more cinematic landing page for
				<em>Santi London</em>.
			</h1>

			<p class="hero-text">
				Skin health, regenerative treatments, laser correction and medical aesthetics presented with the
				polish of a luxury editorial and the control of a private clinic.
			</p>

			<div class="hero-actions">
				<a class="button button-solid" href="#services">Explore treatments</a>
				<a class="button button-ghost" href="#consultation">Plan your visit</a>
			</div>

			<div class="hero-pills">
				<span>Facials</span>
				<span>IPL + laser</span>
				<span>Injectables</span>
				<span>Skin peels</span>
			</div>
		</div>

		<div class="hero-visual" style={`transform: translateY(${Math.min(scrollY * 0.08, 42)}px);`}>
			<div class="hero-badge">
				<strong>Since 2009</strong>
				<span>Skin, wellness and medical aesthetics</span>
			</div>

			<div class="hero-media">
				<div class="frame frame-a"></div>
				<div class="frame frame-b"></div>
				<img
					src="https://santilondon.com/wp-content/uploads/2024/06/yasmine.webp"
					alt="Santi London treatment room portrait"
				/>
			</div>

			<div class="hero-detail">
				<p>Designed to feel polished on first view and richer as you scroll.</p>
				<p>High-contrast typography, warm metallic accents and layered motion.</p>
			</div>
		</div>
	</section>

	<section class="metrics" aria-label="Santi London highlights">
		{#each metrics as metric, index}
			<div class="metric" data-reveal style={`--delay:${index * 120}ms`}>
				<div class="metric-value">{metric.value}</div>
				<p>{metric.label}</p>
			</div>
		{/each}
	</section>

	<section class="intro section-grid">
		<div class="section-heading" data-reveal>
			<p class="section-kicker">Editorial energy</p>
			<h2>Luxury clinic language, without the flat template look.</h2>
		</div>

		<div class="intro-copy" data-reveal style="--delay:120ms">
			<p>
				The page now leads with a confident split-screen hero, layered gradients, animated borders and
				scroll reveals that make every section arrive with intent.
			</p>
			<p>
				Instead of a pasted HTML iframe, this is a native Svelte page that can evolve with the rest of the
				project.
			</p>
		</div>
	</section>

	<section class="services" id="services">
		<div class="section-heading section-heading-wide" data-reveal>
			<p class="section-kicker">Signature menu</p>
			<h2>Treatments arranged as a visual programme, not a plain list.</h2>
		</div>

		<div class="service-grid">
			{#each services as service, index}
				<article class="service-card" data-reveal style={`--delay:${index * 90}ms`}>
					<div class="service-image">
						<img src={service.image} alt={service.eyebrow} />
					</div>
					<p class="service-eyebrow">{service.eyebrow}</p>
					<h3>{service.title}</h3>
					<p>{service.copy}</p>
				</article>
			{/each}
		</div>
	</section>

	<section class="approach" id="approach">
		<div class="approach-panel" data-reveal>
			<div class="section-heading section-heading-tight">
				<p class="section-kicker">Treatment architecture</p>
				<h2>Every result is built in layers.</h2>
			</div>

			<div class="principles">
				{#each principles as principle, index}
					<div class="principle" data-reveal style={`--delay:${index * 100}ms`}>
						<span>{principle.number}</span>
						<div>
							<h3>{principle.title}</h3>
							<p>{principle.copy}</p>
						</div>
					</div>
				{/each}
			</div>
		</div>

		<div class="approach-visual" data-reveal style="--delay:140ms">
			<img
				src="https://santilondon.com/wp-content/uploads/2023/10/Santi-Beauty-Lounge.webp"
				alt="Santi London beauty lounge"
			/>
			<div class="approach-caption">
				<span>Private setting</span>
				<p>Quiet, sculpted interiors that match the precision of the treatment plan.</p>
			</div>
		</div>
	</section>

	<section class="results" id="results">
		<div class="results-copy" data-reveal>
			<p class="section-kicker">Results feeling</p>
			<h2>Subtle, expensive-looking outcomes.</h2>
			<p>
				The new page leans into refinement rather than volume: clean whitespace, restrained motion and
				imagery framed like a campaign rather than a brochure.
			</p>
		</div>

		<div class="testimonial-stack">
			{#each testimonials as item, index}
				<blockquote class="testimonial" data-reveal style={`--delay:${index * 110}ms`}>
					<p>"{item.quote}"</p>
					<footer>{item.author}</footer>
				</blockquote>
			{/each}
		</div>
	</section>

	<section class="consultation" id="consultation" data-reveal>
		<div class="consultation-copy">
			<p class="section-kicker">Launch-ready</p>
			<h2>Use the subdomain, not the route.</h2>
			<p>
				This page can now be served from <strong>`santillondon.mydomain`</strong> while the browser stays
				on the root path. The `/santilondon` route still exists as the internal page target.
			</p>
		</div>

		<div class="consultation-card">
			<div>
				<span class="consultation-label">Preferred host</span>
				<strong>santillondon.mydomain</strong>
			</div>
			<a class="button button-solid" href="#top">Back to top</a>
		</div>
	</section>
</div>

<style>
	:global(body) {
		margin: 0;
		background:
			radial-gradient(circle at top left, rgba(201, 170, 107, 0.16), transparent 28%),
			radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.55), transparent 24%),
			linear-gradient(180deg, #f6f1e8 0%, #efe7db 42%, #f7f3ee 100%);
		color: #1d1711;
		font-family: 'Manrope', sans-serif;
	}

	:global(html) {
		scroll-behavior: smooth;
	}

	.page-shell {
		--bg: #f6f1e8;
		--surface: rgba(255, 250, 242, 0.72);
		--surface-strong: rgba(255, 248, 238, 0.88);
		--line: rgba(59, 46, 33, 0.14);
		--text: #1d1711;
		--muted: #625444;
		--gold: #b88943;
		--gold-soft: rgba(184, 137, 67, 0.16);
		--shadow: 0 32px 80px rgba(46, 32, 17, 0.14);
		position: relative;
		overflow: clip;
	}

	.page-glow {
		position: fixed;
		inset: auto;
		width: 32rem;
		height: 32rem;
		border-radius: 50%;
		pointer-events: none;
		filter: blur(70px);
		opacity: 0.35;
		z-index: 0;
	}

	.page-glow-a {
		top: -8rem;
		left: -10rem;
		background: rgba(215, 187, 138, 0.45);
	}

	.page-glow-b {
		right: -8rem;
		top: 28rem;
		background: rgba(153, 111, 54, 0.22);
	}

	nav {
		position: sticky;
		top: 0;
		z-index: 10;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1.5rem;
		padding: 1.25rem clamp(1.2rem, 2vw, 2rem);
		background: transparent;
		border-bottom: 1px solid transparent;
		backdrop-filter: blur(0);
		transition:
			background 220ms ease,
			border-color 220ms ease,
			backdrop-filter 220ms ease,
			padding 220ms ease;
	}

	nav.scrolled {
		background: rgba(248, 242, 232, 0.76);
		border-color: var(--line);
		backdrop-filter: blur(18px);
	}

	nav a {
		color: var(--text);
		text-decoration: none;
	}

	.brand {
		font-family: 'Cormorant Garamond', serif;
		font-size: clamp(1.5rem, 2vw, 2rem);
		font-weight: 600;
		letter-spacing: 0.06em;
		text-transform: uppercase;
	}

	.nav-links {
		display: flex;
		align-items: center;
		gap: 1.4rem;
		font-size: 0.82rem;
		text-transform: uppercase;
		letter-spacing: 0.18em;
	}

	.nav-links a,
	.nav-cta {
		position: relative;
	}

	.nav-links a::after,
	.nav-cta::after {
		content: '';
		position: absolute;
		left: 0;
		bottom: -0.2rem;
		width: 100%;
		height: 1px;
		background: currentColor;
		transform: scaleX(0);
		transform-origin: left;
		transition: transform 220ms ease;
	}

	.nav-links a:hover::after,
	.nav-cta:hover::after {
		transform: scaleX(1);
	}

	.nav-cta {
		font-size: 0.82rem;
		text-transform: uppercase;
		letter-spacing: 0.14em;
		padding: 0.9rem 0 0.7rem;
	}

	.hero,
	.metrics,
	.intro,
	.services,
	.approach,
	.results,
	.consultation {
		position: relative;
		z-index: 1;
	}

	.hero {
		display: grid;
		grid-template-columns: minmax(0, 1.05fr) minmax(20rem, 0.95fr);
		gap: clamp(2rem, 5vw, 4.5rem);
		align-items: center;
		padding: clamp(3rem, 6vw, 5rem) clamp(1.2rem, 4vw, 3rem) 4rem;
		min-height: calc(100vh - 5rem);
	}

	.hero-copy {
		max-width: 44rem;
	}

	.eyebrow,
	.section-kicker,
	.service-eyebrow,
	.consultation-label {
		display: inline-flex;
		align-items: center;
		gap: 0.7rem;
		margin: 0 0 1rem;
		font-size: 0.72rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.26em;
		color: var(--gold);
	}

	.eyebrow span {
		width: 2.25rem;
		height: 1px;
		background: currentColor;
	}

	h1,
	h2,
	h3,
	blockquote p {
		font-family: 'Cormorant Garamond', serif;
		font-weight: 600;
		letter-spacing: -0.02em;
	}

	h1 {
		margin: 0;
		font-size: clamp(3.8rem, 8vw, 7.2rem);
		line-height: 0.92;
		max-width: 12ch;
		transform: translateY(22px);
		opacity: 0;
		transition: transform 800ms cubic-bezier(0.2, 0.9, 0.2, 1), opacity 800ms ease;
	}

	h1 em {
		font-style: italic;
		color: var(--gold);
	}

	.hero-text,
	.intro-copy p,
	.results-copy p,
	.service-card p,
	.principle p,
	.approach-caption p,
	.consultation-copy p,
	.metric p,
	.hero-detail p {
		color: var(--muted);
		font-size: 1rem;
		line-height: 1.8;
	}

	.hero-text {
		max-width: 38rem;
		margin: 1.4rem 0 0;
		transform: translateY(18px);
		opacity: 0;
		transition: transform 800ms cubic-bezier(0.2, 0.9, 0.2, 1) 100ms, opacity 800ms ease 100ms;
	}

	.hero-actions {
		display: flex;
		flex-wrap: wrap;
		gap: 0.9rem;
		margin-top: 2rem;
		transform: translateY(18px);
		opacity: 0;
		transition: transform 800ms cubic-bezier(0.2, 0.9, 0.2, 1) 180ms, opacity 800ms ease 180ms;
	}

	.hero-pills {
		display: flex;
		flex-wrap: wrap;
		gap: 0.8rem;
		margin-top: 2rem;
		transform: translateY(18px);
		opacity: 0;
		transition: transform 800ms cubic-bezier(0.2, 0.9, 0.2, 1) 260ms, opacity 800ms ease 260ms;
	}

	.hero-pills span {
		padding: 0.72rem 1rem;
		border: 1px solid rgba(29, 23, 17, 0.12);
		border-radius: 999px;
		background: rgba(255, 250, 242, 0.55);
		font-size: 0.82rem;
		letter-spacing: 0.02em;
	}

	.hero.ready h1,
	.hero.ready .hero-text,
	.hero.ready .hero-actions,
	.hero.ready .hero-pills,
	.hero.ready .hero-visual {
		transform: translateY(0);
		opacity: 1;
	}

	.hero-visual {
		position: relative;
		opacity: 0;
		transition: transform 900ms cubic-bezier(0.2, 0.9, 0.2, 1) 180ms, opacity 900ms ease 180ms;
	}

	.hero-badge {
		position: absolute;
		top: -1.3rem;
		left: -1.1rem;
		z-index: 2;
		max-width: 13rem;
		padding: 1rem 1.1rem;
		border: 1px solid rgba(255, 255, 255, 0.55);
		background: rgba(26, 20, 14, 0.8);
		backdrop-filter: blur(14px);
		color: #f7efe3;
		box-shadow: var(--shadow);
	}

	.hero-badge strong,
	.consultation-card strong {
		display: block;
		font-size: 1.1rem;
	}

	.hero-badge span {
		display: block;
		margin-top: 0.35rem;
		font-size: 0.82rem;
		line-height: 1.6;
		color: rgba(247, 239, 227, 0.78);
	}

	.hero-media {
		position: relative;
		padding: 1.5rem;
		background:
			linear-gradient(180deg, rgba(255, 250, 242, 0.8), rgba(255, 247, 235, 0.55)),
			radial-gradient(circle at top, rgba(184, 137, 67, 0.08), transparent 50%);
		box-shadow: var(--shadow);
	}

	.hero-media img {
		display: block;
		width: 100%;
		aspect-ratio: 0.88;
		object-fit: cover;
		object-position: center top;
	}

	.frame {
		position: absolute;
		pointer-events: none;
	}

	.frame-a {
		inset: 0.45rem;
		border: 1px solid rgba(184, 137, 67, 0.75);
		clip-path: polygon(10% 0, 100% 0, 100% 82%, 88% 100%, 0 100%, 0 14%);
		animation: frameShiftA 9s ease-in-out infinite;
	}

	.frame-b {
		inset: -1rem 1rem 1rem -1rem;
		border: 1px solid rgba(29, 23, 17, 0.14);
		clip-path: polygon(0 12%, 12% 0, 100% 0, 100% 88%, 88% 100%, 0 100%);
		animation: frameShiftB 11s ease-in-out infinite reverse;
	}

	.hero-detail {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 0.85rem;
		margin-top: 1rem;
	}

	.hero-detail p {
		margin: 0;
		padding: 1rem;
		background: rgba(255, 248, 240, 0.72);
		border: 1px solid var(--line);
	}

	.button {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		min-height: 3.25rem;
		padding: 0 1.4rem;
		border: 1px solid transparent;
		text-decoration: none;
		text-transform: uppercase;
		letter-spacing: 0.16em;
		font-size: 0.78rem;
		font-weight: 800;
		transition:
			transform 220ms ease,
			background 220ms ease,
			border-color 220ms ease,
			color 220ms ease;
	}

	.button:hover {
		transform: translateY(-2px);
	}

	.button-solid {
		background: linear-gradient(135deg, #c89a52, #ae7d39);
		color: white;
		box-shadow: 0 18px 40px rgba(174, 125, 57, 0.24);
	}

	.button-ghost {
		border-color: rgba(29, 23, 17, 0.15);
		color: var(--text);
		background: rgba(255, 250, 242, 0.55);
	}

	.metrics,
	.section-grid,
	.services,
	.approach,
	.results,
	.consultation {
		padding-left: clamp(1.2rem, 4vw, 3rem);
		padding-right: clamp(1.2rem, 4vw, 3rem);
	}

	.metrics {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 1rem;
		padding-bottom: 1rem;
	}

	.metric,
	.intro-copy,
	.approach-panel,
	.approach-visual,
	.testimonial,
	.consultation-card {
		background: var(--surface);
		border: 1px solid var(--line);
		backdrop-filter: blur(18px);
		box-shadow: 0 14px 38px rgba(46, 32, 17, 0.06);
	}

	.metric {
		padding: 1.4rem;
	}

	.metric-value {
		font-family: 'Cormorant Garamond', serif;
		font-size: clamp(2.5rem, 5vw, 4rem);
		line-height: 0.9;
	}

	.section-grid {
		display: grid;
		grid-template-columns: minmax(0, 1fr) minmax(18rem, 34rem);
		gap: 2rem;
		align-items: start;
		padding-top: 4rem;
		padding-bottom: 3rem;
	}

	.section-heading h2,
	.results-copy h2,
	.consultation-copy h2 {
		margin: 0;
		font-size: clamp(2.6rem, 5vw, 4.5rem);
		line-height: 0.96;
		max-width: 11ch;
	}

	.intro-copy {
		padding: 1.6rem;
	}

	.services {
		padding-top: 2rem;
		padding-bottom: 3rem;
	}

	.section-heading-wide h2 {
		max-width: 13ch;
	}

	.section-heading-tight h2 {
		max-width: 8ch;
	}

	.service-grid {
		display: grid;
		grid-template-columns: repeat(12, minmax(0, 1fr));
		gap: 1rem;
		margin-top: 2rem;
	}

	.service-card {
		grid-column: span 6;
		padding: 1rem;
		background: var(--surface-strong);
		border: 1px solid var(--line);
		box-shadow: var(--shadow);
		transition: transform 260ms ease, box-shadow 260ms ease;
	}

	.service-card:hover {
		transform: translateY(-6px);
		box-shadow: 0 28px 58px rgba(46, 32, 17, 0.14);
	}

	.service-image {
		overflow: hidden;
		margin-bottom: 1rem;
	}

	.service-image img,
	.approach-visual img {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform 700ms ease;
	}

	.service-card:hover .service-image img,
	.approach-visual:hover img {
		transform: scale(1.04);
	}

	.service-image img {
		aspect-ratio: 1.22;
	}

	.service-card h3,
	.principle h3 {
		margin: 0;
		font-size: clamp(2rem, 3vw, 2.7rem);
		line-height: 0.98;
	}

	.approach {
		display: grid;
		grid-template-columns: minmax(0, 1.05fr) minmax(18rem, 0.95fr);
		gap: 1rem;
		padding-top: 2rem;
		padding-bottom: 3rem;
	}

	.approach-panel {
		padding: 1.4rem;
	}

	.principles {
		margin-top: 2rem;
		display: grid;
		gap: 1rem;
	}

	.principle {
		display: grid;
		grid-template-columns: 3.2rem minmax(0, 1fr);
		gap: 1rem;
		padding-top: 1rem;
		border-top: 1px solid var(--line);
	}

	.principle span {
		font-family: 'Cormorant Garamond', serif;
		font-size: 2.1rem;
		color: var(--gold);
	}

	.approach-visual {
		position: relative;
		overflow: hidden;
		min-height: 100%;
	}

	.approach-caption {
		position: absolute;
		left: 1rem;
		right: 1rem;
		bottom: 1rem;
		padding: 1rem;
		background: rgba(22, 17, 12, 0.76);
		backdrop-filter: blur(12px);
		color: #f6eee1;
	}

	.approach-caption span {
		display: block;
		margin-bottom: 0.35rem;
		font-size: 0.72rem;
		font-weight: 800;
		text-transform: uppercase;
		letter-spacing: 0.16em;
		color: #dcb377;
	}

	.approach-caption p {
		margin: 0;
		color: rgba(246, 238, 225, 0.8);
	}

	.results {
		display: grid;
		grid-template-columns: minmax(0, 0.85fr) minmax(0, 1.15fr);
		gap: 1rem;
		padding-top: 2rem;
		padding-bottom: 3rem;
	}

	.results-copy {
		padding-right: 1rem;
	}

	.testimonial-stack {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 1rem;
	}

	.testimonial {
		margin: 0;
		padding: 1.4rem;
		min-height: 18rem;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.testimonial p {
		margin: 0;
		font-size: clamp(1.7rem, 2.8vw, 2.4rem);
		line-height: 1.02;
	}

	.testimonial footer {
		font-size: 0.82rem;
		text-transform: uppercase;
		letter-spacing: 0.16em;
		color: var(--muted);
	}

	.consultation {
		display: grid;
		grid-template-columns: minmax(0, 1fr) minmax(18rem, 24rem);
		gap: 1rem;
		align-items: stretch;
		padding-top: 1rem;
		padding-bottom: 4rem;
	}

	.consultation-card {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		gap: 1.4rem;
		padding: 1.4rem;
	}

	[data-reveal] {
		opacity: 0;
		transform: translateY(32px);
		transition:
			transform 700ms cubic-bezier(0.2, 0.9, 0.2, 1) var(--delay, 0ms),
			opacity 700ms ease var(--delay, 0ms);
	}

	:global([data-reveal].in-view) {
		opacity: 1;
		transform: translateY(0);
	}

	@keyframes frameShiftA {
		0%,
		100% {
			clip-path: polygon(10% 0, 100% 0, 100% 82%, 88% 100%, 0 100%, 0 14%);
			transform: translate3d(0, 0, 0);
		}
		50% {
			clip-path: polygon(14% 0, 100% 4%, 100% 88%, 84% 100%, 0 96%, 0 10%);
			transform: translate3d(0.3rem, -0.35rem, 0);
		}
	}

	@keyframes frameShiftB {
		0%,
		100% {
			clip-path: polygon(0 12%, 12% 0, 100% 0, 100% 88%, 88% 100%, 0 100%);
			transform: translate3d(0, 0, 0);
		}
		50% {
			clip-path: polygon(0 8%, 15% 0, 100% 0, 100% 92%, 84% 100%, 0 100%);
			transform: translate3d(-0.5rem, 0.35rem, 0);
		}
	}

	@media (max-width: 980px) {
		nav {
			flex-wrap: wrap;
		}

		.nav-links {
			order: 3;
			width: 100%;
			justify-content: space-between;
			gap: 0.8rem;
		}

		.hero,
		.section-grid,
		.approach,
		.results,
		.consultation {
			grid-template-columns: 1fr;
		}

		.metrics {
			grid-template-columns: 1fr;
		}

		.service-card,
		.testimonial {
			grid-column: span 12;
		}

		.testimonial-stack {
			grid-template-columns: 1fr;
		}

		.hero-visual {
			margin-top: 1rem;
		}
	}

	@media (max-width: 640px) {
		nav {
			padding-left: 1rem;
			padding-right: 1rem;
		}

		.hero {
			padding-top: 2rem;
		}

		.brand {
			font-size: 1.35rem;
		}

		.nav-links {
			font-size: 0.68rem;
		}

		.hero-badge {
			position: relative;
			top: auto;
			left: auto;
			margin-bottom: 0.9rem;
			max-width: none;
		}

		.hero-media {
			padding: 0.9rem;
		}

		.frame-b {
			inset: -0.5rem 0.5rem 0.5rem -0.5rem;
		}

		.hero-detail {
			grid-template-columns: 1fr;
		}

		.section-heading h2,
		.results-copy h2,
		.consultation-copy h2 {
			max-width: none;
		}
	}
</style>
