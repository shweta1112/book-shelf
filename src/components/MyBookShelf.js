import React from "react";
import { Link } from "react-router-dom";
import "../App.css";
import BookSearchResults from "./BookSearchResults";

const MyBookShelf = ({
  books,
  getBookUpdated,
  currentlyReadingBooks,
  wantToReadBooks,
  readBooks,
}) => {
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          {
            <div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Currently Reading</h2>
                <div className="bookshelf-books">
                  <BookSearchResults
                    key="CurrentlyReading"
                    books={currentlyReadingBooks}
                    bookMap={books}
                    getBookUpdated={getBookUpdated}
                  />
                </div>
              </div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Want to Read</h2>
                <div className="bookshelf-books">
                  <BookSearchResults
                    key="WantToRead"
                    books={wantToReadBooks}
                    bookMap={books}
                    getBookUpdated={getBookUpdated}
                  />
                </div>
              </div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Read</h2>
                <div className="bookshelf-books">
                  <BookSearchResults
                    key="Read"
                    books={readBooks}
                    bookMap={books}
                    getBookUpdated={getBookUpdated}
                  />
                </div>
              </div>
            </div>
          }
          )
        </div>
      </div>
      <div className="open-search">
        <Link to="/search" className="add-contact">
          Add a book
        </Link>
      </div>
    </div>
  );
};

export default MyBookShelf;
