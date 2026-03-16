<script>
// @ts-nocheck

import { onMount } from "svelte";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let cur;
let ring;

onMount(() => {

gsap.registerPlugin(ScrollTrigger);

let mx=0,my=0,rx=0,ry=0;

document.addEventListener('mousemove',e=>{
mx=e.clientX;
my=e.clientY;

gsap.to(cur,{
x:mx,
y:my,
duration:.1,
ease:'power3.out'
});

});

function loop(){
rx+=(mx-rx)*.1;
ry+=(my-ry)*.1;

gsap.set(ring,{
x:rx,
y:ry
});

requestAnimationFrame(loop);
}

loop();


document.querySelectorAll('a,button,.svc,.strip-stat,.proj').forEach(el=>{
el.addEventListener('mouseenter',()=>cur.classList.add('cursor-big'));
el.addEventListener('mouseleave',()=>cur.classList.remove('cursor-big'));
});


let pct=0;

const ldN=document.getElementById('ld-n');
const ldF=document.getElementById('ld-f');

const tick=setInterval(()=>{

pct+=Math.random()*20+4;

if(pct>100) pct=100;

ldN.textContent=Math.floor(pct);
ldF.style.width=pct+'%';

if(pct>=100){

clearInterval(tick);

setTimeout(()=>{

gsap.to('#loader',{
yPercent:-100,
duration:1.1,
ease:'expo.inOut',
onComplete:()=>{

document.getElementById('loader').style.display='none';

boot();

}
});

},280);

}

},55);



function boot(){

ScrollTrigger.create({
start:'top -70',
onUpdate:s=>document.getElementById('nav').classList.toggle('stuck',s.scroll()>70)
});


gsap.fromTo('#hero-big',
{opacity:0,x:60},
{opacity:1,x:0,duration:2,ease:'expo.out',delay:.2}
);

gsap.to('#hero-big',{
yPercent:30,
ease:'none',
scrollTrigger:{
trigger:'#hero',
start:'top top',
end:'bottom top',
scrub:2
}
});


gsap.to('.hero-glow-a',{
y:140,
ease:'none',
scrollTrigger:{
trigger:'#hero',
start:'top top',
end:'bottom top',
scrub:1.8
}
});


gsap.to('.hero-glow-b',{
y:-90,
ease:'none',
scrollTrigger:{
trigger:'#hero',
start:'top top',
end:'bottom top',
scrub:2.5
}
});


gsap.to('.sl-i',{
y:'0%',
duration:1.2,
ease:'expo.out',
stagger:.1,
delay:.15
});


gsap.to('#hero-eyebrow',{opacity:1,duration:.9,delay:.3});
gsap.to('#hero-desc',{opacity:1,y:0,duration:.9,delay:.7});
gsap.to('#hero-actions',{opacity:1,y:0,duration:.9,delay:.9});
gsap.to('#scroll-cue',{opacity:1,duration:.9,delay:1.1});


gsap.utils.toArray('.rv').forEach(el=>{
gsap.fromTo(el,
{opacity:0,y:40},
{opacity:1,y:0,duration:.88,ease:'power3.out',
scrollTrigger:{
trigger:el,
start:'top 88%',
toggleActions:'play none none none'
}}
);
});


gsap.utils.toArray('.proj').forEach((el,i)=>{
gsap.fromTo(el,
{opacity:0,x:-32},
{opacity:1,x:0,duration:.8,delay:i*.1,
scrollTrigger:{
trigger:el,
start:'top 90%',
toggleActions:'play none none none'
}}
);
});


gsap.utils.toArray('.svc').forEach((el,i)=>{
gsap.fromTo(el,
{opacity:0,y:36,scale:.97},
{opacity:1,y:0,scale:1,duration:.8,delay:(i%3)*.1,
scrollTrigger:{
trigger:el,
start:'top 90%',
toggleActions:'play none none none'
}}
);
});


[['s1',7],['s2',40],['s3',4]].forEach(([id,end])=>{

const el=document.getElementById(id);

ScrollTrigger.create({
trigger:el,
start:'top 85%',
once:true,
onEnter:()=>{

const obj={v:0};

gsap.to(obj,{
v:end,
duration:2,
ease:'power2.out',
onUpdate:()=>{ el.textContent=Math.round(obj.v); }
});

}
});

});

}

});
</script>



<div bind:this={cur} id="cur"></div>
<div bind:this={ring} id="cur-ring"></div>

<!-- Loader -->
<div id="loader">
  <div class="ld-num" id="ld-n">0</div>
  <div class="ld-bar">
    <div class="ld-fill" id="ld-f"></div>
  </div>
  <div class="ld-label">Loading portfolio</div>
</div>

<nav id="nav">

<a href="/" class="n-logo">
Bippo<b>.</b>
</a>

<div class="n-links">

<a href="#work" class="n-link">Work</a>
<a href="#services" class="n-link">Services</a>
<a href="#cta" class="n-link">Contact</a>

</div>

<a href="mailto:hello@bippo.shop" class="n-cta">
Start a Project
</a>

</nav>


<section id="hero">

<div class="hero-grid"></div>

<div class="hero-glow hero-glow-a"></div>
<div class="hero-glow hero-glow-b"></div>

<div class="hero-big" id="hero-big">B</div>

<div class="hero-eyebrow" id="hero-eyebrow">

<div class="hero-eyebrow-line"></div>

Digital studio · India & worldwide

</div>

<h1 class="hero-h1">

<span class="sl"><span class="sl-i">We craft</span></span>
<span class="sl"><span class="sl-i"><em>websites</em></span></span>
<span class="sl"><span class="sl-i">& digital</span></span>
<span class="sl"><span class="sl-i">products.</span></span>

</h1>

<div class="hero-bottom">

<p class="hero-desc" id="hero-desc">

Full-stack design and development for medical clinics,
B2B SaaS, luxury brands and ambitious founders.

</p>

<div class="hero-actions" id="hero-actions">

<a href="#work" class="btn-solid">
See Our Work
</a>

<a href="#cta" class="btn-line">
Start a project →
</a>

</div>

</div>

<div class="scroll-cue" id="scroll-cue">

<div class="scroll-tick"></div>
Scroll to explore

</div>

</section>