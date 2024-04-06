
//arr_books esta en  obj_books/arr_books_nrt.js


fnTextToJson('h2','h4','p');

function fnTextToJson(tagBook = null,tagChapter,tagVerse){

    //console.log('abajo arr_books');
    //console.log(arr_books);
    
    var bible = {};
   
    bible.type = "module";
    bible.BibleName = "(UA) Біблія у перекладі І. Огієнка";
    bible.BibleShortName = "Ukr_Ogi";
    bible.Bible = "Y";
    bible.OldTestament = "Y";
    bible.NewTestament = "Y";
    bible.Apocrypha = "N";
    bible.StrongNumbers = "N";
    bible.EnglishPsalms = "N";//нумерация Псалмов как в англ. версии
    bible.Greek = "N";//есть ли греческий текст
    bible.BookQty = 66;//количество книг
    bible.Notes = "N";//Примечания в тексте стиха.
    bible.NoteSign = "";//Знак "*" после которого идет примечание
    bible.StartNoteSign = "";// знак начала примечения
    bible.EndNoteSign = "";// знак окончания примечения
    bible.Titles = "N";//Огравления в тексте стиха
    bible.StartTitleSign = "";// знак начала оглавления
    bible.EndTitleSign = "";// знак окончания оглавления
    bible.Translation = "ukr_ogi";//короткое название перевода
    
    bible.Books = [];
    
    var count_b = 0;
    var count_ch = 0;
    
    Array.from(document.querySelector('#bible').children).forEach((el,i)=>{

        if(el.localName == tagBook){ //<h2>

            if(count_b < arr_books.length){
                    
                BookName = arr_books[count_b].FullName;
                //console.log(count_b+ ') FullName as BookName: '+BookName);
                    
                let BookId  = count_b + 1;

                bible.Books.push({
                    "BookName": BookName,
                    "ShortNames": arr_books[count_b].ShortNames,
                    "BookId": BookId,
                    "Chapters": []
                });
                //console.log(bible.Books);
                
                count_b++;
                count_ch = 0;           
            }
        }
    
        if(el.localName == tagChapter){//<h4>
            let ChapterId  = count_ch + 1;
            count_ch++;
    
            bible.Books[count_b-1].Chapters.push({
                "ChapterId": ChapterId,
                "ChapterText": el.innerText,
                "Verses": []
            });
            //console.log('count_b: '+count_b);
            //console.log('count_ch: '+count_ch);
            //console.log(`abajo bible.Books[${count_b-1}].Chapters: `);
            //console.log(bible.Books[count_b-1].Chapters);
        }
    
        if(el.localName == tagVerse){//<p>
            let arr = el.innerText.split(' ');
            let arr_t = [];
    
            arr.forEach((el,i)=>{ 
                if(i != 0){ 
                    arr_t.push(arr[i]);
                    //console.log(i);
                }                
            });
            //console.log('count_ch: '+count_ch);
            //console.log(bible.Books[count_b-1].Chapters[count_ch]);
    
            bible.Books[count_b-1].Chapters[count_ch-1].Verses.push({
                "VerseId": arr[0],
                "Text": arr_t.join(' ')
            });
            //console.log(bible.Books[count_b-1].Chapters[count_ch-1].Verses);
        }
    
    
    });
    
    
    //console.log(bible);  
    return bible;      
}


