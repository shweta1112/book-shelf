import React, { useState, useEffect } from "react";
import * as BooksAPI from "./serviceCalls/BooksAPI";
import BookInput from "./components/book_input/BookInput.component";
import MyBookShelf from "./components/my_book_shelf/MyBookShelf.component";
import "./App.css";
import { Route } from "react-router-dom";

const BooksApp = () => {
  const [books, setBooks] = useState({});
  const [wantToReadBooks, setWantToReadBooks] = useState([]);
  const [currentlyReadingBooks, setCurrentlyReadingBooks] = useState([]);
  const [readBooks, setReadBooks] = useState([]);

  useEffect(() => {
    const getBooks = () => {
      BooksAPI.getAll().then((booksArray) => {
        booksArray.map((book) => (books[book.id] = book));
        setBooks(books);
        setWantToReadBooks(
          booksArray
            .filter((book) => book.shelf === "wantToRead")
            .map((book) => book.id)
        );
        setCurrentlyReadingBooks(
          booksArray
            .filter((book) => book.shelf === "currentlyReading")
            .map((book) => book.id)
        );
        setReadBooks(
          booksArray
            .filter((book) => book.shelf === "read")
            .map((book) => book.id)
        );
      });
    };
    getBooks();
  }, [books]);

  const getBookUpdated = (bookid, event) => {
    const selectedValue = event.target.value;
    BooksAPI.get(bookid)
      .then((book) => {
        books[bookid] = book;
      })
      .then(() => {
        books[bookid].shelf = selectedValue;
        BooksAPI.update(bookid, selectedValue).then((resp) => {
          setCurrentlyReadingBooks(resp["currentlyReading"]);
          setWantToReadBooks(resp["wantToRead"]);
          setReadBooks(resp["read"]);
        });
      });
  };

  return (
    <div className="app">
      <Route
        exact
        path="/"
        render={() => (
          <MyBookShelf
            key={books.title}
            books={books}
            getBookUpdated={getBookUpdated}
            currentlyReadingBooks={currentlyReadingBooks}
            wantToReadBooks={wantToReadBooks}
            readBooks={readBooks}
          />
        )}
      />
      <Route
        path="/search"
        render={({ history }) => (
          <BookInput
            books={books}
            getBookUpdated={(book, shelf) => {
              getBookUpdated(book, shelf);
              history.push("/");
            }}
          />
        )}
      />
    </div>
  );
};

export default BooksApp;
