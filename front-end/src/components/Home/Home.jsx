import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Container,
  Row,
  Col,
  Form,
  InputGroup,
} from "react-bootstrap";
import { FaStar, FaSearch, FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsAction } from "../../shop/productSlice.js";
import { addToCartAction } from "../../shop/cartSlice.js";
import Swal from "sweetalert2";
import "./Home.css";

export default function Home() {
  const { products, isLoading, errors } = useSelector(
    (store) => store.productSlice
  );
  const dispatch = useDispatch();
  const [user, setUser] = React.useState(
    JSON.parse(localStorage.getItem("user"))
  );
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const handleStorageChange = () => {
      setUser(JSON.parse(localStorage.getItem("user")));
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  useEffect(() => {
    dispatch(getAllProductsAction());
  }, [dispatch]);

  return (
    <Container fluid className="home-page p-0">
      {/* Search Bar */}
      <div className="search-bar bg-light py-3 shadow-sm">
        <Container>
          <Form className="d-flex">
            <InputGroup>
              <Form.Control
                type="search"
                placeholder="Search for items..."
                value={searchTerm}
                onChange={handleSearch}
                className="search-input"
              />
              <Button variant="success" className="search-button">
                <FaSearch />
              </Button>
            </InputGroup>
          </Form>
        </Container>
      </div>

      <Container className="main-content py-5">
        <h2 className="section-title mb-4">All Products</h2>
        <Row xs={1} md={2} lg={4} className="g-4">
          {filteredProducts.map((product) => (
            <Col key={product.id}>
              <Card className="product-card h-100 shadow-sm">
                <Card.Img
                  variant="top"
                  src={product.imgUrl}
                  className="product-image"
                />
                <Card.Body className="d-flex flex-column">
                  <Card.Title className="product-name">
                    {product.name.charAt(0).toUpperCase() +
                      product.name.slice(1).toLowerCase()}
                  </Card.Title>
                  <div className="rating-stars mb-2">
                    {[...Array(5)].map((_, index) => (
                      <FaStar key={index} className="star-icon" />
                    ))}
                  </div>
                  <Card.Text className="product-price">
                    <span className="current-price">${product.price}</span>
                    {product.originalPrice && (
                      <span className="original-price text-muted text-decoration-line-through ms-2">
                        ${product.originalPrice}
                      </span>
                    )}
                  </Card.Text>
                  <Card.Text className="product-quantity">
                    <span className="fw-bold">Quantity:</span>{" "}
                    {product.quantity}
                  </Card.Text>
                  <div className="mt-auto d-flex gap-2">
                    {user && (
                      <Button
                        variant="primary"
                        className="btn-add-to-cart w-100"
                        onClick={() => {
                          dispatch(addToCartAction(product));
                          Swal.fire({
                            title: "Product Added To Cart",
                            icon: "success",
                            confirmButtonText: "OK",
                          });
                        }}
                      >
                        <FaShoppingCart className="me-2" /> Add
                      </Button>
                    )}
                    <Link to={`/products/${product.id}`} className="w-100">
                      <Button variant="outline-secondary" className="w-100">
                        Details
                      </Button>
                    </Link>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </Container>
  );
}
