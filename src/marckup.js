export function markupCharacters(data) {
    return data.map(el => `<li class="character-card"><a>
      <div class="character-img-wrap">
        <img src="${el.image}" alt="${el.name}" width="335" />
      </div>
      <p class="character-name">${el.name}</p>
      <p class="character-characteristics"><span>Origin:</span> ${el.location.name}</p>
      <p class="character-characteristics"><span>Location:</span> ${el.location.name}</p></a>
    </li>`).join('')
}