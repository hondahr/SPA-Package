localStorage.setItem('checkLS','true');
if(localStorage.getItem('checkLS') !== 'true'){
  alert('Please enable Local Storage');
}
var host = location.hostname;
var loc = location.pathname;
var uri = loc.split('/');
var href = uri[1];
var h,s,dhref;
var heading = '';
var structure = '';
var w = $(window).width();

var telephone = '+1-844-831-3481';//main contact phone

var logo768 = '/images/logo.png';//for tablet (portrait) and smaller devices

var date = new Date();
var options = {
    weekday: "long", year: "numeric", month: "short",
    day: "numeric", hour: "2-digit", minute: "2-digit"
};
date = date.toLocaleTimeString("en-us", options);

var enableDate = true;//change to anything besides true to disable;

var salt = '';

var bg = [];
bg.push('Christmas.png');
bg.push('Christmas-2.png');
bg.push('Christmas-3.png');
bg.push('Christmas-4.png');
bg.push('Christmas-5.png');
bg.push('Christmas-6.png');
bg.push('Christmas-7.png');
bg.push('Christmas-8.png');
bg.push('Christmas-9.png');
bg.push('Christmas-10.png');
