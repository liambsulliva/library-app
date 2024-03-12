const myLibrary = [];
let currentID = 1;

function Book(title, author) {
    this.title = title;
    this.author = author;
    this.id = currentID;
    currentID++;
}

// Starter Books
addBookToLibrary(new Book("Othello", "William Shakespeare"));
addBookToLibrary(new Book("Percy Jackson - The Lightning Thief", "Rick Riordan"));

function displayBooks() {
    const tableContainer = document.getElementById('tableContainer');
    tableContainer.innerHTML = '';

    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const theadRow = document.createElement('tr');

    const titleHeader = document.createElement('th');
    titleHeader.textContent = 'Title';
    theadRow.appendChild(titleHeader);

    const authorHeader = document.createElement('th');
    authorHeader.textContent = 'Author'
    theadRow.appendChild(authorHeader);

    const removalHeader = document.createElement('th');
    removalHeader.textContent = '';
    theadRow.appendChild(removalHeader);

    thead.appendChild(theadRow);
    table.appendChild(thead);

    const tbody = document.createElement('tbody');

    myLibrary.forEach(book => {
        const row = document.createElement('tr');

        const titleCell = document.createElement('td');
        titleCell.textContent = book.title;
        row.appendChild(titleCell);

        const authorCell = document.createElement('td');
        authorCell.textContent = book.author;
        row.appendChild(authorCell);

        let checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        const checkboxCell = document.createElement('td');
        checkboxCell.textContent = 'Read';
        checkboxCell.appendChild(checkbox);
        row.appendChild(checkboxCell);

        const removalCell = document.createElement('td');
        removalCell.textContent = 'Remove';
        removalCell.style.color = '#0000EE';
        removalCell.style.cursor = 'pointer';
        row.appendChild(removalCell);

        tbody.appendChild(row);

        removalCell.addEventListener("click", () => {
            myLibrary.pop(book);
            tbody.removeChild(row);
        });
    });

    table.appendChild(tbody);
    tableContainer.appendChild(table);
}

const addButton = document.getElementById('add');
const addContainer = document.getElementById('adderContainer');
let bookForm;
addButton.addEventListener('click', () => {
    if (!addContainer.hasChildNodes(bookForm)) {
        bookForm = document.createElement('div');
        bookForm.id = 'bookForm';
        bookForm.style.padding = '30px';
        bookForm.style.marginLeft = '100px';
        bookForm.style.marginRight = '100px';
        bookForm.style.marginBottom = '25px';
        bookForm.style.border = '1px solid #ccc';
        bookForm.style.backgroundColor = '#f1f1f1';

        const formTitle = document.createElement('h3');
        formTitle.textContent = 'Add New Book';
        formTitle.style.textAlign = 'center';
        bookForm.appendChild(formTitle);

        const form = document.createElement('form');

        const title = document.createElement('div');
        const titleLabel = document.createElement('label');
        titleLabel.textContent = 'Title: ';
        title.style.margin = 'auto';
        const titleInput = document.createElement('input');
        titleInput.type = 'text';
        titleInput.id = 'title';
        titleInput.name = 'title';
        titleInput.required = true;
        title.appendChild(titleLabel);
        title.appendChild(titleInput);
        form.appendChild(title);
        form.appendChild(document.createElement('br'));

        const author = document.createElement('div');
        const authorLabel = document.createElement('label');
        authorLabel.textContent = 'Author: ';
        author.style.margin = 'auto';
        const authorInput = document.createElement('input');
        authorInput.type = 'text';
        authorInput.id = 'author';
        authorInput.name = 'author';
        authorInput.required = true;
        author.appendChild(authorLabel);
        author.appendChild(authorInput);
        form.appendChild(author);
        form.appendChild(document.createElement('br'));

        const submitButton = document.createElement('button');
        submitButton.type = 'button';
        submitButton.id = 'submitBook';
        submitButton.textContent = 'Add Book';
        form.appendChild(submitButton);

        bookForm.appendChild(form);

        addContainer.appendChild(bookForm);

        form.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                const title = titleInput.value.trim();
                const author = authorInput.value.trim();
                if (title && author) {
                    addBookToLibrary(new Book(title, author));
                    titleInput.value = '';
                    authorInput.value = '';
                    addContainer.removeChild(bookForm);
                } else {
                    alert('Please enter a title and author.');
                }
            }
        });
        submitButton.addEventListener('click', () => {
            const title = titleInput.value.trim();
            const author = authorInput.value.trim();
            if (title && author) {
                addBookToLibrary(new Book(title, author));
                titleInput.value = '';
                authorInput.value = '';
                addContainer.removeChild(bookForm);
            } else {
                alert('Please enter a title and author.');
            }
        });
    } else {
        addContainer.removeChild(bookForm);
    }
}); 

function addBookToLibrary(book) {
    myLibrary.push(book);
    displayBooks();
}