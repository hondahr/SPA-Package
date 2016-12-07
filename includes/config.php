<?php
header("Content-Type: text/html; charset=utf-8");
date_default_timezone_set("America/Phoenix");

/*
 * Functions needed within this config file
 * */

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
  /* Development Database Connection info */
  $host = "192.168.3.1";
  $user = "root";
  $pass = "984uhngb";
  $db   = "spapkg";
} else {// production
  /* Production Database Connection info and Path*/
  /* Define db vars */
  $host = "localhost";
  $user = "your db username";
  $pass = "your db password";
  $db   = "dbname";
  /* end define db vars */
}
$incpath = realpath(dirname(__FILE__));

/* Define these vars */
$title = 'Main title of your website';// gets overwritten by your pages
$sitename = 'Your Site';
$administrator = 'user@example.com';// owners email address
$googleAnalyticsID = 'UA-xxxxxx-1';
/*  end define these vars */


$uri = uri();

require_once 'functions.php';

if($uri[1] === 'sitemap.xml'){
  include_once 'sitemap.php';
  exit;
}

require_once 'router.php';
