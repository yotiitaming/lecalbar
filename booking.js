(()=>{
const f=document.getElementById('booking-form');if(!f)return;
const status=document.getElementById('form-status'),button=f.querySelector('button[type=submit]'),type=f.elements.request_type,slot=f.elements.slot,date=f.elements.date,guests=f.elements.guests;
const demo=(location.hostname.endsWith('.chatgpt.site')||location.hostname.endsWith('.github.io'))||location.protocol==='file:';
let tokenPromise;
const today=new Date();date.min=[today.getFullYear(),String(today.getMonth()+1).padStart(2,'0'),String(today.getDate()).padStart(2,'0')].join('-');
function update(){const workshop=type.value==='atelier';document.getElementById('slot-label').hidden=!workshop;slot.required=workshop;slot.disabled=!workshop;guests.min=workshop?'4':'1';guests.max=workshop?'10':'200';date.setCustomValidity('');}
function validDay(){const day=new Date(date.value+'T12:00:00').getDay();date.setCustomValidity(date.value&&[0,1].includes(day)?'Choisissez une date du mardi au samedi.':'');}
type.addEventListener('change',update);date.addEventListener('input',validDay);update();
document.querySelectorAll('[data-request]').forEach(a=>a.addEventListener('click',()=>{type.value=a.dataset.request;update();document.getElementById('contact-title').textContent=type.value==='atelier'?'Votre atelier cocktails.':'Votre réservation au Calbar.';}));
async function token(){const r=await fetch('api/request.php',{credentials:'same-origin',cache:'no-store'});if(!r.ok)throw new Error();const d=await r.json();if(!d.csrf)throw new Error();f.elements.csrf.value=d.csrf;}
if(demo)status.textContent='Aperçu : test du formulaire uniquement, aucun email ne sera envoyé.';
else {tokenPromise=token().catch(()=>{status.textContent='Le formulaire n’est pas encore disponible. Appelez-nous au 01 84 06 18 90.';return false;});}
f.addEventListener('submit',async e=>{e.preventDefault();validDay();if(!f.reportValidity())return;
if(demo){status.textContent='Test réussi : les champs sont valides. Aucun email n’a été envoyé depuis cet aperçu.';return;}
button.disabled=true;status.textContent='Envoi en cours…';
try{await tokenPromise;if(!f.elements.csrf.value)throw new Error();const r=await fetch(f.action,{method:'POST',body:new FormData(f),credentials:'same-origin',headers:{Accept:'application/json'}});const d=await r.json();if(!r.ok||!d.ok)throw new Error(d.message||'');status.textContent='Votre demande a été transmise à notre équipe. La réservation reste à confirmer.';f.reset();update();await token();}catch(err){status.textContent=err.message||'L’envoi n’a pas abouti. Réessayez ou appelez-nous au 01 84 06 18 90.';}finally{button.disabled=false;}
});
})();
