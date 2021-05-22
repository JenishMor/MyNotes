console.log('This is MyNotes website');
showNotes();

let addBtn = document.getElementById('addBtn');
addBtn.addEventListener('click', function (e) {
    let addTxt = document.getElementById('addTxt');
    let addTitle = document.getElementById('addTitle');
    let notes = localStorage.getItem('notes');      //We take note in local storage

    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    
    let myObj = {
        title: addTitle.value,
        text: addTxt.value
    }

    notesObj.push(myObj);                                    //push value of textarea in notesObj
    localStorage.setItem('notes', JSON.stringify(notesObj));        //Set notes in local storage
    addTxt.value = "";                                          //When we add some txt and click on add note textarea is blank
    addTitle.value = ""; 

    showNotes();        //showNotes function is call when we click on add note
})


function showNotes() {
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);           //notes is contain in notesObj on form of object
    }

    let html = "";

    notesObj.forEach(function (element, index) {
        html += `<div class="noteCard my-2 mx-2 card" style="width: 18rem;">
                        <div class="card-body">
                            <h5 class="card-title">${index + 1}. ${element.title}</h5>
                            
                            <p class="card-text">${element.text}</p>
                            <button id="${index}" onclick="deleteNote(this.id)" class="btn">Delete Note</button>
                        </div>
                    </div>`;
        //Here we set note
    });

    let notesEle = document.getElementById('notes');
    if (notesObj.length != 0) {
        notesEle.innerHTML = html;
    }
    else {
        notesEle.innerHTML = `<h4  style="text-align: center;"> Nothing to show! Please Write a Note above.</h4>`;
    }
}

//For Deleting Notes
function deleteNote(index) {
    // console.log('Delete note', index);
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);           //notes is contain in notesObj on form of object
    }

    notesObj.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notesObj));        //Update local storage
    showNotes();
}

//Search notes
let search = document.getElementById('searchTxt');

search.addEventListener('input', function () {
    let inputVal = search.value.toLowerCase();
    // console.log('input event fired', inputVal);
    let noteCards = document.getElementsByClassName('noteCard');

    Array.from(noteCards).forEach(function (element, index) {
        let cardTxt = document.getElementsByTagName("p")[index].innerText;
        if (cardTxt.includes(inputVal)) {
            // element.style.color = 'red';
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }
        // console.log(cardTxt);
    })
})
