const addBtn = document.getElementById("add");
const titleInput = document.getElementById("title");
const textareaInput = document.getElementById("text");

let editIndex = null; // Global variable to keep track of the index being edited

printData(getData);
addBtn.addEventListener('click',addNote);

function addNote(){
    const title = titleInput.value;
    const textarea = textareaInput.value;
 
    console.log(title,textarea);

    let obj= {
        title:title,
        note:textarea
    }

    let notesArr= getData();

    if(title != '' && textarea != ''){
        if (editIndex != null){
        // Update the existing note at the editIndex
            notesArr[editIndex].title = title;
            notesArr[editIndex].note = textarea;
            editIndex = null; // Reset the editIndex after updating the note
        }
        else{
            notesArr.push(obj);
        }
    localStorage.setItem('notes',JSON.stringify(notesArr));
    // console.log(getData());
    printData(getData);
    clearInputFields();
    }
}
// console.log(getData());
function getData(){
    if (localStorage.getItem('notes') == null){
        return [];
    }
    else{
        return JSON.parse(localStorage.getItem('notes'));
    }
}

function printData(callBack){

    notes = callBack();
    const card = document.querySelector('.note-card');
    card.innerHTML = '';

    notes.forEach ((item,id) => {
        var content = document.createElement('div');
        content.classList.add('note-content');
        content.innerHTML = `
            <h2 class="note-title">${item.title}</h2>
            <div class="partition"></div>
            <p class="note-description">${item.note}</p>
            <button class="edit-button" onclick="editNote(${id})">Edit</button>
            <button class="delete-button" onclick="deleteNote(${id})">Delete</button>
        `
        card.appendChild(content)
    })
}

function editNote(id) {
    let notesArr = getData();
    const noteToEdit = notesArr[id];
    
    // Set the current note's data in the input fields for editing
     titleInput.value = noteToEdit.title;
     textareaInput.value = noteToEdit.note;

     editIndex = id; // Set the global editIndex to the current note's index
}

function deleteNote(id) {
    let notesArr = getData();
  
    // Remove the note from the array
    notesArr.splice(id, 1);
  
    // Update the localStorage with the modified notesArr
    localStorage.setItem('notes', JSON.stringify(notesArr));
  
    // Refresh the displayed notes
    printData(getData);
  }

  function clearInputFields() {
    titleInput.value = '';
    textareaInput.value = '';
  }