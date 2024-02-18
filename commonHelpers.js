import{i as d,a as L,S as b}from"./assets/vendor-5401a4b0.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))c(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const f of o.addedNodes)f.tagName==="LINK"&&f.rel==="modulepreload"&&c(f)}).observe(document,{childList:!0,subtree:!0});function r(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function c(t){if(t.ep)return;t.ep=!0;const o=r(t);fetch(t.href,o)}})();const v=document.querySelector("form"),w=document.getElementById("searchImageText"),h=document.querySelector(".gallery"),i=document.getElementById("loadMoreButton");let m=1,a,p=0,g="",l;document.addEventListener("DOMContentLoaded",function(){P()});i.addEventListener("click",e=>{const s=document.querySelector(".gallery-item").getBoundingClientRect().height;m+=1,n(),y(g).then(r=>{a=r,a.length===0?(n(),d.error({message:"There are no images matching your search query. Please try again!",position:"topRight"}),u(),i.classList.add("isHidden")):(n(),i.classList.remove("isHidden"),a.push(...r),u(!0),E(),l.refresh(),window.scrollBy({top:s*2,behavior:"smooth"}))})});v.addEventListener("submit",e=>{if(e.preventDefault(),g=document.getElementById("searchImage").value,g.trim()===""){d.info({message:"Please enter what you want to find!",position:"topRight"});return}else m=1,n(),y(g).then(r=>{if(a=r,a.length===0)n(),d.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"}),u(),i.classList.add("isHidden");else if(p<=15){n(),u(),i.classList.add("isHidden"),l.refresh(),d.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"});return}else n(),i.classList.remove("isHidden"),u(),l.refresh()}).catch(r=>{console.log(r)})});async function y(e){const r="https://pixabay.com/api/?key="+"42377778-b3c1271d36d2a7f0c3b2221f8"+"&q="+encodeURIComponent(e)+"&image_type=photo&orientation=horizontal&safe_search=true&page="+m+"&per_page=15&",c=await L.get(r);return p=c.data.totalHits,c.data.hits}function n(){w.classList.toggle("isHidden")}function I(e){return`<div class="gallery-item">
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
    </div>`}function H(){return a.map(I).join("")}function u(e=!1){const s=H();e?h.insertAdjacentHTML("beforeend",s):h.innerHTML=s}function E(){a.length===p&&(i.classList.add("isHidden"),d.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"}))}function P(){let e={captionsData:"alt",captionDelay:250,captions:!0};l=new b(".gallery a",e),l.on("show.simplelightbox",function(){}),l.refresh()}
//# sourceMappingURL=commonHelpers.js.map
