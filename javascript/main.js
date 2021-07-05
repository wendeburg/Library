const modal = document.querySelector('.modal-wrap');
const showModalBtn = document.querySelectorAll('.show-modal');
const addBookBtn = document.querySelector('#add-book-btn');
const cancelBtn = document.querySelector('#cancel-btn');
const bookContainer = document.querySelector('.book-container');
const bookTitleInput = document.querySelector('#book-title');
const bookCoverImage = document.querySelector('#book-cover');
const bookAuthorInput = document.querySelector('#book-author');
const bookPagesInput = document.querySelector('#book-pages');
const bookPublishDateInput = document.querySelector('#book-publish-date');
const bookReadStatus = document.querySelector('#book-read');


let myLibrary = [];

function Book(title, URL, author, totalPages, publishDate, isRead) {
    this.title = title;
    this.coverImage = URL;
    this.author = author;
    this.totalPages = totalPages;
    this.publishDate = publishDate;
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
    let bookPublishDate = setPublishDate(bookPublishDateInput.value);
    let bookIsRead = bookReadStatus.checked;

    modal.classList.toggle('hide');
    clearInputs();

    let newBook = new Book(bookTitle, bookImage, bookAuthor, bookPages, bookPublishDate, bookIsRead);

    myLibrary.push(newBook);

    createBookEntry(newBook);
}

function removeBook(e) {
    myLibrary.splice(e.target.dataset.index);
    
    book = document.getElementById(`${e.target.dataset.index}`);
    book.remove();
}

function setPublishDate(date) {
    let dateElements = date.split("-");

    return `Published on: ${dateElements[2]}/${dateElements[1]}/${dateElements[0]}`;
}

function createBookEntry(book) {
    let bookCard = document.createElement('div');
    bookCard.setAttribute("id", `${myLibrary.length-1}`);
    bookCard.classList.add('book');

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
    bookReadBtn.setAttribute('id', 'read-book');
    bookReadBtn.textContent = 'Not Read';

    let bookRemoveBtn = document.createElement('button');
    bookRemoveBtn.setAttribute("data-index", `${myLibrary.length-1}`);
    bookRemoveBtn.setAttribute('id', 'remove-book');
    bookRemoveBtn.textContent = 'Remove Book';

    bookRemoveBtn.addEventListener('click', removeBook)

    bookInfo.append(bookTitle);
    bookInfo.append(bookAuthor);
    bookInfo.append(bookPages);
    bookInfo.append(bookPublishDate);
    bookInfo.append(bookReadBtn);
    bookInfo.append(bookRemoveBtn);
    bookCard.append(bookInfo);
    bookContainer.append(bookCard);
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
}

addBookBtn.addEventListener('click', addBookToLibrary);
cancelBtn.addEventListener('click', toggleModal);
showModalBtn.forEach(btn => btn.addEventListener('click', toggleModal));
