// let a = localStorage.getItem("Note");
// alert("Your note is " + a);

// let note = prompt("Write your note: ");
// if (note) {
//     localStorage.setItem("Note", note);
// };

// let confirmm = confirm("Do you want to delete the note");
// if (confirmm) {
//     localStorage.removeItem("Note");
// } 


let btn = document.querySelector('.button');
let inputValue = document.querySelector('input');
let addNotes = document.querySelector('.add-notes');
let emptyDiv = document.querySelector('.Empty-div');

// Initialize the order array from localStorage or create a new one
let notesOrder = JSON.parse(localStorage.getItem('notesOrder')) || [];

// Load notes in sequence on page load
document.addEventListener("DOMContentLoaded", function () {
    if (notesOrder.length > 0) {
        emptyDiv.style.display = "none";
    }

    notesOrder.forEach(key => {
        let noteData = JSON.parse(localStorage.getItem(key));
        if (noteData) {
            let p = document.createElement('p');
            p.innerHTML = noteData.text;
            p.style.background = noteData.color;
            let span = document.createElement('span');
            span.innerHTML = "❌";
            span.style.cursor = "pointer"; // Change cursor for better UX
            p.appendChild(span);
            addNotes.prepend(p);

            // Add click event to remove the note
            span.addEventListener("click", function () {
                removeNoteFromLocalStorage(key, p);
            });
        }
    });
});

btn.addEventListener("click", function () {
    if (inputValue.value === "") {
        alert("Please add something first");
        return;
    }

    emptyDiv.style.display = "none";
    let input = inputValue.value;

    // Check if the note already exists to prevent duplicates
    if (!notesOrder.includes(input)) {
        notesOrder.push(input); // Add the new note to the order array
        localStorage.setItem('notesOrder', JSON.stringify(notesOrder)); // Save updated order
    }

    const colors = [
        "linear-gradient(143deg, rgba(120,61,255,0.8476890756302521) 30%, rgba(239,232,255,0.7356442577030813) 98%)",
        "linear-gradient(143deg, rgba(255,140,61,0.8476890756302521) 30%, rgba(0,255,87,0.7356442577030813) 98%)",
        "linear-gradient(143deg, rgba(0,53,115,0.8757002801120448) 30%, rgba(0,255,246,0.7356442577030813) 93%)",
        "linear-gradient(143deg, rgba(115,76,0,0.8757002801120448) 30%, rgba(117,0,255,0.7356442577030813) 93%)"
    ];
    let randomNo = Math.floor(Math.random() * colors.length);
    let bgColor = colors[randomNo];

    // Store the note and its color
    localStorage.setItem(input, JSON.stringify({ text: input, color: bgColor }));

    let p = document.createElement('p');
    let span = document.createElement('span');
    span.innerHTML = "❌";
    span.style.cursor = "pointer"; // Change cursor for better UX
    p.innerHTML = input;
    p.style.background = bgColor;
    p.appendChild(span);
    addNotes.prepend(p);

    inputValue.value = "";

    span.addEventListener("click", function () {
        removeNoteFromLocalStorage(input, p);
    });
});

// Function to remove a note from localStorage and DOM
function removeNoteFromLocalStorage(key, element) {
    // Remove from localStorage
    localStorage.removeItem(key);

    // Update the order array and save it back to localStorage
    notesOrder = notesOrder.filter(note => note !== key);
    localStorage.setItem('notesOrder', JSON.stringify(notesOrder));

    // Remove the note from the DOM
    element.remove();

    // Show the emptyDiv again if all notes are deleted
    if (notesOrder.length == 0) {
        emptyDiv.style.display = "block";
    }
}


