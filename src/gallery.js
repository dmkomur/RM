'use strict';
import Swiper, {
  Navigation,
  Pagination,
  Scrollbar,
  Autoplay,
  FreeMode,
} from 'swiper';
import 'swiper/swiper.min.css';

var swiper = new Swiper('.mySwiper', {
  //   speed: 4000,
  modules: [Navigation, Pagination, Autoplay, FreeMode],
  autoplay: {
    delay: 2500,
  },
  freeMode: true,

  breakpoints: {
    0: {
      slidesPerView: 1.4,
      spaceBetween: 16,
    },
    375: {
      slidesPerView: 1.8,
      spaceBetween: 16,
    },
    768: {
      slidesPerView: 2.4,
      spaceBetween: 0,
    },
    1200: {
      slidesPerView: 4,
      spaceBetween: 0,
    },
  },
});
