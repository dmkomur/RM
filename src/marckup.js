import { QueryRick } from "./fetcher"
const query = new QueryRick;

export function markupCharacters(data) {
    return data.map(el => `<li class="character-card" data-id="${el.id}"><a>
      <div class="character-img-wrap">
        <img src="${el.image}" alt="${el.name}" width="335""/>
      </div>
      <p class="character-name">${el.name}</p>
      <p class="character-characteristics"><span>Origin:</span> ${el.location.name}</p>
      <p class="character-characteristics"><span>Location:</span> ${el.location.name}</p></a>
    </li>`).join('')
}

export async function marckupChar(data) {
  
    const arr = data.episode.map(el => query.getNextPage(el))
    const episodesArray = await Promise.all(arr);
    const stringOfEpisodes = marckupSmallEpisodes(episodesArray);

    return  `<div class="modal">
    <button type="button" class="modal-button" data-character-modal-close>
      <svg class="modal-soc-icon" width="10px" height="10px">
        <use href=""></use>
      </svg>
    </button>
    <div>
      <img src="${data.image}" alt="${data.name}" class="modal-img" />
      <ul class="character-characteristics-list">
        <li class="character-characteristics-item">
          <p class="title-characteristic">Status</p>
          <p class="text-characteristic">${data.status}</p>
        </li>
        <li class="character-characteristics-item">
          <p class="title-characteristic">Species</p>
          <p class="text-characteristic">${data.species}</p>
        </li>
        <li class="character-characteristics-item">
          <p class="title-characteristic">Gender</p>
          <p class="text-characteristic">${data.gender}</p>
        </li>
        <li class="character-characteristics-item">
          <p class="title-characteristic">Origin</p>
          <p class="text-characteristic">${data.origin.name}</p>
        </li>
        <li class="character-characteristics-item">
          <p class="title-characteristic">Location</p>
          <p class="text-characteristic">${data.location.name}</p>
        </li>
        <li class="character-characteristics-item">
          <p class="title-characteristic">Type</p>
          <p class="text-characteristic">${data.type}</p>
        </li>
      </ul>
    </div>
    <div class="character-episodes-contsiner">
      <h2 class="character-episodes-title">Episodes</h2>
      <ul class="character-episodes-list">
        ${stringOfEpisodes}
      </ul>
    </div>
    </div>`
}

function marckupSmallEpisodes(data) {
    return data.map(el =>
        `<li class="character-episodes-item" data-id="${el.id}>
            <div class="character-episodes-item-wrap">
            <h3 class="character-episodes-item-title">${el.name}</h3>
            <ul class="character-episodes-item-characteristic-list">
                <li class="character-episodes-item-characteristic-item">
                    <p class="title-characteristic">Season</p>
                    <p class="text-characteristic">${el.episode}</p></li>
                <li class="character-episodes-item-characteristic-item">
                    <p class="title-characteristic">Air date</p>
                    <p class="text-characteristic-air-date">${el.air_date}</p>
                </li>
            </ul>
            </div>
        </li>
    `).join('')
    
}