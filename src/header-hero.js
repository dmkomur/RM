const goToButton = document.querySelector('.up-down-btn');

const bottomCoordinates = document.documentElement.scrollHeight;

let destination = "bot";

window.addEventListener('scroll', () => {
  if (window.scrollY > bottomCoordinates / 2) {
    goToButton.style.transform = "rotate(180deg)";
    destination = "top"
    
    
  } else {
    goToButton.style.transform = "rotate(0deg)";
    destination = "bot"

  }
})

goToButton.addEventListener('click', () => {
  if (destination === "bot") {
    window.scrollTo('div.divider');
    

  } else if (destination === "top") {
    window.scrollTo(0 , 0);

  }
  
});