
var LazyPic = (function(){

  function _LazyPic($ct){
    this.$ct = $ct; 
    this.init();
  }
  _LazyPic.prototype.init = function(){
    this.clock;
    this.$imgs = this.$ct.find('img');
    this.renderImg();
    var _this = this;
    $(window).on('scroll',function(){
      if(_this.clock){
        clearTimeout(_this.clock);
      }
      _this.clock = setTimeout(function(){
        _this.renderImg();
        console.log(111);
      },100);  
    })
  }

  _LazyPic.prototype.renderImg = function(){
    var _this = this;
    this.$imgs.each(function(){
      if(_this.isVisiable($(this)) && !_this.isLoaded($(this))){
        _this.loadImg($(this));
      }
    });
  }
  _LazyPic.prototype.isVisiable = function($node){
    var offsetTop = $node.offset().top;
    var scrollTop = $(window).scrollTop();
    var screenHeight = $(window).height();
    if(offsetTop < scrollTop + screenHeight && offsetTop > scrollTop){
      return true;
    }
    return false;
  }
  _LazyPic.prototype.isLoaded = function($node){
    return $node.attr('src') === $node.attr('data-src');
  }

  _LazyPic.prototype.loadImg = function($node){
    return $node.attr('src',$node.attr('data-src'));
  }

  return {
    init: function($ct){
      new _LazyPic($ct);
    }
  }
})()

LazyPic.init($('.container'));










// renderImg();
// var clock;
// $(window).on('scroll',function(){
//     if(clock){
//       clearTimeout(clock);
//     }
//     clock = setTimeout(function(){
//       renderImg();
//     },300);
// })
// function renderImg(){
//     $('.container img').each(function(){
//         if(checkShow($(this)) && !isLoaded($(this))){
//             loadImg($(this));
//         }
//     });
// }
// function checkShow($img){
//     var scrollTop = $(window).scrollTop();
//     var windowHeight = $(window).height();
//     var offsetTop = $img.offset().top;
//     if( !$img.data('hasLoaded') && scrollTop + windowHeight > offsetTop && offsetTop > screenTop ){
//         $img.data('hasLoaded',true);
//         return true;
//     }
//     return false;
// }
// function isLoaded($img){
//     return $img.attr('src') === $img.attr('data-src');   
// }
// function loadImg($img){
//     $img.attr('src',$img.attr('data-src'));
// }
