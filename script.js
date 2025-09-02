
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

function addBookToLibrary(title, author, length, status) {
    let newBook = new Book(title, author, length, status);
    myLibrary.push(newBook);
}
 
// starting books
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", "295", "not read yet");
addBookToLibrary("Harry Potter and the Goblet of Fire", "J.K. Rowling", "298", "finished");





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

function updateLibrary() {
    // fresh start
    clearDisplay();

    for(let i = 0; i < myLibrary.length; i++) {
        const book = myLibrary[i];
        
        // create row element
        const entry = document.createElement("tr");
        entry.classList.add("entry");
        
        // create row contents
        const id = document.createElement("td");
        id.classList.add("id");
        id.textContent = book.id;
        
        const title = document.createElement("td");
        title.classList.add("title");
        title.textContent = book.title;

        const author = document.createElement("td");
        author.classList.add("author");
        author.textContent = book.author;

        const length = document.createElement("td");
        length.classList.add("length");
        length.textContent = book.length;

        const status = document.createElement("td");
        status.classList.add("status");
        status.textContent = book.status;

        // attach row contents onto row element
        entry.appendChild(id);
        entry.appendChild(title);
        entry.appendChild(author);
        entry.appendChild(length);
        entry.appendChild(status);

        // attach row element to table
        table.appendChild(entry);
    }
}
updateLibrary();
