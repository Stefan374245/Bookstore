function init() {
  load();
  renderMainContent();
  renderComments();
  //renderCommentInput();
}

function renderMainContent() {
  let bookStoreWrapper = document.getElementById("mainContent");
  bookStoreWrapper.innerHTML = ``;

  for (let bookindex = 0; bookindex < books.length; bookindex++) {
    bookStoreWrapper.innerHTML += getMainContentTemplate(bookindex);
  }
}

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
 


function likeThisPost(bookindex) {
  books[bookindex]["likes"] += books[bookindex]["liked"] ? 1 : -1;
  books[bookindex].liked = !books[bookindex].liked;
  save();
  init();
}

function save() {
  let storeBooks = JSON.stringify(books);
  localStorage.setItem("books", storeBooks);
}

function load() {
  let storeBooks = localStorage.getItem("books");
  if (storeBooks) {
    books = JSON.parse(storeBooks);
  }
}
