"use strict"

const createButton = document.getElementById('add-new');
// const noteInput = document.getElementById('note-list');


// const addedNotes = document.getElementsByClassName('added-notes');

let notesList = [];
let counter = 0;
// console.log("step1: global var notesList,counter:",notesList,counter)

// I. function-1 : click on + and pop-window of new note
// I. function-2: i. added details of new note / ii. bold / iii. underline.....in object note and pop-window close

// II. function-3: apendingNewNoteTosection ???? display notesList as newcards! displayNewNoteInCardsView()!
// II. function-4: click on any note with an id and fetch data from note object and display on new-pop window
let displayNewNote = false;

function displayNewNoteInCardsView() {
    // II. function-3: show title and desc of each note card on window
    let notesListView = document.getElementById("notes-list");
    // Display current pushed note object in <main id="notes-list">
    let currentNote = notesList[notesList.length - 1];
    // for(let note of notesList){
    // console.log('step3(i):noteslist inside displayNewNoteInCardsView():',notesList)
    // console.log('step3(i):currentnote inside displayNewNoteInCardsView():',currentNote)
    // create New HTML for pushing currentNote
    let newCard = document.createElement('section');
    newCard.classList.add("section-"+currentNote.idHash);
    // console.log("printing addnew cards unique class:","section-"+currentNote.idHash )
    newCard.innerHTML += `<div class="new-card" id=`+currentNote.idHash+`>
    
    <h3 id="title`+currentNote.idHash+`" class="overflow-title">`+currentNote.title+`</h3>
    
    <p id="desc`+currentNote.idHash+`" class="overflow-desc">`+currentNote.description+`</p>
    </div>`;
    notesListView.appendChild(newCard); //visible on body
    // console.log('step3(ii): display of currentNote on boday with idHash: ',currentNote.idHash)
    displayNewNote = true;
    // console.log("radhika - test seperate functions: +"+displayNewNote);
    // console.log("here!!!!!!")
    
}


