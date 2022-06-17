import { useEffect, useState } from "react";
import { Table, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// import axios from 'axios';

const List = () => {
  const navigate = useNavigate();
  const [item, setItem] = useState();
  useEffect(() => {
    getItems();
  }, []);

function handleDelete(id) {
    fetch(`https://my-web-crud.herokuapp.com/delete/${id}`, {
      method: "DELETE",
    })
    .then((response)=>response.json())
    .then((daa)=>{
      console.log(daa);
      const setdd = item.filter((dat)=>{
        return dat._id !== id;
      })
      setItem(setdd);
      navigate("/list");
    })
    .catch((err)=>console.log(err));

  }

  async function getItems() {
    const data = await fetch("https://my-web-crud.herokuapp.com/data");
    const result = await data.json();
    setItem(result);
  }

  return (
    <Container>
      <Link to={"/insert"}>insert</Link>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Sold</th>
            <th>Operation</th>
          </tr>
        </thead>
        <tbody>
          {item?.map((list, inde) => {
            return (
              <tr key={inde}>
                <td>{list._id}</td>
                <td>{list.name}</td>
                <td>{list.sold}</td>
                <td>
                  <Link to={`/update/${list._id}`}>Update</Link>{" "}
                  <Button onClick={() => handleDelete(list._id)}>Delete</Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Container>
  );
};

export default List;
