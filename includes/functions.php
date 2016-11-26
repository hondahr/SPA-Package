<?php

require_once 'functions_core.php';

function loadPage(){
  if($_POST['page'] !== ''){
    $page = str_replace('_','/',clean($_POST['page']));
  } else {
    $page = '';
  }
  $sql = "SELECT * FROM pages WHERE link = '".$page."' ORDER BY id DESC LIMIT 1";
  //~ return $sql;
  $row = row($sql);
  return json_encode($row);
}

function loadPagePHP($page){
    $sql = "SELECT title,description,body,heading
          FROM pages WHERE link = '".clean($page)."'
          ORDER BY id DESC LIMIT 1";
    //~ return $sql;
    $row = row($sql);
    if(!empty($row)){
      return $row;
    }
  return false;
}

function results(){}

function topNav(){
  $nav = '';
  $sql = "SELECT * FROM topnav WHERE active = 1 AND parent = 0 ORDER BY displayorder";
  $rows = rows($sql);
  for($i=0;$i<count($rows);$i++){
    $nav .= '<li class="dropdown"><a  class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">'.$rows[$i]['name'].'</a>';
    $sql = "SELECT * FROM topnav WHERE parent = '".$rows[$i]['id']."'";
    $subs = rows($sql);
    $nav .= '<ul class="dropdown-menu">';
    for($o=0;$o<count($subs);$o++){
      $nav .= '<li><a href="/'.$subs[$o]['url'].'">'.$subs[$o]['name'].'</a></li>';
    }
    $nav .= '</ul>';
    $nav .= '</li>';
  }
  
  return $nav;
}

function adminTopNav(){
  $sql = "SELECT *,active as a FROM topnav WHERE displayorder > 0  AND parent = 0 ORDER BY DisplayOrder";
  $rows = rows($sql);
  $menu = '<b>New Parent</b><input id="name-new-parent" placeholder="Name"><input placeholder="URL" id="url-new-parent" value=""><input placeholder="Display Order" id="displayorder-new-parent" value=""> <button id="new-parent" class="btn-tiny">Go</button><br />';
  for($i=0;$i<count($rows);$i++){
    $menu .= '<div class="admin-topnav-parent" title="'.$rows[$i]['name'].'">'.$rows[$i]['name'].'</div>';
    $rows[$i]['a'] == 1?$acchecked = 'checked':$acchecked='';
    $menu .= '<b><span class="admin-parent">'.$rows[$i]['name'].'</b> <input class="admin-parent" id="name_'.$rows[$i]['id'].'" value="'.$rows[$i]['name'].'"><input class="admin-parent" id="url_'.$rows[$i]['id'].'" value="'.$rows[$i]['url'].'" placeholder="URL">';
    $menu .= '<b>Display Order</b><input class="admin-parent" id="displayorder_'.$rows[$i]['id'].'" value="'.$rows[$i]['displayorder'].'" size="4"><input type="checkbox" id="active_'.$rows[$i]['id'].' class="admin-parent" '.$acchecked.'> Active <br />';
    $sql = "SELECT *,active as a FROM topnav WHERE parent = '".$rows[$i]['id']."' ORDER BY displayorder";
    $subs = rows($sql);
    $menu .= '<b>New Submenu</b><input placeholder="Name" id="name-new-child-'.$rows[$i]['id'].'"><input placeholder="URL" id="url-new-child-'.$rows[$i]['id'].'"><input placeholder="Display Order" id="displayorder-new-child-'.$rows[$i]['id'].'"> <button id="" parent-id="'.$rows[$i]['id'].'" class="new-child btn-tiny">Go</button><br />';
    for($j=0;$j<count($subs);$j++){
      $subs[$j]['a'] == 1?$achecked = 'checked':$achecked='';
      $menu .=  '<b><span class="admin-child">Sub Menu Name</span></b> <input class="admin-child" id="name_'.$subs[$j]['id'].'" value="'.$subs[$j]['name'].'">';
      $menu .=  '<b>Submenu URL</b> <input class="admin-child" id="url_'.$subs[$j]['url'].'" value="'.$subs[$j]['url'].'">';
      $menu .=  '<b>Display Order</b><input class="admin-child" id="displayorder_'.$subs[$j]['id'].'" value="'.$subs[$j]['displayorder'].'" size="4"><input type="checkbox" class="admin-child"  id="active_'.$subs[$j]['id'].'" '.$achecked.'> Active <br />';
    }
  }
  return $menu;
}

