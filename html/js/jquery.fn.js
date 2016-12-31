(function($){
  $.fn.colorify = function(color){
    this.css('color',color);
    return this;
  }
})(jQuery);

$('a').colorify('#CCC');


(function($){
  $.fn.bodyswag = function(){
    this.css({
      position:'absolute',
      left:'0',
      top:'0'
    }).animate({
      left:'2000px',
      top:'20px'
    }).animate({
      left:'-2000px',
      top:'0'
    }).animate({
      left:'0',
      top:'0'
    });
    return this;
  }
})(jQuery);

$('body').bodyswag();

