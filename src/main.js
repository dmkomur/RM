import { QueryRick } from "./fetcher";
import { debounce } from "lodash";
import { markupCharacters } from "./marckup";




const query = new QueryRick();
const formCharRef = document.querySelector('.characters-filter-form');
const charactersList = document.querySelector('.characters-gallery');
const charactersErrorRef = document.querySelector('.characters-filter-error')
const loadBtnCharRef = document.querySelector('.load-more-btn')

formCharRef.addEventListener('input', debounce(onFormCharSubbit, 350));
charactersList.addEventListener('click', onCharCardClick)



charactersErrorRef.classList.add('hidden');


async function onFormCharSubbit(event) { 
    query[event.target.name] = event.target.value;
    const response = await query.getCharacters();
    if (!response) {
        charactersList.innerHTML = '';
        charactersErrorRef.classList.remove('hidden')
    }
    charactersErrorRef.classList.add('hidden');
    query.totalPages = response.info.pages;
    query.nextPage = response.info.next;
    const data = response.results;
    charactersList.innerHTML = markupCharacters(data);
    charactersErrorRef.classList.add('hidden');
    console.log(query.page);
    console.log(query.totalPages);
    if (query.page < query.totalPages) {onLoadBtn()}
}

async function onLoadBtnClick(event) {
    const response = await query.getNextPage(query.nextPage);
    query.nextPage = response.info.next;
    const data = response.results;
    charactersList.insertAdjacentHTML('beforeend', markupCharacters(data))
    query.page++;
    if (query.page === query.totalPages) { offLoadBtn(); return}
    console.log(query.page);
    console.log(query.totalPages);
}



    
function onCharCardClick(event) {
    console.log(event.target)    
}

function offLoadBtn () { 
    loadBtnCharRef.classList.add('hidden');
    loadBtnCharRef.removeEventListener('click', onLoadBtnClick)
}
function onLoadBtn () { 
    loadBtnCharRef.classList.remove('hidden');
    loadBtnCharRef.addEventListener('click', onLoadBtnClick)
}