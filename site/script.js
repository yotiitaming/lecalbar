const techniques={"milk": {"category": "COCKTAIL CLARIFIÉ AU LAIT", "title": "Clear Milk Punch", "description": "La clarification au lait permet d’obtenir un cocktail limpide et une texture soyeuse, tout en conservant ses arômes.", "steps": ["Les ingrédients du cocktail sont mis en contact avec le lait.", "La préparation est filtrée lentement pour retenir les particules en suspension.", "Le résultat est un cocktail clarifié à la texture soyeuse."], "recipe": "Kingston", "ingredients": "Trio Rhums · Bondamonjack · Cacao / Banane · Passion", "note": "Trace de lactose", "alt": "Kingston, cocktail signature du Calbar clarifié au lait", "image": "assets/tech-kingston.png"}, "fatwash": {"category": "INFUSION PAR LA MATIÈRE GRASSE", "title": "Fat wash", "description": "Le fat wash permet de transmettre les arômes d’une matière grasse à un alcool. Montréal met cette technique à l’honneur avec un fat wash à la noisette.", "steps": ["La matière grasse est mise en contact avec l’alcool pour lui transmettre ses arômes.", "Le mélange est refroidi afin de figer la matière grasse.", "La filtration permet de la retirer tout en conservant les arômes."], "recipe": "Montréal", "ingredients": "Whisky · « Fatwash » noisette · Sirop d’érable · Feuille de bétel · Bitter thym", "note": "", "alt": "Montréal, cocktail signature du Calbar au fat wash noisette", "image": "assets/tech-montreal.png"}, "carbon": {"category": "CLARIFICATION À L’AGAR-AGAR", "title": "Clarification à l’agar-agar", "description": "La clarification à l’agar-agar permet de retenir les particules en suspension et d’obtenir un liquide plus limpide. Cette technique est illustrée ici par Rio de Janeiro.", "steps": ["L’agar-agar forme un gel qui retient les particules en suspension.", "La préparation est ensuite filtrée pour récupérer le liquide clarifié.", "Les arômes sont conservés dans un cocktail plus limpide."], "recipe": "Rio de Janeiro", "ingredients": "Cachaça · Cardamome · Café · Monkey Shoulder · Citron frais · Gazéifié", "note": "", "alt": "Rio de Janeiro, cocktail signature du Calbar illustrant la clarification à l’agar-agar", "image": "assets/tech-rio.png"}};
function selectTechnique(key){const t=techniques[key];document.querySelectorAll('[data-tech]').forEach(b=>{const active=b.dataset.tech===key;b.setAttribute('aria-selected',String(active));b.tabIndex=active?0:-1});document.getElementById('technique-panel').setAttribute('aria-labelledby','tab-'+key);for(const [id,value] of Object.entries({'tech-category':t.category,'tech-title':t.title,'tech-description':t.description,'recipe-title':t.recipe,'recipe-ingredients':t.ingredients,'recipe-note':t.note}))document.getElementById(id).textContent=value;document.getElementById('tech-steps').replaceChildren(...t.steps.map(s=>{const li=document.createElement('li');li.textContent=s;return li}));const img=document.getElementById('tech-image');img.src=t.image;img.alt=t.alt;}
const tabs=[...document.querySelectorAll('[data-tech]')];tabs.forEach((b,i)=>{b.addEventListener('click',()=>selectTechnique(b.dataset.tech));b.addEventListener('keydown',e=>{let j;if(e.key==='ArrowRight')j=(i+1)%tabs.length;else if(e.key==='ArrowLeft')j=(i+tabs.length-1)%tabs.length;else if(e.key==='Home')j=0;else if(e.key==='End')j=tabs.length-1;else return;e.preventDefault();selectTechnique(tabs[j].dataset.tech);tabs[j].focus()})});selectTechnique('milk');

// Size the embedded menu to its content, independent of the iframe viewport.
document.querySelectorAll('#drinks-menu-frame,#food-menu-frame').forEach(drinksFrame=>{
drinksFrame.addEventListener('load',()=>{
 const doc=drinksFrame.contentDocument;if(!doc)return;
 let queued=false,observed;
 const fit=()=>{if(queued)return;queued=true;requestAnimationFrame(()=>{
  queued=false;
  const main=doc.querySelector('main');if(!main)return;
  if(!doc.getElementById('calbar-embed-sizing')){
   const style=doc.createElement('style');style.id='calbar-embed-sizing';
   const siteBackground=getComputedStyle(document.body).backgroundColor;
   style.textContent='html,body{height:auto!important;min-height:0!important;margin:0!important}body{display:block!important}main{min-height:0!important;padding-top:24px!important}main>header{margin-bottom:36px!important}main>header h1{font-size:clamp(32px,5vw,52px)!important}html,body,main,#__bundler_thumbnail{background:'+siteBackground+'!important}';
   (doc.head||doc.documentElement).appendChild(style);
  }
  if(main!==observed){resize.disconnect();resize.observe(main);observed=main;}
  const height=Math.ceil(main.getBoundingClientRect().height);
  if(height>0&&drinksFrame.style.height!==height+'px')drinksFrame.style.height=height+'px';
 });};
 const resize=new ResizeObserver(fit);
 new MutationObserver(fit).observe(doc,{childList:true,subtree:true});
 window.addEventListener('resize',fit);fit();if(doc.fonts)doc.fonts.ready.then(fit);
});
});

