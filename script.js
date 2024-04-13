document.addEventListener("DOMContentLoaded", function (event) {
  function Book(title, author, pages, read, image = "") {
    (this.title = title),
      (this.author = author),
      (this.pages = pages),
      (this.read = read),
      (this.image = image);
    Book.prototype.toggleRead = function () {
      this.read = !this.read;
    };
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
    const bookPages = bookElement.querySelector("p.pages");
    const isRead = bookElement.querySelector("#is-read");

    bookTitle.textContent = myLibrary[index].title;
    bookAuthor.textContent = myLibrary[index].author;
    bookPages.textContent = myLibrary[index].pages + " pages";

    if (myLibrary[index].read === true) {
      isRead.checked = true;
    }
  }

  function removeBook(bookID) {
    const booksContainer = document.querySelector("div.main");
    const book = document.getElementById(bookID);
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

  function createDivElement(className) {
    const div = document.createElement("div");
    div.classList.add(className);
    return div;
  }

  function createParagraphElement(className, string) {
    const para = document.createElement("p");
    para.classList.add(className);
    para.textContent = string;
    return para;
  }

  function createButtonElement(className) {
    const button = document.createElement("button");
    button.classList.add(className);
    button.textContent = "Remove";
    return button;
  }

  function createImageElement(className, source = "image/cover.jpg") {
    const cover = document.createElement("img");
    cover.classList.add(className);

    cover.src = source;
    return cover;
  }

  function createCheckboxElement(id, read) {
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = id;
    if (read === true) checkbox.checked = true;
    return checkbox;
  }

  function createLabelElement(check) {
    const label = document.createElement("label");
    label.setAttribute("for", check);
    label.textContent = "Read";
    return label;
  }

  function getInputVales() {
    const bookTitle = document.getElementById("title").value;
    const bookAuthor = document.getElementById("author").value;
    const read = document.getElementById("read").checked;
    const pages = document.getElementById("pages").value;

    return new Book(bookTitle, bookAuthor, pages, read);
  }

  let myLibrary = [];

  const meditations = new Book("Meditations", "Marcus Aurelius", 304, true);
  const coffee = new Book(
    "Before the Coffee Gets Cold",
    "Toshikazu Kawaguchi",
    240,
    false
  );
  const algernon = new Book("Flowers for Algernon", "Daniel Keyes", 311, true);

  myLibrary.push(meditations, coffee, algernon);

  const addButton = document.querySelector("button[data-modal-target]");
  const closeModalButton = document.querySelector("button[data-close-button]");
  const removeAllButton = document.querySelector("button.removeAll");
  const backModalButton = document.querySelector("button.back");
  const form = document.querySelector("form.new-book");

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

  document.addEventListener("change", function (event) {
    if (event.target.id === "is-read") {
      const bookID = event.target.parentNode.parentNode.id;
      myLibrary[bookID].toggleRead();
    }
  });

  document.addEventListener("click", (event) => {
    if (event.target.classList.contains("remove")) {
      let target = event.target.parentNode.id;
      removeBook(target);
      updateIDs();
      myLibrary.splice(target, 1);
    }
  });

  var uploadedImageFile = null;

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    var fileInput = document.getElementById("image");

    const modal = form.closest(".modal");
    const bookSet = document.querySelector(".main");

    const myBook = getInputVales();
    const newBook = createDivElement("card");

    const newTitle = createParagraphElement("book-title", myBook.title);
    const newAuthor = createParagraphElement("author", myBook.author);
    const newPages = createParagraphElement("pages", myBook.pages);
    const newCheckbox = createCheckboxElement("is-read", myBook.read);
    const newCover = createImageElement("thumbnail");
    const newCheckboxContainer = createDivElement("checkbox");
    const newLabel = createLabelElement("is-read");
    const newButton = createButtonElement("remove");

    if (fileInput.files && fileInput.files[0]) {
      uploadedImageFile = fileInput.files[0];
      var reader = new FileReader();
      reader.onload = function (event) {
        var imageUrl = event.target.result;
        return (newCover.src = imageUrl);
      };
      reader.readAsDataURL(uploadedImageFile);
    }

    bookSet.appendChild(newBook);
    newBook.appendChild(newTitle);
    newBook.appendChild(newAuthor);
    newBook.appendChild(newPages);
    newBook.appendChild(newCover);
    newBook.appendChild(newCheckboxContainer);
    newCheckboxContainer.appendChild(newLabel);
    newCheckboxContainer.appendChild(newCheckbox);
    newBook.appendChild(newButton);

    myLibrary.push(myBook);
    updateIDs();
    closeModal(modal);
    form.reset();
  });
});