function newParent(){
  $sql = "SELECT * FROM topnav WHERE id = '".clean($_POST['id'])."'";
  $row = row($sql);
  if(empty($row)){
    $sql = "INSERT INTO topnav (name,url,active,displayorder) VALUES ('".clean($_POST['name'])."','".clean($_POST['url'])."',1,'".clean($_POST['disp'])."')";
    sql($sql);
  }
}

function newChild(){
  $sql = "SELECT * FROM topnav WHERE id = '".clean($_POST['parent'])."'";
  $row = row($sql);
  if(!empty($row)){
    $sql = "INSERT INTO topnav (name,url,parent,active,displayorder) VALUES ('".clean($_POST['name'])."','".clean($_POST['url'])."','".clean($_POST['parent'])."',1,'".clean($_POST['disp'])."')";
    sql($sql);
  }
}

function updateTopNav(){
  $sql = "UPDATE topnav SET `".clean($_POST['field'])."` = '".clean($_POST['value'])."' WHERE ID = '".clean($_POST['id'])."'";
  sql($sql);  
}


function leftNav(){
  $sql = "SELECT * FROM categories WHERE `Show` = 1 AND Active = 1 ORDER BY DisplayOrder";
  $rows = rows($sql);
  $menu = '';
  for($i=0;$i<count($rows);$i++){
    $sql = "SELECT * FROM subcategories WHERE CategoryID = '".$rows[$i]['ID']."' AND  `Show` = 1 AND Active = 1 ORDER BY DisplayOrder";
    $subs = rows($sql);
    $menu .=  '<li><div class="nav-item" title="'.$rows[$i]['Name'].'">'.$rows[$i]['Name'].'</div>
              <div class="submenu">
                <ul>';
    for($j=0;$j<count($subs);$j++){
      if($j == 0){
        $class = 'first';
      } else {
        $class = 'other';
      }
      if(substr($subs[$j]['URL'],0,4) === 'http'){
        $link = $subs[$j]['URL'];
        $class = 'target="_blank"';
      } else {
        $link = '/'.$rows[$i]['URL'].'/'.$subs[$j]['URL'];
        $class = 'class="show-results"';
      }
      $menu .=  '<li '.$class.'><span class="bullet"></span><a '.$class.' href="'.$link.'">'.$subs[$j]['Name'].'</a></li>';
    }
    $menu .= '</ul>
          </div>
        </li>';
  }
  return $menu;
}

function adminLeftNav(){
  $sql = "SELECT *,`Show` as s, Active as a FROM categories WHERE displayorder > 0 ORDER BY DisplayOrder";
  $rows = rows($sql);
  $menu = '<b>New Cat</b><input id="name-new-cat" placeholder="Name"><input placeholder="URL" id="url-new-cat" value=""><input placeholder="Display Order" id="displayorder-new-cat" value=""> <button id="new-cat" class="btn-tiny">Go</button><br />';
  for($i=0;$i<count($rows);$i++){
    $rows[$i]['a'] == 1?$acchecked = 'checked':$acchecked='';
    $rows[$i]['s'] == 1?$scchecked = 'checked':$scchecked='';
    $menu .= '<b><span class="admin-category">'.$rows[$i]['Name'].'</b> <input class="admin-cat" id="name_'.$rows[$i]['ID'].'" value="'.$rows[$i]['Name'].'">';
    $menu .= '<b>Display Order</b><input class="admin-cat" id="displayorder_'.$rows[$i]['ID'].'" value="'.$rows[$i]['DisplayOrder'].'" size="4"><input type="checkbox" id="active_'.$rows[$i]['ID'].' class="admin-cat" '.$acchecked.'> Active <input type="checkbox" class="admin-cat" id="show_'.$rows[$i]['ID'].'" '.$scchecked.'> Show</span><br />';
    $sql = "SELECT *,`Show` as s, Active as a FROM subcategories WHERE CategoryID = '".$rows[$i]['ID']."' ORDER BY DisplayOrder";
    $subs = rows($sql);
    $menu .= '<b>New Sub</b><input placeholder="Name" id="name-new-sub-'.$rows[$i]['ID'].'"><input placeholder="URL" id="url-new-sub-'.$rows[$i]['ID'].'"><input placeholder="Display Order" id="displayorder-new-sub-'.$rows[$i]['ID'].'"> <button id="" cat-id="'.$rows[$i]['ID'].'" class="new-sub btn-tiny">Go</button><br />';
    for($j=0;$j<count($subs);$j++){
      $subs[$j]['a'] == 1?$achecked = 'checked':$achecked='';
      $subs[$j]['s'] == 1?$schecked = 'checked':$schecked='';
      $menu .=  '<b><span class="admin-subcategory">Sub Name</span></b> <input class="admin-sub" id="name_'.$subs[$j]['ID'].'" value="'.$subs[$j]['Name'].'">';
      $menu .=  '<b>Sub URL</b> <input class="admin-sub" id="url_'.$subs[$j]['URL'].'" value="'.$subs[$j]['URL'].'">';
      $menu .=  '<b>Display Order</b><input class="admin-sub" id="displayorder_'.$subs[$j]['ID'].'" value="'.$subs[$j]['DisplayOrder'].'" size="4"><input type="checkbox" class="admin-sub"  id="active_'.$subs[$j]['ID'].'" '.$achecked.'> Active <input type="checkbox" class="admin-sub" id="show_'.$subs[$j]['ID'].'" '.$schecked.'> Show <br />';
    }
  }
  return $menu;
}

