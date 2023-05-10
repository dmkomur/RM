import { QueryRick } from "./fetcher";
import { debounce } from "lodash";
import { marckupChar, markupCharacters } from "./marckup";




const query = new QueryRick();
const formCharRef = document.querySelector('.characters-filter-form');
const charactersList = document.querySelector('.characters-gallery');
const charactersErrorRef = document.querySelector('.characters-filter-error')
const loadBtnCharRef = document.querySelector('.load-more-btn')
const modalBackdropCharRef = document.querySelector('.backdrop')



formCharRef.addEventListener('input', debounce(onFormCharSubbit, 350));
charactersList.addEventListener('click', onCharCardClick);

charactersErrorRef.classList.add('hidden');
offLoadBtn();


async function onFormCharSubbit(event) { 
    query[event.target.name] = event.target.value;
    const response = await query.getCharacters();
    if (!response) {
        charactersList.innerHTML = '';
        charactersErrorRef.classList.remove('hidden')
        return
    }
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



    
async function onCharCardClick(event) {
    if (event.target.closest('.character-card')) { console.log('object');}
    console.log(event.target.closest('.character-card'));
    const currentId = event.target.closest('.character-card').dataset.id;
    const response = await query.getChar(currentId);
    const markupToPaste = await marckupChar(response);
    modalBackdropCharRef.classList.remove('is-hidden')
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