
import {RickAndMortyApi} from './episodes-api.js';

const rickAndMortyApi = new RickAndMortyApi();
const galleryList = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.episodes-filter-btn');
const selectList = document.querySelector('#episode');



const onSearchFormSubmit = async () =>{
rickAndMortyApi.page = 1;
const responsePage1 = await rickAndMortyApi.fetchEpisodeByQuary();
galleryList.innerHTML = createGalleryMarkup(responsePage1.data);
rickAndMortyApi.page = 2;
const responsePage2 = await rickAndMortyApi.fetchEpisodeByQuary();
rickAndMortyApi.page = 3;
const responsePage3 = await rickAndMortyApi.fetchEpisodeByQuary();
rickAndMortyApi.page =1;
const allEpisodes = [...responsePage1.data.results, ...responsePage2.data.results, ...responsePage3.data.results]
console.log(allEpisodes);
}

onSearchFormSubmit()

const onMoreBtnClick = async () => {
    rickAndMortyApi.page += 1; 
    try {
        const response = await rickAndMortyApi.fetchEpisodeByQuary();
        galleryList.insertAdjacentHTML('beforeend', createGalleryMarkup(response.data));
    } catch (error) {
        console.log(error.message);
      }
}
loadMoreBtn.addEventListener('click', onMoreBtnClick);

function createGalleryMarkup(data) {
    const markup = data.results
    .map(({url, name, episode, air_date}) => {
        const realEpisode = episode.slice(2,3);
        const realImg = {1:'./img/episodes-filter/season-1.png', 2:'./img/episodes-filter/season-2.png', 3:'./img/episodes-filter/season-3.png', 4:'./img/episodes-filter/season-4.png', 5:'./img/episodes-filter/season-5.png', 6:'./img/episodes-filter/season-6.png'};
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
    <div class="episodes-filter-info-serias">
      <div class="episodes-filter-info-realepisode">
    <p class=" episodes-filter-info-title">Season</p>
    <span class=" episodes-filter-info-pretitle">${realEpisode}</span>
  </div>
  <div class="episodes-filter-info-airdate">
    <p class=" episodes-filter-info-title">Air date</p>
    <span class=" episodes-filter-info-pretitle">${air_date}</span>
  </div>
    </div>
  </div>
  </div>
      `)
  })
  .join(''); 
  return markup;
}
// const onSelectClick = async () => {
    
// }
// selectList.addEventListener('click', createDropdownEl);
 
