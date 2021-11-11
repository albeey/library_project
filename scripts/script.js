const book1 = new Book("Harry Potter and the Philosopher's Stone", "J. K. Rowling", 223, true);
const book2 = new Book("Harry Potter and the Chamber of Secrets", "J. K. Rowling", 251, false);
const book3 = new Book("Harry Potter and the Prisoner of Azkaban", "J. K. Rowling", 317, false);
const book4 = new Book("Harry Potter and the Goblet of Fire", "J. K. Rowling", 636, true);
const book5 = new Book("Harry Potter and the Order of the Phoenix", "J. K. Rowling", 	766, false);

let myLibrary = [book1, book2, book3, book4, book5];

updateLibrary();

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
}

function updateLibrary() {
  const bookList = document.querySelector(".book-list");
  bookList.textContent = "";

  myLibrary.forEach(book => {
    displayBook(book);
  });
}

// Create book on DOM
function displayBook(book) {
  // Unordered list
  const ul = document.querySelector(".book-list");

  // Create list item
  const li = document.createElement("li");
  li.dataset.bookIndex = myLibrary.indexOf(book);
  li.classList.add("book");
  ul.appendChild(li);
  
  // Create book-cover div
  const bookCover = document.createElement("div");
  bookCover.classList.add("book-cover");
  bookCover.style.background = book.cover;
  li.appendChild(bookCover);

  // // Buttons Container
  // const coverButtonsContainer = document.createElement("div");
  // coverButtonsContainer.classList.add("book-buttons-container");
  // bookCover.appendChild(coverButtonsContainer);

  // Remove button
  const removeButton = document.createElement("button");
  removeButton.textContent = "remove";
  removeButton.classList.add("remove-button");
  removeButton.dataset.bookIndex = myLibrary.indexOf(book);
  removeButton.addEventListener("click", removeBook);
  // coverButtonsContainer.appendChild(removeButton)
  bookCover.appendChild(removeButton);

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
  const removeBookAtIndex = this.dataset.bookIndex;

  myLibrary.splice(removeBookAtIndex, 1);
  updateLibrary();
}

// Cover
function generateCover() {
  // Generates radial-gradient from random rgb values to use as placeholder for the cover art
  color1 = generateRgbColor().join(", ");
  color2 = generateRgbColor().join(", ");

  return `radial-gradient(ellipse at top, rgb(${color1}), transparent), radial-gradient(ellipse at bottom, rgb(${color2}), transparent)`;
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