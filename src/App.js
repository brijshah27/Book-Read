import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      showSearchPage: false,
      bookNames: [],
      currentlyReadingBooks: [],
      wantToReadBooks :[],
      readBooks: []
    }
  }
  // state = {
  //   /**
  //    * TODO: Instead of using this state variable to keep track of which page
  //    * we're on, use the URL in the browser's address bar. This will ensure that
  //    * users can use the browser's back and forward buttons to navigate between
  //    * pages, as well as provide a good URL they can bookmark and share.
  //    */
  //   showSearchPage: false,
  //   bookName: ''
  // }

  componentDidMount(){ 
    let temp_array = [];
    let currentlyReading = [];
    let wantToRead = [];
    let read = []
    let typeBook =""
    let bookName = BooksAPI.getAll().then((array) => {
      console.log("Whole response is>>> "+JSON.stringify(array))
      array.map( (book) => {
        typeBook = book.shelf
          temp_array.push(book.title)
          console.log(">>>>>"+ typeBook)
          if(typeBook==="currentlyReading"){
              currentlyReading.push({
                id:book.id,
			          img:book.imageLinks.thumbnail,
                type:book.shelf,
                title:book.title,
                author:book.authors
              })
          }
          else if(typeBook==="wantToRead"){
            wantToRead.push({
              id:book.id,
              img:book.imageLinks.thumbnail,
              type:book.shelf,
              title:book.title,
              author:book.authors
            })
          }
          else if(typeBook==="read"){
            read.push({
              id:book.id,
              img:book.imageLinks.thumbnail,
              type:book.shelf,
              title:book.title,
              author:book.authors
            })
          }
          
      })
      console.log("curr read>>>>>"+currentlyReading)
      console.log("want to read>>>>>"+wantToRead)
      console.log("read>>>>>"+read)
      this.setState({
        bookNames: temp_array,
        currentlyReadingBooks : currentlyReading,
        wantToReadBooks: wantToRead,
        readBooks : read
      });
    });       
  }

  render() {
    let currentlyReading = this.state.currentlyReadingBooks;
    let wantToRead = this.state.wantToReadBooks;
    let read = this.state.readBooks;
    //console.log(this.state.currentlyReadingBooks)
    //console.log("inside render: "+ book_array[0]);
    return (
      <div className="app">
      
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author"/>

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                    {currentlyReading.map(function(book, index){
                        let src = book.img
                        console.log(src+"........")
                              return (
                                <li>
                        <div className="book">
                          <div className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${src})` }}></div>
                            <div className="book-shelf-changer">
                              <select>
                                <option value="none" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                              </select>
                            </div>
                          </div>
                          
                          <div className="book-title">{book.title}</div>
                          <div className="book-authors">{book.author}</div>
                          <div></div>
                        </div>
                      </li>
                              );
                            })}
                     
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                    {wantToRead.map(function(book, index){
                        let src = book.img
                        console.log(src+"........")
                              return (
                                <li>
                        <div className="book">
                          <div className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${src})` }}></div>
                            <div className="book-shelf-changer">
                              <select>
                                <option value="none" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                              </select>
                            </div>
                          </div>
                          
                          <div className="book-title">{book.title}</div>
                          <div className="book-authors">{book.author}</div>
                          <div></div>
                        </div>
                      </li>
                              );
                            })}
                     
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                    {read.map(function(book, index){
                        let src = book.img
                        console.log(src+"........")
                              return (
                                <li>
                        <div className="book">
                          <div className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${src})` }}></div>
                            <div className="book-shelf-changer">
                              <select>
                                <option value="none" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                              </select>
                            </div>
                          </div>
                          
                          <div className="book-title">{book.title}</div>
                          <div className="book-authors">{book.author}</div>
                          <div></div>
                        </div>
                      </li>
                              );
                            })}
                     
                    </ol>
                  </div>
                </div>
              </div>
            </div>
            <div className="open-search">
              <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp