const modal = document.querySelector('.modal-wrap');
const showModalBtn = document.querySelectorAll('.show-modal');
const addBookBtn = document.querySelector('#add-book-btn');
const cancelBtn = document.querySelector('#cancel-btn');
const bookContainer = document.querySelector('.book-container');
const bookTitleInput = document.querySelector('#book-title');
const bookCoverImage = document.querySelector('#book-cover');
const bookAuthorInput = document.querySelector('#book-author');
const bookPagesInput = document.querySelector('#book-pages');
const bookReadPagesInput = document.querySelector('#book-pages-read');
const bookReadStatus = document.querySelector('#book-read');


let myLibrary = [];

function Book(title, URL, author, totalPages, readPages, isRead) {
    this.title = title;
    this.coverImage = URL;
    this.author = author;
    this.totalPages = totalPages;
    this.readPages = readPages;
    this.isRead = isRead;

    this.info = function() {
        return `${title} by ${author} has a total of ${totalPages}. Read status: ${isRead}.`;
    }
}

function addBookToLibrary() {
    let bookTitle = bookTitleInput.value;
    let bookImage = bookCoverImage.value;
    let bookAuthor = bookAuthorInput.value;
    let bookPages = bookPagesInput.value;
    let bookReadPages = bookReadPagesInput.value;
    let bookIsRead = bookReadStatus.checked;


    let newBook = new Book(bookTitle, bookImage, bookAuthor, bookPages, bookReadPages, bookIsRead);

    myLibrary.push(newBook);

    createBookEntry(newBook);

    modal.classList.toggle('hide');
}

function removeBook(e) {
    myLibrary.splice(e.target.dataset.index);
    
    book = document.getElementById(`${e.target.dataset.index}`);
    book.remove();
}

function createBookEntry(book) {
    bookCard = document.createElement('div');
    bookCard.setAttribute("id", `${myLibrary.length-1}`);
    bookCard.classList.add('book');

    bookInfo = document.createElement('div');
    bookInfo.classList.add('book-info');

    bookTitle = document.createElement('h2');
    bookTitle.classList.add('book-title');
    bookTitle.innerHTML = `${book.title}`; //max 29 chars

    bookAuthor = document.createElement('p');
    bookAuthor.classList.add('book-author');
    bookAuthor.innerHTML = book.author;

    bookPages = document.createElement('p');
    bookPages.classList.add('book-pages');
    bookPages.innerHTML = book.totalPages;

    bookReadPages = document.createElement('p');
    bookReadPages.classList.add('read-pages');
    bookReadPages.innerHTML = book.readPages;

    bookReadBtn = document.createElement('button');
    bookReadBtn.setAttribute('id', 'read-book');
    bookReadBtn.innerHTML = 'Not Read';

    bookRemoveBtn = document.createElement('button');
    bookRemoveBtn.setAttribute("data-index", `${myLibrary.length-1}`);
    bookRemoveBtn.setAttribute('id', 'remove-book');
    bookRemoveBtn.innerHTML = 'Remove';

    bookRemoveBtn.addEventListener('click', removeBook)

    bookInfo.append(bookTitle);
    bookInfo.append(bookAuthor);
    bookInfo.append(bookPages);
    bookInfo.append(bookReadPages);
    bookInfo.append(bookReadBtn);
    bookInfo.append(bookRemoveBtn);
    bookCard.append(bookInfo);
    bookContainer.append(bookCard);
}

function toggleModal(e) {
    modal.classList.toggle('hide');

    if (e.target.classList.contains("show-modal")) {
        menuOptions.classList.toggle('show-menu');
        burgerMenuBtn.classList.toggle('open');
        body.classList.toggle('hidden-overflow');
    }
}

addBookBtn.addEventListener('click', addBookToLibrary);
cancelBtn.addEventListener('click', toggleModal);
showModalBtn.forEach(btn => btn.addEventListener('click', toggleModal));
