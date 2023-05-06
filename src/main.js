import { getCharacter, getCharacters, getEpisode, getEpisodes } from 'rickmortyapi'

class QueryRickAndMorty {
    constructor() { 
        this.characterFilter = {
             name: 'ricksdfsfsdf',
             type: '',
             species: '',
             status: '',
             gender: 'male',
            page: '',
        }
        this.episodeFilter = {
            name: 'ri',
            episode: '',
        }
        this.charctersNextUrl = ''
        this.charctersTotalPages = ''

        this.episodesNextURL = ''
        this.episodesTotalPages = ''

    }

    getChar(id) { 
        return getCharacter(id).then(response => response.data);
    }

    getChars(characterFilter) { 
        return getCharacters(
            characterFilter
        ).then(response => {;
            this.charctersNextUrl = response.data.info.next;
            this.charctersTotalPages = response.data.info.pages;
        return response.data.results})
    }

    getEpi(id) {
        return getEpisode(id).then(response => response.data);
    }

    getEpis(episodeFilter) {
        return getEpisodes(episodeFilter).then(response => {
            this.episodesNextUrl = response.data.info.next;
            this.episodesTotalPages = response.data.info.pages;
            return response.data.results
        })
    }

}

const queryRi = new QueryRickAndMorty;

console.log(queryRi.getEpis(queryRi.episodeFilter));