import React, {Component} from "react";

import {connect} from "react-redux";
import {fetchBook, fetchLanguages, fetchTypes, saveBook, updateBook,} from "../../services/index";

import {Alert, Button, Card, Col, Form, Image, InputGroup} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faList, faPlusSquare, faSave, faUndo,} from "@fortawesome/free-solid-svg-icons";
import MyToast from "../MyToast";

class Book extends Component {
  constructor(props) {
    super(props);
    this.state = this.initialState;
    this.state = {
      types: [],
      languages: [],
      show: false,
    };
  }
  
  initialState = {
    id: "",
    title: "",
    author: "",
    coverPhotoURL: "",
    yearOfReading: "",
    price: "",
    language: "",
    type: "",
  };
  
  componentDidMount() {
    const bookId = +this.props.match.params.id;
    if (bookId) {
      this.findBookById(bookId);
    }
    this.findAllLanguages();
  }
  
  findAllLanguages = () => {
    this.props.fetchLanguages();
    setTimeout(() => {
      let bookLanguages = this.props.bookObject.languages;
      if (bookLanguages) {
        this.setState({
          languages: [{ value: "", display: "Select Language" }].concat(
            bookLanguages.map((language) => {
              return { value: language, display: language };
            })
          ),
        });
        this.findAllTypes();
      }
    }, 100);
  };
  
  findAllTypes = () => {
    this.props.fetchTypes();
    setTimeout(() => {
      let bookGenres = this.props.bookObject.types;
      if (bookGenres) {
        this.setState({
          types: [{ value: "", display: "Select Type" }].concat(
            bookGenres.map((types) => {
              return { value: types, display: types };
            })
          ),
        });
      }
    }, 100);
  };
  
  findBookById = (bookId) => {
    this.props.fetchBook(bookId);
    setTimeout(() => {
      let book = this.props.bookObject.book;
      if (book != null) {
        this.setState({
          id: book.id,
          title: book.title,
          author: book.author,
          coverPhotoURL: book.coverPhotoURL,
          yearOfReading: book.yearOfReading,
          price: book.price,
          language: book.language,
          type: book.type,
          user: book.user,
        });
      }
    }, 1000);
  };
  
  resetBook = () => {
    this.setState(() => this.initialState);
  };
  
  submitBook = (event) => {
    event.preventDefault();
    
    const book = {
      title: this.state.title,
      author: this.state.author,
      coverPhotoURL: this.state.coverPhotoURL,
      yearOfReading: this.state.yearOfReading,
      price: this.state.price,
      language: this.state.language,
      type: this.state.type,
      user: this.props.auth.id,
    };
    console.log(book);
    this.props.saveBook(book);
    setTimeout(() => {
      if (this.props.bookObject.book != null) {
        this.setState({ show: true, method: "post" });
        setTimeout(() => this.setState({ show: false }), 3000);
      } else {
        this.setState({ show: false });
      }
    }, 2000);
    this.setState(this.initialState);
  };
  
  updateBook = (event) => {
    event.preventDefault();
    
    const book = {
      id: this.state.id,
      title: this.state.title,
      author: this.state.author,
      coverPhotoURL: this.state.coverPhotoURL,
      yearOfReading: this.state.yearOfReading,
      price: this.state.price,
      language: this.state.language,
      type: this.state.type,
      user: this.props.auth.id,
    };
    this.props.updateBook(book);
    setTimeout(() => {
      if (this.props.bookObject.book != null) {
        this.setState({ show: true, method: "put" });
        setTimeout(() => this.setState({ show: false }), 3000);
      } else {
        this.setState({ show: false });
      }
    }, 2000);
    this.setState(this.initialState);
  };
  
  bookChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  
  bookList = () => {
    return this.props.history.push("/list");
  };
  
