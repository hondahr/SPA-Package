if(enableBackgrounds === true){
  $.ajax({
    url:'/ajax/getBackgrounds',
    type:'post',
    dataType:'json',
    data:{}
  }).success(function(bg){
    $.each(bg,function(o,background){
      $('#backgrounds').append('<img src="/backgrounds/'+background+'">');
    });
    setInterval(function(){
      var len = bg.length;
      var i = rand(0,len-1);
        $('body').css({
          backgroundImage:'url(/backgrounds/'+bg[i]+')',
          transition:'2s',
          '-ms-tramsition':'2s'
        });
    },rand(9000,15000));
  });
}



$('#content').on('mouseenter','.form-wrapper',function(){
  $(this).children('input,label,select,textarea').css({'display':'block'}).focus();
  $(this).children('.label').hide();
}).on('mouseleave','.form-wrapper',function(){;
  $(this).children('label').css({'display':'none'});
  //~ $(this).children('select,input,textarea').blur();
  $(this).children('.label').show();
});

//~ if(localStorage.getItem('admin') !== fub(localStorage.getItem('admin'))){
  //~ $(document).on('mouseover','*',function(){
    //~ $(this).attr('title','TAG: '+$(this).prop('tagName')+' ID: '+$(this).prop('id')+' CLASS: '+$(this).prop('class'));
  //~ });
//~ }

$('#content').on('click','#sign-up',function(){
  signUp();
});

if(enableDate === true){
  $('#date').html('On site since:  '+date);
}