function popUpUpdate(eventTarget){
    let idOfCurrentNote = Number(eventTarget.id);
    // console.log("idOfCurrentNote from popUpUpdate",idOfCurrentNote);
    for (let note of notesList) {
        // console.log("inside notesList array of popUpUpdate")
        if (note.idHash === idOfCurrentNote) {
            let popUpView = document.createElement('div');
            popUpView.innerHTML = `<button id="close-btn-View" class="popup-edit-close-btn">&times;</button>
            <div class="view-card">
            <div class="popup-update">
            <label for="titleView">Title</label>
            <input type="text" name="titleView" id="titleView" value=`+note.title+`>
            <label for="descView">Description</label>
            <div name="descView" id="descView" col="20" rows="10"div contenteditable="true" role="textbox" name="desc" id="desc" col="20" rows="10" class="desc-box">`+note.description+`</div>
            <button id="update-btn">Update Note</button>
            <div id="format-options-View">
                <button id="bold-btn-View">Bold</button>
                <button id="underline-btn-View">Underline</button>
                <button id="copy-btn-View">Copy <i class="fa-solid fa-copy"></i></button>
                <button id="copy-all-btn-View">Copy All</button>
                <button id="delete-btn-View">Delete</button>
                
            </div>
            <input type="hidden" value="`+note.idHash+`">`;

            
            // display pop-up  
            // if plan to add delete button - take it from here
            // <button id="delete-btn-View">Delete</button></div>
            document.body.appendChild(popUpView);
            // functionality of bold/underline/copy
            // edit in note object
            // console.log("popUpvIEW displayed")

            const boldBtnView = document.getElementById("bold-btn-View");
            const underlineBtnView = document.getElementById("underline-btn-View");
            const copyBtnView = document.getElementById("copy-btn-View");
            const updateBtn = document.getElementById("update-btn");
            const closeBtnView = document.getElementById("close-btn-View");
            const copyAllViewBtn = document.getElementById("copy-all-btn-View");
            const deleteBtn = document.getElementById("delete-btn-View");
            

            boldBtnView.addEventListener('click', ()=>{
                document.execCommand('bold');
                var text = document.getElementById('descView').innerHTML;
                
            });

            let titleViewDiv = document.getElementById("titleView");
            titleViewDiv.addEventListener('paste', (event) => {
                // alert("Paste is not allowed here!");
                return;
            
                let paste = (event.clipboardData || window.clipboardData).getData('text');
                // console.log('paste object: ',paste)
                // console.log('paste object: ',paste)
                let HTMLerror = false;
                for (let i=0; i<paste.length;i++){
                    if (paste[i] === '<' || paste[i] === '>'){
                        alert("Special Characters < and > are not allowed values")
                        HTMLerror = true;
                        break;
                    }
                }
                if (HTMLerror === false) {
                    const selection = window.getSelection();
                    if (!selection.rangeCount) return;
                    selection.deleteFromDocument();
                    selection.getRangeAt(0).insertNode(document.createTextNode(paste));
                }

            });

            let descViewDiv = document.getElementById("descView");
            descViewDiv.addEventListener('paste', (event) => {
                event.preventDefault();
            
                let paste = (event.clipboardData || window.clipboardData).getData('text');
                // console.log('paste object: ',paste)
                // console.log('paste object: ',paste)
                let HTMLerror = false;
                for (let i=0; i<paste.length;i++){
                    if (paste[i] === '<' || paste[i] === '>'){
                        alert("Special Characters < and > are not allowed values")
                        HTMLerror = true;
                        break;
                    }
                }
                if (HTMLerror === false) {
                    const selection = window.getSelection();
                    if (!selection.rangeCount) return;
                    selection.deleteFromDocument();
                    selection.getRangeAt(0).insertNode(document.createTextNode(paste));
                }

            });

            copyAllViewBtn.addEventListener('click', () => {
                var range = document.createRange();
                range.selectNode(document.getElementById("descView"));
                window.getSelection().removeAllRanges(); // clear current selection
                window.getSelection().addRange(range); // to select text
                document.execCommand("copy");
                window.getSelection().removeAllRanges();// to deselect
                alert("Description copied to clipboard!");
                
            });
        
            underlineBtnView.addEventListener('click', ()=>{
                document.execCommand('underline');
                var text = document.getElementById('descView').innerHTML;
                
            });
        
            copyBtnView.addEventListener('click', ()=>{
                document.execCommand('copy');
                var text = document.getElementById('descView').innerHTML;
                // var titleText = document.getElementById('titleView').value;
                
            });

            closeBtnView.addEventListener('click', ()=>{ 
                document.body.removeChild(popUpView);
            });


            deleteBtn.addEventListener('click', ()=>{
                let userChoice = prompt("Are you sure you want to delete Note?", 'Yes');
                // if userChoice is No,return, else delete Note 
                if(userChoice != 'Yes'){
                    // console.log('user selected no delete')
                    return;
                }
                // console.log('user selected yes delete')

                // for (let noteObject of notesList){
                //     if (noteObject.idHash == note.idHash ){
                //         console.log("from inside the loop of.... deleting note in array in notesList array ");
                //         noteObject.description = text;
                //         noteObject.title = titleText;
                //     }
                // }   
                // deleting note in notesList array
                // find index of current note
                let indexOfCurrentNote = notesList.indexOf(note);
                // console.log('index of note to delete', indexOfCurrentNote)
                if (indexOfCurrentNote > -1) { // only splice array when item is found
                    notesList.splice(indexOfCurrentNote, 1); // 2nd parameter means remove one item only
                  }

                
                // deleting note in HTML display section > div with ID - note.idHash
                // console.log('consoling queryselector below: ')
                // console.log('section #' + note.idHash)
                // var elementSection = document.querySelector('#' + note.idHash); // will return element
                
                
                // document.querySelector('#\\31 ');

                // working code with div removal
                // newCard.classList.add("section-"+note.idHash);
                let noteIdString = note.idHash.toString();
                
                var elementSection = document.getElementsByClassName("section-"+noteIdString)[0];
                // console.log('consoling queryselector below: ')
                // console.log("section-"+noteIdString)
                elementSection.parentNode.removeChild(elementSection); // will remove the element from DOM

                // Removing PopUpWindow
                document.body.removeChild(popUpView);
                // console.log("!!!!!printing notesList array after deleting note:",notesList);


            });
            

            updateBtn.addEventListener('click', ()=>{
                var text = document.getElementById('descView').innerHTML;
                var titleText = document.getElementById('titleView').value;

                if (( text.length === 0) && (titleText.length === 0)){
                    alert("Please enter Title and Description");
                } else if (titleText.length === 0){
                    alert("Please enter Title for the note");
                } else if (text.length === 0) {
                    alert("Please enter Description for the note");
                } else {
                    note.description = text;
                    // updating altered note in notesList array
                    for (let noteObject of notesList){
                        if (noteObject.idHash == note.idHash ){
                            // console.log("from inside the loop of.... updating altered note in notesList array ");
                            noteObject.description = text;
                            noteObject.title = titleText;
                        }
                    }   
                    //delete prev with same id
                    // console.log('test by akash - '+popUpView);
                    // if(popUpView){
                        // console.log('test by akash - '+popUpView);
                    // console.log("!!!!!printing notesList array after popViewClose and array update:",notesList);
                    document.body.removeChild(popUpView);
                    // }
                    
                    let elem = document.getElementById(note.idHash);
                    let titleElem = elem.querySelector('#title'+note.idHash);
                    let descElem = elem.querySelector('#desc'+note.idHash);

                    // console.log("VVIMP radhika/checkk:===> "+titleElem+" "+descElem);
                    descElem.innerHTML = text;
                    titleElem.innerHTML = note.title;
                    // if(elem)
                    // notesListView.removeChild(elem);
                    
                    // displayNewNoteInCardsView();
                    
                }
                
            
            });             
        } 
    }
}
// Add event listener on all cards inpedenpendant of any other function
document.addEventListener( "click", cardsClickListener);


