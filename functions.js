//====================================================================//
//  F U N C T I O N S
//====================================================================//
//Modifico sólo los links si es para traducción rusa, ya que TSK viene con EnglishPlsalms = Y
//convertir links de Español a Ruso //antes checkLink()
function convertLinkFromEspToRus(book, chapter, verse, to_verse = null){
    //console.log('Convierto Psalmo 119:63 en Псалом 118:63 para menu u otras cosas.');

    var book = parseInt(book);
    var chapter = (chapter != null) ? parseInt(chapter) : null;
    var verse = parseInt(verse);
    var to_verse = parseInt(to_verse);

    //nuevos datos
    var bookNumber = book;
    var chapterNumber = chapter;
    var verseNumber = verse;
    var to_verseNumber = to_verse;

    //Miro la traducción con EnglishPsalms
    switch (book) {

        case 3: //Числа
                if(chapter == 12 && verse == 16){//Nm.12:16 => Чис.13:1
                    chapterNumber = 13;
                    verseNumber = 1;
                }
                if(chapter == 13){//Nm.13:1 => Чис.13:2 
                    verseNumber += 1;
                    to_verseNumber += 1;
                }
            break;

        case 5: //Иисус Навин
                if(chapter == 5){//Иис.Нав.5:16 => Jos.6:1
                    //todo ok    
                }
                if(chapter == 6){//Иис.Нав.6:22 => Jos.6:21// ver en Gen 19:12
                    if(verse == 1){
                        chapterNumber = 5;
                        verseNumber = 16;
                    }else{
                        verseNumber -= 1;//para tsk es (verse - 1) //ok
                        to_verseNumber -= 1;
                    }
                }
            break; 
            
        case 8: //1Samuel (1Царств) 
                if(chapter == 20){//1Цар.20:42-43 => 1Sam 20:42
                    //todo ok     
                }
                if(chapter == 23 && verse == 29){//
                    chapterNumber = 24;
                    verseNumber = 1;
                }
                if(chapter == 24){//1Цар.24:1 => 1S.23:29
                    verseNumber += 1;
                    to_verseNumber += 1;
                }
            break; 
        
        case 17: //Job 
                if(chapter == 39){//39:31-35 => 40:1-5  | 40:6-24 =>	40: -5
                    //todo ok. 
                }
                if(chapter == 40){ 
                    if(verse >= 1 && verse <= 5){//Job.40:1-5 => 39:31-35
                        chapterNumber = 39;
                        verseNumber += 30;
                        to_verseNumber += 30;
                        if(to_verseNumber >= 35) to_verseNumber = 35;//ultimo verse de capitulo 39
                        //alert('Job '+chapterNumber+':'+verseNumber+'-'+to_verseNumber);
                    }
                    if(verse >= 6 && verse <= 24){
                        chapterNumber = 40;
                        verseNumber -= 5;
                        to_verseNumber -= 5;
                        //alert('Job '+chapterNumber+':'+verseNumber+'-'+to_verseNumber);
                    }  
                }
                if(chapter == 41){//40:1-26 => 41:9-34
                    if(verse >= 1 && verse <= 8){
                        chapterNumber = 40;
                        verseNumber += 19;
                        to_verseNumber += 19;                        
                        //alert('Job '+chapterNumber+':'+verseNumber+'-'+to_verseNumber);
                    } 
                    if(verse >= 9 && verse <= 34){
                        chapterNumber = 41;
                        verseNumber -= 8;
                        to_verseNumber -= 8;
                        //alert('Job '+chapterNumber+':'+verseNumber+'-'+to_verseNumber);
                    }
                }
            break; 

        case 18: //Psalmos 
                if(chapter >= 3 && chapter <= 9){//3:1 - 9:20 =>	Х : +1 *
                    verseNumber += 1;
                    to_verseNumber += 1;
                    //alert('Ps '+chapterNumber+':'+verseNumber+'-'+to_verseNumber);
                }
                if(chapter == 10){//
                    chapterNumber = 9;
                    verseNumber += 21;
                    to_verseNumber += 21;
                    //alert('Ps '+chapterNumber+':'+verseNumber+'-'+to_verseNumber);
                }
                //Formula Esp => Rus //Пс.X:1 => Ps.X+1:1 
                //+1 : Х
                if(
                    (chapter == 11) || 
                    (chapter >= 14 && chapter <= 17) || 
                    (chapter >= 23 && chapter <= 29) || 
                    (chapter >= 32 && chapter <= 33) || 
                    (chapter == 35) || 
                    (chapter == 37) || 
                    (chapter == 43) || 
                    (chapter == 50) || 
                    (chapter == 66) || 
                    (chapter >= 71 && chapter <= 74) || 
                    (chapter >= 78 && chapter <= 79) || 
                    (chapter == 82) || 
                    (chapter == 86) || 
                    (chapter == 87) || 
                    (chapter == 91) || 
                    (chapter >= 93 && chapter <= 101) || 
                    (chapter >= 103 && chapter <= 107) || 
                    (chapter >= 109 && chapter <= 114) || 
                    (chapter >= 117 && chapter <= 146)
                ){
                    chapterNumber -= 1;
                    //alert('Ps '+chapterNumber+':'+verseNumber+'-'+to_verseNumber);
                }
                //Formula Esp => Rus //Ps.X:1 => Пс.X-1:2 
                //-1 : +1
                if(
                    (chapter == 12) || 
                    (chapter >= 18 && chapter <= 22) || 
                    (chapter >= 30 && chapter <= 31) || 
                    (chapter == 34) || 
                    (chapter == 36) || 
                    (chapter >= 38 && chapter <= 42) || 
                    (chapter >= 44 && chapter <= 49) || 
                    (chapter == 53) || 
                    (chapter >= 55 && chapter <= 59) || 
                    (chapter >= 61 && chapter <= 65) || 
                    (chapter >= 67 && chapter <= 70) || 
                    (chapter >= 75 && chapter <= 77) || 
                    (chapter >= 80 && chapter <= 81) || 
                    (chapter >= 83 && chapter <= 85) || 
                    (chapter >= 88 && chapter < 90) || 
                    (chapter == 92) || 
                    (chapter == 102) || 
                    (chapter == 108)
                ){
                    chapterNumber -= 1;
                    verseNumber += 1;
                    to_verseNumber += 1;
                    //alert('Ps '+chapterNumber+':'+verseNumber+'-'+to_verseNumber);
                }
                //Formula
                //2en1
                if(chapter == 13){//13:05 => 12:6-а | 13:06 => 12:6-б
                    chapterNumber -= 1;
                    verseNumber += 1;
                    to_verseNumber += 1;
                    if(verse == 6) verseNumber = 6;
                    if(to_verse == 6) to_verseNumber = 6;
                    //alert('Ps '+chapterNumber+':'+verseNumber+'-'+to_verseNumber);
                }
                //Formula
                //-1 : +2 *
                if(
                    (chapter >= 51 && chapter <= 52) ||
                    (chapter == 54) || 
                    (chapter == 60)
                ){
                    chapterNumber -= 1;
                    verseNumber += 2;
                    to_verseNumber += 2;
                    //alert('Ps '+chapterNumber+':'+verseNumber+'-'+to_verseNumber);
                }
                //Formula
                //2en1
                if(chapter == 90){//90:05 => 89:6-а | 90:06	=> 89:6-б 
                    chapterNumber -= 1;
                    if(verse <= 5){
                        verseNumber += 1;
                        to_verseNumber += 1;
                    }
                    //alert('Ps '+chapterNumber+':'+verseNumber+'-'+to_verseNumber);
                }
                //Formula
                //-2: +8
                if(chapter == 115){//115:1-18 => 113: +8
                    chapterNumber -= 2;
                    verseNumber += 8;
                    to_verseNumber += 8;
                    //alert('Ps '+chapterNumber+':'+verseNumber+'-'+to_verseNumber);
                }
                //Formula
                //-2: X
                if(chapter == 116){//116:1-9 => 114: Х
                    if(verse <= 9){
                        chapterNumber -= 2;
                    }
                    if(verse >= 10){
                        chapterNumber -= 1;
                        verseNumber -= 9;
                        to_verseNumber -= 9;
                    }
                    //alert('Ps '+chapterNumber+':'+verseNumber+'-'+to_verseNumber);
                }
                //Formula
                //-1: X (especial)
                if(chapter == 147){//147:1-11 => 146:1-11
                    if(verse <= 11){
                        chapterNumber -= 1;
                    }
                    if(verse >= 12){
                        verseNumber -= 11;
                        to_verseNumber -= 11;
                    }
                    //alert('Ps '+chapterNumber+':'+verseNumber+'-'+to_verseNumber);
                }
            break;

        case 19: //Притчи
                if(chapter == 4){
                   // todo ok
                }
            break;
    
        case 21: //Cantares - Песня песней
                if(chapter == 1){
                    if(verse > 1){
                        verseNumber -= 1;
                        to_verseNumber -= 1;
                    }
                    //alert('Ps '+chapterNumber+':'+verseNumber+'-'+to_verseNumber);
                }
                if(chapter == 6){//06:13 =>	07:1
                    if(verse == 13){
                        chapterNumber = 7;
                        verseNumber = 1;
                        to_verseNumber = 1;
                    }
                }
                if(chapter == 7){//7:1-13 => 7: +1 (7:2-14)
                    verseNumber += 1;
                    to_verseNumber += 1;
                }
            break;

        case 22: //Isaías - Исаия
                if(chapter == 3){
                    if(verse >=20){
                        verseNumber -= 1;
                        to_verseNumber -= 1;
                    } 
                }
            break;

        case 26: //Daniel - Даниил
                if(chapter == 3){//3:1-30 => 3:1-30
                    //в Синодальном переводе есть вставочные стихи, которых нет в Исп Библии. Стихи с 24 по 90 включительно переведены с греческого, потому что в еврейском тексте их нет. - Прим. ред.
                    //todo ok
                }
                if(chapter == 4){//4:1-3 => 3:31-33 | 4:4-37 => 4: -3
                    if(verse <= 3){
                        chapterNumber = 3;
                        verseNumber += 30;
                        to_verseNumber += 30;
                    } 
                    if(verse >= 4){
                        verseNumber -= 3;
                        to_verseNumber -= 3;
                    }
                }
            break;

        case 27: //Oseas - Осия
                if(chapter == 13){//13:16 => 14:1
                    if(verse == 16){
                        chapterNumber = 14;
                        verseNumber = 1;
                    } 
                }
                if(chapter == 14){//14:1-9 => 14:2-10
                    verseNumber += 1;
                    to_verseNumber += 1;
                }
            break;

        case 31: //Jonas - Иона
                if(chapter == 1){//1:17 => 2:1
                    if(verse == 17){
                        chapterNumber = 2;
                        verseNumber = 1;
                    } 
                }
                if(chapter == 2){//2:1-10 => 2:2-11
                    verseNumber += 1;
                    to_verseNumber += 1;
                }
            break;


        case 44: //Romanos - Римлянам
                //book = book + 7;// 44 + 7 = 51 //Romanos - Римлянам
                if(chapter == 16){// 16:25-27 => 14:24-26                                          
                    if(verse >= 25){
                        chapterNumber = 14;
                        verseNumber -= 1;
                        to_verseNumber -= 1;
                    }
                }
            break;

        case 46: //2Corintios - 2-Коринфянам
                //book = book + 7;// 46 + 7 = 53 //2Corintios - 2-Коринфянам
                if(chapter == 13){// 13:12-13 => 13:12 | 13:14 => 13:13                                          
                    if(verse >= 13){
                        verseNumber -= 1;
                        to_verseNumber -= 1;
                    } 
                }

        default:
            //console.log('default en switch');
            break;
    }//fin switch

    to_verseNumber = (isNaN(to_verseNumber)) ? null : to_verseNumber ;

    var result = [bookNumber, chapterNumber, verseNumber, to_verseNumber];

    return result;

}




function getStrongNumber(numberStr, lang = null, paramfirstLetter = null){
    let div_strong_head = document.querySelector('#strong_head');
    let div_strong_body = document.querySelector('#strong_body');
    var numberInt, numberStrShow, strongFile;

    if(window.innerWidth < 768){//si es mobile
        openSidebar(document.querySelector('.btnMenu'));//simulo click sobre el boton hamburguesa        
    }

    //H7225 or G6225
    if(numberStr.includes('H') || numberStr.includes('G')){
        let firstLetter = numberStr.substr(0,1);
        //console.log('firstLetter: '+firstLetter);       
        numberInt = parseInt(numberStr.substr(1));
        numberStrShow = numberStr;
        strongFile = (firstLetter == 'G') ? 'greek.htm' : 'hebrew.htm' ;
    }else{//00776 
        numberInt = parseInt(numberStr); 
        if(lang == 'Grk'){
            numberStrShow = 'G'+numberInt;
            strongFile = 'greek.htm';
        }else{
            numberStrShow = 'H'+numberInt;
            strongFile = 'hebrew.htm';
        }
    }
    //console.log('numberInt: '+numberInt);
    //console.log('numberStrShow: '+numberStrShow);
    //console.log('strongFile: '+strongFile);  


    fetch(`modules/text/strongs/${strongFile}`)
    .then((response) => response.text())
    .then((strong) => {
        //console.log(strong);

        let arr_strong = strong.split('<h4>')[numberInt + 1].split('</h4>');//una linea 
        let strongIndex = arr_strong[0];
        let strongText = arr_strong[1];

        //console.log('strongIndex: '+strongIndex);
        //console.log('strongText: '+strongText);

        //strong_head.innerHTML = strongIndex;
        //strong_body.innerHTML = strongText;

        //div_strong_head.innerHTML = '';//reset datos
        div_strong_body.innerHTML = '';//reset datos

        showTab(document.querySelector('#btn_strong'),'strong');  
        
        const span_hist_strong = document.createElement('span');
        span_hist_strong.className = 'hist_strong';
        //span_hist_strong.setAttribute('onclick',"getStrongNumber('"+strongIndex+"')");
        span_hist_strong.setAttribute('onclick',"getStrongNumber('"+numberStrShow+"')");
        //span_hist_strong.innerHTML = strongIndex;
        span_hist_strong.innerHTML = numberStrShow;
        
        let hist_strong_all = document.querySelectorAll('.hist_strong');
        let ult_hist_strong = hist_strong_all[0];
        if(typeof ult_hist_strong == 'undefined' && hist_strong_all.length == 0){//vacio y 1-er element
            div_strong_head.prepend(span_hist_strong);
            //console.log('1 strongIndex');
        }else if(ult_hist_strong.innerHTML != numberStrShow){
            div_strong_head.prepend(span_hist_strong);
            //console.log('2 y mas strongIndex ...');
        }else{
            //console.log('no hago nada...');
        }

        const span_num_strong = document.createElement('span');
        span_num_strong.className = 'num_strong';
        span_num_strong.innerHTML = numberStrShow+' <span class="f_r">'+strongIndex+'</span>';

        let arr_w = strongText.split(' ');
        let arr_new = [];

        arr_w = arr_w.filter(elm => elm);

        arr_w.forEach((el,i,arr)=>{   
            if(parseInt(el)){
                if(typeof arr[i+2] !== 'undefined' && arr[i+2].includes('BQTHeb')){
                    el = '<span class="sp_strong Heb">'+el+'</span>';
                }else if(typeof arr[i+2] !== 'undefined' && arr[i+2].includes('BQTGrk')){
                    el = '<span class="sp_strong Grk">'+el+'</span>';
                }else{
                    el = '<span class="sp_strong noLink">'+el+'</span>';
                }
            }
            //console.log(el);
            arr_new.push(el);
        });
        var new_strongText = arr_new.join(' ');

        const span_text_strong = document.createElement('span');
        span_text_strong.className = 'text_strong';
        span_text_strong.innerHTML = new_strongText;            

        const p_v = document.createElement('p');//найти стихи с этим номером
        p_v.className = 'p_v';
        p_v.innerHTML = `Найти стихи с этим номером.`;
        p_v.onclick = function(){
            showTab(document.querySelector('#btn_find'),'find');

            if(paramfirstLetter != null && paramfirstLetter == 'Y'){
                document.querySelector('#inpt_find').value = numberStrShow;
                findWords(numberStrShow);//rstStrongRed - ok
            }else{
                document.querySelector('#inpt_find').value = numberStr;
                if(numberStr.includes('H') || numberStr.includes('G')){//rstStrongRed
                    findWords(numberStr);
                }else{//rstStrong
                    document.querySelector('#cbox4').checked = true;//si hace falta
                    findWords(numberStr);//rstStrong
                }
            }
            //findWords(strongIndex);//rstStrong - ok
            //findWords(numberStr);
        }
        div_strong_body.append(p_v);

        const p = document.createElement('p');
        p.append(span_num_strong);
        p.append(span_text_strong);

        div_strong_body.append(p);

        //Listener para Strong Heb
        if(typeof new_strongText !== 'undefined' && new_strongText.includes('sp_strong Heb')){
            document.querySelectorAll('.sp_strong.Heb').forEach(el=>{ 
                el.addEventListener('click', function(){ 
                    getStrongNumber(el.innerHTML, 'Heb');
                });    
            });
        }
        //Listener para Strong Grk
        if(typeof new_strongText !== 'undefined' && new_strongText.includes('sp_strong Grk')){
            document.querySelectorAll('.sp_strong.Grk').forEach(el=>{ 
                el.addEventListener('click', function(){ 
                    getStrongNumber(el.innerHTML, 'Grk');
                });    
            });
        }
        mySizeStrong();//altura de div_strong_body despues de meter div_strong_head
    })
    .catch(error => { 
        // Código a realizar cuando se rechaza la promesa
        //console.log('error promesa strong: '+error);
    });
}


function cboxChange(e){
    //console.log('=== function cboxChange() ===');
    //console.log('e.id: '+e.id);
    
    var cbox1 = document.querySelector('#cbox1');//1. искомое содержит хотя бы одно слово
    var cbox2 = document.querySelector('#cbox2');//2. cлова идут в заданном порядке
    var cbox3 = document.querySelector('#cbox3');//3. искать точную фразу
    var cbox4 = document.querySelector('#cbox4');//4. выражения не могут быть частями слов
    var cbox5 = document.querySelector('#cbox5');//5. различать прописные и заглавные буквы
    var cbox6 = document.querySelector('#cbox6');//6. различать буквы с ударениями (если есть)

    if(e.id == 'cbox1'){
        if(cbox1.checked){
            cbox2.checked = false;
            cbox3.checked = false;
        }
    }
    if(e.id == 'cbox2'){
        if(cbox2.checked){
            cbox1.checked = false;
            cbox3.checked = false;
        }
    }
    if(e.id == 'cbox3'){
        if(cbox3.checked){
            cbox1.checked = false;
            cbox2.checked = false;
            cbox4.checked = false;
            cbox5.checked = false;
        }
    }
    if(e.id == 'cbox4'){
        if(cbox3.checked){
            cbox3.checked = false;
        }
    }
}

function stopFindWords(){
    document.querySelector('#btn_ok_stop').classList.remove('d-block');
    document.querySelector('#btn_ok_stop').classList.add('d-none');

    document.querySelector('#btn_ok_find').classList.remove('d-none');
    document.querySelector('#btn_ok_find').classList.add('d-block');

    window.doFind = false;
    //console.log('--- window.stopFind ---: '+window.doFind);
  
}

function guardWordsFind(words){
    //console.log('=== guardWordsFind(words) ===');
    //console.log('words: '+words);
    var inpt_find = document.querySelector('#inpt_find');

    const p = document.createElement('p');
    p.className = 'pf';
    p.innerHTML = inpt_find.value.trim();

    if(document.querySelectorAll('.pf').length == 0 || words != document.querySelectorAll('.pf')[0].innerText){
        //console.log('distinto');
        let formData = new FormData();
        formData.append('words', words);
    
        fetch('app/guardWordsFind.php',{
            method: 'POST',
            body: formData                            
        })
        .then(response => response.text())//aki .text()
        .then(data => {
            //console.log(data);
            if(data){
                //getGuardWordsFind();
            }
        })
        .catch(error => console.log('error de guard: '+ error));    
    }
}

//getGuardWordsFind();//al cargar la web para mostrar

function getGuardWordsFind(){
    var inpt_find = document.querySelector('#inpt_find');
    var wr_hist_find = document.querySelector('.wr_hist_find');

    fetch('app/guardWordsFind_file.json')
    .then(response => response.json())
    .then(data=>{
        //console.log(data);
        wr_hist_find.innerHTML = '';
        if(data != ''){           
            data.forEach((el,i)=>{
                if(i == 0){
                    inpt_find.value = el.words;
                }
                
                const p = document.createElement('p');
                p.className = 'pf';
                p.title = el.fecha;
                p.onclick = function(){
                    inpt_find.value = el.words;
                    close_hist_find();
                };
                p.innerHTML = el.words;
                wr_hist_find.append(p);
            });
        }
    });  
}


