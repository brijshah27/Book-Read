import React from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';
import Search from './Search';

var ReactRouter=require('react-router-dom');
var Router=ReactRouter.BrowserRouter;
var Route=ReactRouter.Route;
var Switch=ReactRouter.Switch;
var Link=require('react-router-dom').Link;

class BooksApp extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      showSearchPage: false,
      books : []
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleGetAll = this.handleGetAll.bind(this);
  }
  
  componentDidMount(){    
    this.handleGetAll();       
  }

  handleChange(event, book){
    BooksAPI.update(book, event.target.value).then((array) =>{
      this.handleGetAll();  
    });
  }

  handleGetAll(){
    BooksAPI.getAll().then((array) => {
      this.setState({
        showSearchPage:false,
        books : array
      });
    })
  }
  

  render() {
    let book_collection = this.state.books
    return (
        <div className="app">
        {this.state.showSearchPage ? (
          <Route path='/Search'>
          <Search 
          handleChange={this.handleChange}/>
          </Route>
          ) : (
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
              <div className="bookshelf">
                <h2 className="bookshelf-title">Currently Reading</h2>
                <div className="bookshelf-books">
                        <ol className="books-grid">
                {book_collection.map((book,index)=>(
                  <div>
                  
                    {book.shelf === "currentlyReading" &&(
                      
                          <li>
                            <div className="book">
                              <div className="book-top">
                                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                                <div className="book-shelf-changer">
                                  <select value={book.shelf} onChange={(e) => this.handleChange(e, book)}>
                                    <option value="none" disabled>Move to...</option>
                                    <option value="currentlyReading">Currently Reading</option>
                                    <option value="wantToRead">Want to Read</option>
                                    <option value="read">Read</option>
                                    <option value="none">None</option>
                                  </select>
                                </div>
                              </div>
                              <div className="book-title">{book.title}</div>
                              <div className="book-authors">{book.authors && (book.authors.map((author)=>(
                                <div>{author}</div>
                              )))}</div>
                            </div>
                          </li>
                       
                    )}
                    
                  </div>
                ),this)}
                </ol>
                      </div>
  
                <h2 className="bookshelf-title">Want to Read</h2>
                <div className="bookshelf-books">
                        <ol className="books-grid">
                {book_collection.map((book)=>(
                  <div>
                    {book.shelf==="wantToRead" &&(
                     
                          <li>
                            <div className="book">
                              <div className="book-top">
                                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                                <div className="book-shelf-changer">
                                  <select value={book.shelf} onChange={(e) => this.handleChange(e, book)}>
                                    <option value="none" disabled>Move to...</option>
                                    <option value="currentlyReading">Currently Reading</option>
                                    <option value="wantToRead">Want to Read</option>
                                    <option value="read">Read</option>
                                    <option value="none">None</option>
                                  </select>
                                </div>
                              </div>
                              <div className="book-title">{book.title}</div>
                              <div className="book-authors">{book.authors && (book.authors.map((author)=>(
                                <div>{author}</div>
                              )))}</div>
                            </div>
                          </li>
                       
                    )}
                   
                  </div>
                  
                ))}
                </ol>
                    </div>
  
                <h2 className="bookshelf-title">Read</h2>
                <div className="bookshelf-books">
                        <ol className="books-grid">
                {book_collection.map((book)=>(
                  <div>
                    {book.shelf === "read" &&(
                     
                          <li>
                            <div className="book">
                              <div className="book-top">
                                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                                <div className="book-shelf-changer">
                                  <select value={book.shelf} onChange={(e) => this.handleChange(e, book)}>
                                    <option value="none" disabled>Move to...</option>
                                    <option value="currentlyReading">Currently Reading</option>
                                    <option value="wantToRead">Want to Read</option>
                                    <option value="read">Read</option>
                                    <option value="none">None</option>
                                  </select>
                                </div>
                              </div>
                              <div className="book-title">{book.title}</div>
                              <div className="book-authors">{book.authors && (book.authors.map((author)=>(
                                <div>{author}</div>
                              )))}</div>
                            </div>
                          </li>
                       
                    )}
                  </div>
                ))}
                </ol>
                </div>
              </div>
          </div>
          <div className='open-search'>
          <Link
              to='/Search'>
              Add a Book
            </Link>
          </div>
        </div>)}
      </div>
      )
  }
}

export default BooksApp