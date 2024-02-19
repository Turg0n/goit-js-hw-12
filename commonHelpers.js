import{i as d,a as b,S as v}from"./assets/vendor-5401a4b0.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))c(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const f of s.addedNodes)f.tagName==="LINK"&&f.rel==="modulepreload"&&c(f)}).observe(document,{childList:!0,subtree:!0});function r(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerPolicy&&(s.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?s.credentials="include":t.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function c(t){if(t.ep)return;t.ep=!0;const s=r(t);fetch(t.href,s)}})();const w=document.querySelector("form"),I=document.getElementById("searchImageText"),h=document.querySelector(".gallery"),a=document.getElementById("loadMoreButton");let m=1,n,p=0,g="",l;const y=15;document.addEventListener("DOMContentLoaded",function(){R()});w.addEventListener("submit",e=>{if(e.preventDefault(),g=document.getElementById("searchImage").value,g.trim()===""){d.info({message:"Please enter what you want to find!",position:"topRight"});return}else m=1,n=[],i(),L(g).then(r=>{if(n=r,n.length===0)i(),d.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"}),u(),a.classList.add("isHidden");else if(p<=y){i(),u(),a.classList.add("isHidden"),l.refresh(),d.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"});return}else i(),a.classList.remove("isHidden"),u(),l.refresh()}).catch(r=>{console.log(r)})});a.addEventListener("click",e=>{const o=document.querySelector(".gallery-item").getBoundingClientRect().height;m+=1,n=[],i(),L(g).then(r=>{n=r,n.length===0?(i(),d.error({message:"There are no images matching your search query. Please try again!",position:"topRight"}),u(),a.classList.add("isHidden")):(i(),a.classList.remove("isHidden"),u(!0),E(),l.refresh(),window.scrollBy({top:o*2,behavior:"smooth"}))})});async function L(e){const r="https://pixabay.com/api/?key="+"42377778-b3c1271d36d2a7f0c3b2221f8"+"&q="+encodeURIComponent(e)+"&image_type=photo&orientation=horizontal&safe_search=true&page="+m+"&per_page="+y,c=await b.get(r);return p=c.data.totalHits,c.data.hits}function i(){I.classList.toggle("isHidden")}function H(e){return`<div class="gallery-item">
    <a href="${e.largeImageURL}" class="gallery-link">
        <img src="${e.webformatURL}" alt="${e.tags}" loading="lazy" class="gallery-image" />
    </a>
    <div class="info">
        <p class="info-item">
        <b>Likes:</b> ${e.likes}
        </p>
        <p class="info-item">
        <b>Views:</b> ${e.views}
        </p>
        <p class="info-item">
        <b>Comments:</b> ${e.comments}
        </p>
        <p class="info-item">
        <b>Downloads:</b> ${e.downloads}
        </p>
    </div>
    </div>`}function P(){return n.map(H).join("")}function u(e=!1){const o=P();e?h.insertAdjacentHTML("beforeend",o):h.innerHTML=o}function E(){n.length===p&&(a.classList.add("isHidden"),d.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"}))}function R(){let e={captionsData:"alt",captionDelay:250,captions:!0};l=new v(".gallery a",e),l.on("show.simplelightbox",function(){}),l.refresh()}
//# sourceMappingURL=commonHelpers.js.map
