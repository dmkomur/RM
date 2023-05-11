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
        <use href="../img/symbol.svg#icon-close"></use>
      </svg>
    </button>
    <div>
      <div class="modal-img-wrap">
        <img src="${data.image}" alt="${data.name}" class="modal-img" />
      </div>
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
      <ul data-simplebar class="character-episodes-list">
      <div class="little-wrap">
             ${stringOfEpisodes}     
        </div>
      </ul>
    </div>
  </div>`
}


function marckupSmallEpisodes(data) {
    return data.map(el =>
        `<li class="character-episodes-item" data-id="${el.id}">
            <div class="character-episodes-item-wrap">
              <h3 class="character-episodes-item-title">${el.name}</h3>
              <ul class="character-episodes-item-characteristic-list">
                <li class="character-episodes-item-characteristic-item">
                  <p class="title-characteristic">Season</p>
                  <p class="text-characteristic">${el.episode}</p>
                </li>
                <li class="character-episodes-item-characteristic-item">
                  <p class="title-characteristic">Air date</p>
                  <p class="text-characteristic-air-date">${el.air_date}</p>
                </li>
              </ul>
            </div>
          </li>
    `).join('')
    
}



function marckupSmallCharacters(data) {
    return data.map(el =>
        `<li class="episodes-popup-charlist-item" data-id="${el.id}">
          <div class="episodes-popup-image-thumb">
            <img src="${el.image}" />
          </div>
          <p class="episodes-popup-charlist-text">${el.name}</p>
        </li>
    `).join('')
    
}

export async function marckupEpi(data) {
    const arr = data.characters.map(el => query.getNextPage(el))
    const episodesArray = await Promise.all(arr);
    const stringOfCharacters = marckupSmallCharacters(episodesArray);
    return  `<div class="episode-popup">
    <button class="episodes-popup-btn-close" type="button">
      <svg class="episodes-popup-btn-close-icon" width="20" height="20">
        <use href="../img/symbol.svg#icon-close"></use>
      </svg>
    </button>
    <div class="episode-popup-card">
      <h3 class="episode-popup-header">${data.name}</h3>
      <div class="episode-popup-info">
        <div>
          <p class="episode-popup-info-header">ID</p>
          <p class="episode-popup-info-text">${data.id}</p>
        </div>
        <div>
          <p class="episode-popup-info-header">Air date</p>
          <p class="episode-popup-info-text">${data.air_date}</p>
        </div>
      </div>
      <h3 class="episode-popup-header">Characters</h3>
      <ul class="episodes-popup-charlist">
       ${stringOfCharacters}
      </ul>
    </div>
  </div>`
}

export function marckupEpisodes (data) {
      const markup = data
      .map(({url, name, episode, air_date, id}) => {
          const realEpisode = episode.slice(2,3);
          const realImg = {1:'./img/episodes-filter/season-1.png', 2:'./img/episodes-filter/season-2.png', 3:'./img/episodes-filter/season-3.png', 4:'./img/episodes-filter/season-4.png', 5:'./img/episodes-filter/season-5.png', 6:'./img/episodes-filter/season-6.png'};
          const img = realImg[realEpisode];
          const episodeId = id;
        return (`
        <div class="episodes-filter-card-list list" data-id="${episodeId}">
        <img
          class="episodes-filter-photo-card"
          src="${img}" 
          alt="" 
          width="335px"
          height="250px"
        />
      <div class="episodes-filter-info">
        <p class="episodes-filter-info-name">
          <span>${name}</span>
        </p>
        <p class="episodes-filter-info-realepisode">Season
          <span>${realEpisode}</span></p>
        
        <p class="episodes-filter-info-airdate">
          <b>Air date</b>
          <span>${air_date}</span>
        </p>
      </div>
      </div>
        `)
    })
    .join(''); 
    return markup;
  }