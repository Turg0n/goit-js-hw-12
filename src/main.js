import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import axios from 'axios';


const myForm = document.querySelector('form');
const messageLoad = document.getElementById('searchImageText');
const gallery = document.querySelector('.gallery');
const loadMoreButton = document.getElementById('loadMoreButton');
let currentPages = 1;
let imageArray;
let totalHits=0;
let inputValue='';
let galleryDll;
const perPage = 40
document.addEventListener('DOMContentLoaded', function() {
    openLightbox();
});

loadMoreButton.addEventListener('click', e => {
    const galleryCardHeight = document.querySelector('.gallery-item').getBoundingClientRect().height;
    currentPages += 1;
    showHidemessageLoad();
    getImage(inputValue)
    .then(posts => {
        imageArray = posts;
        if (imageArray.length === 0) {
            showHidemessageLoad();
            iziToast.error({
            message:
                'There are no images matching your search query. Please try again!',
            position: 'topRight',
            });
        render();
        loadMoreButton.classList.add('isHidden');
        } else {
        showHidemessageLoad();
        loadMoreButton.classList.remove('isHidden');
        imageArray.push(...posts);
        render(true);
        controlEndsOfImage();
        
        galleryDll.refresh();
        window.scrollBy({
        top: galleryCardHeight * 2,
        behavior: 'smooth'
        });
    }
    })
});

myForm.addEventListener('submit', e => {
    e.preventDefault();
    const searchInput = document.getElementById('searchImage');
    inputValue = searchInput.value;
    if (inputValue.trim() === '') {
    iziToast.info({
        message: 'Please enter what you want to find!',
        position: 'topRight',
    });
    return;
    } else {
    currentPages = 1;
    imageArray = [];
    showHidemessageLoad();
    getImage(inputValue)
        .then(posts => {
        imageArray = posts;
        if (imageArray.length === 0) {
            showHidemessageLoad();
            iziToast.error({
            message:
                'Sorry, there are no images matching your search query. Please try again!',
            position: 'topRight',
            });
            render();
            loadMoreButton.classList.add('isHidden');
        } else if (totalHits <= perPage) {
            showHidemessageLoad();
            render();
            loadMoreButton.classList.add('isHidden');
            galleryDll.refresh();
            iziToast.info({
            message: "We're sorry, but you've reached the end of search results.",
            position: 'topRight',
            });
            return;
        } else {
            showHidemessageLoad();
            loadMoreButton.classList.remove('isHidden');
            render();
            galleryDll.refresh();
        }
        })
        .catch(error => {
        console.log(error);
        });
    }
});

async function getImage(inputValue) {
    const API_KEY = '42377778-b3c1271d36d2a7f0c3b2221f8';
    const URL =
    'https://pixabay.com/api/?key=' +
    API_KEY +
    '&q=' +
    encodeURIComponent(inputValue) +
    '&image_type=photo&orientation=horizontal&safe_search=true&page='+currentPages+'&per_page=15&';
    const response = await axios.get (URL, );
    totalHits = response.data.totalHits;
    return response.data.hits;
}

function showHidemessageLoad() {
    messageLoad.classList.toggle('isHidden');
}
function productTemplate(item) {
    return `<div class="gallery-item">
    <a href="${item.largeImageURL}" class="gallery-link">
        <img src="${item.webformatURL}" alt="${item.tags}" loading="lazy" class="gallery-image" />
    </a>
    <div class="info">
        <p class="info-item">
        <b>Likes:</b> ${item.likes}
        </p>
        <p class="info-item">
        <b>Views:</b> ${item.views}
        </p>
        <p class="info-item">
        <b>Comments:</b> ${item.comments}
        </p>
        <p class="info-item">
        <b>Downloads:</b> ${item.downloads}
        </p>
    </div>
    </div>`;
}

function productListTemplate() {
    return imageArray.map(productTemplate).join('');
}

function render(addMore = false) {
    const markup = productListTemplate();
    if (addMore) {
    gallery.insertAdjacentHTML('beforeend', markup);
    } else  {
    gallery.innerHTML = markup;
}
}
function controlEndsOfImage() {
    if (imageArray.length === totalHits) {
    loadMoreButton.classList.add('isHidden');
    iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
    });
    }
}

function openLightbox() {
    let options = {
        captionsData: 'alt',
        captionDelay: 250,
        captions: true,
        };
    galleryDll = new SimpleLightbox('.gallery a', options);
    galleryDll.on('show.simplelightbox', function () {});
    galleryDll.refresh();
}
