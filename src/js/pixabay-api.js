import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import axios from "axios";

export function showError() {
    iziToast.error({
        icon: "",
        backgroundColor: "#ef4040",
        position: "topRight",
        message: "You forgot to type something",
        messageColor: "white",
    });
}

export let currentQuery = "";

export async function fetchImages(query, page = 1) {
    currentQuery = query;
    const BASE_URL = "https://pixabay.com/api/";
    const params = new URLSearchParams({
        key: "44031120-3f1a866ec56678536c033b40b",
        q: query,
        image_type: "photo",
        orientation: "horizontal",
        safesearch: true,
        page: page,
        per_page: 15,
    });

    try {
        const { data } = await axios(`${BASE_URL}?${params}`);
        const totalHits = data.totalHits;
        if (totalHits === 0) {
            iziToast.error({
                icon: "",
                backgroundColor: "#ef4040",
                position: "topRight",
                message: "Sorry, there are no images matching your search query. Please, try again!",
                messageColor: "white",
            });

        } else {
            return data.hits;
        }

    } catch (error) {
        console.error(error.message);
    }
}
