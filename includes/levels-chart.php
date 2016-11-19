<?php
# $Id: data_table.example3.php 999 2011-08-05 19:00:48Z lbayuk $
# phplot / contrib / data_table example 3:  Pie chart with data table
require_once '../includes/phplot.php';
require_once '../includes/data_table.php';
// Note column 0, labels, are not used by PHPlot itself, but are
// displayed in the data table, and extracted for the legend.
$data = array(
   //~ array('Goal', 200000),
   array('Virtuoso', 2500),
   array('Maestro', 1600),
   array('Principal', 1320),
   array('Ensemble', 1120),
   array('Concert Revenue', 3200),
   array('Concessions', 1200),
   array('Other', 2430),
   array('Expenses', -3300)
);
$total = 0;
foreach($data as $d=>$v){
  $total += $v[1];
}

$total = array(array('Surplus',$total));
$data = array_merge($data,$total);
// The $settings array configures the data table:
// Width and height are auto-calculated, and position defaults to 0,0.
$settings = array(
    'headers' => array('Sponsor Levels', 'Amount'),
    'data' => $data,
);

$plot = new PHPlot(800, 1000);
//~ $plot->SetTitle('Budget and Contributions Per Level');
$plot->SetDataValues($data);
$plot->SetPrintImage(False);
$plot->SetDataType('text-data-single');
$plot->SetPlotType('pie');
foreach ($data as $row) $plot->SetLegend($row[0]);
$plot->SetCallback('draw_graph', 'draw_data_table', $settings);
$plot->DrawGraph();
echo '<h1>Budget and Contributions 2016-17</h1>';
echo "<img src=\"" . $plot->EncodeImage('dataurl') . "\">\n";


