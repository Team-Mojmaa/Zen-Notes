"use strict"
const createButton = document.getElementById('add-new');
// const noteInput = document.getElementById('note-list');


// const addedNotes = document.getElementsByClassName('added-notes');

let notesList = [];
let counter = 0;
console.log("step1: global var notesList,counter:",notesList,counter)

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
    console.log('step3(i):noteslist inside displayNewNoteInCardsView():',notesList)
    console.log('step3(i):currentnote inside displayNewNoteInCardsView():',currentNote)
    // create New HTML for pushing currentNote
    let newCard = document.createElement('section');
    newCard.innerHTML += `<div class="new-card" id=`+currentNote.idHash+`>
    <h2>Title</h2>
    <p id="title`+currentNote.idHash+`">`+currentNote.title+`</p>
    <h2>Description</h2>
    <p id="desc`+currentNote.idHash+`">`+currentNote.description+`</p>
    </div>`;
    notesListView.appendChild(newCard); //visible on body
    console.log('step3(ii): display of currentNote on boday with idHash: ',currentNote.idHash)
    displayNewNote = true;
    console.log("radhika - test seperate functions: +"+displayNewNote);
    console.log("here!!!!!!")
    
}


function popUpUpdate(event){
    let idOfCurrentNote = Number(event.target.id);
    console.log("idOfCurrentNote from popUpUpdate",idOfCurrentNote);
    for (let note of notesList) {
        console.log("inside notesList array of popUpUpdate")
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
            <input type="hidden" value="`+note.idHash+`">
            <div id="format-options-View">
                <button id="bold-btn-View">Bold</button>
                <button id="underline-btn-View">Underline</button>
                <button id="copy-btn-View">Copy</button>
                <button id="copy-all-btn-View">Copy All</button>
            </div>`;
            // display pop-up  
            // if plan to add delete button - take it from here
            // <button id="delete-btn-View">Delete</button></div>
            document.body.appendChild(popUpView);
            // functionality of bold/underline/copy
            // edit in note object
            console.log("popUpvIEW displayed")

            const boldBtnView = document.getElementById("bold-btn-View");
            const underlineBtnView = document.getElementById("underline-btn-View");
            const copyBtnView = document.getElementById("copy-btn-View");
            const updateBtn = document.getElementById("update-btn");
            const closeBtnView = document.getElementById("close-btn-View");
            const copyAllViewBtn = document.getElementById("copy-all-btn-View");
            boldBtnView.addEventListener('click', ()=>{
                document.execCommand('bold');
                var text = document.getElementById('descView').innerHTML;
                
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
            

            updateBtn.addEventListener('click', ()=>{
                var text = document.getElementById('descView').innerHTML;
                var titleText = document.getElementById('titleView').value;
                
                note.description = text;
                // updating altered note in notesList array
                for (let noteObject of notesList){
                    if (noteObject.idHash == note.idHash ){
                        console.log("from inside the loop of.... updating altered note in notesList array ");
                        noteObject.description = text;
                        noteObject.title = titleText;
                    }
                }   
                //delete prev with same id
                // console.log('test by akash - '+popUpView);
                // if(popUpView){
                    // console.log('test by akash - '+popUpView);
                console.log("!!!!!printing notesList array after popViewClose and array update:",notesList);
                document.body.removeChild(popUpView);
                // }
                
                let elem = document.getElementById(note.idHash);
                let titleElem = elem.querySelector('#title'+note.idHash);
                let descElem = elem.querySelector('#desc'+note.idHash);

                console.log("VVIMP radhika/checkk:===> "+titleElem+" "+descElem);
                descElem.innerHTML = text;
                titleElem.innerHTML = note.title;
                // if(elem)
                // notesListView.removeChild(elem);
                
                // displayNewNoteInCardsView();
                
            });             
        } 
    }
}
// Add event listener on all cards inpedenpendant of any other function
document.addEventListener( "click", cardsClickListener);


function cardsClickListener(event) {
    // if card clicked has a class of "new-card" then call popUpUpdate(event)
    var element = event.target;
    if (element.tagName == 'DIV' && element.classList.contains("new-card")){
        console.log("hi!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
        popUpUpdate(event);
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
    console.log('step2(i): print counter on every + button click: ',counter)
    let note = {
        idHash: counter,
        title: "",
        description: "", 
        
    }
    console.log('step2(ii): print note object on every + button click: ',note)

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
    console.log('step2(iii): popupwindow display- note.title and desc should be blank ',note.title,note.description)

    // button functions of pop-up window
    // button functions
    const boldBtn = document.getElementById('bold-btn');
    const underlineBtn = document.getElementById('underline-btn');
    const copyBtn = document.getElementById('copy-btn');
    const addData = document.getElementById('add-btn');
    const cancelBtn = document.getElementById('close-btn');
    const clearData = document.getElementById('delete-btn');
    const copyAll = document.getElementById('copy-all-btn');

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
        console.log('step2(iv): print counter on every addNote button click: ',counter)
        console.log("dc:",document.body)
        // console.log("title${note.idHash}",title+ ${note.idHash});
        let title = document.getElementById("title").value;
        let desc = document.getElementById("desc").innerHTML;
        console.log('step2(v):title from addData:',title);
        console.log('step2(v):desc from addData:',desc);
        if ((title.length > 0) && (desc.length > 0)) {
            note.title = title;
            note.description = desc;
            // Add note to array
            notesList.push(note);
            console.log("step2(vi):notesList array from addData",notesList);

            //appending new note in notes-list section 
            // make changes in note object for bold/underline part before appending it to new section!!!!!!!!
            // appendNewNoteToSection(note)
            document.body.removeChild(newElement);
            console.log('step2(vi):popup window closed and displayNewNoteInCardsView() invoked');
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


// //add a eventListener for div
// let divs = document.getElementsByTagName('div');

// for(let aDiv of divs){
//     divs.addEventListener('click', (e)=>{
//         console.log(e, aDiv);
//     });
// }




//     function appendNewNoteToSection(note) {
//          //for unique id everytime for every notes

//         let noteSection = document.getElementById('notes-list');
//         let newCard = document.createElement('div');
//         newCard.classList.add('added-notes');
//         newCard.classList.add('note-'+counter);

//         let idForButton = "btn-"+counter; //for unique id for button everytime for every notes

//         newCard.innerHTML = 
//         "<h1>"+note.title+"</h2>"+
//         "<p>"+note.description+"</p>"+
//         "<input type="+"hidden"+" value="+note.idHash+">"+
//         // `<button id="delete-btn">`+"delete"+"</button>";
//         "<button id='"+idForButton+"'>"+" Delete </button>";
//         console.log(newCard);
//         noteSection.appendChild(newCard);
        
        
        
//         // console.log(notesList);
//         // console.log("note-"+idHash.toString())
//  //        cardDelete = document.getElementById("note-"+idHash.toString());
//  //        console.log(cardDelete);
//  //        const deleteButton = document.querySelector('#delete-btn-'+idHash.toString());
//  //        deleteButton.addEventListener('click', () => {noteSection. removeChild(cardDelete);})
//     }





// function textSelection() {
//     let desc = document.getElementById('desc');
//     let descHTML = desc.innerHTML;
//     let selectionStart = 0;
//     let selectionEnd = 0;
//     if (desc.selectionStart) {
//         selectionStart = desc.selectionStart;
//     }
//     if (desc.selectionEnd) {
//         selectionEnd = desc.selectionEnd;
//     }
//     console.log("start_index:",selectionStart);
//     console.log("end_index:",selectionEnd);

//     return [selectionStart,selectionEnd]
    
    
//     // if (selectionStart != selectionEnd) {
//     //     var editorCharArray = editorHTML.split("");
//     //     editorCharArray.splice(selectionEnd, 0, "</b>");
//     //     editorCharArray.splice(selectionStart, 0, "<b>"); //must do End first
//     //     editorHTML = editorCharArray.join("");
//     //     editor.innerHTML = editorHTML;
//     // }


// // let selectedText = '';
// // // window.getSelection
// // let wSelectedObject = window.getSelection();
// // let dSelectedObject = document.getSelection();

// // let existingObject = wSelectedObject != null ? wSelectedObject : dSelectedObject;
// // console.log("existing:",existingObject);
// // if (existingObject) {
// //     // console.log("dcument selection:",existingObject);
// //     var start_index = existingObject.anchorOffset;
// //     var end_index = existingObject.focusOffset;
// //     if (start_index >= 0 && end_index >= 0){
// //         console.log("start: " + start_index);
// //         console.log("end: " + end_index);
// //     }
// //     selectedText = existingObject.toString().trim();
// //     console.log("I am selected text: ", selectedText);
// // }

// //     var range = selection.getRangeAt(0);
// // var start = range.startOffset;
// // var end = range.endOffset;

// // document.selection
// // else if (document.selection) {
// //     selectedText = 
// //     document.selection.createRange().text;
// // } 
// // return selectedText;
// }



    //     // bold button
    // boldBtn.addEventListener('click', () => {
    //     let selectedIndexArray = textSelection();
    //     // save bold array indexes in object 
        
    //     // alter html elements from this function
    //     // show changes in current screen



    //     // let selectText = textSelection()
    //     // console.log(selectText)
    //     // if(selectText.style.fontWeight == "bold"){
    //     //     selectText.style.fontWeight = "normal";
    //     //     }
    //     //     else{
    //     //     selectText.style.fontWeight = "bold";
    //     //     }
    // });

    // // underline button
    // underlineBtn.addEventListener('click', () => {

    //     if(document.getElementById("desc").style.textDecoration == "underline"){
    //     document.getElementById("desc").style.textDecoration = "none";
    //     }
        
    //     else{
    //     document.getElementById("desc").style.textDecoration = "underline";
    //     }
    // });

    // // copy button
    // copyBtn.addEventListener('click', () => {
    //     document.getElementById("desc").select();
    //     document.execCommand("copy");
    // });

    // document.getElementById('bold-btn').addEventListener("click", function(){
    //     note.bold = true;
    // });

    // document.getElementById('underline-btn').addEventListener("click", function(){
    //     note.underline = true;
    // });

    // Logic for bold and underline
    // function 1. write bold and underline text after click of button
    // function 2. grab selected text on button click and apply changes
    // saving it for later review again in note object: note.bold = "string selected"
    //


    // document.getElementById('copy-btn').addEventListener("click", function(){
    //     note.copy = true;
    // });


// document.addEventListener("DOMContentLoaded", function(){
    // document.getElementById('bold-btn').addEventListener("click", function(){
    //     note.bold = true;
    // });
    
    // document.getElementById('underline-btn').addEventListener("click", function(){
    //     note.underline = true;
    // });
    
    // document.getElementById('copy-btn').addEventListener("click", function(){
    //     note.copy = true;
    // });
    
    // addData.addEventListener('click', () => {
    //     const title = document.getElementById('title').value;
    //     const desc = document.getElementById('desc').value;
    //     note.title = title;
    //     note.description = desc;
    
    //     notesList.push(note);
    
    //     console.log(notesList);
    // });
    
// });





/// /UI UPDATES////
// Function: Create new note in UI
// function addNoteToList(note) {
//     const newUINote = document.createElement('div');
//     newUINote.classList.add('note');
//     newUINote.innerHTML = `
//       <span hidden>${note.id}</span>
//       <h2 class="note__title">${note.title}</h2>
//       <p class="note__body">${note.body}</p>
//                                     <div class="note__btns">
//                                         <button class="note__btn note__view">View Detail</button>
//                                         <button class="note__btn note__delete">Delete Note</button>
//                                     </div>
//     `;
//     noteContainer.appendChild(newUINote);
//   }