function findWords(words_input){
    //console.log('function findWords(). words_input: '+words_input);
    let btn_ok_find = document.querySelector('#btn_ok_find');
    btn_ok_find.classList.remove('d-block');
    btn_ok_find.classList.add('d-none');
    let btn_ok_stop = document.querySelector('#btn_ok_stop');
    btn_ok_stop.classList.remove('d-none');
    btn_ok_stop.classList.add('d-block');
    window.doFind = true;

    var gde = document.querySelector('#gde');
    var cbox1 = document.querySelector('#cbox1');//искомое содержит хотя бы одно слово ('Иисус Христос' или Иисус или Христос)
    var cbox2 = document.querySelector('#cbox2');//cлова идут в заданном порядке
    var cbox3 = document.querySelector('#cbox3');//искать точную фразу
    var cbox4 = document.querySelector('#cbox4');//выражения не могут быть частями слов
    var cbox5 = document.querySelector('#cbox5');//различать прописные и Заглавные буквы
    var cbox6 = document.querySelector('#cbox6');//6. различать буквы с ударениями (если есть)

    //console.log('cbox1.checked: '+cbox1.checked);
    //console.log('cbox2.checked: '+cbox2.checked);
    //console.log('cbox3.checked: '+cbox3.checked);
    //console.log('cbox4.checked: '+cbox4.checked);
    //console.log('cbox5.checked: '+cbox5.checked);
    //console.log('cbox6.checked: '+cbox6.checked);

    var limit = document.querySelector('#limit').value;
    limit = (limit != '*') ? parseInt(limit) : '*' ;
    var book_start = null;
    var book_end = null;
    var book_one = null;

    switch (gde.value) {
        case 'TB'://ВСЯ БИБЛИЯ
            book_start = 0;
            book_end = (document.querySelectorAll('#v_book .v_li').length == 77) ? 76 : 65;
            break;
    
        case 'AT'://ВЕТХИЙ ЗАВЕТ
            book_start = 0;
            book_end = 38;
            break;
    
        case 'NT'://НОВЫЙ ЗАВЕТ
            book_start = 39;
            var book_end = 65;
            break;
    
        case 'M'://Пятикнижье
            book_start = 0;
            book_end = 4;
            break;
    
        case 'Hist'://Исторические книги
            book_start = 5;
            book_end = 16;
            break;

        case 'Poet'://Поэтические книги
            book_start = 17;
            book_end = 21;
            break;

        case 'Prof'://Пророки
            book_start = 22;
            book_end = 38;
            break;

        case 'EvActs'://Евангелия и Деяния
            book_start = 39;
            book_end = 43;
            break;
    
        case 'EpPablo'://Послания Павла
            book_start = 44;
            book_end = 57;
            break;

        case 'EpSoborn'://Соборные Послания
            book_start = 58;
            book_end = 65;
            break;

        case 'EpApoc'://Послания и Откровение
            book_start = 44;
            book_end = 65;
            break;
    
        case 'Apocrif'://Неканонические книги
            book_start = 66;
            book_end = 76;
            break;
    
        default: book_one = parseInt(gde.value);
            break;
    }
    //console.log('book_start: '+book_start);
    //console.log('book_end: '+book_end);
    //console.log('book_one: '+book_one);
    if(book_one != null){
        book_start = book_one;
        book_end = book_one;
    }

    var div_find_head = document.querySelector('#find_head'); 
    var div_find_result = document.querySelector('#find_result'); 
    var div_find_body = document.querySelector('#find_body');
    div_find_result.innerHTML = '';//reset
    div_find_body.innerHTML = '';//reset
    window.res_show = '';//reset
     
    words_input = words_input.trim();
    if(words_input == ''){
        const p = document.createElement('p');
        p.className = 'prim';
        p.innerHTML = 'Введите слово или словосочетание для поиска, пожалуйста.'
        div_find_body.append(p);
        return false;
    }
    //meto words en el history
    //guardWordsFind(words_input);
    close_hist_find();

    var words = words_input;
    var arr_words = words.split(' ');
    //console.log('abajo arr_words: ');
    //console.log(arr_words);
    arr_words = arr_words.filter(elm => elm);
    //console.log(arr_words);

    //antes de buscar, muestro esto...
    if(document.querySelector('.res_f') == null){
        const p_book = document.createElement('p');
        p_book.className = 'f_book';
        const p_i = document.createElement('p');
        p_i.className = 'res_f';
        p_i.innerHTML = `"<b class="f_r-ed">${words_input}</b>" <span title="Стихов">(.)</span> <span class="res_m f_r" title="Совпадений">[.]</span>`;
        //добавляю стих в див 
        div_find_head.append(p_book);
        div_find_head.append(p_i);

        
    }  
    mySizeFind();//altura de div_find_body

    const d_loader = document.createElement('div');
    d_loader.className = 'loader';
    d_loader.innerHTML = `<span class="loader__element"></span>
                          <span class="loader__element"></span>
                          <span class="loader__element"></span>`;
    div_find_body.append(d_loader);
    //puntosInterval();

    


    //TIPOS DE BÚSQUEDA   
    //0. - por defecto. nada marcado //ok
    //1. искомое содержит хотя бы одно слово //ok
    //Пример: найти не только стихи, содержащие 'Иисус Христос', но и те, которые содержат 'Иисус' или 'Христос'.
    //Слова: 'Иисус Христос' или 'Иисус' или 'Христос' //ok
    //2. cлова идут в заданном порядке //ok
    //Пример: найти стихи, где встречается 'Иисус Христос', но не 'Христос Иисус'.
    //3. искать точную фразу. //ok
    //Пример: найти стихи, где есть 'Благословен Бог', но не 'Благословен ГОСПОДЬ Бог'.
    //Слова: 'Иисус Христос' но не 'Иисус МЕССИЯ Христос') //ok
    //4. выражения не могут быть частями слов
    //Пример: найти стихи, где есть 'благословен', но не 'благословенИЕ'.
    var no_part_word = (cbox4.checked) ? 'Y' : 'N' ;  
    //5. различать прописные и ЗАГЛАВНЫЕ буквы //ok
    //Пример: различать при поиске слова 'БОГ' и 'бог'.
    var case_sens = (cbox5.checked) ? '' : 'i' ;// '' = case sensitive. Различаются маленькие и БОЛЬШИЕ буквы; 'i' = case insensitive. Все равно какие буквы.
    //6. различать буквы с ударениями (если есть)
    //Пример: различать при поиске слова 'creó' (сотворил) и 'creo' (верю).
    var accent_match = (cbox6.checked) ? 'Y' : 'N' ;// 'Y' = en la búsqueda tener en cuenta tildes si hay; 'N' = da igual tildes;


    var tipo = 'gm' + case_sens ;//i => Case insensitive (da igual miníscula o mayúscula); g => global (se buscan todas coincidencias exactas); '' => solo primera coincidencia; m => en diferentes líneas

    var inpt_nav = document.querySelector('#inpt_nav');

    let Translation = (inpt_nav.dataset.trans != '') ? inpt_nav.dataset.trans : document.querySelector('#trans1').getAttribute('data-trans');
    var btnStrong = document.querySelector('#btnStrong');
    var btnStrongIsActive = false;
    if(btnStrong.classList.contains('btn_active')){
        btnStrongIsActive = true;
    }

    var result_finded = [];
    var result_show = [];
    var count_f = 0;//cantidad de versiculos con frases encontradas
    var arr_result_m_total = [];//tottal array de ocurrencias (matches) en el versículo encontradas
    var arr_result_m = [];//array de ocurrencias (matches) en el versículo encontradas
    var count_m_total = 0;//total cantidad de ocurrencias (matches) en el versículo encontradas
    var count_m = 0;//cantidad de ocurrencias (matches) en el versículo encontradas

    //Si existe traducción...
    if(Translation != null){
        
        var objTrans = arrFavTransObj.find(v => v.Translation === Translation);

        //MODO NEW. Cuando  ya está creado el objeto 'objTrans' desde 'arrFavTransObj'
        if(typeof objTrans != 'undefined' && objTrans != null && objTrans != ''){
            console.log('findWords() --- objTrans está creado. abajo objTrans: ');
            //console.log(objTrans);


            //saco ajustes de este modulo en json               
            var bq = objTrans;
            //console.log(' abajo bq:');
            //console.log(bq);
        
            if(book_start != null && book_end != null){
    
                for(let index = book_start; index <= book_end; index++){                
                    
                    //console.log('--- for --- index: '+index);
                    let book = index;//genesis

                    //si no existe objeto lo creo
                    if(typeof obj_o[Translation] == 'undefined'){
                        obj_o[Translation] = {};
                        obj_o[Translation].Books = [];
                    }

                    //si existe objeto con Translation. Saco datos del objeto
                    if(typeof obj_o[Translation] != 'undefined'){
                        if(typeof obj_o[Translation].Books != 'undefined'){
                            if(typeof obj_o[Translation].Books[book] != 'undefined'){

                                if(obj_o[Translation].Books[book].fileName == bq.Books[book].PathName && obj_o[Translation].Books[book].fileContent != ''){
                                    //console.log(`--- --- starting from myPromise --- divId: ${divId}  --- Translation: ${Translation} `);
                                    
                                    // Registra el tiempo de inicio
                                    const tiempoInicio = new Date().getTime();
                                    //console.log('obj_o --- tiempoInicio: '+tiempoInicio);

                                    var myPromise_find = new Promise(function(resolve, reject){
                                        resolve('ok');
                                    });

                                    myPromise_find
                                    .then((data) => {//data = ok
                                        //console.log(' --- if: ');

                                        if(data == 'ok'){
                                            var bookModule = obj_o[Translation].Books[book].fileContent;
                                        }

                                        if(window.doFind){
                                            //console.log(index+') hago doFind. window.doFind: '+window.doFind);
                                            //console.log('Bible book: '+bq.Books[book].FullName);
                        
                                            //console.log(bookModule);
                                            //показываю в каких книгах ищу
                                            document.querySelector(".f_book").innerHTML = bq.Books[book].FullName;
                    
                                            var nb = bookModule.split('<h4>');//делю файл на главы
                                            //console.log(nb);
                                            
                                            nb = nb.filter(elm => elm);//удаляю пустые елементы массива
                                            //console.log(nb);
                    
                                            var arr_chapters = nb;
                                            //arr_chapters.shift();//elimino index0 ('<h2></h2>\n')
                    
                                            arr_chapters.forEach( (el_ch, i_ch) => {
                                                //console.log(el_ch);
                                                let chapter = i_ch;
                                                let ChapterId = i_ch;
                                                
                                                if(el_ch.includes('<p>')){
                                                    var arr_verses = el_ch.split('<p>');
                                                    //console.log(arr_verses);
                                                    
                                                    //Recorrer todos los verses
                                                    arr_verses.forEach((el,i) => {
                    
                                                        if(el.includes('</p>')){
                                                            var arr_p_text = el.split('</p>');
                                                            var p_Text = arr_p_text[0];
                                                        }else{
                                                            var p_Text = el;
                                                        }
                                                        //console.log('p_Text: '+p_Text); 
                    
                                                        var arr_p = p_Text.split(' ');
                                                        var VerseId = arr_p[0];
                                                        //console.log('VerseId: '+VerseId);
                    
                                                        var VerseText = '';
                                                        for(let index = 1; index < arr_p.length; index++){
                                                            VerseText += arr_p[index] + ' ';
                                                            //console.log('arr_p['+index+']: '+arr_p[index]);
                                                        }
                                                        //console.log('VerseText: '+VerseText);
                                                        
                                                        if(VerseText != ''){
                                                            //VerseText = removeTags(VerseText);
                                                            //console.log('sin tags --- VerseText: '+VerseText);
                                                        }
                    
                    
                                                        //Si hay palabras para buscar...
                                                        if(arr_words.length > 0){
                                                            
                                                            //tipos de busqueda
                                                            var is_match = false;
                    
                    
                                                            //=======================================================================//  
                                                            //0. por defecto - nada marcado //ok
                                                            //=======================================================================//  
                                                            if(!cbox1.checked && !cbox2.checked && !cbox3.checked){
                                                                let arr_matches = [];  
                                                                //1. проверяю есть ли каждое слово из фразы в стихе                                      
                                                                arr_words.forEach(w => {
                                                                    if(accent_match == 'Y'){//cbox6
                                                                        if(no_part_word == 'Y'){//cbox4
                                                                            var arr_no_part_word = [];
                                                                            w = "^" +w +"$";//entera palabra del array, no parte
                                                                            var regex_w = RegExp(w, tipo);
                                                                            VerseText.split(' ').filter(elm=>elm).forEach(el=> {
                                                                                if(removeSymbols(el).match(regex_w)){
                                                                                    //console.log('removeSymbols(el) ('+removeSymbols(el)+') match regex_w: '+true);
                                                                                    arr_no_part_word.push(1);
                                                                                }else{
                                                                                    //console.log('--- el ('+el+') NO match regex_w: '+false);
                                                                                    arr_no_part_word.push(0);
                                                                                } 
                                                                            });
                                                                            if(arr_no_part_word.includes(1)){
                                                                                arr_matches.push(1);
                                                                            }else{
                                                                                arr_matches.push(0);
                                                                            }
                                                                        }else if(no_part_word == 'N'){
                                                                            var regex_w = RegExp(w, tipo);
                                                                            arr_result_m = VerseText.match(regex_w);
                                                                            count_m = (arr_result_m != null) ? arr_result_m.length : 0 ;
                                                                            if(count_m > 0){
                                                                                arr_matches.push(1);
                                                                            }else{
                                                                                arr_matches.push(0);
                                                                            }
                                                                        }
                                                                    }else if(accent_match == 'N'){
                                                                        if(no_part_word == 'Y'){
                                                                            var arr_no_part_word = [];
                                                                            w = "^" +w +"$";//entera palabra del array, no parte
                                                                            var regex_w = RegExp(removeAccents(w), tipo);
                                                                            removeAccents(VerseText).split(' ').filter(elm=>elm).forEach(el=> {
                                                                                if(removeSymbols(el).match(regex_w)){
                                                                                    //console.log('removeSymbols(el) ('+removeSymbols(el)+') match regex_w: '+true);
                                                                                    arr_no_part_word.push(1);
                                                                                }else{
                                                                                    //console.log('--- removeSymbols(el) ('+removeSymbols(el)+') NO match regex_w: '+false);
                                                                                    arr_no_part_word.push(0);
                                                                                } 
                                                                            });
                                                                            if(arr_no_part_word.includes(1)){
                                                                                arr_matches.push(1);
                                                                            }else{
                                                                                arr_matches.push(0);
                                                                            }
                                                                        }else if(no_part_word == 'N'){
                                                                            var regex_w = RegExp(removeAccents(w), tipo); 
                                                                            arr_result_m = removeAccents(VerseText).match(regex_w);
                                                                            count_m = (arr_result_m != null) ? arr_result_m.length : 0 ;
                                                                            if(count_m > 0){
                                                                                arr_matches.push(1);
                                                                            }else{
                                                                                arr_matches.push(0);
                                                                            }
                                                                        }
                                                                    }
                                                                });
                                                                //console.log('Word. w: ', w);
                                                                //console.log('VerseText: ', VerseText);
                                                                if(!arr_matches.includes(0)){//когда все слова из фразы есть в стихе
                                                                    //2. в цикле отмечаю красным все совпадения, но уже не нужно arr_matches.push()
                                                                    arr_words.forEach(w => {
                                                                        if(accent_match == 'Y'){//cbox6
                                                                            if(no_part_word == 'Y'){//cbox4
                                                                                var arr_VerseText_red = [];
                                                                                var regex_w = RegExp(w, tipo);                                                       
                                                                                VerseText.split(' ').filter(elm=>elm).forEach(el=> {
                                                                                    if(removeSymbols(el).match(regex_w)){
                                                                                        //console.log('removeSymbols(el) ('+removeSymbols(el)+') match regex_w: '+true);
                                                                                        el = el.replace(regex_w, function (x) {
                                                                                            return '<b class="f_red">' + x + '</b>';
                                                                                        });
                                                                                        arr_VerseText_red.push(el);
                                                                                    }else{
                                                                                        //console.log('--- el ('+el+') NO match regex_w: '+false);
                                                                                        arr_VerseText_red.push(el);
                                                                                    } 
                                                                                });
                                                                                VerseText = arr_VerseText_red.join(' ');
                                                                                //console.log('VerseText: ', VerseText);
                                                                            }else if(no_part_word == 'N'){
                                                                                var regex_w = RegExp(w, tipo);
                                                                                arr_result_m = VerseText.match(regex_w);
                                                                                count_m = (arr_result_m != null) ? arr_result_m.length : 0 ;
                                                                                if(count_m > 0){
                                                                                    VerseText = VerseText.replace(regex_w, function (x) {
                                                                                        return '<b class="f_red">' + x + '</b>';
                                                                                    });
                                                                                }
                                                                            }
                                                                        }else if(accent_match == 'N'){
                                                                            var regex_w = RegExp(removeAccents(w), tipo); 
                                                                            arr_result_m = removeAccents(VerseText).match(regex_w);
                                                                            count_m = (arr_result_m != null) ? arr_result_m.length : 0 ;
                                                                            if(count_m > 0){
                                                                                var text_marcas = removeAccents(VerseText).replace(regex_w, function (x) {
                                                                                    return '{' + x + '}';
                                                                                });
                                                                                var text_original = VerseText;
                                                                                var text_marcas = prepararTextMarcas(text_marcas);
                                                                                VerseText = markRed(text_original, text_marcas);
                                                                            }
                                                                        }
                                                                    });
                                                                    is_match = true;
                                                                    count_m_total += count_m;
                                                                    arr_result_m_total.push(arr_result_m);
                                                                    //console.log('count_m_total: ', count_m_total);
                                                                    //console.log('arr_result_m_total: ', arr_result_m_total);
                                                                    //console.log('VerseText: ', VerseText);
                    
                                                                }else{
                                                                    is_match = false;
                                                                }
                                                            }
                                                            //=======================================================================//  
                                                            //end //0. por defecto - nada marcado //ok                                 
                                                            //=======================================================================//                                    
                                                            
                    
                                                            //=======================================================================//                                    
                                                            //1. - искомое содержит хотя бы одно слово ('Иисус Христос' или 'Иисус' или 'Христос') //ok
                                                            //=======================================================================//
                                                            if(cbox1.checked){
                                                                let arr_matches = [];
                                                                if(no_part_word == 'Y'){
                                                                    arr_words.forEach(w => {
                                                                        if(no_part_word == 'Y'){
                                                                            // w = "\\b" +w +"\\b";//palabras enteras// exacta coincidencia
                                                                            w = "\\B" +w +"\\B";//marcar si 'w' está rodeada por otras letras dentro de 'aawaa'.//true
                                                                        }
                                                                        if(accent_match == 'Y'){
                                                                            var regex_w = RegExp(w, tipo); 
                                                                            arr_result_m = VerseText.match(regex_w);
                                                                            count_m = (arr_result_m != null) ? arr_result_m.length : 0 ;
                                                                            if(count_m > 0){
                                                                                arr_matches.push(1);
                                                                                VerseText = VerseText.replace(regex_w, function (x) {
                                                                                    return '<b class="f_red">' + x + '</b>';
                                                                                });
                                                                                count_m_total += count_m;
                                                                                arr_result_m_total.push(arr_result_m);
                                                                            }else{
                                                                                arr_matches.push(0);
                                                                            }
                                                                        }else if(accent_match == 'N'){
                                                                            var regex_w = RegExp(removeAccents(w), tipo); 
                                                                            arr_result_m = removeAccents(VerseText).match(regex_w);;
                                                                            count_m = (arr_result_m != null) ? arr_result_m.length : 0 ;
                                                                            if(count_m > 0){
                                                                                arr_matches.push(1);
                                                                                var text_marcas = removeAccents(VerseText).replace(regex_w, function (x) {
                                                                                    return '{' + x + '}';
                                                                                });
                                                                                var text_original = VerseText;
                                                                                var text_marcas = prepararTextMarcas(text_marcas);
                                                                                VerseText = markRed(text_original, text_marcas);
                                                                                count_m_total += count_m;
                                                                                arr_result_m_total.push(arr_result_m);
                                                                            }else{
                                                                                arr_matches.push(0);
                                                                            }
                                                                        }
                                                                    });
                                                                    if(arr_matches.includes(1)){//si por lo menos hay 1 match
                                                                        is_match = true;
                                                                    }else{
                                                                        is_match = false;
                                                                    }
                                                                }else if(no_part_word == 'N'){
                                                                    if(accent_match == 'Y'){
                                                                        words = arr_words.join('|');
                                                                        var regex1 = RegExp(words, tipo);//buscar todo
                                                                        arr_result_m = VerseText.match(regex1);
                                                                        count_m = (arr_result_m != null) ? arr_result_m.length : 0 ;
                                                                        if(count_m > 0){
                                                                            is_match = true;
                                                                            count_m_total += count_m;
                                                                            arr_result_m_total.push(arr_result_m);
                                                                            VerseText = VerseText.replace(regex1, function (x) {
                                                                                return '<b class="f_red">' + x + '</b>';
                                                                            });
                                                                        }else{
                                                                            is_match = false;
                                                                        } 
                                                                    }else if(accent_match == 'N'){
                                                                        words = arr_words.join('|');
                                                                        var regex_w = RegExp(removeAccents(words), tipo); 
                                                                        arr_result_m = removeAccents(VerseText).match(regex_w);
                                                                        count_m = (arr_result_m != null) ? arr_result_m.length : 0 ;
                                                                        if(count_m > 0){
                                                                            arr_matches.push(1);
                                                                            var text_marcas = removeAccents(VerseText).replace(regex_w, function (x) {
                                                                                return '{' + x + '}';
                                                                            });
                                                                            var text_original = VerseText;
                                                                            text_marcas = prepararTextMarcas(text_marcas);
                                                                            VerseText = markRed(text_original, text_marcas);
                                                                            //console.log('VerseText: '+VerseText);
                                                                        }else{
                                                                            arr_matches.push(0);
                                                                        }
                                                                        if(arr_matches.includes(1)){//si por lo menos hay 1 match
                                                                            is_match = true;
                                                                            count_m_total += count_m;
                                                                            arr_result_m_total.push(arr_result_m);
                                                                        }else{
                                                                            is_match = false;
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                            //=======================================================================//
                                                            //end //1. - искомое содержит хотя бы одно слово ('Иисус Христос' или 'Иисус' или 'Христос') //ok
                                                            //=======================================================================//
                    
                    
                                                            //=======================================================================//
                                                            //2. - //cлова идут в заданном порядке //ok
                                                            //=======================================================================//
                                                            if(cbox2.checked){
                                                                //console.log('//tipo búsqueda --- //2. - //cлова идут в заданном порядке');
                                                                let arr_matches = [];
                                                                let arr_matches_w = [];//matches en words
                                                                let arr_regex_w = [];
                                                                let arr_regex_w_l = [];//для сравнения
                                                                arr_words.forEach( (w,i,arr_w) => {
                                                                    if(accent_match == 'Y'){
                                                                        var regex_w = RegExp(w, tipo);
                                                                        arr_regex_w.push(regex_w);
                                                                        var regex_w_l = (typeof w != 'undefined') ? RegExp(w.toLowerCase(), tipo) : RegExp(w, tipo);//для сравнения
                                                                        arr_regex_w_l.push(regex_w_l);
                                                                        arr_result_m = VerseText.match(regex_w);
                                                                        count_m = (arr_result_m != null) ? arr_result_m.length : 0 ;
                                                                        if(count_m > 0){
                                                                            //console.log('ok --- regex_w match arr_words. w: '+w);
                                                                            if(typeof arr_w[i+1] != 'undefined'){
                                                                                if(case_sens == ''){//различать маленькие и БОЛЬШИЕ буквы
                                                                                    var index_first_w = VerseText.indexOf(arr_w[i]);//The indexOf() method is case sensitive.
                                                                                    var index_next_w = VerseText.indexOf(arr_w[i+1], index_first_w);
                                                                                    if(index_first_w < index_next_w){
                                                                                        //console.log('VerseText: '+VerseText);
                                                                                        //console.log('caso2a. index_first_w: '+index_first_w);
                                                                                        //console.log('caso2a. index_next_w: '+index_next_w);
                                                                                        let arr_VerseText_a = VerseText.split(' ');
                                                                                        let arr_VerseText_a_ed = [];
                                                                                        for (let a = 0, sovpad = 0; a < arr_VerseText_a.length; a++) {
                                                                                            let el_a = arr_VerseText_a[a];
                                                                                            if(no_part_word == 'Y'){
                                                                                                var regex_aw = RegExp(arr_w[i+sovpad], tipo);
                                                                                                var sovpad_word = (el_a == arr_w[i+sovpad]) ? true : false ;
                                                                                            }else{//no_part_word == 'N'
                                                                                                var regex_aw = RegExp(arr_w[i+sovpad], tipo);
                                                                                                var sovpad_word = (el_a.match(regex_aw)) ? true : false ;
                                                                                            }
                                                                                            //si 'Иисус' es la última palabra de frase buscada 'Христос Иисус'
                                                                                            if(sovpad_word && sovpad < arr_words.length && i+sovpad < arr_words.length){
                                                                                                el_a = el_a.replace(regex_aw, function (x) {
                                                                                                    return '<b class="f_red">' + x + '</b>';
                                                                                                });
                                                                                                sovpad++;
                                                                                                arr_matches_w.push(1);
                                                                                                count_m_total += 1;
                                                                                                arr_result_m_total.push(arr_result_m);
                                                                                            }
                                                                                            if(sovpad == arr_words.length){
                                                                                                sovpad = 0;//reset para buscar otros maches en el mismo verso
                                                                                            }
                                                                                            arr_VerseText_a_ed.push(el_a); 
                                                                                        }
                                                                                        VerseText = arr_VerseText_a_ed.join(' ');
                                                                                        //console.log(VerseText);
                                                                                    }else{
                                                                                        arr_matches.push(0);
                                                                                    }
                                                                                }else if(case_sens == 'i'){//все равно какие буквы
                                                                                    //превращаю в мал. буквы только для сравнения.
                                                                                    var index_first_w = VerseText.toLowerCase().indexOf(arr_w[i].toLowerCase());//The indexOf() method is case sensitive.
                                                                                    var index_next_w = VerseText.toLowerCase().indexOf(arr_w[i+1].toLowerCase(), index_first_w);
                                                                                    if(index_first_w < index_next_w){
                                                                                        //console.log('VerseText: '+VerseText);
                                                                                        //console.log('VerseText.toLowerCase(): '+VerseText.toLowerCase());
                                                                                        //console.log('caso2b. index_first_w: '+index_first_w);
                                                                                        //console.log('caso2b. index_next_w: '+index_next_w);
                                                                                        let arr_VerseText_a = VerseText.split(' ');
                                                                                        let arr_VerseText_a_ed = [];
                                                                                        for (let a = 0, sovpad = 0; a < arr_VerseText_a.length; a++) {
                                                                                            let el_a = arr_VerseText_a[a];
                                                                                            if(no_part_word == 'Y'){
                                                                                                var regex_aw = RegExp(arr_w[i+sovpad].toLowerCase(), tipo);
                                                                                                var sovpad_word = (el_a.toLowerCase() == arr_w[i+sovpad].toLowerCase()) ? true : false ;
                                                                                            }else{//no_part_word == 'N'
                                                                                                var regex_aw = RegExp(arr_w[i+sovpad].toLowerCase(), tipo);
                                                                                                var sovpad_word = (el_a.toLowerCase().match(regex_aw)) ? true : false ;
                                                                                            }
                                                                                            //si 'Иисус' es la última palabra de frase buscada 'Христос Иисус'
                                                                                            if(sovpad_word && sovpad < arr_words.length && i+sovpad < arr_words.length){
                                                                                                el_a = el_a.replace(regex_aw, function (x) {
                                                                                                    return '<b class="f_red">' + x + '</b>';
                                                                                                });
                                                                                                sovpad++;
                                                                                                arr_matches_w.push(1);
                                                                                                count_m_total += 1;
                                                                                                arr_result_m_total.push(arr_result_m);
                                                                                            }
                                                                                            if(sovpad == arr_words.length){
                                                                                                sovpad = 0;//reset para buscar otros maches en el mismo verso
                                                                                            }
                                                                                            arr_VerseText_a_ed.push(el_a); 
                                                                                        }
                                                                                        VerseText = arr_VerseText_a_ed.join(' ');
                                                                                        //console.log(VerseText);
                                                                                    }else{
                                                                                        arr_matches.push(0);
                                                                                    }
                                                                                }                                                    
                                                                            }
                                                                        }    
                                                                    }else if(accent_match == 'N'){
                                                                        var regex_w = RegExp(removeAccents(w), tipo);
                                                                        arr_regex_w.push(regex_w);
                                                                        var regex_w_l = (typeof w != 'undefined') ? RegExp(removeAccents(w).toLowerCase(), tipo) : RegExp(removeAccents(w), tipo);//для сравнения
                                                                        arr_regex_w_l.push(regex_w_l);
                                                                        arr_result_m = removeAccents(VerseText).match(regex_w);
                                                                        count_m = (arr_result_m != null) ? arr_result_m.length : 0 ;
                                                                        if(count_m > 0){
                                                                            //console.log('ok --- regex_w match arr_words. w: '+w);
                                                                            if(typeof arr_w[i+1] != 'undefined'){
                                                                                if(case_sens == ''){//различать маленькие и БОЛЬШИЕ буквы
                                                                                    var index_first_w = removeAccents(VerseText).indexOf(arr_w[i]);//The indexOf() method is case sensitive.
                                                                                    var index_next_w = removeAccents(VerseText).indexOf(arr_w[i+1], index_first_w);
                                                                                    if(index_first_w < index_next_w){
                                                                                        //console.log('removeAccents(VerseText): '+removeAccents(VerseText));
                                                                                        //console.log('caso2a. index_first_w: '+index_first_w);
                                                                                        //console.log('caso2a. index_next_w: '+index_next_w);
                                                                                        let arr_VerseText_a = removeAccents(VerseText).split(' ');
                                                                                        let arr_VerseText_a_ed = [];
                                                                                        for (let a = 0, sovpad = 0; a < arr_VerseText_a.length; a++) {
                                                                                            let el_a = arr_VerseText_a[a];
                                                                                            if(no_part_word == 'Y'){
                                                                                                var regex_aw = RegExp(arr_w[i+sovpad], tipo);
                                                                                                var sovpad_word = (el_a == arr_w[i+sovpad]) ? true : false ;
                                                                                            }else{//no_part_word == 'N'
                                                                                                var regex_aw = RegExp(arr_w[i+sovpad], tipo);
                                                                                                var sovpad_word = (el_a.match(regex_aw)) ? true : false ;
                                                                                            }
                                                                                            //si 'Иисус' es la última palabra de frase buscada 'Христос Иисус'
                                                                                            if(sovpad_word && sovpad < arr_words.length && i+sovpad < arr_words.length){
                                                                                                el_a = removeAccents(el_a).replace(regex_aw, function (x) {
                                                                                                    return '{' + x + '}';
                                                                                                });
                                                                                                sovpad++;
                                                                                                arr_matches_w.push(1);
                                                                                                count_m_total += 1;
                                                                                                arr_result_m_total.push(arr_result_m);
                                                                                            }
                                                                                            if(sovpad == arr_words.length){
                                                                                                sovpad = 0;//reset para buscar otros maches en el mismo verso
                                                                                            }
                                                                                            arr_VerseText_a_ed.push(el_a); 
                                                                                        }
                                                                                        var text_original = VerseText;
                                                                                        var text_marcas = prepararTextMarcas(arr_VerseText_a_ed.join(' '));
                                                                                        VerseText = markRed(text_original, text_marcas);//FUNCIONA
                                                                                        //console.log('VerseText: '+VerseText); 
                                                                                    }else{
                                                                                        arr_matches.push(0);
                                                                                    }
                                                                                }else if(case_sens == 'i'){//все равно какие буквы
                                                                                    //превращаю в мал. буквы только для сравнения.
                                                                                    var index_first_w = removeAccents(VerseText).toLowerCase().indexOf(arr_w[i].toLowerCase());//The indexOf() method is case sensitive.
                                                                                    var index_next_w = removeAccents(VerseText).toLowerCase().indexOf(arr_w[i+1].toLowerCase(), index_first_w);
                                                                                    if(index_first_w < index_next_w){
                                                                                        //console.log('VerseText: '+removeAccents(VerseText));
                                                                                        //console.log('VerseText.toLowerCase(): '+removeAccents(VerseText).toLowerCase());
                                                                                        //console.log('caso2b. index_first_w: '+index_first_w);
                                                                                        //console.log('caso2b. index_next_w: '+index_next_w);
                                                                                        let arr_VerseText_a = removeAccents(VerseText).split(' ');
                                                                                        let arr_VerseText_a_ed = [];
                                                                                        for (let a = 0, sovpad = 0; a < arr_VerseText_a.length; a++) {
                                                                                            let el_a = arr_VerseText_a[a];
                                                                                            if(no_part_word == 'Y'){
                                                                                                //var regex_aw = RegExp(arr_w[i+sovpad].toLowerCase(), tipo);//antes y ok
                                                                                                var regex_aw = (arr_w[i+sovpad] < arr_w.length) ? RegExp(arr_w[i+sovpad].toLowerCase(), tipo) : RegExp(arr_w[arr_w.length-1].toLowerCase(), tipo) ;
                                                                                                if(arr_w[i+sovpad] < arr_w.length){
                                                                                                    var sovpad_word = (el_a.toLowerCase() == arr_w[i+sovpad].toLowerCase()) ? true : false ;
                                                                                                }else{
                                                                                                    var sovpad_word = (el_a.toLowerCase() == arr_w[arr_w.length-1].toLowerCase()) ? true : false ;
                                                                                                }
                                                                                            }else{//no_part_word == 'N'
                                                                                                var regex_aw = (arr_w[i+sovpad] < arr_w.length) ? RegExp(arr_w[i+sovpad].toLowerCase(), tipo) : RegExp(arr_w[arr_w.length-1].toLowerCase(), tipo) ;
                                                                                                var sovpad_word = (el_a.toLowerCase().match(regex_aw)) ? true : false ;
                                                                                            }
                                                                                            //si 'Иисус' es la última palabra de frase buscada 'Христос Иисус'
                                                                                            if(sovpad_word && sovpad < arr_words.length && i+sovpad < arr_words.length){
                                                                                                el_a = el_a.replace(regex_aw, function (x) {
                                                                                                    return '{' + x + '}';
                                                                                                });
                                                                                                sovpad++;
                                                                                                arr_matches_w.push(1);
                                                                                                count_m_total += 1;
                                                                                                arr_result_m_total.push(arr_result_m);
                                                                                            }
                                                                                            if(sovpad == arr_words.length){
                                                                                                sovpad = 0;//reset para buscar otros maches en el mismo verso
                                                                                            }
                                                                                            arr_VerseText_a_ed.push(el_a); 
                                                                                        }
                                                                                        var text_original = VerseText;
                                                                                        var text_marcas = prepararTextMarcas(arr_VerseText_a_ed.join(' '));
                                                                                        VerseText = markRed(text_original, text_marcas);//FUNCIONA
                                                                                        //console.log('VerseText: '+VerseText); 
                                                                                    }else{
                                                                                        arr_matches.push(0);
                                                                                    }
                                                                                }                                                    
                                                                            }
                                                                        }
                                                                    }//end //else if(accent_match == 'N')
                                                                });
                                                                if(!arr_matches.includes(0)){//si todos ocurrencias hay
                                                                    for (let i = 0; i < arr_regex_w.length; i++) {
                                                                        if(typeof arr_regex_w[i+1] != 'undefined' || typeof arr_regex_w_l[i+1] != 'undefined'){
                                                                            if(accent_match == 'Y'){
                                                                                if(case_sens == ''){//различать маленькие и БОЛЬШИЕ буквы
                                                                                    var index_first_w = VerseText.indexOf(arr_words[i]);
                                                                                    var index_next_w = VerseText.indexOf(arr_words[i+1], index_first_w);    
                                                                                }if(case_sens == 'i'){//все равно какие буквы
                                                                                    var index_first_w = VerseText.toLowerCase().indexOf(arr_words[i].toLowerCase());
                                                                                    var index_next_w = VerseText.toLowerCase().indexOf(arr_words[i+1].toLowerCase(), index_first_w);    
                                                                                }
                                                                            }else if(accent_match == 'N'){
                                                                                if(case_sens == ''){//различать маленькие и БОЛЬШИЕ буквы
                                                                                    var index_first_w = removeAccents(VerseText).indexOf(arr_words[i]);
                                                                                    var index_next_w = removeAccents(VerseText).indexOf(arr_words[i+1], index_first_w);    
                                                                                }if(case_sens == 'i'){//все равно какие буквы
                                                                                    var index_first_w = removeAccents(VerseText).toLowerCase().indexOf(arr_words[i].toLowerCase());
                                                                                    var index_next_w = removeAccents(VerseText).toLowerCase().indexOf(arr_words[i+1].toLowerCase(), index_first_w);    
                                                                                }
                                                                            }
                                                                            if(index_first_w < index_next_w && arr_matches_w.includes(1)){
                                                                                //console.log('VerseText: '+VerseText);
                                                                                //console.log('first arr_regex_w['+i+']: '+arr_regex_w[i] + ' --- index_first_regex: '+index_first_regex);
                                                                                //console.log('second arr_regex_w['+(i+1)+']: '+arr_regex_w[i+1]+ ' --- index_next_regex: '+index_next_regex);                                                        
                                                                                is_match = true;
                                                                            }else{
                                                                                is_match = false;
                                                                            }
                                                                        }
                                                                    }                                            
                                                                }else{
                                                                    is_match = false;
                                                                }
                                                            }
                                                            //=======================================================================//
                                                            //end //2. - //cлова идут в заданном порядке //ok
                                                            //=======================================================================//
                                                            
                    
                                                            //=======================================================================//
                                                            //3. - //искать точную фразу  'Иисус Христос' как одно слово //ok
                                                            //=======================================================================//
                                                            if(cbox3.checked){
                                                                var words = arr_words.join(' ');
                                                                VerseText = VerseText.replace(/(\n|\t|\r)/g,'');
                                                                var arr_VerseText_or = VerseText.split(' ').filter(e=>e);
                                                                VerseText = arr_VerseText_or.join(' ');
                                                                if(accent_match == 'Y'){
                                                                    var regex_w = RegExp(words, tipo);
                                                                    arr_result_m = VerseText.match(regex_w);
                                                                    count_m = (arr_result_m != null) ? arr_result_m.length : 0 ;
                                                                    if(count_m > 0){
                                                                        VerseText = VerseText.replace(regex_w, function (x) {
                                                                            return '<b class="f_red">' + x + '</b>';
                                                                        });
                                                                        is_match = true;
                                                                        count_m_total += count_m;
                                                                        arr_result_m_total.push(arr_result_m);
                                                                    }else{
                                                                        is_match = false;
                                                                    } 
                                                                }else if(accent_match == 'N'){
                                                                    var regex_w = RegExp(removeAccents(words), tipo);
                                                                    arr_result_m = removeAccents(VerseText).match(regex_w);
                                                                    count_m = (arr_result_m != null) ? arr_result_m.length : 0 ;
                                                                    if(count_m > 0){
                                                                        var text_marcas = removeAccents(VerseText).replace(regex_w, function (x) {
                                                                            return '{' + x + '}';
                                                                        });
                                                                        var text_original = VerseText;
                                                                        var arr_frases = prepararFrases(text_original,text_marcas);
                                                                        var frase_original = arr_frases[0];
                                                                        var frase_exacta = arr_frases[1];
                                                                        //console.log('frase_original: '+frase_original);
                                                                        //console.log('frase_exacta: '+frase_exacta);
                                                                        text_marcas = prepararTextMarcas(frase_exacta);
                                                                        
                                                                        VerseText = markRed(frase_original, text_marcas);//FUNCIONA
                                                                        //console.log('VerseText: '+VerseText);
                                                                        VerseText = VerseText.replace(/¬/g,' ');//quito lo puesto temporalmente
                                                                        is_match = true;
                                                                        count_m_total += count_m;
                                                                        arr_result_m_total.push(arr_result_m);
                                                                    }else{
                                                                        is_match = false;
                                                                    }
                                                                }
                                                            }
                                                            //=======================================================================//
                                                            //end 3. - //искать точную фразу  'Иисус Христос' как одно слово //ok
                                                            //=======================================================================//
                    
                    
                                                        }//end //if(arr_words.length > 0)
                    
                    
                    
                                                        //Matches
                                                        if(is_match){
                                                            //console.log('VerseText regex1: '+VerseText.match(regex1));
                                                            //console.log('VerseText: '+VerseText);
                    
                                                            const span_num_find = document.createElement('span');
                                                            span_num_find.className = 'sp_f';
                                                            count_f++;
                                                            span_num_find.innerText = count_f;
                    
                                                            var p = document.createElement('p');
                                                            p.id = Translation +'__'+book + '__' + chapter + '__' + VerseId;
                                            
                                                            var a = document.createElement('a');
                                                            a.href = '#';
                                                            a.classList.add = 'blink';
                                                            let aLink = bq.Books[book].ShortNames[0] + ChapterId + ':' + VerseId;
                                                            a.innerHTML = aLink;
                                                            a.setAttribute('onclick',`goToLinkFromFind('${Translation}', '${aLink}')`);//funciona
                                                            
                                                            p.append(span_num_find);
                                                            p.append(a);
                                                            p.append(' '); 
                                    
                                                            const span_vt = document.createElement('span');
                                                            span_vt.className = 'vt';//text de Verse para aplicar HTMLFilter si hay
                                    
                                    
                                                            //Номера Стронга в стихах (RST+)
                                                            if(bq.StrongNumbers == "Y"){
                                                                let t = VerseText;
                                                                var arr_t = t.split(' ');
                                    
                                                                arr_t.forEach((el,i) => {    
                                                                    
                                                                    //element of string is Strong Number
                                                                    if(!isNaN(parseInt(el)) || el == '0'){//number                         
                                                                        const span_strong = document.createElement('span');
                                                                        if(btnStrongIsActive){
                                                                            span_strong.className = 'strong show strongActive'; 
                                                                        }else{
                                                                            span_strong.className = 'strong'; 
                                                                        }
                                                                        let last_char = (el.length > 1) ? el.charAt(el.length-1) : "" ;
                                    
                                                                        //si ultimo carácter es string
                                                                        if(last_char != '' && isNaN(last_char)){
                                                                            let el_number = el.substring(0,el.length-1);
                                                                            let el_string = last_char;
                                                                            span_strong.innerHTML = el_number;
                                                                            p.append(span_strong);
                                                                            p.append(el_string);
                                                                        }else{//es number
                                                                            span_strong.innerHTML = el;
                                                                            p.append(span_strong);
                                                                        }
                                    
                                                                    }else{//is word
                                                                        p.append(' ');
                                                                        if(btnStrongIsActive){
                                                                            if(el.includes('<S>')){
                                                                                el = el.replace('<S>','<S class="show strongActive">');
                                                                            }
                                                                        }
                                                                        p.append(el);
                                                                    }
                                                                });
                                                                p.innerHTML.trim();
                                    
                                                                //console.log('antes: ' + p.innerHTML);
                                                                if(bq.HTMLFilter == 'Y'){
                                                                    p.innerHTML = htmlEntities(p.innerHTML);
                                                                }
                                                                //console.log('despues: '+p.innerHTML);
                                    
                                                                if(btnStrongIsActive && p.innerHTML.includes('strongActive')){
                                                                    p.querySelectorAll('.strongActive').forEach((el)=>{
                                                                        el.addEventListener('click', ()=>{
                                                                            //console.log('2. book: '+book);
                                                                            //console.log('2. el.innerHTML: '+el.innerHTML);
                                                                            if(el.innerHTML.includes('H') || el.innerHTML.includes('G')){//rstStrongRed G3056 /H3056
                                                                                getStrongNumber(el.innerHTML);
                                                                            }else{//rstStrong
                                                                                lang = (book >= 39) ? 'Grk' : 'Heb' ;
                                                                                getStrongNumber(el.innerHTML, lang);
                                                                            }
                                                                        });
                                                                    }); 
                                                                }
                                                            }
                                    
                                                            //Примечания редактора в стихах (RSTi2)
                                                            if(bq.Notes == 'Y'){
                                                                let t = VerseText;
                                    
                                                                if(t.includes(bq.NoteSign)){// '*'
                                                                    let arr_t0 = t.split(bq.NoteSign);
                                                                    let before_Note = arr_t0[0];
                                    
                                                                    if(t.includes(bq.StartNoteSign) && t.includes(bq.EndNoteSign)){
                                                                        let arr_t1 = t.split(bq.StartNoteSign);//'[('
                                                                        let arr_t2 = arr_t1[1].split(bq.EndNoteSign);//')]'
                                                                        let text_Note = arr_t2[0];
                                                                        let after_Note = arr_t2[1];
                                    
                                                                        const span_t = document.createElement('span');
                                                                        span_t.className = 'tooltip';
                                                                        span_t.setAttribute('data-tooltip',text_Note);
                                                                        span_t.innerHTML = bq.NoteSign;
                                    
                                                                        span_t.addEventListener('mouseenter', function(){
                                                                            showTooltip(this);
                                                                        });
                                                                        span_t.addEventListener('mouseleave', function(){
                                                                            hideTooltip(this);
                                                                        });
                                                                                    
                                                                        before_Note = (bq.HTMLFilter == 'Y') ? htmlEntities(before_Note) : before_Note ;
                                                                        span_vt.append(before_Note);
                                                                        span_vt.append(span_t);
                                                                        after_Note = (bq.HTMLFilter == 'Y') ? htmlEntities(after_Note) : after_Note ;
                                                                        span_vt.append(after_Note);
                                    
                                                                        p.append(span_vt);//antes
                                                                        if(bq.HTMLFilter == 'Y'){//aki en find si lo meto
                                                                            p.innerHTML = htmlEntities(p.innerHTML);
                                                                        }
                                                                    }
                                                                }else{
                                                                    //p.append(VerseText);//antes
                                                                    span_vt.append(VerseText);
                                                                    p.append(span_vt);
                                    
                                                                    if(bq.HTMLFilter == 'Y'){
                                                                        p.innerHTML = htmlEntities(p.innerHTML);
                                                                    }
                                                                }
                                                                //SIMULTANEAMENTE CON '*' Y '<' Y '> ' la función htmlEntities() DESHABILITA tooltip.
                                                            }
                                    
                                                            //Оглавления в стихах (NRT)
                                                            if(bq.Titles == 'Y'){
                                                                let t = VerseText;
                                    
                                                                if(t.includes(bq.StartTitleSign) && t.includes(bq.EndTitleSign)){
                                                                    let arr_t1 = t.split(bq.StartTitleSign);//'[('
                                                                    let before_Title = arr_t1[0];
                                                                    let arr_t2 = arr_t1[1].split(bq.EndTitleSign);//')]'
                                                                    let text_Title = arr_t2[0];
                                                                    let after_Title = arr_t2[1];
                                    
                                                                    const span_title = document.createElement('span');
                                                                    span_title.className = 'verse_title';
                                                                    span_title.innerHTML = text_Title;
                                    
                                                                    p.append(before_Title);
                                                                    p.append(span_title);
                                                                    p.append(after_Title);
                                                                }else{
                                                                    p.append(VerseText);
                                                                }
                                    
                                                                if(bq.HTMLFilter == 'Y'){
                                                                    p.innerHTML = htmlEntities(p.innerHTML);
                                                                }
                                                            }
                                    
                                                            //Нет ни Номеров Стронга, ни Примечаний ни Оглавлений
                                                            if(bq.StrongNumbers == "N" && bq.Notes == 'N' && bq.Titles == 'N'){
                                                                //p.append(VerseText);//antes
                                                                span_vt.append(VerseText);
                                                                p.append(span_vt);
                                    
                                                                if(bq.HTMLFilter == 'Y'){
                                                                    p.innerHTML = htmlEntities(p.innerHTML);
                                                                }
                                                            }
                    
                                                            result_finded.push(p);
                                                            
                                                        }      
                                                    });
                                                }
                                            });
                                        
                                        }else{
                                            //console.log(index+') stop doFind. window.doFind: '+window.doFind);
                                        }//end else (window.doFind)
                    
                    
                    
                                        //Formar links para resultados de búsqueda
                                        if(result_finded.length > 0){
                                            
                                            //console.log('2. abajo result_finded:');
                                            //console.log(result_finded);
                    
                                            //console.log('2. abajo arr_result_m_total:');
                                            //console.log(arr_result_m_total);
                                        
                                            if(document.querySelectorAll('.res_f').length > 0){
                                                document.querySelectorAll('.res_f').forEach(el=>{
                                                    // el.remove();//elimino resultado anterior si lo hay
                                                })
                                            }                    
                    
                                            //inserto resultado de búsqueda                        
                                            document.querySelector('.res_f').innerHTML = `"<b class="f_r-ed">${words_input}</b>" <span title="Стихов">(${count_f})</span> <span class="res_m f_r" title="Совпадений">[${count_m_total}]</span>`;
                                            mySizeFind();//altura de div_find_body
                    
                                            var arr_l = [];
                                            var limit_n = limit;
                                            for (let i = 0; i < result_finded.length; i++) {
                                                const el = result_finded[i];
                                                //console.log(el);
                    
                                                if(i > limit_n - 2 || i == result_finded.length - 1){
                                                    arr_l.push(el);
                                                    result_show.push(arr_l); 
                                                    limit_n += limit;
                                                    arr_l = [];
                                                }else{
                                                    arr_l.push(el);
                                                }                            
                                            }
                                            //console.log('result_show');
                                            //console.log(result_show);
                    
                                            window.res_show = result_show;
                                            //console.log('res_show');
                                            //console.log(res_show);
                    
                                            if(result_show != null){
                                                mostrar_res_show(0);//por defecto los primeros 5 
                                            }
                                            result_show = [];
                    
                                            if(index == book_end){
                                                stopFindWords();//показываю кнопку 'Find'
                                            }
                                            
                                        }else{
                                            if(index == book_end && result_finded.length == 0){
                                                mostrar_no_res();
                                                stopFindWords();//показываю кнопку 'Find'
                                            }
                                        }
                                        

                                    })                                
                                    .catch(error => { 
                                        // Código a realizar cuando se rechaza la promesa
                                        console.log('2. error promesa find: '+error);
                                    });

                                }else{
                                    console.log('No coincide el nombre del fichero o fileContent está vacío');
                                }

                            }
                        }
                    }


                    //si no existe objeto con Translation. hago fetch()
                    if(typeof obj_o[Translation].Books[book] == 'undefined'){

                        //url del libro necesario
                        url = `modules/text/${Translation}/${bq.Books[book].PathName}`;//01_genesis.htm;   
                        //console.log('--- url: '+url);
                        fetch(url)
                        .then((response) => response.text())
                        .then((bookModule) => {
                            
                            if(window.doFind){
                                //console.log(index+') hago doFind. window.doFind: '+window.doFind);
                                //console.log('Bible book: '+bq.Books[book].FullName);
            
                                //console.log(bookModule);
                                //показываю в каких книгах ищу
                                document.querySelector(".f_book").innerHTML = bq.Books[book].FullName;
        
                                var nb = bookModule.split('<h4>');//делю файл на главы
                                //console.log(nb);
                                
                                nb = nb.filter(elm => elm);//удаляю пустые елементы массива
                                //console.log(nb);
        
                                var arr_chapters = nb;
                                //arr_chapters.shift();//elimino index0 ('<h2></h2>\n')
        
                                arr_chapters.forEach( (el_ch, i_ch) => {
                                    //console.log(el_ch);
                                    let chapter = i_ch;
                                    let ChapterId = i_ch;
                                    
                                    if(el_ch.includes('<p>')){
                                        var arr_verses = el_ch.split('<p>');
                                        //console.log(arr_verses);
                                        
                                        //Recorrer todos los verses
                                        arr_verses.forEach((el,i) => {
        
                                            if(el.includes('</p>')){
                                                var arr_p_text = el.split('</p>');
                                                var p_Text = arr_p_text[0];
                                            }else{
                                                var p_Text = el;
                                            }
                                            //console.log('p_Text: '+p_Text); 
        
                                            var arr_p = p_Text.split(' ');
                                            var VerseId = arr_p[0];
                                            //console.log('VerseId: '+VerseId);
        
                                            var VerseText = '';
                                            for(let index = 1; index < arr_p.length; index++){
                                                VerseText += arr_p[index] + ' ';
                                                //console.log('arr_p['+index+']: '+arr_p[index]);
                                            }
                                            //console.log('VerseText: '+VerseText);
                                            
                                            if(VerseText != ''){
                                                //VerseText = removeTags(VerseText);
                                                //console.log('sin tags --- VerseText: '+VerseText);
                                            }
        
        
                                            //Si hay palabras para buscar...
                                            if(arr_words.length > 0){
                                                
                                                //tipos de busqueda
                                                var is_match = false;
        
        
                                                //=======================================================================//  
                                                //0. por defecto - nada marcado //ok
                                                //=======================================================================//  
                                                if(!cbox1.checked && !cbox2.checked && !cbox3.checked){
                                                    let arr_matches = [];  
                                                    //1. проверяю есть ли каждое слово из фразы в стихе                                      
                                                    arr_words.forEach(w => {
                                                        if(accent_match == 'Y'){//cbox6
                                                            if(no_part_word == 'Y'){//cbox4
                                                                var arr_no_part_word = [];
                                                                w = "^" +w +"$";//entera palabra del array, no parte
                                                                var regex_w = RegExp(w, tipo);
                                                                VerseText.split(' ').filter(elm=>elm).forEach(el=> {
                                                                    if(removeSymbols(el).match(regex_w)){
                                                                        //console.log('removeSymbols(el) ('+removeSymbols(el)+') match regex_w: '+true);
                                                                        arr_no_part_word.push(1);
                                                                    }else{
                                                                        //console.log('--- el ('+el+') NO match regex_w: '+false);
                                                                        arr_no_part_word.push(0);
                                                                    } 
                                                                });
                                                                if(arr_no_part_word.includes(1)){
                                                                    arr_matches.push(1);
                                                                }else{
                                                                    arr_matches.push(0);
                                                                }
                                                            }else if(no_part_word == 'N'){
                                                                var regex_w = RegExp(w, tipo);
                                                                arr_result_m = VerseText.match(regex_w);
                                                                count_m = (arr_result_m != null) ? arr_result_m.length : 0 ;
                                                                if(count_m > 0){
                                                                    arr_matches.push(1);
                                                                }else{
                                                                    arr_matches.push(0);
                                                                }
                                                            }
                                                        }else if(accent_match == 'N'){
                                                            if(no_part_word == 'Y'){
                                                                var arr_no_part_word = [];
                                                                w = "^" +w +"$";//entera palabra del array, no parte
                                                                var regex_w = RegExp(removeAccents(w), tipo);
                                                                removeAccents(VerseText).split(' ').filter(elm=>elm).forEach(el=> {
                                                                    if(removeSymbols(el).match(regex_w)){
                                                                        //console.log('removeSymbols(el) ('+removeSymbols(el)+') match regex_w: '+true);
                                                                        arr_no_part_word.push(1);
                                                                    }else{
                                                                        //console.log('--- removeSymbols(el) ('+removeSymbols(el)+') NO match regex_w: '+false);
                                                                        arr_no_part_word.push(0);
                                                                    } 
                                                                });
                                                                if(arr_no_part_word.includes(1)){
                                                                    arr_matches.push(1);
                                                                }else{
                                                                    arr_matches.push(0);
                                                                }
                                                            }else if(no_part_word == 'N'){
                                                                var regex_w = RegExp(removeAccents(w), tipo); 
                                                                arr_result_m = removeAccents(VerseText).match(regex_w);
                                                                count_m = (arr_result_m != null) ? arr_result_m.length : 0 ;
                                                                if(count_m > 0){
                                                                    arr_matches.push(1);
                                                                }else{
                                                                    arr_matches.push(0);
                                                                }
                                                            }
                                                        }
                                                    });
                                                    //console.log('Word. w: ', w);
                                                    //console.log('VerseText: ', VerseText);
                                                    if(!arr_matches.includes(0)){//когда все слова из фразы есть в стихе
                                                        //2. в цикле отмечаю красным все совпадения, но уже не нужно arr_matches.push()
                                                        arr_words.forEach(w => {
                                                            if(accent_match == 'Y'){//cbox6
                                                                if(no_part_word == 'Y'){//cbox4
                                                                    var arr_VerseText_red = [];
                                                                    var regex_w = RegExp(w, tipo);                                                       
                                                                    VerseText.split(' ').filter(elm=>elm).forEach(el=> {
                                                                        if(removeSymbols(el).match(regex_w)){
                                                                            //console.log('removeSymbols(el) ('+removeSymbols(el)+') match regex_w: '+true);
                                                                            el = el.replace(regex_w, function (x) {
                                                                                return '<b class="f_red">' + x + '</b>';
                                                                            });
                                                                            arr_VerseText_red.push(el);
                                                                        }else{
                                                                            //console.log('--- el ('+el+') NO match regex_w: '+false);
                                                                            arr_VerseText_red.push(el);
                                                                        } 
                                                                    });
                                                                    VerseText = arr_VerseText_red.join(' ');
                                                                    //console.log('VerseText: ', VerseText);
                                                                }else if(no_part_word == 'N'){
                                                                    var regex_w = RegExp(w, tipo);
                                                                    arr_result_m = VerseText.match(regex_w);
                                                                    count_m = (arr_result_m != null) ? arr_result_m.length : 0 ;
                                                                    if(count_m > 0){
                                                                        VerseText = VerseText.replace(regex_w, function (x) {
                                                                            return '<b class="f_red">' + x + '</b>';
                                                                        });
                                                                    }
                                                                }
                                                            }else if(accent_match == 'N'){
                                                                var regex_w = RegExp(removeAccents(w), tipo); 
                                                                arr_result_m = removeAccents(VerseText).match(regex_w);
                                                                count_m = (arr_result_m != null) ? arr_result_m.length : 0 ;
                                                                if(count_m > 0){
                                                                    var text_marcas = removeAccents(VerseText).replace(regex_w, function (x) {
                                                                        return '{' + x + '}';
                                                                    });
                                                                    var text_original = VerseText;
                                                                    var text_marcas = prepararTextMarcas(text_marcas);
                                                                    VerseText = markRed(text_original, text_marcas);
                                                                }
                                                            }
                                                        });
                                                        is_match = true;
                                                        count_m_total += count_m;
                                                        arr_result_m_total.push(arr_result_m);
                                                        //console.log('count_m_total: ', count_m_total);
                                                        //console.log('arr_result_m_total: ', arr_result_m_total);
                                                        //console.log('VerseText: ', VerseText);
        
                                                    }else{
                                                        is_match = false;
                                                    }
                                                }
                                                //=======================================================================//  
                                                //end //0. por defecto - nada marcado //ok                                 
                                                //=======================================================================//                                    
                                                
        
                                                //=======================================================================//                                    
                                                //1. - искомое содержит хотя бы одно слово ('Иисус Христос' или 'Иисус' или 'Христос') //ok
                                                //=======================================================================//
                                                if(cbox1.checked){
                                                    let arr_matches = [];
                                                    if(no_part_word == 'Y'){
                                                        arr_words.forEach(w => {
                                                            if(no_part_word == 'Y'){
                                                                // w = "\\b" +w +"\\b";//palabras enteras// exacta coincidencia
                                                                w = "\\B" +w +"\\B";//marcar si 'w' está rodeada por otras letras dentro de 'aawaa'.//true
                                                            }
                                                            if(accent_match == 'Y'){
                                                                var regex_w = RegExp(w, tipo); 
                                                                arr_result_m = VerseText.match(regex_w);
                                                                count_m = (arr_result_m != null) ? arr_result_m.length : 0 ;
                                                                if(count_m > 0){
                                                                    arr_matches.push(1);
                                                                    VerseText = VerseText.replace(regex_w, function (x) {
                                                                        return '<b class="f_red">' + x + '</b>';
                                                                    });
                                                                    count_m_total += count_m;
                                                                    arr_result_m_total.push(arr_result_m);
                                                                }else{
                                                                    arr_matches.push(0);
                                                                }
                                                            }else if(accent_match == 'N'){
                                                                var regex_w = RegExp(removeAccents(w), tipo); 
                                                                arr_result_m = removeAccents(VerseText).match(regex_w);;
                                                                count_m = (arr_result_m != null) ? arr_result_m.length : 0 ;
                                                                if(count_m > 0){
                                                                    arr_matches.push(1);
                                                                    var text_marcas = removeAccents(VerseText).replace(regex_w, function (x) {
                                                                        return '{' + x + '}';
                                                                    });
                                                                    var text_original = VerseText;
                                                                    var text_marcas = prepararTextMarcas(text_marcas);
                                                                    VerseText = markRed(text_original, text_marcas);
                                                                    count_m_total += count_m;
                                                                    arr_result_m_total.push(arr_result_m);
                                                                }else{
                                                                    arr_matches.push(0);
                                                                }
                                                            }
                                                        });
                                                        if(arr_matches.includes(1)){//si por lo menos hay 1 match
                                                            is_match = true;
                                                        }else{
                                                            is_match = false;
                                                        }
                                                    }else if(no_part_word == 'N'){
                                                        if(accent_match == 'Y'){
                                                            words = arr_words.join('|');
                                                            var regex1 = RegExp(words, tipo);//buscar todo
                                                            arr_result_m = VerseText.match(regex1);
                                                            count_m = (arr_result_m != null) ? arr_result_m.length : 0 ;
                                                            if(count_m > 0){
                                                                is_match = true;
                                                                count_m_total += count_m;
                                                                arr_result_m_total.push(arr_result_m);
                                                                VerseText = VerseText.replace(regex1, function (x) {
                                                                    return '<b class="f_red">' + x + '</b>';
                                                                });
                                                            }else{
                                                                is_match = false;
                                                            } 
                                                        }else if(accent_match == 'N'){
                                                            words = arr_words.join('|');
                                                            var regex_w = RegExp(removeAccents(words), tipo); 
                                                            arr_result_m = removeAccents(VerseText).match(regex_w);
                                                            count_m = (arr_result_m != null) ? arr_result_m.length : 0 ;
                                                            if(count_m > 0){
                                                                arr_matches.push(1);
                                                                var text_marcas = removeAccents(VerseText).replace(regex_w, function (x) {
                                                                    return '{' + x + '}';
                                                                });
                                                                var text_original = VerseText;
                                                                text_marcas = prepararTextMarcas(text_marcas);
                                                                VerseText = markRed(text_original, text_marcas);
                                                                //console.log('VerseText: '+VerseText);
                                                            }else{
                                                                arr_matches.push(0);
                                                            }
                                                            if(arr_matches.includes(1)){//si por lo menos hay 1 match
                                                                is_match = true;
                                                                count_m_total += count_m;
                                                                arr_result_m_total.push(arr_result_m);
                                                            }else{
                                                                is_match = false;
                                                            }
                                                        }
                                                    }
                                                }
                                                //=======================================================================//
                                                //end //1. - искомое содержит хотя бы одно слово ('Иисус Христос' или 'Иисус' или 'Христос') //ok
                                                //=======================================================================//
        
        
                                                //=======================================================================//
                                                //2. - //cлова идут в заданном порядке //ok
                                                //=======================================================================//
                                                if(cbox2.checked){
                                                    //console.log('//tipo búsqueda --- //2. - //cлова идут в заданном порядке');
                                                    let arr_matches = [];
                                                    let arr_matches_w = [];//matches en words
                                                    let arr_regex_w = [];
                                                    let arr_regex_w_l = [];//для сравнения
                                                    arr_words.forEach( (w,i,arr_w) => {
                                                        if(accent_match == 'Y'){
                                                            var regex_w = RegExp(w, tipo);
                                                            arr_regex_w.push(regex_w);
                                                            var regex_w_l = (typeof w != 'undefined') ? RegExp(w.toLowerCase(), tipo) : RegExp(w, tipo);//для сравнения
                                                            arr_regex_w_l.push(regex_w_l);
                                                            arr_result_m = VerseText.match(regex_w);
                                                            count_m = (arr_result_m != null) ? arr_result_m.length : 0 ;
                                                            if(count_m > 0){
                                                                //console.log('ok --- regex_w match arr_words. w: '+w);
                                                                if(typeof arr_w[i+1] != 'undefined'){
                                                                    if(case_sens == ''){//различать маленькие и БОЛЬШИЕ буквы
                                                                        var index_first_w = VerseText.indexOf(arr_w[i]);//The indexOf() method is case sensitive.
                                                                        var index_next_w = VerseText.indexOf(arr_w[i+1], index_first_w);
                                                                        if(index_first_w < index_next_w){
                                                                            //console.log('VerseText: '+VerseText);
                                                                            //console.log('caso2a. index_first_w: '+index_first_w);
                                                                            //console.log('caso2a. index_next_w: '+index_next_w);
                                                                            let arr_VerseText_a = VerseText.split(' ');
                                                                            let arr_VerseText_a_ed = [];
                                                                            for (let a = 0, sovpad = 0; a < arr_VerseText_a.length; a++) {
                                                                                let el_a = arr_VerseText_a[a];
                                                                                if(no_part_word == 'Y'){
                                                                                    var regex_aw = RegExp(arr_w[i+sovpad], tipo);
                                                                                    var sovpad_word = (el_a == arr_w[i+sovpad]) ? true : false ;
                                                                                }else{//no_part_word == 'N'
                                                                                    var regex_aw = RegExp(arr_w[i+sovpad], tipo);
                                                                                    var sovpad_word = (el_a.match(regex_aw)) ? true : false ;
                                                                                }
                                                                                //si 'Иисус' es la última palabra de frase buscada 'Христос Иисус'
                                                                                if(sovpad_word && sovpad < arr_words.length && i+sovpad < arr_words.length){
                                                                                    el_a = el_a.replace(regex_aw, function (x) {
                                                                                        return '<b class="f_red">' + x + '</b>';
                                                                                    });
                                                                                    sovpad++;
                                                                                    arr_matches_w.push(1);
                                                                                    count_m_total += 1;
                                                                                    arr_result_m_total.push(arr_result_m);
                                                                                }
                                                                                if(sovpad == arr_words.length){
                                                                                    sovpad = 0;//reset para buscar otros maches en el mismo verso
                                                                                }
                                                                                arr_VerseText_a_ed.push(el_a); 
                                                                            }
                                                                            VerseText = arr_VerseText_a_ed.join(' ');
                                                                            //console.log(VerseText);
                                                                        }else{
                                                                            arr_matches.push(0);
                                                                        }
                                                                    }else if(case_sens == 'i'){//все равно какие буквы
                                                                        //превращаю в мал. буквы только для сравнения.
                                                                        var index_first_w = VerseText.toLowerCase().indexOf(arr_w[i].toLowerCase());//The indexOf() method is case sensitive.
                                                                        var index_next_w = VerseText.toLowerCase().indexOf(arr_w[i+1].toLowerCase(), index_first_w);
                                                                        if(index_first_w < index_next_w){
                                                                            //console.log('VerseText: '+VerseText);
                                                                            //console.log('VerseText.toLowerCase(): '+VerseText.toLowerCase());
                                                                            //console.log('caso2b. index_first_w: '+index_first_w);
                                                                            //console.log('caso2b. index_next_w: '+index_next_w);
                                                                            let arr_VerseText_a = VerseText.split(' ');
                                                                            let arr_VerseText_a_ed = [];
                                                                            for (let a = 0, sovpad = 0; a < arr_VerseText_a.length; a++) {
                                                                                let el_a = arr_VerseText_a[a];
                                                                                if(no_part_word == 'Y'){
                                                                                    var regex_aw = RegExp(arr_w[i+sovpad].toLowerCase(), tipo);
                                                                                    var sovpad_word = (el_a.toLowerCase() == arr_w[i+sovpad].toLowerCase()) ? true : false ;
                                                                                }else{//no_part_word == 'N'
                                                                                    var regex_aw = RegExp(arr_w[i+sovpad].toLowerCase(), tipo);
                                                                                    var sovpad_word = (el_a.toLowerCase().match(regex_aw)) ? true : false ;
                                                                                }
                                                                                //si 'Иисус' es la última palabra de frase buscada 'Христос Иисус'
                                                                                if(sovpad_word && sovpad < arr_words.length && i+sovpad < arr_words.length){
                                                                                    el_a = el_a.replace(regex_aw, function (x) {
                                                                                        return '<b class="f_red">' + x + '</b>';
                                                                                    });
                                                                                    sovpad++;
                                                                                    arr_matches_w.push(1);
                                                                                    count_m_total += 1;
                                                                                    arr_result_m_total.push(arr_result_m);
                                                                                }
                                                                                if(sovpad == arr_words.length){
                                                                                    sovpad = 0;//reset para buscar otros maches en el mismo verso
                                                                                }
                                                                                arr_VerseText_a_ed.push(el_a); 
                                                                            }
                                                                            VerseText = arr_VerseText_a_ed.join(' ');
                                                                            //console.log(VerseText);
                                                                        }else{
                                                                            arr_matches.push(0);
                                                                        }
                                                                    }                                                    
                                                                }
                                                            }    
                                                        }else if(accent_match == 'N'){
                                                            var regex_w = RegExp(removeAccents(w), tipo);
                                                            arr_regex_w.push(regex_w);
                                                            var regex_w_l = (typeof w != 'undefined') ? RegExp(removeAccents(w).toLowerCase(), tipo) : RegExp(removeAccents(w), tipo);//для сравнения
                                                            arr_regex_w_l.push(regex_w_l);
                                                            arr_result_m = removeAccents(VerseText).match(regex_w);
                                                            count_m = (arr_result_m != null) ? arr_result_m.length : 0 ;
                                                            if(count_m > 0){
                                                                //console.log('ok --- regex_w match arr_words. w: '+w);
                                                                if(typeof arr_w[i+1] != 'undefined'){
                                                                    if(case_sens == ''){//различать маленькие и БОЛЬШИЕ буквы
                                                                        var index_first_w = removeAccents(VerseText).indexOf(arr_w[i]);//The indexOf() method is case sensitive.
                                                                        var index_next_w = removeAccents(VerseText).indexOf(arr_w[i+1], index_first_w);
                                                                        if(index_first_w < index_next_w){
                                                                            //console.log('removeAccents(VerseText): '+removeAccents(VerseText));
                                                                            //console.log('caso2a. index_first_w: '+index_first_w);
                                                                            //console.log('caso2a. index_next_w: '+index_next_w);
                                                                            let arr_VerseText_a = removeAccents(VerseText).split(' ');
                                                                            let arr_VerseText_a_ed = [];
                                                                            for (let a = 0, sovpad = 0; a < arr_VerseText_a.length; a++) {
                                                                                let el_a = arr_VerseText_a[a];
                                                                                if(no_part_word == 'Y'){
                                                                                    var regex_aw = RegExp(arr_w[i+sovpad], tipo);
                                                                                    var sovpad_word = (el_a == arr_w[i+sovpad]) ? true : false ;
                                                                                }else{//no_part_word == 'N'
                                                                                    var regex_aw = RegExp(arr_w[i+sovpad], tipo);
                                                                                    var sovpad_word = (el_a.match(regex_aw)) ? true : false ;
                                                                                }
                                                                                //si 'Иисус' es la última palabra de frase buscada 'Христос Иисус'
                                                                                if(sovpad_word && sovpad < arr_words.length && i+sovpad < arr_words.length){
                                                                                    el_a = removeAccents(el_a).replace(regex_aw, function (x) {
                                                                                        return '{' + x + '}';
                                                                                    });
                                                                                    sovpad++;
                                                                                    arr_matches_w.push(1);
                                                                                    count_m_total += 1;
                                                                                    arr_result_m_total.push(arr_result_m);
                                                                                }
                                                                                if(sovpad == arr_words.length){
                                                                                    sovpad = 0;//reset para buscar otros maches en el mismo verso
                                                                                }
                                                                                arr_VerseText_a_ed.push(el_a); 
                                                                            }
                                                                            var text_original = VerseText;
                                                                            var text_marcas = prepararTextMarcas(arr_VerseText_a_ed.join(' '));
                                                                            VerseText = markRed(text_original, text_marcas);//FUNCIONA
                                                                            //console.log('VerseText: '+VerseText); 
                                                                        }else{
                                                                            arr_matches.push(0);
                                                                        }
                                                                    }else if(case_sens == 'i'){//все равно какие буквы
                                                                        //превращаю в мал. буквы только для сравнения.
                                                                        var index_first_w = removeAccents(VerseText).toLowerCase().indexOf(arr_w[i].toLowerCase());//The indexOf() method is case sensitive.
                                                                        var index_next_w = removeAccents(VerseText).toLowerCase().indexOf(arr_w[i+1].toLowerCase(), index_first_w);
                                                                        if(index_first_w < index_next_w){
                                                                            //console.log('VerseText: '+removeAccents(VerseText));
                                                                            //console.log('VerseText.toLowerCase(): '+removeAccents(VerseText).toLowerCase());
                                                                            //console.log('caso2b. index_first_w: '+index_first_w);
                                                                            //console.log('caso2b. index_next_w: '+index_next_w);
                                                                            let arr_VerseText_a = removeAccents(VerseText).split(' ');
                                                                            let arr_VerseText_a_ed = [];
                                                                            for (let a = 0, sovpad = 0; a < arr_VerseText_a.length; a++) {
                                                                                let el_a = arr_VerseText_a[a];
                                                                                if(no_part_word == 'Y'){
                                                                                    //var regex_aw = RegExp(arr_w[i+sovpad].toLowerCase(), tipo);//antes y ok
                                                                                    var regex_aw = (arr_w[i+sovpad] < arr_w.length) ? RegExp(arr_w[i+sovpad].toLowerCase(), tipo) : RegExp(arr_w[arr_w.length-1].toLowerCase(), tipo) ;
                                                                                    if(arr_w[i+sovpad] < arr_w.length){
                                                                                        var sovpad_word = (el_a.toLowerCase() == arr_w[i+sovpad].toLowerCase()) ? true : false ;
                                                                                    }else{
                                                                                        var sovpad_word = (el_a.toLowerCase() == arr_w[arr_w.length-1].toLowerCase()) ? true : false ;
                                                                                    }
                                                                                }else{//no_part_word == 'N'
                                                                                    var regex_aw = (arr_w[i+sovpad] < arr_w.length) ? RegExp(arr_w[i+sovpad].toLowerCase(), tipo) : RegExp(arr_w[arr_w.length-1].toLowerCase(), tipo) ;
                                                                                    var sovpad_word = (el_a.toLowerCase().match(regex_aw)) ? true : false ;
                                                                                }
                                                                                //si 'Иисус' es la última palabra de frase buscada 'Христос Иисус'
                                                                                if(sovpad_word && sovpad < arr_words.length && i+sovpad < arr_words.length){
                                                                                    el_a = el_a.replace(regex_aw, function (x) {
                                                                                        return '{' + x + '}';
                                                                                    });
                                                                                    sovpad++;
                                                                                    arr_matches_w.push(1);
                                                                                    count_m_total += 1;
                                                                                    arr_result_m_total.push(arr_result_m);
                                                                                }
                                                                                if(sovpad == arr_words.length){
                                                                                    sovpad = 0;//reset para buscar otros maches en el mismo verso
                                                                                }
                                                                                arr_VerseText_a_ed.push(el_a); 
                                                                            }
                                                                            var text_original = VerseText;
                                                                            var text_marcas = prepararTextMarcas(arr_VerseText_a_ed.join(' '));
                                                                            VerseText = markRed(text_original, text_marcas);//FUNCIONA
                                                                            //console.log('VerseText: '+VerseText); 
                                                                        }else{
                                                                            arr_matches.push(0);
                                                                        }
                                                                    }                                                    
                                                                }
                                                            }
                                                        }//end //else if(accent_match == 'N')
                                                    });
                                                    if(!arr_matches.includes(0)){//si todos ocurrencias hay
                                                        for (let i = 0; i < arr_regex_w.length; i++) {
                                                            if(typeof arr_regex_w[i+1] != 'undefined' || typeof arr_regex_w_l[i+1] != 'undefined'){
                                                                if(accent_match == 'Y'){
                                                                    if(case_sens == ''){//различать маленькие и БОЛЬШИЕ буквы
                                                                        var index_first_w = VerseText.indexOf(arr_words[i]);
                                                                        var index_next_w = VerseText.indexOf(arr_words[i+1], index_first_w);    
                                                                    }if(case_sens == 'i'){//все равно какие буквы
                                                                        var index_first_w = VerseText.toLowerCase().indexOf(arr_words[i].toLowerCase());
                                                                        var index_next_w = VerseText.toLowerCase().indexOf(arr_words[i+1].toLowerCase(), index_first_w);    
                                                                    }
                                                                }else if(accent_match == 'N'){
                                                                    if(case_sens == ''){//различать маленькие и БОЛЬШИЕ буквы
                                                                        var index_first_w = removeAccents(VerseText).indexOf(arr_words[i]);
                                                                        var index_next_w = removeAccents(VerseText).indexOf(arr_words[i+1], index_first_w);    
                                                                    }if(case_sens == 'i'){//все равно какие буквы
                                                                        var index_first_w = removeAccents(VerseText).toLowerCase().indexOf(arr_words[i].toLowerCase());
                                                                        var index_next_w = removeAccents(VerseText).toLowerCase().indexOf(arr_words[i+1].toLowerCase(), index_first_w);    
                                                                    }
                                                                }
                                                                if(index_first_w < index_next_w && arr_matches_w.includes(1)){
                                                                    //console.log('VerseText: '+VerseText);
                                                                    //console.log('first arr_regex_w['+i+']: '+arr_regex_w[i] + ' --- index_first_regex: '+index_first_regex);
                                                                    //console.log('second arr_regex_w['+(i+1)+']: '+arr_regex_w[i+1]+ ' --- index_next_regex: '+index_next_regex);                                                        
                                                                    is_match = true;
                                                                }else{
                                                                    is_match = false;
                                                                }
                                                            }
                                                        }                                            
                                                    }else{
                                                        is_match = false;
                                                    }
                                                }
                                                //=======================================================================//
                                                //end //2. - //cлова идут в заданном порядке //ok
                                                //=======================================================================//
                                                
        
                                                //=======================================================================//
                                                //3. - //искать точную фразу  'Иисус Христос' как одно слово //ok
                                                //=======================================================================//
                                                if(cbox3.checked){
                                                    var words = arr_words.join(' ');
                                                    VerseText = VerseText.replace(/(\n|\t|\r)/g,'');
                                                    var arr_VerseText_or = VerseText.split(' ').filter(e=>e);
                                                    VerseText = arr_VerseText_or.join(' ');
                                                    if(accent_match == 'Y'){
                                                        var regex_w = RegExp(words, tipo);
                                                        arr_result_m = VerseText.match(regex_w);
                                                        count_m = (arr_result_m != null) ? arr_result_m.length : 0 ;
                                                        if(count_m > 0){
                                                            VerseText = VerseText.replace(regex_w, function (x) {
                                                                return '<b class="f_red">' + x + '</b>';
                                                            });
                                                            is_match = true;
                                                            count_m_total += count_m;
                                                            arr_result_m_total.push(arr_result_m);
                                                        }else{
                                                            is_match = false;
                                                        } 
                                                    }else if(accent_match == 'N'){
                                                        var regex_w = RegExp(removeAccents(words), tipo);
                                                        arr_result_m = removeAccents(VerseText).match(regex_w);
                                                        count_m = (arr_result_m != null) ? arr_result_m.length : 0 ;
                                                        if(count_m > 0){
                                                            var text_marcas = removeAccents(VerseText).replace(regex_w, function (x) {
                                                                return '{' + x + '}';
                                                            });
                                                            var text_original = VerseText;
                                                            var arr_frases = prepararFrases(text_original,text_marcas);
                                                            var frase_original = arr_frases[0];
                                                            var frase_exacta = arr_frases[1];
                                                            //console.log('frase_original: '+frase_original);
                                                            //console.log('frase_exacta: '+frase_exacta);
                                                            text_marcas = prepararTextMarcas(frase_exacta);
                                                            
                                                            VerseText = markRed(frase_original, text_marcas);//FUNCIONA
                                                            //console.log('VerseText: '+VerseText);
                                                            VerseText = VerseText.replace(/¬/g,' ');//quito lo puesto temporalmente
                                                            is_match = true;
                                                            count_m_total += count_m;
                                                            arr_result_m_total.push(arr_result_m);
                                                        }else{
                                                            is_match = false;
                                                        }
                                                    }
                                                }
                                                //=======================================================================//
                                                //end 3. - //искать точную фразу  'Иисус Христос' как одно слово //ok
                                                //=======================================================================//
        
        
                                            }//end //if(arr_words.length > 0)
        
        
        
                                            //Matches
                                            if(is_match){
                                                //console.log('VerseText regex1: '+VerseText.match(regex1));
                                                //console.log('VerseText: '+VerseText);
        
                                                const span_num_find = document.createElement('span');
                                                span_num_find.className = 'sp_f';
                                                count_f++;
                                                span_num_find.innerText = count_f;
        
                                                var p = document.createElement('p');
                                                p.id = Translation +'__'+book + '__' + chapter + '__' + VerseId;
                                
                                                var a = document.createElement('a');
                                                a.href = '#';
                                                a.classList.add = 'blink';
                                                let aLink = bq.Books[book].ShortNames[0] + ChapterId + ':' + VerseId;
                                                a.innerHTML = aLink;
                                                a.setAttribute('onclick',`goToLinkFromFind('${Translation}', '${aLink}')`);//funciona
                                                
                                                p.append(span_num_find);
                                                p.append(a);
                                                p.append(' '); 
                        
                                                const span_vt = document.createElement('span');
                                                span_vt.className = 'vt';//text de Verse para aplicar HTMLFilter si hay
                        
                        
                                                //Номера Стронга в стихах (RST+)
                                                if(bq.StrongNumbers == "Y"){
                                                    let t = VerseText;
                                                    var arr_t = t.split(' ');
                        
                                                    arr_t.forEach((el,i) => {    
                                                        
                                                        //element of string is Strong Number
                                                        if(!isNaN(parseInt(el)) || el == '0'){//number                         
                                                            const span_strong = document.createElement('span');
                                                            if(btnStrongIsActive){
                                                                span_strong.className = 'strong show strongActive'; 
                                                            }else{
                                                                span_strong.className = 'strong'; 
                                                            }
                                                            let last_char = (el.length > 1) ? el.charAt(el.length-1) : "" ;
                        
                                                            //si ultimo carácter es string
                                                            if(last_char != '' && isNaN(last_char)){
                                                                let el_number = el.substring(0,el.length-1);
                                                                let el_string = last_char;
                                                                span_strong.innerHTML = el_number;
                                                                p.append(span_strong);
                                                                p.append(el_string);
                                                            }else{//es number
                                                                span_strong.innerHTML = el;
                                                                p.append(span_strong);
                                                            }
                        
                                                        }else{//is word
                                                            p.append(' ');
                                                            if(btnStrongIsActive){
                                                                if(el.includes('<S>')){
                                                                    el = el.replace('<S>','<S class="show strongActive">');
                                                                }
                                                            }
                                                            p.append(el);
                                                        }
                                                    });
                                                    p.innerHTML.trim();
                        
                                                    //console.log('antes: ' + p.innerHTML);
                                                    if(bq.HTMLFilter == 'Y'){
                                                        p.innerHTML = htmlEntities(p.innerHTML);
                                                    }
                                                    //console.log('despues: '+p.innerHTML);
                        
                                                    if(btnStrongIsActive && p.innerHTML.includes('strongActive')){
                                                        p.querySelectorAll('.strongActive').forEach((el)=>{
                                                            el.addEventListener('click', ()=>{
                                                                //console.log('2. book: '+book);
                                                                //console.log('2. el.innerHTML: '+el.innerHTML);
                                                                if(el.innerHTML.includes('H') || el.innerHTML.includes('G')){//rstStrongRed G3056 /H3056
                                                                    getStrongNumber(el.innerHTML);
                                                                }else{//rstStrong
                                                                    lang = (book >= 39) ? 'Grk' : 'Heb' ;
                                                                    getStrongNumber(el.innerHTML, lang);
                                                                }
                                                            });
                                                        }); 
                                                    }
                                                }
                        
                                                //Примечания редактора в стихах (RSTi2)
                                                if(bq.Notes == 'Y'){
                                                    let t = VerseText;
                        
                                                    if(t.includes(bq.NoteSign)){// '*'
                                                        let arr_t0 = t.split(bq.NoteSign);
                                                        let before_Note = arr_t0[0];
                        
                                                        if(t.includes(bq.StartNoteSign) && t.includes(bq.EndNoteSign)){
                                                            let arr_t1 = t.split(bq.StartNoteSign);//'[('
                                                            let arr_t2 = arr_t1[1].split(bq.EndNoteSign);//')]'
                                                            let text_Note = arr_t2[0];
                                                            let after_Note = arr_t2[1];
                        
                                                            const span_t = document.createElement('span');
                                                            span_t.className = 'tooltip';
                                                            span_t.setAttribute('data-tooltip',text_Note);
                                                            span_t.innerHTML = bq.NoteSign;
                        
                                                            span_t.addEventListener('mouseenter', function(){
                                                                showTooltip(this);
                                                            });
                                                            span_t.addEventListener('mouseleave', function(){
                                                                hideTooltip(this);
                                                            });
                                                                        
                                                            before_Note = (bq.HTMLFilter == 'Y') ? htmlEntities(before_Note) : before_Note ;
                                                            span_vt.append(before_Note);
                                                            span_vt.append(span_t);
                                                            after_Note = (bq.HTMLFilter == 'Y') ? htmlEntities(after_Note) : after_Note ;
                                                            span_vt.append(after_Note);
                        
                                                            p.append(span_vt);//antes
                                                            if(bq.HTMLFilter == 'Y'){//aki en find si lo meto
                                                                p.innerHTML = htmlEntities(p.innerHTML);
                                                            }
                                                        }
                                                    }else{
                                                        //p.append(VerseText);//antes
                                                        span_vt.append(VerseText);
                                                        p.append(span_vt);
                        
                                                        if(bq.HTMLFilter == 'Y'){
                                                            p.innerHTML = htmlEntities(p.innerHTML);
                                                        }
                                                    }
                                                    //SIMULTANEAMENTE CON '*' Y '<' Y '> ' la función htmlEntities() DESHABILITA tooltip.
                                                }
                        
                                                //Оглавления в стихах (NRT)
                                                if(bq.Titles == 'Y'){
                                                    let t = VerseText;
                        
                                                    if(t.includes(bq.StartTitleSign) && t.includes(bq.EndTitleSign)){
                                                        let arr_t1 = t.split(bq.StartTitleSign);//'[('
                                                        let before_Title = arr_t1[0];
                                                        let arr_t2 = arr_t1[1].split(bq.EndTitleSign);//')]'
                                                        let text_Title = arr_t2[0];
                                                        let after_Title = arr_t2[1];
                        
                                                        const span_title = document.createElement('span');
                                                        span_title.className = 'verse_title';
                                                        span_title.innerHTML = text_Title;
                        
                                                        p.append(before_Title);
                                                        p.append(span_title);
                                                        p.append(after_Title);
                                                    }else{
                                                        p.append(VerseText);
                                                    }
                        
                                                    if(bq.HTMLFilter == 'Y'){
                                                        p.innerHTML = htmlEntities(p.innerHTML);
                                                    }
                                                }
                        
                                                //Нет ни Номеров Стронга, ни Примечаний ни Оглавлений
                                                if(bq.StrongNumbers == "N" && bq.Notes == 'N' && bq.Titles == 'N'){
                                                    //p.append(VerseText);//antes
                                                    span_vt.append(VerseText);
                                                    p.append(span_vt);
                        
                                                    if(bq.HTMLFilter == 'Y'){
                                                        p.innerHTML = htmlEntities(p.innerHTML);
                                                    }
                                                }
        
                                                result_finded.push(p);
                                                
                                            }      
                                        });
                                    }
                                });
                            
                            }else{
                                //console.log(index+') stop doFind. window.doFind: '+window.doFind);
                            }//end else (window.doFind)
        
        
        
                            //Formar links para resultados de búsqueda
                            if(result_finded.length > 0){
                                
                                //console.log('2. abajo result_finded:');
                                //console.log(result_finded);
        
                                //console.log('2. abajo arr_result_m_total:');
                                //console.log(arr_result_m_total);
                            
                                if(document.querySelectorAll('.res_f').length > 0){
                                    document.querySelectorAll('.res_f').forEach(el=>{
                                        // el.remove();//elimino resultado anterior si lo hay
                                    })
                                }                    
        
                                //inserto resultado de búsqueda                        
                                document.querySelector('.res_f').innerHTML = `"<b class="f_r-ed">${words_input}</b>" <span title="Стихов">(${count_f})</span> <span class="res_m f_r" title="Совпадений">[${count_m_total}]</span>`;
                                mySizeFind();//altura de div_find_body
        
                                var arr_l = [];
                                var limit_n = limit;
                                for (let i = 0; i < result_finded.length; i++) {
                                    const el = result_finded[i];
                                    //console.log(el);
        
                                    if(i > limit_n - 2 || i == result_finded.length - 1){
                                        arr_l.push(el);
                                        result_show.push(arr_l); 
                                        limit_n += limit;
                                        arr_l = [];
                                    }else{
                                        arr_l.push(el);
                                    }                            
                                }
                                //console.log('result_show');
                                //console.log(result_show);
        
                                window.res_show = result_show;
                                //console.log('res_show');
                                //console.log(res_show);
        
                                if(result_show != null){
                                    mostrar_res_show(0);//por defecto los primeros 5 
                                }
                                result_show = [];
        
                                if(index == book_end){
                                    stopFindWords();//показываю кнопку 'Find'
                                }
                                
                            }else{
                                if(index == book_end && result_finded.length == 0){
                                    mostrar_no_res();
                                    stopFindWords();//показываю кнопку 'Find'
                                }
                            }                    
                        })
                        .catch(error => { 
                            // Código a realizar cuando se rechaza la promesa
                            console.log('2. error promesa find: '+error);
                        }); 
                        
                        /*if(window.doFind){
                            console.log(index+') fin for. hago doFind. window.doFind: '+window.doFind);
                        }else{
                            alert(index+') fin for. stop doFind. window.doFind: '+window.doFind);
                            break;
                        }*/

                    }
    
                }//end for
            }

        }else{//MODO OLD. como en Text3()

            fetch(`modules/text/${Translation}/bibleqt.json`)
            .then((response) => response.json())
            .then((bq) => {
                //console.log(bq);
        
                if(book_start != null && book_end != null){
        
                    for (let index = book_start; index <= book_end; index++) {                
                        
                        //console.log('--- for --- index: '+index);
                        let book = index;//genesis
        
                        //url del libro necesario
                        url = `modules/text/${Translation}/${bq.Books[book].PathName}`;//01_genesis.htm;   
                        //console.log('--- url: '+url);
        
                        fetch(url)
                        .then((response) => response.text())
                        .then((bookModule) => {
                            
                            if(window.doFind){
                                //console.log(index+') hago doFind. window.doFind: '+window.doFind);
                                //console.log('Bible book: '+bq.Books[book].FullName);
            
                                //console.log(bookModule);
                                //показываю в каких книгах ищу
                                document.querySelector(".f_book").innerHTML = bq.Books[book].FullName;
        
                                var nb = bookModule.split('<h4>');//делю файл на главы
                                //console.log(nb);
                                
                                nb = nb.filter(elm => elm);//удаляю пустые елементы массива
                                //console.log(nb);
        
                                var arr_chapters = nb;
                                //arr_chapters.shift();//elimino index0 ('<h2></h2>\n')
        
                                arr_chapters.forEach( (el_ch, i_ch) => {
                                    //console.log(el_ch);
                                    let chapter = i_ch;
                                    let ChapterId = i_ch;
                                    
                                    if(el_ch.includes('<p>')){
                                        var arr_verses = el_ch.split('<p>');
                                        //console.log(arr_verses);
                                        
                                        //Recorrer todos los verses
                                        arr_verses.forEach((el,i) => {
        
                                            if(el.includes('</p>')){
                                                var arr_p_text = el.split('</p>');
                                                var p_Text = arr_p_text[0];
                                            }else{
                                                var p_Text = el;
                                            }
                                            //console.log('p_Text: '+p_Text); 
        
                                            var arr_p = p_Text.split(' ');
                                            var VerseId = arr_p[0];
                                            //console.log('VerseId: '+VerseId);
        
                                            var VerseText = '';
                                            for(let index = 1; index < arr_p.length; index++){
                                                VerseText += arr_p[index] + ' ';
                                                //console.log('arr_p['+index+']: '+arr_p[index]);
                                            }
                                            //console.log('VerseText: '+VerseText);
                                            
                                            if(VerseText != ''){
                                                //VerseText = removeTags(VerseText);
                                                //console.log('sin tags --- VerseText: '+VerseText);
                                            }
        
        
                                            //Si hay palabras para buscar...
                                            if(arr_words.length > 0){
                                                
                                                //tipos de busqueda
                                                var is_match = false;
        
        
                                                //=======================================================================//  
                                                //0. por defecto - nada marcado //ok
                                                //=======================================================================//  
                                                if(!cbox1.checked && !cbox2.checked && !cbox3.checked){
                                                    let arr_matches = [];  
                                                    //1. проверяю есть ли каждое слово из фразы в стихе                                      
                                                    arr_words.forEach(w => {
                                                        if(accent_match == 'Y'){//cbox6
                                                            if(no_part_word == 'Y'){//cbox4
                                                                var arr_no_part_word = [];
                                                                w = "^" +w +"$";//entera palabra del array, no parte
                                                                var regex_w = RegExp(w, tipo);
                                                                VerseText.split(' ').filter(elm=>elm).forEach(el=> {
                                                                    if(removeSymbols(el).match(regex_w)){
                                                                        //console.log('removeSymbols(el) ('+removeSymbols(el)+') match regex_w: '+true);
                                                                        arr_no_part_word.push(1);
                                                                    }else{
                                                                        //console.log('--- el ('+el+') NO match regex_w: '+false);
                                                                        arr_no_part_word.push(0);
                                                                    } 
                                                                });
                                                                if(arr_no_part_word.includes(1)){
                                                                    arr_matches.push(1);
                                                                }else{
                                                                    arr_matches.push(0);
                                                                }
                                                            }else if(no_part_word == 'N'){
                                                                var regex_w = RegExp(w, tipo);
                                                                arr_result_m = VerseText.match(regex_w);
                                                                count_m = (arr_result_m != null) ? arr_result_m.length : 0 ;
                                                                if(count_m > 0){
                                                                    arr_matches.push(1);
                                                                }else{
                                                                    arr_matches.push(0);
                                                                }
                                                            }
                                                        }else if(accent_match == 'N'){
                                                            if(no_part_word == 'Y'){
                                                                var arr_no_part_word = [];
                                                                w = "^" +w +"$";//entera palabra del array, no parte
                                                                var regex_w = RegExp(removeAccents(w), tipo);
                                                                removeAccents(VerseText).split(' ').filter(elm=>elm).forEach(el=> {
                                                                    if(removeSymbols(el).match(regex_w)){
                                                                        //console.log('removeSymbols(el) ('+removeSymbols(el)+') match regex_w: '+true);
                                                                        arr_no_part_word.push(1);
                                                                    }else{
                                                                        //console.log('--- removeSymbols(el) ('+removeSymbols(el)+') NO match regex_w: '+false);
                                                                        arr_no_part_word.push(0);
                                                                    } 
                                                                });
                                                                if(arr_no_part_word.includes(1)){
                                                                    arr_matches.push(1);
                                                                }else{
                                                                    arr_matches.push(0);
                                                                }
                                                            }else if(no_part_word == 'N'){
                                                                var regex_w = RegExp(removeAccents(w), tipo); 
                                                                arr_result_m = removeAccents(VerseText).match(regex_w);
                                                                count_m = (arr_result_m != null) ? arr_result_m.length : 0 ;
                                                                if(count_m > 0){
                                                                    arr_matches.push(1);
                                                                }else{
                                                                    arr_matches.push(0);
                                                                }
                                                            }
                                                        }
                                                    });
                                                    //console.log('Word. w: ', w);
                                                    //console.log('VerseText: ', VerseText);
                                                    if(!arr_matches.includes(0)){//когда все слова из фразы есть в стихе
                                                        //2. в цикле отмечаю красным все совпадения, но уже не нужно arr_matches.push()
                                                        arr_words.forEach(w => {
                                                            if(accent_match == 'Y'){//cbox6
                                                                if(no_part_word == 'Y'){//cbox4
                                                                    var arr_VerseText_red = [];
                                                                    var regex_w = RegExp(w, tipo);                                                       
                                                                    VerseText.split(' ').filter(elm=>elm).forEach(el=> {
                                                                        if(removeSymbols(el).match(regex_w)){
                                                                            //console.log('removeSymbols(el) ('+removeSymbols(el)+') match regex_w: '+true);
                                                                            el = el.replace(regex_w, function (x) {
                                                                                return '<b class="f_red">' + x + '</b>';
                                                                            });
                                                                            arr_VerseText_red.push(el);
                                                                        }else{
                                                                            //console.log('--- el ('+el+') NO match regex_w: '+false);
                                                                            arr_VerseText_red.push(el);
                                                                        } 
                                                                    });
                                                                    VerseText = arr_VerseText_red.join(' ');
                                                                    //console.log('VerseText: ', VerseText);
                                                                }else if(no_part_word == 'N'){
                                                                    var regex_w = RegExp(w, tipo);
                                                                    arr_result_m = VerseText.match(regex_w);
                                                                    count_m = (arr_result_m != null) ? arr_result_m.length : 0 ;
                                                                    if(count_m > 0){
                                                                        VerseText = VerseText.replace(regex_w, function (x) {
                                                                            return '<b class="f_red">' + x + '</b>';
                                                                        });
                                                                    }
                                                                }
                                                            }else if(accent_match == 'N'){
                                                                var regex_w = RegExp(removeAccents(w), tipo); 
                                                                arr_result_m = removeAccents(VerseText).match(regex_w);
                                                                count_m = (arr_result_m != null) ? arr_result_m.length : 0 ;
                                                                if(count_m > 0){
                                                                    var text_marcas = removeAccents(VerseText).replace(regex_w, function (x) {
                                                                        return '{' + x + '}';
                                                                    });
                                                                    var text_original = VerseText;
                                                                    var text_marcas = prepararTextMarcas(text_marcas);
                                                                    VerseText = markRed(text_original, text_marcas);
                                                                }
                                                            }
                                                        });
                                                        is_match = true;
                                                        count_m_total += count_m;
                                                        arr_result_m_total.push(arr_result_m);
                                                        //console.log('count_m_total: ', count_m_total);
                                                        //console.log('arr_result_m_total: ', arr_result_m_total);
                                                        //console.log('VerseText: ', VerseText);
        
                                                    }else{
                                                        is_match = false;
                                                    }
                                                }
                                                //=======================================================================//  
                                                //end //0. por defecto - nada marcado //ok                                 
                                                //=======================================================================//                                    
                                                
        
                                                //=======================================================================//                                    
                                                //1. - искомое содержит хотя бы одно слово ('Иисус Христос' или 'Иисус' или 'Христос') //ok
                                                //=======================================================================//
                                                if(cbox1.checked){
                                                    let arr_matches = [];
                                                    if(no_part_word == 'Y'){
                                                        arr_words.forEach(w => {
                                                            if(no_part_word == 'Y'){
                                                                // w = "\\b" +w +"\\b";//palabras enteras// exacta coincidencia
                                                                w = "\\B" +w +"\\B";//marcar si 'w' está rodeada por otras letras dentro de 'aawaa'.//true
                                                            }
                                                            if(accent_match == 'Y'){
                                                                var regex_w = RegExp(w, tipo); 
                                                                arr_result_m = VerseText.match(regex_w);
                                                                count_m = (arr_result_m != null) ? arr_result_m.length : 0 ;
                                                                if(count_m > 0){
                                                                    arr_matches.push(1);
                                                                    VerseText = VerseText.replace(regex_w, function (x) {
                                                                        return '<b class="f_red">' + x + '</b>';
                                                                    });
                                                                    count_m_total += count_m;
                                                                    arr_result_m_total.push(arr_result_m);
                                                                }else{
                                                                    arr_matches.push(0);
                                                                }
                                                            }else if(accent_match == 'N'){
                                                                var regex_w = RegExp(removeAccents(w), tipo); 
                                                                arr_result_m = removeAccents(VerseText).match(regex_w);;
                                                                count_m = (arr_result_m != null) ? arr_result_m.length : 0 ;
                                                                if(count_m > 0){
                                                                    arr_matches.push(1);
                                                                    var text_marcas = removeAccents(VerseText).replace(regex_w, function (x) {
                                                                        return '{' + x + '}';
                                                                    });
                                                                    var text_original = VerseText;
                                                                    var text_marcas = prepararTextMarcas(text_marcas);
                                                                    VerseText = markRed(text_original, text_marcas);
                                                                    count_m_total += count_m;
                                                                    arr_result_m_total.push(arr_result_m);
                                                                }else{
                                                                    arr_matches.push(0);
                                                                }
                                                            }
                                                        });
                                                        if(arr_matches.includes(1)){//si por lo menos hay 1 match
                                                            is_match = true;
                                                        }else{
                                                            is_match = false;
                                                        }
                                                    }else if(no_part_word == 'N'){
                                                        if(accent_match == 'Y'){
                                                            words = arr_words.join('|');
                                                            var regex1 = RegExp(words, tipo);//buscar todo
                                                            arr_result_m = VerseText.match(regex1);
                                                            count_m = (arr_result_m != null) ? arr_result_m.length : 0 ;
                                                            if(count_m > 0){
                                                                is_match = true;
                                                                count_m_total += count_m;
                                                                arr_result_m_total.push(arr_result_m);
                                                                VerseText = VerseText.replace(regex1, function (x) {
                                                                    return '<b class="f_red">' + x + '</b>';
                                                                });
                                                            }else{
                                                                is_match = false;
                                                            } 
                                                        }else if(accent_match == 'N'){
                                                            words = arr_words.join('|');
                                                            var regex_w = RegExp(removeAccents(words), tipo); 
                                                            arr_result_m = removeAccents(VerseText).match(regex_w);
                                                            count_m = (arr_result_m != null) ? arr_result_m.length : 0 ;
                                                            if(count_m > 0){
                                                                arr_matches.push(1);
                                                                var text_marcas = removeAccents(VerseText).replace(regex_w, function (x) {
                                                                    return '{' + x + '}';
                                                                });
                                                                var text_original = VerseText;
                                                                text_marcas = prepararTextMarcas(text_marcas);
                                                                VerseText = markRed(text_original, text_marcas);
                                                                //console.log('VerseText: '+VerseText);
                                                            }else{
                                                                arr_matches.push(0);
                                                            }
                                                            if(arr_matches.includes(1)){//si por lo menos hay 1 match
                                                                is_match = true;
                                                                count_m_total += count_m;
                                                                arr_result_m_total.push(arr_result_m);
                                                            }else{
                                                                is_match = false;
                                                            }
                                                        }
                                                    }
                                                }
                                                //=======================================================================//
                                                //end //1. - искомое содержит хотя бы одно слово ('Иисус Христос' или 'Иисус' или 'Христос') //ok
                                                //=======================================================================//
        
        
                                                //=======================================================================//
                                                //2. - //cлова идут в заданном порядке //ok
                                                //=======================================================================//
                                                if(cbox2.checked){
                                                    //console.log('//tipo búsqueda --- //2. - //cлова идут в заданном порядке');
                                                    let arr_matches = [];
                                                    let arr_matches_w = [];//matches en words
                                                    let arr_regex_w = [];
                                                    let arr_regex_w_l = [];//для сравнения
                                                    arr_words.forEach( (w,i,arr_w) => {
                                                        if(accent_match == 'Y'){
                                                            var regex_w = RegExp(w, tipo);
                                                            arr_regex_w.push(regex_w);
                                                            var regex_w_l = (typeof w != 'undefined') ? RegExp(w.toLowerCase(), tipo) : RegExp(w, tipo);//для сравнения
                                                            arr_regex_w_l.push(regex_w_l);
                                                            arr_result_m = VerseText.match(regex_w);
                                                            count_m = (arr_result_m != null) ? arr_result_m.length : 0 ;
                                                            if(count_m > 0){
                                                                //console.log('ok --- regex_w match arr_words. w: '+w);
                                                                if(typeof arr_w[i+1] != 'undefined'){
                                                                    if(case_sens == ''){//различать маленькие и БОЛЬШИЕ буквы
                                                                        var index_first_w = VerseText.indexOf(arr_w[i]);//The indexOf() method is case sensitive.
                                                                        var index_next_w = VerseText.indexOf(arr_w[i+1], index_first_w);
                                                                        if(index_first_w < index_next_w){
                                                                            //console.log('VerseText: '+VerseText);
                                                                            //console.log('caso2a. index_first_w: '+index_first_w);
                                                                            //console.log('caso2a. index_next_w: '+index_next_w);
                                                                            let arr_VerseText_a = VerseText.split(' ');
                                                                            let arr_VerseText_a_ed = [];
                                                                            for (let a = 0, sovpad = 0; a < arr_VerseText_a.length; a++) {
                                                                                let el_a = arr_VerseText_a[a];
                                                                                if(no_part_word == 'Y'){
                                                                                    var regex_aw = RegExp(arr_w[i+sovpad], tipo);
                                                                                    var sovpad_word = (el_a == arr_w[i+sovpad]) ? true : false ;
                                                                                }else{//no_part_word == 'N'
                                                                                    var regex_aw = RegExp(arr_w[i+sovpad], tipo);
                                                                                    var sovpad_word = (el_a.match(regex_aw)) ? true : false ;
                                                                                }
                                                                                //si 'Иисус' es la última palabra de frase buscada 'Христос Иисус'
                                                                                if(sovpad_word && sovpad < arr_words.length && i+sovpad < arr_words.length){
                                                                                    el_a = el_a.replace(regex_aw, function (x) {
                                                                                        return '<b class="f_red">' + x + '</b>';
                                                                                    });
                                                                                    sovpad++;
                                                                                    arr_matches_w.push(1);
                                                                                    count_m_total += 1;
                                                                                    arr_result_m_total.push(arr_result_m);
                                                                                }
                                                                                if(sovpad == arr_words.length){
                                                                                    sovpad = 0;//reset para buscar otros maches en el mismo verso
                                                                                }
                                                                                arr_VerseText_a_ed.push(el_a); 
                                                                            }
                                                                            VerseText = arr_VerseText_a_ed.join(' ');
                                                                            //console.log(VerseText);
                                                                        }else{
                                                                            arr_matches.push(0);
                                                                        }
                                                                    }else if(case_sens == 'i'){//все равно какие буквы
                                                                        //превращаю в мал. буквы только для сравнения.
                                                                        var index_first_w = VerseText.toLowerCase().indexOf(arr_w[i].toLowerCase());//The indexOf() method is case sensitive.
                                                                        var index_next_w = VerseText.toLowerCase().indexOf(arr_w[i+1].toLowerCase(), index_first_w);
                                                                        if(index_first_w < index_next_w){
                                                                            //console.log('VerseText: '+VerseText);
                                                                            //console.log('VerseText.toLowerCase(): '+VerseText.toLowerCase());
                                                                            //console.log('caso2b. index_first_w: '+index_first_w);
                                                                            //console.log('caso2b. index_next_w: '+index_next_w);
                                                                            let arr_VerseText_a = VerseText.split(' ');
                                                                            let arr_VerseText_a_ed = [];
                                                                            for (let a = 0, sovpad = 0; a < arr_VerseText_a.length; a++) {
                                                                                let el_a = arr_VerseText_a[a];
                                                                                if(no_part_word == 'Y'){
                                                                                    var regex_aw = RegExp(arr_w[i+sovpad].toLowerCase(), tipo);
                                                                                    var sovpad_word = (el_a.toLowerCase() == arr_w[i+sovpad].toLowerCase()) ? true : false ;
                                                                                }else{//no_part_word == 'N'
                                                                                    var regex_aw = RegExp(arr_w[i+sovpad].toLowerCase(), tipo);
                                                                                    var sovpad_word = (el_a.toLowerCase().match(regex_aw)) ? true : false ;
                                                                                }
                                                                                //si 'Иисус' es la última palabra de frase buscada 'Христос Иисус'
                                                                                if(sovpad_word && sovpad < arr_words.length && i+sovpad < arr_words.length){
                                                                                    el_a = el_a.replace(regex_aw, function (x) {
                                                                                        return '<b class="f_red">' + x + '</b>';
                                                                                    });
                                                                                    sovpad++;
                                                                                    arr_matches_w.push(1);
                                                                                    count_m_total += 1;
                                                                                    arr_result_m_total.push(arr_result_m);
                                                                                }
                                                                                if(sovpad == arr_words.length){
                                                                                    sovpad = 0;//reset para buscar otros maches en el mismo verso
                                                                                }
                                                                                arr_VerseText_a_ed.push(el_a); 
                                                                            }
                                                                            VerseText = arr_VerseText_a_ed.join(' ');
                                                                            //console.log(VerseText);
                                                                        }else{
                                                                            arr_matches.push(0);
                                                                        }
                                                                    }                                                    
                                                                }
                                                            }    
                                                        }else if(accent_match == 'N'){
                                                            var regex_w = RegExp(removeAccents(w), tipo);
                                                            arr_regex_w.push(regex_w);
                                                            var regex_w_l = (typeof w != 'undefined') ? RegExp(removeAccents(w).toLowerCase(), tipo) : RegExp(removeAccents(w), tipo);//для сравнения
                                                            arr_regex_w_l.push(regex_w_l);
                                                            arr_result_m = removeAccents(VerseText).match(regex_w);
                                                            count_m = (arr_result_m != null) ? arr_result_m.length : 0 ;
                                                            if(count_m > 0){
                                                                //console.log('ok --- regex_w match arr_words. w: '+w);
                                                                if(typeof arr_w[i+1] != 'undefined'){
                                                                    if(case_sens == ''){//различать маленькие и БОЛЬШИЕ буквы
                                                                        var index_first_w = removeAccents(VerseText).indexOf(arr_w[i]);//The indexOf() method is case sensitive.
                                                                        var index_next_w = removeAccents(VerseText).indexOf(arr_w[i+1], index_first_w);
                                                                        if(index_first_w < index_next_w){
                                                                            //console.log('removeAccents(VerseText): '+removeAccents(VerseText));
                                                                            //console.log('caso2a. index_first_w: '+index_first_w);
                                                                            //console.log('caso2a. index_next_w: '+index_next_w);
                                                                            let arr_VerseText_a = removeAccents(VerseText).split(' ');
                                                                            let arr_VerseText_a_ed = [];
                                                                            for (let a = 0, sovpad = 0; a < arr_VerseText_a.length; a++) {
                                                                                let el_a = arr_VerseText_a[a];
                                                                                if(no_part_word == 'Y'){
                                                                                    var regex_aw = RegExp(arr_w[i+sovpad], tipo);
                                                                                    var sovpad_word = (el_a == arr_w[i+sovpad]) ? true : false ;
                                                                                }else{//no_part_word == 'N'
                                                                                    var regex_aw = RegExp(arr_w[i+sovpad], tipo);
                                                                                    var sovpad_word = (el_a.match(regex_aw)) ? true : false ;
                                                                                }
                                                                                //si 'Иисус' es la última palabra de frase buscada 'Христос Иисус'
                                                                                if(sovpad_word && sovpad < arr_words.length && i+sovpad < arr_words.length){
                                                                                    el_a = removeAccents(el_a).replace(regex_aw, function (x) {
                                                                                        return '{' + x + '}';
                                                                                    });
                                                                                    sovpad++;
                                                                                    arr_matches_w.push(1);
                                                                                    count_m_total += 1;
                                                                                    arr_result_m_total.push(arr_result_m);
                                                                                }
                                                                                if(sovpad == arr_words.length){
                                                                                    sovpad = 0;//reset para buscar otros maches en el mismo verso
                                                                                }
                                                                                arr_VerseText_a_ed.push(el_a); 
                                                                            }
                                                                            var text_original = VerseText;
                                                                            var text_marcas = prepararTextMarcas(arr_VerseText_a_ed.join(' '));
                                                                            VerseText = markRed(text_original, text_marcas);//FUNCIONA
                                                                            //console.log('VerseText: '+VerseText); 
                                                                        }else{
                                                                            arr_matches.push(0);
                                                                        }
                                                                    }else if(case_sens == 'i'){//все равно какие буквы
                                                                        //превращаю в мал. буквы только для сравнения.
                                                                        var index_first_w = removeAccents(VerseText).toLowerCase().indexOf(arr_w[i].toLowerCase());//The indexOf() method is case sensitive.
                                                                        var index_next_w = removeAccents(VerseText).toLowerCase().indexOf(arr_w[i+1].toLowerCase(), index_first_w);
                                                                        if(index_first_w < index_next_w){
                                                                            //console.log('VerseText: '+removeAccents(VerseText));
                                                                            //console.log('VerseText.toLowerCase(): '+removeAccents(VerseText).toLowerCase());
                                                                            //console.log('caso2b. index_first_w: '+index_first_w);
                                                                            //console.log('caso2b. index_next_w: '+index_next_w);
                                                                            let arr_VerseText_a = removeAccents(VerseText).split(' ');
                                                                            let arr_VerseText_a_ed = [];
                                                                            for (let a = 0, sovpad = 0; a < arr_VerseText_a.length; a++) {
                                                                                let el_a = arr_VerseText_a[a];
                                                                                if(no_part_word == 'Y'){
                                                                                    //var regex_aw = RegExp(arr_w[i+sovpad].toLowerCase(), tipo);//antes y ok
                                                                                    var regex_aw = (arr_w[i+sovpad] < arr_w.length) ? RegExp(arr_w[i+sovpad].toLowerCase(), tipo) : RegExp(arr_w[arr_w.length-1].toLowerCase(), tipo) ;
                                                                                    if(arr_w[i+sovpad] < arr_w.length){
                                                                                        var sovpad_word = (el_a.toLowerCase() == arr_w[i+sovpad].toLowerCase()) ? true : false ;
                                                                                    }else{
                                                                                        var sovpad_word = (el_a.toLowerCase() == arr_w[arr_w.length-1].toLowerCase()) ? true : false ;
                                                                                    }
                                                                                }else{//no_part_word == 'N'
                                                                                    var regex_aw = (arr_w[i+sovpad] < arr_w.length) ? RegExp(arr_w[i+sovpad].toLowerCase(), tipo) : RegExp(arr_w[arr_w.length-1].toLowerCase(), tipo) ;
                                                                                    var sovpad_word = (el_a.toLowerCase().match(regex_aw)) ? true : false ;
                                                                                }
                                                                                //si 'Иисус' es la última palabra de frase buscada 'Христос Иисус'
                                                                                if(sovpad_word && sovpad < arr_words.length && i+sovpad < arr_words.length){
                                                                                    el_a = el_a.replace(regex_aw, function (x) {
                                                                                        return '{' + x + '}';
                                                                                    });
                                                                                    sovpad++;
                                                                                    arr_matches_w.push(1);
                                                                                    count_m_total += 1;
                                                                                    arr_result_m_total.push(arr_result_m);
                                                                                }
                                                                                if(sovpad == arr_words.length){
                                                                                    sovpad = 0;//reset para buscar otros maches en el mismo verso
                                                                                }
                                                                                arr_VerseText_a_ed.push(el_a); 
                                                                            }
                                                                            var text_original = VerseText;
                                                                            var text_marcas = prepararTextMarcas(arr_VerseText_a_ed.join(' '));
                                                                            VerseText = markRed(text_original, text_marcas);//FUNCIONA
                                                                            //console.log('VerseText: '+VerseText); 
                                                                        }else{
                                                                            arr_matches.push(0);
                                                                        }
                                                                    }                                                    
                                                                }
                                                            }
                                                        }//end //else if(accent_match == 'N')
                                                    });
                                                    if(!arr_matches.includes(0)){//si todos ocurrencias hay
                                                        for (let i = 0; i < arr_regex_w.length; i++) {
                                                            if(typeof arr_regex_w[i+1] != 'undefined' || typeof arr_regex_w_l[i+1] != 'undefined'){
                                                                if(accent_match == 'Y'){
                                                                    if(case_sens == ''){//различать маленькие и БОЛЬШИЕ буквы
                                                                        var index_first_w = VerseText.indexOf(arr_words[i]);
                                                                        var index_next_w = VerseText.indexOf(arr_words[i+1], index_first_w);    
                                                                    }if(case_sens == 'i'){//все равно какие буквы
                                                                        var index_first_w = VerseText.toLowerCase().indexOf(arr_words[i].toLowerCase());
                                                                        var index_next_w = VerseText.toLowerCase().indexOf(arr_words[i+1].toLowerCase(), index_first_w);    
                                                                    }
                                                                }else if(accent_match == 'N'){
                                                                    if(case_sens == ''){//различать маленькие и БОЛЬШИЕ буквы
                                                                        var index_first_w = removeAccents(VerseText).indexOf(arr_words[i]);
                                                                        var index_next_w = removeAccents(VerseText).indexOf(arr_words[i+1], index_first_w);    
                                                                    }if(case_sens == 'i'){//все равно какие буквы
                                                                        var index_first_w = removeAccents(VerseText).toLowerCase().indexOf(arr_words[i].toLowerCase());
                                                                        var index_next_w = removeAccents(VerseText).toLowerCase().indexOf(arr_words[i+1].toLowerCase(), index_first_w);    
                                                                    }
                                                                }
                                                                if(index_first_w < index_next_w && arr_matches_w.includes(1)){
                                                                    //console.log('VerseText: '+VerseText);
                                                                    //console.log('first arr_regex_w['+i+']: '+arr_regex_w[i] + ' --- index_first_regex: '+index_first_regex);
                                                                    //console.log('second arr_regex_w['+(i+1)+']: '+arr_regex_w[i+1]+ ' --- index_next_regex: '+index_next_regex);                                                        
                                                                    is_match = true;
                                                                }else{
                                                                    is_match = false;
                                                                }
                                                            }
                                                        }                                            
                                                    }else{
                                                        is_match = false;
                                                    }
                                                }
                                                //=======================================================================//
                                                //end //2. - //cлова идут в заданном порядке //ok
                                                //=======================================================================//
                                                
        
                                                //=======================================================================//
                                                //3. - //искать точную фразу  'Иисус Христос' как одно слово //ok
                                                //=======================================================================//
                                                if(cbox3.checked){
                                                    var words = arr_words.join(' ');
                                                    VerseText = VerseText.replace(/(\n|\t|\r)/g,'');
                                                    var arr_VerseText_or = VerseText.split(' ').filter(e=>e);
                                                    VerseText = arr_VerseText_or.join(' ');
                                                    if(accent_match == 'Y'){
                                                        var regex_w = RegExp(words, tipo);
                                                        arr_result_m = VerseText.match(regex_w);
                                                        count_m = (arr_result_m != null) ? arr_result_m.length : 0 ;
                                                        if(count_m > 0){
                                                            VerseText = VerseText.replace(regex_w, function (x) {
                                                                return '<b class="f_red">' + x + '</b>';
                                                            });
                                                            is_match = true;
                                                            count_m_total += count_m;
                                                            arr_result_m_total.push(arr_result_m);
                                                        }else{
                                                            is_match = false;
                                                        } 
                                                    }else if(accent_match == 'N'){
                                                        var regex_w = RegExp(removeAccents(words), tipo);
                                                        arr_result_m = removeAccents(VerseText).match(regex_w);
                                                        count_m = (arr_result_m != null) ? arr_result_m.length : 0 ;
                                                        if(count_m > 0){
                                                            var text_marcas = removeAccents(VerseText).replace(regex_w, function (x) {
                                                                return '{' + x + '}';
                                                            });
                                                            var text_original = VerseText;
                                                            var arr_frases = prepararFrases(text_original,text_marcas);
                                                            var frase_original = arr_frases[0];
                                                            var frase_exacta = arr_frases[1];
                                                            //console.log('frase_original: '+frase_original);
                                                            //console.log('frase_exacta: '+frase_exacta);
                                                            text_marcas = prepararTextMarcas(frase_exacta);
                                                            
                                                            VerseText = markRed(frase_original, text_marcas);//FUNCIONA
                                                            //console.log('VerseText: '+VerseText);
                                                            VerseText = VerseText.replace(/¬/g,' ');//quito lo puesto temporalmente
                                                            is_match = true;
                                                            count_m_total += count_m;
                                                            arr_result_m_total.push(arr_result_m);
                                                        }else{
                                                            is_match = false;
                                                        }
                                                    }
                                                }
                                                //=======================================================================//
                                                //end 3. - //искать точную фразу  'Иисус Христос' как одно слово //ok
                                                //=======================================================================//
        
        
                                            }//end //if(arr_words.length > 0)
        
        
        
                                            //Matches
                                            if(is_match){
                                                //console.log('VerseText regex1: '+VerseText.match(regex1));
                                                //console.log('VerseText: '+VerseText);
        
                                                const span_num_find = document.createElement('span');
                                                span_num_find.className = 'sp_f';
                                                count_f++;
                                                span_num_find.innerText = count_f;
        
                                                var p = document.createElement('p');
                                                p.id = Translation +'__'+book + '__' + chapter + '__' + VerseId;
                                
                                                var a = document.createElement('a');
                                                a.href = '#';
                                                a.classList.add = 'blink';
                                                let aLink = bq.Books[book].ShortNames[0] + ChapterId + ':' + VerseId;
                                                a.innerHTML = aLink;
                                                a.setAttribute('onclick',`goToLinkFromFind('${Translation}', '${aLink}')`);//funciona
                                                
                                                p.append(span_num_find);
                                                p.append(a);
                                                p.append(' '); 
                        
                                                const span_vt = document.createElement('span');
                                                span_vt.className = 'vt';//text de Verse para aplicar HTMLFilter si hay
                        
                        
                                                //Номера Стронга в стихах (RST+)
                                                if(bq.StrongNumbers == "Y"){
                                                    let t = VerseText;
                                                    var arr_t = t.split(' ');
                        
                                                    arr_t.forEach((el,i) => {    
                                                        
                                                        //element of string is Strong Number
                                                        if(!isNaN(parseInt(el)) || el == '0'){//number                         
                                                            const span_strong = document.createElement('span');
                                                            if(btnStrongIsActive){
                                                                span_strong.className = 'strong show strongActive'; 
                                                            }else{
                                                                span_strong.className = 'strong'; 
                                                            }
                                                            let last_char = (el.length > 1) ? el.charAt(el.length-1) : "" ;
                        
                                                            //si ultimo carácter es string
                                                            if(last_char != '' && isNaN(last_char)){
                                                                let el_number = el.substring(0,el.length-1);
                                                                let el_string = last_char;
                                                                span_strong.innerHTML = el_number;
                                                                p.append(span_strong);
                                                                p.append(el_string);
                                                            }else{//es number
                                                                span_strong.innerHTML = el;
                                                                p.append(span_strong);
                                                            }
                        
                                                        }else{//is word
                                                            p.append(' ');
                                                            if(btnStrongIsActive){
                                                                if(el.includes('<S>')){
                                                                    el = el.replace('<S>','<S class="show strongActive">');
                                                                }
                                                            }
                                                            p.append(el);
                                                        }
                                                    });
                                                    p.innerHTML.trim();
                        
                                                    //console.log('antes: ' + p.innerHTML);
                                                    if(bq.HTMLFilter == 'Y'){
                                                        p.innerHTML = htmlEntities(p.innerHTML);
                                                    }
                                                    //console.log('despues: '+p.innerHTML);
                        
                                                    if(btnStrongIsActive && p.innerHTML.includes('strongActive')){
                                                        p.querySelectorAll('.strongActive').forEach((el)=>{
                                                            el.addEventListener('click', ()=>{
                                                                //console.log('2. book: '+book);
                                                                //console.log('2. el.innerHTML: '+el.innerHTML);
                                                                if(el.innerHTML.includes('H') || el.innerHTML.includes('G')){//rstStrongRed G3056 /H3056
                                                                    getStrongNumber(el.innerHTML);
                                                                }else{//rstStrong
                                                                    lang = (book >= 39) ? 'Grk' : 'Heb' ;
                                                                    getStrongNumber(el.innerHTML, lang);
                                                                }
                                                            });
                                                        }); 
                                                    }
                                                }
                        
                                                //Примечания редактора в стихах (RSTi2)
                                                if(bq.Notes == 'Y'){
                                                    let t = VerseText;
                        
                                                    if(t.includes(bq.NoteSign)){// '*'
                                                        let arr_t0 = t.split(bq.NoteSign);
                                                        let before_Note = arr_t0[0];
                        
                                                        if(t.includes(bq.StartNoteSign) && t.includes(bq.EndNoteSign)){
                                                            let arr_t1 = t.split(bq.StartNoteSign);//'[('
                                                            let arr_t2 = arr_t1[1].split(bq.EndNoteSign);//')]'
                                                            let text_Note = arr_t2[0];
                                                            let after_Note = arr_t2[1];
                        
                                                            const span_t = document.createElement('span');
                                                            span_t.className = 'tooltip';
                                                            span_t.setAttribute('data-tooltip',text_Note);
                                                            span_t.innerHTML = bq.NoteSign;
                        
                                                            span_t.addEventListener('mouseenter', function(){
                                                                showTooltip(this);
                                                            });
                                                            span_t.addEventListener('mouseleave', function(){
                                                                hideTooltip(this);
                                                            });
                                                                        
                                                            before_Note = (bq.HTMLFilter == 'Y') ? htmlEntities(before_Note) : before_Note ;
                                                            span_vt.append(before_Note);
                                                            span_vt.append(span_t);
                                                            after_Note = (bq.HTMLFilter == 'Y') ? htmlEntities(after_Note) : after_Note ;
                                                            span_vt.append(after_Note);
                        
                                                            p.append(span_vt);//antes
                                                            if(bq.HTMLFilter == 'Y'){//aki en find si lo meto
                                                                p.innerHTML = htmlEntities(p.innerHTML);
                                                            }
                                                        }
                                                    }else{
                                                        //p.append(VerseText);//antes
                                                        span_vt.append(VerseText);
                                                        p.append(span_vt);
                        
                                                        if(bq.HTMLFilter == 'Y'){
                                                            p.innerHTML = htmlEntities(p.innerHTML);
                                                        }
                                                    }
                                                    //SIMULTANEAMENTE CON '*' Y '<' Y '> ' la función htmlEntities() DESHABILITA tooltip.
                                                }
                        
                                                //Оглавления в стихах (NRT)
                                                if(bq.Titles == 'Y'){
                                                    let t = VerseText;
                        
                                                    if(t.includes(bq.StartTitleSign) && t.includes(bq.EndTitleSign)){
                                                        let arr_t1 = t.split(bq.StartTitleSign);//'[('
                                                        let before_Title = arr_t1[0];
                                                        let arr_t2 = arr_t1[1].split(bq.EndTitleSign);//')]'
                                                        let text_Title = arr_t2[0];
                                                        let after_Title = arr_t2[1];
                        
                                                        const span_title = document.createElement('span');
                                                        span_title.className = 'verse_title';
                                                        span_title.innerHTML = text_Title;
                        
                                                        p.append(before_Title);
                                                        p.append(span_title);
                                                        p.append(after_Title);
                                                    }else{
                                                        p.append(VerseText);
                                                    }
                        
                                                    if(bq.HTMLFilter == 'Y'){
                                                        p.innerHTML = htmlEntities(p.innerHTML);
                                                    }
                                                }
                        
                                                //Нет ни Номеров Стронга, ни Примечаний ни Оглавлений
                                                if(bq.StrongNumbers == "N" && bq.Notes == 'N' && bq.Titles == 'N'){
                                                    //p.append(VerseText);//antes
                                                    span_vt.append(VerseText);
                                                    p.append(span_vt);
                        
                                                    if(bq.HTMLFilter == 'Y'){
                                                        p.innerHTML = htmlEntities(p.innerHTML);
                                                    }
                                                }
        
                                                result_finded.push(p);
                                                
                                            }      
                                        });
                                    }
                                });
                            
                            }else{
                                //console.log(index+') stop doFind. window.doFind: '+window.doFind);
                            }//end else (window.doFind)
        
        
        
                            //Formar links para resultados de búsqueda
                            if(result_finded.length > 0){
                                
                                //console.log('2. abajo result_finded:');
                                //console.log(result_finded);
        
                                //console.log('2. abajo arr_result_m_total:');
                                //console.log(arr_result_m_total);
                            
                                if(document.querySelectorAll('.res_f').length > 0){
                                    document.querySelectorAll('.res_f').forEach(el=>{
                                       // el.remove();//elimino resultado anterior si lo hay
                                    })
                                }                    
        
                                //inserto resultado de búsqueda                        
                                document.querySelector('.res_f').innerHTML = `"<b class="f_r-ed">${words_input}</b>" <span title="Стихов">(${count_f})</span> <span class="res_m f_r" title="Совпадений">[${count_m_total}]</span>`;
                                mySizeFind();//altura de div_find_body
        
                                var arr_l = [];
                                var limit_n = limit;
                                for (let i = 0; i < result_finded.length; i++) {
                                    const el = result_finded[i];
                                    //console.log(el);
        
                                    if(i > limit_n - 2 || i == result_finded.length - 1){
                                        arr_l.push(el);
                                        result_show.push(arr_l); 
                                        limit_n += limit;
                                        arr_l = [];
                                    }else{
                                        arr_l.push(el);
                                    }                            
                                }
                                //console.log('result_show');
                                //console.log(result_show);
        
                                window.res_show = result_show;
                                //console.log('res_show');
                                //console.log(res_show);
        
                                if(result_show != null){
                                    mostrar_res_show(0);//por defecto los primeros 5 
                                }
                                result_show = [];
        
                                if(index == book_end){
                                    stopFindWords();//показываю кнопку 'Find'
                                }
                                
                            }else{
                                if(index == book_end && result_finded.length == 0){
                                    mostrar_no_res();
                                    stopFindWords();//показываю кнопку 'Find'
                                }
                            }                    
                        })
                        .catch(error => { 
                            // Código a realizar cuando se rechaza la promesa
                            console.log('2. error promesa find: '+error);
                        }); 
                        
                        /*if(window.doFind){
                            console.log(index+') fin for. hago doFind. window.doFind: '+window.doFind);
                        }else{
                            alert(index+') fin for. stop doFind. window.doFind: '+window.doFind);
                            break;
                        }*/
        
                    }//end for
                }
        
        
            })
            .then(()=>{
                //console.log('res_show');
                //console.log(res_show);
            })
            .catch(error => { 
                // Código a realizar cuando se rechaza la promesa
                //console.log('error promesa find: '+error);
            });

        }

    }else{
        console.log('Translation no está seleccionada');
    }
    
}//end - findWords()



function mostrar_res_show(index){
    //console.log('=== function mostrar_res_show() ===');

    var div_find_body = document.querySelector('#find_body');
    div_find_body.innerHTML = '';//reset
    //console.log(' abajo window.res_show: ');
    //console.log(window.res_show);

    const p_footer = document.createElement('p');
    p_footer.className = 'wr_res_link';

    for (let index = 0; index < res_show.length; index++) {
        const res_link = document.createElement('span');
        res_link.className = 'res_link';
        res_link.setAttribute('onclick', `mostrar_res_show(${index})`);
        res_link.innerHTML = res_show[index][0].querySelector('.sp_f').innerText + '-' + res_show[index][res_show[index].length-1].querySelector('.sp_f').innerText ;
        p_footer.append(res_link);                            
    }
    
    for (let i = 0;  i < res_show[index].length; i++) {
        const el = res_show[index][i];
        //добавляю стих в див 
        div_find_body.append(el);
        
    }

    div_find_body.append(p_footer); 
    document.querySelectorAll('.res_link')[index].classList.add('active');
    document.querySelector('#find_body').scrollTop = 0;

}

function mostrar_no_res(){
        //console.log('=== function mostrar_no_res() ===');

        var div_find_body = document.querySelector('#find_body');
        var inpt_find = document.querySelector('#inpt_find');
        let count_words = inpt_find.value.trim().split(' ').length;
        words_show = (count_words > 1) ? 'вводимую фразу' : 'вводимое слово' ;

        document.querySelector(".res_f b").innerHTML = `${inpt_find.value.trim()}`;
        document.querySelector(".res_f span").innerHTML = '(0)';
        document.querySelector(".res_m").innerHTML = '[0]';

        div_find_body.innerHTML = '';//reset
        const p_footer = document.createElement('p');
        p_footer.className = 'wr_res_link';
    
        const p_f = document.createElement('p');
        p_f.className = 'prim16 mr-5';
        p_f.innerHTML = `По запросу "<b class="f_red">${inpt_find.value.trim()}</b>" ничего не найдено. Проверьте ${words_show} или попробуйте изменить параметры.`;
        //добавляю стих в див 
        div_find_body.append(p_f);    
}

function show_hist_find(){
    let bl_hist = document.querySelector('.wr_hist_find');
    let hist_find_img = document.querySelector('#hist_find img');
    hist_find_img.classList.add('razv');
    bl_hist.style.display = 'block';
    mySizeFind();//altura de div_find_body
}

function close_hist_find(){
    let bl_hist = document.querySelector('.wr_hist_find');
    let hist_find_img = document.querySelector('#hist_find img');
    hist_find_img.classList.remove('razv');
    bl_hist.style.display = 'none';
    mySizeFind();//altura de div_find_body
}

function hideShowHistFind(){
    let bl_hist = document.querySelector('.wr_hist_find');
    if(bl_hist.style.display == 'none'){
        show_hist_find();
    }else{
        close_hist_find();
    }
}

function hideShowFindParams(){
    let bl_par = document.querySelector('.bl_par');

    if(bl_par.style.display == 'none'){
        bl_par.style.display = 'block';
    }else{
        bl_par.style.display = 'none';
    }
    mySizeFind();//altura de div_find_body
}

function removeTags(str){
    if(str === null || str === ''){
      return false;
    }else{
      str = str.toString();
    }
    // Regular expression to identify HTML tags in
    // the input string. Replacing the identified
    // HTML tag with a null string.
    return str.replace(/(<([^>]+)>)/ig, '');
}
  
function removeAccents(str){
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
} 

function removeSymbols(str){
    return str.replace(/[.,\/#!?$%\^&\*;:{}=\-_`~()\n\r\t]/g, '');
} 

function hasAccents(word) {
    const regex = /[\p{M}]/gu;
    return regex.test(word.normalize('NFD'));
}


function prepararFrases(text_original,text_marcas){
    var arr_orig = text_original.split(' ');//de aki cojo las marcas
    var arr_marcas = text_marcas.split(' ');//de aki cojo las marcas
    var buscar_end = false;//default
    var arr_new = [];

    //reviso si en text_marcas no hay frase de checkbox3 '{Criso Jesus}' o '{Criso Dios Jesus}'
    //para convertir en '{Criso} {Jesus}' o '{Criso} {Dios} Jesus}'
    arr_marcas.forEach((el,i,arr)=>{
        if(el.length > 1 && el[0] == '{' && el[el.length-1] != '}' && buscar_end == false){//start con '{'
            el = el + '¬';
            arr_orig[i] = arr_orig[i] + '¬';
            //console.log('1. el: ', el);
            buscar_end = true;
        }else if(el.length > 0 && el[0] != '{' && el[el.length-1] != '}' && buscar_end == true){//dentro
            el = el + '¬';
            arr_orig[i] = arr_orig[i] + '¬';
            //console.log('2. el: ', el);
        }else if(el.length > 0 && el[0] != '{' && el[el.length-1] == '}' && buscar_end == true){//end con '}'
            //console.log('3. el: ', el);
            buscar_end = false;
        }else{
            //console.log('normal. el: ', el);
        }
        arr_new.push(el);
    });
    var text_orig_new = arr_orig.join(' ').replace(/¬ /g,'¬');
    var text_marcas_new = arr_new.join(' ').replace(/¬ /g,'¬');
    //console.log('text_orig_new: ', text_orig_new);
    //console.log('text_marcas_new: ', text_marcas_new);
    return [text_orig_new, text_marcas_new];
}


function prepararTextMarcas(text_marcas){
    var arr_marcas_pre = text_marcas.split(' ');//de aki cojo las marcas;
    var arr_marcas_fin = [];
    var arr_parse = [];
    arr_marcas_pre.forEach((el_em, i_em, arr_em)=>{
        if( (el_em.match(/{|}/g) != null && el_em.match(/{|}/g).length / 2) > 3){
            el_em.split('}').forEach((el,u)=>{
                if(u < 3){
                    el = el +'}'; 
                    //console.log('el con llave: ', el); 
                    arr_parse.push(el);
                }else{ 
                    el = el.replace(/{/g,''); 
                    //console.log('--- el sin llave: ', el);
                    arr_parse.push(el);
                }
            }); 
            //console.log('arr_parse: ');
            //console.log(arr_parse);
            el_em = arr_parse.join('');
        }
        arr_marcas_fin.push(el_em);
    });
    var text_marcas_new = arr_marcas_fin.join(' ');
    //console.log('nuevo text_marcas_new: ');
    //console.log(text_marcas_new);
    return text_marcas_new;
}


function markRed(text_original, text_marcas){
    var arr_orig = text_original.split(' ');//aki luego meto '<b class="f_red">'
    var arr_marcas = text_marcas.split(' ');//de aki cojo las marcas
    var arr_parts_word_orig = [];
    //Recorrer palabras del texto
    arr_orig.forEach((el,i,arr_or)=>{
        //console.log(el);
        if(arr_marcas[i].includes('{') && arr_marcas[i].includes('}')){
            //si hay solo una parte marcada con '{}' Ejemplo: 
            //1. '...{RAPIDA}'
            if( (arr_marcas[i].match(/{|}/g).length / 2) == 1){//ok                   
                var position_start = arr_marcas[i].indexOf('{'); //3 //Starting position of the character to replace
                var position_end   = arr_marcas[i].indexOf('}'); //10 //Ending position of the character to replace  
                //console.log('1. position_start: ', position_start);
                //console.log('1. position_end: ', position_end);
                var word_new = el.substring(0,position_start) + 
                            '<b class="f_red">'+ el.substring(position_start,position_end-1) + '</b>' + 
                            el.substring(position_end-1, el.length);
                //console.log('word_new: ', word_new);
                //console.log(arr_marcas[i]);
                arr_orig[i] = word_new;
            }else{//si hay más de una parte marcada con '{}' Ejemplo: 
                //2. '...{RAPIDA}mente{Dios}' //hay 2
                //3. '...{RAPIDA}mente{Dios}...{PODEROSO}...' //hay 3
                //console.log(arr_marcas[i]);
                var count_marcas = arr_marcas[i].match(/{|}/g).length / 2;//ya que son pareja '{}'
                //divido palabra por el fin de marca '}'
                var arr_parts = arr_marcas[i].split('}');
                var arr_word_new = [];                
                //a cada parte si tiene '{' le añado '}'
                arr_parts.forEach((el,y,arry)=>{
                    if(el.includes('{')){
                        //console.log('el: ', el);
                        //console.log( y + '). el.length: ', el.length);
                        //saco todos los indexes de '{' y '}'
                        //2. '...{RAPIDA}mente{Dios}'
                        if( (arr_marcas[i].match(/{|}/g).length / 2) == 2){//ok
                            var position_start = el.indexOf('{');//3
                            var position_end   = el.length;//10 // no tiene '}' por eso el.length                                
                            //console.log(y+'). position_start: ', position_start);
                            //console.log(y+'). position_end: ', position_end);
                            if(y == 0){
                                var firstPart_or = arr_or[i].slice(0, position_end-1);//-1 por el '{'
                                var secondPart_or = arr_or[i].slice(position_end-1);
                                arr_parts_word_orig[0] = firstPart_or;
                                arr_parts_word_orig[1] = secondPart_or;
                                //console.log(y+'). firstPart_or: ', firstPart_or);
                                //console.log(y+'). secondPart_or: ', secondPart_or);
                            }                            
                            //primera parte
                            if(y == 0){    
                                var word_new = arr_parts_word_orig[y].substring(0,position_start) + 
                                        '<b class="f_red">'+ arr_parts_word_orig[y].substring(position_start,position_end-1) + '</b>' + 
                                        arr_parts_word_orig[y].substring(position_end, arr_parts_word_orig[y].length);
                            }
                            //segunda parte
                            if(y == 1){
                                var word_new = arr_parts_word_orig[y].substring(0,position_start) + 
                                        '<b class="f_red">'+ arr_parts_word_orig[y].substring(position_start,position_end-1) + '</b>' + 
                                        arr_parts_word_orig[y].substring(position_end-1, arr_parts_word_orig[y].length);
                            }
                        }
                        //3. '...{RAPIDA}mente{Dios}...{PODEROSO}...'
                        if( (arr_marcas[i].match(/{|}/g).length / 2) == 3){
                            var position_start = el.indexOf('{');//3
                            var position_end   = el.length;//10 // no tiene '}' por eso el.length
                            //console.log(y+'). position_start: ', position_start);
                            //console.log(y+'). position_end: ', position_end);
                            if(y == 0){
                                var position1_start = arr_marcas[i].indexOf('{', 0);
                                //console.log('position1_start: ', position1_start);
                                var position1_end   = arr_marcas[i].indexOf('}', position1_start);
                                //console.log('position1_end: ', position1_end);
                                var position2_start = arr_marcas[i].indexOf('{', position1_end);
                                //console.log('position2_start: ', position2_start);
                                var position2_end   = arr_marcas[i].indexOf('}', position2_start);
                                //console.log('position2_end: ', position2_end);
                                var position3_start = arr_marcas[i].indexOf('{', position2_end);
                                //console.log('position3_start: ', position3_start);
                                var position3_end   = arr_marcas[i].indexOf('}', position3_start);
                                //console.log('position3_end: ', position3_end);
                                var firstPart_or = arr_or[i].slice(0, position1_end-1);//'01234'
                                var secondPart_or = arr_or[i].slice(position1_end-1, position2_end-1-2);
                                var thirdPart_or = arr_or[i].slice(position2_end-1-2, arr_or[i].length);
                                //console.log(y+'). firstPart_or: ', firstPart_or);
                                //console.log(y+'). secondPart_or: ', secondPart_or);
                                //console.log(y+'). thirdPart_or: ', thirdPart_or);
                                arr_parts_word_orig[0] = firstPart_or;
                                arr_parts_word_orig[1] = secondPart_or;
                                arr_parts_word_orig[2] = thirdPart_or;
                            }
                            //primera parte
                            if(y == 0){    
                                var word_new = arr_parts_word_orig[y].substring(0,position_start) + 
                                        '<b class="f_red">'+ arr_parts_word_orig[y].substring(position_start,position_end-1) + '</b>' + 
                                        arr_parts_word_orig[y].substring(position_end, arr_parts_word_orig[y].length);
                            }
                            //segunda parte
                            if(y == 1){
                                var word_new = arr_parts_word_orig[y].substring(0,position_start) + 
                                        '<b class="f_red">'+ arr_parts_word_orig[y].substring(position_start,position_end-1) + '</b>' + 
                                        arr_parts_word_orig[y].substring(position_end-1, arr_parts_word_orig[y].length);
                            }
                            //tercera parte
                            if(y == 2){
                                var word_new = arr_parts_word_orig[y].substring(0,position_start) + 
                                        '<b class="f_red">'+ arr_parts_word_orig[y].substring(position_start,position_end-1) + '</b>' + 
                                        arr_parts_word_orig[y].substring(position_end-1, arr_parts_word_orig[y].length);
                            }
                        }
                        //console.log('word_new: ', word_new);
                        arr_word_new.push(word_new);
                        //console.log('arr_word_new: ', arr_word_new);
                    }
                });
                arr_orig[i] = arr_word_new.join('');
                //console.log('arr_orig[i]: ', arr_orig[i]);
            }//end else                 
        }

        if( (arr_marcas[i].includes('{') || arr_marcas[i].includes('}')) && arr_marcas[i].includes(' ')){

        }
    });
    //console.log('arr_orig');
    //console.log(arr_orig);
    //console.log(' ');
    //console.log('arr_marcas');
    //console.log(arr_marcas);
    //console.log(' ');
    //console.log('arr_parts_word_orig');
    //console.log(arr_parts_word_orig);
    //console.log(' ');
    var text_red = arr_orig.join(' ');
    return text_red;
}


/*
var a = [];
for (let index = 3251; index < 3304; index++) {
    const el = index;
    a.push(`<h4>${index}</h4>\n\r\ --- `);   
}
//console.log(a);
*/





