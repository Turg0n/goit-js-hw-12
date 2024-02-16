import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const myForm = document.querySelector('form');
const messageLoad = document.getElementById('searchImageText');
const gallery = document.querySelector('.gallery');

let imageArray;

myForm.addEventListener('submit', event => {
    event.preventDefault();

    const searchInput = document.getElementById('searchImage');
    const inputValue = searchInput.value;

    if (inputValue.trim() === '') {
    iziToast.info({
        message: 'Please enter what you want to find!',
        position: 'topRight',
        });
    return;
    } else {
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
            } else {
            showHidemessageLoad();
            render();
            openLightbox();
        }
        })
        .catch(error => {
        console.log(error);
        });
    }
});

function getImage(inputValue) {
    const API_KEY = '42377778-b3c1271d36d2a7f0c3b2221f8';
    const URL =
    'https://pixabay.com/api/?key=' +
    API_KEY +
    '&q=' +
    encodeURIComponent(inputValue) +
    '&image_type=photo&orientation=horizontal&safe_search=true&per_page=9';

    return fetch(URL)
    .then(response => {
        if (!response.ok) {
        throw new Error(response.status);
        }
        return response.json();
        })
    .then(posts => {
        return posts.hits;
    })
    .catch(error => {
        console.log(error);
        throw error;
    });
}
function showHidemessageLoad() {
    messageLoad.classList.toggle('isHidden');
}

function productTemplate(item) {
    return `<li class="gallery-item">
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
    </li>`;
};
function productListTemplate() {
    return imageArray.map(productTemplate).join('');
};
function render() {
    const markup = productListTemplate();
    gallery.innerHTML = markup;
};

function openLightbox() {
    let options = {
    captionsData: 'alt',
    captionDelay: 250,
    captions: true,
    };

    let galleryDll = new SimpleLightbox('.gallery a', options);
    galleryDll.on('show.simplelightbox', function () {});
    galleryDll.refresh();
}
