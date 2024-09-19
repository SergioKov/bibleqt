<?php 
    header('Content-type: text/html; charset=utf-8');
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PHP. make JSON</title>
    <!-- <link rel="stylesheet" href="style.css"> -->
    
</head>
<body>
<?php

//echo"Hola mundo desde BibleApp";

$base_name = '../Moduls_for_JSON/ukr_ogi/';

/*
//RSTi2
$books = array(
    0 => "01_genesis.htm",
    1 => "02_exodus.htm",
    2 => "03_leviticus.htm",
    3 => "04_numbers.htm",
    4 => "05_deuteronomy.htm",
    5 => "06_joshua.htm",
    6 => "07_judges.htm",
    7 => "08_ruth.htm",
    8 => "09_1samuel.htm",
    9 => "10_2samuel.htm",
    10 => "11_1kings.htm",
    11 => "12_2kings.htm",
    12 => "13_1chronicles.htm",
    13 => "14_2chronicles.htm",
    14 => "15_ezra.htm",
    15 => "16_nehemiah.htm",
    16 => "17_esther.htm",
    17 => "18_job.htm",
    18 => "19_psalms.htm",
    19 => "20_proverbs.htm",
    20 => "21_ecclesiastes.htm",
    21 => "22_songofsolomon.htm",
    22 => "23_isaiah.htm",
    23 => "24_jeremiah.htm",
    24 => "25_lamentations.htm",
    25 => "26_ezekiel.htm",
    26 => "27_daniel.htm",
    27 => "28_hosea.htm",
    28 => "29_joel.htm",
    29 => "30_amos.htm",
    30 => "31_obadiah.htm",
    31 => "32_jonah.htm",
    32 => "33_micah.htm",
    33 => "34_nahum.htm",
    34 => "35_habakkuk.htm",
    35 => "36_zephaniah.htm",
    36 => "37_haggai.htm",
    37 => "38_zechariah.htm",
    38 => "39_malachi.htm",
    39 => "40_matthew.htm",
    40 => "41_mark.htm",
    41 => "42_luke.htm",
    42 => "43_john.htm",
    43 => "44_acts.htm",
    44 => "45_james.htm",
    45 => "46_1peter.htm",
    46 => "47_2peter.htm",
    47 => "48_1john.htm",
    48 => "49_2john.htm",
    49 => "50_3john.htm",
    50 => "51_jude.htm",
    51 => "52_romans.htm",
    52 => "53_1corinthians.htm",
    53 => "54_2corinthians.htm",
    54 => "55_galatians.htm",
    55 => "56_ephesians.htm",
    56 => "57_philippians.htm",
    57 => "58_colossians.htm",
    58 => "59_1thessalonians.htm",
    59 => "60_2thessalonians.htm",
    60 => "61_1timothy.htm",
    61 => "62_2timothy.htm",
    62 => "63_titus.htm",
    63 => "64_philemon.htm",
    64 => "65_hebrews.htm",
    65 => "66_revelations.htm",
    66 => "67_2ezra.htm",
    67 => "68_tobit.htm",
    68 => "69_wisdom.htm",
    69 => "70_sirach.htm",
    70 => "71_1maccabees.htm",
    71 => "72_2maccabees.htm",
    72 => "73_3maccabees.htm",
    73 => "72_baruch.htm",
    74 => "74_3ezra.htm",
    75 => "75_judith.htm",
    76 => "76_epjeremiah.htm"
);
*/
/*
//RST+
$books = array(
    0 => "ru01.htm",
    1 => "ru02.htm",
    2 => "ru03.htm",
    3 => "ru04.htm",
    4 => "ru05.htm",
    5 => "ru06.htm",
    6 => "ru07.htm",
    7 => "ru08.htm",
    8 => "ru09.htm",
    9 => "ru10.htm",
    10 => "ru11.htm",
    11 => "ru12.htm",
    12 => "ru13.htm",
    13 => "ru14.htm",
    14 => "ru15.htm",
    15 => "ru16.htm",
    16 => "ru17.htm",
    17 => "ru18.htm",
    18 => "ru19.htm",
    19 => "ru20.htm",
    20 => "ru21.htm",
    21 => "ru22.htm",
    22 => "ru23.htm",
    23 => "ru24.htm",
    24 => "ru25.htm",
    25 => "ru26.htm",
    26 => "ru27.htm",
    27 => "ru28.htm",
    28 => "ru29.htm",
    29 => "ru30.htm",
    30 => "ru31.htm",
    31 => "ru32.htm",
    32 => "ru33.htm",
    33 => "ru34.htm",
    34 => "ru35.htm",
    35 => "ru36.htm",
    36 => "ru37.htm",
    37 => "ru38.htm",
    38 => "ru39.htm",
    39 => "ru40.htm",
    40 => "ru41.htm",
    41 => "ru42.htm",
    42 => "ru43.htm",
    43 => "ru44.htm",
    44 => "ru45.htm",
    45 => "ru46.htm",
    46 => "ru47.htm",
    47 => "ru48.htm",
    48 => "ru49.htm",
    49 => "ru50.htm",
    50 => "ru51.htm",
    51 => "ru52.htm",
    52 => "ru53.htm",
    53 => "ru54.htm",
    54 => "ru55.htm",
    55 => "ru56.htm",
    56 => "ru57.htm",
    57 => "ru58.htm",
    58 => "ru59.htm",
    59 => "ru60.htm",
    60 => "ru61.htm",
    61 => "ru62.htm",
    62 => "ru63.htm",
    63 => "ru64.htm",
    64 => "ru65.htm",
    65 => "ru66.htm"    
);
*/

