define(function(require,exports){
  var $ = require('jquery');

  var LazyImg = (function(){

  function _LazyImg($ct){
    this.$ct = $ct;
    this.init();
    this.bind();
  }
  _LazyImg.prototype.init = function(){
    this.$load = $('.load-more');
    this.curPage = 1;
    this.imgWidth = this.$ct.find('.item').outerWidth(true);
    this.imgLength = parseInt($('.img-wrap').width()/this.imgWidth);
    this.imgArr = [];
    this.clock;
    for(var i = 0; i < this.imgLength; i++){
      this.imgArr.push(0);
    }
  }
  _LazyImg.prototype.bind = function(){
    var _this = this;
    this.getNews();
    this.$load.click(function(){
      if(_this.clock) clearTimeout(_this.clock);
      _this.clock = setTimeout(function(){
          _this.getNews();    
      },100);
  })
  }

  _LazyImg.prototype.getNews = function(){
    var _this = this;
    this.getData(function(imgs){
      $.each(imgs,function(index,value){
        var $node = _this.getNode(value);
        $node.find('img')[0].onload = function(){
          _this.$ct.append($node);
          _this.waterFall($node);
        }
      })
    }) 
  }
  
  _LazyImg.prototype.getData = function(callback){
    var _this = this;
    $.ajax({
      url:'https://pixabay.com/api/',
      data:{
        key: '6183052-38437183cf5a5bab69cd05f08',
        page: _this.curPage,
        q: 'landscape',
        image_type: 'photo',
        category: 'nature'
      }
    }).done(function(ret){
      _this.curPage ++;
      callback(ret.hits);
    }).fail(function(jqXHR){
      console.log(jqXHR.status);
    })
  }

  _LazyImg.prototype.getNode = function(node){
    var html = '';
    html += '<li class="item">'
    html += '<img src="'+ node.webformatURL +'" alt="'+ node.tags +'">';
    html += '</li>';
    return $(html);
  }

  _LazyImg.prototype.waterFall = function($node){
    var minHeight = Math.min.apply(null,this.imgArr);
    var minIndex = this.imgArr.indexOf(minHeight);
    $node.css({
      top: minHeight,
      left: minIndex * this.imgWidth,
      opacity: 1
    });
    this.imgArr[minIndex] += $node.outerHeight(true);
    this.$ct.css({height: this.imgArr[minIndex]});
  }

  // _LazyImg.prototype.isVisable = function($node){
  //   var windowHeight = $(window).height();
  //   var scrollTop = $(window).scrollTop();
  //   var offsetTop = $node.offset().top;
  //   if(offsetTop < windowHeight + scrollTop + 100 && offsetTop > scrollTop){
  //     return true;
  //   }
  //   return false;
  // }

  return{
    init: function($ct){
      new _LazyImg($ct);
    }
  }
})();
// LazyImg.init($('.img-ct'));
return LazyImg;
})

