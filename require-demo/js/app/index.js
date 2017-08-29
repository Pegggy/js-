define(['jquery','carousel','gotop','lazy'],function($,Carousel,GoTop,LazyImg){

  GoTop.init($('body'));
  Carousel.init($('.carousel-ct'));
  LazyImg.init($('.img-ct'));
})