const addBtn = document.getElementById("add");

addBtn.addEventListener('click',addNote);

function addNote(){
    const title = document.getElementById("title").value;
    const textarea = document.getElementById("text").value;

    console.log(title,textarea);

    let obj= {
        title:title,
        note:textarea
    }

}

console.log(getData());
function getData(){
    if (localStorage.getItem('notes' == null)){
        return [];
    }
    else{
        return JSON.parse(localStorage.getItem('notes'));
    }
}
