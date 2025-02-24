import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {
  addNewProduct,
  getProductById,
  updateProduct,
} from "../api/productApi";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addProductAction, updateProductAction } from "../shop/productSlice";
import Swal from "sweetalert2";

export default function ProductForm() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [error, setError] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    quantity: "",
    category: "",
    imgUrl: "",
  });

  useEffect(() => {
    if (id != 0) {
      getProductById(id)
        .then((response) => setFormData(response.data))
        .catch((error) => setError(error));
    }
  }, [id]);

  const navigate = useNavigate();

  const inputHandler = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
    setFormErrors({
      ...formErrors,
      [event.target.name]: "",
    });
  };

  const validateForm = () => {
    let errors = {};
    if (!formData.name.trim()) errors.name = "Product Name is required";
    if (
      !String(formData.price).trim() ||
      isNaN(formData.price) ||
      formData.price <= 0
    )
      errors.price = "Valid Product Price is required";
    if (
      !String(formData.quantity).trim() ||
      isNaN(formData.quantity) ||
      formData.quantity <= 0
    )
      errors.quantity = "Valid Product Quantity is required";
    if (!formData.category.trim())
      errors.category = "Product Category is required";
    if (!formData.imgUrl.trim())
      errors.imgUrl = "Product Image URL is required";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const productHandler = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    if (id == 0) {
      await dispatch(addProductAction(formData));
      Swal.fire({
        title: `Product Added Successfully`,
        icon: "success",
        confirmButtonText: "OK",
      });
      navigate("/products");
    } else {
      await dispatch(updateProductAction({ id, product: formData }));
      Swal.fire({
        title: `Product Updated Successfully`,
        icon: "success",
        confirmButtonText: "OK",
      });
      navigate("/products");
    }
  };

  const user = JSON.parse(localStorage.getItem("user"));

  if (user && user.role === "admin") {
    return (
      <div className="container mb-5" style={{ marginTop: "86px" }}>
        <Link to="/products">
          <button className="btn btn-primary">Back To Dashboard</button>
        </Link>
        <h1 className="fw-bold text-center my-5">
          {id == 0 ? "Add New Product" : "Edit Product"}
        </h1>
        <Form onSubmit={productHandler} className="mt-5 product-form">
          <Form.Group className="mb-3" controlId="productName">
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              name="name"
              value={formData.name}
              onChange={inputHandler}
              type="text"
              placeholder="Enter Product Name"
              isInvalid={!!formErrors.name}
            />
            <Form.Control.Feedback type="invalid">
              {formErrors.name}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="productPrice">
            <Form.Label>Product Price</Form.Label>
            <Form.Control
              name="price"
              value={formData.price}
              onChange={inputHandler}
              type="text"
              placeholder="Enter Product Price"
              isInvalid={!!formErrors.price}
            />
            <Form.Control.Feedback type="invalid">
              {formErrors.price}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="productQuantity">
            <Form.Label>Product Quantity</Form.Label>
            <Form.Control
              name="quantity"
              value={formData.quantity}
              onChange={inputHandler}
              type="text"
              placeholder="Enter Product Quantity"
              isInvalid={!!formErrors.quantity}
            />
            <Form.Control.Feedback type="invalid">
              {formErrors.quantity}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="productCategory">
            <Form.Label>Product Category</Form.Label>
            <Form.Control
              name="category"
              value={formData.category}
              onChange={inputHandler}
              type="text"
              placeholder="Enter Product Category"
              isInvalid={!!formErrors.category}
            />
            <Form.Control.Feedback type="invalid">
              {formErrors.category}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="productImg">
            <Form.Label>Product Image</Form.Label>
            <Form.Control
              name="imgUrl"
              value={formData.imgUrl}
              onChange={inputHandler}
              type="text"
              placeholder="Enter Product Image URL"
              isInvalid={!!formErrors.imgUrl}
            />
            <Form.Control.Feedback type="invalid">
              {formErrors.imgUrl}
            </Form.Control.Feedback>
          </Form.Group>

          <Button variant="primary" className="btn btn-success" type="submit">
            {id == 0 ? "Add New Product" : "Edit Product"}
          </Button>
        </Form>
      </div>
    );
  } else {
    navigate("/");
  }
}
