<?php
header("Content-Type: text/html; charset=utf-8");
date_default_timezone_set("America/Phoenix");

/*
 * Functions needed within this config file
 * */
//~ echo md5('sendRequest');exit;

function dev(){
  if(strstr($_SERVER['HTTP_HOST'],"192.168.6")){
    return true;
  } else {
    return;
  }
}

function uri () {
  $uri = explode('/',$_SERVER['REQUEST_URI']);
  return $uri;
}

/*
 * End Functions needed within this config file
 * */
$upload_path = $_SERVER['DOCUMENT_ROOT']."/images";//no trailing slash


/* ###############################
 * Server specific parameters
 * ###############################*/
if(dev() === true){// development
  $incpath = '/home/htdocs/spapackage/includes';
  /* Development Database Connection info */
  $host = "192.168.3.1";
  $user = "root";
  $pass = "984uhngb";
  $db   = "spapkg";
} else {// production
  /* Production Database Connection info and Path*/
  $incpath = '/path/to/includes';//no trailing slash
  /* Define db vars */
  $host = "localhost";
  $user = "";
  $pass = "";
  $db   = "dbname";
  /* end define db vars */
}

/* Define these vars */
$title = 'Main title of your website';// gets overwritten by your pages
$sitename = 'Your Site';
$administrator = 'user@example.com';// owners email address
$googleAnalyticsID = '';
/*  end define these vars */


$uri = uri();

require_once 'functions.php';

if($uri[1] === 'sitemap.xml'){
  include_once 'sitemap.php';
  exit;
}

require_once 'router.php';
