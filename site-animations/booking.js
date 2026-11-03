(()=>{
const f=document.getElementById('booking-form');if(!f)return;
const status=document.getElementById('form-status'),button=f.querySelector('button[type=submit]'),type=f.elements.request_type,slot=f.elements.slot,time=f.elements.time,date=f.elements.date,guests=f.elements.guests;
const demo=location.hostname.endsWith('.chatgpt.site')||location.protocol==='file:';
let tokenPromise;
// Clear confirmation once a request is sent: the form is replaced by a panel that recaps the request,
// is scrolled into view and announced to screen readers. "Envoyer une autre demande" brings the form back.
function showSent(test){const fd=new FormData(f),label={table:'Réservation au bar',atelier:'Atelier cocktails / EVJF',evenement:'Événement / privatisation'}[fd.get('request_type')]||'Demande';
 const dt=fd.get('date')?new Date(fd.get('date')+'T12:00:00').toLocaleDateString('fr-FR',{weekday:'long',day:'numeric',month:'long'}).replace(/^./,c=>c.toUpperCase()):'';
 const rows=[['Demande',label],['Date souhaitée',dt],['Personnes',fd.get('guests')],['Créneau',fd.get('request_type')==='atelier'?(fd.get('slot')||'').replace('-','h–')+'h':''],['Heure',fd.get('request_type')!=='atelier'&&fd.get('time')?fd.get('time').replace(':','h'):''],['Email de réponse',fd.get('email')]].filter(r=>r[1]);
 let panel=document.getElementById('booking-sent');if(!panel){panel=document.createElement('div');panel.id='booking-sent';panel.className='booking-sent';panel.tabIndex=-1;panel.setAttribute('role','status');f.after(panel);}
 panel.innerHTML='<svg class="booking-sent-icon" viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="24" r="22"/><path d="M14 24.5l7 7 13-14"/></svg><h3></h3><p class="booking-sent-lead"></p><dl></dl><p class="booking-sent-note"></p><button type="button" class="button booking-sent-again">Envoyer une autre demande</button>';
 panel.querySelector('h3').textContent=test?'Test réussi':'Demande envoyée';
 panel.querySelector('.booking-sent-lead').textContent=test?'Les champs sont valides. Aucun email n’a été envoyé depuis cet aperçu.':'Merci ! Notre équipe a bien reçu votre demande et vous répondra par email ou par téléphone.';
 const dl=panel.querySelector('dl');rows.forEach(([k,v])=>{const dt2=document.createElement('dt'),dd=document.createElement('dd');dt2.textContent=k;dd.textContent=v;dl.append(dt2,dd);});
 panel.querySelector('.booking-sent-note').textContent='Votre réservation sera confirmée après échange avec nous. Pour ce soir, appelez le 01 84 06 18 90.';
 panel.querySelector('.booking-sent-again').addEventListener('click',()=>{panel.hidden=true;f.hidden=false;f.querySelector('select,input').focus();});
 f.hidden=true;panel.hidden=false;status.textContent='';
 panel.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'center'});panel.focus({preventScroll:true});}

const CHECK='<svg class="status-check" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7"/></svg>';
function say(text,kind){status.classList.remove('is-shown');status.dataset.kind=kind||'info';status.innerHTML=(kind==='success'?CHECK:'')+'<span></span>';status.lastChild.textContent=text;void status.offsetWidth;status.classList.add('is-shown');}

const today=new Date();date.min=[today.getFullYear(),String(today.getMonth()+1).padStart(2,'0'),String(today.getDate()).padStart(2,'0')].join('-');
function update(){const workshop=type.value==='atelier';document.getElementById('slot-label').hidden=!workshop;slot.required=workshop;slot.disabled=!workshop;const timeLabel=document.getElementById('time-label');timeLabel.hidden=workshop;time.disabled=workshop;time.required=type.value==='table';timeLabel.firstChild.textContent=type.value==='evenement'?'Heure (facultatif)':'Heure d’arrivée';guests.min=workshop?'4':'1';guests.max=workshop?'10':'200';date.setCustomValidity('');}
function validDay(){const day=new Date(date.value+'T12:00:00').getDay();date.setCustomValidity(date.value&&[0,1].includes(day)?'Choisissez une date du mardi au samedi.':'');}
type.addEventListener('change',update);date.addEventListener('input',validDay);update();
document.querySelectorAll('[data-request]').forEach(a=>a.addEventListener('click',()=>{type.value=a.dataset.request;update();document.getElementById('contact-title').textContent=type.value==='atelier'?'Votre atelier cocktails.':'Votre réservation au Calbar.';}));
async function token(){const r=await fetch('api/request.php',{credentials:'same-origin',cache:'no-store'});if(!r.ok)throw new Error();const d=await r.json();if(!d.csrf)throw new Error();f.elements.csrf.value=d.csrf;}
if(demo)say('Aperçu : test du formulaire uniquement, aucun email ne sera envoyé.');
else {tokenPromise=token().catch(()=>{say('Le formulaire n’est pas encore disponible. Appelez-nous au 01 84 06 18 90.','error');return false;});}
f.addEventListener('submit',async e=>{e.preventDefault();validDay();if(!f.reportValidity())return;
if(demo){showSent(true);return;}
button.disabled=true;say('Envoi en cours…');
try{await tokenPromise;if(!f.elements.csrf.value)throw new Error();const r=await fetch(f.action,{method:'POST',body:new FormData(f),credentials:'same-origin',headers:{Accept:'application/json'}});const d=await r.json();if(!r.ok||!d.ok)throw new Error(d.message||'');showSent(false);f.reset();update();await token();}catch(err){say(err.message||'L’envoi n’a pas abouti. Réessayez ou appelez-nous au 01 84 06 18 90.','error');}finally{button.disabled=false;}
});
})();
