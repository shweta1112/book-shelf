import React from "react";
function BookSearchResults(props) {
  return (
    <ol className="books-grid">
      {props.books.map(bookid => (
        <li key={bookid}>
          <div className="book">
            <div className="book-top">
              <div
                className="book-cover"
                style={{
                  width: 128,
                  height: 188,
                  backgroundImage:
                    props.bookMap[bookid].imageLinks &&
                    props.bookMap[bookid].imageLinks.smallThumbnail
                      ? `url(${props.bookMap[bookid].imageLinks.smallThumbnail})`
                      : `url("http://books.google.com/books/content?id=sJf1vQAACAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api")`
                }}
              ></div>
              <div className="book-shelf-changer">
                <select
                  onChange={event => props.getBookUpdated(bookid, event)}
                  value={props.bookMap[bookid].shelf}
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
            <div className="book-title">{props.bookMap[bookid].title}</div>
            <div className="book-authors">
              <div>
                {props.bookMap[bookid].authors &&
                  props.bookMap[bookid].authors.join()}
              </div>
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
}
export default BookSearchResults;
