import { useEffect, useState } from "react";
import {
  Button,
  Card,
  Container,
  Row,
  Col,
  Badge,
  Spinner,
} from "react-bootstrap";
import { FaStar, FaShoppingCart, FaHeart } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import "./ProductDetails.css";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { products } = useSelector((store) => store.productSlice);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (products.length > 0) {
      const foundProduct = products.find((product) => product.id === id);
      if (foundProduct) {
        setProduct(foundProduct);
      }
      setLoading(false);
    }
  }, [id, products]);

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center min-vh-100">
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  if (!product) {
    return (
      <Container className="d-flex justify-content-center align-items-center min-vh-100">
        <h2>Product not found.</h2>
      </Container>
    );
  }

  return (
    <Container className="product-details-page mt-5">
      {/* Product Details Section */}
      <Row className="g-4">
        {/* Product Image */}
        <Col
          md={6}
          className="d-flex justify-content-center align-items-center"
        >
          <div className="product-image-container">
            <img
              src={product?.imgUrl || "/default-image.jpg"}
              alt={product.name || "Product Image"}
              className="product-image"
            />
            {product.isNew && (
              <Badge bg="danger" className="product-badge">
                New
              </Badge>
            )}
            {product.discount && (
              <Badge bg="success" className="product-badge discount">
                {product.discount}% Off
              </Badge>
            )}
          </div>
        </Col>

        {/* Product Info */}
        <Col md={6}>
          <Card className="border-0 shadow-sm">
            <Card.Body>
              {/* Rating */}
              <div className="d-flex align-items-center mb-3">
                <div className="rating-stars">
                  {[...Array(5)].map((_, index) => (
                    <FaStar
                      key={index}
                      className={`star-icon ${
                        index < (product.rating || 0) ? "filled" : ""
                      }`}
                    />
                  ))}
                </div>
                <span className="ms-2 text-muted">
                  ({product.reviews || 0} reviews)
                </span>
              </div>
              <Card.Title className="product-name mb-3 text-left">
                {product.name || "Unnamed Product"}
              </Card.Title>
              {/* Price */}
              <div className="price-section mb-3">
                <span className="current-price">${product.price || 0}</span>
                {product.originalPrice && (
                  <span className="original-price text-muted text-decoration-line-through ms-2">
                    ${product.originalPrice}
                  </span>
                )}
              </div>

              {/* Category */}
              <div className="product-category mb-3">
                <span className="fw-bold">Category:</span>{" "}
                {product.category || "Uncategorized"}
              </div>

              {/* Quantity and Availability */}
              <div className="availability mb-3">
                <span className="fw-bold">Quantity:</span>{" "}
                {product.quantity || 0}{" "}
                {product.quantity > 0 ? (
                  <span className="text-success">In Stock</span>
                ) : (
                  <span className="text-danger">Out of Stock</span>
                )}
              </div>

              {/* Buttons */}
              <div className="d-flex gap-3 mb-3">
                <Button
                  variant="primary"
                  className="btn-add-to-cart"
                  disabled={product.quantity === 0}
                >
                  <FaShoppingCart className="me-2" /> Add to Cart
                </Button>
                <Button variant="outline-secondary" className="btn-wishlist">
                  <FaHeart className="me-2" /> Add to Wishlist
                </Button>
              </div>

              {/* Edit Button for Admin */}
              {user && user.role === "admin" && (
                <Link to={`/products/${product.id}/edit`}>
                  <Button variant="info" className="btn-edit">
                    Edit Product
                  </Button>
                </Link>
              )}

              {/* Product Description */}
              <div className="product-description mt-4">
                <h5 className="fw-bold">Description</h5>
                <p className="text-muted">
                  {product.description || "No description available."}
                </p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
