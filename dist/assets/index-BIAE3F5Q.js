(function(){const l=document.createElement("link").relList;if(l&&l.supports&&l.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))n(o);new MutationObserver(o=>{for(const r of o)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function a(o){const r={};return o.integrity&&(r.integrity=o.integrity),o.referrerPolicy&&(r.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?r.credentials="include":o.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(o){if(o.ep)return;o.ep=!0;const r=a(o);fetch(o.href,r)}})();const w="data.json";let m=null;function L(e){return e.reduce((l,a)=>{const n=a.category||"uncategorized";return l[n]||(l[n]=[]),l[n].push(a),l},{})}fetch(w).then(e=>e.json()).then(e=>{const l=L(e),a=document.getElementById("menu");a.classList.add("flex","flex-wrap","justify-between","items-center"),Object.entries(l).forEach(([n,o])=>{const r=document.createElement("div");r.classList.add("text-center","mx-2");const i=document.createElement("button");i.innerText=n.toUpperCase(),i.classList.add("p-0.5","hover:text-white","focus:outline-none","text-xl","font-bold");const t=document.createElement("div");t.classList.add("hidden","absolute","mt-2","z-50","text-left"),i.onclick=function(c){c.preventDefault(),t.classList.toggle("hidden"),m&&m!==t&&m.classList.add("hidden"),m=t.classList.contains("hidden")?null:t},o.forEach(c=>{const s=document.createElement("a");s.href="#",s.innerText=c.title,s.classList.add("block","px-0.5","py-0.5","text-xs","hover:text-white"),s.onclick=function(p){p.preventDefault(),t.classList.add("hidden"),N(n.toLowerCase(),c.title),m=null},t.appendChild(s)}),r.appendChild(i),r.appendChild(t),a.appendChild(r)})}).catch(e=>console.error("Error loading the data:",e));document.addEventListener("click",function(e){m&&!e.target.closest(".text-center")&&(m.classList.add("hidden"),m=null)});function N(e,l){document.querySelectorAll(".category-container").forEach(n=>{n.id.toLowerCase()===e?(n.style.display="",n.querySelectorAll("section").forEach(r=>{r.style.display=r.getAttribute("data-title")===l?"":"none"})):n.style.display="none"})}function k(e,l){if(shaka.Player.isBrowserSupported()){const a=document.createElement("div");a.className="w-full h-full",e.replaceWith(a),a.appendChild(e);const n=new shaka.Player;n.attach(e).then(()=>{const o=new shaka.ui.Overlay(n,a,e),r={addSeekBar:!0,addBigPlayButton:!0};o.configure(r),n.load(l).then(()=>{S(n)}).catch(i=>{console.error("Error setting up Shaka Player:",i),console.error("Failed to load video URL:",l);const t=document.createElement("div");t.textContent="Failed to load video. Please try again later.",t.style.position="absolute",t.style.top="50%",t.style.left="50%",t.style.transform="translate(-50%, -50%)",t.style.color="white",t.style.backgroundColor="rgba(0, 0, 0, 0.7)",t.style.padding="10px",t.style.borderRadius="5px",t.style.textAlign="center",a.appendChild(t)})})}else console.error("Browser not supported for Shaka Player")}function S(e){e.configure({streaming:{rebufferingGoal:5,bufferingGoal:10,bufferBehind:30,ignoreTextStreamFailures:!0,alwaysStreamText:!0}})}function P(e){e.setVolume(.5)}function A(e,l){const a=document.createElement("div");a.className="w-full h-full",e.replaceWith(a),a.appendChild(e);const n=WaveSurfer.create({container:a,waveColor:"#484848",progressColor:"#f80404",cursorColor:"black",cursorWidth:0,barWidth:null,barGap:null,barRadius:null,normalize:!0,dragToSeek:!0,mediaControls:!0,autoCenter:!0,sampleRate:48e3,backend:"MediaElement",partialRender:!0});return n.load(l),n.on("ready",function(){P(n)}),n.on("error",function(o){console.error("Error setting up WaveSurfer:",o)}),n}let y=null,g=null;document.addEventListener("DOMContentLoaded",()=>{fetch("data.json").then(e=>e.json()).then(e=>{e.forEach((l,a)=>{O(l,a+1)})}).catch(e=>console.error("Error loading JSON:",e)).catch(e=>{console.error("Error loading JSON:",e),console.log("Failed to load some videos due to the above error.")})});function O(e,l){const a=document.getElementById(e.category.toLowerCase());if(!a){console.warn(`No container found for category: ${e.category}`);return}const n=document.createElement("section");n.className="w-3/4 mx-auto py-4 text-xs",n.id=`${e.category.toLowerCase()}_${l}`,n.setAttribute("data-title",e.title);const o=document.createElement("h2");o.textContent=e.category,o.className="text-xl font-bold",n.appendChild(o);const r=document.createElement("h2");if(r.textContent=`${e.title}`,r.className="text-xl font-bold",n.appendChild(r),e.audioFormat){const t=document.createElement("p");t.textContent="Audio Format: "+e.audioFormat,t.className="text-base",n.appendChild(t)}if(e.subtitle){const t=document.createElement("p");t.textContent=e.subtitle,t.className="text-base",n.appendChild(t)}if(e.description){const t=document.createElement("p");t.textContent=e.description,t.className="text-base mt-4",n.appendChild(t)}if(e.videoUrls&&Array.isArray(e.videoUrls)&&e.videoUrls.forEach(t=>{const c=document.createElement("video");c.className="shaka-player w-full";const s=typeof t=="object"?t.url:t;if(typeof t=="object"){const p=document.createElement("p");p.textContent=t.videoTitle,p.className="text-center font-medium mt-4",n.appendChild(p),c.src=s,n.appendChild(c);const f=document.createElement("p");f.textContent=t.videoDescription,f.className="text-base text-center italic mt-3 ",n.appendChild(f);const d=document.createElement("p");d.textContent=t.videoMoreInfo,d.className="text-base text-center mt-2",n.appendChild(d);const u=document.createElement("hr");u.style.borderTop="0.5px solid currentColor",n.appendChild(u)}c.addEventListener("play",()=>{g&&g.pause(),y&&y!==c&&y.pause(),y=c}),k(c,s)}),e.audioUrls&&Array.isArray(e.audioUrls)&&e.audioUrls.forEach((t,c)=>{const s=document.createElement("div");s.className="audio-player wavesurfer-container",s.id=`audio-player-${l}-${c}`,n.appendChild(s);const p=typeof t=="object"?t.url:t;if(typeof t=="object"){const d=document.createElement("p");d.textContent=t.audioDescription,d.className="text-center italic",n.appendChild(d);const u=document.createElement("p");u.textContent=t.audioMoreInfo,u.className="text-center",n.appendChild(u)}const f=A(s,p);f.on("play",function(){y&&y.pause(),g&&g!==f&&g.pause(),g=f})}),e.imageUrl){const t=document.createElement("img");t.src=e.imageUrl,t.className="max-w-full h-auto",n.appendChild(t)}if(e.year){const t=document.createElement("p");t.textContent=e.year,t.className="text-base",n.appendChild(t)}if(e.text){const t=document.createElement("p");t.innerHTML=e.text,t.className="text-base",n.appendChild(t)}const i=document.createElement("hr");if(i.className="my-12 h-0.5 border-t-0 bg-neutral-100 dark:bg-white/10",n.appendChild(i),e.info){const t=document.createElement("div");t.className="info-container",Object.entries(e.info).forEach(([c,s],p,f)=>{if(s){const d=document.createElement("div");d.className="flex border-b";const u=document.createElement("span");u.innerHTML=`<strong>${c}:</strong>`,u.className="w-32";const E=document.createElement("span");if(Array.isArray(s)){const C=document.createElement("ul");s.forEach(v=>{const b=document.createElement("li");b.textContent=v,C.appendChild(b)}),E.appendChild(C)}else E.textContent=s;if(d.appendChild(u),d.appendChild(E),t.appendChild(d),p<f.length-1){const C=document.createElement("hr");C.style.borderTop="0.5px solid currentColor",t.appendChild(C)}}}),n.appendChild(t)}a.appendChild(n)}var x=document.getElementsByClassName("collapsible"),h;for(h=0;h<x.length;h++)x[h].addEventListener("click",function(){this.classList.toggle("active");var e=this.nextElementSibling;e.style.maxHeight?e.style.maxHeight=null:e.style.maxHeight=e.scrollHeight+"px"});window.addEventListener("scroll",function(){if(window.scrollY>100)for(h=0;h<x.length;h++){var e=x[h].nextElementSibling;e.style.maxHeight=null}});const T=document.getElementById("dark-mode-toggle");T.addEventListener("click",()=>{document.body.classList.toggle("dark")});
