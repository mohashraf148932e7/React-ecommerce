import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { FaPlus } from "react-icons/fa";
import { GrView } from "react-icons/gr";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProductAction,
  getAllProductsAction,
} from "../../shop/productSlice";
import {
  Button,
  InputGroup,
  FormControl,
  Container,
  Row,
  Col,
  Alert,
} from "react-bootstrap";
import "./Products.css";

export default function Products() {
  const navigate = useNavigate();
  const { products, isLoading, errors } = useSelector(
    (store) => store.productSlice
  );
  const dispatch = useDispatch();
  const [user, setUser] = React.useState(
    JSON.parse(localStorage.getItem("user"))
  );
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const handleStorageChange = () => {
      setUser(JSON.parse(localStorage.getItem("user")));
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  useEffect(() => {
    dispatch(getAllProductsAction());
  }, [dispatch]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const deleteHandler = async (id) => {
    dispatch(deleteProductAction(id));
  };

  if (user && user.role === "admin") {
    return (
      <Container fluid className="products-page p-4">
        {/* Error Handling */}
        {errors && <Alert variant="danger">{errors.message}</Alert>}

        <Row className="mb-2 justify-content-center">
          <Col xs={12} md={6} lg={4}>
            <InputGroup>
              <FormControl
                placeholder="Search for products"
                value={searchTerm}
                onChange={handleSearch}
              />
            </InputGroup>
          </Col>
          <Col xs={12} md={4} className="text-end">
            <Link to="0/edit">
              <Button variant="outline-primary" className="btn-add">
                <FaPlus />
              </Button>
            </Link>
          </Col>
        </Row>

        {/* Products Table */}
        <div className="table-responsive">
          <Table striped bordered hover className="mt-4">
            <thead>
              <tr>
                <th>ID</th>
                <th>Product Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Category</th>
                <th>Image</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>
                    {product.price} <span className="text-success">$</span>
                  </td>
                  <td>{product.quantity}</td>
                  <td>{product.category}</td>
                  <td>
                    <img
                      src={product.imgUrl}
                      alt={product.name}
                      className="product-image"
                    />
                  </td>
                  <td>
                    <div className="d-flex justify-content-around align-items-center">
                      <Link to={`/products/${product.id}`}>
                        <Button variant="info" className="btn-action">
                          <GrView className="action-icon" />
                        </Button>
                      </Link>
                      <Link to={`/products/${product.id}/edit`}>
                        <Button variant="warning" className="btn-action">
                          <FaEdit className="action-icon" />
                        </Button>
                      </Link>
                      <Button
                        variant="danger"
                        className="btn-action"
                        onClick={() => deleteHandler(product.id)}
                      >
                        <MdDelete className="action-icon" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Container>
    );
  }
}