if(w < 769){
  //alert(w);//works
  $('#logo a img').attr('src',logo768);
  $(document).on('click','li.first a,li.other a',function(){
    $('#real-left-nav').hide();
    //~ alert('left-nav');
  });
  $('#logo a').on('click',function(){
    $('#left-nav').show();
    $('#real-left-nav').show();
    $('#results').hide();
    $('.open')
      .removeClass('open')
      .trigger('click');

  });

}
  
  
play();
//     __ _     _ __ ___    ___  _ __   _   _
//    / _` |   | '_ ` _ \  / _ \| '_ \ | | | |
//   | (_| | _ | | | | | ||  __/| | | || |_| |
//    \__,_|(_)|_| |_| |_| \___||_| |_| \__,_|
//
//
$(document).on('click','a.menu',function(evt){
  //~ alert('clicked');//works
  // prepareAnchors working for even dynamic links in SPA pages
  if(enableAudible === true){
    $('#clickmp3').trigger('click');
  }
  $('#admin').hide();
  $('#orders').hide();
  $('#other').hide();
  href = $(this).attr("href");
  //~ href = href.replace(/%2F/g,'/');
  dhref = href.replace(/\//g,'_');
  if(dhref.substring(0,1) === '_'){
    dhref = dhref.substring(1,250);
  }
  history.pushState({page:href}, '', href);
  loadPage(dhref);
});

$('#content').on('click','#submit-request',function(){
  var errors = [];
  if(!isEmail($('#email').val())){
    errors.push('Invalid Email<br />');
  }
  $('.register').each(function(){
    if($(this).hasClass('req')){
      if($(this).val() === ''){
        errors.push($(this).prop('id').toUpperCase()+' cannot be blank <br />');
      }
    }
  });
  if(errors == ''){
    $.ajax({
      url:'/ajax/requestQuote',
      type:'post',
      data:{
        businessname:$('#business').val(),
        firstname:$('#firstname').val(),
        lastname:$('#lastname').val(),
        email:$('#email').val(),
        phone:$('#phone').val(),
        address1:$('#address1').val(),
        address2:$('#address2').val(),
        city:$('#city').val(),
        state:$('#state option:selected').val(),
        postal:$('#postal').val(),
        countrycode:$('#countrycode option:selected').val()
      }
    }).complete(function(){
      success('Thank you for your request.  You should receive a response within 24 hours!');
    });
  } else {
    error(errors);
  }
});

$('#content').on('click','#submit-contact',function(){
  var errors = [];
  if(!isEmail($('#email').val())){
    errors.push('Invalid Email<br />');
  }
  $('.inquire').each(function(){
    if($(this).hasClass('req')){
      if($(this).val() === ''){
        errors.push($(this).prop('id').toUpperCase()+' cannot be blank <br />');
      }
    }
  });
  if(errors == ''){
    $.ajax({
      url:'/ajax/requestQuote',
      type:'post',
      data:{
        businessname:$('#business').val(),
        yourname:$('#yourname').val(),
        email:$('#email').val(),
        phone:$('#phone').val(),
        inquiry:$('#inquiry').val()
      }
    }).complete(function(){
      success('Thank you for your inquiry.  You should receive a response within 24 hours, but probably sooner!');
      $('#contact-us').empty().fadeOut();
    });
  } else {
    error(errors);
  }
});


  $('#query').on('keyup',function(evt){
    if(evt.keyCode === 13){
      $('#query-button').trigger('click');
    }
  });
  $('#query-button').on('click',function(){
    //~ $('.active').fadeOut();
    if($('#query').val().length > 1){
      $.ajax({
        url:'/ajax/search',
        type:'post',
        dataType:'json',
        data:{
          keys:$('#query').val()
        }
      }).success(function(response){
        //~ console.log(response);
        $results = '<div class="page-header"><h1>Results for the query: '+$('#query').val()+'</h1></div>';
        //~ $('#search-results').empty();
        $.each(response,function(i,item){
          $url=item.CategoryURL;
          //~ $href = $url;
          if(item.SubcategoryURL !== ''){
            $url += '_' + item.SubcategoryURL;
            //~ $href += '/' + item.SubcategoryURL;
          }
          $url += '_' + item.URL;
          //~ $href += '/' + item.URL;
          $results +='<div class="search-results-item"><a class="more-details nohref" id="'+$url+'"><b>'+item.Category+': '+item.Subcategory+': '+item.Name+'</a><div class="cat-subprice">Our Price: $' + item.SalePrice+ '</b></div>';
          $results += '<span id="colors_'+item.ID+'"></span></div>';
        });
        if(w < 768){
          $('#left-nav').hide();
        }
        $('.detail-page').hide();
        //~ $('#results').empty();
        $('#content').html('<div id="search-results" class="col-lg-8 col-md-8 col-sm-12 col-xs-12"></div>');
        //~ alert('query');
        $('#search-results').css({'margin-top':'0'}).html($results).fadeIn();
        $('#results').hide();
        $('.more-details').on('click',function(){
          $id = $(this).prop('id');
          details($id);
        });// do not loadFunc() here - it calls this function search();
        //~ loadFunc();
        $.each(response,function(i,item){
          $.ajax({
            url:'/ajax/getColors',
            type:'post',
            dataType:'json',
            data:{
              id:item.ID
            }
          }).success(function(response){
            $colors = '<i>Available in:</i> ';
            $.each(response,function(j,color){
              $colors += color.ColorName+', ';
            });
            $colors = $colors.replace(/(,\s$)/g, "");
            $('#colors_'+item.ID).html($colors);
          });
        });
      });
    }
  });
  
  $(document).on('click','#login-submit',function(){
    if(isEmail($('#login-user').val())){
      //~ alert($('#login-pass').val());
      $.ajax({
        url:'/ajax/login',
        type:'post',
        dataType:'json',
        data:{
          user:$('#login-user').val(),
          pass:$('#login-pass').val()
        }
      }).success(function(response){
        //~ console.log(response);
        //~ alert(response.admin);
        if(response.admin === '1'){
          //~ alert('before auth');
          authenticate(response.token);
          loadPage('');
        }
        success('Login Successful');
      });
    }
  });

if(localStorage.getItem('admin') === fub(localStorage.getItem('admin'))){
  $.getScript("https://static.addtoany.com/menu/page.js");
}


$('.non-product').on('click',function(){
  $('#results').hide();//hide any results when non-product link clicked
});

//~ $('.show-results').on('click',function(){
  //~ $('#content').hide();//hide any results when non-product link clicked
//~ });


$('#content').on('click','#send-inquiry',function(){
  alert('#content');
  sendRequest();
});
  
$(document).on("click",'a.menu', function(evt) {
  evt.preventDefault();
  var el = '';
  el = document.getElementById('content');
  el.scrollIntoView(true);
});


