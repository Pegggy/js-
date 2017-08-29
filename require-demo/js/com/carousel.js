define(function(require,exports){
  var $ = require('jquery');
  
  var Carousel = (function(){
    function _Carousel($ct){
      this.$ct = $ct;
      this.init();
      this.bind();
      this.clock();
    }
    
    _Carousel.prototype.init = function(){
      var $imgList = this.$imgList = this.$ct.find('.carousel-list');
      var $imgs = this.$imgs = this.$ct.find('.carousel-list>li');
    
      this.$prevBth = this.$ct.find('.prev');
      this.$nextBth = this.$ct.find('.next');
      this.$buttons = this.$ct.find('.buttons>li');
      
      this.imgWidth = $imgs.width();
      this.imgLength = $imgs.length;
      this.imgIndex = 0;
      this.isAnimate = false;
    
      $imgList.append($imgs.first().clone());
      $imgList.prepend($imgs.last().clone());
    
      $imgList.css({
      width:(this.imgLength + 2)*this.imgWidth,
      left: -this.imgWidth});
    }
    
    _Carousel.prototype.bind = function(){
      var _this = this;
      this.$prevBth.on('click',function(){
        if(_this.isAnimate){
          console.log(111);
          return;
        }
        _this.playPrev(1);
      })
    
      this.$nextBth.on('click',function(){
        if(_this.isAnimate){
          return;
        }
        _this.playNext(1);
      })
      this.$buttons.click(function(){
        var len = $(this).index()-_this.imgIndex;
        console.log(len);
        if( len > 0){
          _this.playNext(len);
        }else if(len < 0){
          _this.playPrev(-len);
        }else{
          return;
        }
      })
    
    
    }
    
    _Carousel.prototype.playPrev = function(len){
      var _this = this;
      this.isAnimate = true;
      this.$imgList.animate({left:'+=' + _this.imgWidth * len},function(){
          _this.imgIndex -= len;
          if(_this.imgIndex < 0){
            _this.$imgList.css({left: - _this.imgWidth*_this.imgLength});
            _this.imgIndex = _this.imgLength-1;
          }
          _this.showBtn();
          _this.isAnimate = false;
      });
    }
    _Carousel.prototype.playNext = function(len){
      var _this = this;
      this.isAnimate = true;
      _this.$imgList.animate({left:'-=' + _this.imgWidth * len},function(){
        _this.imgIndex += len;
          if(_this.imgIndex === _this.imgLength){
            _this.$imgList.css({left: -_this.imgWidth});
            _this.imgIndex = 0;
          }
          _this.showBtn();
        _this.isAnimate = false;
      });
    }
    
    _Carousel.prototype.showBtn = function(){
     this.$buttons.removeClass('active').eq(this.imgIndex).addClass('active');
    }
    
    _Carousel.prototype.clock = function(){
      var _this = this;
      var clock = setInterval(function(){
        _this.playNext(1);
      },3000);
    
      this.$ct.on('mouseenter',function(){
        clearInterval(clock);
      })
      this.$ct.on('mouseleave',function(){
        clock = setInterval(function(){
        _this.playNext(1);
      },3000);
      })  
    }
    return {
      init: function($ct){
        $ct.each(function(idx,node){
          new _Carousel($(node));
        })
      }
    }
  })();

  return Carousel;
})
