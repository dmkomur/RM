import Swiper, { EffectFade, Autoplay } from 'swiper';
  // import Swiper styles
import 'swiper/css'
import 'swiper/css/effect-fade';
  

const swiper = new Swiper('.main-char__section__char--images-and-info', {
  effect: 'fade',
  allowTouchMove: false,
  fadeEffect: {
    crossFade: true
  },
  // cssMode: true,
  modules: [EffectFade, Autoplay],
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev'
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true
  },
  //   autoplay: {
  //    delay: 2500,
  //   // disableOnInteraction: false
  //  },
  breakpoints: {
    // when window width is >= 320px
    375: {
      slidesPerView: 1,
    },
    // when window width is >= 480px
    768: {
      slidesPerView: 1,
    },
    // when window width is >= 640px
    1200: {
      setWrapperSize: true,
      // width: 504,
      // height: 544
    }
  }
})

const titles = document.querySelectorAll('.main-char__section__item--title');


titles.forEach(function(title, index) {
  title.addEventListener('click', function() {
    swiper.slideTo(index);
    titles.forEach(function(title) {
      title.classList.remove('is-active-pagination-btn');
    });
    this.classList.add('is-active-pagination-btn');
  });
});