  render() {
    const {title, author, coverPhotoURL, yearOfReading, price, language, type} =
      this.state;
    
    return (
      <div>
        <div style={{display: this.state.show ? "block" : "none"}}>
          <MyToast
            show={this.state.show}
            message={
              this.state.method === "put"
                ? "Book Updated Successfully."
                : "Book Saved Successfully."
            }
            type={"success"}
          />
        </div>
        {!!this.props.auth.isLoggedIn
          ? <Card className={"border border-dark bg-dark text-white"}>
            <Card.Header>
              <FontAwesomeIcon icon={this.state.id ? faEdit : faPlusSquare}/>{" "}
              {this.state.id ? "Update Book" : "Add New Book"}
            </Card.Header>
            <Form
              onReset={this.resetBook}
              onSubmit={this.state.id ? this.updateBook : this.submitBook}
              id="bookFormId"
            >
              <Card.Body>
                <Form.Row>
                  <Form.Group as={Col} controlId="formGridTitle">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                      required
                      autoComplete="off"
                      type="test"
                      name="title"
                      value={title}
                      onChange={this.bookChange}
                      className={"bg-dark text-white"}
                      placeholder="Enter Book Title"
                    />
                  </Form.Group>
                  <Form.Group as={Col} controlId="formGridAuthor">
                    <Form.Label>Author</Form.Label>
                    <Form.Control
                      required
                      autoComplete="off"
                      type="test"
                      name="author"
                      value={author}
                      onChange={this.bookChange}
                      className={"bg-dark text-white"}
                      placeholder="Enter Book Author"
                    />
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Form.Group as={Col} controlId="formGridCoverPhotoURL">
                    <Form.Label>Cover Photo URL</Form.Label>
                    <InputGroup>
                      <Form.Control
                        required
                        autoComplete="off"
                        type="test"
                        name="coverPhotoURL"
                        value={coverPhotoURL}
                        onChange={this.bookChange}
                        className={"bg-dark text-white"}
                        placeholder="Enter Book Cover Photo URL"
                      />
                      <InputGroup.Append>
                        {this.state.coverPhotoURL !== "" && (
                          <Image
                            src={this.state.coverPhotoURL}
                            roundedRight
                            width="40"
                            height="38"
                          />
                        )}
                      </InputGroup.Append>
                    </InputGroup>
                  </Form.Group>
                  <Form.Group as={Col} controlId="formGridYearOfReading">
                    <Form.Label>Year of reading</Form.Label>
                    <Form.Control
                      required
                      autoComplete="off"
                      type="test"
                      name="yearOfReading"
                      value={yearOfReading}
                      onChange={this.bookChange}
                      className={"bg-dark text-white"}
                      placeholder="Enter Year of reading"
                    />
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Form.Group as={Col} controlId="formGridPrice">
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                      required
                      autoComplete="off"
                      type="test"
                      name="price"
                      value={price}
                      onChange={this.bookChange}
                      className={"bg-dark text-white"}
                      placeholder="Enter Book Price"
                    />
                  </Form.Group>
                  <Form.Group as={Col} controlId="formGridLanguage">
                    <Form.Label>Language</Form.Label>
                    <Form.Control
                      required
                      as="select"
                      custom
                      onChange={this.bookChange}
                      name="language"
                      value={language}
                      className={"bg-dark text-white"}
                    >
                      {this.state.types.map((language) => (
                        <option key={language.value} value={language.value}>
                          {language.display}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                  <Form.Group as={Col} controlId="formGridType">
                    <Form.Label>Type</Form.Label>
                    <Form.Control
                      required
                      as="select"
                      custom
                      onChange={this.bookChange}
                      name="type"
                      value={type}
                      className={"bg-dark text-white"}
                    >
                      {this.state.languages.map((genre) => (
                        <option key={genre.value} value={genre.value}>
                          {genre.display}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                </Form.Row>
              </Card.Body>
              <Card.Footer style={{textAlign: "right"}}>
                <Button size="sm" variant="success" type="submit">
                  <FontAwesomeIcon icon={faSave}/>{" "}
                  {this.state.id ? "Update" : "Save"}
                </Button>{" "}
                <Button size="sm" variant="info" type="reset">
                  <FontAwesomeIcon icon={faUndo}/> Reset
                </Button>{" "}
                <Button
                  size="sm"
                  variant="info"
                  type="button"
                  onClick={() => this.bookList()}
                >
                  <FontAwesomeIcon icon={faList}/> Book List
                </Button>
              </Card.Footer>
            </Form>
          </Card>
          : <Alert style={{backgroundColor: "#343A40", color: "#ffffff80"}}>
            Please login
          </Alert>
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    bookObject: state.book,
    auth: state.auth,
    types: state.types,
    languages: state.languages,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveBook: (book) => dispatch(saveBook(book)),
    fetchBook: (bookId) => dispatch(fetchBook(bookId)),
    updateBook: (book) => dispatch(updateBook(book)),
    fetchLanguages: () => dispatch(fetchLanguages()),
    fetchTypes: () => dispatch(fetchTypes()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Book);
