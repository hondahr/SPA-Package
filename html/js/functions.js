function fub(str){// fub = false,undefined or blank
  /*
   * return anything but true
      if(str !== fub(str)){
        it's true or anything 
        other than the following
      }
  * */
  if(str === undefined){
    return undefined;
  } else if(str === 'undefined'){
    return 'undefined';
  } else if(str === false){
    return false;
  } else if(str === ''){
    return '';
  } else if(str === 'false'){
    return 'false'
  } else if(str === null){
    return null;
  }
}



function authenticate(token){
  //~ alert(token);
  $.ajax({
    url:'/ajax/authenticate',
    type:'post',
    dataType:'json',
    data:{
      auth:token
    }
  }).success(function(response){
    if(response.token !== fub(response.token)){
      localStorage.setItem('admin',response.token);
      $.getScript('/js/admin.js');
      $('#admin-dd').show();
      $('#login-link').hide();
    } else {
      localStorage.setItem('admin',false);
    }
  });
}



//                              _          _
//                             | |        | |
//    _ __    ___   _ __   ___ | |_  __ _ | |_  ___
//   | '_ \  / _ \ | '_ \ / __|| __|/ _` || __|/ _ \
//   | |_) || (_) || |_) |\__ \| |_| (_| || |_|  __/
//   | .__/  \___/ | .__/ |___/ \__|\__,_| \__|\___|
//   | |           | |
//   |_|           |_|
function popstate(){
  $(window).on('popstate', function(event){
    //~ alert('popstate');
    var state = event.state;
    state = event.originalEvent.state;
    var page = document.location.pathname.substring(1,250);
    page = page.replace(/\//g,'_');
    var str = page.split('_');
    
    if(str[2] !== undefined){
      details(page);
    } else {
      //~ alert(str[2]);
      loadPage(page);
      $('#results').show();
    }
  });
}

function disqus(page){
  if(disqusurl !== ''){
    if(localStorage.getItem('admin') === fub(localStorage.getItem('admin'))){
      var disqus_config = function () {
        this.page.url = page;  
        this.page.identifier = page; 
      };
      (function() { // DON'T EDIT BELOW THIS LINE
        var d = document, s = d.createElement('script');
        s.src = '//'+disqusurl+'.disqus.com/embed.js';
        s.setAttribute('data-timestamp', +new Date());
        (d.head || d.body).appendChild(s);
      })();
    }
  }
}

function play(){
    var audioElement = document.createElement('audio');
    audioElement.setAttribute('src', '/audio/click.mp3');
    
    $('#clickmp3').click(function() {
        audioElement.play();
    });
}

function loadPage($data){
  $.ajax({
    url:'/ajax/loadPage',
    type:'post',
    dataType:'json',
    data:{
      page:$data
    }
  }).success(function(response){
    $slashdata = $data.replace(/_/g,'/');
    ga('send', 'pageview','/'+$slashdata);
    
    disqus($slashdata);
    
    //~ alert(response);
    console.log(response);
    if(response === null){//possible details page
      //~ $('head').find('title').html($('.page-header h1').html());
      if(localStorage.getItem('admin') === fub(localStorage.getItem('admin'))){
        heading = '<h1>Page not found</h1>';
        $('#content').html(structure+'<div class="container body">'+heading+'</div>').show(200);
        return;
      }
    } else {
      //~ alert(response.title);
      $('head').find('title').text(response.title);
      heading = '<div class="page-header"><h1>'+response.heading+'</h1><span id="last-edit">Last updated '+response.lastEdit+'</span></div>';
      body = response.body;
    }
    $('#search-results').empty();
    if($data === ''){
      $('head').find('title').text(response.title);
      heading = '<div class="page-header"><h1>'+response.heading+'</h1></div>';

    } else if($data === 'contact'){
      structure = '<script type="application/ld+json">'+
        '{'+
        '"@context": "http://schema.org",'+
        '"@type": "Organization",'+
        '"url": "http://'+host+'",'+
        '"contactPoint": [{'+
          '"@type": "ContactPoint",'+
          '"telephone": "'+telephone+'",'+
          '"contactType": "customer service"'+
        '}]'+
      '}'+
    '</script>';
    }

    var ex = $data.split('_');

    if(ex[0] === 'forgot-password-reset-process'){
      sendResetPasswordLink(ex[1]);
    } else if(ex[0]=== 'password-reset-form'){
      resetPassword(ex);
    }

    $('#content').html(structure+'<div class="container body" id="'+$data+'">'+heading+'<div id="'+$data+'-div">'+response.body+'</div></div>').show(200);
    
    prepareAnchors();
    if($data !== ''){
      // show results related to the page
      //~ results($data);
    } else {
      $('#results').hide();
    }
    $('#'+$data).show(100);
    $('#jumbo').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      arrows:true,
      autoplaySpeed: 5000,
    });
    
    
  });
}


