
// class QueryRick {
//     #BASE_URL = 'https://rickandmortyapi.com/api';

//     constructor() {
//         this.name = 'rick';
//         this.type = '';
//         this.species = '';
//         this.status = '';
//         this.gender = '';
//         this.page = 1;
//         this.currentPage = '';
//         this.totalPages = '';
//         this.episode = '300';
//         this.episodeName = '';

//         this.searchParamsChar = new URLSearchParams({
//             name: this.name,
//             status: this.status,
//             species: this.species,
//             type: this.type,
//             gender: this.gender,
//             page: this.page,
//             });
//     }


//     getChar(id) {
//         return fetch(`${this.#BASE_URL}/character/${id}`)
//             .then(response => {
//                 if (!response.ok) {throw new Error(response.status)}
//                 return response.json()}).catch(err => console.log(err))
//     }
//     getCharacters() { 
//         return fetch(`${this.#BASE_URL}/character/?${this.searchParamsChar.toString()}`)
//             .then(response => {
//                 if (!response.ok) { throw new Error(response.status) }
//                 return response.json()}).catch(err => console.log(err))
//     }
//     getEpi(id) {
//         return fetch(`${this.#BASE_URL}/episode/${id}`)
//             .then(response => {
//                 if (!response.ok) {throw new Error(response.status)}
//                 return response.json()}).catch(err => console.log(err))
//     }
//     getEpisodes() {
//         return fetch(`${this.#BASE_URL}/episode/?name=${this.episodeName}&episode=${this.episode}`)
//             .then(response => {
//                 if (response.status >= 300) {throw new Error(response.status)}
//                 return response.json()}).catch(err => console.log(err))
//     }
// }

// const queryR = new QueryRick();

// console.log(queryR.getEpisodes(6));
// console.log(queryR.episode);


























import { getCharacter, getCharacters, getEpisode, getEpisodes } from 'rickmortyapi'

class QueryRickAndMorty {
    constructor() { 
        this.characterFilter = {
             name: 'rick',
             type: '',
             species: '',
             status: '',
             gender: 'male',
            page: '',
        }
        this.episodeFilter = {
            name: 'stone',
            episode: '01',
        }
        this.charctersNextUrl = ''
        this.charctersTotalPages = ''

        this.episodesNextURL = ''
        this.episodesTotalPages = ''

    }
   
    getChar(id) { 
        return getCharacter(id).then(response => response.data).catch(err => console.log(err));
    }

    getChars(characterFilter) { 
        return getCharacters(
            characterFilter
        ).then(response => {;
            this.charctersNextUrl = response.data.info.next;
            this.charctersTotalPages = response.data.info.pages;
        return response.data.results}).catch(err => console.log(err))
    }

    getEpi(id) {
        return getEpisode(id).then(response => response.data).catch(err => console.log(err));
    }

    getEpis(episodeFilter) {
        return getEpisodes(episodeFilter).then(response => {
            if (response.status > 299) {throw new Error(response.status)}
            this.episodesNextUrl = response.data.info.next;
            this.episodesTotalPages = response.data.info.pages;
            return response.data.results
        }).catch(err => console.log(err.status))
    }

}

const queryRi = new QueryRickAndMorty;

console.log(queryRi.getChar(5));
