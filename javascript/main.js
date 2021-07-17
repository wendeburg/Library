const body = document.querySelector('body');
const bookContainer = document.querySelector('.book-container');

// Mobile phone navigation.
const burgerMenuBtn = document.querySelector('.burger-menu');
const menuOptions = document.querySelector('.mobile-menu');

// Add book pop-up.
const modal = document.querySelector('.modal-wrap');
const showModalBtn = document.querySelectorAll('.show-modal');
const addBookBtn = document.querySelector('#add-book-btn');
const cancelBtn = document.querySelector('#cancel-btn');
const bookTitleInput = document.querySelector('#book-title');
const bookCoverImage = document.querySelector('#book-cover');
const bookAuthorInput = document.querySelector('#book-author');
const bookPagesInput = document.querySelector('#book-pages');
const bookPublishDateInput = document.querySelector('#book-publish-date');
const bookReadStatusInput = document.querySelector('#book-read');


// Sidebar.
const numBooksPara = document.querySelectorAll('.num-books');
const numReadBooksPara = document.querySelectorAll('.num-read-books');
const numUnfinishedBooksPara = document.querySelectorAll('.num-unfinished-books');
const deleteDataBtn = document.querySelectorAll('.delete-data');

let myLibrary = [];
let nextId = 0;

class Book {
    constructor(title, URL, author, totalPages, publishDate, isRead, nextId) {
        this.title = title;
        this.coverImage = URL;
        this.author = author;
        this.totalPages = totalPages;
        this.publishDate = publishDate;
        this._isRead = isRead;
        this.id = nextId;
    }

    get isRead() {
        return this._isRead;
    }

    set isRead(status) {
        this._isRead = status;
    }
}


// Get books saved locally on page load.
if (JSON.parse(localStorage.getItem('myLibrary'))) {
    myLibrary = JSON.parse(localStorage.getItem('myLibrary'));

    for (let i = 0; i < myLibrary.length; i++) {
        createBookEntry(myLibrary[i]);
    }

    updateBookNums();
}
else {
    let exampleBook = new Book('Don Quijote de la Mancha',
    'https://upload.wikimedia.org/wikipedia/commons/0/08/Miguel_de_Cervantes_%281605%29_El_ingenioso_hidalgo_Don_Quixote_de_la_Mancha.png',
    'Miguel de Cervantes', '1345', '1605', false);

    myLibrary.push(exampleBook);

    createBookEntry(exampleBook);

    saveDataToLocalStorage();
}

function addBookToLibrary() {
    let bookTitle = bookTitleInput.value;
    let bookCover = bookCoverImage.value;
    let bookAuthor = bookAuthorInput.value;
    let bookPages = bookPagesInput.value;
    let bookPublishDate = setPublishDate(bookPublishDateInput.value);
    let bookIsRead = bookReadStatusInput.checked;

    modal.classList.toggle('hide');
    clearInputs();

    let newBook = new Book(bookTitle, bookCover, bookAuthor, bookPages, bookPublishDate, bookIsRead);

    myLibrary.push(newBook);

    createBookEntry(newBook);

    updateBookNums();

    saveDataToLocalStorage();
}

function removeBook(e) {
    myLibrary.splice(e.target.dataset.index, 1);
    
    book = document.getElementById(`${e.target.dataset.index}`);
    book.remove();

    updateBookNums();

    saveDataToLocalStorage();
}

function setPublishDate(date) {
    let dateElements = date.split("-");

    return `Published on: ${dateElements[2]}/${dateElements[1]}/${dateElements[0]}`;
}

function createBookEntry(book) {
    let bookCard = document.createElement('div');
    bookCard.setAttribute("id", `${nextId}`);
    bookCard.classList.add('book');
    
    if (book.coverImage !== '') bookCard.style.cssText = `background: url(${book.coverImage}); background-size: cover;`;

    let bookInfo = document.createElement('div');
    bookInfo.classList.add('book-info');

    let bookTitle = document.createElement('h2');
    bookTitle.classList.add('book-title');
    bookTitle.textContent = book.title;

    let bookAuthor = document.createElement('p');
    bookAuthor.classList.add('book-author');
    bookAuthor.textContent = book.author;

    let bookPages = document.createElement('p');
    bookPages.classList.add('book-pages');
    bookPages.textContent = `${book.totalPages} pages`;

    let bookPublishDate = document.createElement('p');
    bookPublishDate.classList.add('publish-date');
    bookPublishDate.textContent = book.publishDate;

    let bookReadBtn = document.createElement('button');
    bookReadBtn.classList.add('read-book');
    bookReadBtn.textContent = 'Not Read';

    let bookRemoveBtn = document.createElement('button');
    bookRemoveBtn.setAttribute("data-index", `${nextId}`);
    bookRemoveBtn.classList.add('remove-book');
    bookRemoveBtn.textContent = 'Remove Book';

    bookRemoveBtn.addEventListener('click', removeBook);
    bookReadBtn.addEventListener('click', toggleReadStatus);
    bookReadBtn.setAttribute("data-index", `${nextId}`);

    bookInfo.append(bookTitle);
    bookInfo.append(bookAuthor);
    bookInfo.append(bookPages);
    bookInfo.append(bookPublishDate);
    bookInfo.append(bookReadBtn);
    bookInfo.append(bookRemoveBtn);
    bookCard.append(bookInfo);
    bookContainer.append(bookCard);

    nextId++;
}

function toggleModal(e) {
    modal.classList.toggle('hide');

    if (e.target.classList.contains('show-modal')) {
        menuOptions.classList.toggle('show-menu');
        burgerMenuBtn.classList.toggle('open');
        body.classList.toggle('hidden-overflow');
    }
    else if (e.target.id === 'cancel-btn') {
        clearInputs();
    }
}

function clearInputs() {
    bookTitleInput.value = '';
    bookCoverImage.value = '';
    bookAuthorInput.value = '';
    bookPagesInput.value = '';
    bookPublishDateInput.value = '';
    bookReadStatusInput.checked = false;
}

function updateBookNums() {
    let numFinishedBooks = myLibrary.reduce((total, book) => {
        return book.isRead ? total + 1 : total
    }, 0);

    numBooksPara.forEach(para => {
        para.textContent = `Total Books: ${myLibrary.length}`;
    })

    numReadBooksPara.forEach(para => {
        para.textContent = `Read Books: ${numFinishedBooks}`
    })

    numUnfinishedBooksPara.forEach( para => { 
        para.textContent = `Unfinished books: ${myLibrary.length - numFinishedBooks}`;
    });
}

function saveDataToLocalStorage() {
    localStorage.clear()
    localStorage.setItem(`myLibrary`, JSON.stringify(myLibrary));
}

function clearLocalStorage() {
    localStorage.clear()

    let booksNodeList = document.querySelectorAll('.book');

    booksNodeList.forEach(book => {
        book.remove();
    })
}

function toggleReadStatus(e) {
    myLibrary[e.target.dataset.index].isRead = !myLibrary[e.target.dataset.index].isRead;

    e.target.classList.toggle('read');

    if (myLibrary[e.target.dataset.index].isRead) {
        e.target.textContent = 'Read';
    }
    else {
        e.target.textContent = 'Not Read';
    }

    updateBookNums();
}

// Event listeners.
addBookBtn.addEventListener('click', addBookToLibrary);
cancelBtn.addEventListener('click', toggleModal);
showModalBtn.forEach(btn => btn.addEventListener('click', toggleModal));
deleteDataBtn.forEach(btn => btn.addEventListener('click', clearLocalStorage));