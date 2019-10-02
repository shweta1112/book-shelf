import React, { Component } from "react";
import BookSearchResults from "./BookSearchResults";
import * as BooksAPI from "./BooksAPI";
import { Link } from "react-router-dom";
class BookInput extends Component {
  state = {
    books: [],
    bookMap: {},
    query: ""
  };

  componentDidMount() {
    this.setState({
      books: Object.values(this.props.books).map(book => book.id),
      bookMap: this.props.books
    });
  }

  onSearch = value => {
    if (!value) {
      this.setState({ query: "" });
    } else {
      this.setState({ query: value.trim() });
      BooksAPI.search(value).then(booksArray => {
        let booksMapResponse = {};
        if (!booksArray.error) {
          booksArray.map(book => (booksMapResponse[book.id] = book));
        } else {
          booksMapResponse = {};
          booksArray = [];
        }
        this.setState({
          bookMap: booksMapResponse,
          books: booksArray.map(book => book.id)
        });
      });
    }
  };

  render() {
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
              onChange={event => this.onSearch(event.target.value)}
              value={this.props.query}
            />
          </div>
        </div>
        <div className="search-books-results">
          <BookSearchResults
            books={this.state.books}
            bookMap={this.state.bookMap}
            getBookUpdated={this.props.getBookUpdated}
          />
        </div>
      </div>
    );
  }
}
export default BookInput;