/*
//NRT ok
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
*/

//ukr_ogi
$books = array(
    0 => "Genesis.htm",
    1 => "Exodus.htm",
    2 => "Leviticus.htm",
    3 => "Numbers.htm",
    4 => "Deuteronomy.htm",
    5 => "Joshua.htm",
    6 => "Judges.htm",
    7 => "Ruth.htm",
    8 => "1Samuel.htm",
    9 => "2Samuel.htm",
    10 => "1Kings.htm",
    11 => "2Kings.htm",
    12 => "1Chronicles.htm",
    13 => "2Chronicles.htm",
    14 => "Ezra.htm",
    15 => "Nehemiah.htm",
    16 => "Esther.htm",
    17 => "Job.htm",
    18 => "Psalms.htm",
    19 => "Proverbs.htm",
    20 => "Ecclesiastes.htm",
    21 => "Song.htm",
    22 => "Isaiah.htm",
    23 => "Jeremiah.htm",
    24 => "Lamentations.htm",
    25 => "Ezekiel.htm",
    26 => "Daniel.htm",
    27 => "Hosea.htm",
    28 => "Joel.htm",
    29 => "Amos.htm",
    30 => "Obadiah.htm",
    31 => "Jonah.htm",
    32 => "Micah.htm",
    33 => "Nahum.htm",
    34 => "Habakkuk.htm",
    35 => "Zephaniah.htm",
    36 => "Haggai.htm",
    37 => "Zechariah.htm",
    38 => "Malachi.htm",
    39 => "Matthew.htm",
    40 => "Mark.htm",
    41 => "Luke.htm",
    42 => "John.htm",
    43 => "Acts.htm",
    44 => "James.htm",
    45 => "1Peter.htm",
    46 => "2Peter.htm",
    47 => "1John.htm",
    48 => "2John.htm",
    49 => "3John.htm",
    50 => "Jude.htm",
    51 => "Romans.htm",
    52 => "1Cor.htm",
    53 => "2Cor.htm",
    54 => "Galat.htm",
    55 => "Ephes.htm",
    56 => "Philip.htm",
    57 => "Colos.htm",
    58 => "1Thess.htm",
    59 => "2Thess.htm",
    60 => "1Tim.htm",
    61 => "2Tim.htm",
    62 => "Titus.htm",
    63 => "Philim.htm",
    64 => "Hebrews.htm",
    65 => "Rev.htm"
    );

//echo $books[0];
//echo $books[1];


echo"<div id='bible'>";

foreach ($books as $value) {
    //echo"<p>$value </p>";
    include($base_name . $value);
}

echo"</div>";



//include($base_name . 'ru40.htm');
//include($base_name . 'ru02.htm');
/*
include($base_name . '03_leviticus.htm');
include($base_name . '04_numbers.htm');
*/

/*
include($base_name . 'test01_genesis.htm');
include($base_name . 'test02_exodus.htm');
include($base_name . 'test02_exodus.htm');
*/

//include($base_name . 'all_books.htm');

?>
<!-- <script src="./obj_books/arr_books_nrt.js"></script> -->
<script src="./obj_books/arr_books_ukr_ogi.js"></script>
<script type="text/javascript" src="./make_json.js"></script>
</body>
</html>

