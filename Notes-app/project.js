console.log("Notes project");
//calling function to add notes
shownotes();

//addbtn use for whene we click on add button then note is added
let addbtn = document.getElementById("addbtn").addEventListener("click", function (e) {
    let addtext = document.getElementById("addtext");
    let addtitle = document.getElementById("title");

    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesobj = [];
    }
    else {
        notesobj = JSON.parse(notes);
    }

    let myobj ={
        title:addtitle.value,
        text: addtext.value
    }
    //noteobj is array which store all notes
    notesobj.push(myobj);
    //storing notes in localstorage
    localStorage.setItem("notes", JSON.stringify(notesobj));
    addtext.value = "";
    addtitle.value="";
    console.log(notesobj);
    shownotes();
});
//function to show element from localstorage 
function shownotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesobj = [];
    }
    else {
        notesobj = JSON.parse(notes);
    }
    //html use for printing notes
    let html = "";
    notesobj.forEach(function (element, index) {
        html += `
         <div class="notescard mx-2 my-2 card" style="width: 18rem;">
               
         <div class="card-body">
           <h5 class="card-title">${element.title} </h5>
           <p class="card-text">${element.text}</p>
           <button  id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
         </div>
       </div>
         `
    });
    //if there is no note then noteselm use
    let noteselm = document.getElementById("notes");
    if (notesobj.length != 0) {

        noteselm.innerHTML = html;
    }
    else {
        noteselm.innerHTML = `Nothing To Show`;
    }

}

//function to delete a note
function deleteNote(index) {
    console.log("i am deleting", index);
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesobj = [];
    }
    else {
        notesobj = JSON.parse(notes);
    }
    notesobj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesobj));
    shownotes();
}

//for search tool 
let search = document.getElementById("searchtxt");
search.addEventListener("input", function () {
    let ser = search.value;
    //  console.log("input event fired ",ser);  
    let notecard = document.getElementsByClassName("notescard");
    Array.from(notecard).forEach(function (element) {
        let cardtext = element.getElementsByTagName("p")[0].innerText;
        if (cardtext.includes(ser)) {
            //    console.log("find");
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }
        // console.log(cardtext);
    })
});