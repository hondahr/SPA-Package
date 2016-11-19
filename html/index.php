<?php session_start();
  //~ if(server() !== true){
    //~ if($_SERVER['SERVER_PORT'] ===  '80'){
      //~ if($_SERVER['REQUEST_URI'] !== '/sitemap.xml'){
        //~ header('Location: https://'.$_SERVER['HTTP_HOST'].'/'.$_SERVER['REQUEST_URI']);
      //~ }
    //~ }
  //~ }
  //~ echo date('Y-m-dh:i:s');
  //~ require_once '../includes/anti-hammer.php';
  require_once '../includes/config.php';

//~ $sql = "SELECT ID,Quantities from tblProducts where Quantities >0";
//~ $rows = rows($sql);
//~ for($i=0;$i<count($rows);$i++){
  //~ $ex = explode(',',$rows[$i]['Quantities']);
  //~ for($j=0;$j<count($ex);$j++){
    //~ $sql = "INSERT INTO quantityoptions (quantity,product) VALUES ('".$ex[$j]."','".$rows[$i]['ID']."')";
    //~ sql($sql);
  //~ }
//~ }




//update customers table upon launch
//first run customersimport.sql located in centosnew root
//~ $sql = "SELECT * FROM customers";
//~ $rows = rows($sql);
//~ for($i=0;$i<count($rows);$i++){
  //~ $sql = "UPDATE customers SET salt = '".genPass(32)."' WHERE ID = '".$rows[$i]['ID']."'";
  //~ sql($sql);
//~ }