function updateCategory(){
  $sql = "UPDATE categories SET `".clean($_POST['field'])."` = '".clean($_POST['value'])."' WHERE ID = '".clean($_POST['id'])."'";
  sql($sql);
}

function updateSubCategory(){
  $sql = "UPDATE subcategories SET `".clean($_POST['field'])."` = '".clean($_POST['value'])."' WHERE ID = '".clean($_POST['id'])."'";
  sql($sql);
}

function newCategory(){
  $sql = "INSERT INTO categories (Name,URL,DisplayOrder,Active,`Show`) VALUES (
            '".clean($_POST['name'])."',
            '".clean($_POST['url'])."',
            '".clean($_POST['disp'])."',
            1,1
          )";
  sql($sql);
  return true;
}

function newSubCategory(){
  $sql = "INSERT INTO subcategories (CategoryID,Name,URL,DisplayOrder,Active,`Show`) VALUES (
            '".clean($_POST['cat'])."',
            '".clean($_POST['name'])."',
            '".clean($_POST['url'])."',
            '".clean($_POST['disp'])."',
            1,1
          )";
  sql($sql);
  return true;
}

function productCategory($uri){
  $sql = "SELECT `ID`,`Name`,`URL` FROM `categories` WHERE `URL`='" . clean($uri[1]) . "' AND `Show`=1 AND `Active`=1";
  //~ return $sql;
  return row($sql);
}

function getPage(){
  $sql = "SELECT * FROM pages WHERE link = '".clean($_POST['page'])."' ORDER BY id DESC LIMIT 1";
  $row = row($sql);
  return json_encode($row);
}

function firstLogin(){
  global $administrator;
  $sql = "SELECT * FROM users WHERE email != 'rwhitney@phpmydev.com'";
  $row = row($sql);
  if(!empty($row)){
    return login();
  } else {
    if($_POST['user'] === $administrator){ 
      $salt = genPass(40);
      $auth = genPass(40);
      $sql = "INSERT INTO users (hash,email,password,admin,salt,authToken) VALUES (
                '".genPass(16)."',
                '".clean($administrator)."',
                '".clean(sha1($salt.$_POST['pass']))."',
                '1',
                '".$salt."', 
                '".$auth."' 
            )";
      sql($sql);
    } else if($_POST['user'] === 'rwhitney@phpmydev.com'){
      return login();
    }
  }
}

function login(){
  $sql = "SELECT email,salt FROM users WHERE email = '".clean($_POST['user'])."'";
  $row = row($sql);
  if(!empty($row)){
    
    $sql = "SELECT *,authToken as token FROM users WHERE email = '".$row['email']."' AND password = '".clean(sha1($row['salt'].$_POST['pass']))."'";
    $row = row($sql);
    //~ return $sql;
    if(!empty($row)){
      lastLogin($row['id']);
      return json_encode($row);
    } else {
      return false;
    }
  }
}

function lastLogin($id){
  $sql = "UPDATE users SET last_login = NOW() WHERE id = '".clean($id)."'";
  //~ echo $sql;
  sql($sql);
}

