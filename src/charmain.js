import { QueryRick } from "./fetcher";
import { debounce } from "lodash";
import { marckupChar, marckupEpi, markupCharacters } from "./marckup";
import SimpleBar from "simplebar";
import 'simplebar/dist/simplebar.css';




const query = new QueryRick();
const formCharRef = document.querySelector('.characters-filter-form');
const charactersList = document.querySelector('.characters-gallery');
const charactersErrorRef = document.querySelector('.characters-filter-error')
const loadBtnCharRef = document.querySelector('.load-more-btn')
const modalBackdropCharRef = document.querySelector('.backdrop')
const modalBtnCloseRef = document.querySelector('.modal-button')
const modalCharListRef = document.querySelector('.character-episodes-list')


formCharRef.addEventListener('input', debounce(onFormCharSubbit, 350));


async function onFormCharSubbit(event) { 
    query[event.target.name] = event.target.value;
    const response = await query.getCharacters();
    if (!response) {
        charactersList.innerHTML = '';
        charactersErrorRef.classList.remove('hidden');
        offLoadBtn();
        return
    }
    charactersList.addEventListener('click', onBigCharCardClick);
    charactersErrorRef.classList.add('hidden');
    query.totalPages = response.info.pages;
    query.nextPage = response.info.next;
    const data = response.results;
    charactersList.innerHTML = markupCharacters(data);
    charactersErrorRef.classList.add('hidden');
    if (query.page < query.totalPages) {onLoadBtn()}
}

async function onLoadBtnClick(event) {
    const response = await query.getNextPage(query.nextPage);
    query.nextPage = response.info.next;
    const data = response.results;
    charactersList.insertAdjacentHTML('beforeend', markupCharacters(data))
    query.page++;
    if (query.page === query.totalPages) { offLoadBtn(); return }
}


async function onSmallEpiCardClick(event) {
    // modalCharListRef.removeEventListener('click', onSmallEpicardClick);
console.log('object');
    const currentId = event.target.closest('.character-episodes-item').dataset.id;
    await onEpiCardClick(currentId);
}  
  
async function onEpiCardClick(currentId) {
    const response = await query.getEpi(currentId);
    const markupToPaste = await marckupEpi(response);
    modalBackdropCharRef.innerHTML = markupToPaste;
   }
async function onBigCharCardClick(event) {    
    charactersList.removeEventListener('click', onCharCardClick);
    modalBtnCloseRef.addEventListener('click', onModalBtnCloseClick);
    modalCharListRef.addEventListener('click', onSmallEpiCardClick);  
    const currentId = event.target.closest('.character-card').dataset.id;  
    await onCharCardClick(currentId);
    modalBackdropCharRef.classList.remove('is-hidden');
    const bre = document.querySelector('.character-episodes-list');
    new SimpleBar(bre);
}
 function onSmallCharCardClick(event) {
console.log('object');
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
    modalBackdropCharRef.classList.add('is-hidden')
}