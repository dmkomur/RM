
import {RickAndMortyApi} from './episodes-api.js';

const rickAndMortyApi = new RickAndMortyApi();
const galleryList = document.querySelector('.gallery');
const onSearchFormSubmit = async () =>{
rickAndMortyApi.page = 1;

const response = await rickAndMortyApi.fetchEpisodeByQuary();
galleryList.innerHTML = createGalleryMarkup(response.data);
console.log(response);
}
onSearchFormSubmit()

function createGalleryMarkup(data) {
    const markup = data.results
    .map(({url, name, episode, air_date}) => {
        const realEpisode = episode.slice(2,3);
        const realImg = {1:'./img/episodes-filter/season-1.png', 2:'./img/episodes-filter/season-2.png', 3:'./img/episodes-filter/season-3.png', 4:'./img/episodes-filter/season-4.jpg', 5:'./img/episodes-filter/season-5.png', 5:'./img/episodes-filter/season-6.png'};
        const img = realImg[realEpisode];
      return (`
      <div class="episodes-filter-card-list list">
      <img
        class="episodes-filter-photo-card"
        src="${img}" 
        alt="" 
        width="335px"
        height="250px"
      />
    <div class="episodes-filter-info">
      <p class="episodes-filter-info-name">
        <span>${name}</span>
      </p>
      <p class="episodes-filter-info-realepisode">Season
        <span>${realEpisode}</span></p>
      
      <p class="episodes-filter-info-airdate">
        <b>Air date</b>
        <span>${air_date}</span>
      </p>
    </div>
    </div>
      `)
  })
  .join(''); 
  return markup;
}