
const myLibrary = [];

function Book(title, author, length, status) {
    this.id = crypto.randomUUID()
    this.title = title;
    this.author = author;
    this.length = length;
    this.status = status;

    this.info = function() {
        // using `` instead of "" or '' allows embedding vars directly in string
        // `` is call template literals
        return `ID: ${this.id}, ${this.title} by ${this.author}, ${this.length} pages, ${status}`;
    }
}

// basically just creating another internal Book function, but it's made outside of Book
Book.prototype.changeStatusTo = function(changedTo) {
   this.status = changedTo;
};

function addBookToLibrary(title, author, length, status) {
    let newBook = new Book(title, author, length, status);
    myLibrary.push(newBook);
    return newBook.id;
}
 
// starting books
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", "295", "to read");
addBookToLibrary("Harry Potter and the Goblet of Fire", "J.K. Rowling", "298", "read");





/* DOM stuff starts here */

const table = document.querySelector("#table");

function clearDisplay() {
    // list of all rows (tr elements) except the first row (column headers)
    const toDelete = document.querySelectorAll("#table tr:not(:first-child)");

    // loops through list and removes them
    for(let i = 0; i < toDelete.length; i++) {
        table.removeChild(toDelete[i]);
    }
}

function createEntry(idStr, titleStr, authorStr, lengthStr, statusStr) {
    // create row element
    const entry = document.createElement("tr");
    entry.classList.add("entry");
    
    // create row contents
    const id = document.createElement("td");
    id.classList.add("id");
    id.textContent = idStr;
    
    const title = document.createElement("td");
    title.classList.add("title");
    title.textContent = titleStr;

    const author = document.createElement("td");
    author.classList.add("author");
    author.textContent = authorStr;

    const length = document.createElement("td");
    length.classList.add("length");
    length.textContent = lengthStr;

    // status has 2 children: the text to display status, change status button
    const status = document.createElement("td");
    status.classList.add("status");

    const statusText = document.createElement("p");
    statusText.classList.add("status-text");
    statusText.textContent = statusStr;
    status.appendChild(statusText);

    const statusChange = document.createElement("button");
    statusChange.classList.add("status-change");
    statusChange.textContent = "Change status";
    status.appendChild(statusChange);

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-btn");
    deleteBtn.textContent = "Delete";

    // attach row contents onto row element
    entry.appendChild(id);
    entry.appendChild(title);
    entry.appendChild(author);
    entry.appendChild(length);
    entry.appendChild(status);
    entry.appendChild(deleteBtn);

    // attach row element to table
    table.appendChild(entry);
}

function recreateLibrary() {
    // fresh start
    clearDisplay();

    for(let i = 0; i < myLibrary.length; i++) {
        const book = myLibrary[i];
        createEntry(book.id, book.title, book.author, book.length, book.status);
    }
}
recreateLibrary();


// adding books

const addBookSection = document.querySelector("#add-book");
const bookFormBtn = document.querySelector("#add-book > button");


bookFormBtn.addEventListener("click", openBookForm);

let bookFormOpen = false;
function openBookForm() {
    // add book form is not open, so want to open it
    if (!bookFormOpen) {

        const form = document.createElement("form");
        addBookSection.appendChild(form);

        const titleLabel = document.createElement("label");
        titleLabel.setAttribute("for", "title");
        titleLabel.textContent = "Title: ";
        const titleInput = document.createElement("input");
        titleInput.setAttribute("type", "text");
        titleInput.setAttribute("id", "title-input");
        titleInput.setAttribute("name", "titleInput");

        form.appendChild(titleLabel);
        form.appendChild(titleInput);


        const authorLabel = document.createElement("label");
        authorLabel.setAttribute("for", "author");
        authorLabel.textContent = "Author: ";
        const authorInput = document.createElement("input");
        authorInput.setAttribute("type", "text");
        authorInput.setAttribute("id", "author-input");
        authorInput.setAttribute("name", "authorInput");

        form.appendChild(authorLabel);
        form.appendChild(authorInput);


        const lengthLabel = document.createElement("label");
        lengthLabel.setAttribute("for", "length");
        lengthLabel.textContent = "# of Pages: ";
        const lengthInput = document.createElement("input");
        lengthInput.setAttribute("type", "text");
        lengthInput.setAttribute("id", "length-input");
        lengthInput.setAttribute("name", "lengthInput");

        form.appendChild(lengthLabel);
        form.appendChild(lengthInput);
        

        // const statusLabel = document.createElement("label");
        // statusLabel.setAttribute("for", "status");
        // statusLabel.textContent = "Status: ";
        // const statusInput = document.createElement("input");
        // statusInput.setAttribute("type", "text");
        // statusInput.setAttribute("id", "status-input");
        // statusInput.setAttribute("name", "statusInput");

        // form.appendChild(statusLabel);
        // form.appendChild(statusInput);


        const addBookBtn = document.createElement("button");
        addBookBtn.setAttribute("id", "add-book-btn");
        addBookBtn.setAttribute("type", "button");
        addBookBtn.textContent = "Add Book";

        form.appendChild(addBookBtn);


        bookFormOpen = true;
        bookFormBtn.textContent = "Cancel adding new book"
    }
    // add book form is already open, want to close it
    else {
        const bookForm = document.querySelector("#add-book form");
        bookForm.remove();

        bookFormOpen = false;
        bookFormBtn.textContent = "Add new book"
    }
}


// for events that may or may not exist, set event listener to document, and check inside function if event's element is the expected element
document.addEventListener("click", customButton);

function customButton(event){
    var element = event.target;

    // add book button pressed
    if(element.id === "add-book-btn") {
        const title = document.querySelector("#add-book #title-input");
        const author = document.querySelector("#add-book #author-input");
        const length = document.querySelector("#add-book #length-input");
        // const status = document.querySelector("#add-book #status-input");

        // addBookToLibrary() both adds a book to myLibrary and returns its ID
        const id = addBookToLibrary(title.value, author.value, length.value, "to read");

        // just added to myLibrary list, now adding to interface 
        createEntry(id, title.value, author.value, length.value, "to read");
    }

    // delete button pressed
    if(element.className === "delete-btn") {
        const curEntry = element.parentNode;
        const id = curEntry.querySelector(".id").textContent;
        const ind = myLibrary.findIndex((element) => element.id === id);

        // remove from myLibrary
        myLibrary.splice(ind, 1);
        
        // remove from interface
        table.removeChild(curEntry);
    }

    // change status button pressed
    if(element.className === "status-change") {
        // button is child of td (status cell), which is child of tr (row entry)
        const curEntry = element.parentNode.parentNode;
        const id = curEntry.querySelector(".id").textContent;
        const ind = myLibrary.findIndex((element) => element.id === id);
        
        book = myLibrary[ind];
        if(book.status === "to read") {
            // change status of book in myLibrary
            book.changeStatusTo("read");
            // change status on interface
            const bookID = curEntry.querySelector(".status-text");
            bookID.textContent = "read";
        }
        else {
            // change status of book in myLibrary
            book.changeStatusTo("to read");
            // change status on interface
            const bookID = curEntry.querySelector(".status-text");
            bookID.textContent = "to read";
        }
        
    }
}
