(function(){
  var nav=document.getElementById("nav"),links=document.getElementById("links"),burger=document.getElementById("burger");
 function onScroll(){nav.classList.toggle("small",window.scrollY>30)}
 window.addEventListener("scroll",onScroll,{passive:true});onScroll();
 burger.addEventListener("click",function(){links.classList.toggle("open")});
 links.addEventListener("click",function(e){if(e.target.tagName==="A")links.classList.remove("open")});

 var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target)}})},{threshold:.15});
 document.querySelectorAll(".reveal").forEach(function(el){io.observe(el)});

 /* lien actif */
 var secs=[].slice.call(document.querySelectorAll("section[id]")),as=[].slice.call(links.querySelectorAll("a:not(.btn)"));
 var so=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){as.forEach(function(a){a.classList.toggle("on",a.getAttribute("href")==="#"+e.target.id)})}})},{rootMargin:"-45% 0px -50% 0px"});
 secs.forEach(function(s){so.observe(s)});

 /* compteurs */
 document.querySelectorAll("[data-n]").forEach(function(el){
  var n=parseFloat(el.dataset.n),dec=n%1?1:0,t0=null;
  function step(t){if(!t0)t0=t;var p=Math.min((t-t0)/1400,1);el.textContent=(n*p).toFixed(dec).replace(".",",");if(p<1)requestAnimationFrame(step)}
  setTimeout(function(){requestAnimationFrame(step)},500);
 });


 var home=document.getElementById("pagehome"),dv=document.getElementById("pagedevis"),T0=document.title,fm={rafraichir:0,renover:1,transformer:2};
 function route(){
  var h=decodeURIComponent(location.hash.slice(1)),d=h.indexOf("devis")===0;
  home.hidden=d;dv.hidden=!d;document.title=d?"Demander un devis – Chiappi Rénovation, Nice":T0;
  if(d){as.forEach(function(a){a.classList.remove("on")});var k=h.split("-")[1];if(k&&k in fm)document.getElementById("formule").selectedIndex=fm[k];window.scrollTo(0,0)}
  else{var el=h&&document.getElementById(h);if(el)el.scrollIntoView();else window.scrollTo(0,0)}
  onScroll();
 }
 window.addEventListener("hashchange",route);route();
 document.getElementById("f").addEventListener("submit",function(e){
  e.preventDefault();var g=function(i){return document.getElementById(i).value};
  var body=["Nom : "+g("nom"),"Téléphone : "+g("tel"),"E-mail : "+g("mail"),"Ville : "+g("ville"),"Bien : "+g("bien")+(g("surf")?" – "+g("surf")+" m²":""),"Projet : "+g("type"),"Formule : "+g("formule"),"Délai : "+g("delai"),"","Message :",g("msg")].join("\n");
  document.getElementById("ok").style.display="inline";
  window.location.href="mailto:contact@chiappi-renovation.fr?subject="+encodeURIComponent("Demande de devis – "+g("type"))+"&body="+encodeURIComponent(body);
 });
})();
