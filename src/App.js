import React from "react";
import * as BooksAPI from "./BooksAPI";
import BookInput from "./BookInput";
import MyBookShelf from "./MyBookShelf";
import "./App.css";
import { Route } from "react-router-dom";

class BooksApp extends React.Component {
  state = {
    books: {},
    wantToReadBooks: [],
    currentlyReadingBooks: [],
    readBooks: []
  };
  componentDidMount() {
    this.getBooks();
  }

  getBooks = () => {
    BooksAPI.getAll().then(booksArray => {
      let booksMap = this.state.books;
      booksArray.map(book => (booksMap[book.id] = book));
      this.setState({
        books: booksMap,
        wantToReadBooks: booksArray
          .filter(book => book.shelf === "wantToRead")
          .map(book => book.id),
        currentlyReadingBooks: booksArray
          .filter(book => book.shelf === "currentlyReading")
          .map(book => book.id),
        readBooks: booksArray
          .filter(book => book.shelf === "read")
          .map(book => book.id)
      });
      console.log(this.state.readBooks);
    });
  };

  getBookUpdated = (bookid, event) => {
    const selectedValue = event.target.value;
    let booksCopy = this.state.books;
    BooksAPI.get(bookid)
      .then(book => {
        booksCopy[bookid] = book;
      })
      .then(() => {
        booksCopy[bookid].shelf = selectedValue;
        BooksAPI.update(bookid, selectedValue).then(resp => {
          this.setState({
            currentlyReadingBooks: resp["currentlyReading"],
            wantToReadBooks: resp["wantToRead"],
            readBooks: resp["read"],
            books: booksCopy
          });
        });
      });
  };

  render() {
    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() => (
            <MyBookShelf
              key={this.state.books.title}
              books={this.state.books}
              getBookUpdated={this.getBookUpdated}
              currentlyReadingBooks={this.state.currentlyReadingBooks}
              wantToReadBooks={this.state.wantToReadBooks}
              readBooks={this.state.readBooks}
            />
          )}
        />
        <Route
          path="/search"
          render={({ history }) => (
            <BookInput
              books={this.state.books}
              getBookUpdated={(book, shelf) => {
                this.getBookUpdated(book, shelf);
                history.push("/");
              }}
            />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
