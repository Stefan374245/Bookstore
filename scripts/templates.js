/**
 * Generates the main content template for a book.
 *
 * @param {number} bookindex - The index of the book in the books array.
 * @returns {string} The HTML template string for the main content of the book.
 */
function getMainContentTemplate(bookindex) {
  let heartImg = books[bookindex].liked
    ? "./assets/icons/heart.png"
    : "./assets/icons/heartFilled.png";

  return `
      <div class="bookStoreCard">
          <h1 class="h1bookName">${books[bookindex].name}</h1>
          <hr />
           <img src="${books[bookindex].image}" alt="" />
          <div class="priceLikeContainer">
           <p id="p1">  ${books[bookindex].price.toFixed(2)}<span>€</span> </p>
          <div class ="likesContainer">
            ${books[bookindex].likes} likes  
            <img src="${heartImg}" alt="like this post" class="heart" onclick="likeThisPost(${bookindex})">
          </div>
        </div>
          <hr />
           <table class="tableBookInfo">
              <tbody>
                <tr>
                    <td>Autor</td>
                    <td>${books[bookindex].author}</td>
                </tr>
                <tr>
                    <td>Release</td>
                    <td>${books[bookindex].publishedYear}</td>
                </tr>
                <tr>
                    <td>Genre</td>
                    <td>${books[bookindex].genre}</td>
                </tr>
              <tbody>
            </table>
        <hr />
         <h3>Kommentare</h3>
        <div class="commentBox" id="comments-${bookindex}">
          </div>

        <div class="usernameInputBox" id="commentInput-${bookindex}"> 
            <input type="text" id="usernameInput${bookindex}"
              placeholder="Benutzername eingeben">
            <textarea id="commentInput${bookindex}" rows="3" maxlength="55"
              placeholder="Dein Kommentar" class="commentInput"></textarea>
            <button class="btnPostComment" onclick="addComment(${bookindex})" >Kommentieren</button>   
        </div>
`;
}

/**
 * Generates an HTML template for a comment.
 *
 * @param {number} bookindex - The index of the book in the books array.
 * @param {number} commentindex - The index of the comment in the book's comments array.
 * @returns {string} The HTML template for the comment.
 */
function getCommentTemplate(bookindex, commentindex) {
  return `
        <ins>${books[bookindex].comments[commentindex].name}</ins>
        <p>${books[bookindex].comments[commentindex].comment}</p>
    `;
}
