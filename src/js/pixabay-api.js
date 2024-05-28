export function fetchImages(query) {
    const BASE_URL = "https://pixabay.com/api/";

    const params = new URLSearchParams({
        key: "44041025-2e091a4b621ea033778029d2c",
        q: query,
        image_type: "photo",
        orientation: "horizontal",
        safesearch: "true",
    })

    const url = `${BASE_URL}?${params}`;
    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status);
            }
            return response.json();
        })
        .then(data => data.hits);
}
