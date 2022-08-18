const addNoteBtn = document.querySelector(".addNoteBtn");
const inputSection = document.querySelector(".inputSection");
const inputContainer = document.querySelector(".inputContainer");
const noteInput = document.querySelector("#noteInput");
const closeBtn = document.querySelector(".fa-xmark");
const saveBtn = document.querySelector(".save-btn");
const NoteContainer = document.querySelector(".NoteContainer");

const updateLS = () => {
    const textarea = document.querySelectorAll(".noteTextarea");
    const notes = [];
    // JSON.parse(localStorage.getItem("notes")).forEach((ele) => {
    //     return notes.push(ele);
    // });
    textarea.forEach((element) => {
        return notes.push(element.value);
    });

    localStorage.setItem("notes" , JSON.stringify(notes));
}

addNoteBtn.addEventListener("click" , (Event) => {
    inputSection.style.display = "flex";
    
    inputSection.addEventListener("click", (event) => {
        const isClickInside = inputContainer.contains(event.target);
      
        if (!isClickInside && noteInput.value == "") {
            inputSection.style.display = "none";
        }
        
        if (!isClickInside && noteInput.value != "") {
            inputContainer.style.animation = "animationForInputContainer 3s 1";
        }
    });
    
});

closeBtn.addEventListener("click", () => {
    inputSection.style.display = "none";
});

var noteText;

saveBtn.addEventListener("click", () => {
    noteText = noteInput.value;
    noteInput.value = "";
    // console.log(noteText);
    inputSection.style.display = "none";

    var newNote = document.createElement("div");
    newNote.classList.add("note");
    var htmlData = `
    <div class="noteBtn">
        <div class="noteEditBtn"><i class="fa-solid fa-pen-to-square"></i></div>
        <div class="noteDeleteBtn"><i class="fa-solid fa-trash-can"></i></div>
    </div>
    <textarea class="noteTextarea">${noteText}</textarea>`;
    newNote.innerHTML = htmlData;
    
    NoteContainer.appendChild(newNote);
    
    // References
    const noteEditBtn = newNote.querySelector(".noteEditBtn");
    const noteDeleteBtn = newNote.querySelector(".noteDeleteBtn");
    const noteTextarea = newNote.querySelector(".noteTextarea");
    
    updateLS();
    noteTextarea.readOnly = true;
    
    noteEditBtn.addEventListener("click", () => {
        console.log("Hello");
        if(noteTextarea.readOnly == true) {
            noteTextarea.readOnly = false;
            newNote.querySelector(".fa-pen-to-square").classList.add("fa-floppy-disk");
            newNote.querySelector(".fa-pen-to-square").classList.remove("fa-pen-to-square");
        }
        else {
            noteTextarea.readOnly = true;
            updateLS();
            newNote.querySelector(".fa-floppy-disk").classList.add("fa-pen-to-square");
            newNote.querySelector(".fa-pen-to-square").classList.remove("fa-floppy-disk");
        }
    });
    
    noteDeleteBtn.addEventListener("click", () => {
        newNote.remove();
        updateLS();
    });

});

const notes = JSON.parse(localStorage.getItem("notes"));

if(notes) {
    notes.forEach((ele) => {
        var newNote = document.createElement("div");
        newNote.classList.add("note");
        var htmlData = `
        <div class="noteBtn">
            <div class="noteEditBtn"><i class="fa-solid fa-pen-to-square"></i></div>
            <div class="noteDeleteBtn"><i class="fa-solid fa-trash-can"></i></div>
        </div>
        <textarea class="noteTextarea">${ele}</textarea>`;
        newNote.innerHTML = htmlData;
        
        NoteContainer.appendChild(newNote);
        
        // References
        const noteEditBtn = newNote.querySelector(".noteEditBtn");
        const noteDeleteBtn = newNote.querySelector(".noteDeleteBtn");
        const noteTextarea = newNote.querySelector(".noteTextarea");
        
        // updateLS();
        noteTextarea.readOnly = true;
        
        noteEditBtn.addEventListener("click", () => {
            // console.log("Hello");
            if(noteTextarea.readOnly == true) {
                noteTextarea.readOnly = false;
                newNote.querySelector(".fa-pen-to-square").classList.add("fa-floppy-disk");
                newNote.querySelector(".fa-pen-to-square").classList.remove("fa-pen-to-square");
            }
            else {
                noteTextarea.readOnly = true;
                updateLS();
                newNote.querySelector(".fa-floppy-disk").classList.add("fa-pen-to-square");
                newNote.querySelector(".fa-pen-to-square").classList.remove("fa-floppy-disk");
            }
        });

        noteDeleteBtn.addEventListener("click", () => {
            newNote.remove();
            updateLS();
        });
        
    });
}