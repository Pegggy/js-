//方法1
var Fn1 = {
  init: function(){
    console.log(123);
  }
}
//方法2
var Fn1 = (function(){
  var a = 1;
  return {
    init: function(){
      console.log(123);
      console.log(a);
    }
  }
})()
//这两种方法的区别在于，下面的是立即执行匿名函数，Fn1若还需要局部变量，
//在方法1中只能以属性的方式定义，而在方法2中可以在匿名函数中定义，可以在init中使用

//这种封装可以将carousel中所有对象和方法全部隐藏起来，形成真正的封装
var Carousel = (function(){
  function _Carousel($ct){
    this.$ct = $ct;
    this.init();
    this.bind();
    this.clock();
  }
  
  _Carousel.prototype.init = function(){
    var $imgList = this.$imgList = this.$ct.find('.img-list');
    var $imgs = this.$imgs = this.$ct.find('.img-list>li');
  
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
  //这样即使页面上有多个轮播，也可以一次选中，同时生效，但是每个轮播图互不干扰
  return {
    init: function($ct){
      $ct.each(function(idx,node){
        new _Carousel($(node));
      })
    }
  }
})();



Carousel.init($('.img-ct'));

