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
    if (className === "pages" && string !== "") para.textContent += " pages";
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

  function getInputValues() {
    const bookTitle = document.getElementById("title").value;
    const bookAuthor = document.getElementById("author").value;
    const read = document.getElementById("read").checked;
    const pages = document.getElementById("pages").value;

    return new Book(bookTitle, bookAuthor, pages, read);
  }

  function isFileInput(fileInput) {
    return fileInput.files && fileInput.files[0];
  }

  let myLibrary = [];

  const meditations = new Book("Meditations", "Marcus Aurelius", 304, false);
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
  const label = document.getElementById("file-label");
  const imageInput = document.getElementById("image");
  var fileInput = document.getElementById("image");

  for (let book in myLibrary) {
    updateBookCards(book);
  }

  imageInput.addEventListener("change", () => {
    if (isFileInput(fileInput)) {
      label.classList.add("fileUploaded");
    }
  });

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

    var result = window.confirm("Are you sure?");

    if (result) {
      booksCollection.forEach((book) => {
        book.remove();
        myLibrary = [];
      });
    }
  });

  document.addEventListener("change", function (event) {
    if (event.target.id === "is-read") {
      const bookID = event.target.parentNode.parentNode.id;
      myLibrary[bookID].toggleRead();
      if (event.target.checked === true) {
        document.getElementById(bookID).classList.add("completed");
      } else {
        document.getElementById(bookID).classList.remove("completed");
      }
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

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const modal = form.closest(".modal");
    const bookSet = document.querySelector(".main");

    const myBook = getInputValues();
    const newBook = createDivElement("card");

    if (myBook.read === true) {
      newBook.classList.add("completed");
    }

    const newTitle = createParagraphElement("book-title", myBook.title);
    const newAuthor = createParagraphElement("author", myBook.author);
    const newPages = createParagraphElement("pages", myBook.pages);
    const newCheckbox = createCheckboxElement("is-read", myBook.read);
    const newCover = createImageElement("thumbnail");
    const newCheckboxContainer = createDivElement("checkbox");
    const newLabel = createLabelElement("is-read");
    const newButton = createButtonElement("remove");

    if (isFileInput(fileInput)) {
      uploadedImageFile = fileInput.files[0];
      var reader = new FileReader();
      reader.onload = function (event) {
        var imageUrl = event.target.result;
        return (newCover.src = imageUrl);
      };
      reader.readAsDataURL(uploadedImageFile);
    }

    bookSet.appendChild(newBook);
    newBook.append(
      newTitle,
      newAuthor,
      newPages,
      newCover,
      newCheckboxContainer,
      newButton
    );
    newCheckboxContainer.append(newLabel, newCheckbox);

    myLibrary.push(myBook);
    label.classList.remove("fileUploaded");
    updateIDs();
    closeModal(modal);
    form.reset();
  });

  //form validation

  const title = document.getElementById("title");
  const author = document.getElementById("author");

  title.addEventListener("input", (event) => {
    const titleValue = title.value.trim();

    if (titleValue === "") {
      title.setCustomValidity("Please fill out title name");
    } else if (titleValue.length < 3) {
      title.setCustomValidity(
        `Title name too short, it should be at least 3 characters, you used ${titleValue.length}`
      );
    } else if (titleValue.length > 25) {
      title.setCustomValidity(
        `Title name too short, it should be at max 25 characters, you used ${titleValue.length}`
      );
    } else {
      title.setCustomValidity("");
    }
  });

  author.addEventListener("input", (event) => {
    const authorValue = author.value.trim();

    if (authorValue === "") {
      author.setCustomValidity("Please fill out book name");
    } else if (authorValue.length < 3) {
      author.setCustomValidity(
        `Author's name too short, should be at least 3 characters, you entered ${author.value.length} characters`
      );
    } else if (authorValue.length > 22) {
      author.setCustomValidity(
        `Author's name too long, should be max 22 characters, you entered ${author.value.length} characters`
      );
    } else if (!/^[A-Za-z\s]+$/.test(authorValue)) {
      author.setCustomValidity("Please only use letters A-Z and spaces");
    } else {
      author.setCustomValidity("");
    }
  });
});
