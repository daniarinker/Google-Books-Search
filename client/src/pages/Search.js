import React, { useState, useEffect } from "react";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container, Button } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";

function Search() {
  // Setting our component's initial state
  const [books, setBooks] = useState([])
  const [formObject, setFormObject] = useState({})
  const [resultBooks, setResultBooks] = useState({})

  function saveBook(id, title, authors, description, image, link){
        API.saveBook({
          key: id,  
          title: title,
          author: authors,
          description: description,
          image: image,
          link: link
        })
          .then(res => console.log("Book Add"))
          .catch(err => console.log(err));
      }

  // Handles updating component state when the user types into the input field
  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormObject({...formObject, [name]: value})
  };

  // When the form is submitted, use the API.saveBook method to save the book data
  // Then reload books from the database
  function handleFormSubmit(event) {
    event.preventDefault();
      API.searchBook(formObject.title)
        .then(res => 
        {console.log(res.data.items)
        setResultBooks(res.data.items)
        })
        .catch(err => console.log(err));
  };

    return (
      <Container fluid>
        <Row>
          <Col size="md-6">
            <Jumbotron>
              <h1>What Books Should I Read?</h1>
            </Jumbotron>
            <form>
              <Input
                onChange={handleInputChange}
                name="title"
                placeholder="Title (required)"
              />
              <FormBtn
                disabled={!(formObject.title)}
                onClick={handleFormSubmit}
              >
                Submit Book
              </FormBtn>
            </form>
          </Col>
          <Col size="md-6 sm-12">
            <Jumbotron>
              <h1>Books On My List</h1>
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
                                    image = "https://placehold.it/128x128";
                                } else {
                                    image = book.volumeInfo.imageLinks.thumbnail;
                                }
                                let link = "";
                                if (book.volumeInfo.infoLink) {
                                    link = book.volumeInfo.infoLink
                                } else {
                                    link = ""
                                } return (
                  <ListItem key={id}>
                      <strong>
                        {title} by {authors}
                      </strong>
                    <h3>Description</h3>
                    <p>{description}</p>
                    <img src={image}></img>
                    <Button href ={link}>View</Button>
                    <Button onClick={() => saveBook(id, title, authors, description, image, link)}>Save</Button>
                  </ListItem>
                )})}
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
