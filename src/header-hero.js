
const goToButton = document.querySelector('.up-down-btn');

const bottomCoordinates = document.documentElement.scrollHeight;

let destination = "bot";

window.addEventListener('scroll', () => {
  if (window.scrollY > bottomCoordinates / 10) {
    goToButton.style.transform = "rotate(180deg)";
    destination = "top"
    
    
  } else {
    goToButton.style.transform = "rotate(0deg)";
    destination = "bot"

  }
})

goToButton.addEventListener('click', () => {
  if (destination === "bot") {
    window.scrollByPages(0.1);
    

  } else if (destination === "top") {
    window.scrollTo(0 , 0);

  }
  
});


