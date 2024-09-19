<?php 
header('Content-type: text/html; charset=utf-8');
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PHP. include_moduls for JSON</title>
    <!-- <link rel="stylesheet" href="style2.css"> -->
</head>
<body>
<?php

//echo"Hola mundo desde BibleApp";

$base_name = '../Moduls_for_JSON/NRT/';


//NRT
$books = array(
    0 => "nrt_01.htm",
    1 => "nrt_02.htm",
    2 => "nrt_03.htm",
    3 => "nrt_04.htm",
    4 => "nrt_05.htm",
    5 => "nrt_06.htm",
    6 => "nrt_07.htm",
    7 => "nrt_08.htm",
    8 => "nrt_09.htm",
    9 => "nrt_10.htm",
    10 => "nrt_11.htm",
    11 => "nrt_12.htm",
    12 => "nrt_13.htm",
    13 => "nrt_14.htm",
    14 => "nrt_15.htm",
    15 => "nrt_16.htm",
    16 => "nrt_17.htm",
    17 => "nrt_18.htm",
    18 => "nrt_19.htm",
    19 => "nrt_20.htm",
    20 => "nrt_21.htm",
    21 => "nrt_22.htm",
    22 => "nrt_23.htm",
    23 => "nrt_24.htm",
    24 => "nrt_25.htm",
    25 => "nrt_26.htm",
    26 => "nrt_27.htm",
    27 => "nrt_28.htm",
    28 => "nrt_29.htm",
    29 => "nrt_30.htm",
    30 => "nrt_31.htm",
    31 => "nrt_32.htm",
    32 => "nrt_33.htm",
    33 => "nrt_34.htm",
    34 => "nrt_35.htm",
    35 => "nrt_36.htm",
    36 => "nrt_37.htm",
    37 => "nrt_38.htm",
    38 => "nrt_39.htm",
    39 => "nrt_40.htm",
    40 => "nrt_41.htm",
    41 => "nrt_42.htm",
    42 => "nrt_43.htm",
    43 => "nrt_44.htm",
    44 => "nrt_59.htm",
    45 => "nrt_60.htm",
    46 => "nrt_61.htm",
    47 => "nrt_62.htm",
    48 => "nrt_63.htm",
    49 => "nrt_64.htm",
    50 => "nrt_65.htm",
    51 => "nrt_45.htm",
    52 => "nrt_46.htm",
    53 => "nrt_47.htm",
    54 => "nrt_48.htm",
    55 => "nrt_49.htm",
    56 => "nrt_50.htm",
    57 => "nrt_51.htm",
    58 => "nrt_52.htm",
    59 => "nrt_53.htm",
    60 => "nrt_54.htm",
    61 => "nrt_55.htm",
    62 => "nrt_56.htm",
    63 => "nrt_57.htm",
    64 => "nrt_58.htm",
    65 => "nrt_66.htm"
);



//echo $books[0];
//echo $books[1];

/*
echo"<div id='bible'>";

foreach ($books as $value) {
    //echo"<p>$value </p>";
    include($base_name . $value);
}

echo"</div>";
*/

include($base_name . $books[0]);
include($base_name . $books[1]);
include($base_name . $books[2]);
include($base_name . $books[3]);
include($base_name . $books[4]);
/*
include($base_name . '02_exodus.htm');
include($base_name . '03_leviticus.htm');
include($base_name . '04_numbers.htm');
*/


?>
<script type="text/javascript">


</script>
</body>
</html>