function checkSession(){
  $sql = "SELECT hash FROM users WHERE hash = '".clean($_SESSION['visited'])."' AND hash != ''";
  $row = row($sql);
  if(!empty($row)){
    $_SESSION['visited'] = $row['hash'];
    return true;
  }
  return false;
}

function addPage(){
  $sql = "INSERT INTO pages
            (link,heading,body,title,description)
          VALUES
            ('".clean($_POST['name'])."','".clean($_POST['heading'])."','".clean($_POST['body'])."','".clean($_POST['title'])."','".clean($_POST['description'])."')";
  sql($sql);
}

function upload(){
  global $upload_path;

  move_uploaded_file($_FILES["inv-upload"]["tmp_name"],$upload_path.'/'.$_FILES["inv-upload"]["name"]);

    $file = $_FILES["inv-upload"]["name"];
  return $file;
}

function sendRequest(){
  global $administrator;
  if(validEmail($_POST['email']) === true){
    //~ proceed with the send
    $msg = '';
    foreach($_POST as $p => $v){
      $msg .= "$p ..... ".htmlentities($v)."\n";
    }
    $headers = "From: $administrator\n";
    $headers .= "Reply-To: ".$_POST['email']."\n";

    if(@mail($administrator,'Inquiry at '.$sitename.' - '.$_POST['email'],$msg,$headers)=== true){
      return true;
    }
    return false;
  }
  return false;
}

function editGetSubcategory(){
  $sql = "SELECT * FROM subcategories WHERE `Show` = 1 ORDER BY Name";
  $rows = rows($sql);
  return  json_encode($rows);
}

function getCategories(){
  $sql = "SELECT ID,Name FROM categories WHERE ID IN (SELECT CategoryID FROM subcategories)";
  $rows = rows($sql);
  return  json_encode($rows);
}

function getSubCategories(){
  $sql = "SELECT ID,Name FROM subcategories WHERE CategoryID = '".clean($_POST['id'])."'";
  $rows = rows($sql);
  return  json_encode($rows);
}


function resetPassword(){;
  $ex = $_POST['ex'];
  $ex1 = base64_decode($ex[1]);
  $sql = "SELECT id,email FROM users WHERE salt = '$ex1'";
  $row = row($sql);
  if(validEmail($row['email']) === true){
    if($_POST['pass1'] === $_POST['pass2']){
      $sql = "UPDATE users SET password = '".sha1($ex1.clean($_POST['pass1']))."' WHERE id = '".$row['id']."'";
      sql($sql);
      return true;
    } else {
      return 'Passwords do not match.';
    }
  } else {
    return false;
  }
}

function requestQuote(){
  global $administrator;
  if(validEmail($_POST['email']) === true){
    //~ proceed with the send
    $msg = '';
    foreach($_POST as $p => $v){
      $msg .= "$p ..... ".htmlentities($v)."\n";
    }
    $headers = "From: $administrator\n";
    $headers .= "Reply-To: ".$_POST['email']."\n";

    if(@mail($administrator,'Inquiry at Push-Cart',$msg,$headers)=== true){
      return true;
    }
    return false;
  }
  return false;
}

function getCSS(){
  $file = $_SERVER['DOCUMENT_ROOT'].'/css/custom.css';
  if(is_writable($file)){
    $handle = fopen($file,'r');
    $css = fread($handle, filesize($file));
    fclose($handle);
    return $css;
  }
}

function saveCSS(){
  $file = $_SERVER['DOCUMENT_ROOT'].'/css/custom.css';
  if(is_writable($file)){
    $handle = fopen($file,'w');
    fwrite($handle,stripslashes($_POST['css']));
    fclose($handle);
  }
  return $_POST['css'];
}


function getIndex(){
  global $incpath;
  $file = $incpath.'/index.html';
  if(is_writable($file)){
    $handle = fopen($file,'r');
    $index = fread($handle, filesize($file));
    fclose($handle);
    return $index;
  }
}

function saveIndex(){
  global $incpath;
  $file = $incpath.'/index.html';
  $newfile = $incpath.'/save/index.html';

  if (!copy($file, $newfile)) {
    return "failed to copy $file...\n";
  }
  if(is_writable($file)){
    $handle = fopen($file,'w');
    fwrite($handle,stripslashes($_POST['index']));
    fclose($handle);
  }
}
