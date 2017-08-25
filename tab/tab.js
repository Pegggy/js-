


var Tab = (function(){

  function _Tab(ct){
    this.ct = ct;
    this.init();
    this.bind();
  }

  _Tab.prototype.init = function(ct){
    this.header = this.ct.querySelector('.header');
    this.lists = this.ct.querySelectorAll('.header>li');
    this.contents = this.ct.querySelectorAll('.contents>li');
    this.index;
  }

  _Tab.prototype.bind = function(){
    var _this = this;
    this.header.addEventListener('click',function(e){
      _this.index = [].indexOf.call(_this.lists,e.target);
      _this.lists.forEach(function(node){
        node.classList.remove('active');
      })
      e.target.classList.add('active');
      _this.contents.forEach(function(node){
        node.classList.remove('active');
      })
      _this.contents[_this.index].classList.add('active');
    });
  }

  return {
    init: function(ct){
      ct.forEach(function(node){
        new _Tab(node);
      })
    }
  }
})()

Tab.init(document.querySelectorAll('.ct'))