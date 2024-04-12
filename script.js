document.addEventListener("DOMContentLoaded", function (event) {
  function Book(title, author, pages, read) {
    (this.title = title),
      (this.author = author),
      (this.pages = pages),
      (this.read = read),
      (Book.prototype.toggleRead = function () {
        this.read = !this.read;
      });
  }

  function addBookToLibrary() {
    title = prompt("Book title: ");
    author = prompt("Author: ");
    pages = parseInt(prompt("Number of pages: "));
    read = prompt("Have you read it?");

    myLibrary.push(new Book(title, author, pages, read));
  }

  function removeFromLibrary(index) {
    return myLibrary.splice(index, 1);
  }

  function updateBookCards(index) {
    const bookElement = document.getElementById(index);
    const bookTitle = bookElement.querySelector("p.book-title");
    const bookAuthor = bookElement.querySelector("p.author");

    bookTitle.textContent = myLibrary[index].title;
    bookAuthor.textContent = myLibrary[index].author;
  }

  function removeBook(bookID) {
    const booksContainer = document.querySelector("div.main");
    let selected = bookID;
    const book = document.getElementById(selected);
    booksContainer.removeChild(book);
  }

  function updateIDs() {
    const bookContainer = document.querySelectorAll("div.card");
    bookContainer.forEach((book, index) => book.setAttribute("id", index));
  }

  function openModal(modal) {
    if (modal == null) return;
    modal.classList.add("active");
    overlay.classList.add("active");
  }

  function closeModal(modal) {
    if (modal == null) return;
    modal.classList.remove("active");
    overlay.classList.remove("active");
  }

  let myLibrary = [];

  const harry = new Book("Harry Potter", "JKR", 294, true);
  const plastus = new Book("Plastusiowy Pamietnik", "Szymborska", 69, true);
  const diuna = new Book("Diuna", "el Korniko", 203, false);

  myLibrary.push(harry, plastus, diuna);

  const addButton = document.querySelector("button[data-modal-target]");
  const closeModalButton = document.querySelector("button[data-close-button]");
  const removeAllButton = document.querySelector("button.removeAll");
  const removeButtons = document.querySelectorAll("button.remove");
  const backModalButton = document.querySelector("button.back");

  for (let book in myLibrary) {
    updateBookCards(book);
  }

  closeModalButton.addEventListener("click", () => {
    const modal = closeModalButton.closest(".modal");
    closeModal(modal);
  });

  backModalButton.addEventListener("click", () => {
    const modal = closeModalButton.closest(".modal");
    closeModal(modal);
  });

  addButton.addEventListener("click", () => {
    const modal = document.querySelector(addButton.dataset.modalTarget);
    openModal(modal);
  });

  removeAllButton.addEventListener("click", () => {
    const booksCollection = document.querySelectorAll("div.card");

    booksCollection.forEach((book) => {
      book.remove();
    });
    myLibrary = [];
  });

  removeButtons.forEach((button) =>
    button.addEventListener("click", (event) => {
      let target = event.target.parentNode.id;
      removeBook(target);
      updateIDs();
      myLibrary.splice(target, 1);
    })
  );
});
