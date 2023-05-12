import { QueryRick } from "./fetcher";
import { debounce } from "lodash";
import { marckupChar, marckupEpi, markupCharacters, marckupEpisodes } from "./marckup";
import SimpleBar from "simplebar";
import 'simplebar/dist/simplebar.css';
import {RickAndMortyApi} from './episodes-api.js';

// const rickAndMortyApi = new RickAndMortyApi();
const galleryList = document.querySelector('.gallery');
// const loadMoreBtn = document.querySelector('.episodes-filter-btn');
// const selectList = document.querySelector('#episode');

// const onSearchFormSubmit = async () =>{
// rickAndMortyApi.page = 1;
// const responsePage1 = await rickAndMortyApi.fetchEpisodeByQuary();
// galleryList.innerHTML = createGalleryMarkup(responsePage1.data);
// rickAndMortyApi.page = 2;
// const responsePage2 = await rickAndMortyApi.fetchEpisodeByQuary();
// rickAndMortyApi.page = 3;
// const responsePage3 = await rickAndMortyApi.fetchEpisodeByQuary();
// rickAndMortyApi.page =1;
// const allEpisodes = [...responsePage1.data.results, ...responsePage2.data.results, ...responsePage3.data.results]
// // console.log(allEpisodes);
// }

// onSearchFormSubmit()

// const onMoreBtnClick = async () => {
//     rickAndMortyApi.page += 1; 
//     try {
//         const response = await rickAndMortyApi.fetchEpisodeByQuary();
//         galleryList.insertAdjacentHTML('beforeend', createGalleryMarkup(response.data));
//     } catch (error) {
//         console.log(error.message);
//       }
// }
// loadMoreBtn.addEventListener('click', onMoreBtnClick);

// function createGalleryMarkup(data) {
//     const markup = data.results
//     .map(({url, name, episode, air_date}) => {
//         const realEpisode = episode.slice(2,3);
//         const realImg = {1:'./img/episodes-filter/season-1.png', 2:'./img/episodes-filter/season-2.png', 3:'./img/episodes-filter/season-3.png', 4:'./img/episodes-filter/season-4.png', 5:'./img/episodes-filter/season-5.png', 6:'./img/episodes-filter/season-6.png'};
//         const img = realImg[realEpisode];
//       return (`
//       <div class="episodes-filter-card-list list">
//       <img
//         class="episodes-filter-photo-card"
//         src="${img}" 
//         alt="" 
//         width="335px"
//         height="250px"
//       />
//     <div class="episodes-filter-info">
//       <p class="episodes-filter-info-name">
//         <span>${name}</span>
//       </p>
//       <p class="episodes-filter-info-realepisode">Season
//         <span>${realEpisode}</span></p>
      
//       <p class="episodes-filter-info-airdate">
//         <b>Air date</b>
//         <span>${air_date}</span>
//       </p>
//     </div>
//     </div>
//       `)
//   })
//   .join(''); 
//   return markup;
// }
// const onSelectClick = async () => {
    
// }
// selectList.addEventListener('click', createDropdownEl);
 
const episodeFormRef = document.querySelector('.form-filter');
const modalBackdropCharRef = document.querySelector('.backdrop');
const charactersErrorRef = document.querySelector('.characters-filter-error');
const loadBtnCharRef = document.querySelector('.load-more-btn');


const query = new QueryRick();

episodeFormRef.addEventListener('input', debounce(onFormInput, 350))
onload();
async function onload() {
    const response = await query.getEpisodes();
    galleryList.addEventListener('click', onBigEpiCardClick);
    const data = response.results;
    galleryList.innerHTML = marckupEpisodes(data);
}
async function onFormInput(e) {
    offLoadBtn();
    query[e.target.name] = e.target.value;
    const response = await query.getEpisodes();
    if (!response) {
        galleryList.innerHTML = '';
        charactersErrorRef.classList.remove('hidden');
        offLoadBtn();
        return
    }
    
    galleryList.addEventListener('click', onBigEpiCardClick);
    charactersErrorRef.classList.add('hidden');
    query.totalPages = response.info.pages;
    query.nextPage = response.info.next;
    const data = response.results;
    galleryList.innerHTML = marckupEpisodes(data);
    if (query.page < query.totalPages) {onLoadBtn()}
}
async function onBigEpiCardClick(e) {
        if (e.currentTarget === e.target) return

    const currentId = e.target.closest('.episodes-filter-card-list').dataset.id;  
    await onEpiCardClick(currentId);
    modalBackdropCharRef.classList.remove('is-hidden');
     const modalBtnCloseRef = document.querySelector('.episodes-popup-btn-close')
    const modalCharListRef = document.querySelector('.episodes-popup-charlist')
    modalBtnCloseRef.addEventListener('click', onModalBtnCloseClick);
    modalCharListRef.addEventListener('click', onSmallCharCardClick);  
        document.body.style.overflow = 'hidden';

}

async function onEpiCardClick(currentId) {
    const response = await query.getEpi(currentId);
    const markupToPaste = await marckupEpi (response);
     modalBackdropCharRef.innerHTML = markupToPaste;
}

async function onSmallEpiCardClick(event) {
 
    const currentId = event.target.closest('.character-episodes-item').dataset.id;  
    await onEpiCardClick(currentId);
    const modalBtnCloseRef = document.querySelector('.episodes-popup-btn-close');
    modalBtnCloseRef.addEventListener('click', onModalBtnCloseClick);
    const modalEpiListRef = document.querySelector('.episodes-popup-charlist');
    modalEpiListRef.addEventListener('click', onSmallCharCardClick);
}  

async function onSmallCharCardClick(event) {
 
    const currentId = event.target.closest('.episodes-popup-charlist-item').dataset.id;  
    await onCharCardClick(currentId);
    const modalBtnCloseRef = document.querySelector('.modal-button');
    modalBtnCloseRef.addEventListener('click', onModalBtnCloseClick);
    const modalCharListRef = document.querySelector('.little-wrap')
    modalCharListRef.addEventListener('click', onSmallEpiCardClick);      
}
async function onCharCardClick(currentId) {
    const response = await query.getChar(currentId);
    const markupToPaste = await marckupChar(response);
     modalBackdropCharRef.innerHTML = markupToPaste;
       }

function offLoadBtn () { 
    loadBtnCharRef.classList.add('visually-hidden');
    loadBtnCharRef.removeEventListener('click', onLoadBtnClick)
}
function onLoadBtn () { 
    loadBtnCharRef.classList.remove('visually-hidden');
    loadBtnCharRef.addEventListener('click', onLoadBtnClick)
}

function onModalBtnCloseClick(event) {
    modalBackdropCharRef.classList.add('is-hidden');
        document.body.style.overflow = 'auto';

}

async function onLoadBtnClick(event) {
    const response = await query.getNextPage(query.nextPage);
    query.nextPage = response.info.next;
    const data = response.results;
    galleryList.insertAdjacentHTML('beforeend', marckupEpisodes(data))
    query.page++;
    if (query.page === query.totalPages) { offLoadBtn(); return }
}