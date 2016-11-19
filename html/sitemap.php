<?php header("Content-Type: text/xml");
  echo '<?xml version="1.0" encoding="UTF-8"?>

<urlset xmlns="http://www.google.com/schemas/sitemap/0.84"
xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
xsi:schemaLocation="http://www.google.com/schemas/sitemap/0.84
http://www.google.com/schemas/sitemap/0.84/sitemap.xsd">'; 

$sql = "SELECT sc.url as subcat,c.url as category,p.*, 
        IF( YEAR( p.lastEdit ) >0, p.lastEdit, 0 ) AS lastEdit
        FROM pages p, tblProductSubcategories sc, tblProductCategories c WHERE p.title != '' 
        AND sc.categoryid = c.id
        GROUP BY p.link
        ORDER BY id DESC";
$rows = rows($sql);
for($i=0;$i<count($rows);$i++){
  if($rows[$i]['lastEdit'] > 0){
    $lastEdit = substr($rows[$i]['lastEdit'],0,10);
  } else {
    $lastEdit = '2016-04-14';
  }
	echo '<url>
		<loc>https://'.$_SERVER['HTTP_HOST'].'/'.$rows[$i]['link'].'</loc>
		<lastmod>'.$lastEdit.'</lastmod>
		<priority>1.0</priority>
		<changefreq>weekly</changefreq>
	</url>';
}
echo '</urlset>';
