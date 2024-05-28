import { fetchImages } from "./js/pixabay-api.js";
import { renderGallery, showLoader, hideLoader, showError, clearGallery } from "./js/render-functions.js";

const searchForm = document.querySelector(".form");
const input = document.querySelector(".input");

searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const query = input.value.trim();
    if (!query) {
        showError();
        return;
    }

    showLoader();

    fetchImages(query)
        .then(images => {
            if (input.value === "") {
                clearGallery()
                showError();
            } else {
                renderGallery(images);
            }
        })
        .catch(error => {
            showError(message, error);
        })
        .finally(() => {
            hideLoader();
        });
});