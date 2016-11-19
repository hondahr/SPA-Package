<?php

    $topNav = topNav();
    $leftNav = leftNav();
    
    if(array_key_exists(2,$uri)){
      $meta = loadPagePHP($uri[1].'/'.$uri[2]);
    } else {
      $meta = loadPagePHP($uri[1]);
    }

    if(is_array($meta)){
      $title = $meta['title'];
      $desc = $meta['description'];
      if(array_key_exists('heading',$meta)){
        $body = $meta['body'];
        $heading = '<h1>'.$meta['heading'].'</h1>';
      } else {
        $body = '';
        $heading = '';
      }
    }
    
    if(strstr($_SERVER['REQUEST_URI'],'/ajax/')){
      include_once('../ajax/ajax.php');
    }
    
    if($uri[1] === 'ajax'){
      include_once '../ajax/'.md5($uri[2]).'.html';            
      exit;
    }
    
    if($uri[1] !== 'pop'){
      $results = '';
      if(array_key_exists(3,$uri)){
        if($uri[1] === 'password-reset-form'){
          $heading = '<h1>Password Reset Form</h1>';
          $body = '<p>New password: &nbsp; &nbsp; &nbsp;<input id="reset-password" type="password" /></p><br /><p>Repeat Password: <input id="repeat-password" type="password" /></p><br /><p><button id="password-reset-button">Reset Password</button></p>';
        }
      }
      include_once '../includes/index.html';
    }
    
