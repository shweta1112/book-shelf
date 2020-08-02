import React, { useState } from "react";
import BookSearchResults from "./BookSearchResults";
import * as BooksAPI from "../serviceCalls/BooksAPI";
import { Link } from "react-router-dom";
import { debounce } from "lodash";
const BookInput = ({ books, getBookUpdated }) => {
  const [booksCollection, setBooksCollection] = useState([]);
  const [bookMap, setBookMap] = useState({});
  const [query, setQuery] = useState("");
  const onSearch = debounce((value) => {
    if (value) {
      setQuery(value.trim());
      BooksAPI.search(value).then((booksArray) => {
        let booksMapResponse = {};
        if (!booksArray.error) {
          booksArray
            .map((book) => {
              book.shelf = "none";
              return book;
            })
            .map((book) => (books[book.id] ? books[book.id] : book))
            .map((book) => (booksMapResponse[book.id] = book));
        } else {
          booksMapResponse = {};
          booksArray = [];
        }
        setBookMap(booksMapResponse);
        setBooksCollection(booksArray.map((book) => book.id));
      });
    } else {
      setBooksCollection([]);
    }
  }, 200);

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link to="/" className="close-search">
          Close
        </Link>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by category"
            onChange={(event) => onSearch(event.target.value)}
            value={query}
          />
        </div>
      </div>
      <div className="search-books-results">
        <BookSearchResults
          books={booksCollection}
          bookMap={bookMap}
          getBookUpdated={getBookUpdated}
        />
      </div>
    </div>
  );
};
export default BookInput;
