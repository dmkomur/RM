
import { QueryRick } from "./fetcher";
import { debounce } from "lodash";
import { marckupChar, marckupEpi, markupCharacters } from "./marckup";
import SimpleBar from "simplebar";
import 'simplebar/dist/simplebar.css';

const indexSearchFormRef = document.querySelector('.search-block-header')
const indexSearchRef = document.querySelector('[data-index-search]')
const query = new QueryRick();


indexSearchFormRef.addEventListener('submit', onIndexSearchSubmit);


async function onIndexSearchSubmit(event) {
    event.preventDefault();
    query.name = event.target[0].value;
    const response = await query.getCharacters();
    if (!response) {
        indexSearchRef.innerHTML = '';
        return
    }
    indexSearchRef.addEventListener('click', onBigCharCardClick);
    query.totalPages = response.info.pages;
    query.nextPage = response.info.next;
    const data = response.results;
    indexSearchRef.innerHTML = markupCharacters(data);
    formCharRef[0].value = query.name;
     }
      
async function onBigCharCardClick(event) {    
    const currentId = event.target.closest('.character-card').dataset.id;  
    await onCharCardClick(currentId);
    modalBackdropCharRef.classList.remove('is-hidden');
    const bre = document.querySelector('.character-episodes-list');
    new SimpleBar(bre);
    const modalBtnCloseRef = document.querySelector('.modal-button')
    const modalCharListRef = document.querySelector('.little-wrap')
    indexSearchRef.removeEventListener('click', onCharCardClick);
    modalBtnCloseRef.addEventListener('click', onModalBtnCloseClick);
    modalCharListRef.addEventListener('click', onSmallEpiCardClick);  
}

async function onSmallEpiCardClick(event) {
 
    const currentId = event.target.closest('.character-episodes-item').dataset.id;  
    await onEpiCardClick(currentId);
    const modalBtnCloseRef = document.querySelector('.episodes-popup-btn-close');
    modalBtnCloseRef.addEventListener('click', onModalBtnCloseClick);
    const modalEpiListRef = document.querySelector('.episodes-popup-charlist');
    modalEpiListRef.addEventListener('click', onSmallCharCardClick);
}  
  
async function onEpiCardClick(currentId) {
    const response = await query.getEpi(currentId);
    const markupToPaste = await marckupEpi(response);
    modalBackdropCharRef.innerHTML = markupToPaste;
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
function onModalBtnCloseClick(event) {
    modalBackdropCharRef.classList.add('is-hidden')
}