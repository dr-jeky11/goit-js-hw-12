import { pixabayApi } from './js/pixabay-api';
import { imagesRender } from './js/render-functions';
import { imgBoxLight } from './js/render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const btnCheckAdd = document.querySelector('.btn');
const form = document.querySelector('.find-form');
const imagePlace = document.querySelector('.galleriesBox');
const loaderPlace = document.querySelector('#load');

let page = 1;
let findText = '';

form.addEventListener('submit', event => {
  event.preventDefault();
  page = 1;
  imagePlace.innerHTML = '';
  const formData = new FormData(form);
  findText = formData.get('find-text');
  if (findText === '') {
    return;
  }
  imagePlace.innerHTML = `<div class="loader"></div>`;
  pixabayApi(findText, page)
    .then(data => {
      if (data.hits.length === 0) {
        iziToast.error({
          position: 'topRight',
          message:
            'Sorry, there are no images matching your search query. Please try again!',
        });
        imagePlace.innerHTML = '';
        return;
      }
      const markup = imagesRender(data.hits);
      imagePlace.innerHTML = markup;
      if (data.hits.length === 15) {
        btnCheckAdd.classList.remove('hidden');
      }

      imgBoxLight();
    })
    .catch(error =>
      iziToast.error({
        position: 'topRight',
        message: 'Error2',
      })
    )
    .finally(() => {
      event.target.reset();
    });
});
btnCheckAdd.addEventListener('click', async () => {
  try {
    page += 1;
    loaderPlace.innerHTML = `<div class="loader"></div>`;
    const posts = await pixabayApi(findText, page);
    if (posts.hits.length === 0) {
      btnCheckAdd.classList.add('hidden');
      iziToast.info({
        position: 'topRight',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
    }
    loaderPlace.innerHTML = '';
    const markup = imagesRender(posts.hits);
    imagePlace.insertAdjacentHTML('beforeend', markup);

    imgBoxLight();

    window.scrollBy({
      top: 720,

      behavior: 'smooth',
    });
  } catch (error) {
    console.log(error);
    iziToast.error({
      position: 'topRight',
      message: 'Error1',
    });
  }
});