// Menu categories behave as accessible tabs, including direct hash links.
const menuTabs=[...document.querySelectorAll('[data-menu]')];
function showMenu(key,updateHash=false){
 if(!['drinks','food'].includes(key))return;
 menuTabs.forEach(tab=>{const active=tab.dataset.menu===key;tab.setAttribute('aria-selected',String(active));tab.tabIndex=active?0:-1;document.getElementById(tab.getAttribute('aria-controls')).hidden=!active;});
 window.dispatchEvent(new Event('resize'));
 if(updateHash)history.replaceState(null,'','#menu-'+key);
}
menuTabs.forEach((tab,index)=>{
 tab.addEventListener('click',()=>showMenu(tab.dataset.menu,true));
 tab.addEventListener('keydown',event=>{let next;if(event.key==='ArrowRight'||event.key==='ArrowLeft')next=(index+1)%menuTabs.length;else if(event.key==='Home')next=0;else if(event.key==='End')next=menuTabs.length-1;else return;event.preventDefault();showMenu(menuTabs[next].dataset.menu,true);menuTabs[next].focus();});
});
function menuFromHash(){if(location.hash==='#menu-food')showMenu('food');else if(location.hash==='#menu-drinks'||location.hash==='#menus')showMenu('drinks');}
window.addEventListener('hashchange',menuFromHash);
document.querySelectorAll('a[href="#menu-drinks"],a[href="#menu-food"],a[href="#menus"]').forEach(link=>link.addEventListener('click',()=>showMenu(link.hash==='#menu-food'?'food':'drinks')));
menuFromHash();

const heroVideo=document.getElementById('hero-video');
if(heroVideo){
 heroVideo.defaultMuted=true;heroVideo.muted=true;heroVideo.autoplay=true;heroVideo.loop=true;heroVideo.playsInline=true;heroVideo.controls=false;
 heroVideo.setAttribute('muted','');heroVideo.setAttribute('playsinline','');heroVideo.setAttribute('webkit-playsinline','');
 const tryPlay=()=>{if(document.hidden||!heroVideo.paused)return;heroVideo.muted=true;const attempt=heroVideo.play();if(attempt)attempt.catch(()=>{});};
 ['loadeddata','canplay'].forEach(event=>heroVideo.addEventListener(event,tryPlay));
 window.addEventListener('pageshow',tryPlay);
 document.addEventListener('visibilitychange',tryPlay);
 ['pointerdown','touchend','keydown'].forEach(event=>document.addEventListener(event,tryPlay,{passive:true}));
 tryPlay();
}

const heroActions=document.querySelector('.hero-actions'),siteHeader=document.querySelector('.site-header');
if(heroActions&&siteHeader){const observer=new IntersectionObserver(entries=>{const e=entries[0];siteHeader.classList.toggle('show-shortcuts',!e.isIntersecting&&e.boundingClientRect.bottom<=siteHeader.offsetHeight);},{rootMargin:'-80px 0px 0px 0px',threshold:0});observer.observe(heroActions);}

// Menu preview: show the start of the menu, reveal the rest on demand.
(()=>{const preview=document.getElementById('menu-preview'),toggle=document.querySelector('.menu-toggle');if(!preview||!toggle)return;
const sync=()=>{const panel=preview.querySelector('.menu-category:not([hidden]) .menu-sheet');if(!panel)return;const collapsed=preview.classList.contains('is-collapsed');const tall=!!panel.closest('.menu-category').querySelector('.menu-teaser')||panel.scrollHeight>parseFloat(getComputedStyle(panel).maxHeight||0)+40;toggle.parentElement.hidden=collapsed&&!tall;};
toggle.addEventListener('click',()=>{const open=preview.classList.toggle('is-collapsed')===false;toggle.setAttribute('aria-expanded',String(open));toggle.textContent=open?'Réduire la carte':'Voir toute la carte';if(!open)document.getElementById('menus').scrollIntoView({block:'start'});sync();});
document.querySelectorAll('[data-menu]').forEach(b=>b.addEventListener('click',()=>requestAnimationFrame(sync)));
document.querySelectorAll('#drinks-menu-frame,#food-menu-frame').forEach(f=>f.addEventListener('load',()=>setTimeout(sync,300)));
window.addEventListener('resize',sync);setTimeout(sync,800);})();
