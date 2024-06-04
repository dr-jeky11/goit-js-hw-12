import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import { fetchImages, currentQuery } from "./pixabay-api.js";

const itemsPerPage = 15;

let lightbox;
const gallery = document.querySelector(".gallery");
const loadMore = document.querySelector(".js-load-more");
const loader = document.querySelector(".loader");

let page = 1;

export function renderGallery(images) {
    gallery.innerHTML = images.map(image => createImageCard(image)).join("");
    if (lightbox) {
        lightbox.destroy();
    }
    lightbox = new SimpleLightbox(".gallery a", { captionDelay: 250, captionsData: "alt" });

    if (images.length < itemsPerPage) {
        loadMore.style.display = "none";
        hideLoader();
    } else {
        loadMore.style.display = "block";
    }
}

export function updateGallery(images) {
    gallery.insertAdjacentHTML("beforeend", images.map(image => createImageCard(image)).join(""));
    lightbox.refresh();
}

loadMore.addEventListener("click", onLoadMore);

export async function onLoadMore() {
    if (!currentQuery) {
        return;
    }

    page += 1;
    showLoader();

    try {
        const images = await fetchImages(currentQuery, page);

        if (images.length > 0) {
            updateGallery(images);
            window.scrollBy({
                left: 0,
                top: document.body.scrollHeight,
                behavior: "smooth"
            })
        if (lightbox) {
        lightbox.destroy();
        }
        lightbox = new SimpleLightbox(".gallery a", { captionDelay: 250, captionsData: "alt" });
    }

        if (images.length < itemsPerPage) {
            iziToast.error({
                icon: "",
                backgroundColor: "blue",
                position: "topRight",
                message: "We're sorry, but you've reached the end of search results.",
                messageColor: "white",
            });
            loadMore.style.display = "none";
        }

    } catch (error) {
        console.error(error.message);
    } finally {
        hideLoader();
    }
}

function createImageCard(image) {
    return `
    <div class="photo-card">
      <a class="link" href="${image.largeImageURL}">
        <img class="gallery-image" src="${image.webformatURL}" alt="${image.tags}">
        <div class="info">
        <li><h3 class="info-title">Likes</h3><p class="info-text">${image.likes}</p></li>
        <li><h3 class="info-title">Views</h3><p class="info-text">${image.views}</p></li>
        <li><h3 class="info-title">Comments</h3><p class="info-text">${image.comments}</p></li>
        <li><h3 class="info-title">Downloads</h3><p class="info-text">${image.downloads}</p></li>
      </div>
      </a>
    </div>
  `;
}

export function showLoader() {
    loader.style.display = "block";
}

export function hideLoader() {
    loader.style.display = "none";
}

export function clearGallery() {
    page = 1;
    gallery.innerHTML = "";
}