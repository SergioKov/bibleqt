<?

$lines = file("hebrew.htm");
$count = count($lines);

$fp = fopen("hebrew.idx", "w");

fputs($fp, "Еврейский лексикон Стронга (с) Bob Jones University\r\n");

$offset = 0;

for($i=0;$i<$count;$i++)
{
	if(substr($lines[$i],0,4)=='<h4>')
		fputs($fp, strip_tags(trim($lines[$i]))."\r\n".$offset."\r\n");

	$offset += strlen($lines[$i]);
}

fclose($fp);

?>