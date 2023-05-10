'use-strict';

import axios from 'axios';

export class RickAndMortyApi {
    #BASE_URL = 'https://rickandmortyapi.com/api/episode';

    constructor() {
        this.page = null;
        this.searchQuaryEl = '';
        this.perPage = 10;
    }
    async fetchEpisodeByQuary() {
        const searchParams = {
            page: this.page,
        };
    const response = await axios.get(`${this.#BASE_URL}`, {params: searchParams});
    return response;
    }
}