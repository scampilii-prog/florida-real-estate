/* Sitewide licensed-photo hero enhancement. Unsplash free photos; preserves existing imagery. */
(function(){
 var photos=[
 ['contact','photo-1499793983690-e29da59ef1c2'],
 ['waterfront','photo-1500375592092-40eb2168fd21'],
 ['condo','photo-1600607687920-4e2a09cf159d'],
 ['construction','photo-1600585154340-be6161a56a0c'],
 ['calculator','photo-1554224155-6726b3ff858f'],
 ['mortgage','photo-1554224155-6726b3ff858f'],
 ['sell','photo-1600596542815-ffad4c1539a9'],
 ['buyer','photo-1600596542815-ffad4c1539a9'],
 ['buy','photo-1600596542815-ffad4c1539a9'],
 ['guide','photo-1512917774080-9991f1c4c750'],
 ['question','photo-1600607687920-4e2a09cf159d'],
 ['rotonda','photo-1505693416388-ac5ce068fe85'],
 ['venice','photo-1499793983690-e29da59ef1c2'],
 ['boca','photo-1500375592092-40eb2168fd21'],
 ['cape','photo-1500375592092-40eb2168fd21'],
 ['englewood','photo-1499793983690-e29da59ef1c2'],
 ['siesta','photo-1499793983690-e29da59ef1c2'],
 ['wellen','photo-1600596542815-ffad4c1539a9'],
 ['nokomis','photo-1499793983690-e29da59ef1c2'],
 ['punta','photo-1500375592092-40eb2168fd21'],
 ['community','photo-1512917774080-9991f1c4c750'],
 ['search','photo-1512917774080-9991f1c4c750'],
 ['home','photo-1600596542815-ffad4c1539a9']
 ];
 function init(){
  var path=location.pathname.split('/').pop().toLowerCase(),hero=document.querySelector('.lead-intake, .hero, .about-hero');
  if(!hero)return;
  var photo=photos.find(function(row){return path.indexOf(row[0])!==-1;});
  var id=photo?photo[1]:'photo-1512917774080-9991f1c4c750';
  if(hero.classList.contains('about-hero')||hero.querySelector('img,video,picture')||hero.classList.contains('sc-photo-added'))return;
  var image='https://images.unsplash.com/'+id+'?auto=format&fit=crop&w=1600&q=78';
  if(hero.classList.contains('lead-intake')){
   hero.classList.add('sc-photo-added','sc-contact-photo');
   hero.style.setProperty('--sc-hero-photo','url("'+image+'")');
   return;
  }
  hero.classList.add('sc-photo-added','sc-standard-photo');
  hero.style.setProperty('--sc-hero-photo','url("'+image+'")');
 }
 var style=document.createElement('style');style.textContent=
 '.sc-contact-photo{position:relative!important;background-image:linear-gradient(90deg,rgba(8,27,44,.20),rgba(8,27,44,.12)),var(--sc-hero-photo)!important;background-size:cover!important;background-position:center!important}'+
 '.sc-standard-photo{position:relative!important;background-image:linear-gradient(90deg,rgba(12,39,60,.20),rgba(12,39,60,.12)),var(--sc-hero-photo)!important;background-size:cover!important;background-position:center!important;color:#fff!important}'+
 '.sc-standard-photo h1,.sc-standard-photo h2,.sc-standard-photo p,.sc-standard-photo small{color:#fff!important;text-shadow:0 1px 10px #071e2c77}'+
 '@media(max-width:700px){.sc-contact-photo{background-image:linear-gradient(90deg,rgba(8,27,44,.20),rgba(8,27,44,.15)),var(--sc-hero-photo)!important}.sc-standard-photo{background-position:center!important}}';
 document.head.appendChild(style);
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();