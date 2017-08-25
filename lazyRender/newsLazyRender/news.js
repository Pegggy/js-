var News = (function(){
  function LazyNews($ct){
    this.$ct = $ct;
    this.init();
    this.bind();
  }
  LazyNews.prototype.init = function(){
    this.page = 0;
    this.isArrive = true;
    this.isOver = false;
    this.$loadMore = $('.load-more');
    this.clock;
  }
  LazyNews.prototype.bind = function(){
    var _this = this;
    this.renderNews();
    $(window).on('scroll',function(){
      if(_this.clock){
        clearTimeout(_this.clock);
      }
      _this.clock = setTimeout(function(){
        _this.renderNews();
      },300)
    })
  }
  

  LazyNews.prototype.renderNews = function(){
    if(this.checkShow(this.$loadMore) && this.isArrive && !this.isOver){
      this.loadNews();
    }     
  }
  LazyNews.prototype.checkShow = function($loadMore){
    var windowHeight = $(window).height();
    var scrollTop = $(window).scrollTop();
    var offsetTop = this.$loadMore.offset().top;
    if(offsetTop < windowHeight + scrollTop && offsetTop > scrollTop){
      return true;
    }
    return false;
  }
  
  LazyNews.prototype.loadNews = function(){
    var _this = this;
    this.isArrive = false;
    $.get('/getNews',{page: this.page})
    .done(function(result){
      _this.isArrive = true;
      if(result.status === 0 ){
        _this.appendNews(result.data);
        _this.page += 1;
        _this.renderNews();
      }else{
        console.log(result.status);
      }
    }).fail(function(jqXHR, textStatus){
        console.log(textStatus);
    });
  }
  
  LazyNews.prototype.appendNews = function(news){
    if(news.length === 0){
      this.isOver = true;
      this.$ct.after('<p>没有更多新闻了</p>');
      return;
    }
    var html = '';
    $.each(news,function(){
      html += '<li class="news">';
      html += '<a href="' + this.link + '" class="clearfix">';
      html += '<div class="thumb">';
      html += '<img src="'+ this.img +'">';
      html += '</div>';
      html += '<h2>'+ this.title +'</h2>';
      html += '<p>'+ this.brif +'</p>';
      html += '</a></li>';
    })
    this.$ct.append(html);
  }
  return {
    init:function($ct){
      new LazyNews($ct);
    }
  }
})()

News.init($('.wrap'));
