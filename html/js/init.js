(function(){
  var loc = location.pathname;
  var uri = loc.split('/');
  var href = uri[1];
  var comments = false;
  var billing = '';

  $(function() {
    if(loc){
      dhref = loc.replace(/\//g,'_');
      dhref = dhref.substring(1,250);
    }
    loadPage(dhref);//for page reload or first visit today
    passwordRetrieval();
    
    
    //~ 
    $(document).on('click','#login-link',function(){
      $('#results').hide();
    });
    
    $(document).on('click','.logout',function(){
      
      localStorage.setItem('admin','false');
      localStorage.setItem('member','false');
      $('#admin-dd').hide();
      $('#member-dd').hide();
      $('.admin').hide();
      $('.customer').hide();
      $('#login-link').show();
    });
    

    if(localStorage.getItem('admin') !== fub(localStorage.getItem('admin'))){
        authenticate(localStorage.getItem('admin'));
    }

    popstate();
    
    
    $('.nav-item').on('click',function() {      
      $(this).addClass('open').parent().find(".submenu").toggle(300);
    });
    
    
  });
  

  
  $('body').on('click','.other,.first',function(){
    $('#content').scrollView('#content');
  });
  
  $('body').on('click','#send-request',function(){
    sendRequest();
  });

  

  $('body').on('click','.pop',function(){
    $(".pop").colorbox({rel:'pop'});
  });
  
})();
