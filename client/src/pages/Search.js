import React, { useState, useEffect } from "react";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container, Button } from "react-bootstrap";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";

function Search() {
  const [books, setBooks] = useState([]);
  const [formObject, setFormObject] = useState({});
  const [resultBooks, setResultBooks] = useState({});

  function saveBook(id, title, authors, description, image, link) {
    API.saveBook({
      key: id,
      title: title,
      authors: authors,
      description: description,
      image: image,
      link: link,
    })
      .then((res) => console.log("Success Add"))
      .catch((err) => console.log(err));
  }

  // Handles updating component state when the user types into the input field
  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormObject({ ...formObject, [name]: value });
  }

  function handleFormSubmit(event) {
    event.preventDefault();
    API.searchBook(formObject.title)
      .then((res) => {
        console.log(res.data.items);
        setResultBooks(res.data.items);
      })
      .catch((err) => console.log(err));
  }

  return (
    <Container fluid>
      <Row>
        <Col>
          <Jumbotron>
            <h1>(React) Google Books Search</h1>
          </Jumbotron>
          <form>
            <Input
              onChange={handleInputChange}
              name="title"
              placeholder="Title (required)"
            />
            <FormBtn disabled={!formObject.title} onClick={handleFormSubmit}>
              Submit Book
            </FormBtn>
          </form>
        </Col>
      </Row>
      <Row>
        <Col>
          <Jumbotron>
            <h2>Results</h2>
          </Jumbotron>
          {resultBooks.length ? (
            <List>
              {resultBooks.map((book) => {
                let id = "";
                id = book.id;
                let title = "";
                if (book.volumeInfo.title === undefined) {
                  title = "No Title";
                } else {
                  title = book.volumeInfo.title;
                }
                let authors = [];
                if (book.volumeInfo.authors === undefined) {
                  authors = ["No Author"];
                } else {
                  authors = book.volumeInfo.authors;
                }
                let description = "";
                if (book.volumeInfo.description) {
                  description = book.volumeInfo.description;
                } else {
                  description = "No description.";
                }
                let image = "";
                if (book.volumeInfo.imageLinks === undefined) {
                  image = "No Image";
                } else {
                  image = book.volumeInfo.imageLinks.thumbnail;
                }
                let link = "";
                if (book.volumeInfo.infoLink) {
                  link = book.volumeInfo.infoLink;
                } else {
                  link = "";
                }
                return (
                  <ListItem key={id}>
                    <strong>{title}</strong> by <strong>{authors}</strong>
                    <h3>Description</h3>
                    <p>{description}</p>
                    <img src={image}></img>
                    <Button href={link}>View</Button>
                    <Button
                      onClick={() =>
                        saveBook(id, title, authors, description, image, link)
                      }
                    >
                      Save
                    </Button>
                  </ListItem>
                );
              })}
            </List>
          ) : (
            <h3>No Results to Display</h3>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default Search;
