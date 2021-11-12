const book1 = new Book("Harry Potter and the Philosopher's Stone", "J. K. Rowling", 223, true);
const book2 = new Book("Harry Potter and the Chamber of Secrets", "J. K. Rowling", 251, true);
const book3 = new Book("Harry Potter and the Prisoner of Azkaban", "J. K. Rowling", 317, false);
const book4 = new Book("Harry Potter and the Goblet of Fire", "J. K. Rowling", 636, false);

let myLibrary = [book1, book2, book3, book4];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.cover = generateCover();
}

function addBookToLibrary(entry) {
  const read = entry["book-status"] === "read";

  const newBook = new Book(entry["book-title"], entry["book-author"], entry["book-pages"], read)
  myLibrary.push(newBook);

  displayBook(newBook);
  updateLibrary();
}

function updateLibrary() {
  const bookList = document.querySelector(".book-list");
  bookList.textContent = "";

  myLibrary.forEach(book => {
    displayBook(book);
  });

  saveData();
}

// Create book on DOM
function displayBook(book) {
  const bookIndex = myLibrary.indexOf(book);

  // Unordered list
  const ul = document.querySelector(".book-list");

  // Create list item
  const li = document.createElement("li");
  li.dataset.bookIndex = bookIndex;
  li.classList.add("book");
  ul.appendChild(li);
  
  // Create book-cover div
  const bookCover = document.createElement("div");
  bookCover.classList.add("book-cover");
  bookCover.style.background = book.cover;
  li.appendChild(bookCover);

  // Buttons Container
  const coverButtonsContainer = document.createElement("div");
  coverButtonsContainer.classList.add("book-buttons-container");
  bookCover.appendChild(coverButtonsContainer);

  // Book status button
  const statusButton = document.createElement("button");
  statusButton.textContent = book.read ? "read" : "not read";
  statusButton.style.backgroundColor = !book.read ? "var(--blue-color)" : "";
  if (!book.read) {
    statusButton.addEventListener("mouseenter", () => {statusButton.style.backgroundColor = "#2a7dad"});
    statusButton.addEventListener("mouseleave", () => {statusButton.style.backgroundColor = "var(--blue-color)"});
  }
  statusButton.classList.add("status-button");
  statusButton.dataset.bookIndex = bookIndex;
  statusButton.addEventListener("click", chageBookStatus);
  coverButtonsContainer.appendChild(statusButton);

  // Remove button
  const removeButton = document.createElement("button");
  removeButton.textContent = "remove";
  removeButton.classList.add("remove-button");
  removeButton.dataset.bookIndex = bookIndex;
  removeButton.addEventListener("click", removeBook);
  coverButtonsContainer.appendChild(removeButton);

  // Create book-info div
  const bookInfo = document.createElement("div");
  bookInfo.classList.add("book-info");
  li.appendChild(bookInfo);

  // Author p element
  const author = document.createElement("p");
  author.classList.add("author");
  author.textContent = book.author;
  bookInfo.appendChild(author);

  // Title p element
  const title = document.createElement("p");
  title.classList.add("title");
  title.textContent = book.title;
  bookInfo.appendChild(title);

  // Pages p element
  const pages = document.createElement("p");
  pages.classList.add("pages");
  pages.textContent = book.pages + " pages";
  bookInfo.appendChild(pages);
}

function removeBook() {
  const bookIdx = this.dataset.bookIndex;

  myLibrary.splice(bookIdx, 1);
  updateLibrary();
}

function chageBookStatus() {
  const bookIdx = this.dataset.bookIndex;
  const currentStatus = myLibrary[bookIdx].read

  this.style.backgroundColor = (currentStatus) ? "var(--blue-color)" : "var(--green-color)";
  this.textContent = currentStatus ? "read" : "read";

  myLibrary[bookIdx].read = !myLibrary[bookIdx].read;
  
  updateLibrary();
}

// Cover
function generateCover() {
  // Generates radial-gradient from random rgb values to use as placeholder for the cover art
  colors = [generateRgbColor().join(", "), generateRgbColor().join(", ")];
  return `radial-gradient(ellipse at top, rgb(${colors[0]}), transparent), radial-gradient(ellipse at bottom, rgb(${colors[1]}), transparent)`;
}

function generateRgbColor() {
  rgb = [];

  for (let i = 0; i < 3; i++) {
    color = Math.floor(Math.random() * (255 - 0 + 1) + 0); // generates a random num between 0-255
    rgb.push(color);
  }
  
  return rgb
}

// MODAL
const modal = document.querySelector("#myModal");

const addBookButton = document.querySelector(".add-book-bttn");
addBookButton.addEventListener("click", () => modal.style.display = "block");

const closeModalButton = document.querySelector(".close");
closeModalButton.addEventListener("click", closeModal);

function closeModal() {
  modal.style.display = "none";
}

// FORM
const form = document.forms[0];

form.addEventListener("submit", function(event) {
  event.preventDefault();
  const formData = new FormData(this);
  const entries = formData.entries();
  const data = Object.fromEntries(entries);

  addBookToLibrary(data);
  clearForm();
  closeModal();
});

function clearForm() {
  const inputField = document.querySelectorAll(".input-field");
  inputField.forEach(input => input.value = "");

  const inputSelect = document.querySelector(".input-select");
  inputSelect.selectedIndex = 0;
}

// WEB STORAGE API
function saveData() {
  localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
}

function getData() {
  if(localStorage.myLibrary) {
    let objStr = localStorage.getItem("myLibrary");
    myLibrary = JSON.parse(objStr);
  }

  updateLibrary();
}

getData();