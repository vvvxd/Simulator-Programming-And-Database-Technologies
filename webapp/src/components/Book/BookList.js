import React, {Component} from "react";

import {connect} from "react-redux";
import {deleteBook} from "../../services/index";

import "./../../assets/css/Style.css";
import {Alert, Button, ButtonGroup, Card, FormControl, Image, InputGroup, Table,} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faFastBackward,
  faFastForward,
  faList,
  faSearch,
  faStepBackward,
  faStepForward,
  faTimes,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";
import MyToast from "../MyToast";
import axios from "axios";
import {BookAPI} from '../../api/api';

class BookList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      search: "",
      currentPage: 1,
      booksPerPage: 5,
      sortDir: "asc",
    };
  }
   compareAsc=(a, b)=> {
    if (Number(a.yearOfReading )> Number(b.yearOfReading )) return 1;
    if (Number(a.yearOfReading ) == Number(b.yearOfReading )) return 0;
    if (Number(a.yearOfReading ) < Number(b.yearOfReading )) return -1;
  }
  compareDesc=(a, b)=> {
    if (Number(a.yearOfReading )< Number(b.yearOfReading )) return 1;
    if (Number(a.yearOfReading ) == Number(b.yearOfReading )) return 0;
    if (Number(a.yearOfReading ) > Number(b.yearOfReading )) return -1;
  }
  
  sortData = () => {
    setTimeout(() => {
      if(this.state.sortDir === "asc"){
        this.setState({sortDir: "desc",books:this.state.books.sort(this.compareDesc)});
      }else{
        this.setState({sortDir: "asc",books:this.state.books.sort(this.compareAsc)});
      }
    }, 500);
  };
  
  componentDidMount() {
    this.findAllBooks(this.state.currentPage);
  }
  
  findAllBooks(currentPage) {
    currentPage -= 1;
    BookAPI.findAllBooks(currentPage,this.state.booksPerPage,this.props.auth.id)
    .then((response) => response.data)
    .then((data) => {
      console.log(data);
      this.setState({
        books: data.content,
        totalPages: data.totalPages,
        totalElements: data.totalElements,
        currentPage: data.number + 1,
      });
    })
    .catch((error) => {
      console.log(error);
      // localStorage.removeItem("jwtToken");
      // this.props.history.push("/");
    });
  }
  
  deleteBook = (bookId) => {
    this.props.deleteBook(bookId);
    if (this.props.bookObject != null) {
      this.setState({show: true});
      setTimeout(() => this.setState({show: false}), 3000);
      this.findAllBooks(this.state.currentPage);
    } else {
      this.setState({show: false});
    }
  };
  
  changePage = (event) => {
    let targetPage = parseInt(event.target.value);
    if (this.state.search) {
      this.searchData(targetPage);
    } else {
      this.findAllBooks(targetPage);
    }
    this.setState({
      [event.target.name]: targetPage,
    });
  };
  
  firstPage = () => {
    let firstPage = 1;
    if (this.state.currentPage > firstPage) {
      if (this.state.search) {
        this.searchData(firstPage);
      } else {
        this.findAllBooks(firstPage);
      }
    }
  };
  
  prevPage = () => {
    let prevPage = 1;
    if (this.state.currentPage > prevPage) {
      if (this.state.search) {
        this.searchData(this.state.currentPage - prevPage);
      } else {
        this.findAllBooks(this.state.currentPage - prevPage);
      }
    }
  };
  
  lastPage = () => {
    let condition = Math.ceil(
      this.state.totalElements / this.state.booksPerPage
    );
    if (this.state.currentPage < condition) {
      if (this.state.search) {
        this.searchData(condition);
      } else {
        this.findAllBooks(condition);
      }
    }
  };
  
  nextPage = () => {
    if (
      this.state.currentPage <
      Math.ceil(this.state.totalElements / this.state.booksPerPage)
    ) {
      if (this.state.search) {
        this.searchData(this.state.currentPage + 1);
      } else {
        this.findAllBooks(this.state.currentPage + 1);
      }
    }
  };
  
  searchChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  
  cancelSearch = () => {
    this.setState({search: ""});
    this.findAllBooks(this.state.currentPage);
  };
  
  searchData = (currentPage) => {
    currentPage -= 1;
    BookAPI.searchData(this.state.search,currentPage,this.state.booksPerPage,this.props.auth.id)
    .then((response) => response.data)
    .then((data) => {
      this.setState({
        books: data.content,
        totalPages: data.totalPages,
        totalElements: data.totalElements,
        currentPage: data.number + 1,
      });
    });
  };
  
  render() {
    const {books, currentPage, totalPages, search} = this.state;
    
    return (
      <div>
        <div style={{display: this.state.show ? "block" : "none"}}>
          <MyToast
            show={this.state.show}
            message={"Book Deleted Successfully."}
            type={"danger"}
          />
        </div>
        {!!this.props.auth.isLoggedIn
          ?
          <Card className={"border border-dark bg-dark text-white"}>
            <Card.Header>
              <div style={{float: "left"}}>
                <FontAwesomeIcon icon={faList}/> Book List
              </div>
              <div style={{float: "right"}}>
                <InputGroup size="sm">
                  <FormControl
                    placeholder="Search"
                    name="search"
                    value={search}
                    className={"info-border bg-dark text-white"}
                    onChange={this.searchChange}
                  />
                  <InputGroup.Append>
                    <Button
                      size="sm"
                      variant="outline-info"
                      type="button"
                      onClick={this.searchData}
                    >
                      <FontAwesomeIcon icon={faSearch}/>
                    </Button>
                    <Button
                      size="sm"
                      variant="outline-danger"
                      type="button"
                      onClick={this.cancelSearch}
                    >
                      <FontAwesomeIcon icon={faTimes}/>
                    </Button>
                  </InputGroup.Append>
                </InputGroup>
              </div>
            </Card.Header>
            <Card.Body>
              <Table bordered hover striped variant="dark">
                <thead>
                <tr>
                  <th>Title</th>
                  <th>Author</th>
                  <th onClick={this.sortData}>
                    Year Of Reading{" "}
                    <div
                      className={
                        this.state.sortDir === "asc"
                          ? "arrow arrow-up"
                          : "arrow arrow-down"
                      }
                    >
                      {" "}
                    </div>
                  </th>
                  <th>Price</th>
                  <th>Language</th>
                  <th>Type</th>
                  <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {books.length === 0 ? (
                  <tr align="center">
                    <td colSpan="7">No Books Available.</td>
                  </tr>
                ) : (
                  books.map((book) => (
                    <tr key={book.id}>
                      <td>
                        <Image
                          src={book.coverPhotoURL}
                          roundedCircle
                          width="25"
                          height="25"
                        />{" "}
                        {book.title}
                      </td>
                      <td>{book.author}</td>
                      <td>{book.yearOfReading}</td>
                      <td>{book.price}</td>
                      <td>{book.language}</td>
                      <td>{book.type}</td>
                      <td>
                        <ButtonGroup>
                          <Link
                            to={"edit/" + book.id}
                            className="btn btn-sm btn-outline-primary"
                          >
                            <FontAwesomeIcon icon={faEdit}/>
                          </Link>{" "}
                          <Button
                            size="sm"
                            variant="outline-danger"
                            onClick={() => this.deleteBook(book.id)}
                          >
                            <FontAwesomeIcon icon={faTrash}/>
                          </Button>
                        </ButtonGroup>
                      </td>
                    </tr>
                  ))
                )}
                </tbody>
              </Table>
            </Card.Body>
            {books.length > 0 ? (
              <Card.Footer>
                <div style={{float: "left"}}>
                  Showing Page {currentPage} of {totalPages}
                </div>
                <div style={{float: "right"}}>
                  <InputGroup size="sm">
                    <InputGroup.Prepend>
                      <Button
                        type="button"
                        variant="outline-info"
                        disabled={currentPage === 1 ? true : false}
                        onClick={this.firstPage}
                      >
                        <FontAwesomeIcon icon={faFastBackward}/> First
                      </Button>
                      <Button
                        type="button"
                        variant="outline-info"
                        disabled={currentPage === 1 ? true : false}
                        onClick={this.prevPage}
                      >
                        <FontAwesomeIcon icon={faStepBackward}/> Prev
                      </Button>
                    </InputGroup.Prepend>
                    <FormControl
                      className={"page-num bg-dark"}
                      name="currentPage"
                      value={currentPage}
                      onChange={this.changePage}
                    />
                    <InputGroup.Append>
                      <Button
                        type="button"
                        variant="outline-info"
                        disabled={currentPage === totalPages ? true : false}
                        onClick={this.nextPage}
                      >
                        <FontAwesomeIcon icon={faStepForward}/> Next
                      </Button>
                      <Button
                        type="button"
                        variant="outline-info"
                        disabled={currentPage === totalPages ? true : false}
                        onClick={this.lastPage}
                      >
                        <FontAwesomeIcon icon={faFastForward}/> Last
                      </Button>
                    </InputGroup.Append>
                  </InputGroup>
                </div>
              </Card.Footer>
            ) : null}
          </Card>
          : <Alert style={{backgroundColor: "#343A40", color: "#ffffff80"}}>
              Please login
            </Alert>}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    bookObject: state.book,
    auth: state.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteBook: (bookId) => dispatch(deleteBook(bookId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookList);