function cardsClickListener(event) {
    // if card clicked has a class of "new-card" then call popUpUpdate(event)
    var element = event.target;
    var parentDivsArray = document.getElementsByClassName("new-card")
    // If element itself is new-card or element is descendant of new-card, trigger pop-up event
    if (element.tagName == 'DIV' && element.classList.contains("new-card")){
        // console.log("hi!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
        popUpUpdate(event.target);
    } else {
        for (let parentDiv of parentDivsArray) {
            if (parentDiv.contains(event.target)){
                // console.log("triggered parent")
                popUpUpdate(parentDiv);
            }
        }
    }
    
    // on click of window - give a new function of display particular card in pop-up window
    // const allCards = document.getElementsByClassName("new-card");
        
    // for(let aCard of allCards){
    //     aCard.addEventListener('click', 
    //          //update note
                

    //     );
    // }

}


 // const oldUpdateCard = document.getElementsByClassName("add-card");    
    // oldUpdateCard.addEventListener('click', popUpViewCard)

createButton.addEventListener('click', () => {
    // function-1: creates a pop-up window and generates and returns its id-hash
    counter++;
    // console.log('step2(i): print counter on every + button click: ',counter)
    let note = {
        idHash: counter,
        title: "",
        description: "", 
        
    }
    // console.log('step2(ii): print note object on every + button click: ',note)

    // for(let notes of notesList){
    //     console.log(notes)
    // }


    let newElement = document.createElement('div');
{/* <input type="text" name="title" id="title+`+note.idHash+`"> */}
    newElement.innerHTML += `<button id="close-btn" class="close-window-popup-add">&times;</button>
    <div class="add-card">
    <div class="popup-container">
    <label for="title">Title</label>
    <input type="text" name="title" id="title">
    <label for="desc">Description</label>
    <div contenteditable="true" role="textbox" name="desc" id="desc" col="20" rows="10" class="desc-box"></div>
    <button id="add-btn" class="add-btn">Add Note</button>
    <input type="hidden" value="`+note.idHash+`">
    <div id="format-options">
        <button id="bold-btn">Bold</button>
        <button id="underline-btn">Underline</button>
        <button id="copy-btn">Copy</button>
        <button id="copy-all-btn">Copy All</button>
        <button id="delete-btn">Clear</button></div>
    </div>
    </div>`;
    
    // display pop-up
    document.body.appendChild(newElement);
    // console.log('step2(iii): popupwindow display- note.title and desc should be blank ',note.title,note.description)

    // button functions of pop-up window
    // button functions
    const boldBtn = document.getElementById('bold-btn');
    const underlineBtn = document.getElementById('underline-btn');
    const copyBtn = document.getElementById('copy-btn');
    const addData = document.getElementById('add-btn');
    const cancelBtn = document.getElementById('close-btn');
    const clearData = document.getElementById('delete-btn');
    const copyAll = document.getElementById('copy-all-btn');
    const titleInput = document.getElementById('title');
    
    

    // copy All button
    copyAll.addEventListener('click', () => {
        var range = document.createRange();
        range.selectNode(document.getElementById("desc"));
        window.getSelection().removeAllRanges(); // clear current selection
        window.getSelection().addRange(range); // to select text
        document.execCommand("copy");
        window.getSelection().removeAllRanges();// to deselect
        alert("Description copied to clipboard!");
    });

    // cancel button function-2(i)
    cancelBtn.addEventListener('click', () => {
        document.body.removeChild(newElement);
    });

    // clear button function-2(ii)
    clearData.addEventListener('click', () => {
        let userChoice = prompt("Are you sure Buddy?", 'Yes');

        if(userChoice != 'Yes'){
            return;
        }
        
        document.getElementById("title").value = "";
        document.getElementById("desc").innerText = "";
    });

    // let titleDiv = document.getElementById("title");
    // titleDiv.addEventListener('paste', (event) => {
    //             event.preventDefault();
    //             alert("This action is not allowed here!");
    //             return;
            
    //             let paste = (event.clipboardData || window.clipboardData).getData('text');
    //             // console.log('paste object: ',paste)
    //             // console.log('paste object: ',paste)
    //             let HTMLerror = false;
    //             for (let i=0; i<paste.length;i++){
    //                 if (paste[i] === '<' || paste[i] === '>'){
    //                     alert("Special Characters < and > are not allowed values")
    //                     HTMLerror = true;
    //                     break;
    //                 }
    //             }
    //             if (HTMLerror === false) {
    //                 const selection = window.getSelection();
    //                 if (!selection.rangeCount) return;
    //                 selection.deleteFromDocument();
    //                 selection.getRangeAt(0).insertNode(document.createTextNode(paste));
    //             }

    // });

    let titleDiv = document.getElementById("title");
            titleDiv.addEventListener('paste', (event) => {
                // alert("Paste is not allowed here!");
                return;
            
                let paste = (event.clipboardData || window.clipboardData).getData('text');
                // console.log('paste object: ',paste)
                // console.log('paste object: ',paste)
                let HTMLerror = false;
                for (let i=0; i<paste.length;i++){
                    if (paste[i] === '<' || paste[i] === '>'){
                        alert("Special Characters < and > are not allowed values")
                        HTMLerror = true;
                        break;
                    }
                }
                if (HTMLerror === false) {
                    const selection = window.getSelection();
                    if (!selection.rangeCount) return;
                    selection.deleteFromDocument();
                    selection.getRangeAt(0).insertNode(document.createTextNode(paste));
                }

            });

    let descDiv = document.getElementById("desc");
    descDiv.addEventListener('paste', (event) => {
        event.preventDefault();
    
        let paste = (event.clipboardData || window.clipboardData).getData('text');
        // console.log('paste object: ',paste)
        // console.log('paste object: ',paste)
        let HTMLerror = false;
        for (let i=0; i<paste.length;i++){
            if (paste[i] === '<' || paste[i] === '>'){
                alert("Special Characters < and > are not allowed values")
                HTMLerror = true;
                break;
            }
        }
        if (HTMLerror === false) {
            const selection = window.getSelection();
            if (!selection.rangeCount) return;
            selection.deleteFromDocument();
            selection.getRangeAt(0).insertNode(document.createTextNode(paste));
        }
    });

    // push bold, underline, copy data here later after figuring out selection and html part!!!!!!!!!!
    // function textSelection() {
    //         let desc = document.getElementById('desc');
            
    //         // let selectionStart = 0;
    //         // let selectionEnd = 0;
    //         // if (desc.selectionStart) {
    //         //     selectionStart = desc.selectionStart;
    //         // }
    //         // if (desc.selectionEnd) {
    //         //     selectionEnd = desc.selectionEnd;
    //         // }
    //         // console.log("start_index:",selectionStart);
    //         // console.log("end_index:",selectionEnd);
        
    //         // return [selectionStart,selectionEnd]
    //         var selection = window.getSelection();
    //         var start = selection.anchorOffset;
    //         var end = selection.focusOffset;
    //         return [start,end]
    // }
    
    // boldBtn.addEventListener('click', ()=>{
    //     console.log("text-selection", textSelection());
    //     let selectionIndexes = textSelection();
    //     start_index = selectionIndexes[0];
    //     end_index = selectionIndexes[1];
    //     difference = end_index - start_index;
    //     let descContent = document.getElementById('desc').value;
    //     console.log("descContent: "+descContent)

    //     // let contentBefore = "";
    //     // let contentAfter = "";
    //     // let startAdding = false;
    //     // let selectedText = '';

    //     // const len = descContent.length(); errror!
        
    //     // for(let i = 0; i<len; i++){
    //     //     console.log(i+" "+descContent[i]);
    //     //     // increment strong between '<' and '>' to ignore html tags
    //     //     if(descContent[i] == '<'){
    //     //         while(i < descContent.length() && descContent[i] != '>'){
    //     //             i++;
    //     //         }
    //     //     }

    //     //     if(i >= len)
    //     //         break;
            
    //     //     let currentChar = descContent[i];
            
    //     //     if (i === startIndex) {
    //     //         startAdding = true;
    //     //     }

    //     //     if(startAdding){
    //     //         selectedText += currentChar;
    //     //     }

    //     //     if(selectedText.length() == difference){
    //     //         startAdding = false;
    //     //     }

    //     // }

    //     // loop through descContent to add <strong> and </strong> around startIndex and endIndex
    //     // when we find startIndex-1, we can insert <strong>
    //     // when we find endIndex+1, append </strong>
    //     console.log("object of description input area",document.getElementById('desc'))
    //     let descHTML = document.getElementById('desc').innerHTML;
    //     const lenInnerHTML = descHTML.length;
    //     console.log("descHTML::",descHTML);
    //     console.log("start_index,end_index::",start_index,end_index);
    //     console.log("length of descHTML::",lenInnerHTML)
    //     contentBeforeStartTag = descHTML.slice(0,start_index)
    //     contentBetween = descHTML.slice(start_index,end_index+1)
    //     contentAfterEndTag = descHTML.slice(end_index+1, lenInnerHTML)
    //     desc.innerHTML = contentBeforeStartTag +`<strong>`+contentBetween +`</strong>`+contentAfterEndTag;
    //         // for(let i = 0; i<=len; i++){
    //         //     if (i == start_index - 1){
    //         //         desc.innerHTML +=`<strong>`
    //         //     }
    //         //     if (i == (end_index + 1)) {
    //         //         desc.innerHTML +=`</strong>`
    //         //     }
    //         // }



    // });

    // $('#textarea').keyup(function() {
    //     $('#textarea-show').html($(this).text());
    //   });

    boldBtn.addEventListener('click', ()=>{
        document.execCommand('bold');
        var text = document.getElementById('desc').innerHTML;
        // $('#desc').html(text);
    });

    underlineBtn.addEventListener('click', ()=>{
        document.execCommand('underline');
        var text = document.getElementById('desc').innerHTML;
        // $('#desc').html(text);
    });

    copyBtn.addEventListener('click', ()=>{
        document.execCommand('copy');
        var text = document.getElementById('desc').innerHTML;
        // var titleText = document.getElementById('titleText').innerHTML;
        // $('#desc').html(text);
    });
   
    //   $('#boldBtn').on('click', function() {
    //     document.execCommand('bold');
    //     var text = document.getElementById('desc').innerHTML;
    //     $('#desc').html(text);
    //   });


    //   $('#italic_btn').on('click', function() {
    //     document.execCommand('italic');
    //     var text = document.getElementById('textarea').innerHTML;
    //     $('#textarea-show').html(text);
    //   });
      
    //   $('#underlineBtn').on('click', ()=> {
    //       document.execCommand('underline');
    //     var text = document.getElementById('textarea').innerHTML;
    //     $('#textarea-show').html(text);
    //   });

    //   $('#copyBtn').on('click', ()=> {
    //     document.execCommand('copy');
    //   var text = document.getElementById('textarea').innerHTML;
    //   $('#textarea-show').html(text);
    // });


        

    addData.addEventListener('click', () => {
        // function-2(main): add details of new note
        // console.log('step2(iv): print counter on every addNote button click: ',counter)
        // console.log("dc:",document.body)
        // console.log("title${note.idHash}",title+ ${note.idHash});
        let title = document.getElementById("title").value;
        let desc = document.getElementById("desc").innerHTML;
        // console.log('step2(v):title from addData:',title);
        // console.log('step2(v):desc from addData:',desc);
        if ((title.length > 0) && (desc.length > 0)) {
            note.title = title;
            note.description = desc;
            // Add note to array
            notesList.push(note);
            // console.log("step2(vi):notesList array from addData",notesList);

            //appending new note in notes-list section 
            // make changes in note object for bold/underline part before appending it to new section!!!!!!!!
            // appendNewNoteToSection(note)
            document.body.removeChild(newElement);
            // console.log('step2(vi):popup window closed and displayNewNoteInCardsView() invoked');
            // displayNewNoteInCardsView()
            displayNewNoteInCardsView()
            
        }
        else if (( title.length === 0) && (desc.length === 0)){
            alert("Please enter Title and Description")
        } else if (title.length === 0){
            alert("Please enter Title for the note")
        } else {
            alert("Please enter Description for the note")
        }
    });
    
});

