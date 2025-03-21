
/**
 * Initializes the application by loading necessary data and rendering the main content and comments.
 * The function calls the following:
 * - `load()`: Loads necessary data.
 * - `renderMainContent()`: Renders the main content of the application.
 * - `renderComments()`: Renders the comments section.
 * - `renderCommentInput()`: (Currently commented out) Renders the comment input section.
 */
function init() {
  load();
  renderMainContent();
  renderComments();
  //renderCommentInput();
}

/**
 * Renders the main content of the bookstore by populating the mainContent element
 * with book templates. It iterates over the books array and appends the HTML
 * template for each book to the mainContent element.
 */
function renderMainContent() {
  let bookStoreWrapper = document.getElementById("mainContent");
  bookStoreWrapper.innerHTML = ``;

  for (let bookindex = 0; bookindex < books.length; bookindex++) {
    bookStoreWrapper.innerHTML += getMainContentTemplate(bookindex);
  }
}

/**
 * Renders comments for each book in the `books` array.
 * 
 * This function iterates over the `books` array and updates the HTML content
 * of the elements with IDs in the format `comments-{bookindex}` to display
 * the comments for each book. If a book has no comments, a placeholder message
 * is displayed.
 * 
 * The function assumes the existence of a global `books` array where each book
 * object contains a `comments` array. It also assumes the existence of a 
 * `getCommentTemplate` function that generates the HTML for a single comment.
 */
function renderComments() {
  for (let bookindex = 0; bookindex < books.length; bookindex++) {
    let commentsHtml = document.getElementById(`comments-${bookindex}`);
    commentsHtml.innerHTML = "";

    if (books[bookindex].comments.length === 0) {
      commentsHtml.innerHTML = `
    <p> Leider noch keine Kommentare... Sei der Erste </p>
  `;
    }
    for (
      let commentindex = 0;
      commentindex < books[bookindex].comments.length;
      commentindex++
    ) {
      commentsHtml.innerHTML += getCommentTemplate(bookindex, commentindex);
    }
  }
}

/**
 * Adds a comment to a book specified by its index.
 *
 * This function retrieves the username and comment input fields based on the provided book index.
 * If either input field is empty, it alerts the user to provide both a username and a comment.
 * Otherwise, it adds the comment to the beginning of the comments array for the specified book,
 * clears the input fields, saves the updated data, and reinitializes the view.
 *
 * @param {number} bookindex - The index of the book to which the comment will be added.
 * @returns {boolean} - Returns false if the input fields are empty, otherwise returns nothing.
 */
function addComment(bookindex) {
  let usernameInput = document.getElementById(`usernameInput${bookindex}`);
  let input = document.getElementById(`commentInput${bookindex}`);

  if (!input || !usernameInput || !input.value || !usernameInput.value) {
    alert("Bitte geben Sie einen Kommentar und einen Benutzernamen ein.");
    return false;
  } else {
    books[bookindex].comments.unshift({
      name: usernameInput.value,
      comment: input.value,
    });
    usernameInput.value = "";
    input.value = "";
  }
  save();
  init();
}

/**
 * Toggles the like status of a book and updates the like count accordingly.
 *
 * @param {number} bookindex - The index of the book in the books array.
 */
function likeThisPost(bookindex) {
  books[bookindex]["likes"] += books[bookindex]["liked"] ? 1 : -1;
  books[bookindex].liked = !books[bookindex].liked;
  save();
  init();
}

/**
 * Saves the current list of books to local storage.
 * Converts the `books` array to a JSON string and stores it
 * in the local storage under the key "books".
 */
function save() {
  let storeBooks = JSON.stringify(books);
  localStorage.setItem("books", storeBooks);
}

/**
 * Loads the books data from local storage and parses it into the `books` variable.
 * If no books data is found in local storage, the `books` variable remains unchanged.
 */
function load() {
  let storeBooks = localStorage.getItem("books");
  if (storeBooks) {
    books = JSON.parse(storeBooks);
  }
}
