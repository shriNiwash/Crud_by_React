import { useEffect, useState } from "react";
// import axios from "axios";
import { Form, Button, Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Update = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [Books, setBooks] = useState({
    name: "",
    sold: "",
  });
  // const [status, setStatus] = useState();
  useEffect(() => {
    isData();
  },[id]);

  async function isData() {
    const response = await fetch(`https://my-web-crud.herokuapp.com/getData/${id}`);
    const data = await response.json();
    setBooks(data); 
  }

  function onDataField(e) {
    setBooks({
      ...Books,
      [e.target.name]: e.target.value,
    });
    console.log(e.target.value);
  }

  
  const onSubmit= (e)=>{
    fetch(`https://my-web-crud.herokuapp.com/update/${id}`,{
      method:"PUT",
      body: JSON.stringify(Books),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }

    })
    .then((response)=>response.json())
    .then((daa)=>{
      console.log(daa);
      navigate("/list");

    })
    .catch((err)=>console.log(err));

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
              value={Books.name}
              onChange={(e) => onDataField(e)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Sold</Form.Label>
            <Form.Control
              type="number"
              name="sold"
              placeholder="Enter total Sold No"
              onChange={(e) => onDataField(e)}
              value={Books.sold}
            />
          </Form.Group>
          <Button variant="primary" type="submit" onClick={e => onSubmit(e)}>
            Submit
          </Button>
        </Form>
      </Container>
    </>
  );
};

export default Update;