const colorThemes = [[`rgb(22, 33, 62)`, `rgb(15, 52, 96)`, `#B1B2FF`, `rgb(233, 69, 96)`, `rgb(22 33 62/0.8)`], ['rgb(240, 245, 249)', 'rgb(201, 214, 223)', 'rgb(82, 97, 107)', '#0F4C75', 'rgba(240 245 249/0.8)'], ['#1E2022', '#0D7377', '#C9D6DF', '#F0F5F9', 'rgba(30 32 34/0.8)'], ['rgb(48, 45, 45)', 'rgb(213, 0, 138)', 'rgb(234, 255, 208)', 'rgb(240, 245, 249)', 'rgb(243 129 129/0.8)']];

let colorIndex = 0;
// theme change functionality
const themeChangeButton = document.getElementById('theme-change');
let root = document.querySelector(':root');
//listening to themeChange button click event
themeChangeButton.addEventListener('click', ()=>{

    if(colorIndex == colorThemes.length)
        colorIndex = 0;

    const combination = colorThemes[colorIndex];
    colorIndex++;
    // console.log("akash's TESTING:- "+combination);
    root.style.setProperty("--primary-color", combination[0]);
    root.style.setProperty("--secondary-color", combination[1]);
    root.style.setProperty("--third-color", combination[2]);
    root.style.setProperty("--text-color", combination[3]);
    // have to make transparent bg from primary bg
    root.style.setProperty("--transparent-bg", combination[4]);
});