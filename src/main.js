import { QueryRick } from "./fetcher";


const query = new QueryRick();
const formCharRef = document.querySelector('.characters-filter-form');
formCharRef.addEventListener('input', onFormCharSubbit);

function onFormCharSubbit(event) { 
    console.dir(event.target.neme);
}