import React from "react";
const BookSearchResults = ({ books, bookMap, getBookUpdated }) => {
  return (
    <ol className="books-grid">
      {books.map((bookid) => (
        <li key={bookid}>
          <div className="book">
            <div className="book-top">
              <div
                className="book-cover"
                style={{
                  width: 128,
                  height: 188,
                  backgroundImage:
                    bookMap[bookid].imageLinks &&
                    bookMap[bookid].imageLinks.smallThumbnail
                      ? `url(${bookMap[bookid].imageLinks.smallThumbnail})`
                      : `url("http://books.google.com/books/content?id=sJf1vQAACAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api")`,
                }}
              ></div>

              <div className="book-shelf-changer">
                <select
                  onChange={(event) => getBookUpdated(bookid, event)}
                  value={bookMap[bookid].shelf}
                >
                  <option value="move" disabled>
                    Move to...
                  </option>
                  <option value="currentlyReading">Currently Reading</option>
                  <option value="wantToRead">Want to Read</option>
                  <option value="read">Read</option>
                  <option value="none">None</option>
                </select>
              </div>
            </div>
            <div className="book-title">{bookMap[bookid].title}</div>
            <div className="book-authors">
              <div>
                {bookMap[bookid].authors && bookMap[bookid].authors.join()}
              </div>
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
};
export default BookSearchResults;
