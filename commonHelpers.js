import{S as d,i as h}from"./assets/vendor-0fc460d7.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function s(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(e){if(e.ep)return;e.ep=!0;const r=s(e);fetch(e.href,r)}})();function p(t){const o="https://pixabay.com/api/",s=new URLSearchParams({key:"44041025-2e091a4b621ea033778029d2c",q:t,image_type:"photo",orientation:"horizontal",safesearch:"true"}),i=`${o}?${s}`;return fetch(i).then(e=>{if(!e.ok)throw new Error(e.status);return e.json()}).then(e=>e.hits)}const u=document.querySelector(".gallery"),f=document.querySelector(".loader");let l;function m(t){u.innerHTML=t.map(o=>y(o)).join(""),l?l.refresh():l=new d(".gallery a",{captionDelay:250,captionsData:"alt"})}function y(t){return`
    <div class="photo-card">
      <a class="link" href="${t.largeImageURL}">
        <img class="gallery-image" src="${t.webformatURL}" alt="${t.tags}">
        <div class="info">
        <li><h3 class="info-title">Likes</h3><p class="info-text">${t.likes}</p></li>
        <li><h3 class="info-title">Views</h3><p class="info-text">${t.views}</p></li>
        <li><h3 class="info-title">Comments</h3><p class="info-text">${t.comments}</p></li>
        <li><h3 class="info-title">Downloads</h3><p class="info-text">${t.downloads}</p></li>
      </div>
      </a>
    </div>
  `}function g(){f.style.display="block"}function L(){f.style.display="none"}function a(t){h.error({icon:"",backgroundColor:"#ef4040",position:"topRight",message:"Sorry, there are no images matching your search query. Please, try again!",messageColor:"white"})}function w(){u.innerHTML=""}const b=document.querySelector(".form"),c=document.querySelector(".input");b.addEventListener("submit",t=>{t.preventDefault();const o=c.value.trim();if(!o){a();return}g(),p(o).then(s=>{c.value===""?(w(),a()):m(s)}).catch(s=>{a(message)}).finally(()=>{L()})});
//# sourceMappingURL=commonHelpers.js.map