function like(haystack,needle){
  //~ console.log(haystack);
  var str = new String(haystack);
  if(!$.isArray(needle)){
    needle = needle.split(',');
    str = haystack.toLowerCase();
  } 
  
  var n = -1;
  for(var i=0;i<needle.length;i++){
    n = str.search(needle[i]);
    if(n > -1){
      return n;
    }
  }
  return n;
}

function greatest(arr){
  return Math.max.apply( Math, arr );
}



function parseValues(str,delimiter,segment){
  if(str !== undefined){
    if(str.search(delimiter) !== -1){
      var segments = str.split(delimiter);
      return segments[segment];
    }
  }
}

function countValues(arr) {
  var a = [], b = [], prev;
  arr.sort();
  for ( var i = 0; i < arr.length; i++ ) {
    if ( arr[i] !== prev ) {
        a.push(arr[i]);
        b.push(1);
    } else {
        b[b.length-1]++;
    }
    prev = arr[i];
  }
  return [a, b];
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function prepareAnchors(){
//~ alert('prepareAnchors');
  $('body a').each(function(value,href){
    //~ console.log(href);
    h = $(this).attr('href');
    if(h){
      s = h.substring(0,4);
      t = h.substring(0,3);
      if(s !== 'http' && t !== '../' && t !== 'pdf'){
        dhref = h.replace(/\//g,'_');

        dhref = dhref.substring(1,250);
        if(!$(this).hasClass('pop') && !$(this).hasClass('pdf')){
          if(s !== 'mail' && s !== 'tel:'){
            $(this).addClass('menu').attr('data-href',dhref);
          }
        }
      } else {
        $(this).attr('target','_blank');// load other websites in a new tab/window
      }
    }
  });
}                                       

function sendRequest(){
  
  if(isEmail($('#email').val())){
    $.ajax({
      url:'/ajax/sendRequest',
      type:'post',
      //~ dataType:'json',
      data:{
        name:$('#name').val(),
        phone:$('#phone').val(),
        email:$('#email').val(),
        suggestion:$('#suggestion-form').val(),
        inquiry:$('#details').val(),
        newsletter:$('#newsletter').val()
      }
    }).complete(function(response){
      $('#contactInfo').empty().fadeOut();
      success('<h2>Thank you!  Your message has been sent. We will respond shortly.</h2>');
    });
  }
}

function signUp(){
  if(isEmail($('#email').val())){
    $.ajax({
      url:'/ajax/sendRequest/',
      type:'post',
      //~ dataType:'json',
      data:{
        name:$('#name').val(),
        email:$('#email').val(),
        mailinglist:'yes',
        text:$('#email-type-text:checked').val(),
        html:$('#email-type-html:checked').val()
      }
    }).complete(function(response){
      success('<h2>Thank you!  Your email will be added to our next mailing.</h2>');
    });
  }
}

function ss(val){
  if(val !== null){
    val = val.replace(/\\/g,'');
  }
  return val;
}
function hide4Admin(){
  $('#administration').show();
  $('#content').hide();
  $('#results').hide();
  //~ $('.active').hide();
}


$.fn.scrollView = function () {
  return this.each(function () {
    $('html, body').animate({
      scrollTop: $('#top').offset().top
    }, 300);
  });
};


function isEmail(email) {

  re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
  if(re.test(email) === true){
    return true;
  }
  return false;
}

function rand(min, max) {
  //  discuss at: http://locutus.io/php/rand/
  // original by: Leslie Hoare
  // bugfixed by: Onno Marsman (https://twitter.com/onnomarsman)
  //      note 1: See the commented out code below for a version which
  //      note 1: will work with our experimental (though probably unnecessary)
  //      note 1: srand() function)
  //   example 1: rand(1, 1)
  //   returns 1: 1

  var argc = arguments.length
  if (argc === 0) {
    min = 0
    max = 2147483647
  } else if (argc === 1) {
    throw new Error('Warning: rand() expects exactly 2 parameters, 1 given')
  }
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function randomNumber(len){
  var text = "";
  var possible = "123456789";
  for( var i=0; i < len; i++ )
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  return text;
}

function error(msg){
  $('#error').html(msg).fadeIn();
  setTimeout(function(){
    $('#error').empty().fadeOut();
  },5000);
}

function success(msg){
  $('#success').html(msg).fadeIn();
  setTimeout(function(){
    $('#success').empty().fadeOut();
  },5000);
}

function message(msg){
  $('#message').html(msg).fadeIn();
  setTimeout(function(){
    $('#message').empty().fadeOut();
  },5000);
}


function randomString(len){
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for( var i=0; i < len; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}

function odd(i){
  if(i%2 !== 0){
    return true;
  }
}


function trim(str){//remove $ and commas from retail price ($4,800.00 => 4800.00)
  if(str != fub(str)){
    str = str.toString();
    var num = str.replace(/\$/,'');
    num = num.replace(/,/g,'');
    return num;
  }
}

function hilite(){
    var html = $('.product-description').html();
    var text = $('#query').val();
    var regex = new RegExp(text,'gi');
    $html = html.replace(regex,'<span class="hilite">'+text+'</span>');
    $('.product-description').html($html);
}

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function ucfirst (str) {
  //  discuss at: http://locutus.io/php/ucfirst/
  // original by: Kevin van Zonneveld (http://kvz.io)
  // bugfixed by: Onno Marsman (https://twitter.com/onnomarsman)
  // improved by: Brett Zamir (http://brett-zamir.me)
  //   example 1: ucfirst('kevin van zonneveld')
  //   returns 1: 'Kevin van zonneveld'

  str += ''
  var f = str.charAt(0)
    .toUpperCase()
  return f + str.substr(1)
}

function passwordRetrieval(){
  $('#send-email-password-retrieval').on('click',function(){
    $.ajax({
      url:'/ajax/lookupEmail',
      type:'post',
      data:{
        email:$('#email-retrieve-password').val()
      }
    }).success(function(r){
      if(isEmail(r)){
        $('#email-password-retrieval-found').html('Email found.');
        sendVerifyEmail(r);
      }
    });
  });
}

function sendVerifyEmail(r){
  $.ajax({
    url:'/ajax/sendVerifyEmail',
    type:'post',
    //~ dataType:'json',
    data:{
      email:r
    }
  }).complete(function(res){
    console.log(res);
      success('Verification email sent to '+r);
  });
}
function sendResetPasswordLink(z){
  $.ajax({
    url:'/ajax/sendResetPasswordLink',
    type:'post',
    data:{
      z:z
    }
  }).complete(function(r){
    success('A password link has been sent to you.  Please check your inbox.');
  });
}


function resetPassword(ex){
  $(document).on('click','#password-reset-button',function(){
    $.ajax({
      url:'/ajax/resetPassword',
      type:'post',
      data:{
        ex:ex,
        pass1:$('#reset-password').val(),
        pass2:$('#repeat-password').val()
      }
    }).success(function(r){
      if(r == 1){
        success('Your password has been updated. Please Log In.');
      } else {
        error(r);
      }
    });
  });
}

function copyToClipboardMsg(elem, msgElem) {
	  var succeed = copyToClipboard(elem);
    var msg;
    if (!succeed) {
        msg = "Copy not supported or blocked.  Press Ctrl+c to copy."
    } else {
        msg = "Text copied to the clipboard."
    }
    if (typeof msgElem === "string") {
        msgElem = document.getElementById(msgElem);
    }
    msgElem.innerHTML = msg;
    setTimeout(function() {
        msgElem.innerHTML = "";
    }, 2000);
}

function copyToClipboard(elem) {
	  // create hidden text element, if it doesn't already exist
    var targetId = "_hiddenCopyText_";
    var isInput = elem.tagName === "INPUT" || elem.tagName === "TEXTAREA";
    var origSelectionStart, origSelectionEnd;
    if (isInput) {
        // can just use the original source element for the selection and copy
        target = elem;
        origSelectionStart = elem.selectionStart;
        origSelectionEnd = elem.selectionEnd;
    } else {
        // must use a temporary form element for the selection and copy
        target = document.getElementById(targetId);
        if (!target) {
            var target = document.createElement("textarea");
            target.style.position = "absolute";
            target.style.left = "-9999px";
            target.style.top = "0";
            target.id = targetId;
            document.body.appendChild(target);
        }
        target.textContent = elem.textContent;
    }
    // select the content
    var currentFocus = document.activeElement;
    target.focus();
    target.setSelectionRange(0, target.value.length);
    
    // copy the selection
    var succeed;
    try {
    	  succeed = document.execCommand("copy");
    } catch(e) {
        succeed = false;
    }
    // restore original focus
    if (currentFocus && typeof currentFocus.focus === "function") {
        currentFocus.focus();
    }
    
    if (isInput) {
        // restore prior selection
        elem.setSelectionRange(origSelectionStart, origSelectionEnd);
    } else {
        // clear temporary content
        target.textContent = "";
    }
    return succeed;
}
