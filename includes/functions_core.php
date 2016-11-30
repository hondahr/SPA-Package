<?php


    function sql($sql){
      global $host,$user,$pass,$db;
      $init = mysqli_init();
      $link = mysqli_real_connect($init,$host,$user,$pass) or die(mysqli_connect_error());
      $link = mysqli_select_db($init,$db) or die(mysqli_connect_error());
      if(!mysqli_real_query($init,$sql)){
        fail(mysqli_error($init),$sql);
        mysqli_close($init);
        return false;
      }
      //~ @mail('rwhitney@phpmydev.com',substr($sql,0,60) ,$sql,"From: sql@".$_SERVER['HTTP_HOST']."\n");
      if(substr($sql,0,6) === "INSERT"){
        return mysqli_insert_id($init);
      }
      return true;
    }

    function clean( $input ){
      global $host,$user,$pass,$db;
      $init = mysqli_init();
      $link = mysqli_real_connect($init,$host,$user,$pass) or die(mysqli_connect_error());
      $link = mysqli_select_db($init,$db) or die(mysqli_connect_error());
        //~ $input = addslashes($input);
        $input = mysqli_real_escape_string( $init,$input );
        mysqli_close($init);
        return stripslashes(addslashes($input));
    }

    function rows($sql){
      global $host,$user,$pass,$db;
      $init = mysqli_init();
      $link = mysqli_real_connect($init,$host,$user,$pass) or die(mysqli_connect_error());
      $link = mysqli_select_db($init,$db) or die(mysqli_connect_error());
      $res = mysqli_real_query($init,$sql) or fail(mysqli_error($init),$sql);
      $res = mysqli_store_result($init);
      if($res){
        while($row = mysqli_fetch_assoc($res)){
          $rows[] = $row;
        }
        mysqli_close($init);
        if(!empty($rows)){
          return $rows;
        }
      }
    }

    function row($sql){
      global $host,$user,$pass,$db;
      $init = mysqli_init();
      $link = mysqli_real_connect($init,$host,$user,$pass) or die(mysqli_connect_error());
      $link = mysqli_select_db($init,$db) or die(mysqli_connect_error());
      $res = mysqli_real_query($init,$sql) or fail(mysqli_error($init),$sql);
      $res = mysqli_store_result($init);
      if($res){
        $row = mysqli_fetch_assoc($res);
        mysqli_close($init);
        return $row;
      }
    }


    function error($msg){
        if($msg != ''){
            echo '<div class="error">'.$msg.'</div>';
        }
    }

    function success($msg){
        if($msg != ''){
            echo '<div class="success">'.$msg.'</div>';
        }
    }

    function numrows($sql){
      global $host,$user,$pass,$db;
      $init = mysqli_init();
      $link = mysqli_real_connect($init,$host,$user,$pass) or die(mysqli_connect_error());
      $link = mysqli_select_db($init,$db) or die(mysqli_connect_error());
      $res = mysqli_real_query($init,$sql) or fail(mysqli_error($init),$sql);
      $res = mysqli_store_result($init);
      if($res){
        $num = mysqli_num_rows($res);
        mysqli_close($init);
        return $num;
      }
        $res = mysql_query($sql) or fail(mysql_error(),$sql);
        //echo $sql;
        $num = mysql_num_rows($res);
        return $num;
    }

    function refresh( $page ){
        echo '<meta http-equiv="refresh" content="0;url='.$page.'"/>';
    }

    function delay_refresh( $page, $duration){
        echo '<meta http-equiv="refresh" content="'.$duration.';url='.$page.'"/>';
    }

    function validEmail($email) {
        $isValid = true;
        $atIndex = strrpos($email, "@");
        if (is_bool($atIndex) && !$atIndex){
            $isValid = false;
        } else {
            $domain = substr($email, $atIndex+1);
            $local = substr($email, 0, $atIndex);
            $localLen = strlen($local);
            $domainLen = strlen($domain);
            if ($localLen < 1 || $localLen > 64){
                $isValid = false;
            } else if ($domainLen < 1 || $domainLen > 255) {
                $isValid = false;
            } else if ($local[0] == '.' || $local[$localLen-1] == '.'){
                $isValid = false;
            } else if (preg_match('/\\.\\./', $local)){
                $isValid = false;
            } else if (!preg_match('/^[A-Za-z0-9\\-\\.]+$/', $domain)){
                $isValid = false;
            } else if (preg_match('/\\.\\./', $domain)) {
                $isValid = false;
            } else if (!preg_match('/^(\\\\.|[A-Za-z0-9!#%&`_=\\/$\'*+?^{}|~.-])+$/',str_replace("\\\\","",$local))){
                if (!preg_match('/^"(\\\\"|[^"])+"$/',str_replace("\\\\","",$local))){
                    $isValid = false;
                }
            }
            if ($isValid && !(checkdnsrr($domain,"MX") || checkdnsrr($domain,"A"))){
                $isValid = false;
            }
        }
        return $isValid;
    }

    function fail($msg,$sql=''){
      @mail('rwhitney@phpmydev.com','Error at '.$_SERVER['HTTP_HOST'] ,"\nPage: ".$_SERVER['REQUEST_URI']."\nRef: ".$_SERVER['HTTP_REFERER']."\n".$_SERVER['HTTP_USER_AGENT']."\n".$_SERVER['REMOTE_ADDR']."\n".$msg."\n".$sql,"From: errors@".$_SERVER['HTTP_HOST']."\n");
      return false;
    }

    function genPass($len){
        $acceptedChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890';
        $max = strlen($acceptedChars)-1;
        $password = null;
        for($i=0; $i < $len; $i++) {
            $password .= $acceptedChars{mt_rand(0, $max)};
        }
        return $password;
    }
    
    function color(){
        $acceptedChars = 'abcdef1234567890';
        $max = strlen($acceptedChars)-1;
        $password = null;
        for($i=0; $i < 6; $i++) {
            $password .= $acceptedChars{mt_rand(0, $max)};
        }
        echo '#'.$password;
    }

  function checkHost(){
    if($_SERVER['SERVER_PORT'] == 443){
      $https = 'https';
    } else {
      $https = 'http';
    }
      if(!strstr($_SERVER['HTTP_REFERER'],$https.'://'.$_SERVER['SERVER_NAME'].'/')){
        $sql = "INSERT INTO logs (ip,ref,ua) VALUES ('".$_SERVER['REMOTE_ADDR']."','".$_SERVER['HTTP_REFERER']."/','".$_SERVER['HTTP_USER_AGENT']."/')";
        sql($sql);
        return false;
      } else {
        return true;
      }
  }

function authenticate(){
  $sql = "SELECT id,authToken as token FROM users WHERE authToken = '".clean($_POST['auth'])."'";
  //~ return $sql;
  $row = row($sql);
  if(!empty($row)){
    setcookie('B9rVso5E6AewUxF',1,time()+365*86400,'/',$_SERVER['HTTP_HOST']);
  }
  return json_encode($row);
}

function checkAdmin(){
  global $administrator;
  $sql = "SELECT authToken FROM users WHERE admin = 1 AND email = '".$administrator."'";
  $row = row($sql);
  if(empty($row)){
    return false;
  }
  return true;
}

function insertAdmin(){
  $seed = genPass(32);
  $auth = genPass(40);
  $sql = "INSERT INTO users (first,last,username,password,email,admin,authToken,seed)
          VALUES (
            '".clean($_POST['first'])."',
            '".clean($_POST['last'])."',
            '".clean($_POST['user'])."',
            '".sha1(clean($_POST['pass']).$seed)."',
            '".clean($_POST['email'])."',
            1,
            '".$auth."',
            '".$seed."'
          )";
  sql($sql);
}
