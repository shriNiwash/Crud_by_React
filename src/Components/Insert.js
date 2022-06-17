import { useEffect, useState } from "react";
import axios from "axios";
import { Form, Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Insert = () => {
  const navigate = useNavigate();
  const [Book,setBook] = useState({
    name:"",
    sold:"",

  });

  function onTextFild(e) {
    setBook({
      ...Book,
      [e.target.name]: e.target.value,
    });
  }
  
  const onSubmit = (e)=>{
    e.preventDefault();
    fetch('https://my-web-crud.herokuapp.com/insert',{
      method:"POST",
      body: JSON.stringify(Book),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
  })
    .then((response)=>response.json())
    .then((daa)=>{
      console.log(daa);
      navigate("/list");
    });
  }
  return (
    <>
      <Container>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              placeholder="Enter the Name of Book"
              onChange={(e) => onTextFild(e)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Sold</Form.Label>
            <Form.Control
              type="number"
              name="sold"
              placeholder="Enter total Sold No"
              onChange={(e) => onTextFild(e)}
            />
          </Form.Group>


          <Button variant="primary" type="submit" onClick={e=>onSubmit(e)}>
            Submit
          </Button>
        </Form>
      </Container>
    </>
  );
};

export default Insert;
